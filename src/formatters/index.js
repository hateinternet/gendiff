import toPlain from './plain';
import toTree from './tree';
import toJson from './json';

const formatTypes = {
  plain: toPlain,
  tree: toTree,
  json: toJson,
};

export default format => ast => formatTypes[format](ast);
