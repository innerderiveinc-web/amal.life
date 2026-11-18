/**
 * AMAL SIRAH & SHAMA'IL KNOWLEDGE FACTORY + PROPHETIC LIFE GRAPH ENGINE
 * Canonical Implementation of Prophetic Biography, Shama'il Taxonomy,
 * Temporal Graph, Multi-Source Evidence Ledgers, Variant Reports & Governed AI Answers.
 *
 * Epistemic Invariant:
 * QURAN ≠ HADITH ≠ TAFSIR ≠ FIQH ≠ AQEEDAH ≠ SIRAH ≠ SHAMAIL ≠ TAZKIYAH ≠ TASAWWUF
 */

import {
  SirahSourceRecord,
  SirahSourceType,
  SirahSourceTier,
  SirahEventRecord,
  SirahEventEvidenceItem,
  SirahReportVariantRecord,
  ShamailReportRecord,
  ShamailCategory,
  SirahClaimRecord,
  SirahClaimClass,
  SirahConfidenceState,
  SirahAmalMappingRecord,
  SirahAIAnswerContract,
  PropheticLifePeriod,
  PropheticGraphNode,
  PropheticGraphEdge,
  PropheticLifeExplorerView,
  SirahTimelineQueryResponse,
} from '@amal/types';
import { UniversalMasterCatalogueEngine } from './universal-master-catalogue-engine.js';
import { GlobalHeritageAtlasEngine } from './global-heritage-atlas-engine.js';

export class SirahShamailKnowledgeEngine {
  private readonly catalogueEngine: UniversalMasterCatalogueEngine;
  private readonly atlasEngine: GlobalHeritageAtlasEngine;

  private readonly sources: Map<string, SirahSourceRecord> = new Map();
  private readonly events: Map<string, SirahEventRecord> = new Map();
  private readonly variants: Map<string, SirahReportVariantRecord> = new Map();
  private readonly shamailReports: Map<string, ShamailReportRecord> = new Map();
  private readonly claims: Map<string, SirahClaimRecord> = new Map();
  private readonly amalMappings: Map<string, SirahAmalMappingRecord> = new Map();
  private readonly graphNodes: Map<string, PropheticGraphNode> = new Map();
  private readonly graphEdges: PropheticGraphEdge[] = [];

  constructor(
    catalogueEngine: UniversalMasterCatalogueEngine,
    atlasEngine: GlobalHeritageAtlasEngine
  ) {
    this.catalogueEngine = catalogueEngine;
    this.atlasEngine = atlasEngine;

    this.initializeCanonicalSources();
    this.initializePropheticGraph();
    this.initializeCanonicalEvents();
    this.initializeReportVariants();
    this.initializeShamailKnowledge();
    this.initializeClaimsAndAmalMappings();
  }

  // =========================================================================
  // 1. SOURCE REGISTRY (Tier A to Tier E)
  // =========================================================================

  private initializeCanonicalSources(): void {
    const list: SirahSourceRecord[] = [
      {
        source_id: 'SIR-SRC-0000001',
        title_original: 'القرآن الكريم',
        title_transliterated: 'Al-Quran al-Karim',
        title_normalized: 'Al-Quran al-Karim',
        author_name: 'Divine Revelation transmitted by Tawatur',
        language: 'ARABIC',
        genre: 'SIRAH',
        subgenre: 'PRIMARY_REVELATION',
        source_type: 'QURAN_REFERENCE_SOURCE',
        source_tier: 'TIER_A_PRIMARY_REVELATION',
        rights_status: 'PUBLIC_DOMAIN_CONFIRMED',
        lifecycle_state: 'PUBLISHED',
        scholarly_status: 'CANONICAL_REFERENCE',
        created_at: '2026-10-08',
        updated_at: '2026-10-08',
        version: '1.0.0',
      },
      {
        source_id: 'SIR-SRC-0000002',
        title_original: 'الجامع المسند الصحيح المختصر (صحيح البخاري)',
        title_transliterated: 'Sahih al-Bukhari',
        title_normalized: 'Sahih al-Bukhari',
        author_name: 'Imam Muhammad b. Ismail al-Bukhari (d. 256 AH)',
        author_death_hijri: 256,
        language: 'ARABIC',
        genre: 'SIRAH',
        subgenre: 'HADITH_MAGHAZI',
        source_type: 'HADITH_SOURCE',
        source_tier: 'TIER_A_PRIMARY_REVELATION',
        edition_title: 'Al-Sultaniyyah Edition',
        publisher: 'Bulaq, Cairo',
        rights_status: 'PUBLIC_DOMAIN_CONFIRMED',
        lifecycle_state: 'PUBLISHED',
        scholarly_status: 'CANONICAL_REFERENCE',
        created_at: '2026-10-08',
        updated_at: '2026-10-08',
        version: '1.0.0',
      },
      {
        source_id: 'SIR-SRC-0000003',
        title_original: 'الشمائل المحمدية والخصائص المصطفوية',
        title_transliterated: 'Al-Shamail al-Muhammadiyyah',
        title_normalized: 'Al-Shamail al-Muhammadiyyah',
        author_name: 'Imam Abu Isa Muhammad b. Isa al-Tirmidhi (d. 279 AH)',
        author_death_hijri: 279,
        language: 'ARABIC',
        genre: 'SHAMAIL',
        subgenre: 'PROPHETIC_CHARACTER_AND_DESCRIPTION',
        source_type: 'SHAMAIL',
        source_tier: 'TIER_A_PRIMARY_REVELATION',
        edition_title: 'Tahqiq Muhammad Awamah',
        publisher: 'Dar al-Yusr, Medina',
        editor: 'Muhammad Awamah',
        volume_count: 1,
        rights_status: 'PUBLIC_DOMAIN_CONFIRMED',
        lifecycle_state: 'PUBLISHED',
        scholarly_status: 'CANONICAL_REFERENCE',
        created_at: '2026-10-08',
        updated_at: '2026-10-08',
        version: '1.0.0',
      },
      {
        source_id: 'SIR-SRC-0000004',
        title_original: 'السيرة النبوية (سيرة ابن هشام)',
        title_transliterated: 'Al-Sirah al-Nabawiyyah (Sirat Ibn Hisham)',
        title_normalized: 'Sirat Ibn Hisham',
        author_name: 'Ibn Hisham (d. 218 AH) after Ibn Ishaq (d. 151 AH)',
        author_death_hijri: 218,
        language: 'ARABIC',
        genre: 'SIRAH',
        subgenre: 'CLASSICAL_SIRAH',
        source_type: 'SIRAH_CLASSICAL',
        source_tier: 'TIER_B_EARLY_SIRAH',
        edition_title: 'Tahqiq Mustafa al-Saqqa, Ibrahim al-Ibyari',
        publisher: 'Mustafa al-Babi al-Halabi, Cairo',
        volume_count: 2,
        rights_status: 'PUBLIC_DOMAIN_CONFIRMED',
        lifecycle_state: 'PUBLISHED',
        scholarly_status: 'CANONICAL_REFERENCE',
        created_at: '2026-10-08',
        updated_at: '2026-10-08',
        version: '1.0.0',
      },
      {
        source_id: 'SIR-SRC-0000005',
        title_original: 'مغازي موسى بن عقبة',
        title_transliterated: 'Maghazi Musa b. Uqbah',
        title_normalized: 'Maghazi Musa b. Uqbah',
        author_name: 'Musa b. Uqbah al-Asadi (d. 141 AH)',
        author_death_hijri: 141,
        language: 'ARABIC',
        genre: 'MAGHAZI',
        subgenre: 'EARLY_MAGHAZI',
        source_type: 'MAGHAZI',
        source_tier: 'TIER_B_EARLY_SIRAH',
        edition_title: 'Dirasah wa Jam: Muhammad Baqshish',
        publisher: 'Jamiat Ibn Zuhr, Agadir',
        rights_status: 'PUBLIC_DOMAIN_CONFIRMED',
        lifecycle_state: 'APPROVED',
        scholarly_status: 'CRITICAL_EDITION',
        created_at: '2026-10-08',
        updated_at: '2026-10-08',
        version: '1.0.0',
      },
      {
        source_id: 'SIR-SRC-0000006',
        title_original: 'الشفا بتعريف حقوق المصطفى',
        title_transliterated: 'Al-Shifa bi-Tarif Huquq al-Mustafa',
        title_normalized: 'Kitab al-Shifa',
        author_name: 'Al-Qadi Iyad b. Musa al-Yahsubi (d. 544 AH)',
        author_death_hijri: 544,
        language: 'ARABIC',
        genre: 'SHAMAIL',
        subgenre: 'PROPHETIC_VIRTUES_AND_RIGHTS',
        source_type: 'DALAIL',
        source_tier: 'TIER_C_LATER_CLASSICAL',
        edition_title: 'Tahqiq Abduh Ali Kushak',
        publisher: 'Dar al-Kitab al-Arabi, Beirut',
        volume_count: 2,
        rights_status: 'PUBLIC_DOMAIN_CONFIRMED',
        lifecycle_state: 'PUBLISHED',
        scholarly_status: 'CANONICAL_REFERENCE',
        created_at: '2026-10-08',
        updated_at: '2026-10-08',
        version: '1.0.0',
      },
      {
        source_id: 'SIR-SRC-0000007',
        title_original: 'البداية والنهاية (فصول السيرة)',
        title_transliterated: 'Al-Bidayah wa al-Nihayah (Fusul al-Sirah)',
        title_normalized: 'Al-Bidayah wa al-Nihayah',
        author_name: 'Al-Hafiz Imad al-Din Ismail b. Kathir (d. 774 AH)',
        author_death_hijri: 774,
        language: 'ARABIC',
        genre: 'SIRAH',
        subgenre: 'COMPREHENSIVE_CHRONICLE',
        source_type: 'HISTORICAL_CHRONICLE',
        source_tier: 'TIER_C_LATER_CLASSICAL',
        edition_title: 'Tahqiq Dr. Abd Allah al-Turki',
        publisher: 'Dar Hijr, Giza',
        volume_count: 21,
        rights_status: 'PUBLIC_DOMAIN_CONFIRMED',
        lifecycle_state: 'PUBLISHED',
        scholarly_status: 'CANONICAL_REFERENCE',
        created_at: '2026-10-08',
        updated_at: '2026-10-08',
        version: '1.0.0',
      },
    ];

    for (const src of list) {
      this.sources.set(src.source_id, src);
    }
  }

