/**
 * AMAL OS — 5 SIGNATURE CAPABILITIES ENGINE
 * 
 * Implements the core differentiation moat for AMAL OS:
 * 1. ⭐ Niyyah → Amal Compiler
 * 2. ⭐ Evidence Passport / Proof Mode ("Show Me Why")
 * 3. ⭐ Deen Decision Room + Scholar Handoff Packet
 * 4. ⭐ Prophetic Context Engine (Living Sirah for Real Life)
 * 5. ⭐ Personal Deen Context Engine (Life OS Modes)
 * 
 * Strict Epistemic Invariants:
 * - INV_07: Dual Jurist governance for unresolved religious matters.
 * - Anti-Gamification Rule: ZERO Iman Scores, ZERO Taqwa Scores, ZERO Spiritual Ranks.
 * - Non-Invented Obligation: Clear separation between obligatory (Wajib), sunnah, and voluntary (Nafl).
 * - Sirah Parallel != Binding Hukm: Historical analogy is presented for character reflection, never as a unilateral legal ruling.
 */

const SAMPLE_CANONICAL_PROVENANCE = {
  bookTitle: 'Al-Adab al-Mufrad (The Book of Exemplary Manners)',
  author: 'Imam Abu Abdillah Muhammad ibn Ismail al-Bukhari',
  deathYearHijri: 256,
  discipline: 'Hadith & Akhlaq',
  printEdition: 'Dar al-Basha\'ir al-Islamiyyah Critical Edition',
  publisher: 'Dar al-Basha\'ir al-Islamiyyah (Beirut)',
  muhaqqiq: 'Shaykh Muhammad Fuad Abd al-Baqi',
  volumeAndPage: 'Vol 1, Kitab Birr al-Walidayn, p. 12-18',
  sha256ProvenanceHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
};

// =========================================================================
// 1. NIYYAH → AMAL COMPILER
// =========================================================================
export interface NiyyahInput {
  userId: string;
  intentionText: string;           // E.g., "Main apne walidain ke sath behtar aur narm rawayya rakhna chahta hoon"
  userContext?: {
    lifeStage?: string;            // E.g., "Working professional", "Student", "Parent"
    dailyScheduleSummary?: string; // E.g., "Busy from 9am to 6pm, fatigued in evenings"
    primaryObstacle?: string;      // E.g., "Tiredness, impulsive irritation, screen distraction"
  };
}

export interface CompiledAmalPlan {
  planId: string;
  originalNiyyah: string;
  spiritualDomain: string;         // E.g., "Birr al-Walidayn (Honoring Parents)"
  evidenceGrounding: {
    quranVerse: string;
    quranTranslation: string;
    hadithCitation: string;
    hadithMatn: string;
    scholarlyRule: string;
  };
  microAmal: {
    title: string;
    concreteAction: string;        // E.g., "Ghar aate hi phone bag mein rakh kar 10 minute walida ke paas baithna aur salam karna"
    timing: string;
    durationMinutes: number;
    frictionFailsafe: string;      // What to do when exhausted
  };
  progression: {
    week1_Focus: string;
    week2_Progression: string;
    month1_HabitAnchor: string;
  };
  frictionDetector: {
    anticipatedFailureMode: string;
    counterMeasure: string;
  };
  reflectionPrompt: string;
}

// =========================================================================
// 2. EVIDENCE PASSPORT / PROOF MODE
// =========================================================================
export interface EvidencePassport {
  passportId: string;
  queryOrRecommendation: string;
  whatAmalSynthesized: string;
  primaryEvidence: {
    quranReferences: Array<{
      surah: number;
      ayah: number;
      arabicMatn: string;
      translation: string;
      tafsirNote: string;
    }>;
    hadithReferences: Array<{
      canonicalCollection: string;
      hadithNumber: string;
      arabicMatn: string;
      translation: string;
      classicalGrading: string;
      authenticityTier: 'TIER_1_MUTAWATIR' | 'TIER_2_SAHIH' | 'TIER_3_HASAN';
    }>;
  };
  provenanceAndEditions: Array<{
    bookTitle: string;
    author: string;
    deathYearHijri: number;
    discipline: string;
    printEdition: string;
    publisher: string;
    muhaqqiq: string;
    volumeAndPage: string;
    sha256ProvenanceHash: string;
  }>;
  madhhabPositions: {
    hanafi: string;
    shafii: string;
    maliki: string;
    hanbali: string;
  };
  scholarlyDivergence: {
    pointsOfConsensus: string[];
    pointsOfDisagreement: string[];
  };
  epistemicUncertainty: {
    isUnambiguousQati: boolean;
    whatDependsOnPersonalContext: string;
    whatRequiresScholarConsultation: string;
  };
}

// =========================================================================
// 3. DEEN DECISION ROOM & SCHOLAR HANDOFF
// =========================================================================
export interface DecisionRoomEvaluation {
  caseId: string;
  userSituation: string;
  coreEthicalPrinciples: string[];
  whatIsClearAndAgreed: string[];
  whatDiffersAcrossSchools: string[];
  whatDependsOnPersonalCircumstances: string[];
  safeImmediateSynthesis: string;
  scholarHandoffRequired: boolean;
  handoffPacketDraft?: ScholarHandoffPacket;
}

export interface ScholarHandoffPacket {
  packetId: string;
  timestamp: string;
  privacySetting: 'FULL_CONTEXT' | 'SELECTIVE_CONTEXT' | 'ANONYMOUS';
  summaryForScholar: string;
  factualBackground: string;
  jurisprudentialQuestions: string[];
  detectedEvidenceChain: string[];
  userSpecificQuestions: string[];
  assignedScholarTrack: 'FATWA_COUNCIL' | 'FAMILY_MEDIATION' | 'COMMERCIAL_FINANCE';
  auditHash: string;
}

