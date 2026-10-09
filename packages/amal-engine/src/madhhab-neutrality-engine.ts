/**
 * AMAL OS — Universal Knowledge & Scholarly Neutrality Engine
 * Implements full Sunni Madhhab coverage (Hanafi, Maliki, Shafi'i, Hanbali),
 * scholarly parity, epistemic separation, and multi-tier personalized presentation.
 */

import {
  ComparativeFiqhCase,
  EpistemicCategory,
  Madhhab,
  MadhhabFoundation,
  PersonalScholarlyPreferences,
  RenderedFiqhResponse,
  SchoolPosition,
  SunniSchool
} from '@amal/types';

export class MadhhabNeutralityEngine {
  private foundations: Map<SunniSchool, MadhhabFoundation> = new Map();
  private comparativeCases: Map<string, ComparativeFiqhCase> = new Map();

  constructor() {
    this.seedMadhhabFoundations();
    this.seedComparativeCases();
  }

  private seedMadhhabFoundations(): void {
    const hanafi: MadhhabFoundation = {
      madhhab: 'HANAFI',
      eponym: 'Imam Abu Hanifah al-Nu\'man (80–150 AH)',
      foundationalWorks: ['Al-Asl (Al-Mabsut) by Imam Muhammad al-Shaybani', 'Al-Jami\' al-Saghir'],
      majorCommentaries: ['Al-Hidayah by Burhan al-Din al-Marghinani', 'Fath al-Qadir by Ibn al-Humam'],
      canonicalLegalManuals: ['Mukhtasar al-Quduri', 'Kanz al-Daqa\'iq', 'Radd al-Muhtar (Hashiyat Ibn Abidin)'],
      usulPrinciples: ['Zahir al-Riwayah priority', 'Istihsan (Juristic Preference)', 'Custom (\'Urf) as secondary validator']
    };

    const maliki: MadhhabFoundation = {
      madhhab: 'MALIKI',
      eponym: 'Imam Malik ibn Anas (93–179 AH)',
      foundationalWorks: ['Al-Muwatta by Imam Malik', 'Al-Mudawwanah al-Kubra by Sahnun'],
      majorCommentaries: ['Al-Tamhid & Al-Istidhkar by Ibn Abd al-Barr', 'Bidayat al-Mujtahid by Ibn Rushd'],
      canonicalLegalManuals: ['Al-Risalah by Ibn Abi Zayd al-Qayrawani', 'Mukhtasar Khalil', 'Aqrab al-Masalik by al-Dardir'],
      usulPrinciples: ['\'Amal Ahl al-Madinah (Practice of the People of Madinah)', 'Maslahah Mursalah (Unrestricted Public Interest)', 'Sadd al-Dhara\'i (Blocking the Means)']
    };

    const shafii: MadhhabFoundation = {
      madhhab: 'SHAFI_I',
      eponym: 'Imam Muhammad ibn Idris al-Shafi\'i (150–204 AH)',
      foundationalWorks: ['Al-Risalah (Foundational Usul)', 'Al-Umm by Imam al-Shafi\'i'],
      majorCommentaries: ['Al-Majmu\' Sharh al-Muhadhdhab by Imam al-Nawawi', 'Fath al-Wahhab by Zakariyya al-Ansari'],
      canonicalLegalManuals: ['Matn Abi Shuja\' (Al-Ghayah wa al-Taqrib)', 'Minhaj al-Talibin by Imam al-Nawawi', 'Tuhfat al-Muhtaj by Ibn Hajar al-Haytami'],
      usulPrinciples: ['Rigorous textual linkage for Qiyas', 'Rejection of unrestrained Istihsan', 'Istishab (Presumption of Continuity)']
    };

    const hanbali: MadhhabFoundation = {
      madhhab: 'HANBALI',
      eponym: 'Imam Ahmad ibn Hanbal (164–241 AH)',
      foundationalWorks: ['Al-Masa\'il (Transmitted Responsa of Imam Ahmad)', 'Musnad Ahmad ibn Hanbal'],
      majorCommentaries: ['Al-Mughni by Muwaffaq al-Din Ibn Qudamah', 'Sharh al-Muntaha by al-Buhuti'],
      canonicalLegalManuals: ['Al-Muqni\' by Ibn Qudamah', 'Zad al-Mustaqni\' by al-Hajjawi', 'Kashshaf al-Qina\' by al-Buhuti'],
      usulPrinciples: ['Adherence to Marfu\' texts and Sahaba Athar over Qiyas', 'Mursal hadith prioritized over personal Ra\'y', 'Ibadah invalidity unless textually sanctioned']
    };

    this.foundations.set('HANAFI', hanafi);
    this.foundations.set('MALIKI', maliki);
    this.foundations.set('SHAFI_I', shafii);
    this.foundations.set('HANBALI', hanbali);
  }

