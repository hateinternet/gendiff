import fs from 'fs';
import genDiff from '../src';

test('genDiff 1', () => {
  const filepath1 = './__tests__/__fixtures__/before.json';
  const filepath2 = './__tests__/__fixtures__/after.json';
  const actual = genDiff(filepath1, filepath2);
  const expected = fs.readFileSync('./__tests__/__fixtures__/jsonResult.txt', 'utf-8');
  expect(actual).toBe(expected);
});
