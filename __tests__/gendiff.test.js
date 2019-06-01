import fs from 'fs';
import genDiff from '../src';

const table = [
  [
    './__tests__/__fixtures__/before.json',
    './__tests__/__fixtures__/after.json',
    fs.readFileSync('./__tests__/__fixtures__/jsonResult.txt', 'utf-8'),
  ],
  [
    './__tests__/__fixtures__/before.yaml',
    './__tests__/__fixtures__/after.yaml',
    fs.readFileSync('./__tests__/__fixtures__/yamlResult.txt', 'utf-8'),
  ],
  [
    './__tests__/__fixtures__/before.yml',
    './__tests__/__fixtures__/after.yml',
    fs.readFileSync('./__tests__/__fixtures__/yamlResult.txt', 'utf-8'),
  ],
  [
    './__tests__/__fixtures__/before.ini',
    './__tests__/__fixtures__/after.ini',
    fs.readFileSync('./__tests__/__fixtures__/iniResult.txt', 'utf-8'),
  ],
];

test.each(table)(
  'diff: %s %s',
  (filepath1, filepath2, expected) => {
    expect(genDiff(filepath1, filepath2)).toBe(expected);
  },
);
