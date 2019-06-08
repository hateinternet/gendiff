#!/usr/bin/env node
import { readFileSync } from 'fs';
import { extname } from 'path';
import { has, find, isObject } from 'lodash';
import selectParser from './parsers';
import selectFormatter from './formatters';

const nodeTypes = [
  {
    check: (data1, data2, key) => !has(data1, key),
    make: (data1, data2, key) => ({
      name: key,
      operation: 'added',
      newValue: data2[key],
    }),
  },
  {
    check: (data1, data2, key) => !has(data2, key),
    make: (data1, data2, key) => ({
      name: key,
      operation: 'removed',
      oldValue: data1[key],
    }),
  },
  {
    check: (data1, data2, key) => isObject(data1[key]) && isObject(data2[key]),
    make: (data1, data2, key, fn) => ({
      name: key,
      operation: 'joined',
      children: fn(data1[key], data2[key]),
    }),
  },
  {
    check: (data1, data2, key) => data1[key] !== data2[key],
    make: (data1, data2, key) => ({
      name: key,
      operation: 'changed',
      oldValue: data1[key],
      newValue: data2[key],
    }),
  },
  {
    check: (data1, data2, key) => data1[key] === data2[key],
    make: (data1, data2, key) => ({
      name: key,
      operation: 'unchanged',
      value: data1[key],
    }),
  },
];

const generateAST = (data1, data2) => {
  const keys = Object.keys({ ...data1, ...data2 });
  return keys.map((key) => {
    const node = find(nodeTypes, ({ check }) => check(data1, data2, key));
    return node.make(data1, data2, key, generateAST);
  });
};

const genDiff = (path1, path2, format = 'tree') => {
  const parsedData1 = selectParser(extname(path1))(readFileSync(path1, 'utf-8'));
  const parsedData2 = selectParser(extname(path2))(readFileSync(path2, 'utf-8'));
  const ast = generateAST(parsedData1, parsedData2);
  const diff = selectFormatter(format)(ast);
  return diff;
};

export default genDiff;
