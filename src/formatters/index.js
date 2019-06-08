import toPlain from './plain';
import toTree from './tree';

const formatTypes = {
  plain: toPlain,
  tree: toTree,
};

export default format => ast => formatTypes[format](ast);
