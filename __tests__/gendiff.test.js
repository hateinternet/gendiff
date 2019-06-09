import fs from 'fs';
import genDiff from '../src';

const tableJson = [
  [
    './__tests__/__fixtures__/json/before.json',
    './__tests__/__fixtures__/json/after.json',
    'tree',
    fs.readFileSync('./__tests__/__fixtures__/json/resultTree.txt', 'utf-8'),
  ],
  [
    './__tests__/__fixtures__/json/before.json',
    './__tests__/__fixtures__/json/after.json',
    'plain',
    fs.readFileSync('./__tests__/__fixtures__/json/resultPlain.txt', 'utf-8'),
  ],
  [
    './__tests__/__fixtures__/json/before.json',
    './__tests__/__fixtures__/json/after.json',
    'json',
    fs.readFileSync('./__tests__/__fixtures__/json/resultJson.txt', 'utf-8'),
  ],
  [
    './__tests__/__fixtures__/json/beforeDeep.json',
    './__tests__/__fixtures__/json/afterDeep.json',
    'tree',
    fs.readFileSync('./__tests__/__fixtures__/json/resultTreeDeep.txt', 'utf-8'),
  ],
  [
    './__tests__/__fixtures__/json/beforeDeep.json',
    './__tests__/__fixtures__/json/afterDeep.json',
    'plain',
    fs.readFileSync('./__tests__/__fixtures__/json/resultPlainDeep.txt', 'utf-8'),
  ],
  [
    './__tests__/__fixtures__/json/beforeDeep.json',
    './__tests__/__fixtures__/json/afterDeep.json',
    'json',
    fs.readFileSync('./__tests__/__fixtures__/json/resultJsonDeep.txt', 'utf-8'),
  ],
];

test.each(tableJson)(
  'diff from json: %s %s %s',
  (filepath1, filepath2, format, expected) => {
    expect(genDiff(filepath1, filepath2, format)).toBe(expected);
  },
);

const tableYml = [
  [
    './__tests__/__fixtures__/yml/before.yml',
    './__tests__/__fixtures__/yml/after.yml',
    'tree',
    fs.readFileSync('./__tests__/__fixtures__/yml/resultTree.txt', 'utf-8'),
  ],
  [
    './__tests__/__fixtures__/yml/before.yml',
    './__tests__/__fixtures__/yml/after.yml',
    'plain',
    fs.readFileSync('./__tests__/__fixtures__/yml/resultPlain.txt', 'utf-8'),
  ],
  [
    './__tests__/__fixtures__/yml/before.yml',
    './__tests__/__fixtures__/yml/after.yml',
    'json',
    fs.readFileSync('./__tests__/__fixtures__/yml/resultJson.txt', 'utf-8'),
  ],
  [
    './__tests__/__fixtures__/yml/beforeDeep.yml',
    './__tests__/__fixtures__/yml/afterDeep.yml',
    'tree',
    fs.readFileSync('./__tests__/__fixtures__/yml/resultTreeDeep.txt', 'utf-8'),
  ],
  [
    './__tests__/__fixtures__/yml/beforeDeep.yml',
    './__tests__/__fixtures__/yml/afterDeep.yml',
    'plain',
    fs.readFileSync('./__tests__/__fixtures__/yml/resultPlainDeep.txt', 'utf-8'),
  ],
  [
    './__tests__/__fixtures__/yml/beforeDeep.yml',
    './__tests__/__fixtures__/yml/afterDeep.yml',
    'json',
    fs.readFileSync('./__tests__/__fixtures__/yml/resultJsonDeep.txt', 'utf-8'),
  ],
];

test.each(tableYml)(
  'diff from yml: %s %s %s',
  (filepath1, filepath2, format, expected) => {
    expect(genDiff(filepath1, filepath2, format)).toBe(expected);
  },
);

const tableIni = [
  [
    './__tests__/__fixtures__/ini/before.ini',
    './__tests__/__fixtures__/ini/after.ini',
    'tree',
    fs.readFileSync('./__tests__/__fixtures__/ini/resultTree.txt', 'utf-8'),
  ],
  [
    './__tests__/__fixtures__/ini/before.ini',
    './__tests__/__fixtures__/ini/after.ini',
    'plain',
    fs.readFileSync('./__tests__/__fixtures__/ini/resultPlain.txt', 'utf-8'),
  ],
  [
    './__tests__/__fixtures__/ini/before.ini',
    './__tests__/__fixtures__/ini/after.ini',
    'json',
    fs.readFileSync('./__tests__/__fixtures__/ini/resultJson.txt', 'utf-8'),
  ],
  [
    './__tests__/__fixtures__/ini/beforeDeep.ini',
    './__tests__/__fixtures__/ini/afterDeep.ini',
    'tree',
    fs.readFileSync('./__tests__/__fixtures__/ini/resultTreeDeep.txt', 'utf-8'),
  ],
  [
    './__tests__/__fixtures__/ini/beforeDeep.ini',
    './__tests__/__fixtures__/ini/afterDeep.ini',
    'plain',
    fs.readFileSync('./__tests__/__fixtures__/ini/resultPlainDeep.txt', 'utf-8'),
  ],
  [
    './__tests__/__fixtures__/ini/beforeDeep.ini',
    './__tests__/__fixtures__/ini/afterDeep.ini',
    'json',
    fs.readFileSync('./__tests__/__fixtures__/ini/resultJsonDeep.txt', 'utf-8'),
  ],
];

test.each(tableIni)(
  'diff from json: %s %s %s',
  (filepath1, filepath2, format, expected) => {
    expect(genDiff(filepath1, filepath2, format)).toBe(expected);
  },
);