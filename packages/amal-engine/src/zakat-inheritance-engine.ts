/**
 * AMAL OS — Zakat & Miras (Islamic Inheritance / Fara'id) Calculation Engine
 * 
 * Strict Jurisprudential Adherence:
 * - Zakat: Classical Madhhab rules on Nisab (Gold 87.48g, Silver 612.36g), 2.5% Hawl rate,
 *   Zakatable vs Exempt wealth, business merchandise, and liabilities.
 * - Miras (Fara'id): Quranic fixed shares (Zawil-Furood - Surah An-Nisa 4:11-12, 4:176),
 *   Asabat (Residuaries), Hijab (blocking/exclusion rules), Awl (proportional reduction),
 *   and Radd (redistribution of surplus).
 */

export interface ZakatInput {
  currency: string;
  goldPricePerGram: number;     // Market price in selected currency
  silverPricePerGram: number;   // Market price in selected currency
  nisabStandard: 'SILVER' | 'GOLD'; // Silver standard is Hanafi preferred (anfa' lil-fuqara)
  madhhab: 'HANAFI' | 'SHAFI_I' | 'MALIKI' | 'HANBALI';
  
  // Assets
  cashInHandAndBanks: number;
  goldValueOrWeightGrams?: { grams?: number; value?: number };
  silverValueOrWeightGrams?: { grams?: number; value?: number };
  isPersonalWornJewelry?: boolean; // Hanafi taxes worn gold/silver; Jumhur exempts reasonable personal wear
  businessMerchandiseWholesale: number; // Inventory for resale
  tradeReceivablesAndLoansGiven: number; // Debts owed to user expected to be recovered
  sharesAndInvestments: number; // Liquid assets or market value of trading shares
  
  // Deductibles
  immediateDebtsDue: number; // Short-term debts payable within current lunar cycle
  pendingEssentialBills: number;
}

export interface DetailedZakatCalculationResult {
  currency: string;
  nisabValue: number;
  nisabBasisUsed: 'SILVER' | 'GOLD';
  totalZakatableAssets: number;
  totalDeductibleLiabilities: number;
  netZakatablePool: number;
  isEligibleForZakat: boolean;
  zakatDue: number; // 2.5% of netZakatablePool if >= nisabValue
  madhhabNotes: string[];
  breakdown: {
    cash: number;
    gold: number;
    silver: number;
    businessMerchandise: number;
    receivables: number;
    investments: number;
    totalGross: number;
    totalDeductions: number;
  };
}

export interface InheritanceInput {
  estateValue: number;
  currency: string;
  deceasedGender: 'MALE' | 'FEMALE';
  heirs: {
    husband?: boolean;
    wivesCount?: number; // 0 to 4
    sonsCount?: number;
    daughtersCount?: number;
    father?: boolean;
    mother?: boolean;
    paternalGrandfather?: boolean;
    paternalGrandmother?: boolean;
    maternalGrandmother?: boolean;
    fullBrothersCount?: number;
    fullSistersCount?: number;
  };
}

export interface HeirShare {
  heirName: string;
  count: number;
  quranicFraction: string;
  percentage: number;
  totalAmount: number;
  individualAmount: number;
  shareType: 'ZAWIL_FUROOD' | 'ASABAH' | 'AWL_ADJUSTED' | 'RADD_ADJUSTED';
  basisQuranVerse: string;
}

export interface InheritanceCalculationResult {
  totalEstate: number;
  currency: string;
  isAwlApplied: boolean;
  isRaddApplied: boolean;
  sumOfFractions: number;
  heirsShares: HeirShare[];
  surplusOrDeficitNote?: string;
}

export class ZakatInheritanceEngine {
  // Gold nisab: 20 Mithqals = 87.48 grams
  public static readonly GOLD_NISAB_GRAMS = 87.48;
  // Silver nisab: 200 Dirhams = 612.36 grams
  public static readonly SILVER_NISAB_GRAMS = 612.36;