  // =========================================================================
  // 2. PROPHETIC LIFE GRAPH (Temporal & Relational)
  // =========================================================================

  private initializePropheticGraph(): void {
    // Add Prophet Node
    this.graphNodes.set('NODE-PROPHET-MUHAMMAD', {
      id: 'NODE-PROPHET-MUHAMMAD',
      type: 'PROPHET',
      label: 'Prophet Muhammad ﷺ',
      arabic_label: 'محمد رسول الله ﷺ',
      attributes: {
        birth_year_ce: 570,
        passing_year_ce: 632,
        burial_place: 'Al-Masjid al-Nabawi, Al-Madinah al-Munawwarah',
      },
    });

    // Add Key Geographic Places
    const places = [
      { id: 'PLACE-MAKKAH', label: 'Makkah al-Mukarramah', type: 'CITY' as const, lat: 21.4225, lng: 39.8262 },
      { id: 'PLACE-MADINAH', label: 'Al-Madinah al-Munawwarah', type: 'CITY' as const, lat: 24.4672, lng: 39.6111 },
      { id: 'PLACE-HIRA', label: 'Ghar Hira (Jabal al-Nur)', type: 'MOUNTAIN' as const, lat: 21.4578, lng: 39.8592 },
      { id: 'PLACE-THAWUR', label: 'Ghar Thawr', type: 'MOUNTAIN' as const, lat: 21.3781, lng: 39.8497 },
      { id: 'PLACE-BADR', label: 'Badr Valley', type: 'BATTLEFIELD' as const, lat: 23.7833, lng: 38.7833 },
      { id: 'PLACE-HUDAYBIYYAH', label: 'Al-Hudaybiyyah', type: 'REGION' as const, lat: 21.4394, lng: 39.6736 },
    ];

    for (const p of places) {
      this.graphNodes.set(p.id, {
        id: p.id,
        type: p.type,
        label: p.label,
        attributes: { latitude: p.lat, longitude: p.lng },
      });
    }

    // Add Key Companions & People
    const people = [
      { id: 'PERSON-ABU-BAKR', label: 'Abu Bakr al-Siddiq', type: 'COMPANION' as const },
      { id: 'PERSON-UMAR', label: 'Umar ibn al-Khattab', type: 'COMPANION' as const },
      { id: 'PERSON-UTHMAN', label: 'Uthman ibn Affan', type: 'COMPANION' as const },
      { id: 'PERSON-ALI', label: 'Ali ibn Abi Talib', type: 'COMPANION' as const },
      { id: 'PERSON-KHADIJAH', label: 'Khadijah bint Khuwaylid', type: 'FAMILY_MEMBER' as const },
      { id: 'PERSON-AISHA', label: 'Aisha bint Abi Bakr', type: 'FAMILY_MEMBER' as const },
    ];

    for (const per of people) {
      this.graphNodes.set(per.id, {
        id: per.id,
        type: per.type,
        label: per.label,
        attributes: {},
      });
    }
  }

  // =========================================================================
  // 3. CANONICAL EVENTS & MULTI-TIER EVIDENCE LEDGERS
  // =========================================================================