  private seedComparativeCases(): void {
    const wuduNullification: ComparativeFiqhCase = {
      caseId: 'case_fiqh_touching_spouse_wudu',
      topic: 'Nullification of Wudu by Physical Contact with Spouse',
      question: 'Does casual skin-to-skin touch between spouses invalidate ritual ablution (Wudu)?',
      areasOfAgreement: [
        'Intercourse strictly nullifies Wudu by consensus (Ijma\').',
        'Direct touch with semen or pre-seminal fluid (Madhi) nullifies Wudu.'
      ],
      areasOfDisagreement: [
        'Casual non-lustful skin contact without emissions.'
      ],
      schoolPositions: {
        HANAFI: {
          madhhab: 'HANAFI',
          positionSummary: 'Does NOT break Wudu under any non-intercourse circumstance, even with lust, unless accompanied by discharge.',
          ruling: 'MUBAH',
          primaryEvidenceRefs: ['HADITH_AISHA_KISS_PRAYER (Sunan Abi Dawud 179; Sahih)', 'Tafsir of "aw lamastum al-nisa" as intercourse'],
          conditionsAndExceptions: ['Discharge of Madhi will break Wudu on its own accord.'],
          canonicalReferences: ['Al-Hidayah, Vol. 1, Kitab al-Taharah; Radd al-Muhtar 1/148']
        },
        MALIKI: {
          madhhab: 'MALIKI',
          positionSummary: 'Breaks Wudu ONLY if touched with desire (Ladhdhah) or intended desire, whether by touch or being touched.',
          ruling: 'MAKRUH',
          primaryEvidenceRefs: ['Al-Muwatta: Yahya from Malik from Ibn Umar', 'Surah Al-Nisa 4:43 interpreted with condition of pleasure'],
          conditionsAndExceptions: ['Touch without desire or intent does not break Wudu.'],
          canonicalReferences: ['Mukhtasar Khalil, Bab al-Wudu; Al-Risalah of Ibn Abi Zayd']
        },
        SHAFI_I: {
          madhhab: 'SHAFI_I',
          positionSummary: 'Direct skin-to-skin touch between non-Mahram male and female strictly breaks Wudu unconditionally, with or without desire.',
          ruling: 'HARAM', // in sense of invalidation of prayer validity
          primaryEvidenceRefs: ['Literal interpretation of Surah Al-Nisa 4:43 ("aw lamastum al-nisa")', 'Athar of Ibn Mas\'ud (Sahih)'],
          conditionsAndExceptions: ['Barrier (cloth/gloves) prevents nullification; touch of Mahram relatives does not break Wudu.'],
          canonicalReferences: ['Minhaj al-Talibin, Bab Asbab al-Hadath; Al-Majmu\' 2/30']
        },
        HANBALI: {
          madhhab: 'HANBALI',
          positionSummary: 'Breaks Wudu only if touch is accompanied by physical lust/desire (Shahwah).',
          ruling: 'MAKRUH',
          primaryEvidenceRefs: ['Reconciliation of Aisha\'s hadith with Surah Al-Nisa 4:43', 'Masa\'il Ahmad wa Ishaq'],
          conditionsAndExceptions: ['Touch without Shahwah (casual touch, helping spouse) does not break Wudu.'],
          canonicalReferences: ['Al-Mughni by Ibn Qudamah 1/192; Zad al-Mustaqni\'']
        },
        GENERAL: {
          madhhab: 'GENERAL',
          positionSummary: 'Valid difference of opinion among classical scholars; seekers should follow their local teacher or chosen school with consistency.',
          ruling: 'MUBAH',
          primaryEvidenceRefs: ['Comprehensive Sunan references'],
          conditionsAndExceptions: ['Follow school consistently without seeking anomalous dispensations (Tatabbu\' al-Rukhas) solely for whims.'],
          canonicalReferences: ['Bidayat al-Mujtahid, Kitab al-Taharah']
        }
      },
      epistemicClassification: 'FIQH_POSITION',
      neutralityAffirmation: 'AMAL presents all four Sunni schools with scholarly parity. No school is ranked as superior.'
    };

    this.comparativeCases.set(wuduNullification.caseId, wuduNullification);
  }

  public getMadhhabFoundation(school: SunniSchool): MadhhabFoundation | undefined {
    return this.foundations.get(school);
  }

  public getAllFoundations(): MadhhabFoundation[] {
    return Array.from(this.foundations.values());
  }

