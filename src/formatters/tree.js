import { isObject } from 'lodash';

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

export default rendering;