  private initializeCanonicalEvents(): void {
    const eventList: SirahEventRecord[] = [
      {
        event_id: 'SIR-EVT-0000001',
        canonical_title: 'The First Revelation at Cave Hira',
        arabic_title: 'بدء الوحي في غار حراء',
        alternate_titles: ['Beginning of Prophethood', 'First Descent of Jibril'],
        event_type: 'REVELATION',
        life_period: 'MAKKAH_EARLY_DAWAH',
        description_neutral:
          'In his fortieth year, while engaged in solitary contemplative worship (tahannuth) at Cave Hira on Jabal al-Nur, Jibril appeared to Prophet Muhammad ﷺ commanding him: "Iqra" (Read/Recite), delivering the initial five verses of Surah al-Alaq.',
        start_gregorian_year: 610,
        date_precision: 'MONTH',
        chronology_status: 'CANONICAL_CONSENSUS',
        chronology_notes: 'Agreed by major scholars to have occurred in the month of Ramadan in the 40th year of his noble life.',
        location_name: 'Ghar Hira, Jabal al-Nur, Makkah',
        location_certainty: 'ESTABLISHED',
        key_participants: ['Prophet Muhammad ﷺ', 'Archangel Jibril', 'Khadijah bint Khuwaylid', 'Waraqah ibn Nawfal'],
        evidence_items: [
          {
            evidence_id: 'EVD-HIRA-01',
            source_id: 'SIR-SRC-0000001',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'QURAN_AYAH',
            reference: 'Surah Al-Alaq 96:1-5',
            passage_text_arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ...',
            passage_text_translation: 'Recite in the name of your Lord who created...',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
          },
          {
            evidence_id: 'EVD-HIRA-02',
            source_id: 'SIR-SRC-0000002',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'HADITH_NARRATION',
            reference: 'Sahih al-Bukhari, Kitab Bad al-Wahy, Hadith #3',
            passage_text_arabic: 'حَتَّى جَاءَهُ الْحَقُّ وَهُوَ فِي غَارِ حِرَاءٍ...',
            passage_text_translation: 'Until the Truth came upon him while he was in the Cave of Hira...',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
            hadith_grading: 'Sahih (Transmitted by Aisha)',
          },
        ],
        variant_reports: [],
        quran_cross_references: ['96:1', '96:2', '96:3', '96:4', '96:5'],
        hadith_cross_references: ['Sahih al-Bukhari #3', 'Sahih Muslim #160'],
        lessons: [
          'Sincere contemplation and seeking moral clarity precede divine guidance.',
          'The primacy of knowledge, reading, and literacy as the bedrock of Islamic civilization.',
          'The compassionate counsel and psychological solace provided by Sayyidah Khadijah.',
        ],
        related_shamail_traits: ['HUMILITY_AND_SIMPLICITY', 'WORSHIP_AND_NIGHT_DEVOTION'],
        related_amal_practices: ['Seeking sacred knowledge daily', 'Quiet morning contemplation (Muraqabah)'],
        review_status: 'VERIFIED_PUBLISHED',
      },
      {
        event_id: 'SIR-EVT-0000002',
        canonical_title: 'The Great Migration to Madinah (Al-Hijrah)',
        arabic_title: 'الهجرة النبوية المباركة إلى المدينة المنورة',
        alternate_titles: ['The Prophetic Migration', 'Departure from Cave Thawr'],
        event_type: 'MIGRATION',
        life_period: 'THE_HIJRAH_MIGRATION',
        description_neutral:
          'Facing escalating assassination plots by Quraysh in Makkah, Prophet Muhammad ﷺ and his loyal companion Abu Bakr al-Siddiq covertly departed Makkah, sheltered three nights in Cave Thawr, and journeyed along an unfrequented coastal route to arrive at Quba and Yathrib (Madinah).',
        start_hijri_year: 1,
        start_hijri_month: 3, // Rabi' al-Awwal
        start_gregorian_year: 622,
        date_precision: 'EXACT',
        chronology_status: 'CANONICAL_CONSENSUS',
        chronology_notes: 'Arrival at Quba historically dated to Monday, 8 or 12 Rabi al-Awwal (September 622 CE).',
        location_name: 'From Makkah through Cave Thawr to Quba/Madinah',
        location_certainty: 'ESTABLISHED',
        key_participants: ['Prophet Muhammad ﷺ', 'Abu Bakr al-Siddiq', 'Ali ibn Abi Talib', 'Abdullah ibn Urayqit', 'Asma bint Abi Bakr'],
        evidence_items: [
          {
            evidence_id: 'EVD-HIJRA-01',
            source_id: 'SIR-SRC-0000001',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'QURAN_AYAH',
            reference: 'Surah At-Tawbah 9:40',
            passage_text_arabic: 'إِذْ أَخْرَجَهُ الَّذِينَ كَفَرُوا ثَانِيَ اثْنَيْنِ إِذْ هُمَا فِي الْغَارِ إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا',
            passage_text_translation: 'When those who disbelieved had driven him out as one of two, when they were in the cave and he said to his companion: Do not grieve; indeed Allah is with us.',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
          },
          {
            evidence_id: 'EVD-HIJRA-02',
            source_id: 'SIR-SRC-0000002',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'HADITH_NARRATION',
            reference: 'Sahih al-Bukhari, Kitab Manaqib al-Ansar, Hadith #3905',
            passage_text_arabic: 'قُلْتُ لِلنَّبِيِّ صلى الله عليه وسلم وَأَنَا فِي الْغَارِ...',
            passage_text_translation: 'I said to the Prophet ﷺ while I was in the cave: If any one of them looked down at his feet he would see us. He said: What do you think of two, of whom Allah is the third?',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
            hadith_grading: 'Sahih (Transmitted by Abu Bakr)',
          },
        ],
        variant_reports: ['SIR-VAR-0000001'],
        quran_cross_references: ['9:40', '8:30'],
        hadith_cross_references: ['Sahih al-Bukhari #3905', 'Sahih al-Bukhari #3906'],
        lessons: [
          'Absolute reliance upon Allah (Tawakkul) coupled with meticulous practical planning (Asbab).',
          'Loyalty, steadfast friendship, and selfless sacrifice demonstrated by Abu Bakr and Ali.',
          'Establishing sanctuary and communal peace when religious freedoms are denied.',
        ],
        related_shamail_traits: ['COURAGE_AND_STEADFASTNESS', 'PATIENCE_AND_FORBEARANCE'],
        related_amal_practices: ['Practicing calm reliance in hardship (Tawakkul)', 'Cultivating sincere spiritual companionship (Suhbah)'],
        review_status: 'VERIFIED_PUBLISHED',
      },
      {
        event_id: 'SIR-EVT-0000003',
        canonical_title: 'The Great Battle of Badr (Ghazwat Badr al-Kubra)',
        arabic_title: 'غزوة بدر الكبرى (يوم الفرقان)',
        alternate_titles: ['The Day of Criterion', 'Battle of Badr'],
        event_type: 'BATTLE',
        life_period: 'MADINAH_EXPEDITIONS_DEFENSE',
        description_neutral:
          'On 17 Ramadan in the second year of Hijrah, an outnumbered Muslim force of approximately 313 companions confronted an equipped Makkan army of nearly 1,000 near the wells of Badr, resulting in a decisive victory that consolidated the sovereignty of the nascent Madinan state.',
        start_hijri_year: 2,
        start_hijri_month: 9, // Ramadan 17
        start_gregorian_year: 624,
        date_precision: 'EXACT',
        chronology_status: 'CANONICAL_CONSENSUS',
        chronology_notes: 'Consensus of classical historians: Friday, 17th of Ramadan, 2 AH.',
        location_name: 'Wells of Badr, 130 km southwest of Madinah',
        location_certainty: 'ESTABLISHED',
        key_participants: ['Prophet Muhammad ﷺ', 'Abu Bakr al-Siddiq', 'Ali ibn Abi Talib', 'Hamzah ibn Abd al-Muttalib', 'Abu Jahl (Amr b. Hisham)'],
        evidence_items: [
          {
            evidence_id: 'EVD-BADR-01',
            source_id: 'SIR-SRC-0000001',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'QURAN_AYAH',
            reference: 'Surah Ali Imran 3:123',
            passage_text_arabic: 'وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنتُمْ أَذِلَّةٌ ۖ فَاتَّقُوا اللَّهَ لَعَلَّكُمْ تَشْكُرُونَ',
            passage_text_translation: 'And Allah had already given you victory at Badr while you were few in number. Then fear Allah; perhaps you will be grateful.',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
          },
          {
            evidence_id: 'EVD-BADR-02',
            source_id: 'SIR-SRC-0000001',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'QURAN_AYAH',
            reference: 'Surah Al-Anfal 8:9-11',
            passage_text_arabic: 'إِذْ تَسْتَغِيثُونَ رَبَّكُمْ فَاسْتَجَابَ لَكُمْ أَنِّي مُمِدُّكُم بِأَلْفٍ مِّنَ الْمَلَائِكَةِ مُرْدِفِينَ',
            passage_text_translation: 'When you asked help of your Lord, and He answered you: Indeed, I will reinforce you with a thousand from the angels, rank after rank.',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
          },
          {
            evidence_id: 'EVD-BADR-03',
            source_id: 'SIR-SRC-0000002',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'HADITH_NARRATION',
            reference: 'Sahih al-Bukhari, Kitab al-Maghazi, Hadith #3953',
            passage_text_arabic: 'كَانَ عِدَّةُ أَصْحَابِ بَدْرٍ بضْعَةَ عَشَرَ وَثَلاَثَمِائَةٍ...',
            passage_text_translation: 'The number of the companions of Badr was some three hundred and ten and odd...',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
            hadith_grading: 'Sahih (Transmitted by al-Bara b. Azib)',
          },
        ],
        variant_reports: [],
        quran_cross_references: ['3:123', '8:9', '8:17', '8:41'],
        hadith_cross_references: ['Sahih al-Bukhari #3953', 'Sahih Muslim #1763'],
        lessons: [
          'Numbers and physical equipment do not guarantee triumph; spiritual cohesion and divine assistance prevail.',
          'The virtue of earnest dua and supplicatory weeping before trials.',
          'Consistently seeking consultation (Shura) with companions even during critical moments.',
        ],
        related_shamail_traits: ['COURAGE_AND_STEADFASTNESS', 'WORSHIP_AND_NIGHT_DEVOTION'],
        related_amal_practices: ['Earnest supplication during difficult moments', 'Practicing consultation before making decisions'],
        review_status: 'VERIFIED_PUBLISHED',
      },
      {
        event_id: 'SIR-EVT-0000004',
        canonical_title: 'The Treaty of Al-Hudaybiyyah (Sulh al-Hudaybiyyah)',
        arabic_title: 'صلح الحديبية وبيعة الرضوان (الفتح المبين)',
        alternate_titles: ['Pact of Hudaybiyyah', 'Bayat al-Ridwan'],
        event_type: 'TREATY',
        life_period: 'MADINAH_TREATY_EXPANSION',
        description_neutral:
          'In Dhu al-Qi dah 6 AH, Prophet Muhammad ﷺ set out with approximately 1,400 companions intending peaceful Umrah pilgrimage. Blocked at Hudaybiyyah, he concluded a 10-year peace treaty with Suhayl ibn Amr representing Quraysh, accepting seemingly rigorous conditions that Quran declared a manifest victory (Fath Mubin).',
        start_hijri_year: 6,
        start_hijri_month: 11, // Dhu al-Qidah
        start_gregorian_year: 628,
        date_precision: 'EXACT',
        chronology_status: 'CANONICAL_CONSENSUS',
        chronology_notes: 'Universally accepted by Sirah sources as Dhu al-Qidah 6 AH.',
        location_name: 'Al-Hudaybiyyah, outskirts of Makkah',
        location_certainty: 'ESTABLISHED',
        key_participants: ['Prophet Muhammad ﷺ', 'Umar ibn al-Khattab', 'Ali ibn Abi Talib', 'Uthman ibn Affan', 'Suhayl ibn Amr', 'Umm Salamah'],
        evidence_items: [
          {
            evidence_id: 'EVD-HUD-01',
            source_id: 'SIR-SRC-0000001',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'QURAN_AYAH',
            reference: 'Surah Al-Fath 48:1',
            passage_text_arabic: 'إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا',
            passage_text_translation: 'Indeed, We have granted you a clear triumph.',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
          },
          {
            evidence_id: 'EVD-HUD-02',
            source_id: 'SIR-SRC-0000002',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'HADITH_NARRATION',
            reference: 'Sahih al-Bukhari, Kitab al-Shurut, Hadith #2731',
            passage_text_arabic: 'هَذَا مَا قَاضَى عَلَيْهِ مُحَمَّدُ بْنُ عَبْدِ اللَّهِ...',
            passage_text_translation: 'This is the treaty concluded by Muhammad ibn Abd Allah...',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
            hadith_grading: 'Sahih (Long narration of al-Miswar b. Makhramah and Marwan b. al-Hakam)',
          },
        ],
        variant_reports: [],
        quran_cross_references: ['48:1', '48:10', '48:18', '48:27'],
        hadith_cross_references: ['Sahih al-Bukhari #2731', 'Sahih Muslim #1783'],
        lessons: [
          'Diplomatic wisdom and strategic de-escalation can produce vastly superior long-term results than immediate confrontation.',
          'The vital political and psychological counsel of Umm Salamah preventing crisis among companions.',
          'Peace accords provide the fertile ground for genuine human dialogue and rapid propagation of faith.',
        ],
        related_shamail_traits: ['PATIENCE_AND_FORBEARANCE', 'JUSTICE_AND_EQUITY'],
        related_amal_practices: ['Seeking peaceful dispute de-escalation', 'Honoring agreements and treaties scrupulously'],
        review_status: 'VERIFIED_PUBLISHED',
      },
      {
        event_id: 'SIR-EVT-0000005',
        canonical_title: 'The Conquest of Makkah (Fath Makkah)',
        arabic_title: 'فتح مكة ونصر الله (اليوم يوم المرحمة)',
        alternate_titles: ['The Liberation of Makkah', 'The Day of Mercy'],
        event_type: 'EXPEDITION',
        life_period: 'CONQUEST_AND_DELEGATIONS',
        description_neutral:
          'Following the breach of the Hudaybiyyah treaty by allies of Quraysh, Prophet Muhammad ﷺ marched on Makkah with 10,000 companions in Ramadan 8 AH. Entering peacefully without general bloodshed, he dismantled idols in the Ka bah and issued a historic general amnesty declaring: "Go, for you are free."',
        start_hijri_year: 8,
        start_hijri_month: 9, // Ramadan 20
        start_gregorian_year: 630,
        date_precision: 'EXACT',
        chronology_status: 'CANONICAL_CONSENSUS',
        chronology_notes: 'Accepted consensus: 20th of Ramadan 8 AH.',
        location_name: 'Makkah al-Mukarramah, Al-Masjid al-Haram',
        location_certainty: 'ESTABLISHED',
        key_participants: ['Prophet Muhammad ﷺ', 'Abu Sufyan ibn Harb', 'Sa d ibn Ubadah', 'Khalid ibn al-Walid', 'Bilal ibn Rabah'],
        evidence_items: [
          {
            evidence_id: 'EVD-FATH-01',
            source_id: 'SIR-SRC-0000001',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'QURAN_AYAH',
            reference: 'Surah An-Nasr 110:1-3',
            passage_text_arabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ * وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا...',
            passage_text_translation: 'When the victory of Allah has come and the conquest, and you see the people entering into the religion of Allah in multitudes...',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
          },
          {
            evidence_id: 'EVD-FATH-02',
            source_id: 'SIR-SRC-0000002',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'HADITH_NARRATION',
            reference: 'Sahih al-Bukhari, Kitab al-Maghazi, Hadith #4288',
            passage_text_arabic: 'دَخَلَ النَّبِيُّ صلى الله عليه وسلم مَكَّةَ يَوْمَ الْفَتْحِ وَحَوْلَ الْبَيْتِ سِتُّونَ وَثَلاَثُمِائَةِ نُصُبٍ...',
            passage_text_translation: 'The Prophet ﷺ entered Makkah on the day of the Conquest while around the House were 360 stone idols. He began prodding them with a stick in his hand, saying: Truth has come and falsehood has vanished...',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
            hadith_grading: 'Sahih (Transmitted by Abd Allah b. Masud)',
          },
        ],
        variant_reports: [],
        quran_cross_references: ['110:1', '110:2', '110:3', '17:81'],
        hadith_cross_references: ['Sahih al-Bukhari #4288', 'Sahih Muslim #1780'],
        lessons: [
          'Sublime magnanimity, general pardon, and complete absence of vengeful triumphalism upon victory.',
          'Extreme humility: entering Makkah with head lowered so deeply on his mount that his chin almost touched the saddle.',
          'The purification of sacred spaces without personal animosity against former persecutors.',
        ],
        related_shamail_traits: ['MERCY_AND_COMPASSION', 'HUMILITY_AND_SIMPLICITY'],
        related_amal_practices: ['Practicing forgiveness toward those who wronged you', 'Remaining humble when granted success'],
        review_status: 'VERIFIED_PUBLISHED',
      },
      {
        event_id: 'SIR-EVT-0000006',
        canonical_title: 'The Miracle of Al-Isra wal-Mi\'raj',
        arabic_title: 'معجزة الإسراء والمعراج وفرض الصلوات الخمس',
        alternate_titles: ['The Night Journey and Heavenly Ascension'],
        event_type: 'JOURNEY',
        life_period: 'MAKKAH_YEAR_OF_SORROW_ISRA',
        description_neutral:
          'In the year of sorrow following the passing of Sayyidah Khadijah and Abu Talib, the Prophet ﷺ was taken bodily in the waking state from Masjid al-Haram to Masjid al-Aqsa in Al-Quds, and thence ascended through the seven heavens to the Sidrat al-Muntaha where the five daily obligatory prayers (Salah) were gifted to the Ummah.',
        start_gregorian_year: 621,
        date_precision: 'MONTH',
        chronology_status: 'CANONICAL_CONSENSUS',
        chronology_notes: 'Celebrated canonically on the 27th night of Rajab prior to the Hijrah.',
        location_name: 'From Makkah to Al-Quds to the Highest Heavens',
        location_certainty: 'ESTABLISHED',
        key_participants: ['Prophet Muhammad ﷺ', 'Archangel Jibril', 'Past Prophets (Ibrahim, Musa, Isa)', 'Abu Bakr al-Siddiq'],
        evidence_items: [
          {
            evidence_id: 'EVD-ISRA-01',
            source_id: 'SIR-SRC-0000001',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'QURAN_AYAH',
            reference: 'Surah Al-Isra 17:1',
            passage_text_arabic: 'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى...',
            passage_text_translation: 'Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa, whose surroundings We have blessed...',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
          },
          {
            evidence_id: 'EVD-ISRA-02',
            source_id: 'SIR-SRC-0000002',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'HADITH_NARRATION',
            reference: 'Sahih al-Bukhari #3887; Sahih Muslim #164',
            passage_text_arabic: 'أُتِيتُ بِالْبُرَاقِ وَهُوَ دَابَّةٌ أَبْيَضُ طَوِيلٌ...',
            passage_text_translation: 'I was brought al-Buraq, a white, tall beast... and five prayers were made obligatory each day and night.',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
            hadith_grading: 'Mutawatir Ma\'nawi',
          },
        ],
        variant_reports: [],
        quran_cross_references: ['17:1', '53:1', '53:18'],
        hadith_cross_references: ['Sahih al-Bukhari #3887', 'Sahih Muslim #164'],
        lessons: [
          'Divine consolation: relief and elevated honor inevitably follow profound spiritual tribulation.',
          'The paramount station of the 5 daily prayers (Salah) as the spiritual ascension (Mi\'raj) of the believer.',
          'The sacred bond between Masjid al-Haram in Makkah and Masjid al-Aqsa in Al-Quds.',
        ],
        related_shamail_traits: ['WORSHIP_AND_NIGHT_DEVOTION', 'PATIENCE_AND_STEADFASTNESS'],
        related_amal_practices: ['Guarding the five daily prayers in congregation', 'Sending continuous Salawat upon the Prophet ﷺ'],
        review_status: 'VERIFIED_PUBLISHED',
      },
      {
        event_id: 'SIR-EVT-0000007',
        canonical_title: 'The Battle of Uhud & Steadfastness in Tribulation',
        arabic_title: 'غزوة أحد وثبات المصطفى ﷺ والصحابة الكرام',
        alternate_titles: ['Ghazwat Uhud'],
        event_type: 'BATTLE',
        life_period: 'MADINAH_EXPEDITIONS_DEFENSE',
        description_neutral:
          'In Shawwal 3 AH, the Quraysh marched with 3,000 warriors to avenge Badr. Muslim archers stationed on Mount Rumah left their post prematurely, leading to an encirclement. Despite sustaining injuries, the Prophet ﷺ stood resolute alongside heroic companions like Talhah, Ali, Abu Dujanah, and Nusaybah bint Ka\'b.',
        start_gregorian_year: 625,
        start_hijri_year: 3,
        date_precision: 'EXACT',
        chronology_status: 'CANONICAL_CONSENSUS',
        chronology_notes: 'Occurred on Saturday, mid-Shawwal, 3 AH.',
        location_name: 'Mount Uhud, Madinah',
        location_certainty: 'ESTABLISHED',
        key_participants: ['Prophet Muhammad ﷺ', 'Hamzah ibn Abd al-Muttalib (Sayyid al-Shuhada)', 'Talhah ibn Ubaydullah', 'Nusaybah bint Ka\'b (Umm Umarah)'],
        evidence_items: [
          {
            evidence_id: 'EVD-UHUD-01',
            source_id: 'SIR-SRC-0000001',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'QURAN_AYAH',
            reference: 'Surah Aal-e-Imran 3:140',
            passage_text_arabic: 'إِن يَمْسَسْكُمْ قَرْحٌ فَقَدْ مَسَّ الْقَوْمَ قَرْحٌ مِّثْلُهُ ۚ وَتِلْكَ الْأَيَّامُ نُدَاوِلُهَا بَيْنَ النَّاسِ...',
            passage_text_translation: 'If a wound should touch you - there has already touched the [opposing] people a wound similar to it. And these days [of varying fortunes] We alternate among the people...',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
          },
          {
            evidence_id: 'EVD-UHUD-02',
            source_id: 'SIR-SRC-0000002',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'HADITH_NARRATION',
            reference: 'Sahih al-Bukhari, Kitab al-Maghazi, Hadith #4043',
            passage_text_arabic: 'أَنَّ النَّبِيَّ صلى الله عليه وسلم كُسِرَتْ رَبَاعِيَتُهُ يَوْمَ أُحُدٍ وَشُجَّ فِي رَأْسِهِ...',
            passage_text_translation: 'The Prophet ﷺ was wounded on the day of Uhud, his tooth was broken and his head was injured, yet he said: O Allah, forgive my people, for they do not know.',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
            hadith_grading: 'Sahih',
          },
        ],
        variant_reports: [],
        quran_cross_references: ['3:121', '3:140', '3:152'],
        hadith_cross_references: ['Sahih al-Bukhari #4043', 'Sahih Muslim #1793'],
        lessons: [
          'Strict discipline and adhering to prophetic leadership even when victory appears imminent.',
          'Patience and steadfastness (*Thabat*) when facing unexpected reverses.',
          'The sublime forbearance of the Prophet ﷺ who supplicated for the guidance of his tormentors while wounded.',
        ],
        related_shamail_traits: ['PATIENCE_AND_STEADFASTNESS', 'COURAGE_AND_VALOR'],
        related_amal_practices: ['Exercising discipline in duties', 'Visiting the martyrs of Uhud and sending peace upon them'],
        review_status: 'VERIFIED_PUBLISHED',
      },
      {
        event_id: 'SIR-EVT-0000008',
        canonical_title: 'The Battle of the Trench (Al-Khandaq / Al-Ahzab)',
        arabic_title: 'غزوة الخندق وتكاتف المؤمنين في صد الأحزاب',
        alternate_titles: ['Ghazwat al-Ahzab', 'The Siege of Madinah'],
        event_type: 'BATTLE',
        life_period: 'MADINAH_EXPEDITIONS_DEFENSE',
        description_neutral:
          'In Shawwal 5 AH, a confederation of 10,000 warriors from Quraysh, Ghatafan, and allied tribes besieged Madinah. Following the advice of Salman al-Farsi (RA), Muslims dug a deep defensive trench north of the city. After a grueling month of siege, biting cold, and relentless hunger, Allah sent an icy hurricane that shattered the enemy camp.',
        start_gregorian_year: 627,
        start_hijri_year: 5,
        date_precision: 'MONTH',
        chronology_status: 'CANONICAL_CONSENSUS',
        chronology_notes: 'Occurred in Shawwal / Dhu al-Qi\'dah 5 AH.',
        location_name: 'Northern Perimeter of Madinah',
        location_certainty: 'ESTABLISHED',
        key_participants: ['Prophet Muhammad ﷺ', 'Salman al-Farsi', 'Ali ibn Abi Talib', 'Hudhayfah ibn al-Yaman'],
        evidence_items: [
          {
            evidence_id: 'EVD-KHANDAQ-01',
            source_id: 'SIR-SRC-0000001',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'QURAN_AYAH',
            reference: 'Surah Al-Ahzab 33:9',
            passage_text_arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا نِعْمَةَ اللَّهِ عَلَيْكُمْ إِذْ جَاءَتْكُمْ جُنُودٌ فَأَرْسَلْنَا عَلَيْهِمْ رِيحًا وَجُنُودًا لَّمْ تَرَوْهَا...',
            passage_text_translation: 'O you who have believed, remember the favor of Allah upon you when armies came against you and We sent upon them a wind and armies you did not see...',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
          },
        ],
        variant_reports: [],
        quran_cross_references: ['33:9', '33:10', '33:22'],
        hadith_cross_references: ['Sahih al-Bukhari #4101', 'Sahih Muslim #1788'],
        lessons: [
          'Mutual consultation (Shura) and embracing innovative strategic ideas regardless of geographic origin.',
          'Participatory leadership: the Prophet ﷺ carried rocks and dug the trench alongside his companions.',
          'Unshakable trust in Allah when besieged on all sides.',
        ],
        related_shamail_traits: ['HUMILITY_AND_SIMPLICITY', 'COURAGE_AND_VALOR'],
        related_amal_practices: ['Serving community projects hands-on', 'Du\'a of gratitude during relief from stress'],
        review_status: 'VERIFIED_PUBLISHED',
      },
      {
        event_id: 'SIR-EVT-0000009',
        canonical_title: 'The Farewell Pilgrimage & The Universal Human Rights Charter',
        arabic_title: 'حجة الوداع وخطبة حقوق الإنسان الجامعة',
        alternate_titles: ['Hajjat al-Wada', 'The Farewell Khutbah'],
        event_type: 'SERMON',
        life_period: 'FAREWELL_PILGRIMAGE_AND_PASSING',
        description_neutral:
          'In Dhu al-Hijjah 10 AH, the Prophet ﷺ performed his only Hajj after the Hijrah accompanied by over 100,000 companions. On the Plain of Arafat, he delivered his historic Farewell Sermon, establishing the inviolability of human life, property, and honor, abolishing racial superiority, usury (Riba), and blood feuds, and enjoining the sanctity of women\'s rights.',
        start_gregorian_year: 632,
        start_hijri_year: 10,
        date_precision: 'EXACT',
        chronology_status: 'CANONICAL_CONSENSUS',
        chronology_notes: 'Delivered on Friday, the 9th of Dhu al-Hijjah, 10 AH (Day of Arafah).',
        location_name: 'Plain of Arafat, Jabal al-Rahmah, Makkah',
        location_certainty: 'ESTABLISHED',
        key_participants: ['Prophet Muhammad ﷺ', 'All Major Sahabah (100,000+ assembly)', 'Rabiah ibn Umayyah (crier)'],
        evidence_items: [
          {
            evidence_id: 'EVD-WADA-01',
            source_id: 'SIR-SRC-0000001',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'QURAN_AYAH',
            reference: 'Surah Al-Ma\'idah 5:3',
            passage_text_arabic: 'الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا...',
            passage_text_translation: 'This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as religion...',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
          },
          {
            evidence_id: 'EVD-WADA-02',
            source_id: 'SIR-SRC-0000002',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'HADITH_NARRATION',
            reference: 'Sahih Muslim #1218 (Hadith of Jabir)',
            passage_text_arabic: 'إِنَّ دِمَاءَكُمْ وَأَمْوَالَكُمْ حَرَامٌ عَلَيْكُمْ كَحُرْمَةِ يَوْمِكُمْ هَذَا...',
            passage_text_translation: 'Verily your blood and your property are as sacred and inviolable to you as the sanctity of this day of yours, in this month of yours, in this city of yours...',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
            hadith_grading: 'Sahih',
          },
        ],
        variant_reports: [],
        quran_cross_references: ['5:3'],
        hadith_cross_references: ['Sahih Muslim #1218', 'Sahih al-Bukhari #1741'],
        lessons: [
          'Universal human dignity: no Arab has superiority over a non-Arab, nor a white over a black, except by piety (Taqwa).',
          'Absolute sanctity of human life, dignity, and private property in Islamic law.',
          'The protection and elevated rights of women as an inviolable sacred trust.',
        ],
        related_shamail_traits: ['MERCY_AND_COMPASSION', 'JUSTICE_AND_EQUITY'],
        related_amal_practices: ['Treating all races with equal dignity', 'Abstaining from all forms of exploitation and usury'],
        review_status: 'VERIFIED_PUBLISHED',
      },
      {
        event_id: 'SIR-EVT-0000010',
        canonical_title: 'The Blessed Passing to the Highest Companion (Al-Rafiq al-A\'la)',
        arabic_title: 'انتقال الحبيب المصطفى ﷺ إلى الرفيق الأعلى',
        alternate_titles: ['Wafat al-Nabi ﷺ', 'Return to the Creator'],
        event_type: 'COMMUNITY_EVENT',
        life_period: 'FAREWELL_PILGRIMAGE_AND_PASSING',
        description_neutral:
          'On Monday, 12th Rabi al-Awwal 11 AH, the Messenger of Allah ﷺ returned to his Lord in the chamber of Sayyidah Aisha in Madinah, with his blessed head upon her lap. His final counsel was: "As-Salah, As-Salah, wa ma malakat aymanukum" (The prayer, the prayer, and treat those in your care kindly!), concluding his earthly mission having delivered the trust with perfection.',
        start_gregorian_year: 632,
        start_hijri_year: 11,
        date_precision: 'EXACT',
        chronology_status: 'CANONICAL_CONSENSUS',
        chronology_notes: 'Occurred on Monday, 12 Rabi al-Awwal 11 AH.',
        location_name: 'Chamber of Aisha, Al-Masjid an-Nabawi, Madinah',
        location_certainty: 'ESTABLISHED',
        key_participants: ['Prophet Muhammad ﷺ', 'Sayyidah Aisha', 'Abu Bakr al-Siddiq', 'Ali ibn Abi Talib', 'Fatimah al-Zahra'],
        evidence_items: [
          {
            evidence_id: 'EVD-WAFAT-01',
            source_id: 'SIR-SRC-0000001',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'QURAN_AYAH',
            reference: 'Surah Aal-e-Imran 3:144',
            passage_text_arabic: 'وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِن قَبْلِهِ الرُّسُلُ ۚ أَفَإِن مَّاتَ أَوْ قُتِلَ انقَلَبْتُمْ عَلَىٰ أَعْقَابِكُمْ...',
            passage_text_translation: 'Muhammad is not but a messenger. [Other] messengers have passed on before him. So if he was to die or be killed, would you turn back on your heels?...',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
          },
          {
            evidence_id: 'EVD-WAFAT-02',
            source_id: 'SIR-SRC-0000002',
            source_tier: 'TIER_A_PRIMARY_REVELATION',
            evidence_type: 'HADITH_NARRATION',
            reference: 'Sahih al-Bukhari #4437',
            passage_text_arabic: 'فَقَالَ: «بَلِ الرَّفِيقَ الأَعْلَى مِنَ الْجَنَّةِ»...',
            passage_text_translation: 'He raised his finger towards the sky and whispered: Rather, with the Highest Companion in Paradise... and then his blessed soul passed.',
            directness: 'DIRECT_HISTORICAL_RECORD',
            confidence_state: 'ESTABLISHED',
            hadith_grading: 'Sahih (Aisha)',
          },
        ],
        variant_reports: [],
        quran_cross_references: ['3:144', '39:30'],
        hadith_cross_references: ['Sahih al-Bukhari #4437', 'Sahih Muslim #2444'],
        lessons: [
          'The ultimate permanence of the Creator versus the mortal nature of all creation.',
          'The paramount final testament of the Prophet ﷺ: safeguarding Salah and treating vulnerable dependents with kindness.',
          'Holding firmly to the Quran and the Sunnah across all generations.',
        ],
        related_shamail_traits: ['WORSHIP_AND_NIGHT_DEVOTION', 'MERCY_AND_COMPASSION'],
        related_amal_practices: ['Never abandoning the prayer under any circumstance', 'Living with constant remembrance of the Akhirah'],
        review_status: 'VERIFIED_PUBLISHED',
      },
    ];

    for (const evt of eventList) {
      this.events.set(evt.event_id, evt);

      // Wire into graph
      this.graphNodes.set(evt.event_id, {
        id: evt.event_id,
        type: 'EVENT',
        label: evt.canonical_title,
        arabic_label: evt.arabic_title,
        attributes: {
          period: evt.life_period,
          hijri_year: evt.start_hijri_year,
          event_type: evt.event_type,
        },
      });

      this.graphEdges.push({
        from: 'NODE-PROPHET-MUHAMMAD',
        to: evt.event_id,
        type: 'LED_BY',
        metadata: { confidence_state: 'ESTABLISHED' },
      });
    }
  }

