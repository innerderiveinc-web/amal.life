#!/usr/bin/env bash
set -euo pipefail

# ==============================================================================
# AMAL OS — ANDROID APK BUILD AUTOMATION SCRIPT
# ==============================================================================

echo "=========================================================================="
echo "📱 AMAL OS ANDROID APK BUILD ENGINE"
echo "=========================================================================="
echo "Choose your build strategy:"
echo "1) EAS Cloud Build (Recommended — No Android SDK or Java installation required)"
echo "2) Local Gradle Build (Requires Android SDK & JDK 17 installed locally)"
echo "=========================================================================="

MODE="${1:-eas}"

cd "$(dirname "$0")/../apps/mobile"

if [ "$MODE" = "local" ]; then
  echo "🔨 Generating native Android project..."
  npx expo prebuild --platform android --clean
  
  echo "📦 Compiling debug APK via Gradle..."
  cd android
  ./gradlew assembleDebug
  
  echo "✅ Local Android APK successfully generated at:"
  echo "   $(pwd)/app/build/outputs/apk/debug/app-debug.apk"
else
  echo "☁️ Submitting Android APK build to EAS Cloud..."
  echo "Command: npx eas-cli build -p android --profile preview"
  echo "Note: If not logged in, run 'npx eas-cli login' first."
  npx eas-cli build -p android --profile preview --non-interactive || {
    echo "💡 To build interactively or log in to Expo, run:"
    echo "   cd apps/mobile && npx eas login && npx eas build -p android --profile preview"
  }
fi
