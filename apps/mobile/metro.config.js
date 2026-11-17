const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [monorepoRoot];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// 3. Aliasing and deduplication for React and Node built-ins needed by shared engines
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  react: path.resolve(monorepoRoot, 'node_modules/react'),
  'react-native': path.resolve(monorepoRoot, 'node_modules/react-native'),
  crypto: path.resolve(projectRoot, 'shims/crypto.js'),
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'react') {
    return {
      filePath: path.resolve(monorepoRoot, 'node_modules/react/index.js'),
      type: 'sourceFile',
    };
  }
  if (moduleName === 'react/jsx-runtime') {
    return {
      filePath: path.resolve(monorepoRoot, 'node_modules/react/jsx-runtime.js'),
      type: 'sourceFile',
    };
  }
  if (moduleName === 'react/jsx-dev-runtime') {
    return {
      filePath: path.resolve(monorepoRoot, 'node_modules/react/jsx-dev-runtime.js'),
      type: 'sourceFile',
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
