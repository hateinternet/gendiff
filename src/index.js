#!/usr/bin/env node
import { readFileSync } from 'fs';
import { extname } from 'path';
import { has } from 'lodash';
import getParser from './parsers';

const compareData = (fileData1, fileData2) => {
  const keys = Object.keys({ ...fileData1, ...fileData2 });
  const str = keys.reduce((acc, el) => {
    if (has(fileData1, el) && has(fileData2, el)) {
      const value1 = fileData1[el];
      const value2 = fileData2[el];
      if (value1 === value2) {
        return `${acc}\n   ${el}:${value1}`;
      }
      const firstStr = `+ ${el}:${value2}`;
      const secondStr = `- ${el}:${value1}`;
      return `${acc}\n ${firstStr}\n ${secondStr}`;
    }
    if (has(fileData1, el) && !has(fileData2, el)) {
      const value = fileData1[el];
      return `${acc}\n - ${el}:${value}`;
    }
    const value = fileData2[el];
    return `${acc}\n + ${el}:${value}`;
  }, '');
  return `{${str}\n}`;
};

const genDiff = (filepath1, filepath2) => {
  const fileData1 = getParser(extname(filepath1))(readFileSync(filepath1, 'utf-8'));
  const fileData2 = getParser(extname(filepath2))(readFileSync(filepath2, 'utf-8'));
  return compareData(fileData1, fileData2);
};

export default genDiff;