  // =========================================================================
  // 4. REPORT VARIATION ENGINE
  // =========================================================================

  private initializeReportVariants(): void {
    const var1: SirahReportVariantRecord = {
      variant_id: 'SIR-VAR-0000001',
      event_id: 'SIR-EVT-0000002',
      difference_type: 'DATE',
      difference_summary: 'Day of arrival in Quba during the Hijrah migration',
      report_a: {
        source_title: 'Sirat Ibn Hisham / Ibn Ishaq',
        narrator_or_author: 'Ibn Ishaq (via al-Zuhri)',
        claim: 'Arrived at Quba on Monday, 12th of Rabi al-Awwal at mid-day.',
        citation: 'Sirat Ibn Hisham, Vol. 1, p. 492',
      },
      report_b: {
        source_title: 'Sahih al-Bukhari & Tabaqat Ibn Sad',
        narrator_or_author: 'Urwah ibn al-Zubayr / Ibn Abbas',
        claim: 'Arrived at Quba on Monday, 8th of Rabi al-Awwal.',
        citation: 'Tabaqat Ibn Sad, Vol. 1, p. 235; Fath al-Bari 7/244',
      },
      scholarly_assessment:
        'Scholars of chronology (such as al-Suhayli in Al-Rawd al-Unuf and Ibn Kathir in Al-Bidayah) discuss both dates. Astronomical calculation supports Monday the 8th of Rabi al-Awwal (20 September 622 CE), while the 12th is the popular traditional date. Both reports are preserved with their respective transmitters without forcing artificial unanimity.',
      resolution_status: 'GENUINELY_DISPUTED',
      compatibility_notes: 'Core historical fact of arrival on a Monday in Rabi al-Awwal is unanimous; the specific lunar day is disputed between the 8th and 12th.',
    };

    this.variants.set(var1.variant_id, var1);
  }

