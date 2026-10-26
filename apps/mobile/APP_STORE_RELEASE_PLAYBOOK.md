# AMAL OS — Mobile App Store Release Playbook
**Package:** `com.amal.lifeos` | **Framework:** React Native + Expo Router | **Platform:** iOS & Android

---

## 📋 Executive Overview

AMAL OS Mobile (`apps/mobile`) is engineered as an ad-free, zero-tracking, sovereign Muslim Life OS. This playbook details the exact steps to build, sign, and submit the application to the **Apple App Store (iOS)** and **Google Play Store (Android)**.

---

## 🚀 Part 1: Automated 1-Command Build & Submission (EAS Cloud)

AMAL OS uses Expo Application Services (EAS) for cloud-based native compilation without requiring a local Mac or Android Studio.

### 1. Prerequisites
```bash
npm install -g eas-cli
cd apps/mobile
npx eas login
```

### 2. Android Production App Bundle (.aab)
```bash
# Builds signed Google Play Store App Bundle (.aab)
npx eas build --platform android --profile production
```
* The resulting `.aab` file will be generated in the EAS Cloud and ready for direct upload to Google Play Console.
* For a direct installable `.apk` for team testing:
```bash
npx eas build --platform android --profile preview
```

### 3. iOS Production Build (.ipa)
```bash
# Builds signed App Store binary (.ipa)
npx eas build --platform ios --profile production
```
* Automatically handles Apple Developer certificates and provisioning profiles via Apple App Store Connect API.

### 4. Direct 1-Click Submission to App Stores
```bash
# Submit Android to Google Play Internal Track:
npx eas submit --platform android

# Submit iOS directly to Apple TestFlight:
npx eas submit --platform ios
```

---

## 🍏 Part 2: Apple App Store Connect Submission Guide

### 1. App Store Information
* **App Name:** `AMAL OS — Muslim Life Intelligence`
* **Subtitle:** `Niyyah to Amal • Quran, Prayer & Sirah`
* **Primary Category:** `Lifestyle`
* **Secondary Category:** `Reference` or `Education`
* **Age Rating:** `4+` (No objectionable content, zero gambling, zero alcohol).

### 2. Apple App Privacy Nutrition Labels
Because AMAL OS is sovereign and privacy-first:
* **Data Used to Track You:** `None`
* **Data Linked to You:** `None`
* **Data Not Linked to You:**
  * **Location:** Used strictly on-device for calculating solar prayer times and Qibla compass (`NSLocationWhenInUseUsageDescription`). Never stored or sent to remote analytics.
  * **Audio / Usage:** Background audio playback (`UIBackgroundModes: ["audio"]`) strictly for Holy Quran, Shama'il, and Sirah recitation playback while the screen is locked.

### 3. Review Notes for Apple App Review Team
```text
AMAL OS is a comprehensive Islamic practice operating system. 
- Location permission is requested exclusively to compute local prayer times using the astronomical calculation engine and Qibla compass bearing.
- Background audio mode is enabled so users can listen to Quranic recitations and prophetic biography audiobooks while their phone is locked or multitasking.
- The app operates completely ad-free with zero user tracking or data selling.
Demo credentials: Guest mode is enabled by default; no login required to review all features.
```

---

## 🤖 Part 3: Google Play Console Submission Guide

### 1. Store Listing Details
* **Title:** `AMAL OS: Sovereign Muslim Life`
* **Short Description:** `Ad-free, zero-tracking Islamic OS: Quran, Prayer, Duas & Sirah Audiobooks.`
* **Full Description:**
  ```text
  AMAL OS is an authentic Islamic operating system grounded in Sawad al-A'zam orthodoxy across the 4 Sunni Madhhabs.
  
  Features:
  • Exact prayer times and Qibla compass
  • 114 Surahs Holy Quran with authentic Urdu translation (Kanz-ul-Iman)
  • 4 Canonical Sirah Masterworks & Audiobooks
  • Masnoon Duas, Morning/Evening Adhkar, and Digital Tasbih
  • Zero ads, zero user tracking, complete data privacy
  ```

### 2. Data Safety Form
* **Does your app collect or share user data?** `No`
* **Location:** Ephemeral on-device only.
* **Is data encrypted in transit?** `Yes (HTTPS/TLS 1.3)`.
* **Account Deletion:** Users can delete all local notes and preferences with 1-click in Settings.

---

## ✅ Part 4: Pre-Release Verification Checklist

- [x] Bundle Identifier: `com.amal.lifeos`
- [x] All 17 Production Screens wired via Tab & Drawer navigation
- [x] App Icon (`1024x1024`) and Adaptive Icon generated in `assets/`
- [x] Splash Screen configured with brand emerald `#1B4332`
- [x] Background Audio modes registered in `Info.plist` & `AndroidManifest.xml`
- [x] Location purpose strings verified for iOS & Android
- [x] Zero TypeScript compilation errors (`tsc --noEmit`)
