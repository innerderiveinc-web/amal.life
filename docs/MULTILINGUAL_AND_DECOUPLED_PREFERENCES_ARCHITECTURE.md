# AMAL OS
# MULTILINGUAL ARCHITECTURE & DECOUPLED PREFERENCE LAYER
# PERMANENT ARCHITECTURAL SPECIFICATION

---

## 1. CORE MISSION & STRATEGIC MANDATE

AMAL OS is architected as a **universal global Muslim operating system** that:
1. **Fully and authentically supports user preferences**:
   - Default / Preferred experience for the user: **Hanafi + Ahl-e-Sunnat wal Jamaat + Sufi / Barelvi / Razvi scholarly preference corpus** (*Kanzul Iman*, *Fatawa Razawiyya*, *Bahaar-e-Shariat*, *Khaza'in al-Irfan*, *Nur al-Irfan*, Tasawwuf/Tazkiyah literature).
2. **Never confines the platform to any single school or region**:
   - The underlying knowledge universe retains comprehensive, peer-reviewed coverage of **all Four Sunni Madhhabs (Hanafi, Maliki, Shafi'i, Hanbali)**, foundational Hadith collections (*Kutub al-Sittah*), Tafsir canons, and recognized scholarly traditions.
3. **Decouples Language from Scholarly / Madhhab Preference**:
   - A user's language choice (Urdu, Hindi, English, Arabic, Bengali, etc.) is independent of their fiqh or tradition choice.
4. **Enforces Strict Epistemic Separation: `Translation ≠ Tafsir`**:
   - Translations represent literal or meaning-oriented linguistic transfers of the sacred text.
   - Tafasir represent scholarly exegesis, legal deductions, historical context, and spiritual exposition.
   - They are maintained as distinct objects with their own attribution, editions, and review workflows.
5. **Translation Authenticity Invariant**:
   - **AI-generated Quran or Hadith translations are strictly prohibited from being treated as authoritative.**
   - If a verified human translation is not available in a requested language, AMAL cleanly displays:
     $$\mathbf{"Verified\ translation\ unavailable"}$$
     rather than fabricating or hallucinating text.

---

## 2. MULTILINGUAL ARCHITECTURAL STRUCTURE

```text
AMAL KNOWLEDGE UNIVERSE
│
├── 01. Quran
│   ├── Arabic Original (Mushaf al-Madinah Uthmanic Text)
│   │
│   ├── India Language Pack
│   │   ├── Urdu (Kanzul Iman by Imam Ahmad Raza Khan, Shah Rafi al-Din, etc.)
│   │   ├── Hindi (Kanzul Iman Hindi, Qur'an Sharif Hindi Concordance)
│   │   ├── Bengali (Kanzul Iman Bangla, Ahsanul Bayaan Bangla)
│   │   ├── Gujarati (Kanzul Iman Gujarati)
│   │   ├── Marathi (Pavitra Quran Marathi Tarjuma)
│   │   ├── Malayalam (Pavitra Quran Malayalam)
│   │   ├── Tamil (Al-Quran Tamil Tarjuma)
│   │   ├── Telugu (Divya Quran Telugu)
│   │   ├── Kannada (Quran Majeed Kannada)
│   │   └── Punjabi (Quran Sharif Punjabi)
│   │
│   └── Global Language Pack
│       ├── English (Faridul Haque - Kanzul Iman in English, Saheeh International, Pickthall)
│       ├── Persian (Fath al-Rahman by Shah Waliullah al-Dehlawi)
│       ├── Turkish (Elmalılı Hamdi Yazır)
│       ├── Indonesian (Kementerian Agama RI)
│       ├── Malay (JAKIM Standard)
│       ├── French (Dr. Muhammad Hamidullah)
│       ├── Spanish (Julio Cortes)
│       └── German (Murad Wilfried Hofmann / Frank Bubenheim)
│
├── 02. Tafsir (Strictly Separated from Translation)
│   ├── Urdu: Khaza'in al-Irfan (Sadr al-Afadil), Nur al-Irfan (Mufti Ahmad Yar Khan Na'imi)
│   ├── Arabic: Tafsir al-Jalalayn, Al-Tafsir al-Kabir (Imam al-Razi), Tafsir Ibn Kathir
│   ├── English: Tafsir Ibn Kathir (Abridged), Tafsir al-Jalalayn (English)
│   ├── Hindi: Khaza'in al-Irfan Hindi Abridged
│   └── Multi-language Commentary Corpus
│
├── 03. Hadith
│   ├── Arabic Original (Kutub al-Sittah, Muwatta Imam Malik, Musnad Ahmad)
│   └── Multi-language Translations with Canonical Hadith Numbering
│
├── 04. Four Sunni Madhhabs
│   ├── Hanafi: Mukhtasar al-Quduri, Al-Hidayah, Radd al-Muhtar, Bahaar-e-Shariat, Fatawa Razawiyya
│   ├── Maliki: Al-Muwatta, Al-Mudawwanah, Al-Risalah, Mukhtasar Khalil
│   ├── Shafi'i: Matn Abi Shuja', Minhaj al-Talibin, Al-Majmu' Sharh al-Muhadhdhab
│   └── Hanbali: Zad al-Mustaqni', Al-Mughni (Ibn Qudamah)
│
├── 05. Scholarly Traditions
│   ├── Ahl-e-Sunnat / Razvi Preferred Corpus
│   ├── Classical Traditionalist / Ash'ari / Maturidi
│   └── Contemporary Recognized Councils (OIC Fiqh Academy, AMJA, etc.)
│
└── 06. Practical Deen
    ├── Salah, Ramadan, Zakat, Hajj, Umrah, Family, Character, Daily Life
```

---

## 3. STRICT SEPARATION: TRANSLATION ≠ TAFSIR

Each Ayah node contains:
```text
Quran Ayah (e.g. 17:78)
   │
   ├── Arabic Original Text (Uthmanic)
   │
   ├── Translations List (VerifiedTranslationRecord[])
   │    ├── Urdu: Kanzul Iman
   │    ├── English: The Treasure of Faith / Saheeh International
   │    ├── Hindi: Kanzul Iman Hindi
   │    └── ...
   │
   └── Tafasir List (VerifiedTafsirRecord[])
        ├── Urdu: Khaza'in al-Irfan fi Tafsir al-Qur'an (Mawlana Na'im al-Din Muradabadi)
        ├── Urdu: Nur al-Irfan (Mufti Ahmad Yar Khan Na'imi)
        ├── Arabic: Tafsir al-Jalalayn
        └── English: Tafsir Ibn Kathir
```

Each record contains complete provenance, edition, publisher, license, and verification metadata.

---

## 4. DECOUPLED PREFERENCE LAYER IN ACTION

AMAL enables complete flexibility in user preferences:

### Scenario A: User Preferred Profile (Hanafi + Ahl-e-Sunnat / Razvi + Urdu)
```json
{
  "userId": "user_bareilly_01",
  "interfaceLanguage": "ur",
  "contentLanguage": "ur",
  "preferredQuranTranslator": "Imam Ahmad Raza Khan (Kanzul Iman)",
  "preferredTafsirWork": "Khaza'in al-Irfan",
  "madhhabPreference": "HANAFI",
  "scholarlyTraditionPreference": "AHL_E_SUNNAT_RAZVI",
  "spiritualLiteraturePreference": "TASAWWUF",
  "showComparativeFiqh": true
}
```
**Outcome**:
- **Quran Translation**: *Kanzul Iman* by Ala Hazrat Imam Ahmad Raza Khan.
- **Tafsir**: *Khaza'in al-Irfan* by Sadr al-Afadil.
- **Fiqh Answers**: Elevated Hanafi rulings referenced from *Al-Hidayah*, *Fatawa Razawiyya*, and *Bahaar-e-Shariat*.
- **Comparative Fiqh**: All 3 other Sunni schools (Maliki, Shafi'i, Hanbali) remain visible and accessible in comparative tabs.

### Scenario B: Shafi'i User Profile (English + Shafi'i)
```json
{
  "userId": "user_cairo_01",
  "interfaceLanguage": "en",
  "contentLanguage": "en",
  "preferredQuranTranslator": "Saheeh International",
  "preferredTafsirWork": "Tafsir Ibn Kathir",
  "madhhabPreference": "SHAFI_I",
  "scholarlyTraditionPreference": "CLASSICAL_TRADITIONAL",
  "spiritualLiteraturePreference": "GENERAL_ADAB",
  "showComparativeFiqh": true
}
```
**Outcome**:
- Elevated Shafi'i positions (*Minhaj al-Talibin*, *Al-Majmu'*) based on the exact same underlying shared evidence graph.

---

## 5. API ENDPOINTS

The following endpoints are wired in `ApiRouter`:

1. `GET /api/v1/knowledge/quran/ayah/:surah/:ayah`  
   Retrieves the full multilingual view with distinct translations and tafasir.
2. `POST /api/v1/knowledge/quran/translation`  
   Queries a verified translation. Returns `"Verified translation unavailable"` if not found.
3. `POST /api/v1/knowledge/quran/tafsir`  
   Queries a verified tafsir commentary. Returns `"Verified tafsir unavailable"` if not found.
4. `POST /api/v1/knowledge/quran/personalized`  
   Resolves verse translation & tafsir matching `DecoupledUserPreferences`.
5. `POST /api/v1/knowledge/universal/decoupled-answer`  
   Resolves juristic inquiries elevating user's preferred school while retaining comparative schools.
6. `GET /api/v1/knowledge/multilingual/summary`  
   Returns the status and health metrics of India and Global language packs.