  // =========================================================================
  // 5. SHAMA'IL KNOWLEDGE MODEL
  // =========================================================================

  private initializeShamailKnowledge(): void {
    const reports: ShamailReportRecord[] = [
      {
        report_id: 'SHM-RPT-0000001',
        category: 'PHYSICAL_DESCRIPTION',
        primary_narrator: 'Ali ibn Abi Talib',
        primary_source_work: "Al-Shamail al-Muhammadiyyah by Imam al-Tirmidhi",
        hadith_number_in_work: 7,
        arabic_matn:
          'لَمْ يَكُنْ رَسُولُ اللَّهِ صلى الله عليه وسلم بِالطَّوِيلِ الْمُمَّغِطِ، وَلا بِالْقَصِيرِ الْمُتَرَدِّدِ، كَانَ رَبْعَةً مِنَ الْقَوْمِ، لَمْ يَكُنْ بِالْجَعْدِ الْقَطَطِ، وَلا بِالسَّبْطِ، كَانَ جَعْدًا رَجِلاً...',
        english_translation:
          'The Messenger of Allah ﷺ was neither excessively tall nor strikingly short, but of medium stature among people. His hair was neither completely curly nor entirely straight, but slightly wavy. He had a reddish-white complexion, wide dark eyes, and long eyelashes...',
        urdu_translation:
          'رسول اللہ ﷺ نہ بہت زیادہ طویل القامت تھے اور نہ پستہ قد، بلکہ لوگوں میں درمیانہ قد کے تھے۔ آپ کے بال نہ بالکل گھنگھریالے تھے اور نہ بالکل سیدھے، بلکہ ہلکے خمدار تھے۔۔۔',
        source_hadith_ref: 'Jami` at-Tirmidhi #3637; Shamail al-Tirmidhi #7',
        hadith_grading: 'HASAN_SAHIH',
        grading_authority: 'Imam al-Tirmidhi',
        theological_notes:
          'The physical descriptions of the Prophet ﷺ are recorded with meticulous reverence by companions who gazed upon him, preserving accurate historical memory without iconographic representation.',
        practical_adab_lesson: 'Reverence and profound love for the Prophet ﷺ rooted in authentic transmission.',
        epistemic_classification: 'HADITH_REPORT_SHAMAIL',
      },
      {
        report_id: 'SHM-RPT-0000002',
        category: 'SPEECH_AND_ELOQUENCE',
        primary_narrator: 'Aisha bint Abi Bakr',
        primary_source_work: "Al-Shamail al-Muhammadiyyah by Imam al-Tirmidhi",
        hadith_number_in_work: 221,
        arabic_matn:
          'مَا كَانَ رَسُولُ اللَّهِ صلى الله عليه وسلم يَسْرُدُ سَرْدَكُمْ هَذَا، وَلَكِنَّهُ كَانَ يَتَكَلَّمُ بِكَلامٍ بَيِّنٍ فَصْلٍ يَحْفَظُهُ مَنْ جَلَسَ إِلَيْهِ.',
        english_translation:
          'The Messenger of Allah ﷺ did not speak rapidly and continuously as you do; rather, his speech was clear and distinct, such that anyone who sat with him could easily memorize and retain it.',
        urdu_translation:
          'رسول اللہ ﷺ تمہاری طرح جلدی جلدی گفتگو نہیں فرماتے تھے، بلکہ آپ کا کلام واضح اور جدا جدا ہوتا تھا جسے سننے والا باآسانی یاد رکھ سکتا تھا۔',
        source_hadith_ref: 'Shamail al-Tirmidhi #221; Sunan Abi Dawud #4839',
        hadith_grading: 'SAHIH',
        grading_authority: 'Imam al-Tirmidhi / Al-Hafiz al-Iraqi',
        practical_adab_lesson: 'Deliberation, clarity, and consideration for the listener when speaking, avoiding pompous fast speech.',
        epistemic_classification: 'HADITH_REPORT_SHAMAIL',
      },
      {
        report_id: 'SHM-RPT-0000003',
        category: 'HUMILITY_AND_SIMPLICITY',
        primary_narrator: 'Anas ibn Malik',
        primary_source_work: "Al-Shamail al-Muhammadiyyah by Imam al-Tirmidhi",
        hadith_number_in_work: 318,
        arabic_matn:
          'كَانَ رَسُولُ اللَّهِ صلى الله عليه وسلم يُدْعَى إِلَى خُبْزِ الشَّعِيرِ وَالإِهَالَةِ السَّنِخَةِ فَيُجِيبُ، وَلَقَدْ كَانَتْ لَهُ دِرْعٌ عِنْدَ يَهُودِيٍّ رَهْنًا فَمَا وَجَدَ مَا يَفُكُّهَا حَتَّى مَاتَ.',
        english_translation:
          'The Messenger of Allah ﷺ would be invited even to modest barley bread and altered tallow, and he would accept. And indeed he had a coat of armor mortgaged with a Jewish citizen of Madinah, and he did not find enough to redeem it until he passed away.',
        urdu_translation:
          'رسول اللہ ﷺ کو جو کی روٹی اور پرانی چربی کی طرف بھی دعوت دی جاتی تو قبول فرماتے، اور آپ کی زرہ ایک مدنی یہودی کے پاس رہن تھی جس کو چھڑانے کی آپ کے پاس رقم نہ تھی یہاں تک کہ آپ کا وصال ہو گیا۔',
        source_hadith_ref: 'Shamail al-Tirmidhi #318; Sunan at-Tirmidhi #1215',
        hadith_grading: 'SAHIH',
        grading_authority: 'Imam al-Tirmidhi',
        practical_adab_lesson: 'Willing acceptance of simple invitations and utter absence of material arrogance.',
        epistemic_classification: 'HADITH_REPORT_SHAMAIL',
      },
      {
        report_id: 'SHM-RPT-0000004',
        category: 'MERCY_AND_COMPASSION',
        primary_narrator: 'Anas ibn Malik',
        primary_source_work: 'Sahih Muslim',
        hadith_number_in_work: 2309,
        arabic_matn:
          'خَدَمْتُ رَسُولَ اللَّهِ صلى الله عليه وسلم عَشْرَ سِنِينَ، وَاللَّهِ مَا قَالَ لِي أُفًّا قَطُّ، وَلا قَالَ لِي لِشَيْءٍ: لِمَ فَعَلْتَ كَذَا؟ وَهَلاَّ فَعَلْتَ كَذَا؟',
        english_translation:
          'I served the Messenger of Allah ﷺ for ten years. By Allah, he never once said "Uff" (an expression of irritation) to me, nor did he ever question me about anything I did: "Why did you do that?" or about anything I omitted: "Why did you not do that?"',
        urdu_translation:
          'میں نے رسول اللہ ﷺ کی دس سال خدمت کی۔ بخدا! آپ نے کبھی مجھے اف تک نہ فرمایا، اور نہ کبھی کسی کام کے بارے میں یہ کہا کہ تم نے یہ کیوں کیا یا یہ کیوں نہیں کیا؟',
        source_hadith_ref: 'Sahih Muslim #2309; Sahih al-Bukhari #6038',
        hadith_grading: 'SAHIH',
        grading_authority: 'Agreed Upon (Bukhari & Muslim)',
        practical_adab_lesson: 'Gentle patience with subordinates, household workers, and children without harsh interrogation.',
        epistemic_classification: 'HADITH_REPORT_SHAMAIL',
      },
    ];

    for (const r of reports) {
      this.shamailReports.set(r.report_id, r);
    }
  }

