# AMAL Mobile OS (`@amal/app-mobile`)

Production-grade Expo / React Native mobile client for **AMAL OS — Muslim Life Intelligence Platform**.

---

## 🏛️ Architecture Overview

The mobile application is structured around a **Unified Dual-Layer Runtime** designed to provide both an immediate monolithic shell and a deep URL-addressable navigation taxonomy:

```
apps/mobile/
├── index.js                     # Root entrypoint registering src/App.tsx
├── app.json                     # Expo SDK 51 configuration (iOS & Android bundle IDs: com.amal.lifeos)
├── src/
│   ├── App.tsx                  # Active 17-Screen Shell (5 Pillars + 3 Drawer Clusters)
│   ├── screens/                 # 17 Complete Production Screen Implementations
│   │   ├── TodayScreen.tsx      # Daily timeline, Niyyah, contextual load balancing
│   │   ├── QuranScreen.tsx      # Full 114 Surahs, Kanz-ul-Iman translation, EveryAyah audio
│   │   ├── AskAmalScreen.tsx    # 4 Epistemic categories, Fatwa firewall
│   │   ├── PrayerScreen.tsx     # 147-city global prayer engine, Qibla compass
│   │   ├── TasbihScreen.tsx     # Haptic digital masbaha, daily adhkar
│   │   ├── CalculatorScreen.tsx # Zakat & Miras (inheritance) calculation
│   │   ├── LibraryScreen.tsx    # 106-Book Canonical Sunni Library
│   │   ├── SirahScreen.tsx      # Living Sirah, timeline & Shama'il
│   │   ├── CalendarScreen.tsx   # Hijri calendar, sunnah fasts & white days
│   │   ├── FamilyScreen.tsx     # Family deen circle & isolated reflections
│   │   ├── AboutScreen.tsx      # Methodology, scholarly board & orthodoxy signoffs
│   │   ├── AudioScreen.tsx      # Classical recitations, qasidas & audio streams
│   │   ├── VaultScreen.tsx      # Knowledge vault & khutbah notes verification
│   │   ├── JourneyScreen.tsx    # 14/30-day gentle habit formation
│   │   ├── ReflectionScreen.tsx # Daily Muhasabah without moral scorecards
│   │   ├── PrivacyCenterScreen.tsx # On-device data sovereignty & OWASP MASVS controls
│   │   └── ReplayScreen.tsx     # Deen Replay & longitudinal spiritual trends
│   └── data/                    # Static datasets (114 Surahs, Wisdom, Cities)
├── app/                         # Deep URL-Addressable Expo Router Specification (36 Screens)
│   ├── (auth)/                  # Sovereign authentication & local passkey
│   ├── (onboarding)/            # 8-step calm onboarding & niyyah setup
│   ├── (tabs)/                  # 5 canonical bottom tabs
│   ├── ask/                     # Deep-linked consultation workspace
│   ├── journeys/                # Journey detail & daily step execution
│   ├── reflections/             # Muhasabah insights & history
│   ├── family/                  # Family circle management
│   ├── settings/                # Memory, privacy, and safety switches
│   └── scholar/                 # Mobile scholar triage desk
├── components/                  # Shared React Native UI components
└── services/                    # Native offline sync & API clients
```

---

## 📱 Navigation Model

1. **5 Bottom Devotional Pillars**:
   - `Today` (آج)
   - `Quran` (قرآن)
   - `Ask` (رہنمائی)
   - `Prayer` (نماز)
   - `Tasbih` (تسبیح)

2. **3 Categorized Drawer Apps (12 Services)**:
   - **Canonical Sciences & Vault (کتب و علوم)**: Library, Sirah, Audio, Vault, Replay.
   - **Devotional Practices & Growth (عبادات، منازل و محاسبہ)**: Zakat/Miras Calculator, Hijri Calendar, Journeys, Muhasabah.
   - **Family & Sovereignty (خاندان و خود مختار تحفظ)**: Family Circle, Privacy Sovereign Center, About Methodology.

---

## 🛠️ Verification & Development

```bash
# Typecheck mobile code
pnpm --filter @amal/app-mobile run typecheck

# Start Expo development server (Metro Bundler)
pnpm --filter @amal/app-mobile run start

# Run unit tests verifying screen registry and Quran directory
pnpm test:unit
```