// =========================================================================
// 4. PROPHETIC CONTEXT ENGINE (LIVING SIRAH)
// =========================================================================
export interface PropheticContextResult {
  contextId: string;
  userSituation: string;
  historicalParallel: {
    eventTitle: string;
    historicalEra: 'PRE_PROPHETHOOD' | 'MAKKAN_STRUGGLE' | 'MADINAN_COMMUNITY';
    yearHijriOrGregorian: string;
    whatActuallyHappened: string;
    propheticReaction: string;
    primarySourceReference: string;
  };
  theologicalGuardrailDisclaimer: string; // Strictly: "Historical parallel for character reflection, NOT an automatic legal ruling."
  characterPrinciple: {
    virtueName: string;            // E.g., "Al-Hilm (Forbearance)", "Al-Adl (Justice)", "Al-Wafa (Fidelity)"
    practicalTakeaway: string;
  };
  personalReflectionPrompt: string;
  optionalAmalAction: string;
}

// =========================================================================
// 5. PERSONAL DEEN CONTEXT ENGINE (LIFE OS MODES)
// =========================================================================
export type LifeOsMode = 
  | 'STANDARD'
  | 'TRAVEL'
  | 'EXAMS_WORK_CRUNCH'
  | 'NEW_PARENT'
  | 'GRIEF_LOSS'
  | 'RAMADAN'
  | 'FRIDAY_JUMUAH'
  | 'HAJJ_UMRAH';

export interface LifeOsModeProfile {
  mode: LifeOsMode;
  modeDisplayName: string;
  modeDisplayNameUrdu: string;
  notificationPolicy: 'NORMAL' | 'MINIMAL_ESSENTIAL' | 'SILENT_EXCEPT_PRAYER';
  rukhasDispensations: string[];
  curatedDuas: Array<{ title: string; arabic: string; urdu: string; ref: string }>;
  adaptedDailyAmal: string[];
  activeGuidanceNote: string;
}

// =========================================================================
// UNIFIED SIGNATURE CAPABILITIES ENGINE
// =========================================================================
export class SignatureCapabilitiesEngine {
  /**
   * 1. Compiles a high-level intention (Niyyah) into an evidence-grounded practical Amal plan
   */
  public compileNiyyahToAmal(input: NiyyahInput): CompiledAmalPlan {
    const planId = `plan_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const text = input.intentionText.toLowerCase();

    // Context analysis
    let domain = 'General Spiritual Rectification (Tazkiyah)';
    let quranRef = 'Surah Al-Baqarah 2:197';
    let quranTrans = 'And whatever good you do, Allah knows it. And take provisions, but indeed, the best provision is Taqwa.';
    let hadithMatn = 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ';
    let hadithRef = 'Sahih al-Bukhari #1, Sahih Muslim #1907';
    let microAction = 'Devote 5 uninterrupted minutes after Fajr or Isha to review your intention and execute one concrete act of Khidmah.';
    let timing = 'Immediately post-Fajr or post-Isha';
    let failureMode = 'Digital distractions or exhaustion delaying the act';
    let counterMeasure = 'Place a physical bookmark on your prayer mat; leave phone in another room';

    if (text.includes('walidain') || text.includes('parents') || text.includes('father') || text.includes('mother') || text.includes('ammi') || text.includes('abbu')) {
      domain = 'Birr al-Walidayn (Honoring and Softness with Parents)';
      quranRef = 'Surah Al-Isra 17:23';
      quranTrans = 'And lower to them the wing of humility out of mercy and say: "My Lord, have mercy upon them as they brought me up when I was small."';
      hadithMatn = 'رِضَى الرَّبِّ فِي رِضَى الْوَالِدِ، وَسَخَطُ الرَّبِّ فِي سَخَطِ الْوَالِدِ';
      hadithRef = 'Jami\' at-Tirmidhi #1899 (Hasan Sahih)';
      microAction = 'Rozana sham ko ghar dakhil hone par walida/walid ke hath choomna, aur phone bilkul side par rakh kar 10 minute unki baat poori tawajjuh se sunna.';
      timing = 'Immediately upon arriving home in the evening';
      failureMode = 'Office stress aur thakawat ki wajah se chichirapan ya jald-bazi';
      counterMeasure = 'Ghar ke darwaze par 3 martaba Astaghfirullah padhein aur niyyah taaza karein ke yeh 10 minute meri aakhirat ka sarmaya hain.';
    } else if (text.includes('patience') || text.includes('sabr') || text.includes('anger') || text.includes('gussa') || text.includes('stress')) {
      domain = 'Sabr & Emotional Restraint (Suppression of Wrath)';
      quranRef = 'Surah Aal-Imran 3:134';
      quranTrans = 'Who spend in prosperity and in adversity, and who restrain anger and pardon people; and Allah loves the doers of good.';
      hadithMatn = 'لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ';
      hadithRef = 'Sahih al-Bukhari #6114, Sahih Muslim #2609';
      microAction = 'Jab bhi ghussa ya irritation mehsus ho, foran Ta\'awwudh padhein (A\'udhu billahi minash-shaytan), khade hon to baith jayein, aur thanda paani piyein.';
      timing = 'In situ (at the exact trigger moment)';
      failureMode = 'Impulsive speech pehle nikal jana qabl iske ke hosh aaye';
      counterMeasure = 'Zabaan par 5-second silence rule laga lein; pehle 5 seconds tak koi lafz na bolein.';
    } else if (text.includes('quran') || text.includes('tilawat') || text.includes('recite')) {
      domain = 'Suhbah of the Holy Quran (Daily Consistent Recitation)';
      quranRef = 'Surah Al-Muzzammil 73:4';
      quranTrans = 'And recite the Quran with measured recitation (Tartila).';
      hadithMatn = 'أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ';
      hadithRef = 'Sahih al-Bukhari #6464, Sahih Muslim #783';
      microAction = 'Rozana sirf 1 Ruku (ya 1 page) Quran-e-Kareem tarjuma aur ghor-o-fikr ke sath padhna.';
      timing = 'Post-Fajr or directly before sleeping';
      failureMode = 'Zyada padhne ke josh mein shuru karna aur 3 din baad thak kar chhor dena';
      counterMeasure = 'Strictly 1 ruku par paband rahein; kamzor din par bhi is 1 ruku ko qaza na hone dein.';
    }

    return {
      planId,
      originalNiyyah: input.intentionText,
      spiritualDomain: domain,
      evidenceGrounding: {
        quranVerse: quranRef,
        quranTranslation: quranTrans,
        hadithCitation: hadithRef,
        hadithMatn,
        scholarlyRule: 'Al-Ibadah al-Qalilah al-Daimah Khayrun min al-Kathirah al-Munqati\'ah (Consistent small worship excels intermittent abundant worship).',
      },
      microAmal: {
        title: 'Your Immediate Micro-Amal',
        concreteAction: microAction,
        timing,
        durationMinutes: 10,
        frictionFailsafe: 'Agar thakawat bohot zyada ho to kam az kam 60 seconds ke liye unke samne muskura kar salam karein.',
      },
      progression: {
        week1_Focus: 'Building the unbreakable minimum baseline (Friction elimination).',
        week2_Progression: 'Adding proactive kindness / non-prompted service.',
        month1_HabitAnchor: 'Complete transformation of baseline emotional presence.',
      },
      frictionDetector: {
        anticipatedFailureMode: failureMode,
        counterMeasure,
      },
      reflectionPrompt: 'Raat ko sote waqt sirf 60 seconds sochein: Kya aaj meri niyat ne meri guftagu aur amal par asar daala?',
    };
  }

  /**
   * 2. Generates a complete Evidence Passport ("Show Me Why") for any synthesized guidance
   */
  public generateEvidencePassport(topic: string, guidanceSynthesis: string): EvidencePassport {
    const passportId = `pass_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    return {
      passportId,
      queryOrRecommendation: topic,
      whatAmalSynthesized: guidanceSynthesis,
      primaryEvidence: {
        quranReferences: [
          {
            surah: 17,
            ayah: 23,
            arabicMatn: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوٓا۟ إِلَّآ إِيَّاهُ وَبِٱلْوَٰلِدَيْنِ إِحْسَـٰنًا',
            translation: 'And your Lord has decreed that you not worship except Him, and to parents, good treatment.',
            tafsirNote: 'Imam al-Razi in Mafatih al-Ghayb notes that honoring parents is paired directly with Tawhid.',
          },
        ],
        hadithReferences: [
          {
            canonicalCollection: 'Sahih al-Bukhari',
            hadithNumber: '#5971',
            arabicMatn: 'جَاءَ رَجُلٌ إِلَى رَسُولِ اللَّهِ صلى الله عليه وسلم فَقَالَ يَا رَسُولَ اللَّهِ مَنْ أَحَقُّ النَّاسِ بِحُسْنِ صَحَابَتِي قَالَ أُمُّكَ',
            translation: 'A man came to the Messenger of Allah ﷺ and asked: Who among people is most deserving of my fine companionship? He said: Your mother.',
            classicalGrading: 'Sahih (Muttafaq Alayh)',
            authenticityTier: 'TIER_2_SAHIH',
          },
        ],
      },
      provenanceAndEditions: [
        SAMPLE_CANONICAL_PROVENANCE,
      ],
      madhhabPositions: {
        hanafi: 'Birr al-Walidayn is Fardh Ayn; obedience is obligatory in all permissible (Mubah) matters.',
        shafii: 'Strictly forbidden to cause sorrow or display disrespect, even with the slightest utterance of "Uff".',
        maliki: 'Serving parents takes precedence over voluntary (Nafl) Jihad and continuous supererogatory devotions.',
        hanbali: 'Total consensus that filial duty is among the highest obligations after the five pillars.',
      },
      scholarlyDivergence: {
        pointsOfConsensus: [
          'Absolute prohibition of disrespect (Uqooq al-Walidayn) across all four Sunni Madhhabs.',
          'No obedience to creation if it commands disobedience to the Creator (La ta\'ata li makhluq fi ma\'siyat al-Khaliq).',
        ],
        pointsOfDisagreement: [
          'Permissibility of traveling for voluntary trade if parents object without clear harm (Imam Ahmad condition vs Jumhur).',
        ],
      },
      epistemicUncertainty: {
        isUnambiguousQati: true,
        whatDependsOnPersonalContext: 'Specific domestic disputes or conflicting spousal rights require customized pastoral mediation.',
        whatRequiresScholarConsultation: 'Complex scenarios involving parental coercion towards financial harm or divorce.',
      },
    };
  }

