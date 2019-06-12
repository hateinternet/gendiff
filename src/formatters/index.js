import toPlain from './plain';
import toTree from './tree';

const formatTypes = {
  plain: toPlain,
  tree: toTree,
  json: JSON.stringify,
};

export default format => ast => formatTypes[format](ast);
