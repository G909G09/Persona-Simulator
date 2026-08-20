#!/usr/bin/env node
// Self-tests for the maintenance scripts in this folder (check-html-script-syntax.js
// and check-variant-sync.js). These scripts gate CI, so they need their own basic
// regression coverage -- run with: node scripts/test-scripts.js
//
// Each test spawns the script under test as a real child process against a small
// fixture file (created on the fly in a temp dir) and asserts on its exit code /
// stdout / stderr, exactly the way CI invokes it.

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
let failures = 0;
let passed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`ok - ${name}`);
  } catch (err) {
    failures++;
    console.error(`not ok - ${name}`);
    console.error(`    ${err.message}`);
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'assertion failed');
}

function tmpFile(name, contents) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'persona-sim-test-'));
  const file = path.join(dir, name);
  fs.writeFileSync(file, contents, 'utf8');
  return file;
}

function run(script, args) {
  return spawnSync('node', [path.join(ROOT, 'scripts', script), ...args], { encoding: 'utf8' });
}

// ---- check-html-script-syntax.js ----------------------------------------

test('check-html-script-syntax: accepts valid inline script', () => {
  const file = tmpFile('ok.html', '<html><body><script>var x = 1 + 1;</script></body></html>');
  const res = run('check-html-script-syntax.js', [file]);
  assert(res.status === 0, `expected exit 0, got ${res.status}\n${res.stdout}${res.stderr}`);
  assert(/checked 1 inline/.test(res.stdout), 'expected stdout to report 1 checked block');
});

test('check-html-script-syntax: rejects broken inline script', () => {
  const file = tmpFile('bad.html', '<html><body><script>function f( { return; }</script></body></html>');
  const res = run('check-html-script-syntax.js', [file]);
  assert(res.status === 1, `expected exit 1, got ${res.status}`);
  assert(/Syntax error/.test(res.stderr), 'expected a syntax error message on stderr');
});

test('check-html-script-syntax: skips scripts with src= and non-JS type=', () => {
  const file = tmpFile('skip.html',
    '<script src="ext.js">totally not valid js((</script>' +
    '<script type="text/plain">also not valid js((</script>' +
    '<script>var ok = true;</script>'
  );
  const res = run('check-html-script-syntax.js', [file]);
  assert(res.status === 0, `expected exit 0, got ${res.status}\n${res.stdout}${res.stderr}`);
  assert(/checked 1 inline.*skipped 2/.test(res.stdout), `expected 1 checked / 2 skipped, got: ${res.stdout}`);
});

test('check-html-script-syntax: exits 1 with usage message when called with no files', () => {
  const res = run('check-html-script-syntax.js', []);
  assert(res.status === 1, `expected exit 1, got ${res.status}`);
  assert(/Usage:/.test(res.stderr), 'expected usage message on stderr');
});

// ---- check-variant-sync.js -----------------------------------------------

test('check-variant-sync: passes on identical files', () => {
  const a = tmpFile('a.html', 'line1\nline2\nline3\n');
  const b = tmpFile('b.html', 'line1\nline2\nline3\n');
  const res = run('check-variant-sync.js', [a, b]);
  assert(res.status === 0, `expected exit 0, got ${res.status}\n${res.stdout}${res.stderr}`);
});

test('check-variant-sync: passes on a known intentional difference (SAVE_KEY)', () => {
  const a = tmpFile('a.html', "line1\nconst SAVE_KEY='personaWatchSave';\nline3\n");
  const b = tmpFile('b.html', "line1\nconst SAVE_KEY='personaWatchSave_observer';\nline3\n");
  const res = run('check-variant-sync.js', [a, b]);
  assert(res.status === 0, `expected exit 0, got ${res.status}\n${res.stdout}${res.stderr}`);
});

test('check-variant-sync: fails on an unrecognized line difference', () => {
  const a = tmpFile('a.html', 'line1\nsomeFunction(1);\nline3\n');
  const b = tmpFile('b.html', 'line1\nsomeFunction(2);\nline3\n');
  const res = run('check-variant-sync.js', [a, b]);
  assert(res.status === 1, `expected exit 1, got ${res.status}`);
  assert(/unexpected line difference/.test(res.stderr), 'expected unexpected-diff message on stderr');
  assert(/line 2:/.test(res.stderr), 'expected the report to point at line 2');
});

test('check-variant-sync: fails with a clear message on line-count mismatch', () => {
  const a = tmpFile('a.html', 'line1\nline2\n');
  const b = tmpFile('b.html', 'line1\nline2\nline3\n');
  const res = run('check-variant-sync.js', [a, b]);
  assert(res.status === 1, `expected exit 1, got ${res.status}`);
  assert(/has \d+ lines but/.test(res.stderr), 'expected a line-count mismatch message on stderr');
});

console.log(`\n${passed} passed, ${failures} failed`);
process.exit(failures ? 1 : 0);