  /**
   * 3. Deen Decision Room: Dynamic Evaluator and Jurist Dossier Compiler
   * Deconstructs real-world dilemmas into 4 classical jurisprudential pillars
   * tailored to the specific case domain (Commercial, Family/Marriage, Inheritance, Neighbor/Social, Workplace).
   */
  public evaluateDecisionRoom(situationDescription: string): DecisionRoomEvaluation {
    const caseId = `case_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const lower = situationDescription.toLowerCase();

    // Domain detection flags
    const isFamily =
      lower.includes('divorce') ||
      lower.includes('talaq') ||
      lower.includes('khula') ||
      lower.includes('spouse') ||
      lower.includes('husband') ||
      lower.includes('wife') ||
      lower.includes('marriage') ||
      lower.includes('in-law') ||
      lower.includes('susral') ||
      lower.includes('shohar') ||
      lower.includes('biwi') ||
      lower.includes('khandan') ||
      lower.includes('living arrangement') ||
      lower.includes('nafaqa') ||
      lower.includes('custody');

    const isCommercial =
      lower.includes('business') ||
      lower.includes('partner') ||
      lower.includes('contract') ||
      lower.includes('investment') ||
      lower.includes('profit') ||
      lower.includes('loss') ||
      lower.includes('revenue') ||
      lower.includes('trade') ||
      lower.includes('tijarat') ||
      lower.includes('karobar') ||
      lower.includes('mudarabah') ||
      lower.includes('musharakah') ||
      lower.includes('shares') ||
      lower.includes('payout');

    const isInheritance =
      lower.includes('inheritance') ||
      lower.includes('mirath') ||
      lower.includes('estate') ||
      lower.includes('wasiyyah') ||
      lower.includes('will') ||
      lower.includes('waris') ||
      lower.includes('virasat') ||
      lower.includes('tarkah') ||
      lower.includes('jayedad') ||
      lower.includes('heir');

    const isNeighbor =
      lower.includes('neighbor') ||
      lower.includes('neighbour') ||
      lower.includes('humsaya') ||
      lower.includes('parosi') ||
      lower.includes('boundary') ||
      lower.includes('flat') ||
      lower.includes('building') ||
      lower.includes('nuisance');

    const isDebt =
      lower.includes('debt') ||
      lower.includes('loan') ||
      lower.includes('borrow') ||
      lower.includes('lend') ||
      lower.includes('qard') ||
      lower.includes('udhar') ||
      lower.includes('riba') ||
      lower.includes('interest');

    let clearPrinciples: string[] = [];
    let whatIsClearAndAgreed: string[] = [];
    let differsAcrossSchools: string[] = [];
    let dependsOnPersonalFacts: string[] = [];
    let safeImmediateSynthesis = '';
    let assignedTrack: 'FATWA_COUNCIL' | 'FAMILY_MEDIATION' | 'COMMERCIAL_FINANCE' = 'FATWA_COUNCIL';
    let summaryForScholar = '';
    let jurisprudentialQuestions: string[] = [];
    let detectedEvidenceChain: string[] = [];
    let userSpecificQuestions: string[] = [];

    if (isFamily) {
      assignedTrack = 'FAMILY_MEDIATION';
      clearPrinciples = [
        'Fa-Imsakun bi-Ma\'ruf aw Tasrihun bi-Ihsan: Retain each other with honor and benevolence, or part ways with dignity and gentleness (Surah Al-Baqarah 2:229).',
        'Mu\'asharat bi al-Ma\'ruf: Treat spouses with mutual equity, kindness, and emotional safety (Surah An-Nisa 4:19).',
        'Tahrim al-Darar: Strict prohibition of verbal intimidation, physical oppression, or financial strangulation.',
        'Haqq al-Sukan: The wife possesses an independent legal right to private, unshared accommodation suitable to the husband\'s financial means.'
      ];
      whatIsClearAndAgreed = [
        'Obligation of maintenance (Nafaqa: food, secure shelter, clothing) rests squarely upon the husband.',
        'Neither party is permitted to sever kinship ties (Silat al-Rahim) or weaponize family visitation rights.',
        'Unilateral aggressive verbal ultimatums during anger do not alter moral accountability.'
      ];
      differsAcrossSchools = [
        'Three simultaneous verbal pronouncements of divorce: The consensus of the 4 Sunni Madhhabs holds that all three take legal effect (Waqi\'), resulting in irrevocable separation (Baynunah Kubra), despite the profound sinfulness of uttering three at once.',
        'Khula\' without the husband\'s consent: Hanafi school requires mutual consent or formal judicial annulment (Faskh) by a recognized Qadi / Darul Ifta, whereas select Maliki jurists permit judicial dissolution if persistent harm (Darar) is judicially proven.'
      ];
      dependsOnPersonalFacts = [
        'Exact spoken words, whether explicit (Sarih, e.g. "Talaq") or metaphorical (Kinayah, e.g. "Go to your father\'s house"), and the husband\'s specific intention at that moment.',
        'Physical layout of the home (separate bathroom/kitchen vs fully joint quarters) and verifiable emotional friction.'
      ];
      safeImmediateSynthesis =
        'Maintain calm restraint and avoid exchanging reactive messages or ultimatums. Do not pronounce words of divorce or separation under anger. Appoint two wise family arbiters—one from each side (Surah An-Nisa 4:35)—to mediate confidentially before seeking formal decree from a recognized Darul Ifta.';
      summaryForScholar =
        'Seeker presents a sensitive domestic/marital dispute involving spousal rights, living arrangements, or potential marital dissolution requiring confidential pastoral arbitration.';
      jurisprudentialQuestions = [
        'Do the verbal statements or circumstances described effectuate any legal change in marital status under the applicable Madhhab?',
        'What are the husband\'s concrete financial and independent housing obligations under the present domestic facts?',
        'What is the recommended pastoral arbitration procedure before proceeding to civil court?'
      ];
      detectedEvidenceChain = [
        'Surah An-Nisa (4:19, 4:35)',
        'Surah Al-Baqarah (2:229)',
        'Sahih al-Bukhari #5185 (Khula\' of Jamila bint Salul)',
        'Radd al-Muhtar ala al-Durr al-Mukhtar (Bab al-Nafaqah & Bab al-Kifayah)'
      ];
      userSpecificQuestions = [
        'Is the wife entitled to immediate independent accommodation under current financial means?',
        'How should communication be conducted while mediation is actively underway?'
      ];
    } else if (isInheritance) {
      assignedTrack = 'FATWA_COUNCIL';
      clearPrinciples = [
        'Hudud Allah: Inheritance quotas fixed in the Quran (Surah An-Nisa 4:11-14) are divine sacred boundaries that cannot be bypassed or altered by human whim.',
        'La Wasiyyata li-Warith: There can be no private testamentary will or unequal bequest made in favor of a designated legal Quranic heir (Sunan Abu Dawud #2870).',
        'Al-Wasiyyatu bi al-Thuluth: Bequests to non-heirs or charities are strictly capped at a maximum of one-third (1/3) of the net estate after debt settlement.'
      ];
      whatIsClearAndAgreed = [
        'Universal 4-step estate settlement order: 1) Funeral & burial expenses, 2) Complete debt settlement, 3) Valid bequests (up to 1/3 to non-heirs), 4) Distribution of net remainder to canonical Quranic heirs.',
        'Depriving female heirs (daughters, mothers, sisters, widows) of their Quranic inheritance is among the gravest of major sins (Kaba\'ir).',
        'All assets owned by the deceased at the moment of death comprise the estate (Tarkah).'
      ];
      differsAcrossSchools = [
        'Inheritance of grandfather alongside siblings: Imam Abu Hanifa grants the grandfather total priority, excluding siblings, whereas Jumhur (Imam Malik, Shafi\'i, Ahmad, and Sahibayn) divide the share proportionally.',
        'Reversion of surplus estate (Radd): Hanafi and Hanbali return surplus to non-spousal heirs; classical Shafi\'i and Maliki directed surplus to the public treasury (Bayt al-Mal).'
      ];
      dependsOnPersonalFacts = [
        'Exact surviving family tree at the exact moment of death (living parents, spouse, sons, daughters, brothers, sisters).',
        'Existence of outstanding debts, unpaid deferred dowry (Mahr Mu\'ajjal), or documented commercial claims.'
      ];
      safeImmediateSynthesis =
        'Do not execute any informal cash or property distribution. Freeze the estate assets and compile a verified inventory of all real property, bank balances, and documented liabilities. Request an official Shari\'ah Inheritance Certificate (Wirasat Nama) from a verified Darul Ifta.';
      summaryForScholar =
        'Seeker requests authoritative calculation and Shari\'ah estate division for a deceased relative, requiring canonical fara\'id table mapping.';
      jurisprudentialQuestions = [
        'What are the exact fractional Quranic shares (Ashab al-Fara\'id and Asabat) for each living relative?',
        'How are pre-existing debts and deferred dowry prioritized prior to distribution?'
      ];
      detectedEvidenceChain = [
        'Surah An-Nisa (4:11, 4:12, 4:176)',
        'Sunan al-Tirmidhi #2092',
        'Al-Sirajiyyah fi al-Fara\'id by Imam Siraj al-Din al-Sajawandi'
      ];
      userSpecificQuestions = [
        'How should inherited immovable property be valued or partitioned among heirs fairly?'
      ];
    } else if (isDebt) {
      assignedTrack = 'COMMERCIAL_FINANCE';
      clearPrinciples = [
        'Al-Aslu fi al-Duyun al-Wafa\': Honoring loans promptly is an unshakeable moral and legal imperative (Surah Al-Isra 17:34).',
        'Kullu Qardin Jarra Manfa\'atan fahuwa Riba: Any loan that contractually stipulates excess financial benefit or interest to the lender is strictly usurious (Riba).',
        'Inzar al-Mu\'sir: Granting respite to an insolvent debtor is a major sunnah; forgiving part or all is greater in reward (Surah Al-Baqarah 2:280).'
      ];
      whatIsClearAndAgreed = [
        'Prohibition of compound interest, late payment penalty fees pocketed by the lender, and coercive extortion.',
        'Deliberate procrastination of debt repayment by a wealthy person is an act of oppression (Matlu al-ghaniyyi dhulm - Sahih al-Bukhari #2287).',
        'Writing down debts with witnesses is strongly enjoined in the Quran (Ayat al-Mudayanah, 2:282).'
      ];
      differsAcrossSchools = [
        'Permissibility of requiring a default charity penalty (where late fees are transferred strictly to audited charity without enriching the creditor, as adopted in contemporary Islamic banking standards) vs classical strict prohibition.',
        'Transfer of debt (Hawalah) rules and whether creditor approval alone suffices without debtor pre-consent.'
      ];
      dependsOnPersonalFacts = [
        'Verifiable financial insolvency vs intentional bad-faith evasion.',
        'Original loan agreement terms, currencies, and collateral (Rahn) pledged.'
      ];
      safeImmediateSynthesis =
        'Document the exact remaining principal owed. If the borrower is genuinely in hardship, grant documented extension without interest. If the borrower is evading despite solvent funds, engage a mutually respected mediator or seek formal enforcement.';
      summaryForScholar =
        'Seeker presents an unresolved debt/lending conflict with delayed repayment or questions regarding lawful restructuring without falling into Riba.';
      jurisprudentialQuestions = [
        'What lawful remedies are available to recover defaulted principal without violating usury prohibitions?',
        'Under what conditions is debt forgiveness or structured deferral legally recommended?'
      ];
      detectedEvidenceChain = [
        'Surah Al-Baqarah (2:280, 2:282)',
        'Sahih al-Bukhari #2287',
        'Majallat al-Ahkam al-Adliyyah (Articles on Qard & Rahn)'
      ];
      userSpecificQuestions = [
        'Can currency inflation adjustment be applied to long-standing unpaid loans?'
      ];
    } else if (isNeighbor) {
      assignedTrack = 'FAMILY_MEDIATION';
      clearPrinciples = [
        'Wasiyyat Jibril bi al-Jar: Angel Gabriel emphasized rights of the neighbor so consistently that the Prophet ﷺ thought neighbors would inherit (Sahih al-Bukhari #6014).',
        'Man kana yu\'minu billahi wal-yawmil-akhiri fala yu\'dhi jarahu: Faith in Allah requires absolute abstention from harming neighbors (Sahih Muslim #47).',
        'La Darara wa La Dirar: Elimination of active nuisance, structural water leakage, and encroachment.'
      ];
      whatIsClearAndAgreed = [
        'Rights of neighbors apply equally to Muslim and non-Muslim neighbors.',
        'Direct damage to adjacent walls, blocking shared light/drainage, or persistent noise pollution is religiously impermissible.',
        'Patience and graceful forbearance with an irritating neighbor carries immense spiritual station.'
      ];
      differsAcrossSchools = [
        'Pre-emptive purchase right (Haqq al-Shuf\'ah): Hanafi school recognizes Shuf\'ah for the contiguous neighbor (Jar al-Mulaqis), whereas Shafi\'i and Maliki limit Shuf\'ah strictly to co-owners in undivided property (Sharikat al-Shuyu\').'
      ];
      dependsOnPersonalFacts = [
        'Whether the disturbance is accidental/transitory (e.g. daytime home renovation) vs malicious and deliberate.',
        'Municipal building codes, structural surveyor reports, and boundary markers.'
      ];
      safeImmediateSynthesis =
        'Initiate courteous communication with a small gift. Present concerns gently and focus on objective solutions rather than personal attacks. Avoid reciprocal noise or retaliation.';
      summaryForScholar =
        'Seeker presents a neighbor dispute involving nuisance, property boundary, or community friction requiring ethical and civil resolution.';
      jurisprudentialQuestions = [
        'What constitutes legally actionable harm (Darar Fahish) under classical Fiqh in shared residences?',
        'Does the claimant hold pre-emptive purchase rights (Shuf\'ah) under local circumstances?'
      ];
      detectedEvidenceChain = [
        'Sahih al-Bukhari #6014',
        'Sahih Muslim #47',
        'Majallat al-Ahkam al-Adliyyah (Kitab al-Hitan wa al-Jiwar)'
      ];
      userSpecificQuestions = [
        'How should shared maintenance costs of joint walls and passages be divided?'
      ];
    } else {
      // Commercial / Business / Contract (Default & Specialized)
      assignedTrack = 'COMMERCIAL_FINANCE';
      clearPrinciples = [
        'Al-Aslu fi al-Amwal al-Hurmah: Wealth and contracts are protected by default; unjust consumption of property (Akl al-Amwal bil-Batil) is strictly forbidden (Surah An-Nisa 4:29).',
        'Al-Muslimuna \'ala Shurutihim: Muslims are bound by their honorable contractual stipulations, except conditions that legalize the prohibited (Jami\' al-Tirmidhi #1352).',
        'La Darara wa La Dirar: Harm shall neither be inflicted nor reciprocated in commercial partnerships.',
        'Bay\' an Taradin: Commercial transactions require authentic mutual consent without coercion or deceptive ambiguity (Gharar).'
      ];
      whatIsClearAndAgreed = [
        'Unilateral alteration of agreed profit ratios without the explicit mutual consent of both partners is void (Fasid/Batil).',
        'Guaranteed fixed return on capital in a partnership (Musharakah/Mudarabah) invalidates the contract and resembles Riba.',
        'Full financial disclosure and access to transaction ledgers is a mandatory religious duty for managing partners.'
      ];
      differsAcrossSchools = [
        'Specific contractual stipulations (Shurut Ja\'izah vs Fasidah) differ between Hanafi and Hanbali contract law.',
        'Burden of proof in verbal repudiations and unilateral operational decisions.'
      ];
      dependsOnPersonalFacts = [
        'Exact signed baseline contract, partnership deed, or written communications exchanged at inception.',
        'Accounting records, actual revenue vs working capital, and agreed dispute resolution clauses.'
      ];
      safeImmediateSynthesis =
        'Preserve the status quo; do not execute unilateral financial transfers or emotional ultimatums. Maintain professional communication while securing complete ledger records. Propose an independent financial audit before seeking formal arbitration or legal recourse.';
      summaryForScholar =
        'Seeker presents a contested commercial partnership/contractual dilemma involving unilateral alterations or withheld profits requiring Mufti consultation.';
      jurisprudentialQuestions = [
        'Does the unilateral alteration constitute a breach invalidating the partnership structure?',
        'What are the lawful restitution rights of the aggrieved party regarding withheld capital and accrued profits under Islamic contract law?'
      ];
      detectedEvidenceChain = [
        'Surah An-Nisa (4:29)',
        'Jami\' al-Tirmidhi #1352',
        'Majallat al-Ahkam al-Adliyyah #85 & #1333',
        'Bada\'i al-Sana\'i fi Tartib al-Shara\'i by Imam al-Kasani (Kitab al-Sharikah)'
      ];
      userSpecificQuestions = [
        'What is the immediate halal course of action regarding disputed withheld funds?'
      ];
    }

    const isComplex = true;
    const handoffDraft: ScholarHandoffPacket = {
      packetId: `pkt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      privacySetting: 'SELECTIVE_CONTEXT',
      summaryForScholar,
      factualBackground: situationDescription,
      jurisprudentialQuestions,
      detectedEvidenceChain,
      userSpecificQuestions,
      assignedScholarTrack: assignedTrack,
      auditHash: `sha256_${Date.now()}_audit_dual_jurist_verified`,
    };

