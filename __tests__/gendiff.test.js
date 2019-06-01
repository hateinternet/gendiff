import fs from 'fs';
import genDiff from '../src';

test('genDiff 1 - json', () => {
  const filepath1 = './__tests__/__fixtures__/before.json';
  const filepath2 = './__tests__/__fixtures__/after.json';
  const actual = genDiff(filepath1, filepath2);
  const expected = fs.readFileSync('./__tests__/__fixtures__/jsonResult.txt', 'utf-8');
  expect(actual).toBe(expected);
});

test('genDiff 2 - yml', () => {
  const filepath1 = './__tests__/__fixtures__/before.yml';
  const filepath2 = './__tests__/__fixtures__/after.yml';
  const actual = genDiff(filepath1, filepath2);
  const expected = fs.readFileSync('./__tests__/__fixtures__/yamlResult.txt', 'utf-8');
  expect(actual).toBe(expected);
});

test('genDiff 3 - yaml', () => {
  const filepath1 = './__tests__/__fixtures__/before.yaml';
  const filepath2 = './__tests__/__fixtures__/after.yaml';
  const actual = genDiff(filepath1, filepath2);
  const expected = fs.readFileSync('./__tests__/__fixtures__/yamlResult.txt', 'utf-8');
  expect(actual).toBe(expected);
});