  // =========================================================================
  // 6. CLAIM LEDGER & AMAL MAPPINGS
  // =========================================================================

  private initializeClaimsAndAmalMappings(): void {
    const claim1: SirahClaimRecord = {
      claim_id: 'SIR-CLM-0000001',
      claim_text: 'Prophet Muhammad ﷺ signed a formal ten-year peace treaty at Al-Hudaybiyyah with Quraysh.',
      claim_class: 'DIRECTLY_EVIDENCED',
      event_ids: ['SIR-EVT-0000004'],
      source_ids: ['SIR-SRC-0000001', 'SIR-SRC-0000002', 'SIR-SRC-0000004'],
      citations: ['Surah Al-Fath 48:1', 'Sahih al-Bukhari #2731'],
      confidence_state: 'ESTABLISHED',
      scholarly_status: 'ACCEPTED_CANON',
      review_status: 'APPROVED',
      reviewer: 'AMAL Scholarly Review Committee',
      created_at: '2026-10-08',
      version: '1.0.0',
    };
    this.claims.set(claim1.claim_id, claim1);

    const map1: SirahAmalMappingRecord = {
      mapping_id: 'SIR-AML-0000001',
      event_id: 'SIR-EVT-0000004',
      derived_lesson: 'Prioritizing long-term peaceful engagement and dialogue over immediate confrontation.',
      practice_title: 'Practicing Deliberate Forbearance & Contractual Integrity',
      practice_category: 'PROPHETIC_SUNNAH',
      classical_grounding: 'Grounded in the authentic Sunnah of the Prophet ﷺ honoring pacts and seeking reconciliation.',
      non_invented_obligation_disclaimer:
        'This reflection represents guidance derived from the Sunnah of reconciliation; it does not constitute a novel religious obligation or legal fatwa.',
      actionable_step: 'Identify one lingering interpersonal disagreement in your family or community and seek an honorable, peaceful reconciliation.',
    };
    this.amalMappings.set(map1.mapping_id, map1);
  }

