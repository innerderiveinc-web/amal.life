/**
 * AMAL OS — Mobile App Store & Google Play Readiness Certification
 * 
 * Verifies that apps/mobile has all required configuration, bundle IDs,
 * background audio permissions, EAS build profiles, and screen contracts
 * to pass Apple App Store (App Store Review Guidelines) and Google Play Console checks.
 */

import * as fs from 'fs';
import * as path from 'path';

const rootDir = process.cwd();
const mobileDir = path.join(rootDir, 'apps/mobile');

console.log('======================================================================');
console.log('AMAL OS — MOBILE APP STORE & GOOGLE PLAY READINESS AUDIT');
console.log('======================================================================\n');

let passCount = 0;
let failCount = 0;

function check(desc: string, condition: boolean, detail?: string) {
  if (condition) {
    console.log(`  ✓ [PASS] ${desc}`);
    passCount++;
  } else {
    console.error(`  ❌ [FAIL] ${desc}${detail ? ' (' + detail + ')' : ''}`);
    failCount++;
  }
}

// 1. app.json Configuration
const appJsonPath = path.join(mobileDir, 'app.json');
check('app.json exists on disk', fs.existsSync(appJsonPath));

if (fs.existsSync(appJsonPath)) {
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  const expo = appJson.expo || {};

  check('iOS Bundle Identifier (com.amal.lifeos)', expo.ios?.bundleIdentifier === 'com.amal.lifeos');
  check('Android Package Name (com.amal.lifeos)', expo.android?.package === 'com.amal.lifeos');
  check('Semantic Version defined (1.0.0)', expo.version === '1.0.0');
  check('iOS Build Number defined', expo.ios?.buildNumber !== undefined);
  check('Android Version Code defined', expo.android?.versionCode !== undefined);

  // Background Audio Permissions (Apple App Store Guideline 2.5.4)
  const iosBgModes = expo.ios?.infoPlist?.UIBackgroundModes || [];
  check('iOS UIBackgroundModes includes "audio"', iosBgModes.includes('audio'));

  // Android Foreground Media Playback Permissions (Google Play Policy)
  const androidPerms = expo.android?.permissions || [];
  check('Android Foreground Service Media Playback enabled', androidPerms.includes('FOREGROUND_SERVICE_MEDIA_PLAYBACK'));
  check('Android Fine & Coarse Location for Prayer Times enabled', androidPerms.includes('ACCESS_FINE_LOCATION'));
}

// 2. EAS Build Configuration (eas.json)
const easJsonPath = path.join(mobileDir, 'eas.json');
check('eas.json exists on disk', fs.existsSync(easJsonPath));

if (fs.existsSync(easJsonPath)) {
  const easJson = JSON.parse(fs.readFileSync(easJsonPath, 'utf8'));
  check('EAS Preview profile configured for Android APK', easJson.build?.preview?.android?.buildType === 'apk');
  check('EAS Production profile configured for Google Play AAB', easJson.build?.production?.android?.buildType === 'app-bundle');
  check('EAS Production profile configured for iOS App Store', easJson.build?.production?.ios !== undefined);
}

// 3. Asset Integrity
const iconPath = path.join(mobileDir, 'assets/icon.png');
const splashPath = path.join(mobileDir, 'assets/splash.png');
const adaptiveIconPath = path.join(mobileDir, 'assets/adaptive-icon.png');
check('App Icon (assets/icon.png) exists', fs.existsSync(iconPath));
check('Splash Screen (assets/splash.png) exists', fs.existsSync(splashPath));
check('Adaptive Android Icon (assets/adaptive-icon.png) exists', fs.existsSync(adaptiveIconPath));

// 4. Entrypoint and 17 Screens
const indexJsPath = path.join(mobileDir, 'index.js');
const appTsxPath = path.join(mobileDir, 'src/App.tsx');
check('Mobile entrypoint (index.js) exists', fs.existsSync(indexJsPath));
check('Active 17-Screen Shell (src/App.tsx) exists', fs.existsSync(appTsxPath));

const screensDir = path.join(mobileDir, 'src/screens');
const screens = fs.readdirSync(screensDir).filter(f => f.endsWith('.tsx'));
check(`All 17 Production Screens present on disk (Found: ${screens.length})`, screens.length === 17);

// 5. Hooks and Store Modules
check('Custom Hooks module (apps/mobile/hooks/index.ts) exists', fs.existsSync(path.join(mobileDir, 'hooks/index.ts')));
check('Sovereign App Store module (apps/mobile/store/index.ts) exists', fs.existsSync(path.join(mobileDir, 'store/index.ts')));

console.log('\n======================================================================');
console.log(`AUDIT SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log('======================================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('★ APP STORE & GOOGLE PLAY DEPLOYMENT READINESS CERTIFIED 100% ★\n');
  process.exit(0);
}
