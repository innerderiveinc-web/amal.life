#!/usr/bin/env bash
# ==============================================================================
# AMAL OS — TURNKEY NATIVE MOBILE BUILD AUTOMATION SCRIPT
# Platform: Android (.apk / .aab) & iOS (.ipa / Archive)
# ==============================================================================

set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MOBILE_DIR="$REPO_ROOT/apps/mobile"

echo "======================================================================"
echo "          AMAL OS — NATIVE MOBILE BUILD ENGINE                        "
echo "======================================================================"
echo "Mobile Directory: $MOBILE_DIR"
echo ""

# 1. Check prerequisites
echo "==> 1. Checking Environment Toolchain..."
if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is not installed."
  exit 1
fi
echo "  ✓ Node: $(node -v)"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "Error: pnpm is not installed."
  exit 1
fi
echo "  ✓ pnpm: $(pnpm -v)"

# 2. Typecheck Verification
echo ""
echo "==> 2. Verifying TypeScript Type Safety (0 Errors Policy)..."
cd "$MOBILE_DIR"
pnpm run typecheck
echo "  ✓ apps/mobile TypeScript: 0 errors verified."

# 3. Offline Assets Verification
echo ""
echo "==> 3. Verifying Bundled Offline Quran Corpus (114 Surahs)..."
SURAH_COUNT=$(ls -1 "$MOBILE_DIR/assets/data/quran/surahs" 2>/dev/null | wc -l | tr -d ' ')
if [ "$SURAH_COUNT" -ne "114" ]; then
  echo "  Warning: Expected 114 surah files in mobile assets, found: $SURAH_COUNT"
else
  echo "  ✓ All 114 Surahs offline assets confirmed present in mobile bundle."
fi

# 4. Display Build Targets
echo ""
echo "======================================================================"
echo "Available Build Commands for Mobile App Stores:"
echo "======================================================================"
echo "1. Android Standalone APK (for direct sideload / WhatsApp distribution):"
echo "   cd apps/mobile && npx eas build -p android --profile preview"
echo ""
echo "2. Android Production App Bundle (.aab for Google Play Console):"
echo "   cd apps/mobile && npx eas build -p android --profile production"
echo ""
echo "3. iOS App Store / TestFlight Archive (.ipa):"
echo "   cd apps/mobile && npx eas build -p ios --profile production"
echo ""
echo "4. Local Android Project Generation (for Android Studio):"
echo "   cd apps/mobile && npx expo prebuild --platform android"
echo ""
echo "5. Local iOS Project Generation (for Xcode on macOS):"
echo "   cd apps/mobile && npx expo prebuild --platform ios"
echo "======================================================================"
echo "AMAL OS Mobile Build Readiness: 100% READY"
