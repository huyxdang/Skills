---
name: eli5
description: Explain a topic like I'm five. Use this skill whenever the user says ELI5, asks for a dead-simple explanation, wants to understand how something works, or asks for a visual picture explainer—even if they do not use the word ELI5.
---

# eli5

Create a self-contained HTML artifact that explains the user's topic to someone who knows nothing about it. Use a few plain-language words and one or more large, meaningful visuals such as an inline SVG diagram, labeled shapes, CSS illustration, or carefully chosen emoji. Prefer a concrete analogy before introducing technical terms.

## Workflow

1. Identify the topic from the user's request. If the request contains several possible topics, ask one concise clarifying question before creating the artifact.
2. Reduce the explanation to the smallest useful story: what it is, how it works, and why it matters. Keep labels short and avoid unexplained jargon.
3. Write the result as one portable HTML file with inline CSS and inline SVG or other self-contained visuals. Do not depend on a CDN, remote image, external font, JavaScript package, or network request.
4. Save the artifact under `outputs/` using a descriptive filename such as `eli5-dns.html`, unless the user specifies another location. Do not overwrite an existing file without checking first.
5. If practical, open or render the HTML locally to catch broken layout or unreadable text, then report the exact file path.

## Output guidance

- Use a short title, a visual-first layout, and no more than a few short explanatory blocks.
- Make the visual carry the explanation: show flow, parts, or cause-and-effect rather than decorating the page.
- Keep the language friendly and accurate. Say when an analogy is simplified, and do not invent facts merely to make the analogy work.
- Return the artifact path and a one-sentence summary in the final response.
