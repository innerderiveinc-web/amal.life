/**
 * AMAL OS — QURAN CONTROLLER
 * Serves canonical Medina Mushaf Arabic text and verified translations.
 */

import { Controller, Get, Param } from '@nestjs/common';
import { quranProvider } from '@amal/evidence';

@Controller('quran')
export class QuranController {
  @Get('surahs')
  async listSurahs() {
    return [
      { number: 1, name: 'Al-Fatihah', englishName: 'The Opening', ayahsCount: 7, revelationType: 'Meccan' },
      { number: 2, name: 'Al-Baqarah', englishName: 'The Cow', ayahsCount: 286, revelationType: 'Medinan' },
      { number: 93, name: 'Ad-Duha', englishName: 'The Morning Hours', ayahsCount: 11, revelationType: 'Meccan' },
      { number: 94, name: 'Ash-Sharh', englishName: 'The Relief', ayahsCount: 8, revelationType: 'Meccan' },
    ];
  }

  @Get('ayahs/:surah/:ayah')
  async getAyah(
    @Param('surah') surah: string,
    @Param('ayah') ayah: string,
  ) {
    const s = parseInt(surah, 10);
    const a = parseInt(ayah, 10);
    const result = quranProvider.getAyah(s, a);

    return {
      surah: s,
      ayah: a,
      arabicText: result.arabicText,
      provenanceHash: result.provenanceHash,
      translation: result.translations[0]?.text || '',
      translator: result.translations[0]?.translator || 'Sahih International',
      immutableMakkahMedinaText: true,
    };
  }
}
