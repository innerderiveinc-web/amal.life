export type SupportedLanguage = 'en' | 'ur' | 'ar' | 'hi';
export interface TranslationDictionary {
    welcome: string;
    tagline: string;
    subGreeting: string;
    nextPrayer: string;
    todayAmal: string;
    activeJourney: string;
    calmMuhasabah: string;
    askAmal: string;
    askSubtitle: string;
    learnTab: string;
    amalTab: string;
    meTab: string;
    todayTab: string;
    offlineNotice: string;
    privacyAssured: string;
    scholarEscalationTitle: string;
    scholarEscalationDesc: string;
    citationsVerified: string;
    propheticEaseQuote: string;
    markDone: string;
    markPartial: string;
    snooze: string;
    skip: string;
}
export declare const Translations: Record<SupportedLanguage, TranslationDictionary>;
export declare function isRTL(lang: SupportedLanguage): boolean;
export declare function t(lang: SupportedLanguage, key: keyof TranslationDictionary): string;
//# sourceMappingURL=localization.d.ts.map