  /**
   * Computes Zakat eligibility and exact amount based on authentic classical rulings
   */
  public calculateZakat(input: ZakatInput): DetailedZakatCalculationResult {
    const goldNisabValue = ZakatInheritanceEngine.GOLD_NISAB_GRAMS * input.goldPricePerGram;
    const silverNisabValue = ZakatInheritanceEngine.SILVER_NISAB_GRAMS * input.silverPricePerGram;
    
    const nisabValue = input.nisabStandard === 'GOLD' ? goldNisabValue : silverNisabValue;
    const madhhabNotes: string[] = [];

    // 1. Calculate Gold Asset Value
    let goldValue = 0;
    if (input.goldValueOrWeightGrams) {
      if (input.goldValueOrWeightGrams.value !== undefined) {
        goldValue = input.goldValueOrWeightGrams.value;
      } else if (input.goldValueOrWeightGrams.grams !== undefined) {
        goldValue = input.goldValueOrWeightGrams.grams * input.goldPricePerGram;
      }
    }

    // Check personal worn jewelry exemption for non-Hanafis
    if (input.isPersonalWornJewelry && input.madhhab !== 'HANAFI') {
      madhhabNotes.push(
        `According to the Jumhur (Shafi'i, Maliki, Hanbali), lawful personal women's jewelry intended for permissible adornment without extravagance is exempt from Zakat. Gold value excluded.`
      );
      goldValue = 0;
    } else if (input.isPersonalWornJewelry && input.madhhab === 'HANAFI') {
      madhhabNotes.push(
        `According to the Hanafi Madhhab, all gold and silver in possession (including personal jewelry) is zakatable subject to reaching Nisab.`
      );
    }

    // 2. Calculate Silver Asset Value
    let silverValue = 0;
    if (input.silverValueOrWeightGrams) {
      if (input.silverValueOrWeightGrams.value !== undefined) {
        silverValue = input.silverValueOrWeightGrams.value;
      } else if (input.silverValueOrWeightGrams.grams !== undefined) {
        silverValue = input.silverValueOrWeightGrams.grams * input.silverPricePerGram;
      }
    }

    const cash = Math.max(0, input.cashInHandAndBanks || 0);
    const business = Math.max(0, input.businessMerchandiseWholesale || 0);
    const receivables = Math.max(0, input.tradeReceivablesAndLoansGiven || 0);
    const investments = Math.max(0, input.sharesAndInvestments || 0);

    const totalGross = cash + goldValue + silverValue + business + receivables + investments;
    const totalDeductions = Math.max(0, input.immediateDebtsDue || 0) + Math.max(0, input.pendingEssentialBills || 0);
    const netZakatablePool = Math.max(0, totalGross - totalDeductions);

    const isEligibleForZakat = netZakatablePool >= nisabValue;
    const zakatDue = isEligibleForZakat ? Math.round((netZakatablePool * 0.025) * 100) / 100 : 0;

    if (input.nisabStandard === 'SILVER') {
      madhhabNotes.push(
        `Silver standard used (${ZakatInheritanceEngine.SILVER_NISAB_GRAMS}g = ${nisabValue.toFixed(2)} ${input.currency}), which is the traditional recommendation for maximum benefit to the poor (anfa' lil-fuqara).`
      );
    } else {
      madhhabNotes.push(
        `Gold standard used (${ZakatInheritanceEngine.GOLD_NISAB_GRAMS}g = ${nisabValue.toFixed(2)} ${input.currency}).`
      );
    }

    return {
      currency: input.currency,
      nisabValue: Math.round(nisabValue * 100) / 100,
      nisabBasisUsed: input.nisabStandard,
      totalZakatableAssets: Math.round(totalGross * 100) / 100,
      totalDeductibleLiabilities: Math.round(totalDeductions * 100) / 100,
      netZakatablePool: Math.round(netZakatablePool * 100) / 100,
      isEligibleForZakat,
      zakatDue,
      madhhabNotes,
      breakdown: {
        cash,
        gold: Math.round(goldValue * 100) / 100,
        silver: Math.round(silverValue * 100) / 100,
        businessMerchandise: business,
        receivables,
        investments,
        totalGross: Math.round(totalGross * 100) / 100,
        totalDeductions: Math.round(totalDeductions * 100) / 100,
      },
    };
  }

