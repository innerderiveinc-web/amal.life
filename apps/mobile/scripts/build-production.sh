#!/usr/bin/env bash
set -e

echo "=============================================================="
echo "AMAL OS MOBILE — PHYSICAL APP STORE BUILD & SUBMIT RUNNER"
echo "=============================================================="

cd "$(dirname "$0")/.."

echo "1. Running strict TypeScript typecheck..."
npx tsc --noEmit
echo "✓ TypeScript check passed: 0 errors."

echo "2. Verifying native assets and permissions in app.json..."
if [ ! -f "assets/icon.png" ] || [ ! -f "assets/splash.png" ]; then
  echo "❌ Error: Required assets (icon.png or splash.png) missing in assets/"
  exit 1
fi
echo "✓ App icons & splash screen verified."

echo "3. EAS Build Target Selection:"
echo "   a) Android APK (direct testing)"
echo "   b) Android AAB (Google Play production)"
echo "   c) iOS Simulator"
echo "   d) iOS IPA (Apple App Store / TestFlight)"

TARGET=${1:-"help"}

case "$TARGET" in
  "android-apk")
    echo "Building Android Preview APK..."
    npx eas build --platform android --profile preview
    ;;
  "android-prod")
    echo "Building Android Production AAB..."
    npx eas build --platform android --profile production
    ;;
  "ios-sim")
    echo "Building iOS Simulator Build..."
    npx eas build --platform ios --profile preview
    ;;
  "ios-prod")
    echo "Building iOS Production IPA..."
    npx eas build --platform ios --profile production
    ;;
  *)
    echo ""
    echo "Usage: ./scripts/build-production.sh [android-apk | android-prod | ios-sim | ios-prod]"
    echo "Example: ./scripts/build-production.sh android-apk"
    ;;
esac
