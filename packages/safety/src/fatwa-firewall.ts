import { SafetyClass, SafetyClassificationResult } from '@amal/types';

export class FatwaFirewall {
  // Triggers for Class E: Crisis, emergency, self-harm, abuse (English, Roman Urdu, Urdu, Arabic)
  private static readonly CRISIS_PATTERNS = [
    /\b(kill myself|suicide|end my life|self[- ]harm|cut myself|overdose)\b/i,
    /\b(being beaten|domestic abuse|physical violence|hit me|assaulted me|trafficking)\b/i,
    /\b(emergency medical|poisoned|unconscious|cannot breathe)\b/i,
    /\b(khudkushi|mar jana chahta|jaan dena chahta|apne aap ko khatam|gharelu tashaddud|maar peet)\b/i,
    /(خودکشی|جان لے لوں|اپنے آپ کو مار|گھریلو تشدد|مار پیٹ|انتحار|أقتل نفسي|عنف أسري)/i,
  ];

  // Triggers for Class D: Personalized Fiqh, divorce, talaq, marital dissolution, legal oaths (English, Roman Urdu, Urdu, Arabic)
  private static readonly PERSONALIZED_FIQH_PATTERNS = [
    /\b(did i divorce|talaq three times|said talaq|is my marriage invalid|annulled my marriage)\b/i,
    /\b(uttered (divorce|talaq)|words of (divorce|talaq)|pronounce(d)? (divorce|talaq))\b/i,
    /\b(is my marriage (dissolved|over|valid|invalid|ended)|is our marriage (dissolved|valid|invalid))\b/i,
    /\b(my husband said (talaq|divorce)|my wife said (divorce|khula))\b/i,
    /\b(i broke an oath|expiation for my specific oath|kaffarah for breaking)\b/i,
    /\b(fatwa for me|is my specific contract halal|did i commit kufr|am i out of islam)\b/i,
    /\b(ruling on my case|verdict on my situation|declare me)\b/i,
    /\b(talaq de di|talaq dedi|teen talaq|3 talaq|talaq bol diya|khula lena|qasam tod di|kaffara kitna|nikah toot gaya|fatwa chahiye|biwi haram ho gayi)\b/i,
    /(طلاق|تین طلاق|طلاق واقع|خلع|نکاح ٹوٹ گیا|قسم کا کفارہ|فتویٰ چاہیے|کیا یہ حلال ہے یا حرام|هل وقع الطلاق|الخلع|كفارة اليمين|طلاق ثلاث|أفتوني)/i,
  ];

  // Triggers for Class C: Known scholarly disagreement topics
  private static readonly DISAGREEMENT_PATTERNS = [
    /\b(wiping over socks|masah|leather socks|cotton socks)\b/i,
    /\b(raising hands in prayer|raf al-yadayn|placing hands on chest or navel)\b/i,
    /\b(tassami|eating meat of people of the book|halal stunning)\b/i,
    /\b(organ donation|cryptocurrency|stocks zakat calculation method)\b/i,
    /\b(madhhab difference|different schools|scholarly difference|ikhtilaf)\b/i,
  ];

  // Triggers for prompt injection and roleplay manipulation
  private static readonly INJECTION_PATTERNS = [
    /\b(ignore (all|your) (rules|instructions|safety|boundaries))\b/i,
    /\b(act as (a mufti|a grand mufti|an all-knowing mufti))\b/i,
    /\b(pretend you are a mufti|issue a fatwa anyway|forget your programming)\b/i,
    /\b(invent a hadith|make up a source|give me a fake citation)\b/i,
    /\b(what did my (wife|husband|child|parent) (privately reflect|write in reflection))\b/i,
  ];

  /**
   * Classify user query into SafetyClass
   */
  public static classify(query: string): SafetyClassificationResult {
    const trimmed = query.trim();

    // 1. Check prompt injection / roleplay violations
    for (const pattern of this.INJECTION_PATTERNS) {
      if (pattern.test(trimmed)) {
        return {
          safetyClass: 'CLASS_D_PERSONALIZED_RULING',
          confidence: 0.99,
          reasoning: 'Prompt injection or unauthorized Mufti roleplay attempt detected.',
          detectedTriggers: ['PROMPT_INJECTION_OR_ROLEPLAY'],
          requiresScholarEscalation: true,
          requiresCrisisIntervention: false,
        };
      }
    }

    // 2. Check Class E: Crisis & safety emergencies
    for (const pattern of this.CRISIS_PATTERNS) {
      if (pattern.test(trimmed)) {
        return {
          safetyClass: 'CLASS_E_HIGH_RISK_SITUATION',
          confidence: 0.98,
          reasoning: 'Critical life safety, self-harm, or domestic abuse detected.',
          detectedTriggers: ['CRISIS_SAFETY_TRIGGER'],
          requiresScholarEscalation: true,
          requiresCrisisIntervention: true,
          crisisHelplines: [
            { name: 'International Suicide & Crisis Lifeline', contact: '988 or local emergency 112/911' },
            { name: 'Naseeha Muslim Youth & Crisis Helpline', contact: '1-866-NASEEHA (627-3342)' },
            { name: 'National Domestic Violence Hotline', contact: '1-800-799-SAFE (7233)' },
          ],
        };
      }
    }

    // 3. Check Class D: Personalized Fiqh rulings
    for (const pattern of this.PERSONALIZED_FIQH_PATTERNS) {
      if (pattern.test(trimmed)) {
        return {
          safetyClass: 'CLASS_D_PERSONALIZED_RULING',
          confidence: 0.95,
          reasoning: 'Personalized Islamic legal determination (divorce, contract validity, personal oaths) requires qualified human scholar verification.',
          detectedTriggers: ['PERSONALIZED_FIQH_TRIGGER'],
          requiresScholarEscalation: true,
          requiresCrisisIntervention: false,
        };
      }
    }

    // 4. Check Class C: Legitimate scholarly diversity / Ikhtilaf
    for (const pattern of this.DISAGREEMENT_PATTERNS) {
      if (pattern.test(trimmed)) {
        return {
          safetyClass: 'CLASS_C_SCHOLARLY_DISAGREEMENT',
          confidence: 0.90,
          reasoning: 'Topic involves established differences across Sunni legal schools (Madhahib). System must present pluralism without forcing false consensus.',
          detectedTriggers: ['IKHTILAF_TRIGGER'],
          requiresScholarEscalation: false,
          requiresCrisisIntervention: false,
        };
      }
    }

    // 5. Check Class B: General Guidance / Habits / Actions
    if (
      /\b(struggling with|how do i pray|routine|habit|anger|improve|fajr|consistency|overwhelmed|balance)\b/i.test(
        trimmed
      )
    ) {
      return {
        safetyClass: 'CLASS_B_GENERAL_GUIDANCE',
        confidence: 0.92,
        reasoning: 'General lifestyle, habits, or spiritual counseling with educational context and practical steps.',
        detectedTriggers: ['GENERAL_GUIDANCE_TRIGGER'],
        requiresScholarEscalation: false,
        requiresCrisisIntervention: false,
      };
    }

    // Default: Class A - General Educational Question
    return {
      safetyClass: 'CLASS_A_GENERAL_EDUCATIONAL',
      confidence: 0.88,
      reasoning: 'General educational question grounded directly in verified sources.',
      detectedTriggers: ['GENERAL_EDUCATION'],
      requiresScholarEscalation: false,
      requiresCrisisIntervention: false,
    };
  }
}
