import fs from 'fs';
import { capitalize } from 'lodash';
import genDiff from '../src';

const compare = (type, format, deep = false) => {
  const entryPoint = './__tests__/__fixtures__/';
  const filepath1 = `${entryPoint}${type}/before${deep ? 'Deep' : ''}.${type}`;
  const filepath2 = `${entryPoint}${type}/after${deep ? 'Deep' : ''}.${type}`;
  const expectedPath = `${entryPoint}${type}/result${capitalize(format)}${deep ? 'Deep' : ''}.txt`;

  const actual = genDiff(filepath1, filepath2, format);
  const expected = fs.readFileSync(expectedPath, 'utf-8');
  return expect(actual).toBe(expected);
};

const tableJson = [
  ['json', 'tree'],
  ['json', 'plain'],
  ['json', 'json'],
  ['json', 'tree', true],
  ['json', 'plain', true],
  ['json', 'json', true],
];

test.each(tableJson)('diff from json: %s %s', compare);

const tableYml = [
  ['yml', 'tree'],
  ['yml', 'plain'],
  ['yml', 'json'],
  ['yml', 'tree', true],
  ['yml', 'plain', true],
  ['yml', 'json', true],
];

test.each(tableYml)('diff from yml: %s %s', compare);

const tableIni = [
  ['ini', 'tree'],
  ['ini', 'plain'],
  ['ini', 'json'],
  ['ini', 'tree', true],
  ['ini', 'plain', true],
  ['ini', 'json', true],
];

test.each(tableIni)('diff from ini: %s %s', compare);
