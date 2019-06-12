import fs from 'fs';
import genDiff from '../src';

const makeUpperFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

const getArgs = (type, format, deep = false) => {
  const entryPoint = './__tests__/__fixtures__/';
  return [
    `${entryPoint}${type}/before${deep ? 'Deep' : ''}.${type}`,
    `${entryPoint}${type}/after${deep ? 'Deep' : ''}.${type}`,
    format,
    `${entryPoint}${type}/result${makeUpperFirstLetter(format)}${deep ? 'Deep' : ''}.txt`,
  ];
};

const compare = (filepath1, filepath2, format, expectedPath) => {
  const actual = genDiff(filepath1, filepath2, format);
  const expected = fs.readFileSync(expectedPath, 'utf-8');
  return expect(actual).toBe(expected);
};

const tableJson = [
  getArgs('json', 'tree'),
  getArgs('json', 'plain'),
  getArgs('json', 'json'),
  getArgs('json', 'tree', true),
  getArgs('json', 'plain', true),
  getArgs('json', 'json', true),
];

test.each(tableJson)('diff from json: %s %s %s', compare);

const tableYml = [
  getArgs('yml', 'tree'),
  getArgs('yml', 'plain'),
  getArgs('yml', 'json'),
  getArgs('yml', 'tree', true),
  getArgs('yml', 'plain', true),
  getArgs('yml', 'json', true),
];

test.each(tableYml)('diff from yml: %s %s %s', compare);

const tableIni = [
  getArgs('ini', 'tree'),
  getArgs('ini', 'plain'),
  getArgs('ini', 'json'),
  getArgs('ini', 'tree', true),
  getArgs('ini', 'plain', true),
  getArgs('ini', 'json', true),
];

test.each(tableIni)('diff from ini: %s %s %s', compare);
