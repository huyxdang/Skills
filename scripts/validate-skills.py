#!/usr/bin/env python3
from pathlib import Path
import re,json,sys
try:
 import yaml
except ImportError:
 raise SystemExit("Install PyYAML in your development environment to validate skill metadata.")
root=Path(sys.argv[1]) if len(sys.argv)>1 else Path(__file__).resolve().parents[1]/"skills"
errors=[]
manifest=root.parent/"pstack-source.json"
if manifest.exists():
 source=json.loads(manifest.read_text())
 expected=set(source["upstream_skill_names"]+source["additional_skill_names"])
 actual={p.parent.name for p in root.glob("*/SKILL.md")}
 errors.extend("Missing skill: "+name for name in sorted(expected-actual))
for p in sorted(root.glob('*/SKILL.md')):
 name=p.parent.name;s=p.read_text();m=re.match(r'^---\n(.*?)\n---\n',s,re.S)
 if not m: errors.append(f'{name}: no frontmatter');continue
 try: data=yaml.safe_load(m[1])
 except Exception as e: errors.append(f'{name}: {e}');continue
 if data.get('name')!=name:errors.append(f'{name}: name mismatch')
 if not isinstance(data.get('description'),str) or not data['description'].strip():errors.append(f'{name}: invalid description')
 if set(data)-{'name','description','metadata','license','compatibility','allowed-tools'}:errors.append(f'{name}: unsupported metadata')
 meta=p.parent/'agents/openai.yaml'
 if not meta.exists():errors.append(f'{name}: missing UI metadata')
 else:
  ui=yaml.safe_load(meta.read_text()); prompt=ui.get('interface',{}).get('default_prompt','')
  if '$'+name not in prompt:errors.append(f'{name}: wrong default invocation')
 for doc in p.parent.rglob('*.md'):
  text=doc.read_text()
  if re.search(r'\.cursor\b|\bAskQuestion\b|\bsubagent_type\b|\brun_in_background\b|\bgrok-[\w.-]+|\bclaude-(?:opus|fable)-',text):errors.append(f'{doc}: nonportable host instruction')
  for match in re.finditer(r'\]\(([^)]+)\)',text):
   target=match[1].split('#')[0]
   if not target or '://' in target or target.startswith('mailto:') or '{' in target or target=='url':continue
   if not (doc.parent/target).exists():errors.append(f'{doc}: broken Markdown link {target}')
  if doc==p:
   for match in re.finditer(r'`((?:\.\./[a-z-]+/SKILL\.md)|(?:(?:references|scripts|playbooks)/[^`\s]+))`',text):
    target=match[1]
    if '<' in target or '*' in target:continue
    if not (doc.parent/target).exists():errors.append(f'{doc}: missing resource {target}')
print('\n'.join(errors) if errors else f'PASS {len(list(root.glob("*/SKILL.md")))} skills: metadata, host compatibility, and local references')
sys.exit(bool(errors))