  public getComparativeCase(caseId: string): ComparativeFiqhCase | undefined {
    return this.comparativeCases.get(caseId);
  }

  public assertMadhhabNeutrality(rankingAttempt: { favoredSchool: string; reason: string }): void {
    // Charter Core Principle: AMAL is not built for one madhhab; AMAL must not rank one madhhab as universally superior
    const sectarianWords = ['superior', 'better', 'only_correct', 'most_authentic_school', 'invalid_school'];
    const lowerReason = rankingAttempt.reason.toLowerCase();

    for (const w of sectarianWords) {
      if (lowerReason.includes(w)) {
        throw new Error(
          `SECTARIAN_RANKING_VIOLATION: AMAL OS is strictly prohibited from ranking one Sunni madhhab over another. All four schools are legitimate orthodox methodologies.`
        );
      }
    }
  }

  public assertEvidenceImmutability(operation: {
    userPreferenceModified: string;
    targetPayload: 'QURAN_TEXT' | 'HADITH_CANON' | 'SCHOLAR_ATTRIBUTION' | 'HISTORICAL_FACT';
  }): void {
    // Charter Knowledge Principle: User preference must NEVER modify Quranic text, source provenance, hadith identity, or attribution
    const protectedEntities = ['QURAN_TEXT', 'HADITH_CANON', 'SCHOLAR_ATTRIBUTION', 'HISTORICAL_FACT'];
    if (protectedEntities.includes(operation.targetPayload)) {
      throw new Error(
        `EVIDENCE_TAMPERING_VIOLATION: User preference "${operation.userPreferenceModified}" cannot modify ${operation.targetPayload}. Evidence is immutable.`
      );
    }
  }

  public assertEpistemicSeparation(item: { text: string; claimedCategory: EpistemicCategory }): void {
    // Charter Epistemic Separation: Revelation, Hadith, Fiqh, Behavioral Science, and AI Inference must NEVER be silently merged
    if (item.claimedCategory === 'AI_INFERENCE' && item.text.toLowerCase().includes('allah commands you to')) {
      throw new Error(
        'EPISTEMIC_CONFLATION_VIOLATION: AI Inference cannot simulate divine command (REVELATION). Epistemic origin must remain pure.'
      );
    }
  }

  public renderFiqhGuidance(
    caseId: string,
    preferences: PersonalScholarlyPreferences
  ): RenderedFiqhResponse {
    const comparativeCase = this.comparativeCases.get(caseId);
    if (!comparativeCase) {
      throw new Error(`CASE_NOT_FOUND: Comparative Fiqh case ${caseId} does not exist.`);
    }

    const preferredSchool = preferences.madhhabPreference === 'GENERAL_SUNNI' ? 'GENERAL' : preferences.madhhabPreference;
    const selectedPosition = comparativeCase.schoolPositions[preferredSchool] || comparativeCase.schoolPositions.GENERAL;

    // Multi-tier presentation per charter:
    // BEGINNER_SIMPLE: clear, practical, non-sectarian tone without juristic overload
    // PRACTICING: grounded practical guidance with reference
    // ADVANCED_STUDENT: full comparative analysis with references, conditions, and usul
    if (preferences.levelOfDetail === 'BEGINNER_SIMPLE') {
      return {
        topic: comparativeCase.topic,
        epistemicOrigin: 'FIQH_POSITION',
        audienceLevel: 'BEGINNER_SIMPLE',
        practicalGuidance: `According to standard practice: ${selectedPosition.positionSummary} If your spouse casually brushes against your hand, maintain your focus on prayer tranquility.`,
        evidencePreserved: true
      };
    }

    if (preferences.levelOfDetail === 'PRACTICING') {
      return {
        topic: comparativeCase.topic,
        epistemicOrigin: 'FIQH_POSITION',
        audienceLevel: 'PRACTICING',
        practicalGuidance: `In the ${preferredSchool} tradition: ${selectedPosition.positionSummary} (Ref: ${selectedPosition.canonicalReferences.join('; ')}). Note: Other classical Sunni schools offer alternative well-grounded rulings.`,
        primaryPosition: selectedPosition,
        evidencePreserved: true
      };
    }

    // ADVANCED_STUDENT
    return {
      topic: comparativeCase.topic,
      epistemicOrigin: 'FIQH_POSITION',
      audienceLevel: 'ADVANCED_STUDENT',
      practicalGuidance: `Detailed comparative analysis: ${comparativeCase.question}`,
      primaryPosition: selectedPosition,
      comparativeBreakdown: comparativeCase,
      evidencePreserved: true
    };
  }
}
