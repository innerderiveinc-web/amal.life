# AMAL Mobile OS — Physical Device Testing Runbook

This runbook guides engineers and quality auditors through verifying AMAL OS native features on a **real, physical iPhone or Android device**.

---

## 🚀 1. Prerequisites & Launching Expo

### On your Development Computer:
1. Ensure your computer and physical phone are on the **same Wi-Fi network** (or use the `--tunnel` flag if on different networks).
2. Start the Expo Metro Bundler:
   ```bash
   cd apps/mobile
   npx expo start
   # Or with public tunnel (if Wi-Fi isolation is enabled):
   npx expo start --tunnel
   ```

### On your Physical Device:
- **iPhone (iOS)**:
  1. Install the free **Expo Go** app from the Apple App Store.
  2. Open the default iOS **Camera app** and point it at the QR code displayed in your terminal.
  3. Tap the yellow **"Open in Expo Go"** banner.
- **Android**:
  1. Install **Expo Go** from Google Play Store.
  2. Open the Expo Go app and tap **"Scan QR code"**.
  3. Scan the terminal QR code.

---

## 📋 2. Real Hardware Verification Checklist

Execute these 4 physical tests to verify native hardware performance:

### Test 1: Background Audio & Lock-Screen Controls
- [ ] Navigate to the **Quran** tab (📖) or **Audio** tab (🎧).
- [ ] Tap **Play** on any Surah (e.g. Surah Al-Fatihah or Surah Al-Mulk).
- [ ] Verify audio is clearly audible.
- [ ] **Lock your phone (press the physical power button)**:
  - Verify recitation continues playing smoothly without pausing.
  - Wake phone screen: Verify the native lock-screen widget displays track title, Surah name, and functional **Play/Pause** buttons.

### Test 2: Hardware Magnetometer & Qibla Compass
- [ ] Navigate to the **Prayer** tab (🕋).
- [ ] When prompted, grant **"While Using App"** location permission.
- [ ] Slowly rotate your phone 360 degrees.
- [ ] Verify the compass needle rotates fluidly in real-time towards the Ka'bah direction (Makkah).

### Test 3: Airplane Mode & Offline Sovereignty (Zero Data)
- [ ] Turn on **Airplane Mode** (disable both Wi-Fi and Cellular data).
- [ ] Open AMAL OS on your phone:
  - Verify the **Today** screen loads instantly with today's prayer times.
  - Open the **Zakat Calculator** and compute Nisab — verify instant calculation.
  - Browse the **106-Book Canonical Library** — verify all metadata displays without network requests.
  - Open **Daily Muhasabah** and write a reflection — verify it saves locally into sovereign storage.

### Test 4: Dynamic Type & Ergonomics
- [ ] In phone Settings, increase font size to Maximum (Accessibility / Dynamic Type).
- [ ] Reopen AMAL OS: Verify text reflows gracefully without clipping buttons or truncating Arabic Ayahs.

---

## 🛠️ Automated Diagnostic Verification
To test mobile diagnostic contracts from terminal without a device:
```bash
pnpm test:unit
```
Outputs verified status across screen registries, 114 Surah boundaries, and bundle IDs.
