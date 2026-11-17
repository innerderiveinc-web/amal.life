const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

/**
 * Expo Config Plugin to copy static web assets into Android's native assets folder.
 * This makes the full offline AMAL OS accessible via `file:///android_asset/web/index.html`.
 */
const withAndroidWebAssets = (config) => {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const projectRoot = config.modRequest.projectRoot;
      const sourceDir = path.resolve(projectRoot, 'assets/web');
      const targetDir = path.resolve(
        config.modRequest.platformProjectRoot,
        'app/src/main/assets/web'
      );

      console.log(`[withAndroidWebAssets] Copying web assets from ${sourceDir} to ${targetDir}...`);
      if (fs.existsSync(sourceDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
        fs.cpSync(sourceDir, targetDir, { recursive: true });
        console.log('[withAndroidWebAssets] Successfully copied complete AMAL OS web assets into APK assets!');
      } else {
        console.warn(`[withAndroidWebAssets] Source directory ${sourceDir} does not exist!`);
      }
      return config;
    },
  ]);
};

module.exports = withAndroidWebAssets;