  /**
   * Computes Islamic inheritance distribution (Miras / Fara'id)
   * Handles Quranic fixed sharers (Zawil-Furood), Residuaries (Asabat), Hijab, Awl, and Radd.
   */
  public calculateInheritance(input: InheritanceInput): InheritanceCalculationResult {
    const heirs = input.heirs;
    const totalEstate = input.estateValue;
    const hasChildren = (heirs.sonsCount || 0) > 0 || (heirs.daughtersCount || 0) > 0;
    const sons = heirs.sonsCount || 0;
    const daughters = heirs.daughtersCount || 0;
    const fullBrothers = heirs.fullBrothersCount || 0;
    const fullSisters = heirs.fullSistersCount || 0;

    interface RawShare {
      name: string;
      count: number;
      fractionNumerator: number;
      fractionDenominator: number;
      isAsabah?: boolean;
      verse: string;
    }

    const rawShares: RawShare[] = [];

    // 1. Spousal Share
    if (input.deceasedGender === 'FEMALE' && heirs.husband) {
      if (hasChildren) {
        rawShares.push({ name: 'Husband (Zawj)', count: 1, fractionNumerator: 1, fractionDenominator: 4, verse: 'Surah An-Nisa 4:12' });
      } else {
        rawShares.push({ name: 'Husband (Zawj)', count: 1, fractionNumerator: 1, fractionDenominator: 2, verse: 'Surah An-Nisa 4:12' });
      }
    } else if (input.deceasedGender === 'MALE' && (heirs.wivesCount || 0) > 0) {
      const count = heirs.wivesCount || 1;
      if (hasChildren) {
        rawShares.push({ name: 'Wife/Wives (Zawjah)', count, fractionNumerator: 1, fractionDenominator: 8, verse: 'Surah An-Nisa 4:12' });
      } else {
        rawShares.push({ name: 'Wife/Wives (Zawjah)', count, fractionNumerator: 1, fractionDenominator: 4, verse: 'Surah An-Nisa 4:12' });
      }
    }

    // 2. Mother's Share
    if (heirs.mother) {
      const hasSiblings = (fullBrothers + fullSisters) >= 2;
      if (hasChildren || hasSiblings) {
        rawShares.push({ name: 'Mother (Umm)', count: 1, fractionNumerator: 1, fractionDenominator: 6, verse: 'Surah An-Nisa 4:11' });
      } else {
        rawShares.push({ name: 'Mother (Umm)', count: 1, fractionNumerator: 1, fractionDenominator: 3, verse: 'Surah An-Nisa 4:11' });
      }
    }

    // 3. Father's Share
    if (heirs.father) {
      if (sons > 0) {
        rawShares.push({ name: 'Father (Ab)', count: 1, fractionNumerator: 1, fractionDenominator: 6, verse: 'Surah An-Nisa 4:11' });
      } else if (daughters > 0) {
        // 1/6 fixed plus Asabah for any remainder
        rawShares.push({ name: 'Father (Ab - Fardh)', count: 1, fractionNumerator: 1, fractionDenominator: 6, verse: 'Surah An-Nisa 4:11' });
      } else {
        // Pure Asabah if no children
        rawShares.push({ name: 'Father (Ab - Asabah)', count: 1, fractionNumerator: 0, fractionDenominator: 1, isAsabah: true, verse: 'Surah An-Nisa 4:11' });
      }
    }

    // 4. Children
    if (sons > 0) {
      // Sons make daughters Asabah bil-Ghayr (2:1 ratio)
      rawShares.push({
        name: `Children (Asabah: ${sons} Son(s), ${daughters} Daughter(s))`,
        count: sons + daughters,
        fractionNumerator: 0,
        fractionDenominator: 1,
        isAsabah: true,
        verse: 'Surah An-Nisa 4:11 (li al-dhakari mithlu hazz al-unthayayn)',
      });
    } else if (daughters > 0) {
      // Only daughters, fixed Quranic shares
      if (daughters === 1) {
        rawShares.push({ name: 'Daughter (Bint)', count: 1, fractionNumerator: 1, fractionDenominator: 2, verse: 'Surah An-Nisa 4:11' });
      } else {
        rawShares.push({ name: `Daughters (Banat)`, count: daughters, fractionNumerator: 2, fractionDenominator: 3, verse: 'Surah An-Nisa 4:11' });
      }
    }

    // 5. Siblings (Excluded/Hijab if Father or Son exists)
    if (!heirs.father && sons === 0 && (fullBrothers > 0 || fullSisters > 0)) {
      if (fullBrothers > 0) {
        rawShares.push({
          name: `Siblings (Asabah: ${fullBrothers} Brother(s), ${fullSisters} Sister(s))`,
          count: fullBrothers + fullSisters,
          fractionNumerator: 0,
          fractionDenominator: 1,
          isAsabah: true,
          verse: 'Surah An-Nisa 4:176',
        });
      } else if (fullSisters > 0) {
        if (fullSisters === 1) {
          rawShares.push({ name: 'Full Sister (Ukht Shaqiqah)', count: 1, fractionNumerator: 1, fractionDenominator: 2, verse: 'Surah An-Nisa 4:176' });
        } else {
          rawShares.push({ name: 'Full Sisters (Akhawat Shaqiqat)', count: fullSisters, fractionNumerator: 2, fractionDenominator: 3, verse: 'Surah An-Nisa 4:176' });
        }
      }
    }

    // Calculate sum of fixed Quranic shares
    const fixedShares = rawShares.filter(s => !s.isAsabah);
    const asabahShares = rawShares.filter(s => s.isAsabah);

    let sumFixedFractions = fixedShares.reduce((acc, s) => acc + (s.fractionNumerator / s.fractionDenominator), 0);

    const heirsShares: HeirShare[] = [];
    let isAwlApplied = false;
    let isRaddApplied = false;

    if (sumFixedFractions > 1) {
      // Case of Awl (Proportional reduction)
      isAwlApplied = true;
      for (const s of fixedShares) {
        const adjustedProportion = (s.fractionNumerator / s.fractionDenominator) / sumFixedFractions;
        const totalAmount = Math.round(totalEstate * adjustedProportion * 100) / 100;
        heirsShares.push({
          heirName: s.name,
          count: s.count,
          quranicFraction: `${s.fractionNumerator}/${s.fractionDenominator}`,
          percentage: Math.round(adjustedProportion * 10000) / 100,
          totalAmount,
          individualAmount: Math.round((totalAmount / s.count) * 100) / 100,
          shareType: 'AWL_ADJUSTED',
          basisQuranVerse: s.verse,
        });
      }
    } else if (asabahShares.length > 0) {
      // Distribute fixed shares first, remainder goes to Asabat
      for (const s of fixedShares) {
        const frac = s.fractionNumerator / s.fractionDenominator;
        const totalAmount = Math.round(totalEstate * frac * 100) / 100;
        heirsShares.push({
          heirName: s.name,
          count: s.count,
          quranicFraction: `${s.fractionNumerator}/${s.fractionDenominator}`,
          percentage: Math.round(frac * 10000) / 100,
          totalAmount,
          individualAmount: Math.round((totalAmount / s.count) * 100) / 100,
          shareType: 'ZAWIL_FUROOD',
          basisQuranVerse: s.verse,
        });
      }

      const remainderFraction = Math.max(0, 1 - sumFixedFractions);
      const remainderAmount = Math.round(totalEstate * remainderFraction * 100) / 100;

      for (const s of asabahShares) {
        if (s.name.includes('Son(s)')) {
          // Male gets 2 shares, female gets 1
          const totalUnits = sons * 2 + daughters;
          const unitValue = remainderAmount / totalUnits;
          const sonsTotal = Math.round(unitValue * (sons * 2) * 100) / 100;
          const daughtersTotal = Math.round(unitValue * daughters * 100) / 100;

          if (sons > 0) {
            heirsShares.push({
              heirName: `Sons (${sons})`,
              count: sons,
              quranicFraction: `Remainder (2 parts each)`,
              percentage: Math.round((sonsTotal / totalEstate) * 10000) / 100,
              totalAmount: sonsTotal,
              individualAmount: Math.round((sonsTotal / sons) * 100) / 100,
              shareType: 'ASABAH',
              basisQuranVerse: s.verse,
            });
          }
          if (daughters > 0) {
            heirsShares.push({
              heirName: `Daughters (${daughters})`,
              count: daughters,
              quranicFraction: `Remainder (1 part each)`,
              percentage: Math.round((daughtersTotal / totalEstate) * 10000) / 100,
              totalAmount: daughtersTotal,
              individualAmount: Math.round((daughtersTotal / daughters) * 100) / 100,
              shareType: 'ASABAH',
              basisQuranVerse: s.verse,
            });
          }
        } else {
          heirsShares.push({
            heirName: s.name,
            count: s.count,
            quranicFraction: `Remainder (${(remainderFraction * 100).toFixed(1)}%)`,
            percentage: Math.round(remainderFraction * 10000) / 100,
            totalAmount: remainderAmount,
            individualAmount: Math.round((remainderAmount / s.count) * 100) / 100,
            shareType: 'ASABAH',
            basisQuranVerse: s.verse,
          });
        }
      }
    } else if (sumFixedFractions < 1) {
      // Case of Radd (Return surplus to non-spouse sharers)
      isRaddApplied = true;
      const nonSpouseShares = fixedShares.filter(s => !s.name.includes('Husband') && !s.name.includes('Wife'));
      const spouseShares = fixedShares.filter(s => s.name.includes('Husband') || s.name.includes('Wife'));

      // Spouses get fixed share without Radd according to classical consensus
      let remainingEstateForRadd = totalEstate;
      for (const s of spouseShares) {
        const frac = s.fractionNumerator / s.fractionDenominator;
        const totalAmount = Math.round(totalEstate * frac * 100) / 100;
        remainingEstateForRadd -= totalAmount;
        heirsShares.push({
          heirName: s.name,
          count: s.count,
          quranicFraction: `${s.fractionNumerator}/${s.fractionDenominator}`,
          percentage: Math.round(frac * 10000) / 100,
          totalAmount,
          individualAmount: Math.round((totalAmount / s.count) * 100) / 100,
          shareType: 'ZAWIL_FUROOD',
          basisQuranVerse: s.verse,
        });
      }

      const sumNonSpouseFractions = nonSpouseShares.reduce((acc, s) => acc + (s.fractionNumerator / s.fractionDenominator), 0);
      for (const s of nonSpouseShares) {
        const proportionOfRadd = (s.fractionNumerator / s.fractionDenominator) / sumNonSpouseFractions;
        const totalAmount = Math.round(remainingEstateForRadd * proportionOfRadd * 100) / 100;
        heirsShares.push({
          heirName: s.name,
          count: s.count,
          quranicFraction: `${s.fractionNumerator}/${s.fractionDenominator} (+ Radd)`,
          percentage: Math.round((totalAmount / totalEstate) * 10000) / 100,
          totalAmount,
          individualAmount: Math.round((totalAmount / s.count) * 100) / 100,
          shareType: 'RADD_ADJUSTED',
          basisQuranVerse: s.verse,
        });
      }
    } else {
      // Exactly 1.0 (Neither Awl nor Radd)
      for (const s of fixedShares) {
        const frac = s.fractionNumerator / s.fractionDenominator;
        const totalAmount = Math.round(totalEstate * frac * 100) / 100;
        heirsShares.push({
          heirName: s.name,
          count: s.count,
          quranicFraction: `${s.fractionNumerator}/${s.fractionDenominator}`,
          percentage: Math.round(frac * 10000) / 100,
          totalAmount,
          individualAmount: Math.round((totalAmount / s.count) * 100) / 100,
          shareType: 'ZAWIL_FUROOD',
          basisQuranVerse: s.verse,
        });
      }
    }

    return {
      totalEstate,
      currency: input.currency,
      isAwlApplied,
      isRaddApplied,
      sumOfFractions: Math.round(sumFixedFractions * 1000) / 1000,
      heirsShares,
      surplusOrDeficitNote: isAwlApplied 
        ? 'Awl applied: Total Quranic shares exceeded 100%, each share reduced proportionally according to classical Islamic law.'
        : isRaddApplied
        ? 'Radd applied: Surplus returned proportionately to non-spouse Quranic sharers.'
        : undefined,
    };
  }
}

export const zakatInheritanceEngine = new ZakatInheritanceEngine();