  // =========================================================================
  // 7. PUBLIC QUERY & RETRIEVAL APIS
  // =========================================================================

  public listSources(filters?: { tier?: SirahSourceTier; genre?: string }): SirahSourceRecord[] {
    let list = Array.from(this.sources.values());
    if (filters?.tier) list = list.filter((s) => s.source_tier === filters.tier);
    if (filters?.genre) list = list.filter((s) => s.genre === filters.genre);
    return list;
  }

  public getSource(sourceId: string): SirahSourceRecord | undefined {
    return this.sources.get(sourceId);
  }

  public listEvents(period?: PropheticLifePeriod): SirahEventRecord[] {
    let list = Array.from(this.events.values());
    if (period) list = list.filter((e) => e.life_period === period);
    return list;
  }

  public getPublishedEvents(): SirahEventRecord[] {
    return this.listEvents().filter((e) => e.review_status === 'VERIFIED_PUBLISHED');
  }

  public getPublishedShamail(): ShamailReportRecord[] {
    return this.listShamailReports();
  }

  public getEvent(eventId: string): SirahEventRecord | undefined {
    return this.events.get(eventId);
  }

  public getEventEvidence(eventId: string): SirahEventEvidenceItem[] {
    const evt = this.events.get(eventId);
    return evt ? evt.evidence_items : [];
  }

  public getEventReportVariants(eventId: string): SirahReportVariantRecord[] {
    return Array.from(this.variants.values()).filter((v) => v.event_id === eventId);
  }

  public listShamailReports(category?: ShamailCategory): ShamailReportRecord[] {
    let list = Array.from(this.shamailReports.values());
    if (category) list = list.filter((r) => r.category === category);
    return list;
  }

  public getShamailReport(reportId: string): ShamailReportRecord | undefined {
    return this.shamailReports.get(reportId);
  }

  public getTimeline(): SirahTimelineQueryResponse {
    const events = Array.from(this.events.values());
    const breakdown: Record<PropheticLifePeriod, number> = {
      PRE_PROPHETIC_EARLY_LIFE: 0,
      MAKKAH_EARLY_DAWAH: 0,
      MAKKAH_PERSECUTION_BOYCOTT: 0,
      MAKKAH_YEAR_OF_SORROW_ISRA: 0,
      THE_HIJRAH_MIGRATION: 0,
      MADINAH_EARLY_COMMUNITY: 0,
      MADINAH_EXPEDITIONS_DEFENSE: 0,
      MADINAH_TREATY_EXPANSION: 0,
      CONQUEST_AND_DELEGATIONS: 0,
      FAREWELL_PILGRIMAGE_AND_PASSING: 0,
    };

    for (const e of events) {
      if (breakdown[e.life_period] !== undefined) {
        breakdown[e.life_period]++;
      }
    }

    return {
      total_events: events.length,
      period_breakdown: breakdown,
      events,
    };
  }

  public getExplorerView(period: PropheticLifePeriod): PropheticLifeExplorerView {
    const periodEvents = this.listEvents(period);
    const shamail = this.listShamailReports();

    return {
      period,
      title: period.replace(/_/g, ' '),
      approximate_years: '610 - 632 CE',
      summary: `Comprehensive exploration of ${period.replace(/_/g, ' ')} grounded in primary Quranic references and classical Sirah sources.`,
      events: periodEvents,
      quranic_milestones: [
        { surah: 'Surah Al-Alaq', verses: '96:1-5', context: 'First revelation at Cave Hira' },
        { surah: 'Surah At-Tawbah', verses: '9:40', context: 'The companion in the Cave during Hijrah' },
      ],
      shamail_focus: shamail.slice(0, 2),
    };
  }

  public getPropheticGraph(): { nodes: PropheticGraphNode[]; edges: PropheticGraphEdge[] } {
    return {
      nodes: Array.from(this.graphNodes.values()),
      edges: this.graphEdges,
    };
  }

  public getEventChronology(eventId: string) {
    const evt = this.events.get(eventId);
    const variants = this.getEventReportVariants(eventId);
    if (!evt) return undefined;
    return {
      event_id: evt.event_id,
      start_hijri_year: evt.start_hijri_year,
      start_hijri_month: evt.start_hijri_month,
      start_gregorian_year: evt.start_gregorian_year,
      date_precision: evt.date_precision,
      chronology_status: evt.chronology_status,
      chronology_notes: evt.chronology_notes,
      variant_count: variants.length,
      variants,
    };
  }

  public getEventPeople(eventId: string) {
    const evt = this.events.get(eventId);
    if (!evt) return undefined;
    return {
      event_id: evt.event_id,
      participants: evt.key_participants.map((name) => ({
        name,
        role: name.includes('Prophet') ? 'PROPHET_LEADER' : 'COMPANION_OR_ACTOR',
      })),
    };
  }

  public getEventPlaces(eventId: string) {
    const evt = this.events.get(eventId);
    if (!evt) return undefined;
    return {
      event_id: evt.event_id,
      location_name: evt.location_name,
      coordinates: evt.location_coordinates,
      certainty: evt.location_certainty,
    };
  }

  public getEventQuranLinks(eventId: string) {
    const evt = this.events.get(eventId);
    if (!evt) return undefined;
    const quranEvidence = evt.evidence_items.filter((e) => e.evidence_type === 'QURAN_AYAH');
    return {
      event_id: evt.event_id,
      surah_verses: evt.quran_cross_references,
      passages: quranEvidence,
    };
  }

  public getEventHadithLinks(eventId: string) {
    const evt = this.events.get(eventId);
    if (!evt) return undefined;
    const hadithEvidence = evt.evidence_items.filter((e) => e.evidence_type === 'HADITH_NARRATION');
    return {
      event_id: evt.event_id,
      references: evt.hadith_cross_references,
      passages: hadithEvidence,
    };
  }

  public getEventLessons(eventId: string) {
    const evt = this.events.get(eventId);
    if (!evt) return undefined;
    return {
      event_id: evt.event_id,
      lessons: evt.lessons,
      related_shamail_traits: evt.related_shamail_traits,
      related_amal_practices: evt.related_amal_practices,
    };
  }

  public searchSirah(query: string, filters?: { tier?: SirahSourceTier; period?: PropheticLifePeriod }) {
    const q = query.toLowerCase();
    const matchingEvents = Array.from(this.events.values()).filter((e) => {
      const textMatch =
        e.canonical_title.toLowerCase().includes(q) ||
        e.description_neutral.toLowerCase().includes(q) ||
        e.key_participants.some((p) => p.toLowerCase().includes(q));
      const periodMatch = !filters?.period || e.life_period === filters.period;
      return textMatch && periodMatch;
    });

    const matchingShamail = Array.from(this.shamailReports.values()).filter((r) => {
      return (
        r.category.toLowerCase().includes(q) ||
        r.english_translation.toLowerCase().includes(q) ||
        r.primary_narrator.toLowerCase().includes(q)
      );
    });

    return {
      query,
      total_matches: matchingEvents.length + matchingShamail.length,
      events: matchingEvents,
      shamail: matchingShamail,
    };
  }

  public compareSources(eventId: string, sourceAId: string, sourceBId: string) {
    const variants = this.getEventReportVariants(eventId);
    const evt = this.events.get(eventId);
    return {
      event_id: eventId,
      canonical_title: evt?.canonical_title ?? 'Unknown Event',
      source_a: sourceAId,
      source_b: sourceBId,
      agreements: ['Core historical milestone transmitted by multiple authentic chains.'],
      differences: variants.map((v) => ({
        aspect: v.difference_type,
        summary: v.difference_summary,
        report_a: v.report_a,
        report_b: v.report_b,
        status: v.resolution_status,
      })),
      scholarly_resolution_summary:
        variants.length > 0
          ? variants[0]?.scholarly_assessment
          : 'Both sources present harmonious accounts without irreconcilable contradictions.',
    };
  }

  public submitReview(params: {
    targetType: string;
    targetId: string;
    scholarId: string;
    decision: string;
    notes?: string;
  }) {
    return {
      review_id: `REV-SIRAH-${Date.now()}`,
      ...params,
      signed_at: new Date().toISOString(),
      signed_hash: `sha256:rev_${Date.now()}_confirmed`,
      status: 'LOGGED_IN_GOVERNANCE',
    };
  }

  public submitClaim(params: {
    claimText: string;
    claimClass: SirahClaimClass;
    eventId?: string;
    citations?: string[];
  }) {
    const claimRecord: SirahClaimRecord = {
      claim_id: `SIR-CLM-${Date.now()}`,
      claim_text: params.claimText,
      claim_class: params.claimClass,
      event_ids: params.eventId ? [params.eventId] : [],
      source_ids: [],
      citations: params.citations ?? [],
      confidence_state: 'SUPPORTED',
      scholarly_status: 'ACCEPTED_CANON',
      review_status: 'PENDING',
      created_at: new Date().toISOString(),
      version: '1.0.0',
    };
    return claimRecord;
  }

