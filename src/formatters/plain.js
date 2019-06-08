import { isObject } from 'lodash';

const toString = value => (isObject(value) ? '[complex value]' : value);

const getFullPath = (path, name) => (path.length > 0 ? [...path, name].join('.') : name);

const renderMethods = {
  added: (node, path) => {
    const { name, newValue } = node;
    const fullPath = getFullPath(path, name);
    return `\nProperty '${fullPath}' was added with value: ${toString(newValue)}`;
  },
  removed: (node, path) => {
    const { name } = node;
    const fullPath = getFullPath(path, name);
    return `\nProperty '${fullPath}' was removed`;
  },
  changed: (node, path) => {
    const { name, oldValue, newValue } = node;
    const fullPath = getFullPath(path, name);
    return `\nProperty '${fullPath}' was updated. From ${toString(oldValue)} to ${toString(newValue)}`;
  },
  unchanged: (node, path) => {
    const { name, value } = node;
    const fullPath = getFullPath(path, name);
    return `\nProperty '${fullPath}' hasn't been changed. It's equal to: ${toString(value)}`;
  },
  joined: (node, path, fn) => {
    const { name, children } = node;
    const deepNodes = fn(children, [...path, name]);
    return `${deepNodes}`;
  },
};

const rendering = (ast, path = []) => {
  const plainText = ast.reduce((str, node) => {
    const { operation } = node;
    const renderMethod = renderMethods[operation];
    return `${str}${renderMethod(node, path, rendering)}`;
  }, '');
  return plainText;
};

export default rendering;
