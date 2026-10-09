/**
 * AMAL SIRAH & SHAMA'IL KNOWLEDGE FACTORY
 * Entity Resolution Service: Disambiguation of People, Companions, Clans & Geographic Places
 */

export interface CanonicalPersonEntity {
  id: string;
  canonicalName: string;
  arabicName: string;
  kunyah?: string;
  laqab?: string;
  aliases: string[];
  role: 'PROPHET' | 'COMPANION' | 'FAMILY_MEMBER' | 'HISTORICAL_ACTOR';
}

export interface CanonicalPlaceEntity {
  id: string;
  canonicalName: string;
  arabicName: string;
  modernName?: string;
  placeType: 'CITY' | 'MOUNTAIN' | 'VALLEY' | 'WELL' | 'MOSQUE' | 'BATTLEFIELD' | 'REGION';
  coordinates?: { lat: number; lng: number };
  identificationCertainty: 'ESTABLISHED' | 'TRADITIONALLY_IDENTIFIED' | 'PROBABLE' | 'DISPUTED';
}

export class SirahEntityResolutionService {
  private readonly people: Map<string, CanonicalPersonEntity> = new Map();
  private readonly places: Map<string, CanonicalPlaceEntity> = new Map();

  constructor() {
    this.seedCanonicalEntities();
  }

  private seedCanonicalEntities(): void {
    const peopleList: CanonicalPersonEntity[] = [
      {
        id: 'PERSON-ABU-BAKR',
        canonicalName: 'Abu Bakr al-Siddiq',
        arabicName: 'أبو بكر الصديق رضي الله عنه',
        kunyah: 'Abu Bakr',
        laqab: 'Al-Siddiq, Al-Atiq',
        aliases: ['Abdullah ibn Abi Quhafah', 'Abu Bakr', 'Al-Siddiq'],
        role: 'COMPANION',
      },
      {
        id: 'PERSON-UMAR',
        canonicalName: 'Umar ibn al-Khattab',
        arabicName: 'عمر بن الخطاب رضي الله عنه',
        kunyah: 'Abu Hafs',
        laqab: 'Al-Faruq',
        aliases: ['Umar', 'Ibn al-Khattab', 'Al-Faruq'],
        role: 'COMPANION',
      },
      {
        id: 'PERSON-ALI',
        canonicalName: 'Ali ibn Abi Talib',
        arabicName: 'علي بن أبي طالب رضي الله عنه وكرم الله وجهه',
        kunyah: 'Abu al-Hasan, Abu Turab',
        laqab: 'Asad Allah',
        aliases: ['Ali', 'Ibn Abi Talib', 'Abu Turab'],
        role: 'COMPANION',
      },
      {
        id: 'PERSON-KHADIJAH',
        canonicalName: 'Khadijah bint Khuwaylid',
        arabicName: 'خديجة بنت خويلد رضي الله عنها',
        kunyah: 'Umm al-Qasim',
        laqab: 'Al-Tahirah',
        aliases: ['Khadijah', 'Umm al-Mu minin'],
        role: 'FAMILY_MEMBER',
      },
    ];

    for (const p of peopleList) {
      this.people.set(p.id, p);
    }

    const placeList: CanonicalPlaceEntity[] = [
      {
        id: 'PLACE-MAKKAH',
        canonicalName: 'Makkah al-Mukarramah',
        arabicName: 'مكة المكرمة',
        modernName: 'Mecca, KSA',
        placeType: 'CITY',
        coordinates: { lat: 21.4225, lng: 39.8262 },
        identificationCertainty: 'ESTABLISHED',
      },
      {
        id: 'PLACE-MADINAH',
        canonicalName: 'Al-Madinah al-Munawwarah',
        arabicName: 'المدينة المنورة',
        modernName: 'Medina, KSA',
        placeType: 'CITY',
        coordinates: { lat: 24.4672, lng: 39.6111 },
        identificationCertainty: 'ESTABLISHED',
      },
      {
        id: 'PLACE-HIRA',
        canonicalName: 'Cave of Hira',
        arabicName: 'غار حراء (جبل النور)',
        modernName: 'Jabal al-Nur, Makkah',
        placeType: 'MOUNTAIN',
        coordinates: { lat: 21.4578, lng: 39.8592 },
        identificationCertainty: 'ESTABLISHED',
      },
      {
        id: 'PLACE-THAWUR',
        canonicalName: 'Cave of Thawr',
        arabicName: 'غار ثور',
        modernName: 'Jabal Thawr, Makkah',
        placeType: 'MOUNTAIN',
        coordinates: { lat: 21.3781, lng: 39.8497 },
        identificationCertainty: 'ESTABLISHED',
      },
      {
        id: 'PLACE-BADR',
        canonicalName: 'Wells of Badr',
        arabicName: 'آبار بدر',
        modernName: 'Badr Governorate, Medina Province',
        placeType: 'BATTLEFIELD',
        coordinates: { lat: 23.7833, lng: 38.7833 },
        identificationCertainty: 'ESTABLISHED',
      },
    ];

    for (const pl of placeList) {
      this.places.set(pl.id, pl);
    }
  }

  /**
   * Resolves a raw string mention to a canonical person record using alias and Arabic pattern matching.
   */
  public resolvePerson(rawMention: string): CanonicalPersonEntity | null {
    const normalized = rawMention.toLowerCase().trim();
    for (const p of this.people.values()) {
      if (p.canonicalName.toLowerCase() === normalized) return p;
      if (p.aliases.some((a) => a.toLowerCase() === normalized)) return p;
      if (p.arabicName && p.arabicName.includes(rawMention.trim())) return p;
    }
    return null;
  }

  /**
   * Resolves a raw place mention to a canonical geographic entity.
   */
  public resolvePlace(rawMention: string): CanonicalPlaceEntity | null {
    const normalized = rawMention.toLowerCase().trim();
    for (const pl of this.places.values()) {
      if (pl.canonicalName.toLowerCase().includes(normalized)) return pl;
      if (pl.modernName && pl.modernName.toLowerCase().includes(normalized)) return pl;
    }
    return null;
  }
}