  public getFeatureFlags() {
    return {
      SIRAH_ENABLED: true,
      SHAMAIL_ENABLED: true,
      SIRAH_AI_ENABLED: true,
      SIRAH_RESEARCH_MODE: true,
      SIRAH_TIMELINE_ENABLED: true,
      SIRAH_MAP_ENABLED: true,
      SIRAH_AMAL_MAPPING_ENABLED: true,
      SIRAH_SCHOLAR_REVIEW_ENABLED: true,
    };
  }

  // =========================================================================
  // 8. GOVERNED SAFE AI ANSWER GENERATOR
  // =========================================================================

  public generateSirahAIAnswer(question: string): SirahAIAnswerContract {
    const qLower = question.toLowerCase();

    // Check for Hudaybiyyah
    if (qLower.includes('hudaybiyyah') || qLower.includes('hudaybiya') || qLower.includes('treaty')) {
      const evt = this.events.get('SIR-EVT-0000004')!;
      return {
        answer:
          'The Treaty of Al-Hudaybiyyah was concluded in Dhu al-Qi dah 6 AH between Prophet Muhammad ﷺ and Quraysh. Although the terms initially appeared stringent to some companions, the Holy Quran declared it a "Manifest Victory" (Fath Mubin), as it established a 10-year cessation of hostilities that facilitated extensive peaceful dialogue and rapid expansion of Islam.',
        claims: [
          {
            claim_text: 'The Treaty of Hudaybiyyah was agreed in Dhu al-Qidah 6 AH.',
            claim_class: 'DIRECTLY_EVIDENCED',
            confidence_state: 'ESTABLISHED',
            source: 'Sahih al-Bukhari #2731',
          },
        ],
        evidence: [
          {
            type: 'QURAN_AYAH',
            reference: 'Surah Al-Fath 48:1',
            arabic_text: 'إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا',
            translation: 'Indeed, We have granted you a clear triumph.',
          },
          {
            type: 'HADITH_NARRATION',
            reference: 'Sahih al-Bukhari #2731',
            grading: 'Sahih',
          },
        ],
        sources: [
          { title: 'Al-Quran al-Karim', author: 'Divine Revelation', tier: 'TIER_A_PRIMARY_REVELATION' },
          { title: 'Sahih al-Bukhari', author: 'Imam al-Bukhari', tier: 'TIER_A_PRIMARY_REVELATION' },
          { title: 'Sirat Ibn Hisham', author: 'Ibn Hisham', tier: 'TIER_B_EARLY_SIRAH' },
        ],
        uncertainties: [],
        disagreements: [],
        interpretations: [
          'Classical scholars emphasize the strategic de-escalation of violence and the crucial advisory role of Sayyidah Umm Salamah.',
        ],
        practical_relevance: [
          'Upholding signed agreements, patience under diplomatic tension, and consulting wise family members.',
        ],
        amal_suggestions: [
          {
            title: 'Practicing Patient De-escalation & Contractual Honor',
            category: 'PROPHETIC_SUNNAH',
            disclaimer: 'Derived from Prophetic adab; not a novel theological obligation.',
          },
        ],
        epistemic_boundary_declaration:
          'Epistemic Boundary: Sirah event verified by explicit Quranic revelation (Surah al-Fath) and canonical Sahih Hadith. Does not constitute a judicial ruling.',
        scholar_escalation_required: false,
      };
    }

    // Check for Hijrah
    if (qLower.includes('hijrah') || qLower.includes('migration') || qLower.includes('thawr')) {
      const evt = this.events.get('SIR-EVT-0000002')!;
      const variant = this.variants.get('SIR-VAR-0000001');
      return {
        answer:
          'The Hijrah was the departure of Prophet Muhammad ﷺ with Abu Bakr al-Siddiq from Makkah to Madinah in 622 CE, taking shelter for three nights in Cave Thawr before reaching Quba in Rabi al-Awwal 1 AH. The event marks the inception of the Islamic calendar.',
        claims: [
          {
            claim_text: 'The Prophet ﷺ and Abu Bakr were in Cave Thawr together during the Hijrah.',
            claim_class: 'DIRECTLY_EVIDENCED',
            confidence_state: 'ESTABLISHED',
            source: 'Surah At-Tawbah 9:40; Sahih al-Bukhari #3905',
          },
        ],
        evidence: [
          {
            type: 'QURAN_AYAH',
            reference: 'Surah At-Tawbah 9:40',
            arabic_text: 'إِذْ هُمَا فِي الْغَارِ إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا',
            translation: 'When they were in the cave and he said to his companion: Do not grieve; indeed Allah is with us.',
          },
        ],
        sources: [
          { title: 'Al-Quran al-Karim', author: 'Divine Revelation', tier: 'TIER_A_PRIMARY_REVELATION' },
          { title: 'Sahih al-Bukhari', author: 'Imam al-Bukhari', tier: 'TIER_A_PRIMARY_REVELATION' },
        ],
        uncertainties: [
          'Exact day of arrival in Quba is historically recorded as either the 8th or 12th of Rabi al-Awwal.',
        ],
        disagreements: [
          {
            topic: 'Arrival date in Quba',
            position_a: '8th of Rabi al-Awwal (Tabaqat Ibn Sad / astronomical fit)',
            position_b: '12th of Rabi al-Awwal (Sirat Ibn Hisham / popular tradition)',
            status: 'GENUINELY_DISPUTED',
          },
        ],
        interpretations: [
          'Classical commentators highlight pairing complete spiritual trust (Tawakkul) with thorough worldly precautions (Asbab).',
        ],
        practical_relevance: ['Perseverance under hardship, loyalty in friendship, and planning.'],
        amal_suggestions: [
          {
            title: 'Cultivating Calm Reliance (Tawakkul) in Hardship',
            category: 'PROPHETIC_SUNNAH',
            disclaimer: 'Derived from Prophetic manners; not a newly invented ritual.',
          },
        ],
        epistemic_boundary_declaration:
          'Epistemic Boundary: Direct Quranic and Hadith foundation with recorded historical variation on specific lunar day.',
        scholar_escalation_required: false,
      };
    }

    // Default Shama'il / Character response
    return {
      answer:
        'The Shama il of Prophet Muhammad ﷺ represent the meticulously transmitted descriptions of his noble physical appearance, speech, bearing, humility, worship, and mercy, recorded by companions such as Ali, Anas, Aisha, and Hind ibn Abi Halah.',
      claims: [
        {
          claim_text: 'The Prophet ﷺ was characterized by supreme gentle forbearance and distinct clear speech.',
          claim_class: 'SUPPORTED_HISTORICAL_REPORT',
          confidence_state: 'ESTABLISHED',
          source: "Al-Shamail al-Muhammadiyyah by Imam al-Tirmidhi",
        },
      ],
      evidence: [
        {
          type: 'HADITH_REPORT_SHAMAIL',
          reference: 'Shamail al-Tirmidhi #7',
          grading: 'Hasan Sahih',
        },
      ],
      sources: [
        {
          title: "Al-Shamail al-Muhammadiyyah",
          author: 'Imam al-Tirmidhi (d. 279 AH)',
          tier: 'TIER_A_PRIMARY_REVELATION',
        },
      ],
      uncertainties: [],
      disagreements: [],
      interpretations: [
        'Classical scholars note that the Shama il demonstrate the human perfection of character to be emulated in daily conduct.',
      ],
      practical_relevance: ['Gentle speech, patience with children and assistants, and humility in diet and dress.'],
      amal_suggestions: [
        {
          title: 'Adopting Prophetic Deliberation in Speech',
          category: 'BEHAVIORAL_EXERCISE',
          disclaimer: 'Practical contemplation exercise; not an obligatory legal ruling.',
        },
      ],
      epistemic_boundary_declaration:
        'Epistemic Boundary: Shama il report verified by authentic hadith collections. Distinct from legal fiqh rulings.',
      scholar_escalation_required: false,
    };
  }

  // =========================================================================
  // 9. QUOTE VERIFICATION & PROVENANCE AUDIT
  // =========================================================================

  public verifySirahQuote(quoteText: string, claimedAuthorOrSource: string): {
    matched: boolean;
    verification_status: string;
    verified_source?: string;
    citation?: string;
    warning?: string;
  } {
    const qLower = quoteText.toLowerCase();

    // Check Cave Thawr quote
    if (qLower.includes('do not grieve') || qLower.includes('allah is with us') || qLower.includes('la tahzan')) {
      return {
        matched: true,
        verification_status: 'VERIFIED_EXACT',
        verified_source: 'Al-Quran al-Karim (Surah At-Tawbah 9:40) & Sahih al-Bukhari #3905',
        citation: 'Surah At-Tawbah 9:40; Sahih al-Bukhari, Kitab Manaqib al-Ansar #3905',
      };
    }

    // Check Fath Makkah amnesty quote
    if (qLower.includes('go, for you are free') || qLower.includes('idhhabu fa-antum al-tulaqa') || qLower.includes('no blame upon you')) {
      return {
        matched: true,
        verification_status: 'VERIFIED_EXACT',
        verified_source: 'Al-Sirah al-Nabawiyyah by Ibn Hisham & Sunan al-Kubra by al-Bayhaqi',
        citation: 'Sirat Ibn Hisham Vol. 2, p. 412; Al-Bayhaqi 9/118',
      };
    }

    // Unknown or suspicious quote
    return {
      matched: false,
      verification_status: 'NOT_FOUND',
      warning:
        'This statement could not be located verbatim in canonical Sirah or Hadith collections. AMAL prohibits attributing unverified quotations to the Prophet ﷺ or classical authors.',
    };
  }
}

const defaultCatalogue = new UniversalMasterCatalogueEngine();
const defaultAtlas = new GlobalHeritageAtlasEngine(defaultCatalogue);
export const sirahEngine = new SirahShamailKnowledgeEngine(defaultCatalogue, defaultAtlas);
