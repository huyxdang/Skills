import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

test('missing dependencies fail without installing or producing a proof', () => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'statechart-deps-'));
  try {
    const log = path.join(temp, 'calls');
    fs.writeFileSync(path.join(temp, 'mise'), '#!/bin/sh\nprintf "%s\\n" "$*" >> "$DISCOVERY_LOG"\nexit 1\n', { mode: 0o755 });
    const spec = path.join(import.meta.dirname, 'corpus/Counter/Counter.tla');
    const script = path.join(import.meta.dirname, '../run.ts');
    const env = { ...process.env, PATH: temp, DISCOVERY_LOG: log };
    delete env.TLA2TOOLS;
    delete env.JAVA;
    const result = spawnSync(process.execPath, ['--input-type=module', '-e',
      `import { check } from ${JSON.stringify(script)}; await check(${JSON.stringify(spec)}, ${JSON.stringify(spec.replace(/\.tla$/, '.cfg'))});`], { env, encoding: 'utf8' });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /No dependencies were installed/);
    const calls = fs.readFileSync(log, 'utf8').trim().split('\n');
    assert.equal(calls.length, 2);
    assert(calls.every(call => /^(where|which) /.test(call)));
    assert(!calls.some(call => /\binstall\b/.test(call)));
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
});
