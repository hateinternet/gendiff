import { readFileSync } from 'fs';
import { extname } from 'path';
import {
  has,
  find,
  isObject,
  union,
  keys as getKeys,
} from 'lodash';
import getParser from './parsers';
import getFormatter from './formatters';

const nodeTypes = [
  {
    check: (data1, data2, key) => !has(data1, key),
    make: (data1, data2, key) => ({
      name: key,
      type: 'added',
      newValue: data2[key],
    }),
  },
  {
    check: (data1, data2, key) => !has(data2, key),
    make: (data1, data2, key) => ({
      name: key,
      type: 'removed',
      oldValue: data1[key],
    }),
  },
  {
    check: (data1, data2, key) => isObject(data1[key]) && isObject(data2[key]),
    make: (data1, data2, key, fn) => ({
      name: key,
      type: 'joined',
      children: fn(data1[key], data2[key]),
    }),
  },
  {
    check: (data1, data2, key) => data1[key] !== data2[key],
    make: (data1, data2, key) => ({
      name: key,
      type: 'changed',
      oldValue: data1[key],
      newValue: data2[key],
    }),
  },
  {
    check: (data1, data2, key) => data1[key] === data2[key],
    make: (data1, data2, key) => ({
      name: key,
      type: 'unchanged',
      value: data1[key],
    }),
  },
];

const generateAST = (data1, data2) => {
  const keys = union(getKeys(data1), getKeys(data2));
  return keys.map((key) => {
    const node = find(nodeTypes, ({ check }) => check(data1, data2, key));
    return node.make(data1, data2, key, generateAST);
  });
};

const genDiff = (path1, path2, format = 'tree') => {
  const parse1 = extname(path1) |> getParser;
  const parse2 = extname(path2) |> getParser;
  const parsedData1 = readFileSync(path1, 'utf-8') |> parse1;
  const parsedData2 = readFileSync(path2, 'utf-8') |> parse2;
  const ast = generateAST(parsedData1, parsedData2);
  const diff = getFormatter(format)(ast);
  return diff;
};

export default genDiff;
