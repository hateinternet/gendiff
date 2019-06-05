#!/usr/bin/env node
import { readFileSync } from 'fs';
import { extname } from 'path';
import { has, find, isObject } from 'lodash';
import selectParser from './parsers';

const nodeTypes = [
  {
    type: 'added',
    check: (data1, data2, key) => !has(data1, key),
    make: (data1, data2, key) => ({
      name: key,
      operation: 'added',
      newValue: data2[key],
    }),
  },
  {
    type: 'removed',
    check: (data1, data2, key) => !has(data2, key),
    make: (data1, data2, key) => ({
      name: key,
      operation: 'removed',
      oldValue: data1[key],
    }),
  },
  {
    type: 'joined',
    check: (data1, data2, key) => isObject(data1[key]) && isObject(data2[key]),
    make: (data1, data2, key, fn) => ({
      name: key,
      operation: 'joined',
      children: fn(data1[key], data2[key]),
    }),
  },
  {
    type: 'changed',
    check: (data1, data2, key) => data1[key] !== data2[key],
    make: (data1, data2, key) => ({
      name: key,
      operation: 'changed',
      oldValue: data1[key],
      newValue: data2[key],
    }),
  },
  {
    type: 'unchanged',
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
const addTabs = depth => '  '.repeat(depth);

const stringify = (value, depth) => {
  if (!isObject(value)) {
    return value;
  }
  const jsonStr = JSON.stringify(value, null, 2).replace(/"/g, '');
  const formattedStr = jsonStr.split('\n').map((el, i) => (i === 0 ? el : `${addTabs(depth + 1)}${el}`)).join('\n');
  return formattedStr;
};

const makeString = (name, value, depth, sign) => `${addTabs(depth)}${sign}${name}: ${stringify(value, depth)}`;

const renderMethods = {
  added: (node, depth) => {
    const { name, newValue } = node;
    const str = makeString(name, newValue, depth, '+ ');
    return `${str}`;
  },
  removed: (node, depth) => {
    const { name, oldValue } = node;
    const str = makeString(name, oldValue, depth, '- ');
    return `${str}`;
  },
  changed: (node, depth) => {
    const { name, oldValue, newValue } = node;
    const str1 = makeString(name, newValue, depth, '+ ');
    const str2 = makeString(name, oldValue, depth, '- ');
    return `${str1}\n${str2}`;
  },
  unchanged: (node, depth) => {
    const { name, value } = node;
    const str = makeString(name, value, depth, '  ');
    return `${str}`;
  },
  joined: (node, depth, fn) => {
    const { name, children } = node;
    const deepNodes = fn(children, depth + 1);
    return `${addTabs(depth)}  ${name}: ${deepNodes}`;
  },
};

const rendering = (ast, depth = 0) => {
  const tree = ast.reduce((str, node) => {
    const { operation } = node;
    const renderMethod = renderMethods[operation];
    return `${str}\n${renderMethod(node, depth, rendering)}`;
  }, '');
  return `{${tree}\n${addTabs(depth)}}`;
};

const genDiff = (path1, path2) => {
  const parsedData1 = selectParser(extname(path1))(readFileSync(path1, 'utf-8'));
  const parsedData2 = selectParser(extname(path2))(readFileSync(path2, 'utf-8'));
  const ast = generateAST(parsedData1, parsedData2);
  const diff = rendering(ast);
  return diff;
};

export default genDiff;
