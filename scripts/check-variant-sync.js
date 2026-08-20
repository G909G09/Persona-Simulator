#!/usr/bin/env node
// persona-watch-v39.html and persona-watch-observer.html are two independent
// files that intentionally share almost all of their logic (see README.md,
// "Development" section). Every bug fix or feature change to shared code has
// to be applied to *both* files by hand, and nothing currently catches it
// when that manual sync is forgotten in one of them.
//
// This script does a line-by-line comparison of the two files and fails if
// it finds a differing line pair that isn't recognized as one of the small,
// documented set of intentional variant differences (title text, storage
// keys, default config values, and the disabled main-story call). Any other
// differing line is treated as unintentional drift and reported.
//
// This is intentionally simple (line-index alignment, no real diff/patience
// algorithm) rather than a general-purpose diff tool: as long as fixes are
// applied to both files at the same relative location -- which is exactly
// what the project's own contribution guidelines already require -- line
// counts and indices stay aligned between the two files. A length mismatch
// is reported on its own since index alignment can no longer be trusted.

const fs = require('fs');

const FILE_A = process.argv[2] || 'persona-watch-v39.html';
const FILE_B = process.argv[3] || 'persona-watch-observer.html';

// Each entry matches a *pair* of lines (one from each file) that are allowed
// to differ. `test` receives both lines and must return true for the pair to
// be treated as an intentional, already-known variant difference.
const ALLOWED_DIFFS = [
  { label: '<title> tag', test: (a, b) => /^<title>PERSONA WATCH/.test(a) && /^<title>PERSONA WATCH/.test(b) },
  { label: 'toolbar subtitle span', test: (a, b) => a.includes('data-i18n="title.sub"') && b.includes('data-i18n="title.sub"') },
  { label: "i18n 'title.sub' string", test: (a, b) => /^\s*'title\.sub':/.test(a) && /^\s*'title\.sub':/.test(b) },
  { label: "i18n 'log.ready' string", test: (a, b) => /^\s*'log\.ready':/.test(a) && /^\s*'log\.ready':/.test(b) },
  { label: 'CFG_KEY constant', test: (a, b) => /^const CFG_KEY=/.test(a) && /^const CFG_KEY=/.test(b) },
  { label: 'CFG defaults (spectateP/sceneP/autosave/logMax/defR18/defCor/autoFaint)', test: (a, b) => /spectateP:\d+, sceneP:\d+/.test(a) && /spectateP:\d+, sceneP:\d+/.test(b) },
  { label: 'CFG defaults (autosave/logMax)', test: (a, b) => /^\s*autosave:\d+, logMax:\d+,/.test(a) && /^\s*autosave:\d+, logMax:\d+,/.test(b) },
  { label: 'CFG defaults (defR18/defCor/autoFaint)', test: (a, b) => /^\s*defR18:(true|false), defCor:(true|false), autoFaint:(true|false),/.test(a) && /^\s*defR18:(true|false), defCor:(true|false), autoFaint:(true|false),/.test(b) },
  { label: 'CFG immersion default', test: (a, b) => /^\s*immersion:(true|false),/.test(a) && /^\s*immersion:(true|false),/.test(b) },
  { label: 'main-story call (disabled on observer variant)', test: (a, b) => (/checkMainStory\(pl\);/.test(a) || /메인 스토리는 진행하지 않는다/.test(a)) && (/checkMainStory\(pl\);/.test(b) || /메인 스토리는 진행하지 않는다/.test(b)) },
  { label: 'SAVE_KEY constant', test: (a, b) => /^const SAVE_KEY=/.test(a) && /^const SAVE_KEY=/.test(b) },
  { label: 'SAVE_VARIANT constant', test: (a, b) => /^const SAVE_VARIANT=/.test(a) && /^const SAVE_VARIANT=/.test(b) },
];

function readLines(path) {
  return fs.readFileSync(path, 'utf8').split('\n');
}

const linesA = readLines(FILE_A);
const linesB = readLines(FILE_B);

if (linesA.length !== linesB.length) {
  console.error(
    `${FILE_A} has ${linesA.length} lines but ${FILE_B} has ${linesB.length} lines.\n` +
    'Line counts must match for this drift check to align the two files line-by-line; ' +
    'run a full `diff` between the two files by hand to review the change.'
  );
  process.exit(1);
}

const unexpected = [];

for (let i = 0; i < linesA.length; i++) {
  const a = linesA[i];
  const b = linesB[i];
  if (a === b) continue;
  const known = ALLOWED_DIFFS.some(rule => rule.test(a, b));
  if (!known) unexpected.push({ line: i + 1, a, b });
}

if (unexpected.length) {
  console.error(`Found ${unexpected.length} unexpected line difference(s) between ${FILE_A} and ${FILE_B}:\n`);
  for (const { line, a, b } of unexpected) {
    console.error(`  line ${line}:`);
    console.error(`    ${FILE_A}:        ${a.trim()}`);
    console.error(`    ${FILE_B}: ${b.trim()}`);
    console.error('');
  }
  console.error(
    'If this difference is intentional, add a matching rule to ALLOWED_DIFFS in\n' +
    'scripts/check-variant-sync.js. Otherwise, apply the same fix to both files.'
  );
  process.exit(1);
}

console.log(`${FILE_A} and ${FILE_B}: no unexpected drift (${linesA.length} lines compared, ${ALLOWED_DIFFS.length} known intentional-difference rules).`);
process.exit(0);
