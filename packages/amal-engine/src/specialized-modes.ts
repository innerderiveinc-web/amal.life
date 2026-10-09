/**
 * AMAL OS — V2.0: SPECIALIZED MODES (RAMADAN OS, HAJJ/UMRAH, TRAVEL)
 * Sections 13, 14, 15: Purpose-built spiritual operating modes.
 * Strictly adheres to canonical fiqh standards and verified sources.
 */

import {
  RamadanModeConfig,
  HajjUmrahModeConfig,
  TravelModeConfig,
} from '@amal/types';

export class SpecializedModesEngine {
  private static ramadanConfigs = new Map<string, RamadanModeConfig>();
  private static hajjConfigs = new Map<string, HajjUmrahModeConfig>();
  private static travelConfigs = new Map<string, TravelModeConfig>();

  // ---------------------------------------------------------
  // 1. RAMADAN OS (Section 13)
  // ---------------------------------------------------------
  public static getRamadanConfig(userId: string): RamadanModeConfig {
    const existing = this.ramadanConfigs.get(userId);
    if (existing) return existing;

    const defaultConfig: RamadanModeConfig = {
      userId,
      active: true,
      hijriYear: 1448,
      taraweehTargetRakat: 8,
      quranKhatmTarget: 'ONE_KHATM',
      dailyReadingMinutes: 30,
      suhoorWakeupMinutesBeforeFajr: 45,
      charityGoalCents: 10000,
      familyIftarCoordination: true,
      itikaafIntention: false,
    };
    this.ramadanConfigs.set(userId, defaultConfig);
    return defaultConfig;
  }

  public static updateRamadanConfig(userId: string, updates: Partial<RamadanModeConfig>): RamadanModeConfig {
    const current = this.getRamadanConfig(userId);
    const updated = { ...current, ...updates };
    this.ramadanConfigs.set(userId, updated);
    return updated;
  }

  // ---------------------------------------------------------
  // 2. HAJJ & UMRAH MODE (Section 14)
  // ---------------------------------------------------------
  public static getHajjUmrahConfig(userId: string): HajjUmrahModeConfig {
    const existing = this.hajjConfigs.get(userId);
    if (existing) return existing;

    const defaultConfig: HajjUmrahModeConfig = {
      userId,
      active: true,
      journeyType: 'HAJJ_TAMATTU',
      departureDate: '2027-05-15',
      returnDate: '2027-06-05',
      completedChecklistIds: ['passport_valid', 'meningitis_vaccine', 'ihram_garments'],
      emergencyContact: '+966-50-000-0000',
      documentsVerified: true,
      dailyDuasPacingDay: 1,
    };
    this.hajjConfigs.set(userId, defaultConfig);
    return defaultConfig;
  }

  public static updateHajjUmrahConfig(userId: string, updates: Partial<HajjUmrahModeConfig>): HajjUmrahModeConfig {
    const current = this.getHajjUmrahConfig(userId);
    const updated = { ...current, ...updates };
    this.hajjConfigs.set(userId, updated);
    return updated;
  }

  // ---------------------------------------------------------
  // 3. TRAVEL MODE (Section 15)
  // ---------------------------------------------------------
  public static evaluateTravelEligibility(distanceKm: number): {
    qasrEligible: boolean;
    jamEligible: boolean;
    canonicalEvidence: string;
  } {
    // Safar distance in classical relied-upon fiqh is approx 80-88 km (48 miles)
    const isSafar = distanceKm >= 80;
    return {
      qasrEligible: isSafar,
      jamEligible: isSafar,
      canonicalEvidence: 'Sahih al-Bukhari 1086; Sahih Muslim 685 (Shortening prayers during journey of 48+ miles)',
    };
  }

  public static getTravelConfig(userId: string): TravelModeConfig {
    const existing = this.travelConfigs.get(userId);
    if (existing) return existing;

    const defaultConfig: TravelModeConfig = {
      userId,
      active: true,
      originTimezone: 'Asia/Kolkata',
      destinationTimezone: 'Asia/Riyadh',
      qasrPrayerEligible: true,
      jamPrayerEligible: true,
      itinerarySummary: 'Flight to Jeddah, onward travel to Makkah',
      offlinePackDownloaded: true,
    };
    this.travelConfigs.set(userId, defaultConfig);
    return defaultConfig;
  }

  public static updateTravelConfig(userId: string, updates: Partial<TravelModeConfig>): TravelModeConfig {
    const current = this.getTravelConfig(userId);
    const updated = { ...current, ...updates };
    this.travelConfigs.set(userId, updated);
    return updated;
  }
}