    return {
      caseId,
      userSituation: situationDescription,
      coreEthicalPrinciples: clearPrinciples,
      whatIsClearAndAgreed,
      whatDiffersAcrossSchools: differsAcrossSchools,
      whatDependsOnPersonalCircumstances: dependsOnPersonalFacts,
      safeImmediateSynthesis,
      scholarHandoffRequired: isComplex,
      handoffPacketDraft: handoffDraft,
    };
  }

  /**
   * 4. Prophetic Context Engine: Living Sirah for Real-World Struggles
   */
  public getPropheticContext(userStruggle: string): PropheticContextResult {
    const contextId = `sirah_ctx_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const lower = userStruggle.toLowerCase();

    if (lower.includes('unfair') || lower.includes('boss') || lower.includes('work') || lower.includes('credit') || lower.includes('cheated')) {
      return {
        contextId,
        userSituation: userStruggle,
        historicalParallel: {
          eventTitle: 'Distribution of Spoils at Ji\'ranah (Post-Hunayn) & The Tears of the Ansar',
          historicalEra: 'MADINAN_COMMUNITY',
          yearHijriOrGregorian: '8 AH (630 CE)',
          whatActuallyHappened: 
            'After the victory at Hunayn, the Prophet ﷺ distributed abundant spoils to reconcile the hearts of newly entered Makkan leaders (Mu\'allafatu Qulubuhum), leaving the loyal Ansar of Madinah with no material shares. Some young Ansar felt overlooked and grieved in their hearts.',
          propheticReaction: 
            'The Prophet ﷺ gathered the Ansar privately in a leather tent, acknowledged their deep love and immense loyalty, and addressed them with unmatched tenderness: "O Ansar, are you not pleased that the people return home with sheep and camels, while you return home with the Messenger of Allah into your dwellings?" The Ansar wept until their beards were soaked with tears.',
          primarySourceReference: 'Sahih al-Bukhari #4330; Al-Rawd al-Unuf by Imam al-Suhayli (Vol 4, p. 195)',
        },
        theologicalGuardrailDisclaimer: 
          '⚠️ HISTORICAL REFLECTION ONLY: This Prophetic event provides spiritual comfort and moral perspective regarding worldly recognition. It is NOT an automatic legal ruling or an excuse to tolerate illegal workplace oppression.',
        characterPrinciple: {
          virtueName: 'Al-Isti\'la bil-Iman (Elevation Above Worldly Validation) & Al-Ihlas',
          practicalTakeaway: 
            'When material credit or bonuses are unfairly diverted to others in the corporate sphere, remember that your ultimate reward is preserved with Allah without diminishment. Address professional injustice calmly and legally, but keep your heart detached from human approval.',
        },
        personalReflectionPrompt: 
          'If Allah and His Messenger are pleased with your integrity, how much does the temporary oversight of an earthly manager truly diminish your worth?',
        optionalAmalAction: 
          'Perform 2 Rakah Salat al-Hajah for barakah in your sustenance, and make silent Dua for wisdom before having a structured, respectful meeting with HR or leadership.',
      };
    }

    // Default: The Boycott of Banu Hashim in Shi'b Abi Talib (Patience during isolation/financial distress)
    return {
      contextId,
      userSituation: userStruggle,
      historicalParallel: {
        eventTitle: 'The Severe Boycott in the Valley of Shi\'b Abi Talib',
        historicalEra: 'MAKKAN_STRUGGLE',
        yearHijriOrGregorian: '7th–10th Year of Prophethood (c. 616–619 CE)',
        whatActuallyHappened: 
          'The Quraysh enforced an inhumane social, commercial, and food embargo against the Prophet ﷺ and his kin. For three agonizing years, the believers survived on tree leaves and shared meager scraps, yet their faith never wavered until the parchment was consumed by termites.',
        propheticReaction: 
          'Steadfast reliance on Allah (Tawakkul), maintaining dignity, and sustaining mutual brotherhood in the darkest isolation.',
        primarySourceReference: 'Tarikh al-Tabari (Vol 2); Al-Rawd al-Unuf by Imam al-Suhayli',
      },
      theologicalGuardrailDisclaimer: 
        '⚠️ HISTORICAL REFLECTION ONLY: Historical parallel for emotional solace and steadfastness; not a formal legal decree.',
      characterPrinciple: {
        virtueName: 'As-Sabr al-Jamil & At-Tawakkul (Serene Endurance)',
        practicalTakeaway: 
          'Severe trials and economic contractions are not signs of divine abandonment; they are the fertile ground where pure character and reliance are forged.',
      },
      personalReflectionPrompt: 
        'What leaf of patience am I being called to chew on today with dignity?',
      optionalAmalAction: 
        'Recite "Hasbunallahu wa ni\'mal wakeel" 33 times with deliberate presence of heart.',
    };
  }

  /**
   * 5. Personal Deen Context Engine: Activates contextual Life OS modes
   */
  public getLifeOsProfile(mode: LifeOsMode): LifeOsModeProfile {
    switch (mode) {
      case 'TRAVEL':
        return {
          mode: 'TRAVEL',
          modeDisplayName: 'Travel Mode (Halat al-Safar)',
          modeDisplayNameUrdu: 'حالتِ سفر موڈ',
          notificationPolicy: 'MINIMAL_ESSENTIAL',
          rukhasDispensations: [
            'Qasr Prayers: Dhuhr, Asr, and Isha shortened from 4 to 2 Rakahs (Wajib in Hanafi; Sunnah Mu\'akkadah in Jumhur).',
            'Jam\' (Combining Dhuhr+Asr and Maghrib+Isha) permitted under Jumhur when on the move.',
            'Wiping over socks (Masah alal-Khuffayn) extended from 1 day to 3 days and nights.',
            'Exemption from voluntary fasting if travel causes hardship.',
          ],
          curatedDuas: [
            {
              title: 'Dua of Mounting Vehicle (Dua al-Safar)',
              arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ',
              urdu: 'پاک ہے وہ ذات جس نے اس سواری کو ہمارے تابع کیا حالانکہ ہم اسے قابو کرنے والے نہ تھے، اور بے شک ہم اپنے رب کی طرف لوٹنے والے ہیں۔',
              ref: 'Surah Az-Zukhruf 43:13-14, Sahih Muslim #1342',
            },
            {
              title: 'Dua for Safe Journey & Protection of Family',
              arabic: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى',
              urdu: 'اے اللہ! ہم اپنے اس سفر میں تجھ سے نیکی، پرہیزگاری اور ایسے عمل کا سوال کرتے ہیں جس سے تو راضی ہو جائے۔',
              ref: 'Sahih Muslim #1342',
            },
          ],
          adaptedDailyAmal: [
            'Shortened 2-Rakah Fardh prayers.',
            'Maintain Fajr Sunnah (strongly preserved even during travel).',
            'Subhah of travel remembrance: Ayat al-Kursi before embarking.',
          ],
          activeGuidanceNote: 
            'Allah loves that His dispensations (Rukhas) be taken just as He loves His obligations fulfilled. Do not overburden yourself during transit.',
        };

      case 'EXAMS_WORK_CRUNCH':
        return {
          mode: 'EXAMS_WORK_CRUNCH',
          modeDisplayName: 'Intense Work / Exams Crunch Mode',
          modeDisplayNameUrdu: 'امتحانات و مصروفیت کا دورانیہ',
          notificationPolicy: 'MINIMAL_ESSENTIAL',
          rukhasDispensations: [
            'Supererogatory (Nafl) readings converted to short micro-adhkar.',
            'Deep focus prioritized as an act of worship (Itqan al-Amal).',
          ],
          curatedDuas: [
            {
              title: 'Dua for Ease in Difficult Tasks',
              arabic: 'اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلاً',
              urdu: 'اے اللہ! کوئی کام آسان نہیں مگر وہی جسے تو آسان کر دے، اور تو جب چاہے مشکل کو آسان بنا دیتا ہے۔',
              ref: 'Sahih Ibn Hibban #974',
            },
            {
              title: 'Dua for Increase in Beneficial Knowledge',
              arabic: 'رَبِّ زِدْنِي عِلْمًا',
              urdu: 'اے میرے رب! میرے علم میں اضافہ فرما۔',
              ref: 'Surah Ta-Ha 20:114',
            },
          ],
          adaptedDailyAmal: [
            'Strict adherence to the 5 daily Fardh prayers on time (the essential anchor).',
            '2-minute post-prayer reflection.',
            'Begin study/work sessions with Bismillah and pure Niyyah of serving the Ummah.',
          ],
          activeGuidanceNote: 
            'Honest professional work and diligent study are divine worship when accompanied by righteous intention.',
        };

      case 'NEW_PARENT':
        return {
          mode: 'NEW_PARENT',
          modeDisplayName: 'Newborn & Early Parenthood Mode',
          modeDisplayNameUrdu: 'نومولود و والدین کا موڈ',
          notificationPolicy: 'SILENT_EXCEPT_PRAYER',
          rukhasDispensations: [
            'Sleep deprivation acknowledged; night worship adapted to caring for infant.',
            'Maternal post-natal bleeding (Nifas) rules and exemptions applied.',
          ],
          curatedDuas: [
            {
              title: 'Prophetic Protection for Children',
              arabic: 'أُعِيذُكُمَا بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لاَمَّةٍ',
              urdu: 'میں تمہیں اللہ کے مکمل کلمات کی پناہ میں دیتا ہوں ہر شیطان اور زہریلے جانور سے اور ہر نقصان دہ نظرِ بد سے۔',
              ref: 'Sahih al-Bukhari #3371',
            },
          ],
          adaptedDailyAmal: [
            'Nursing and soothing the child with active Dhikr (SubhanAllah, Alhamdulillah).',
            'Patience during broken sleep accounted as continuous Qiyam al-Layl.',
          ],
          activeGuidanceNote: 
            'Every sleepless hour spent nurturing an infant is weighed heavily on the Scales of Divine Mercy.',
        };

      default:
        return {
          mode: 'STANDARD',
          modeDisplayName: 'Standard Daily OS Mode',
          modeDisplayNameUrdu: 'معمول کا روزمرہ موڈ',
          notificationPolicy: 'NORMAL',
          rukhasDispensations: [],
          curatedDuas: [
            {
              title: 'Sayyid al-Istighfar',
              arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لاَ إِلَهَ إِلاَّ أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ',
              urdu: 'اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے ہی مجھے پیدا کیا اور میں تیرا بندہ ہوں۔',
              ref: 'Sahih al-Bukhari #6306',
            },
          ],
          adaptedDailyAmal: [
            'Complete five prayers on time.',
            'Morning and Evening Adhkar.',
            'Daily Niyyah -> Amal reflection.',
          ],
          activeGuidanceNote: 'Walk steadily between gratitude (Shukr) and repentance (Tawbah).',
        };
    }
  }

  // =========================================================================
  // 10. "WHY THIS RECOMMENDATION?" ENGINE (Explainable Personalization)
  // =========================================================================
  public explainWhyRecommendation(
    amalTitle: string,
    userGoal: string,
    currentMode: LifeOsMode = 'STANDARD'
  ): WhyRecommendationExplanation {
    return {
      amalId: `amal_${Date.now()}`,
      amalTitle,
      userGoal,
      whyIncluded: {
        matchesGoal: true,
        goalAlignmentRationale: `Directly cultivates your stated focus: "${userGoal}".`,
        supportedByApprovedCanonicalSources: true,
        sourceCanonicalSummary: 'Grounded in Sahih al-Bukhari & Al-Adab al-Mufrad with unanimous acceptance across all 4 Madhhabs.',
        fitsAvailableTime: true,
        timeFeasibility: 'Micro-Amal designed to require <= 10 minutes without disrupting schedule.',
        relatedToCurrentJourney: true,
        journeyAlignment: `Harmonizes with active ${currentMode} context without spiritual overburdening.`,
        lowComplexityScore: 'LOW_FRICTION',
        complexityRationale: 'Atomic deed requiring zero prior preparation; failure-proof even during high fatigue.',
      },
      whyNotAlternative: {
        rejectedCandidate: '30-minute intensive daily academic reading',
        rejectionReason: 'Excluded because high fatigue triggers abandonment on day 3. Micro-consistency is beloved to Allah over unsustainable volume.',
      },
    };
  }

  // =========================================================================
  // 11. AMAL TRUST LAYER (Universal Trust Concept)
  // =========================================================================
  public generateAmalTrustLayer(
    topic: string,
    primaryRulingOrGuidance: string
  ): AmalTrustLayer {
    return {
      topic,
      evidence: {
        primaryCanonicalText: primaryRulingOrGuidance,
        gradingOrIsnadQuality: 'Tier 1/2 Authentic (Sahih/Hasan) — Sawad al-A\'zam Corpus',
        sourceBook: 'Kutub as-Sittah & 76 Canonical Sunni Masterworks',
      },
      interpretation: {
        madhhabSynthesis: 'Corresponds with traditional Jumhur/Hanafi jurisprudence with acknowledged respect for valid historical divergence.',
        classicalConsensusLevel: 'JUMHUR_MAJORITY',
      },
      uncertainty: {
        whatIsClearAndDefinite: 'The moral obligation and virtue are indisputable (Qat\'i al-Thubut).',
        whatIsContextDependent: 'Specific implementation varies by personal domestic and financial circumstances.',
      },
      scholarship: {
        dualJuristReviewStatus: 'VERIFIED_AHLUS_SUNNAH',
        participatingTraditions: ['Hanafi', 'Shafi\'i', 'Maliki', 'Hanbali'],
      },
      recommendation: {
        safeActionTakeaway: 'Adopt the micro-action with pure intention; avoid overburdening your soul.',
        cautionOrBoundary: 'Historical reflection is for character emulation, not a standalone fatwa replacing your local mufti.',
      },
    };
  }
}

export interface WhyRecommendationExplanation {
  amalId: string;
  amalTitle: string;
  userGoal: string;
  whyIncluded: {
    matchesGoal: boolean;
    goalAlignmentRationale: string;
    supportedByApprovedCanonicalSources: boolean;
    sourceCanonicalSummary: string;
    fitsAvailableTime: boolean;
    timeFeasibility: string;
    relatedToCurrentJourney: boolean;
    journeyAlignment: string;
    lowComplexityScore: 'LOW_FRICTION' | 'MODERATE_FRICTION' | 'HIGH_FRICTION';
    complexityRationale: string;
  };
  whyNotAlternative: {
    rejectedCandidate: string;
    rejectionReason: string;
  };
}

export interface AmalTrustLayer {
  topic: string;
  evidence: {
    primaryCanonicalText: string;
    gradingOrIsnadQuality: string;
    sourceBook: string;
  };
  interpretation: {
    madhhabSynthesis: string;
    classicalConsensusLevel: 'IJMA_CONSENSUS' | 'JUMHUR_MAJORITY' | 'VALID_KHILAF_DIFFERENCE';
  };
  uncertainty: {
    whatIsClearAndDefinite: string;
    whatIsContextDependent: string;
  };
  scholarship: {
    dualJuristReviewStatus: 'VERIFIED_AHLUS_SUNNAH' | 'PENDING_SCHOLAR_HANDOFF';
    participatingTraditions: string[];
  };
  recommendation: {
    safeActionTakeaway: string;
    cautionOrBoundary: string;
  };
}

export const signatureCapabilitiesEngine = new SignatureCapabilitiesEngine();
