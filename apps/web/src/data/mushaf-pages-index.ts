/**
 * AMAL OS — Official 604-Page Madani Mushaf Canonical Index
 * Sourced according to the King Fahd Quran Printing Complex (KFGQPC) standard.
 * 
 * Provides instantaneous O(1) page-to-ayah lookups, Juz boundaries, and Surah demarcations
 * completely offline with zero network latency.
 */

export interface MushafVerseRef {
  surah: number;
  ayah: number;
}

export interface MushafPageMeta {
  page: number; // 1 to 604
  juz: number;  // 1 to 30
  hizb: number; // 1 to 60
  rub: number;  // 1 to 240
  surahs: number[];
  startSurah: number;
  startAyah: number;
  endSurah: number;
  endAyah: number;
  verses: MushafVerseRef[];
}

export const MUSHAF_604_PAGES: MushafPageMeta[] = [
  {
    "page": 1,
    "juz": 1,
    "hizb": 1,
    "rub": 1,
    "surahs": [
      1
    ],
    "startSurah": 1,
    "startAyah": 1,
    "endSurah": 1,
    "endAyah": 7,
    "verses": [
      {
        "surah": 1,
        "ayah": 1
      },
      {
        "surah": 1,
        "ayah": 2
      },
      {
        "surah": 1,
        "ayah": 3
      },
      {
        "surah": 1,
        "ayah": 4
      },
      {
        "surah": 1,
        "ayah": 5
      },
      {
        "surah": 1,
        "ayah": 6
      },
      {
        "surah": 1,
        "ayah": 7
      }
    ]
  },
  {
    "page": 2,
    "juz": 1,
    "hizb": 1,
    "rub": 1,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 1,
    "endSurah": 2,
    "endAyah": 5,
    "verses": [
      {
        "surah": 2,
        "ayah": 1
      },
      {
        "surah": 2,
        "ayah": 2
      },
      {
        "surah": 2,
        "ayah": 3
      },
      {
        "surah": 2,
        "ayah": 4
      },
      {
        "surah": 2,
        "ayah": 5
      }
    ]
  },
  {
    "page": 3,
    "juz": 1,
    "hizb": 1,
    "rub": 1,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 6,
    "endSurah": 2,
    "endAyah": 16,
    "verses": [
      {
        "surah": 2,
        "ayah": 6
      },
      {
        "surah": 2,
        "ayah": 7
      },
      {
        "surah": 2,
        "ayah": 8
      },
      {
        "surah": 2,
        "ayah": 9
      },
      {
        "surah": 2,
        "ayah": 10
      },
      {
        "surah": 2,
        "ayah": 11
      },
      {
        "surah": 2,
        "ayah": 12
      },
      {
        "surah": 2,
        "ayah": 13
      },
      {
        "surah": 2,
        "ayah": 14
      },
      {
        "surah": 2,
        "ayah": 15
      },
      {
        "surah": 2,
        "ayah": 16
      }
    ]
  },
  {
    "page": 4,
    "juz": 1,
    "hizb": 1,
    "rub": 1,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 17,
    "endSurah": 2,
    "endAyah": 24,
    "verses": [
      {
        "surah": 2,
        "ayah": 17
      },
      {
        "surah": 2,
        "ayah": 18
      },
      {
        "surah": 2,
        "ayah": 19
      },
      {
        "surah": 2,
        "ayah": 20
      },
      {
        "surah": 2,
        "ayah": 21
      },
      {
        "surah": 2,
        "ayah": 22
      },
      {
        "surah": 2,
        "ayah": 23
      },
      {
        "surah": 2,
        "ayah": 24
      }
    ]
  },
  {
    "page": 5,
    "juz": 1,
    "hizb": 1,
    "rub": 1,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 25,
    "endSurah": 2,
    "endAyah": 29,
    "verses": [
      {
        "surah": 2,
        "ayah": 25
      },
      {
        "surah": 2,
        "ayah": 26
      },
      {
        "surah": 2,
        "ayah": 27
      },
      {
        "surah": 2,
        "ayah": 28
      },
      {
        "surah": 2,
        "ayah": 29
      }
    ]
  },
  {
    "page": 6,
    "juz": 1,
    "hizb": 1,
    "rub": 2,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 30,
    "endSurah": 2,
    "endAyah": 37,
    "verses": [
      {
        "surah": 2,
        "ayah": 30
      },
      {
        "surah": 2,
        "ayah": 31
      },
      {
        "surah": 2,
        "ayah": 32
      },
      {
        "surah": 2,
        "ayah": 33
      },
      {
        "surah": 2,
        "ayah": 34
      },
      {
        "surah": 2,
        "ayah": 35
      },
      {
        "surah": 2,
        "ayah": 36
      },
      {
        "surah": 2,
        "ayah": 37
      }
    ]
  },
  {
    "page": 7,
    "juz": 1,
    "hizb": 1,
    "rub": 2,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 38,
    "endSurah": 2,
    "endAyah": 48,
    "verses": [
      {
        "surah": 2,
        "ayah": 38
      },
      {
        "surah": 2,
        "ayah": 39
      },
      {
        "surah": 2,
        "ayah": 40
      },
      {
        "surah": 2,
        "ayah": 41
      },
      {
        "surah": 2,
        "ayah": 42
      },
      {
        "surah": 2,
        "ayah": 43
      },
      {
        "surah": 2,
        "ayah": 44
      },
      {
        "surah": 2,
        "ayah": 45
      },
      {
        "surah": 2,
        "ayah": 46
      },
      {
        "surah": 2,
        "ayah": 47
      },
      {
        "surah": 2,
        "ayah": 48
      }
    ]
  },
  {
    "page": 8,
    "juz": 1,
    "hizb": 1,
    "rub": 3,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 49,
    "endSurah": 2,
    "endAyah": 57,
    "verses": [
      {
        "surah": 2,
        "ayah": 49
      },
      {
        "surah": 2,
        "ayah": 50
      },
      {
        "surah": 2,
        "ayah": 51
      },
      {
        "surah": 2,
        "ayah": 52
      },
      {
        "surah": 2,
        "ayah": 53
      },
      {
        "surah": 2,
        "ayah": 54
      },
      {
        "surah": 2,
        "ayah": 55
      },
      {
        "surah": 2,
        "ayah": 56
      },
      {
        "surah": 2,
        "ayah": 57
      }
    ]
  },
  {
    "page": 9,
    "juz": 1,
    "hizb": 1,
    "rub": 3,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 58,
    "endSurah": 2,
    "endAyah": 61,
    "verses": [
      {
        "surah": 2,
        "ayah": 58
      },
      {
        "surah": 2,
        "ayah": 59
      },
      {
        "surah": 2,
        "ayah": 60
      },
      {
        "surah": 2,
        "ayah": 61
      }
    ]
  },
  {
    "page": 10,
    "juz": 1,
    "hizb": 1,
    "rub": 4,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 62,
    "endSurah": 2,
    "endAyah": 69,
    "verses": [
      {
        "surah": 2,
        "ayah": 62
      },
      {
        "surah": 2,
        "ayah": 63
      },
      {
        "surah": 2,
        "ayah": 64
      },
      {
        "surah": 2,
        "ayah": 65
      },
      {
        "surah": 2,
        "ayah": 66
      },
      {
        "surah": 2,
        "ayah": 67
      },
      {
        "surah": 2,
        "ayah": 68
      },
      {
        "surah": 2,
        "ayah": 69
      }
    ]
  },
  {
    "page": 11,
    "juz": 1,
    "hizb": 1,
    "rub": 4,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 70,
    "endSurah": 2,
    "endAyah": 76,
    "verses": [
      {
        "surah": 2,
        "ayah": 70
      },
      {
        "surah": 2,
        "ayah": 71
      },
      {
        "surah": 2,
        "ayah": 72
      },
      {
        "surah": 2,
        "ayah": 73
      },
      {
        "surah": 2,
        "ayah": 74
      },
      {
        "surah": 2,
        "ayah": 75
      },
      {
        "surah": 2,
        "ayah": 76
      }
    ]
  },
  {
    "page": 12,
    "juz": 1,
    "hizb": 2,
    "rub": 5,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 77,
    "endSurah": 2,
    "endAyah": 83,
    "verses": [
      {
        "surah": 2,
        "ayah": 77
      },
      {
        "surah": 2,
        "ayah": 78
      },
      {
        "surah": 2,
        "ayah": 79
      },
      {
        "surah": 2,
        "ayah": 80
      },
      {
        "surah": 2,
        "ayah": 81
      },
      {
        "surah": 2,
        "ayah": 82
      },
      {
        "surah": 2,
        "ayah": 83
      }
    ]
  },
  {
    "page": 13,
    "juz": 1,
    "hizb": 2,
    "rub": 5,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 84,
    "endSurah": 2,
    "endAyah": 88,
    "verses": [
      {
        "surah": 2,
        "ayah": 84
      },
      {
        "surah": 2,
        "ayah": 85
      },
      {
        "surah": 2,
        "ayah": 86
      },
      {
        "surah": 2,
        "ayah": 87
      },
      {
        "surah": 2,
        "ayah": 88
      }
    ]
  },
  {
    "page": 14,
    "juz": 1,
    "hizb": 2,
    "rub": 5,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 89,
    "endSurah": 2,
    "endAyah": 93,
    "verses": [
      {
        "surah": 2,
        "ayah": 89
      },
      {
        "surah": 2,
        "ayah": 90
      },
      {
        "surah": 2,
        "ayah": 91
      },
      {
        "surah": 2,
        "ayah": 92
      },
      {
        "surah": 2,
        "ayah": 93
      }
    ]
  },
  {
    "page": 15,
    "juz": 1,
    "hizb": 2,
    "rub": 6,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 94,
    "endSurah": 2,
    "endAyah": 101,
    "verses": [
      {
        "surah": 2,
        "ayah": 94
      },
      {
        "surah": 2,
        "ayah": 95
      },
      {
        "surah": 2,
        "ayah": 96
      },
      {
        "surah": 2,
        "ayah": 97
      },
      {
        "surah": 2,
        "ayah": 98
      },
      {
        "surah": 2,
        "ayah": 99
      },
      {
        "surah": 2,
        "ayah": 100
      },
      {
        "surah": 2,
        "ayah": 101
      }
    ]
  },
  {
    "page": 16,
    "juz": 1,
    "hizb": 2,
    "rub": 6,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 102,
    "endSurah": 2,
    "endAyah": 105,
    "verses": [
      {
        "surah": 2,
        "ayah": 102
      },
      {
        "surah": 2,
        "ayah": 103
      },
      {
        "surah": 2,
        "ayah": 104
      },
      {
        "surah": 2,
        "ayah": 105
      }
    ]
  },
  {
    "page": 17,
    "juz": 1,
    "hizb": 2,
    "rub": 7,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 106,
    "endSurah": 2,
    "endAyah": 112,
    "verses": [
      {
        "surah": 2,
        "ayah": 106
      },
      {
        "surah": 2,
        "ayah": 107
      },
      {
        "surah": 2,
        "ayah": 108
      },
      {
        "surah": 2,
        "ayah": 109
      },
      {
        "surah": 2,
        "ayah": 110
      },
      {
        "surah": 2,
        "ayah": 111
      },
      {
        "surah": 2,
        "ayah": 112
      }
    ]
  },
  {
    "page": 18,
    "juz": 1,
    "hizb": 2,
    "rub": 7,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 113,
    "endSurah": 2,
    "endAyah": 119,
    "verses": [
      {
        "surah": 2,
        "ayah": 113
      },
      {
        "surah": 2,
        "ayah": 114
      },
      {
        "surah": 2,
        "ayah": 115
      },
      {
        "surah": 2,
        "ayah": 116
      },
      {
        "surah": 2,
        "ayah": 117
      },
      {
        "surah": 2,
        "ayah": 118
      },
      {
        "surah": 2,
        "ayah": 119
      }
    ]
  },
  {
    "page": 19,
    "juz": 1,
    "hizb": 2,
    "rub": 7,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 120,
    "endSurah": 2,
    "endAyah": 126,
    "verses": [
      {
        "surah": 2,
        "ayah": 120
      },
      {
        "surah": 2,
        "ayah": 121
      },
      {
        "surah": 2,
        "ayah": 122
      },
      {
        "surah": 2,
        "ayah": 123
      },
      {
        "surah": 2,
        "ayah": 124
      },
      {
        "surah": 2,
        "ayah": 125
      },
      {
        "surah": 2,
        "ayah": 126
      }
    ]
  },
  {
    "page": 20,
    "juz": 1,
    "hizb": 2,
    "rub": 8,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 127,
    "endSurah": 2,
    "endAyah": 134,
    "verses": [
      {
        "surah": 2,
        "ayah": 127
      },
      {
        "surah": 2,
        "ayah": 128
      },
      {
        "surah": 2,
        "ayah": 129
      },
      {
        "surah": 2,
        "ayah": 130
      },
      {
        "surah": 2,
        "ayah": 131
      },
      {
        "surah": 2,
        "ayah": 132
      },
      {
        "surah": 2,
        "ayah": 133
      },
      {
        "surah": 2,
        "ayah": 134
      }
    ]
  },
  {
    "page": 21,
    "juz": 1,
    "hizb": 2,
    "rub": 8,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 135,
    "endSurah": 2,
    "endAyah": 141,
    "verses": [
      {
        "surah": 2,
        "ayah": 135
      },
      {
        "surah": 2,
        "ayah": 136
      },
      {
        "surah": 2,
        "ayah": 137
      },
      {
        "surah": 2,
        "ayah": 138
      },
      {
        "surah": 2,
        "ayah": 139
      },
      {
        "surah": 2,
        "ayah": 140
      },
      {
        "surah": 2,
        "ayah": 141
      }
    ]
  },
  {
    "page": 22,
    "juz": 2,
    "hizb": 3,
    "rub": 9,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 142,
    "endSurah": 2,
    "endAyah": 145,
    "verses": [
      {
        "surah": 2,
        "ayah": 142
      },
      {
        "surah": 2,
        "ayah": 143
      },
      {
        "surah": 2,
        "ayah": 144
      },
      {
        "surah": 2,
        "ayah": 145
      }
    ]
  },
  {
    "page": 23,
    "juz": 2,
    "hizb": 3,
    "rub": 9,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 146,
    "endSurah": 2,
    "endAyah": 153,
    "verses": [
      {
        "surah": 2,
        "ayah": 146
      },
      {
        "surah": 2,
        "ayah": 147
      },
      {
        "surah": 2,
        "ayah": 148
      },
      {
        "surah": 2,
        "ayah": 149
      },
      {
        "surah": 2,
        "ayah": 150
      },
      {
        "surah": 2,
        "ayah": 151
      },
      {
        "surah": 2,
        "ayah": 152
      },
      {
        "surah": 2,
        "ayah": 153
      }
    ]
  },
  {
    "page": 24,
    "juz": 2,
    "hizb": 3,
    "rub": 9,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 154,
    "endSurah": 2,
    "endAyah": 163,
    "verses": [
      {
        "surah": 2,
        "ayah": 154
      },
      {
        "surah": 2,
        "ayah": 155
      },
      {
        "surah": 2,
        "ayah": 156
      },
      {
        "surah": 2,
        "ayah": 157
      },
      {
        "surah": 2,
        "ayah": 158
      },
      {
        "surah": 2,
        "ayah": 159
      },
      {
        "surah": 2,
        "ayah": 160
      },
      {
        "surah": 2,
        "ayah": 161
      },
      {
        "surah": 2,
        "ayah": 162
      },
      {
        "surah": 2,
        "ayah": 163
      }
    ]
  },
  {
    "page": 25,
    "juz": 2,
    "hizb": 3,
    "rub": 10,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 164,
    "endSurah": 2,
    "endAyah": 169,
    "verses": [
      {
        "surah": 2,
        "ayah": 164
      },
      {
        "surah": 2,
        "ayah": 165
      },
      {
        "surah": 2,
        "ayah": 166
      },
      {
        "surah": 2,
        "ayah": 167
      },
      {
        "surah": 2,
        "ayah": 168
      },
      {
        "surah": 2,
        "ayah": 169
      }
    ]
  },
  {
    "page": 26,
    "juz": 2,
    "hizb": 3,
    "rub": 10,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 170,
    "endSurah": 2,
    "endAyah": 176,
    "verses": [
      {
        "surah": 2,
        "ayah": 170
      },
      {
        "surah": 2,
        "ayah": 171
      },
      {
        "surah": 2,
        "ayah": 172
      },
      {
        "surah": 2,
        "ayah": 173
      },
      {
        "surah": 2,
        "ayah": 174
      },
      {
        "surah": 2,
        "ayah": 175
      },
      {
        "surah": 2,
        "ayah": 176
      }
    ]
  },
  {
    "page": 27,
    "juz": 2,
    "hizb": 3,
    "rub": 11,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 177,
    "endSurah": 2,
    "endAyah": 181,
    "verses": [
      {
        "surah": 2,
        "ayah": 177
      },
      {
        "surah": 2,
        "ayah": 178
      },
      {
        "surah": 2,
        "ayah": 179
      },
      {
        "surah": 2,
        "ayah": 180
      },
      {
        "surah": 2,
        "ayah": 181
      }
    ]
  },
  {
    "page": 28,
    "juz": 2,
    "hizb": 3,
    "rub": 11,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 182,
    "endSurah": 2,
    "endAyah": 186,
    "verses": [
      {
        "surah": 2,
        "ayah": 182
      },
      {
        "surah": 2,
        "ayah": 183
      },
      {
        "surah": 2,
        "ayah": 184
      },
      {
        "surah": 2,
        "ayah": 185
      },
      {
        "surah": 2,
        "ayah": 186
      }
    ]
  },
  {
    "page": 29,
    "juz": 2,
    "hizb": 3,
    "rub": 11,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 187,
    "endSurah": 2,
    "endAyah": 190,
    "verses": [
      {
        "surah": 2,
        "ayah": 187
      },
      {
        "surah": 2,
        "ayah": 188
      },
      {
        "surah": 2,
        "ayah": 189
      },
      {
        "surah": 2,
        "ayah": 190
      }
    ]
  },
  {
    "page": 30,
    "juz": 2,
    "hizb": 3,
    "rub": 12,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 191,
    "endSurah": 2,
    "endAyah": 196,
    "verses": [
      {
        "surah": 2,
        "ayah": 191
      },
      {
        "surah": 2,
        "ayah": 192
      },
      {
        "surah": 2,
        "ayah": 193
      },
      {
        "surah": 2,
        "ayah": 194
      },
      {
        "surah": 2,
        "ayah": 195
      },
      {
        "surah": 2,
        "ayah": 196
      }
    ]
  },
  {
    "page": 31,
    "juz": 2,
    "hizb": 3,
    "rub": 12,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 197,
    "endSurah": 2,
    "endAyah": 202,
    "verses": [
      {
        "surah": 2,
        "ayah": 197
      },
      {
        "surah": 2,
        "ayah": 198
      },
      {
        "surah": 2,
        "ayah": 199
      },
      {
        "surah": 2,
        "ayah": 200
      },
      {
        "surah": 2,
        "ayah": 201
      },
      {
        "surah": 2,
        "ayah": 202
      }
    ]
  },
  {
    "page": 32,
    "juz": 2,
    "hizb": 4,
    "rub": 13,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 203,
    "endSurah": 2,
    "endAyah": 210,
    "verses": [
      {
        "surah": 2,
        "ayah": 203
      },
      {
        "surah": 2,
        "ayah": 204
      },
      {
        "surah": 2,
        "ayah": 205
      },
      {
        "surah": 2,
        "ayah": 206
      },
      {
        "surah": 2,
        "ayah": 207
      },
      {
        "surah": 2,
        "ayah": 208
      },
      {
        "surah": 2,
        "ayah": 209
      },
      {
        "surah": 2,
        "ayah": 210
      }
    ]
  },
  {
    "page": 33,
    "juz": 2,
    "hizb": 4,
    "rub": 13,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 211,
    "endSurah": 2,
    "endAyah": 215,
    "verses": [
      {
        "surah": 2,
        "ayah": 211
      },
      {
        "surah": 2,
        "ayah": 212
      },
      {
        "surah": 2,
        "ayah": 213
      },
      {
        "surah": 2,
        "ayah": 214
      },
      {
        "surah": 2,
        "ayah": 215
      }
    ]
  },
  {
    "page": 34,
    "juz": 2,
    "hizb": 4,
    "rub": 13,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 216,
    "endSurah": 2,
    "endAyah": 219,
    "verses": [
      {
        "surah": 2,
        "ayah": 216
      },
      {
        "surah": 2,
        "ayah": 217
      },
      {
        "surah": 2,
        "ayah": 218
      },
      {
        "surah": 2,
        "ayah": 219
      }
    ]
  },
  {
    "page": 35,
    "juz": 2,
    "hizb": 4,
    "rub": 14,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 220,
    "endSurah": 2,
    "endAyah": 224,
    "verses": [
      {
        "surah": 2,
        "ayah": 220
      },
      {
        "surah": 2,
        "ayah": 221
      },
      {
        "surah": 2,
        "ayah": 222
      },
      {
        "surah": 2,
        "ayah": 223
      },
      {
        "surah": 2,
        "ayah": 224
      }
    ]
  },
  {
    "page": 36,
    "juz": 2,
    "hizb": 4,
    "rub": 14,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 225,
    "endSurah": 2,
    "endAyah": 230,
    "verses": [
      {
        "surah": 2,
        "ayah": 225
      },
      {
        "surah": 2,
        "ayah": 226
      },
      {
        "surah": 2,
        "ayah": 227
      },
      {
        "surah": 2,
        "ayah": 228
      },
      {
        "surah": 2,
        "ayah": 229
      },
      {
        "surah": 2,
        "ayah": 230
      }
    ]
  },
  {
    "page": 37,
    "juz": 2,
    "hizb": 4,
    "rub": 14,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 231,
    "endSurah": 2,
    "endAyah": 233,
    "verses": [
      {
        "surah": 2,
        "ayah": 231
      },
      {
        "surah": 2,
        "ayah": 232
      },
      {
        "surah": 2,
        "ayah": 233
      }
    ]
  },
  {
    "page": 38,
    "juz": 2,
    "hizb": 4,
    "rub": 15,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 234,
    "endSurah": 2,
    "endAyah": 237,
    "verses": [
      {
        "surah": 2,
        "ayah": 234
      },
      {
        "surah": 2,
        "ayah": 235
      },
      {
        "surah": 2,
        "ayah": 236
      },
      {
        "surah": 2,
        "ayah": 237
      }
    ]
  },
  {
    "page": 39,
    "juz": 2,
    "hizb": 4,
    "rub": 15,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 238,
    "endSurah": 2,
    "endAyah": 245,
    "verses": [
      {
        "surah": 2,
        "ayah": 238
      },
      {
        "surah": 2,
        "ayah": 239
      },
      {
        "surah": 2,
        "ayah": 240
      },
      {
        "surah": 2,
        "ayah": 241
      },
      {
        "surah": 2,
        "ayah": 242
      },
      {
        "surah": 2,
        "ayah": 243
      },
      {
        "surah": 2,
        "ayah": 244
      },
      {
        "surah": 2,
        "ayah": 245
      }
    ]
  },
  {
    "page": 40,
    "juz": 2,
    "hizb": 4,
    "rub": 16,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 246,
    "endSurah": 2,
    "endAyah": 248,
    "verses": [
      {
        "surah": 2,
        "ayah": 246
      },
      {
        "surah": 2,
        "ayah": 247
      },
      {
        "surah": 2,
        "ayah": 248
      }
    ]
  },
  {
    "page": 41,
    "juz": 2,
    "hizb": 4,
    "rub": 16,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 249,
    "endSurah": 2,
    "endAyah": 252,
    "verses": [
      {
        "surah": 2,
        "ayah": 249
      },
      {
        "surah": 2,
        "ayah": 250
      },
      {
        "surah": 2,
        "ayah": 251
      },
      {
        "surah": 2,
        "ayah": 252
      }
    ]
  },
  {
    "page": 42,
    "juz": 3,
    "hizb": 5,
    "rub": 17,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 253,
    "endSurah": 2,
    "endAyah": 256,
    "verses": [
      {
        "surah": 2,
        "ayah": 253
      },
      {
        "surah": 2,
        "ayah": 254
      },
      {
        "surah": 2,
        "ayah": 255
      },
      {
        "surah": 2,
        "ayah": 256
      }
    ]
  },
  {
    "page": 43,
    "juz": 3,
    "hizb": 5,
    "rub": 17,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 257,
    "endSurah": 2,
    "endAyah": 259,
    "verses": [
      {
        "surah": 2,
        "ayah": 257
      },
      {
        "surah": 2,
        "ayah": 258
      },
      {
        "surah": 2,
        "ayah": 259
      }
    ]
  },
  {
    "page": 44,
    "juz": 3,
    "hizb": 5,
    "rub": 17,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 260,
    "endSurah": 2,
    "endAyah": 264,
    "verses": [
      {
        "surah": 2,
        "ayah": 260
      },
      {
        "surah": 2,
        "ayah": 261
      },
      {
        "surah": 2,
        "ayah": 262
      },
      {
        "surah": 2,
        "ayah": 263
      },
      {
        "surah": 2,
        "ayah": 264
      }
    ]
  },
  {
    "page": 45,
    "juz": 3,
    "hizb": 5,
    "rub": 18,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 265,
    "endSurah": 2,
    "endAyah": 269,
    "verses": [
      {
        "surah": 2,
        "ayah": 265
      },
      {
        "surah": 2,
        "ayah": 266
      },
      {
        "surah": 2,
        "ayah": 267
      },
      {
        "surah": 2,
        "ayah": 268
      },
      {
        "surah": 2,
        "ayah": 269
      }
    ]
  },
  {
    "page": 46,
    "juz": 3,
    "hizb": 5,
    "rub": 18,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 270,
    "endSurah": 2,
    "endAyah": 274,
    "verses": [
      {
        "surah": 2,
        "ayah": 270
      },
      {
        "surah": 2,
        "ayah": 271
      },
      {
        "surah": 2,
        "ayah": 272
      },
      {
        "surah": 2,
        "ayah": 273
      },
      {
        "surah": 2,
        "ayah": 274
      }
    ]
  },
  {
    "page": 47,
    "juz": 3,
    "hizb": 5,
    "rub": 19,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 275,
    "endSurah": 2,
    "endAyah": 281,
    "verses": [
      {
        "surah": 2,
        "ayah": 275
      },
      {
        "surah": 2,
        "ayah": 276
      },
      {
        "surah": 2,
        "ayah": 277
      },
      {
        "surah": 2,
        "ayah": 278
      },
      {
        "surah": 2,
        "ayah": 279
      },
      {
        "surah": 2,
        "ayah": 280
      },
      {
        "surah": 2,
        "ayah": 281
      }
    ]
  },
  {
    "page": 48,
    "juz": 3,
    "hizb": 5,
    "rub": 19,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 282,
    "endSurah": 2,
    "endAyah": 282,
    "verses": [
      {
        "surah": 2,
        "ayah": 282
      }
    ]
  },
  {
    "page": 49,
    "juz": 3,
    "hizb": 5,
    "rub": 20,
    "surahs": [
      2
    ],
    "startSurah": 2,
    "startAyah": 283,
    "endSurah": 2,
    "endAyah": 286,
    "verses": [
      {
        "surah": 2,
        "ayah": 283
      },
      {
        "surah": 2,
        "ayah": 284
      },
      {
        "surah": 2,
        "ayah": 285
      },
      {
        "surah": 2,
        "ayah": 286
      }
    ]
  },
  {
    "page": 50,
    "juz": 3,
    "hizb": 5,
    "rub": 20,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 1,
    "endSurah": 3,
    "endAyah": 9,
    "verses": [
      {
        "surah": 3,
        "ayah": 1
      },
      {
        "surah": 3,
        "ayah": 2
      },
      {
        "surah": 3,
        "ayah": 3
      },
      {
        "surah": 3,
        "ayah": 4
      },
      {
        "surah": 3,
        "ayah": 5
      },
      {
        "surah": 3,
        "ayah": 6
      },
      {
        "surah": 3,
        "ayah": 7
      },
      {
        "surah": 3,
        "ayah": 8
      },
      {
        "surah": 3,
        "ayah": 9
      }
    ]
  },
  {
    "page": 51,
    "juz": 3,
    "hizb": 5,
    "rub": 20,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 10,
    "endSurah": 3,
    "endAyah": 15,
    "verses": [
      {
        "surah": 3,
        "ayah": 10
      },
      {
        "surah": 3,
        "ayah": 11
      },
      {
        "surah": 3,
        "ayah": 12
      },
      {
        "surah": 3,
        "ayah": 13
      },
      {
        "surah": 3,
        "ayah": 14
      },
      {
        "surah": 3,
        "ayah": 15
      }
    ]
  },
  {
    "page": 52,
    "juz": 3,
    "hizb": 6,
    "rub": 21,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 16,
    "endSurah": 3,
    "endAyah": 22,
    "verses": [
      {
        "surah": 3,
        "ayah": 16
      },
      {
        "surah": 3,
        "ayah": 17
      },
      {
        "surah": 3,
        "ayah": 18
      },
      {
        "surah": 3,
        "ayah": 19
      },
      {
        "surah": 3,
        "ayah": 20
      },
      {
        "surah": 3,
        "ayah": 21
      },
      {
        "surah": 3,
        "ayah": 22
      }
    ]
  },
  {
    "page": 53,
    "juz": 3,
    "hizb": 6,
    "rub": 21,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 23,
    "endSurah": 3,
    "endAyah": 29,
    "verses": [
      {
        "surah": 3,
        "ayah": 23
      },
      {
        "surah": 3,
        "ayah": 24
      },
      {
        "surah": 3,
        "ayah": 25
      },
      {
        "surah": 3,
        "ayah": 26
      },
      {
        "surah": 3,
        "ayah": 27
      },
      {
        "surah": 3,
        "ayah": 28
      },
      {
        "surah": 3,
        "ayah": 29
      }
    ]
  },
  {
    "page": 54,
    "juz": 3,
    "hizb": 6,
    "rub": 21,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 30,
    "endSurah": 3,
    "endAyah": 37,
    "verses": [
      {
        "surah": 3,
        "ayah": 30
      },
      {
        "surah": 3,
        "ayah": 31
      },
      {
        "surah": 3,
        "ayah": 32
      },
      {
        "surah": 3,
        "ayah": 33
      },
      {
        "surah": 3,
        "ayah": 34
      },
      {
        "surah": 3,
        "ayah": 35
      },
      {
        "surah": 3,
        "ayah": 36
      },
      {
        "surah": 3,
        "ayah": 37
      }
    ]
  },
  {
    "page": 55,
    "juz": 3,
    "hizb": 6,
    "rub": 22,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 38,
    "endSurah": 3,
    "endAyah": 45,
    "verses": [
      {
        "surah": 3,
        "ayah": 38
      },
      {
        "surah": 3,
        "ayah": 39
      },
      {
        "surah": 3,
        "ayah": 40
      },
      {
        "surah": 3,
        "ayah": 41
      },
      {
        "surah": 3,
        "ayah": 42
      },
      {
        "surah": 3,
        "ayah": 43
      },
      {
        "surah": 3,
        "ayah": 44
      },
      {
        "surah": 3,
        "ayah": 45
      }
    ]
  },
  {
    "page": 56,
    "juz": 3,
    "hizb": 6,
    "rub": 22,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 46,
    "endSurah": 3,
    "endAyah": 52,
    "verses": [
      {
        "surah": 3,
        "ayah": 46
      },
      {
        "surah": 3,
        "ayah": 47
      },
      {
        "surah": 3,
        "ayah": 48
      },
      {
        "surah": 3,
        "ayah": 49
      },
      {
        "surah": 3,
        "ayah": 50
      },
      {
        "surah": 3,
        "ayah": 51
      },
      {
        "surah": 3,
        "ayah": 52
      }
    ]
  },
  {
    "page": 57,
    "juz": 3,
    "hizb": 6,
    "rub": 23,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 53,
    "endSurah": 3,
    "endAyah": 61,
    "verses": [
      {
        "surah": 3,
        "ayah": 53
      },
      {
        "surah": 3,
        "ayah": 54
      },
      {
        "surah": 3,
        "ayah": 55
      },
      {
        "surah": 3,
        "ayah": 56
      },
      {
        "surah": 3,
        "ayah": 57
      },
      {
        "surah": 3,
        "ayah": 58
      },
      {
        "surah": 3,
        "ayah": 59
      },
      {
        "surah": 3,
        "ayah": 60
      },
      {
        "surah": 3,
        "ayah": 61
      }
    ]
  },
  {
    "page": 58,
    "juz": 3,
    "hizb": 6,
    "rub": 23,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 62,
    "endSurah": 3,
    "endAyah": 70,
    "verses": [
      {
        "surah": 3,
        "ayah": 62
      },
      {
        "surah": 3,
        "ayah": 63
      },
      {
        "surah": 3,
        "ayah": 64
      },
      {
        "surah": 3,
        "ayah": 65
      },
      {
        "surah": 3,
        "ayah": 66
      },
      {
        "surah": 3,
        "ayah": 67
      },
      {
        "surah": 3,
        "ayah": 68
      },
      {
        "surah": 3,
        "ayah": 69
      },
      {
        "surah": 3,
        "ayah": 70
      }
    ]
  },
  {
    "page": 59,
    "juz": 3,
    "hizb": 6,
    "rub": 23,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 71,
    "endSurah": 3,
    "endAyah": 77,
    "verses": [
      {
        "surah": 3,
        "ayah": 71
      },
      {
        "surah": 3,
        "ayah": 72
      },
      {
        "surah": 3,
        "ayah": 73
      },
      {
        "surah": 3,
        "ayah": 74
      },
      {
        "surah": 3,
        "ayah": 75
      },
      {
        "surah": 3,
        "ayah": 76
      },
      {
        "surah": 3,
        "ayah": 77
      }
    ]
  },
  {
    "page": 60,
    "juz": 3,
    "hizb": 6,
    "rub": 24,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 78,
    "endSurah": 3,
    "endAyah": 83,
    "verses": [
      {
        "surah": 3,
        "ayah": 78
      },
      {
        "surah": 3,
        "ayah": 79
      },
      {
        "surah": 3,
        "ayah": 80
      },
      {
        "surah": 3,
        "ayah": 81
      },
      {
        "surah": 3,
        "ayah": 82
      },
      {
        "surah": 3,
        "ayah": 83
      }
    ]
  },
  {
    "page": 61,
    "juz": 3,
    "hizb": 6,
    "rub": 24,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 84,
    "endSurah": 3,
    "endAyah": 91,
    "verses": [
      {
        "surah": 3,
        "ayah": 84
      },
      {
        "surah": 3,
        "ayah": 85
      },
      {
        "surah": 3,
        "ayah": 86
      },
      {
        "surah": 3,
        "ayah": 87
      },
      {
        "surah": 3,
        "ayah": 88
      },
      {
        "surah": 3,
        "ayah": 89
      },
      {
        "surah": 3,
        "ayah": 90
      },
      {
        "surah": 3,
        "ayah": 91
      }
    ]
  },
  {
    "page": 62,
    "juz": 3,
    "hizb": 6,
    "rub": 24,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 92,
    "endSurah": 3,
    "endAyah": 100,
    "verses": [
      {
        "surah": 3,
        "ayah": 92
      },
      {
        "surah": 3,
        "ayah": 93
      },
      {
        "surah": 3,
        "ayah": 94
      },
      {
        "surah": 3,
        "ayah": 95
      },
      {
        "surah": 3,
        "ayah": 96
      },
      {
        "surah": 3,
        "ayah": 97
      },
      {
        "surah": 3,
        "ayah": 98
      },
      {
        "surah": 3,
        "ayah": 99
      },
      {
        "surah": 3,
        "ayah": 100
      }
    ]
  },
  {
    "page": 63,
    "juz": 4,
    "hizb": 7,
    "rub": 25,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 101,
    "endSurah": 3,
    "endAyah": 108,
    "verses": [
      {
        "surah": 3,
        "ayah": 101
      },
      {
        "surah": 3,
        "ayah": 102
      },
      {
        "surah": 3,
        "ayah": 103
      },
      {
        "surah": 3,
        "ayah": 104
      },
      {
        "surah": 3,
        "ayah": 105
      },
      {
        "surah": 3,
        "ayah": 106
      },
      {
        "surah": 3,
        "ayah": 107
      },
      {
        "surah": 3,
        "ayah": 108
      }
    ]
  },
  {
    "page": 64,
    "juz": 4,
    "hizb": 7,
    "rub": 25,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 109,
    "endSurah": 3,
    "endAyah": 115,
    "verses": [
      {
        "surah": 3,
        "ayah": 109
      },
      {
        "surah": 3,
        "ayah": 110
      },
      {
        "surah": 3,
        "ayah": 111
      },
      {
        "surah": 3,
        "ayah": 112
      },
      {
        "surah": 3,
        "ayah": 113
      },
      {
        "surah": 3,
        "ayah": 114
      },
      {
        "surah": 3,
        "ayah": 115
      }
    ]
  },
  {
    "page": 65,
    "juz": 4,
    "hizb": 7,
    "rub": 26,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 116,
    "endSurah": 3,
    "endAyah": 121,
    "verses": [
      {
        "surah": 3,
        "ayah": 116
      },
      {
        "surah": 3,
        "ayah": 117
      },
      {
        "surah": 3,
        "ayah": 118
      },
      {
        "surah": 3,
        "ayah": 119
      },
      {
        "surah": 3,
        "ayah": 120
      },
      {
        "surah": 3,
        "ayah": 121
      }
    ]
  },
  {
    "page": 66,
    "juz": 4,
    "hizb": 7,
    "rub": 26,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 122,
    "endSurah": 3,
    "endAyah": 132,
    "verses": [
      {
        "surah": 3,
        "ayah": 122
      },
      {
        "surah": 3,
        "ayah": 123
      },
      {
        "surah": 3,
        "ayah": 124
      },
      {
        "surah": 3,
        "ayah": 125
      },
      {
        "surah": 3,
        "ayah": 126
      },
      {
        "surah": 3,
        "ayah": 127
      },
      {
        "surah": 3,
        "ayah": 128
      },
      {
        "surah": 3,
        "ayah": 129
      },
      {
        "surah": 3,
        "ayah": 130
      },
      {
        "surah": 3,
        "ayah": 131
      },
      {
        "surah": 3,
        "ayah": 132
      }
    ]
  },
  {
    "page": 67,
    "juz": 4,
    "hizb": 7,
    "rub": 27,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 133,
    "endSurah": 3,
    "endAyah": 140,
    "verses": [
      {
        "surah": 3,
        "ayah": 133
      },
      {
        "surah": 3,
        "ayah": 134
      },
      {
        "surah": 3,
        "ayah": 135
      },
      {
        "surah": 3,
        "ayah": 136
      },
      {
        "surah": 3,
        "ayah": 137
      },
      {
        "surah": 3,
        "ayah": 138
      },
      {
        "surah": 3,
        "ayah": 139
      },
      {
        "surah": 3,
        "ayah": 140
      }
    ]
  },
  {
    "page": 68,
    "juz": 4,
    "hizb": 7,
    "rub": 27,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 141,
    "endSurah": 3,
    "endAyah": 148,
    "verses": [
      {
        "surah": 3,
        "ayah": 141
      },
      {
        "surah": 3,
        "ayah": 142
      },
      {
        "surah": 3,
        "ayah": 143
      },
      {
        "surah": 3,
        "ayah": 144
      },
      {
        "surah": 3,
        "ayah": 145
      },
      {
        "surah": 3,
        "ayah": 146
      },
      {
        "surah": 3,
        "ayah": 147
      },
      {
        "surah": 3,
        "ayah": 148
      }
    ]
  },
  {
    "page": 69,
    "juz": 4,
    "hizb": 7,
    "rub": 27,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 149,
    "endSurah": 3,
    "endAyah": 153,
    "verses": [
      {
        "surah": 3,
        "ayah": 149
      },
      {
        "surah": 3,
        "ayah": 150
      },
      {
        "surah": 3,
        "ayah": 151
      },
      {
        "surah": 3,
        "ayah": 152
      },
      {
        "surah": 3,
        "ayah": 153
      }
    ]
  },
  {
    "page": 70,
    "juz": 4,
    "hizb": 7,
    "rub": 28,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 154,
    "endSurah": 3,
    "endAyah": 157,
    "verses": [
      {
        "surah": 3,
        "ayah": 154
      },
      {
        "surah": 3,
        "ayah": 155
      },
      {
        "surah": 3,
        "ayah": 156
      },
      {
        "surah": 3,
        "ayah": 157
      }
    ]
  },
  {
    "page": 71,
    "juz": 4,
    "hizb": 7,
    "rub": 28,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 158,
    "endSurah": 3,
    "endAyah": 165,
    "verses": [
      {
        "surah": 3,
        "ayah": 158
      },
      {
        "surah": 3,
        "ayah": 159
      },
      {
        "surah": 3,
        "ayah": 160
      },
      {
        "surah": 3,
        "ayah": 161
      },
      {
        "surah": 3,
        "ayah": 162
      },
      {
        "surah": 3,
        "ayah": 163
      },
      {
        "surah": 3,
        "ayah": 164
      },
      {
        "surah": 3,
        "ayah": 165
      }
    ]
  },
  {
    "page": 72,
    "juz": 4,
    "hizb": 7,
    "rub": 28,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 166,
    "endSurah": 3,
    "endAyah": 173,
    "verses": [
      {
        "surah": 3,
        "ayah": 166
      },
      {
        "surah": 3,
        "ayah": 167
      },
      {
        "surah": 3,
        "ayah": 168
      },
      {
        "surah": 3,
        "ayah": 169
      },
      {
        "surah": 3,
        "ayah": 170
      },
      {
        "surah": 3,
        "ayah": 171
      },
      {
        "surah": 3,
        "ayah": 172
      },
      {
        "surah": 3,
        "ayah": 173
      }
    ]
  },
  {
    "page": 73,
    "juz": 4,
    "hizb": 8,
    "rub": 29,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 174,
    "endSurah": 3,
    "endAyah": 180,
    "verses": [
      {
        "surah": 3,
        "ayah": 174
      },
      {
        "surah": 3,
        "ayah": 175
      },
      {
        "surah": 3,
        "ayah": 176
      },
      {
        "surah": 3,
        "ayah": 177
      },
      {
        "surah": 3,
        "ayah": 178
      },
      {
        "surah": 3,
        "ayah": 179
      },
      {
        "surah": 3,
        "ayah": 180
      }
    ]
  },
  {
    "page": 74,
    "juz": 4,
    "hizb": 8,
    "rub": 29,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 181,
    "endSurah": 3,
    "endAyah": 186,
    "verses": [
      {
        "surah": 3,
        "ayah": 181
      },
      {
        "surah": 3,
        "ayah": 182
      },
      {
        "surah": 3,
        "ayah": 183
      },
      {
        "surah": 3,
        "ayah": 184
      },
      {
        "surah": 3,
        "ayah": 185
      },
      {
        "surah": 3,
        "ayah": 186
      }
    ]
  },
  {
    "page": 75,
    "juz": 4,
    "hizb": 8,
    "rub": 30,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 187,
    "endSurah": 3,
    "endAyah": 194,
    "verses": [
      {
        "surah": 3,
        "ayah": 187
      },
      {
        "surah": 3,
        "ayah": 188
      },
      {
        "surah": 3,
        "ayah": 189
      },
      {
        "surah": 3,
        "ayah": 190
      },
      {
        "surah": 3,
        "ayah": 191
      },
      {
        "surah": 3,
        "ayah": 192
      },
      {
        "surah": 3,
        "ayah": 193
      },
      {
        "surah": 3,
        "ayah": 194
      }
    ]
  },
  {
    "page": 76,
    "juz": 4,
    "hizb": 8,
    "rub": 30,
    "surahs": [
      3
    ],
    "startSurah": 3,
    "startAyah": 195,
    "endSurah": 3,
    "endAyah": 200,
    "verses": [
      {
        "surah": 3,
        "ayah": 195
      },
      {
        "surah": 3,
        "ayah": 196
      },
      {
        "surah": 3,
        "ayah": 197
      },
      {
        "surah": 3,
        "ayah": 198
      },
      {
        "surah": 3,
        "ayah": 199
      },
      {
        "surah": 3,
        "ayah": 200
      }
    ]
  },
  {
    "page": 77,
    "juz": 4,
    "hizb": 8,
    "rub": 31,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 1,
    "endSurah": 4,
    "endAyah": 6,
    "verses": [
      {
        "surah": 4,
        "ayah": 1
      },
      {
        "surah": 4,
        "ayah": 2
      },
      {
        "surah": 4,
        "ayah": 3
      },
      {
        "surah": 4,
        "ayah": 4
      },
      {
        "surah": 4,
        "ayah": 5
      },
      {
        "surah": 4,
        "ayah": 6
      }
    ]
  },
  {
    "page": 78,
    "juz": 4,
    "hizb": 8,
    "rub": 31,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 7,
    "endSurah": 4,
    "endAyah": 11,
    "verses": [
      {
        "surah": 4,
        "ayah": 7
      },
      {
        "surah": 4,
        "ayah": 8
      },
      {
        "surah": 4,
        "ayah": 9
      },
      {
        "surah": 4,
        "ayah": 10
      },
      {
        "surah": 4,
        "ayah": 11
      }
    ]
  },
  {
    "page": 79,
    "juz": 4,
    "hizb": 8,
    "rub": 32,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 12,
    "endSurah": 4,
    "endAyah": 14,
    "verses": [
      {
        "surah": 4,
        "ayah": 12
      },
      {
        "surah": 4,
        "ayah": 13
      },
      {
        "surah": 4,
        "ayah": 14
      }
    ]
  },
  {
    "page": 80,
    "juz": 4,
    "hizb": 8,
    "rub": 32,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 15,
    "endSurah": 4,
    "endAyah": 19,
    "verses": [
      {
        "surah": 4,
        "ayah": 15
      },
      {
        "surah": 4,
        "ayah": 16
      },
      {
        "surah": 4,
        "ayah": 17
      },
      {
        "surah": 4,
        "ayah": 18
      },
      {
        "surah": 4,
        "ayah": 19
      }
    ]
  },
  {
    "page": 81,
    "juz": 4,
    "hizb": 8,
    "rub": 32,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 20,
    "endSurah": 4,
    "endAyah": 23,
    "verses": [
      {
        "surah": 4,
        "ayah": 20
      },
      {
        "surah": 4,
        "ayah": 21
      },
      {
        "surah": 4,
        "ayah": 22
      },
      {
        "surah": 4,
        "ayah": 23
      }
    ]
  },
  {
    "page": 82,
    "juz": 5,
    "hizb": 9,
    "rub": 33,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 24,
    "endSurah": 4,
    "endAyah": 26,
    "verses": [
      {
        "surah": 4,
        "ayah": 24
      },
      {
        "surah": 4,
        "ayah": 25
      },
      {
        "surah": 4,
        "ayah": 26
      }
    ]
  },
  {
    "page": 83,
    "juz": 5,
    "hizb": 9,
    "rub": 33,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 27,
    "endSurah": 4,
    "endAyah": 33,
    "verses": [
      {
        "surah": 4,
        "ayah": 27
      },
      {
        "surah": 4,
        "ayah": 28
      },
      {
        "surah": 4,
        "ayah": 29
      },
      {
        "surah": 4,
        "ayah": 30
      },
      {
        "surah": 4,
        "ayah": 31
      },
      {
        "surah": 4,
        "ayah": 32
      },
      {
        "surah": 4,
        "ayah": 33
      }
    ]
  },
  {
    "page": 84,
    "juz": 5,
    "hizb": 9,
    "rub": 33,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 34,
    "endSurah": 4,
    "endAyah": 37,
    "verses": [
      {
        "surah": 4,
        "ayah": 34
      },
      {
        "surah": 4,
        "ayah": 35
      },
      {
        "surah": 4,
        "ayah": 36
      },
      {
        "surah": 4,
        "ayah": 37
      }
    ]
  },
  {
    "page": 85,
    "juz": 5,
    "hizb": 9,
    "rub": 34,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 38,
    "endSurah": 4,
    "endAyah": 44,
    "verses": [
      {
        "surah": 4,
        "ayah": 38
      },
      {
        "surah": 4,
        "ayah": 39
      },
      {
        "surah": 4,
        "ayah": 40
      },
      {
        "surah": 4,
        "ayah": 41
      },
      {
        "surah": 4,
        "ayah": 42
      },
      {
        "surah": 4,
        "ayah": 43
      },
      {
        "surah": 4,
        "ayah": 44
      }
    ]
  },
  {
    "page": 86,
    "juz": 5,
    "hizb": 9,
    "rub": 34,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 45,
    "endSurah": 4,
    "endAyah": 51,
    "verses": [
      {
        "surah": 4,
        "ayah": 45
      },
      {
        "surah": 4,
        "ayah": 46
      },
      {
        "surah": 4,
        "ayah": 47
      },
      {
        "surah": 4,
        "ayah": 48
      },
      {
        "surah": 4,
        "ayah": 49
      },
      {
        "surah": 4,
        "ayah": 50
      },
      {
        "surah": 4,
        "ayah": 51
      }
    ]
  },
  {
    "page": 87,
    "juz": 5,
    "hizb": 9,
    "rub": 34,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 52,
    "endSurah": 4,
    "endAyah": 59,
    "verses": [
      {
        "surah": 4,
        "ayah": 52
      },
      {
        "surah": 4,
        "ayah": 53
      },
      {
        "surah": 4,
        "ayah": 54
      },
      {
        "surah": 4,
        "ayah": 55
      },
      {
        "surah": 4,
        "ayah": 56
      },
      {
        "surah": 4,
        "ayah": 57
      },
      {
        "surah": 4,
        "ayah": 58
      },
      {
        "surah": 4,
        "ayah": 59
      }
    ]
  },
  {
    "page": 88,
    "juz": 5,
    "hizb": 9,
    "rub": 35,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 60,
    "endSurah": 4,
    "endAyah": 65,
    "verses": [
      {
        "surah": 4,
        "ayah": 60
      },
      {
        "surah": 4,
        "ayah": 61
      },
      {
        "surah": 4,
        "ayah": 62
      },
      {
        "surah": 4,
        "ayah": 63
      },
      {
        "surah": 4,
        "ayah": 64
      },
      {
        "surah": 4,
        "ayah": 65
      }
    ]
  },
  {
    "page": 89,
    "juz": 5,
    "hizb": 9,
    "rub": 35,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 66,
    "endSurah": 4,
    "endAyah": 74,
    "verses": [
      {
        "surah": 4,
        "ayah": 66
      },
      {
        "surah": 4,
        "ayah": 67
      },
      {
        "surah": 4,
        "ayah": 68
      },
      {
        "surah": 4,
        "ayah": 69
      },
      {
        "surah": 4,
        "ayah": 70
      },
      {
        "surah": 4,
        "ayah": 71
      },
      {
        "surah": 4,
        "ayah": 72
      },
      {
        "surah": 4,
        "ayah": 73
      },
      {
        "surah": 4,
        "ayah": 74
      }
    ]
  },
  {
    "page": 90,
    "juz": 5,
    "hizb": 9,
    "rub": 36,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 75,
    "endSurah": 4,
    "endAyah": 79,
    "verses": [
      {
        "surah": 4,
        "ayah": 75
      },
      {
        "surah": 4,
        "ayah": 76
      },
      {
        "surah": 4,
        "ayah": 77
      },
      {
        "surah": 4,
        "ayah": 78
      },
      {
        "surah": 4,
        "ayah": 79
      }
    ]
  },
  {
    "page": 91,
    "juz": 5,
    "hizb": 9,
    "rub": 36,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 80,
    "endSurah": 4,
    "endAyah": 86,
    "verses": [
      {
        "surah": 4,
        "ayah": 80
      },
      {
        "surah": 4,
        "ayah": 81
      },
      {
        "surah": 4,
        "ayah": 82
      },
      {
        "surah": 4,
        "ayah": 83
      },
      {
        "surah": 4,
        "ayah": 84
      },
      {
        "surah": 4,
        "ayah": 85
      },
      {
        "surah": 4,
        "ayah": 86
      }
    ]
  },
  {
    "page": 92,
    "juz": 5,
    "hizb": 9,
    "rub": 36,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 87,
    "endSurah": 4,
    "endAyah": 91,
    "verses": [
      {
        "surah": 4,
        "ayah": 87
      },
      {
        "surah": 4,
        "ayah": 88
      },
      {
        "surah": 4,
        "ayah": 89
      },
      {
        "surah": 4,
        "ayah": 90
      },
      {
        "surah": 4,
        "ayah": 91
      }
    ]
  },
  {
    "page": 93,
    "juz": 5,
    "hizb": 10,
    "rub": 37,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 92,
    "endSurah": 4,
    "endAyah": 94,
    "verses": [
      {
        "surah": 4,
        "ayah": 92
      },
      {
        "surah": 4,
        "ayah": 93
      },
      {
        "surah": 4,
        "ayah": 94
      }
    ]
  },
  {
    "page": 94,
    "juz": 5,
    "hizb": 10,
    "rub": 37,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 95,
    "endSurah": 4,
    "endAyah": 101,
    "verses": [
      {
        "surah": 4,
        "ayah": 95
      },
      {
        "surah": 4,
        "ayah": 96
      },
      {
        "surah": 4,
        "ayah": 97
      },
      {
        "surah": 4,
        "ayah": 98
      },
      {
        "surah": 4,
        "ayah": 99
      },
      {
        "surah": 4,
        "ayah": 100
      },
      {
        "surah": 4,
        "ayah": 101
      }
    ]
  },
  {
    "page": 95,
    "juz": 5,
    "hizb": 10,
    "rub": 38,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 102,
    "endSurah": 4,
    "endAyah": 105,
    "verses": [
      {
        "surah": 4,
        "ayah": 102
      },
      {
        "surah": 4,
        "ayah": 103
      },
      {
        "surah": 4,
        "ayah": 104
      },
      {
        "surah": 4,
        "ayah": 105
      }
    ]
  },
  {
    "page": 96,
    "juz": 5,
    "hizb": 10,
    "rub": 38,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 106,
    "endSurah": 4,
    "endAyah": 113,
    "verses": [
      {
        "surah": 4,
        "ayah": 106
      },
      {
        "surah": 4,
        "ayah": 107
      },
      {
        "surah": 4,
        "ayah": 108
      },
      {
        "surah": 4,
        "ayah": 109
      },
      {
        "surah": 4,
        "ayah": 110
      },
      {
        "surah": 4,
        "ayah": 111
      },
      {
        "surah": 4,
        "ayah": 112
      },
      {
        "surah": 4,
        "ayah": 113
      }
    ]
  },
  {
    "page": 97,
    "juz": 5,
    "hizb": 10,
    "rub": 39,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 114,
    "endSurah": 4,
    "endAyah": 121,
    "verses": [
      {
        "surah": 4,
        "ayah": 114
      },
      {
        "surah": 4,
        "ayah": 115
      },
      {
        "surah": 4,
        "ayah": 116
      },
      {
        "surah": 4,
        "ayah": 117
      },
      {
        "surah": 4,
        "ayah": 118
      },
      {
        "surah": 4,
        "ayah": 119
      },
      {
        "surah": 4,
        "ayah": 120
      },
      {
        "surah": 4,
        "ayah": 121
      }
    ]
  },
  {
    "page": 98,
    "juz": 5,
    "hizb": 10,
    "rub": 39,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 122,
    "endSurah": 4,
    "endAyah": 127,
    "verses": [
      {
        "surah": 4,
        "ayah": 122
      },
      {
        "surah": 4,
        "ayah": 123
      },
      {
        "surah": 4,
        "ayah": 124
      },
      {
        "surah": 4,
        "ayah": 125
      },
      {
        "surah": 4,
        "ayah": 126
      },
      {
        "surah": 4,
        "ayah": 127
      }
    ]
  },
  {
    "page": 99,
    "juz": 5,
    "hizb": 10,
    "rub": 39,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 128,
    "endSurah": 4,
    "endAyah": 134,
    "verses": [
      {
        "surah": 4,
        "ayah": 128
      },
      {
        "surah": 4,
        "ayah": 129
      },
      {
        "surah": 4,
        "ayah": 130
      },
      {
        "surah": 4,
        "ayah": 131
      },
      {
        "surah": 4,
        "ayah": 132
      },
      {
        "surah": 4,
        "ayah": 133
      },
      {
        "surah": 4,
        "ayah": 134
      }
    ]
  },
  {
    "page": 100,
    "juz": 5,
    "hizb": 10,
    "rub": 40,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 135,
    "endSurah": 4,
    "endAyah": 140,
    "verses": [
      {
        "surah": 4,
        "ayah": 135
      },
      {
        "surah": 4,
        "ayah": 136
      },
      {
        "surah": 4,
        "ayah": 137
      },
      {
        "surah": 4,
        "ayah": 138
      },
      {
        "surah": 4,
        "ayah": 139
      },
      {
        "surah": 4,
        "ayah": 140
      }
    ]
  },
  {
    "page": 101,
    "juz": 5,
    "hizb": 10,
    "rub": 40,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 141,
    "endSurah": 4,
    "endAyah": 147,
    "verses": [
      {
        "surah": 4,
        "ayah": 141
      },
      {
        "surah": 4,
        "ayah": 142
      },
      {
        "surah": 4,
        "ayah": 143
      },
      {
        "surah": 4,
        "ayah": 144
      },
      {
        "surah": 4,
        "ayah": 145
      },
      {
        "surah": 4,
        "ayah": 146
      },
      {
        "surah": 4,
        "ayah": 147
      }
    ]
  },
  {
    "page": 102,
    "juz": 6,
    "hizb": 11,
    "rub": 41,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 148,
    "endSurah": 4,
    "endAyah": 154,
    "verses": [
      {
        "surah": 4,
        "ayah": 148
      },
      {
        "surah": 4,
        "ayah": 149
      },
      {
        "surah": 4,
        "ayah": 150
      },
      {
        "surah": 4,
        "ayah": 151
      },
      {
        "surah": 4,
        "ayah": 152
      },
      {
        "surah": 4,
        "ayah": 153
      },
      {
        "surah": 4,
        "ayah": 154
      }
    ]
  },
  {
    "page": 103,
    "juz": 6,
    "hizb": 11,
    "rub": 41,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 155,
    "endSurah": 4,
    "endAyah": 162,
    "verses": [
      {
        "surah": 4,
        "ayah": 155
      },
      {
        "surah": 4,
        "ayah": 156
      },
      {
        "surah": 4,
        "ayah": 157
      },
      {
        "surah": 4,
        "ayah": 158
      },
      {
        "surah": 4,
        "ayah": 159
      },
      {
        "surah": 4,
        "ayah": 160
      },
      {
        "surah": 4,
        "ayah": 161
      },
      {
        "surah": 4,
        "ayah": 162
      }
    ]
  },
  {
    "page": 104,
    "juz": 6,
    "hizb": 11,
    "rub": 42,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 163,
    "endSurah": 4,
    "endAyah": 170,
    "verses": [
      {
        "surah": 4,
        "ayah": 163
      },
      {
        "surah": 4,
        "ayah": 164
      },
      {
        "surah": 4,
        "ayah": 165
      },
      {
        "surah": 4,
        "ayah": 166
      },
      {
        "surah": 4,
        "ayah": 167
      },
      {
        "surah": 4,
        "ayah": 168
      },
      {
        "surah": 4,
        "ayah": 169
      },
      {
        "surah": 4,
        "ayah": 170
      }
    ]
  },
  {
    "page": 105,
    "juz": 6,
    "hizb": 11,
    "rub": 42,
    "surahs": [
      4
    ],
    "startSurah": 4,
    "startAyah": 171,
    "endSurah": 4,
    "endAyah": 175,
    "verses": [
      {
        "surah": 4,
        "ayah": 171
      },
      {
        "surah": 4,
        "ayah": 172
      },
      {
        "surah": 4,
        "ayah": 173
      },
      {
        "surah": 4,
        "ayah": 174
      },
      {
        "surah": 4,
        "ayah": 175
      }
    ]
  },
  {
    "page": 106,
    "juz": 6,
    "hizb": 11,
    "rub": 42,
    "surahs": [
      4,
      5
    ],
    "startSurah": 4,
    "startAyah": 176,
    "endSurah": 5,
    "endAyah": 2,
    "verses": [
      {
        "surah": 4,
        "ayah": 176
      },
      {
        "surah": 5,
        "ayah": 1
      },
      {
        "surah": 5,
        "ayah": 2
      }
    ]
  },
  {
    "page": 107,
    "juz": 6,
    "hizb": 11,
    "rub": 43,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 3,
    "endSurah": 5,
    "endAyah": 5,
    "verses": [
      {
        "surah": 5,
        "ayah": 3
      },
      {
        "surah": 5,
        "ayah": 4
      },
      {
        "surah": 5,
        "ayah": 5
      }
    ]
  },
  {
    "page": 108,
    "juz": 6,
    "hizb": 11,
    "rub": 43,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 6,
    "endSurah": 5,
    "endAyah": 9,
    "verses": [
      {
        "surah": 5,
        "ayah": 6
      },
      {
        "surah": 5,
        "ayah": 7
      },
      {
        "surah": 5,
        "ayah": 8
      },
      {
        "surah": 5,
        "ayah": 9
      }
    ]
  },
  {
    "page": 109,
    "juz": 6,
    "hizb": 11,
    "rub": 43,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 10,
    "endSurah": 5,
    "endAyah": 13,
    "verses": [
      {
        "surah": 5,
        "ayah": 10
      },
      {
        "surah": 5,
        "ayah": 11
      },
      {
        "surah": 5,
        "ayah": 12
      },
      {
        "surah": 5,
        "ayah": 13
      }
    ]
  },
  {
    "page": 110,
    "juz": 6,
    "hizb": 11,
    "rub": 44,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 14,
    "endSurah": 5,
    "endAyah": 17,
    "verses": [
      {
        "surah": 5,
        "ayah": 14
      },
      {
        "surah": 5,
        "ayah": 15
      },
      {
        "surah": 5,
        "ayah": 16
      },
      {
        "surah": 5,
        "ayah": 17
      }
    ]
  },
  {
    "page": 111,
    "juz": 6,
    "hizb": 11,
    "rub": 44,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 18,
    "endSurah": 5,
    "endAyah": 23,
    "verses": [
      {
        "surah": 5,
        "ayah": 18
      },
      {
        "surah": 5,
        "ayah": 19
      },
      {
        "surah": 5,
        "ayah": 20
      },
      {
        "surah": 5,
        "ayah": 21
      },
      {
        "surah": 5,
        "ayah": 22
      },
      {
        "surah": 5,
        "ayah": 23
      }
    ]
  },
  {
    "page": 112,
    "juz": 6,
    "hizb": 11,
    "rub": 44,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 24,
    "endSurah": 5,
    "endAyah": 31,
    "verses": [
      {
        "surah": 5,
        "ayah": 24
      },
      {
        "surah": 5,
        "ayah": 25
      },
      {
        "surah": 5,
        "ayah": 26
      },
      {
        "surah": 5,
        "ayah": 27
      },
      {
        "surah": 5,
        "ayah": 28
      },
      {
        "surah": 5,
        "ayah": 29
      },
      {
        "surah": 5,
        "ayah": 30
      },
      {
        "surah": 5,
        "ayah": 31
      }
    ]
  },
  {
    "page": 113,
    "juz": 6,
    "hizb": 12,
    "rub": 45,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 32,
    "endSurah": 5,
    "endAyah": 36,
    "verses": [
      {
        "surah": 5,
        "ayah": 32
      },
      {
        "surah": 5,
        "ayah": 33
      },
      {
        "surah": 5,
        "ayah": 34
      },
      {
        "surah": 5,
        "ayah": 35
      },
      {
        "surah": 5,
        "ayah": 36
      }
    ]
  },
  {
    "page": 114,
    "juz": 6,
    "hizb": 12,
    "rub": 45,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 37,
    "endSurah": 5,
    "endAyah": 41,
    "verses": [
      {
        "surah": 5,
        "ayah": 37
      },
      {
        "surah": 5,
        "ayah": 38
      },
      {
        "surah": 5,
        "ayah": 39
      },
      {
        "surah": 5,
        "ayah": 40
      },
      {
        "surah": 5,
        "ayah": 41
      }
    ]
  },
  {
    "page": 115,
    "juz": 6,
    "hizb": 12,
    "rub": 46,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 42,
    "endSurah": 5,
    "endAyah": 45,
    "verses": [
      {
        "surah": 5,
        "ayah": 42
      },
      {
        "surah": 5,
        "ayah": 43
      },
      {
        "surah": 5,
        "ayah": 44
      },
      {
        "surah": 5,
        "ayah": 45
      }
    ]
  },
  {
    "page": 116,
    "juz": 6,
    "hizb": 12,
    "rub": 46,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 46,
    "endSurah": 5,
    "endAyah": 50,
    "verses": [
      {
        "surah": 5,
        "ayah": 46
      },
      {
        "surah": 5,
        "ayah": 47
      },
      {
        "surah": 5,
        "ayah": 48
      },
      {
        "surah": 5,
        "ayah": 49
      },
      {
        "surah": 5,
        "ayah": 50
      }
    ]
  },
  {
    "page": 117,
    "juz": 6,
    "hizb": 12,
    "rub": 47,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 51,
    "endSurah": 5,
    "endAyah": 57,
    "verses": [
      {
        "surah": 5,
        "ayah": 51
      },
      {
        "surah": 5,
        "ayah": 52
      },
      {
        "surah": 5,
        "ayah": 53
      },
      {
        "surah": 5,
        "ayah": 54
      },
      {
        "surah": 5,
        "ayah": 55
      },
      {
        "surah": 5,
        "ayah": 56
      },
      {
        "surah": 5,
        "ayah": 57
      }
    ]
  },
  {
    "page": 118,
    "juz": 6,
    "hizb": 12,
    "rub": 47,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 58,
    "endSurah": 5,
    "endAyah": 64,
    "verses": [
      {
        "surah": 5,
        "ayah": 58
      },
      {
        "surah": 5,
        "ayah": 59
      },
      {
        "surah": 5,
        "ayah": 60
      },
      {
        "surah": 5,
        "ayah": 61
      },
      {
        "surah": 5,
        "ayah": 62
      },
      {
        "surah": 5,
        "ayah": 63
      },
      {
        "surah": 5,
        "ayah": 64
      }
    ]
  },
  {
    "page": 119,
    "juz": 6,
    "hizb": 12,
    "rub": 47,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 65,
    "endSurah": 5,
    "endAyah": 70,
    "verses": [
      {
        "surah": 5,
        "ayah": 65
      },
      {
        "surah": 5,
        "ayah": 66
      },
      {
        "surah": 5,
        "ayah": 67
      },
      {
        "surah": 5,
        "ayah": 68
      },
      {
        "surah": 5,
        "ayah": 69
      },
      {
        "surah": 5,
        "ayah": 70
      }
    ]
  },
  {
    "page": 120,
    "juz": 6,
    "hizb": 12,
    "rub": 48,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 71,
    "endSurah": 5,
    "endAyah": 76,
    "verses": [
      {
        "surah": 5,
        "ayah": 71
      },
      {
        "surah": 5,
        "ayah": 72
      },
      {
        "surah": 5,
        "ayah": 73
      },
      {
        "surah": 5,
        "ayah": 74
      },
      {
        "surah": 5,
        "ayah": 75
      },
      {
        "surah": 5,
        "ayah": 76
      }
    ]
  },
  {
    "page": 121,
    "juz": 6,
    "hizb": 12,
    "rub": 48,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 77,
    "endSurah": 5,
    "endAyah": 82,
    "verses": [
      {
        "surah": 5,
        "ayah": 77
      },
      {
        "surah": 5,
        "ayah": 78
      },
      {
        "surah": 5,
        "ayah": 79
      },
      {
        "surah": 5,
        "ayah": 80
      },
      {
        "surah": 5,
        "ayah": 81
      },
      {
        "surah": 5,
        "ayah": 82
      }
    ]
  },
  {
    "page": 122,
    "juz": 7,
    "hizb": 13,
    "rub": 49,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 83,
    "endSurah": 5,
    "endAyah": 89,
    "verses": [
      {
        "surah": 5,
        "ayah": 83
      },
      {
        "surah": 5,
        "ayah": 84
      },
      {
        "surah": 5,
        "ayah": 85
      },
      {
        "surah": 5,
        "ayah": 86
      },
      {
        "surah": 5,
        "ayah": 87
      },
      {
        "surah": 5,
        "ayah": 88
      },
      {
        "surah": 5,
        "ayah": 89
      }
    ]
  },
  {
    "page": 123,
    "juz": 7,
    "hizb": 13,
    "rub": 49,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 90,
    "endSurah": 5,
    "endAyah": 95,
    "verses": [
      {
        "surah": 5,
        "ayah": 90
      },
      {
        "surah": 5,
        "ayah": 91
      },
      {
        "surah": 5,
        "ayah": 92
      },
      {
        "surah": 5,
        "ayah": 93
      },
      {
        "surah": 5,
        "ayah": 94
      },
      {
        "surah": 5,
        "ayah": 95
      }
    ]
  },
  {
    "page": 124,
    "juz": 7,
    "hizb": 13,
    "rub": 49,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 96,
    "endSurah": 5,
    "endAyah": 103,
    "verses": [
      {
        "surah": 5,
        "ayah": 96
      },
      {
        "surah": 5,
        "ayah": 97
      },
      {
        "surah": 5,
        "ayah": 98
      },
      {
        "surah": 5,
        "ayah": 99
      },
      {
        "surah": 5,
        "ayah": 100
      },
      {
        "surah": 5,
        "ayah": 101
      },
      {
        "surah": 5,
        "ayah": 102
      },
      {
        "surah": 5,
        "ayah": 103
      }
    ]
  },
  {
    "page": 125,
    "juz": 7,
    "hizb": 13,
    "rub": 50,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 104,
    "endSurah": 5,
    "endAyah": 108,
    "verses": [
      {
        "surah": 5,
        "ayah": 104
      },
      {
        "surah": 5,
        "ayah": 105
      },
      {
        "surah": 5,
        "ayah": 106
      },
      {
        "surah": 5,
        "ayah": 107
      },
      {
        "surah": 5,
        "ayah": 108
      }
    ]
  },
  {
    "page": 126,
    "juz": 7,
    "hizb": 13,
    "rub": 51,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 109,
    "endSurah": 5,
    "endAyah": 113,
    "verses": [
      {
        "surah": 5,
        "ayah": 109
      },
      {
        "surah": 5,
        "ayah": 110
      },
      {
        "surah": 5,
        "ayah": 111
      },
      {
        "surah": 5,
        "ayah": 112
      },
      {
        "surah": 5,
        "ayah": 113
      }
    ]
  },
  {
    "page": 127,
    "juz": 7,
    "hizb": 13,
    "rub": 51,
    "surahs": [
      5
    ],
    "startSurah": 5,
    "startAyah": 114,
    "endSurah": 5,
    "endAyah": 120,
    "verses": [
      {
        "surah": 5,
        "ayah": 114
      },
      {
        "surah": 5,
        "ayah": 115
      },
      {
        "surah": 5,
        "ayah": 116
      },
      {
        "surah": 5,
        "ayah": 117
      },
      {
        "surah": 5,
        "ayah": 118
      },
      {
        "surah": 5,
        "ayah": 119
      },
      {
        "surah": 5,
        "ayah": 120
      }
    ]
  },
  {
    "page": 128,
    "juz": 7,
    "hizb": 13,
    "rub": 51,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 1,
    "endSurah": 6,
    "endAyah": 8,
    "verses": [
      {
        "surah": 6,
        "ayah": 1
      },
      {
        "surah": 6,
        "ayah": 2
      },
      {
        "surah": 6,
        "ayah": 3
      },
      {
        "surah": 6,
        "ayah": 4
      },
      {
        "surah": 6,
        "ayah": 5
      },
      {
        "surah": 6,
        "ayah": 6
      },
      {
        "surah": 6,
        "ayah": 7
      },
      {
        "surah": 6,
        "ayah": 8
      }
    ]
  },
  {
    "page": 129,
    "juz": 7,
    "hizb": 13,
    "rub": 51,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 9,
    "endSurah": 6,
    "endAyah": 18,
    "verses": [
      {
        "surah": 6,
        "ayah": 9
      },
      {
        "surah": 6,
        "ayah": 10
      },
      {
        "surah": 6,
        "ayah": 11
      },
      {
        "surah": 6,
        "ayah": 12
      },
      {
        "surah": 6,
        "ayah": 13
      },
      {
        "surah": 6,
        "ayah": 14
      },
      {
        "surah": 6,
        "ayah": 15
      },
      {
        "surah": 6,
        "ayah": 16
      },
      {
        "surah": 6,
        "ayah": 17
      },
      {
        "surah": 6,
        "ayah": 18
      }
    ]
  },
  {
    "page": 130,
    "juz": 7,
    "hizb": 13,
    "rub": 52,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 19,
    "endSurah": 6,
    "endAyah": 27,
    "verses": [
      {
        "surah": 6,
        "ayah": 19
      },
      {
        "surah": 6,
        "ayah": 20
      },
      {
        "surah": 6,
        "ayah": 21
      },
      {
        "surah": 6,
        "ayah": 22
      },
      {
        "surah": 6,
        "ayah": 23
      },
      {
        "surah": 6,
        "ayah": 24
      },
      {
        "surah": 6,
        "ayah": 25
      },
      {
        "surah": 6,
        "ayah": 26
      },
      {
        "surah": 6,
        "ayah": 27
      }
    ]
  },
  {
    "page": 131,
    "juz": 7,
    "hizb": 13,
    "rub": 52,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 28,
    "endSurah": 6,
    "endAyah": 35,
    "verses": [
      {
        "surah": 6,
        "ayah": 28
      },
      {
        "surah": 6,
        "ayah": 29
      },
      {
        "surah": 6,
        "ayah": 30
      },
      {
        "surah": 6,
        "ayah": 31
      },
      {
        "surah": 6,
        "ayah": 32
      },
      {
        "surah": 6,
        "ayah": 33
      },
      {
        "surah": 6,
        "ayah": 34
      },
      {
        "surah": 6,
        "ayah": 35
      }
    ]
  },
  {
    "page": 132,
    "juz": 7,
    "hizb": 14,
    "rub": 53,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 36,
    "endSurah": 6,
    "endAyah": 44,
    "verses": [
      {
        "surah": 6,
        "ayah": 36
      },
      {
        "surah": 6,
        "ayah": 37
      },
      {
        "surah": 6,
        "ayah": 38
      },
      {
        "surah": 6,
        "ayah": 39
      },
      {
        "surah": 6,
        "ayah": 40
      },
      {
        "surah": 6,
        "ayah": 41
      },
      {
        "surah": 6,
        "ayah": 42
      },
      {
        "surah": 6,
        "ayah": 43
      },
      {
        "surah": 6,
        "ayah": 44
      }
    ]
  },
  {
    "page": 133,
    "juz": 7,
    "hizb": 14,
    "rub": 53,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 45,
    "endSurah": 6,
    "endAyah": 52,
    "verses": [
      {
        "surah": 6,
        "ayah": 45
      },
      {
        "surah": 6,
        "ayah": 46
      },
      {
        "surah": 6,
        "ayah": 47
      },
      {
        "surah": 6,
        "ayah": 48
      },
      {
        "surah": 6,
        "ayah": 49
      },
      {
        "surah": 6,
        "ayah": 50
      },
      {
        "surah": 6,
        "ayah": 51
      },
      {
        "surah": 6,
        "ayah": 52
      }
    ]
  },
  {
    "page": 134,
    "juz": 7,
    "hizb": 14,
    "rub": 53,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 53,
    "endSurah": 6,
    "endAyah": 59,
    "verses": [
      {
        "surah": 6,
        "ayah": 53
      },
      {
        "surah": 6,
        "ayah": 54
      },
      {
        "surah": 6,
        "ayah": 55
      },
      {
        "surah": 6,
        "ayah": 56
      },
      {
        "surah": 6,
        "ayah": 57
      },
      {
        "surah": 6,
        "ayah": 58
      },
      {
        "surah": 6,
        "ayah": 59
      }
    ]
  },
  {
    "page": 135,
    "juz": 7,
    "hizb": 14,
    "rub": 54,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 60,
    "endSurah": 6,
    "endAyah": 68,
    "verses": [
      {
        "surah": 6,
        "ayah": 60
      },
      {
        "surah": 6,
        "ayah": 61
      },
      {
        "surah": 6,
        "ayah": 62
      },
      {
        "surah": 6,
        "ayah": 63
      },
      {
        "surah": 6,
        "ayah": 64
      },
      {
        "surah": 6,
        "ayah": 65
      },
      {
        "surah": 6,
        "ayah": 66
      },
      {
        "surah": 6,
        "ayah": 67
      },
      {
        "surah": 6,
        "ayah": 68
      }
    ]
  },
  {
    "page": 136,
    "juz": 7,
    "hizb": 14,
    "rub": 54,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 69,
    "endSurah": 6,
    "endAyah": 73,
    "verses": [
      {
        "surah": 6,
        "ayah": 69
      },
      {
        "surah": 6,
        "ayah": 70
      },
      {
        "surah": 6,
        "ayah": 71
      },
      {
        "surah": 6,
        "ayah": 72
      },
      {
        "surah": 6,
        "ayah": 73
      }
    ]
  },
  {
    "page": 137,
    "juz": 7,
    "hizb": 14,
    "rub": 55,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 74,
    "endSurah": 6,
    "endAyah": 81,
    "verses": [
      {
        "surah": 6,
        "ayah": 74
      },
      {
        "surah": 6,
        "ayah": 75
      },
      {
        "surah": 6,
        "ayah": 76
      },
      {
        "surah": 6,
        "ayah": 77
      },
      {
        "surah": 6,
        "ayah": 78
      },
      {
        "surah": 6,
        "ayah": 79
      },
      {
        "surah": 6,
        "ayah": 80
      },
      {
        "surah": 6,
        "ayah": 81
      }
    ]
  },
  {
    "page": 138,
    "juz": 7,
    "hizb": 14,
    "rub": 55,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 82,
    "endSurah": 6,
    "endAyah": 90,
    "verses": [
      {
        "surah": 6,
        "ayah": 82
      },
      {
        "surah": 6,
        "ayah": 83
      },
      {
        "surah": 6,
        "ayah": 84
      },
      {
        "surah": 6,
        "ayah": 85
      },
      {
        "surah": 6,
        "ayah": 86
      },
      {
        "surah": 6,
        "ayah": 87
      },
      {
        "surah": 6,
        "ayah": 88
      },
      {
        "surah": 6,
        "ayah": 89
      },
      {
        "surah": 6,
        "ayah": 90
      }
    ]
  },
  {
    "page": 139,
    "juz": 7,
    "hizb": 14,
    "rub": 55,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 91,
    "endSurah": 6,
    "endAyah": 94,
    "verses": [
      {
        "surah": 6,
        "ayah": 91
      },
      {
        "surah": 6,
        "ayah": 92
      },
      {
        "surah": 6,
        "ayah": 93
      },
      {
        "surah": 6,
        "ayah": 94
      }
    ]
  },
  {
    "page": 140,
    "juz": 7,
    "hizb": 14,
    "rub": 56,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 95,
    "endSurah": 6,
    "endAyah": 101,
    "verses": [
      {
        "surah": 6,
        "ayah": 95
      },
      {
        "surah": 6,
        "ayah": 96
      },
      {
        "surah": 6,
        "ayah": 97
      },
      {
        "surah": 6,
        "ayah": 98
      },
      {
        "surah": 6,
        "ayah": 99
      },
      {
        "surah": 6,
        "ayah": 100
      },
      {
        "surah": 6,
        "ayah": 101
      }
    ]
  },
  {
    "page": 141,
    "juz": 7,
    "hizb": 14,
    "rub": 56,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 102,
    "endSurah": 6,
    "endAyah": 110,
    "verses": [
      {
        "surah": 6,
        "ayah": 102
      },
      {
        "surah": 6,
        "ayah": 103
      },
      {
        "surah": 6,
        "ayah": 104
      },
      {
        "surah": 6,
        "ayah": 105
      },
      {
        "surah": 6,
        "ayah": 106
      },
      {
        "surah": 6,
        "ayah": 107
      },
      {
        "surah": 6,
        "ayah": 108
      },
      {
        "surah": 6,
        "ayah": 109
      },
      {
        "surah": 6,
        "ayah": 110
      }
    ]
  },
  {
    "page": 142,
    "juz": 8,
    "hizb": 15,
    "rub": 57,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 111,
    "endSurah": 6,
    "endAyah": 118,
    "verses": [
      {
        "surah": 6,
        "ayah": 111
      },
      {
        "surah": 6,
        "ayah": 112
      },
      {
        "surah": 6,
        "ayah": 113
      },
      {
        "surah": 6,
        "ayah": 114
      },
      {
        "surah": 6,
        "ayah": 115
      },
      {
        "surah": 6,
        "ayah": 116
      },
      {
        "surah": 6,
        "ayah": 117
      },
      {
        "surah": 6,
        "ayah": 118
      }
    ]
  },
  {
    "page": 143,
    "juz": 8,
    "hizb": 15,
    "rub": 57,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 119,
    "endSurah": 6,
    "endAyah": 124,
    "verses": [
      {
        "surah": 6,
        "ayah": 119
      },
      {
        "surah": 6,
        "ayah": 120
      },
      {
        "surah": 6,
        "ayah": 121
      },
      {
        "surah": 6,
        "ayah": 122
      },
      {
        "surah": 6,
        "ayah": 123
      },
      {
        "surah": 6,
        "ayah": 124
      }
    ]
  },
  {
    "page": 144,
    "juz": 8,
    "hizb": 15,
    "rub": 57,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 125,
    "endSurah": 6,
    "endAyah": 131,
    "verses": [
      {
        "surah": 6,
        "ayah": 125
      },
      {
        "surah": 6,
        "ayah": 126
      },
      {
        "surah": 6,
        "ayah": 127
      },
      {
        "surah": 6,
        "ayah": 128
      },
      {
        "surah": 6,
        "ayah": 129
      },
      {
        "surah": 6,
        "ayah": 130
      },
      {
        "surah": 6,
        "ayah": 131
      }
    ]
  },
  {
    "page": 145,
    "juz": 8,
    "hizb": 15,
    "rub": 58,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 132,
    "endSurah": 6,
    "endAyah": 137,
    "verses": [
      {
        "surah": 6,
        "ayah": 132
      },
      {
        "surah": 6,
        "ayah": 133
      },
      {
        "surah": 6,
        "ayah": 134
      },
      {
        "surah": 6,
        "ayah": 135
      },
      {
        "surah": 6,
        "ayah": 136
      },
      {
        "surah": 6,
        "ayah": 137
      }
    ]
  },
  {
    "page": 146,
    "juz": 8,
    "hizb": 15,
    "rub": 58,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 138,
    "endSurah": 6,
    "endAyah": 142,
    "verses": [
      {
        "surah": 6,
        "ayah": 138
      },
      {
        "surah": 6,
        "ayah": 139
      },
      {
        "surah": 6,
        "ayah": 140
      },
      {
        "surah": 6,
        "ayah": 141
      },
      {
        "surah": 6,
        "ayah": 142
      }
    ]
  },
  {
    "page": 147,
    "juz": 8,
    "hizb": 15,
    "rub": 59,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 143,
    "endSurah": 6,
    "endAyah": 146,
    "verses": [
      {
        "surah": 6,
        "ayah": 143
      },
      {
        "surah": 6,
        "ayah": 144
      },
      {
        "surah": 6,
        "ayah": 145
      },
      {
        "surah": 6,
        "ayah": 146
      }
    ]
  },
  {
    "page": 148,
    "juz": 8,
    "hizb": 15,
    "rub": 59,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 147,
    "endSurah": 6,
    "endAyah": 151,
    "verses": [
      {
        "surah": 6,
        "ayah": 147
      },
      {
        "surah": 6,
        "ayah": 148
      },
      {
        "surah": 6,
        "ayah": 149
      },
      {
        "surah": 6,
        "ayah": 150
      },
      {
        "surah": 6,
        "ayah": 151
      }
    ]
  },
  {
    "page": 149,
    "juz": 8,
    "hizb": 15,
    "rub": 60,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 152,
    "endSurah": 6,
    "endAyah": 157,
    "verses": [
      {
        "surah": 6,
        "ayah": 152
      },
      {
        "surah": 6,
        "ayah": 153
      },
      {
        "surah": 6,
        "ayah": 154
      },
      {
        "surah": 6,
        "ayah": 155
      },
      {
        "surah": 6,
        "ayah": 156
      },
      {
        "surah": 6,
        "ayah": 157
      }
    ]
  },
  {
    "page": 150,
    "juz": 8,
    "hizb": 15,
    "rub": 60,
    "surahs": [
      6
    ],
    "startSurah": 6,
    "startAyah": 158,
    "endSurah": 6,
    "endAyah": 165,
    "verses": [
      {
        "surah": 6,
        "ayah": 158
      },
      {
        "surah": 6,
        "ayah": 159
      },
      {
        "surah": 6,
        "ayah": 160
      },
      {
        "surah": 6,
        "ayah": 161
      },
      {
        "surah": 6,
        "ayah": 162
      },
      {
        "surah": 6,
        "ayah": 163
      },
      {
        "surah": 6,
        "ayah": 164
      },
      {
        "surah": 6,
        "ayah": 165
      }
    ]
  },
  {
    "page": 151,
    "juz": 8,
    "hizb": 16,
    "rub": 61,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 1,
    "endSurah": 7,
    "endAyah": 11,
    "verses": [
      {
        "surah": 7,
        "ayah": 1
      },
      {
        "surah": 7,
        "ayah": 2
      },
      {
        "surah": 7,
        "ayah": 3
      },
      {
        "surah": 7,
        "ayah": 4
      },
      {
        "surah": 7,
        "ayah": 5
      },
      {
        "surah": 7,
        "ayah": 6
      },
      {
        "surah": 7,
        "ayah": 7
      },
      {
        "surah": 7,
        "ayah": 8
      },
      {
        "surah": 7,
        "ayah": 9
      },
      {
        "surah": 7,
        "ayah": 10
      },
      {
        "surah": 7,
        "ayah": 11
      }
    ]
  },
  {
    "page": 152,
    "juz": 8,
    "hizb": 16,
    "rub": 61,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 12,
    "endSurah": 7,
    "endAyah": 22,
    "verses": [
      {
        "surah": 7,
        "ayah": 12
      },
      {
        "surah": 7,
        "ayah": 13
      },
      {
        "surah": 7,
        "ayah": 14
      },
      {
        "surah": 7,
        "ayah": 15
      },
      {
        "surah": 7,
        "ayah": 16
      },
      {
        "surah": 7,
        "ayah": 17
      },
      {
        "surah": 7,
        "ayah": 18
      },
      {
        "surah": 7,
        "ayah": 19
      },
      {
        "surah": 7,
        "ayah": 20
      },
      {
        "surah": 7,
        "ayah": 21
      },
      {
        "surah": 7,
        "ayah": 22
      }
    ]
  },
  {
    "page": 153,
    "juz": 8,
    "hizb": 16,
    "rub": 61,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 23,
    "endSurah": 7,
    "endAyah": 30,
    "verses": [
      {
        "surah": 7,
        "ayah": 23
      },
      {
        "surah": 7,
        "ayah": 24
      },
      {
        "surah": 7,
        "ayah": 25
      },
      {
        "surah": 7,
        "ayah": 26
      },
      {
        "surah": 7,
        "ayah": 27
      },
      {
        "surah": 7,
        "ayah": 28
      },
      {
        "surah": 7,
        "ayah": 29
      },
      {
        "surah": 7,
        "ayah": 30
      }
    ]
  },
  {
    "page": 154,
    "juz": 8,
    "hizb": 16,
    "rub": 62,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 31,
    "endSurah": 7,
    "endAyah": 37,
    "verses": [
      {
        "surah": 7,
        "ayah": 31
      },
      {
        "surah": 7,
        "ayah": 32
      },
      {
        "surah": 7,
        "ayah": 33
      },
      {
        "surah": 7,
        "ayah": 34
      },
      {
        "surah": 7,
        "ayah": 35
      },
      {
        "surah": 7,
        "ayah": 36
      },
      {
        "surah": 7,
        "ayah": 37
      }
    ]
  },
  {
    "page": 155,
    "juz": 8,
    "hizb": 16,
    "rub": 62,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 38,
    "endSurah": 7,
    "endAyah": 43,
    "verses": [
      {
        "surah": 7,
        "ayah": 38
      },
      {
        "surah": 7,
        "ayah": 39
      },
      {
        "surah": 7,
        "ayah": 40
      },
      {
        "surah": 7,
        "ayah": 41
      },
      {
        "surah": 7,
        "ayah": 42
      },
      {
        "surah": 7,
        "ayah": 43
      }
    ]
  },
  {
    "page": 156,
    "juz": 8,
    "hizb": 16,
    "rub": 62,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 44,
    "endSurah": 7,
    "endAyah": 51,
    "verses": [
      {
        "surah": 7,
        "ayah": 44
      },
      {
        "surah": 7,
        "ayah": 45
      },
      {
        "surah": 7,
        "ayah": 46
      },
      {
        "surah": 7,
        "ayah": 47
      },
      {
        "surah": 7,
        "ayah": 48
      },
      {
        "surah": 7,
        "ayah": 49
      },
      {
        "surah": 7,
        "ayah": 50
      },
      {
        "surah": 7,
        "ayah": 51
      }
    ]
  },
  {
    "page": 157,
    "juz": 8,
    "hizb": 16,
    "rub": 63,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 52,
    "endSurah": 7,
    "endAyah": 57,
    "verses": [
      {
        "surah": 7,
        "ayah": 52
      },
      {
        "surah": 7,
        "ayah": 53
      },
      {
        "surah": 7,
        "ayah": 54
      },
      {
        "surah": 7,
        "ayah": 55
      },
      {
        "surah": 7,
        "ayah": 56
      },
      {
        "surah": 7,
        "ayah": 57
      }
    ]
  },
  {
    "page": 158,
    "juz": 8,
    "hizb": 16,
    "rub": 63,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 58,
    "endSurah": 7,
    "endAyah": 67,
    "verses": [
      {
        "surah": 7,
        "ayah": 58
      },
      {
        "surah": 7,
        "ayah": 59
      },
      {
        "surah": 7,
        "ayah": 60
      },
      {
        "surah": 7,
        "ayah": 61
      },
      {
        "surah": 7,
        "ayah": 62
      },
      {
        "surah": 7,
        "ayah": 63
      },
      {
        "surah": 7,
        "ayah": 64
      },
      {
        "surah": 7,
        "ayah": 65
      },
      {
        "surah": 7,
        "ayah": 66
      },
      {
        "surah": 7,
        "ayah": 67
      }
    ]
  },
  {
    "page": 159,
    "juz": 8,
    "hizb": 16,
    "rub": 64,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 68,
    "endSurah": 7,
    "endAyah": 73,
    "verses": [
      {
        "surah": 7,
        "ayah": 68
      },
      {
        "surah": 7,
        "ayah": 69
      },
      {
        "surah": 7,
        "ayah": 70
      },
      {
        "surah": 7,
        "ayah": 71
      },
      {
        "surah": 7,
        "ayah": 72
      },
      {
        "surah": 7,
        "ayah": 73
      }
    ]
  },
  {
    "page": 160,
    "juz": 8,
    "hizb": 16,
    "rub": 64,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 74,
    "endSurah": 7,
    "endAyah": 81,
    "verses": [
      {
        "surah": 7,
        "ayah": 74
      },
      {
        "surah": 7,
        "ayah": 75
      },
      {
        "surah": 7,
        "ayah": 76
      },
      {
        "surah": 7,
        "ayah": 77
      },
      {
        "surah": 7,
        "ayah": 78
      },
      {
        "surah": 7,
        "ayah": 79
      },
      {
        "surah": 7,
        "ayah": 80
      },
      {
        "surah": 7,
        "ayah": 81
      }
    ]
  },
  {
    "page": 161,
    "juz": 8,
    "hizb": 16,
    "rub": 64,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 82,
    "endSurah": 7,
    "endAyah": 87,
    "verses": [
      {
        "surah": 7,
        "ayah": 82
      },
      {
        "surah": 7,
        "ayah": 83
      },
      {
        "surah": 7,
        "ayah": 84
      },
      {
        "surah": 7,
        "ayah": 85
      },
      {
        "surah": 7,
        "ayah": 86
      },
      {
        "surah": 7,
        "ayah": 87
      }
    ]
  },
  {
    "page": 162,
    "juz": 9,
    "hizb": 17,
    "rub": 65,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 88,
    "endSurah": 7,
    "endAyah": 95,
    "verses": [
      {
        "surah": 7,
        "ayah": 88
      },
      {
        "surah": 7,
        "ayah": 89
      },
      {
        "surah": 7,
        "ayah": 90
      },
      {
        "surah": 7,
        "ayah": 91
      },
      {
        "surah": 7,
        "ayah": 92
      },
      {
        "surah": 7,
        "ayah": 93
      },
      {
        "surah": 7,
        "ayah": 94
      },
      {
        "surah": 7,
        "ayah": 95
      }
    ]
  },
  {
    "page": 163,
    "juz": 9,
    "hizb": 17,
    "rub": 65,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 96,
    "endSurah": 7,
    "endAyah": 104,
    "verses": [
      {
        "surah": 7,
        "ayah": 96
      },
      {
        "surah": 7,
        "ayah": 97
      },
      {
        "surah": 7,
        "ayah": 98
      },
      {
        "surah": 7,
        "ayah": 99
      },
      {
        "surah": 7,
        "ayah": 100
      },
      {
        "surah": 7,
        "ayah": 101
      },
      {
        "surah": 7,
        "ayah": 102
      },
      {
        "surah": 7,
        "ayah": 103
      },
      {
        "surah": 7,
        "ayah": 104
      }
    ]
  },
  {
    "page": 164,
    "juz": 9,
    "hizb": 17,
    "rub": 65,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 105,
    "endSurah": 7,
    "endAyah": 120,
    "verses": [
      {
        "surah": 7,
        "ayah": 105
      },
      {
        "surah": 7,
        "ayah": 106
      },
      {
        "surah": 7,
        "ayah": 107
      },
      {
        "surah": 7,
        "ayah": 108
      },
      {
        "surah": 7,
        "ayah": 109
      },
      {
        "surah": 7,
        "ayah": 110
      },
      {
        "surah": 7,
        "ayah": 111
      },
      {
        "surah": 7,
        "ayah": 112
      },
      {
        "surah": 7,
        "ayah": 113
      },
      {
        "surah": 7,
        "ayah": 114
      },
      {
        "surah": 7,
        "ayah": 115
      },
      {
        "surah": 7,
        "ayah": 116
      },
      {
        "surah": 7,
        "ayah": 117
      },
      {
        "surah": 7,
        "ayah": 118
      },
      {
        "surah": 7,
        "ayah": 119
      },
      {
        "surah": 7,
        "ayah": 120
      }
    ]
  },
  {
    "page": 165,
    "juz": 9,
    "hizb": 17,
    "rub": 66,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 121,
    "endSurah": 7,
    "endAyah": 130,
    "verses": [
      {
        "surah": 7,
        "ayah": 121
      },
      {
        "surah": 7,
        "ayah": 122
      },
      {
        "surah": 7,
        "ayah": 123
      },
      {
        "surah": 7,
        "ayah": 124
      },
      {
        "surah": 7,
        "ayah": 125
      },
      {
        "surah": 7,
        "ayah": 126
      },
      {
        "surah": 7,
        "ayah": 127
      },
      {
        "surah": 7,
        "ayah": 128
      },
      {
        "surah": 7,
        "ayah": 129
      },
      {
        "surah": 7,
        "ayah": 130
      }
    ]
  },
  {
    "page": 166,
    "juz": 9,
    "hizb": 17,
    "rub": 66,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 131,
    "endSurah": 7,
    "endAyah": 137,
    "verses": [
      {
        "surah": 7,
        "ayah": 131
      },
      {
        "surah": 7,
        "ayah": 132
      },
      {
        "surah": 7,
        "ayah": 133
      },
      {
        "surah": 7,
        "ayah": 134
      },
      {
        "surah": 7,
        "ayah": 135
      },
      {
        "surah": 7,
        "ayah": 136
      },
      {
        "surah": 7,
        "ayah": 137
      }
    ]
  },
  {
    "page": 167,
    "juz": 9,
    "hizb": 17,
    "rub": 66,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 138,
    "endSurah": 7,
    "endAyah": 143,
    "verses": [
      {
        "surah": 7,
        "ayah": 138
      },
      {
        "surah": 7,
        "ayah": 139
      },
      {
        "surah": 7,
        "ayah": 140
      },
      {
        "surah": 7,
        "ayah": 141
      },
      {
        "surah": 7,
        "ayah": 142
      },
      {
        "surah": 7,
        "ayah": 143
      }
    ]
  },
  {
    "page": 168,
    "juz": 9,
    "hizb": 17,
    "rub": 67,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 144,
    "endSurah": 7,
    "endAyah": 149,
    "verses": [
      {
        "surah": 7,
        "ayah": 144
      },
      {
        "surah": 7,
        "ayah": 145
      },
      {
        "surah": 7,
        "ayah": 146
      },
      {
        "surah": 7,
        "ayah": 147
      },
      {
        "surah": 7,
        "ayah": 148
      },
      {
        "surah": 7,
        "ayah": 149
      }
    ]
  },
  {
    "page": 169,
    "juz": 9,
    "hizb": 17,
    "rub": 67,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 150,
    "endSurah": 7,
    "endAyah": 155,
    "verses": [
      {
        "surah": 7,
        "ayah": 150
      },
      {
        "surah": 7,
        "ayah": 151
      },
      {
        "surah": 7,
        "ayah": 152
      },
      {
        "surah": 7,
        "ayah": 153
      },
      {
        "surah": 7,
        "ayah": 154
      },
      {
        "surah": 7,
        "ayah": 155
      }
    ]
  },
  {
    "page": 170,
    "juz": 9,
    "hizb": 17,
    "rub": 68,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 156,
    "endSurah": 7,
    "endAyah": 159,
    "verses": [
      {
        "surah": 7,
        "ayah": 156
      },
      {
        "surah": 7,
        "ayah": 157
      },
      {
        "surah": 7,
        "ayah": 158
      },
      {
        "surah": 7,
        "ayah": 159
      }
    ]
  },
  {
    "page": 171,
    "juz": 9,
    "hizb": 17,
    "rub": 68,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 160,
    "endSurah": 7,
    "endAyah": 163,
    "verses": [
      {
        "surah": 7,
        "ayah": 160
      },
      {
        "surah": 7,
        "ayah": 161
      },
      {
        "surah": 7,
        "ayah": 162
      },
      {
        "surah": 7,
        "ayah": 163
      }
    ]
  },
  {
    "page": 172,
    "juz": 9,
    "hizb": 17,
    "rub": 68,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 164,
    "endSurah": 7,
    "endAyah": 170,
    "verses": [
      {
        "surah": 7,
        "ayah": 164
      },
      {
        "surah": 7,
        "ayah": 165
      },
      {
        "surah": 7,
        "ayah": 166
      },
      {
        "surah": 7,
        "ayah": 167
      },
      {
        "surah": 7,
        "ayah": 168
      },
      {
        "surah": 7,
        "ayah": 169
      },
      {
        "surah": 7,
        "ayah": 170
      }
    ]
  },
  {
    "page": 173,
    "juz": 9,
    "hizb": 18,
    "rub": 69,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 171,
    "endSurah": 7,
    "endAyah": 178,
    "verses": [
      {
        "surah": 7,
        "ayah": 171
      },
      {
        "surah": 7,
        "ayah": 172
      },
      {
        "surah": 7,
        "ayah": 173
      },
      {
        "surah": 7,
        "ayah": 174
      },
      {
        "surah": 7,
        "ayah": 175
      },
      {
        "surah": 7,
        "ayah": 176
      },
      {
        "surah": 7,
        "ayah": 177
      },
      {
        "surah": 7,
        "ayah": 178
      }
    ]
  },
  {
    "page": 174,
    "juz": 9,
    "hizb": 18,
    "rub": 69,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 179,
    "endSurah": 7,
    "endAyah": 187,
    "verses": [
      {
        "surah": 7,
        "ayah": 179
      },
      {
        "surah": 7,
        "ayah": 180
      },
      {
        "surah": 7,
        "ayah": 181
      },
      {
        "surah": 7,
        "ayah": 182
      },
      {
        "surah": 7,
        "ayah": 183
      },
      {
        "surah": 7,
        "ayah": 184
      },
      {
        "surah": 7,
        "ayah": 185
      },
      {
        "surah": 7,
        "ayah": 186
      },
      {
        "surah": 7,
        "ayah": 187
      }
    ]
  },
  {
    "page": 175,
    "juz": 9,
    "hizb": 18,
    "rub": 69,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 188,
    "endSurah": 7,
    "endAyah": 195,
    "verses": [
      {
        "surah": 7,
        "ayah": 188
      },
      {
        "surah": 7,
        "ayah": 189
      },
      {
        "surah": 7,
        "ayah": 190
      },
      {
        "surah": 7,
        "ayah": 191
      },
      {
        "surah": 7,
        "ayah": 192
      },
      {
        "surah": 7,
        "ayah": 193
      },
      {
        "surah": 7,
        "ayah": 194
      },
      {
        "surah": 7,
        "ayah": 195
      }
    ]
  },
  {
    "page": 176,
    "juz": 9,
    "hizb": 18,
    "rub": 70,
    "surahs": [
      7
    ],
    "startSurah": 7,
    "startAyah": 196,
    "endSurah": 7,
    "endAyah": 206,
    "verses": [
      {
        "surah": 7,
        "ayah": 196
      },
      {
        "surah": 7,
        "ayah": 197
      },
      {
        "surah": 7,
        "ayah": 198
      },
      {
        "surah": 7,
        "ayah": 199
      },
      {
        "surah": 7,
        "ayah": 200
      },
      {
        "surah": 7,
        "ayah": 201
      },
      {
        "surah": 7,
        "ayah": 202
      },
      {
        "surah": 7,
        "ayah": 203
      },
      {
        "surah": 7,
        "ayah": 204
      },
      {
        "surah": 7,
        "ayah": 205
      },
      {
        "surah": 7,
        "ayah": 206
      }
    ]
  },
  {
    "page": 177,
    "juz": 9,
    "hizb": 18,
    "rub": 71,
    "surahs": [
      8
    ],
    "startSurah": 8,
    "startAyah": 1,
    "endSurah": 8,
    "endAyah": 8,
    "verses": [
      {
        "surah": 8,
        "ayah": 1
      },
      {
        "surah": 8,
        "ayah": 2
      },
      {
        "surah": 8,
        "ayah": 3
      },
      {
        "surah": 8,
        "ayah": 4
      },
      {
        "surah": 8,
        "ayah": 5
      },
      {
        "surah": 8,
        "ayah": 6
      },
      {
        "surah": 8,
        "ayah": 7
      },
      {
        "surah": 8,
        "ayah": 8
      }
    ]
  },
  {
    "page": 178,
    "juz": 9,
    "hizb": 18,
    "rub": 71,
    "surahs": [
      8
    ],
    "startSurah": 8,
    "startAyah": 9,
    "endSurah": 8,
    "endAyah": 16,
    "verses": [
      {
        "surah": 8,
        "ayah": 9
      },
      {
        "surah": 8,
        "ayah": 10
      },
      {
        "surah": 8,
        "ayah": 11
      },
      {
        "surah": 8,
        "ayah": 12
      },
      {
        "surah": 8,
        "ayah": 13
      },
      {
        "surah": 8,
        "ayah": 14
      },
      {
        "surah": 8,
        "ayah": 15
      },
      {
        "surah": 8,
        "ayah": 16
      }
    ]
  },
  {
    "page": 179,
    "juz": 9,
    "hizb": 18,
    "rub": 71,
    "surahs": [
      8
    ],
    "startSurah": 8,
    "startAyah": 17,
    "endSurah": 8,
    "endAyah": 25,
    "verses": [
      {
        "surah": 8,
        "ayah": 17
      },
      {
        "surah": 8,
        "ayah": 18
      },
      {
        "surah": 8,
        "ayah": 19
      },
      {
        "surah": 8,
        "ayah": 20
      },
      {
        "surah": 8,
        "ayah": 21
      },
      {
        "surah": 8,
        "ayah": 22
      },
      {
        "surah": 8,
        "ayah": 23
      },
      {
        "surah": 8,
        "ayah": 24
      },
      {
        "surah": 8,
        "ayah": 25
      }
    ]
  },
  {
    "page": 180,
    "juz": 9,
    "hizb": 18,
    "rub": 72,
    "surahs": [
      8
    ],
    "startSurah": 8,
    "startAyah": 26,
    "endSurah": 8,
    "endAyah": 33,
    "verses": [
      {
        "surah": 8,
        "ayah": 26
      },
      {
        "surah": 8,
        "ayah": 27
      },
      {
        "surah": 8,
        "ayah": 28
      },
      {
        "surah": 8,
        "ayah": 29
      },
      {
        "surah": 8,
        "ayah": 30
      },
      {
        "surah": 8,
        "ayah": 31
      },
      {
        "surah": 8,
        "ayah": 32
      },
      {
        "surah": 8,
        "ayah": 33
      }
    ]
  },
  {
    "page": 181,
    "juz": 9,
    "hizb": 18,
    "rub": 72,
    "surahs": [
      8
    ],
    "startSurah": 8,
    "startAyah": 34,
    "endSurah": 8,
    "endAyah": 40,
    "verses": [
      {
        "surah": 8,
        "ayah": 34
      },
      {
        "surah": 8,
        "ayah": 35
      },
      {
        "surah": 8,
        "ayah": 36
      },
      {
        "surah": 8,
        "ayah": 37
      },
      {
        "surah": 8,
        "ayah": 38
      },
      {
        "surah": 8,
        "ayah": 39
      },
      {
        "surah": 8,
        "ayah": 40
      }
    ]
  },
  {
    "page": 182,
    "juz": 10,
    "hizb": 19,
    "rub": 73,
    "surahs": [
      8
    ],
    "startSurah": 8,
    "startAyah": 41,
    "endSurah": 8,
    "endAyah": 45,
    "verses": [
      {
        "surah": 8,
        "ayah": 41
      },
      {
        "surah": 8,
        "ayah": 42
      },
      {
        "surah": 8,
        "ayah": 43
      },
      {
        "surah": 8,
        "ayah": 44
      },
      {
        "surah": 8,
        "ayah": 45
      }
    ]
  },
  {
    "page": 183,
    "juz": 10,
    "hizb": 19,
    "rub": 73,
    "surahs": [
      8
    ],
    "startSurah": 8,
    "startAyah": 46,
    "endSurah": 8,
    "endAyah": 52,
    "verses": [
      {
        "surah": 8,
        "ayah": 46
      },
      {
        "surah": 8,
        "ayah": 47
      },
      {
        "surah": 8,
        "ayah": 48
      },
      {
        "surah": 8,
        "ayah": 49
      },
      {
        "surah": 8,
        "ayah": 50
      },
      {
        "surah": 8,
        "ayah": 51
      },
      {
        "surah": 8,
        "ayah": 52
      }
    ]
  },
  {
    "page": 184,
    "juz": 10,
    "hizb": 19,
    "rub": 73,
    "surahs": [
      8
    ],
    "startSurah": 8,
    "startAyah": 53,
    "endSurah": 8,
    "endAyah": 61,
    "verses": [
      {
        "surah": 8,
        "ayah": 53
      },
      {
        "surah": 8,
        "ayah": 54
      },
      {
        "surah": 8,
        "ayah": 55
      },
      {
        "surah": 8,
        "ayah": 56
      },
      {
        "surah": 8,
        "ayah": 57
      },
      {
        "surah": 8,
        "ayah": 58
      },
      {
        "surah": 8,
        "ayah": 59
      },
      {
        "surah": 8,
        "ayah": 60
      },
      {
        "surah": 8,
        "ayah": 61
      }
    ]
  },
  {
    "page": 185,
    "juz": 10,
    "hizb": 19,
    "rub": 74,
    "surahs": [
      8
    ],
    "startSurah": 8,
    "startAyah": 62,
    "endSurah": 8,
    "endAyah": 69,
    "verses": [
      {
        "surah": 8,
        "ayah": 62
      },
      {
        "surah": 8,
        "ayah": 63
      },
      {
        "surah": 8,
        "ayah": 64
      },
      {
        "surah": 8,
        "ayah": 65
      },
      {
        "surah": 8,
        "ayah": 66
      },
      {
        "surah": 8,
        "ayah": 67
      },
      {
        "surah": 8,
        "ayah": 68
      },
      {
        "surah": 8,
        "ayah": 69
      }
    ]
  },
  {
    "page": 186,
    "juz": 10,
    "hizb": 19,
    "rub": 74,
    "surahs": [
      8
    ],
    "startSurah": 8,
    "startAyah": 70,
    "endSurah": 8,
    "endAyah": 75,
    "verses": [
      {
        "surah": 8,
        "ayah": 70
      },
      {
        "surah": 8,
        "ayah": 71
      },
      {
        "surah": 8,
        "ayah": 72
      },
      {
        "surah": 8,
        "ayah": 73
      },
      {
        "surah": 8,
        "ayah": 74
      },
      {
        "surah": 8,
        "ayah": 75
      }
    ]
  },
  {
    "page": 187,
    "juz": 10,
    "hizb": 19,
    "rub": 75,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 1,
    "endSurah": 9,
    "endAyah": 6,
    "verses": [
      {
        "surah": 9,
        "ayah": 1
      },
      {
        "surah": 9,
        "ayah": 2
      },
      {
        "surah": 9,
        "ayah": 3
      },
      {
        "surah": 9,
        "ayah": 4
      },
      {
        "surah": 9,
        "ayah": 5
      },
      {
        "surah": 9,
        "ayah": 6
      }
    ]
  },
  {
    "page": 188,
    "juz": 10,
    "hizb": 19,
    "rub": 75,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 7,
    "endSurah": 9,
    "endAyah": 13,
    "verses": [
      {
        "surah": 9,
        "ayah": 7
      },
      {
        "surah": 9,
        "ayah": 8
      },
      {
        "surah": 9,
        "ayah": 9
      },
      {
        "surah": 9,
        "ayah": 10
      },
      {
        "surah": 9,
        "ayah": 11
      },
      {
        "surah": 9,
        "ayah": 12
      },
      {
        "surah": 9,
        "ayah": 13
      }
    ]
  },
  {
    "page": 189,
    "juz": 10,
    "hizb": 19,
    "rub": 75,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 14,
    "endSurah": 9,
    "endAyah": 20,
    "verses": [
      {
        "surah": 9,
        "ayah": 14
      },
      {
        "surah": 9,
        "ayah": 15
      },
      {
        "surah": 9,
        "ayah": 16
      },
      {
        "surah": 9,
        "ayah": 17
      },
      {
        "surah": 9,
        "ayah": 18
      },
      {
        "surah": 9,
        "ayah": 19
      },
      {
        "surah": 9,
        "ayah": 20
      }
    ]
  },
  {
    "page": 190,
    "juz": 10,
    "hizb": 19,
    "rub": 76,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 21,
    "endSurah": 9,
    "endAyah": 26,
    "verses": [
      {
        "surah": 9,
        "ayah": 21
      },
      {
        "surah": 9,
        "ayah": 22
      },
      {
        "surah": 9,
        "ayah": 23
      },
      {
        "surah": 9,
        "ayah": 24
      },
      {
        "surah": 9,
        "ayah": 25
      },
      {
        "surah": 9,
        "ayah": 26
      }
    ]
  },
  {
    "page": 191,
    "juz": 10,
    "hizb": 19,
    "rub": 76,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 27,
    "endSurah": 9,
    "endAyah": 31,
    "verses": [
      {
        "surah": 9,
        "ayah": 27
      },
      {
        "surah": 9,
        "ayah": 28
      },
      {
        "surah": 9,
        "ayah": 29
      },
      {
        "surah": 9,
        "ayah": 30
      },
      {
        "surah": 9,
        "ayah": 31
      }
    ]
  },
  {
    "page": 192,
    "juz": 10,
    "hizb": 19,
    "rub": 76,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 32,
    "endSurah": 9,
    "endAyah": 36,
    "verses": [
      {
        "surah": 9,
        "ayah": 32
      },
      {
        "surah": 9,
        "ayah": 33
      },
      {
        "surah": 9,
        "ayah": 34
      },
      {
        "surah": 9,
        "ayah": 35
      },
      {
        "surah": 9,
        "ayah": 36
      }
    ]
  },
  {
    "page": 193,
    "juz": 10,
    "hizb": 20,
    "rub": 77,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 37,
    "endSurah": 9,
    "endAyah": 40,
    "verses": [
      {
        "surah": 9,
        "ayah": 37
      },
      {
        "surah": 9,
        "ayah": 38
      },
      {
        "surah": 9,
        "ayah": 39
      },
      {
        "surah": 9,
        "ayah": 40
      }
    ]
  },
  {
    "page": 194,
    "juz": 10,
    "hizb": 20,
    "rub": 77,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 41,
    "endSurah": 9,
    "endAyah": 47,
    "verses": [
      {
        "surah": 9,
        "ayah": 41
      },
      {
        "surah": 9,
        "ayah": 42
      },
      {
        "surah": 9,
        "ayah": 43
      },
      {
        "surah": 9,
        "ayah": 44
      },
      {
        "surah": 9,
        "ayah": 45
      },
      {
        "surah": 9,
        "ayah": 46
      },
      {
        "surah": 9,
        "ayah": 47
      }
    ]
  },
  {
    "page": 195,
    "juz": 10,
    "hizb": 20,
    "rub": 78,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 48,
    "endSurah": 9,
    "endAyah": 54,
    "verses": [
      {
        "surah": 9,
        "ayah": 48
      },
      {
        "surah": 9,
        "ayah": 49
      },
      {
        "surah": 9,
        "ayah": 50
      },
      {
        "surah": 9,
        "ayah": 51
      },
      {
        "surah": 9,
        "ayah": 52
      },
      {
        "surah": 9,
        "ayah": 53
      },
      {
        "surah": 9,
        "ayah": 54
      }
    ]
  },
  {
    "page": 196,
    "juz": 10,
    "hizb": 20,
    "rub": 78,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 55,
    "endSurah": 9,
    "endAyah": 61,
    "verses": [
      {
        "surah": 9,
        "ayah": 55
      },
      {
        "surah": 9,
        "ayah": 56
      },
      {
        "surah": 9,
        "ayah": 57
      },
      {
        "surah": 9,
        "ayah": 58
      },
      {
        "surah": 9,
        "ayah": 59
      },
      {
        "surah": 9,
        "ayah": 60
      },
      {
        "surah": 9,
        "ayah": 61
      }
    ]
  },
  {
    "page": 197,
    "juz": 10,
    "hizb": 20,
    "rub": 79,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 62,
    "endSurah": 9,
    "endAyah": 68,
    "verses": [
      {
        "surah": 9,
        "ayah": 62
      },
      {
        "surah": 9,
        "ayah": 63
      },
      {
        "surah": 9,
        "ayah": 64
      },
      {
        "surah": 9,
        "ayah": 65
      },
      {
        "surah": 9,
        "ayah": 66
      },
      {
        "surah": 9,
        "ayah": 67
      },
      {
        "surah": 9,
        "ayah": 68
      }
    ]
  },
  {
    "page": 198,
    "juz": 10,
    "hizb": 20,
    "rub": 79,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 69,
    "endSurah": 9,
    "endAyah": 72,
    "verses": [
      {
        "surah": 9,
        "ayah": 69
      },
      {
        "surah": 9,
        "ayah": 70
      },
      {
        "surah": 9,
        "ayah": 71
      },
      {
        "surah": 9,
        "ayah": 72
      }
    ]
  },
  {
    "page": 199,
    "juz": 10,
    "hizb": 20,
    "rub": 79,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 73,
    "endSurah": 9,
    "endAyah": 79,
    "verses": [
      {
        "surah": 9,
        "ayah": 73
      },
      {
        "surah": 9,
        "ayah": 74
      },
      {
        "surah": 9,
        "ayah": 75
      },
      {
        "surah": 9,
        "ayah": 76
      },
      {
        "surah": 9,
        "ayah": 77
      },
      {
        "surah": 9,
        "ayah": 78
      },
      {
        "surah": 9,
        "ayah": 79
      }
    ]
  },
  {
    "page": 200,
    "juz": 10,
    "hizb": 20,
    "rub": 80,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 80,
    "endSurah": 9,
    "endAyah": 86,
    "verses": [
      {
        "surah": 9,
        "ayah": 80
      },
      {
        "surah": 9,
        "ayah": 81
      },
      {
        "surah": 9,
        "ayah": 82
      },
      {
        "surah": 9,
        "ayah": 83
      },
      {
        "surah": 9,
        "ayah": 84
      },
      {
        "surah": 9,
        "ayah": 85
      },
      {
        "surah": 9,
        "ayah": 86
      }
    ]
  },
  {
    "page": 201,
    "juz": 10,
    "hizb": 20,
    "rub": 80,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 87,
    "endSurah": 9,
    "endAyah": 93,
    "verses": [
      {
        "surah": 9,
        "ayah": 87
      },
      {
        "surah": 9,
        "ayah": 88
      },
      {
        "surah": 9,
        "ayah": 89
      },
      {
        "surah": 9,
        "ayah": 90
      },
      {
        "surah": 9,
        "ayah": 91
      },
      {
        "surah": 9,
        "ayah": 92
      },
      {
        "surah": 9,
        "ayah": 93
      }
    ]
  },
  {
    "page": 202,
    "juz": 11,
    "hizb": 21,
    "rub": 81,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 94,
    "endSurah": 9,
    "endAyah": 99,
    "verses": [
      {
        "surah": 9,
        "ayah": 94
      },
      {
        "surah": 9,
        "ayah": 95
      },
      {
        "surah": 9,
        "ayah": 96
      },
      {
        "surah": 9,
        "ayah": 97
      },
      {
        "surah": 9,
        "ayah": 98
      },
      {
        "surah": 9,
        "ayah": 99
      }
    ]
  },
  {
    "page": 203,
    "juz": 11,
    "hizb": 21,
    "rub": 81,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 100,
    "endSurah": 9,
    "endAyah": 106,
    "verses": [
      {
        "surah": 9,
        "ayah": 100
      },
      {
        "surah": 9,
        "ayah": 101
      },
      {
        "surah": 9,
        "ayah": 102
      },
      {
        "surah": 9,
        "ayah": 103
      },
      {
        "surah": 9,
        "ayah": 104
      },
      {
        "surah": 9,
        "ayah": 105
      },
      {
        "surah": 9,
        "ayah": 106
      }
    ]
  },
  {
    "page": 204,
    "juz": 11,
    "hizb": 21,
    "rub": 81,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 107,
    "endSurah": 9,
    "endAyah": 111,
    "verses": [
      {
        "surah": 9,
        "ayah": 107
      },
      {
        "surah": 9,
        "ayah": 108
      },
      {
        "surah": 9,
        "ayah": 109
      },
      {
        "surah": 9,
        "ayah": 110
      },
      {
        "surah": 9,
        "ayah": 111
      }
    ]
  },
  {
    "page": 205,
    "juz": 11,
    "hizb": 21,
    "rub": 82,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 112,
    "endSurah": 9,
    "endAyah": 117,
    "verses": [
      {
        "surah": 9,
        "ayah": 112
      },
      {
        "surah": 9,
        "ayah": 113
      },
      {
        "surah": 9,
        "ayah": 114
      },
      {
        "surah": 9,
        "ayah": 115
      },
      {
        "surah": 9,
        "ayah": 116
      },
      {
        "surah": 9,
        "ayah": 117
      }
    ]
  },
  {
    "page": 206,
    "juz": 11,
    "hizb": 21,
    "rub": 82,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 118,
    "endSurah": 9,
    "endAyah": 122,
    "verses": [
      {
        "surah": 9,
        "ayah": 118
      },
      {
        "surah": 9,
        "ayah": 119
      },
      {
        "surah": 9,
        "ayah": 120
      },
      {
        "surah": 9,
        "ayah": 121
      },
      {
        "surah": 9,
        "ayah": 122
      }
    ]
  },
  {
    "page": 207,
    "juz": 11,
    "hizb": 21,
    "rub": 83,
    "surahs": [
      9
    ],
    "startSurah": 9,
    "startAyah": 123,
    "endSurah": 9,
    "endAyah": 129,
    "verses": [
      {
        "surah": 9,
        "ayah": 123
      },
      {
        "surah": 9,
        "ayah": 124
      },
      {
        "surah": 9,
        "ayah": 125
      },
      {
        "surah": 9,
        "ayah": 126
      },
      {
        "surah": 9,
        "ayah": 127
      },
      {
        "surah": 9,
        "ayah": 128
      },
      {
        "surah": 9,
        "ayah": 129
      }
    ]
  },
  {
    "page": 208,
    "juz": 11,
    "hizb": 21,
    "rub": 83,
    "surahs": [
      10
    ],
    "startSurah": 10,
    "startAyah": 1,
    "endSurah": 10,
    "endAyah": 6,
    "verses": [
      {
        "surah": 10,
        "ayah": 1
      },
      {
        "surah": 10,
        "ayah": 2
      },
      {
        "surah": 10,
        "ayah": 3
      },
      {
        "surah": 10,
        "ayah": 4
      },
      {
        "surah": 10,
        "ayah": 5
      },
      {
        "surah": 10,
        "ayah": 6
      }
    ]
  },
  {
    "page": 209,
    "juz": 11,
    "hizb": 21,
    "rub": 83,
    "surahs": [
      10
    ],
    "startSurah": 10,
    "startAyah": 7,
    "endSurah": 10,
    "endAyah": 14,
    "verses": [
      {
        "surah": 10,
        "ayah": 7
      },
      {
        "surah": 10,
        "ayah": 8
      },
      {
        "surah": 10,
        "ayah": 9
      },
      {
        "surah": 10,
        "ayah": 10
      },
      {
        "surah": 10,
        "ayah": 11
      },
      {
        "surah": 10,
        "ayah": 12
      },
      {
        "surah": 10,
        "ayah": 13
      },
      {
        "surah": 10,
        "ayah": 14
      }
    ]
  },
  {
    "page": 210,
    "juz": 11,
    "hizb": 21,
    "rub": 84,
    "surahs": [
      10
    ],
    "startSurah": 10,
    "startAyah": 15,
    "endSurah": 10,
    "endAyah": 20,
    "verses": [
      {
        "surah": 10,
        "ayah": 15
      },
      {
        "surah": 10,
        "ayah": 16
      },
      {
        "surah": 10,
        "ayah": 17
      },
      {
        "surah": 10,
        "ayah": 18
      },
      {
        "surah": 10,
        "ayah": 19
      },
      {
        "surah": 10,
        "ayah": 20
      }
    ]
  },
  {
    "page": 211,
    "juz": 11,
    "hizb": 21,
    "rub": 84,
    "surahs": [
      10
    ],
    "startSurah": 10,
    "startAyah": 21,
    "endSurah": 10,
    "endAyah": 25,
    "verses": [
      {
        "surah": 10,
        "ayah": 21
      },
      {
        "surah": 10,
        "ayah": 22
      },
      {
        "surah": 10,
        "ayah": 23
      },
      {
        "surah": 10,
        "ayah": 24
      },
      {
        "surah": 10,
        "ayah": 25
      }
    ]
  },
  {
    "page": 212,
    "juz": 11,
    "hizb": 22,
    "rub": 85,
    "surahs": [
      10
    ],
    "startSurah": 10,
    "startAyah": 26,
    "endSurah": 10,
    "endAyah": 33,
    "verses": [
      {
        "surah": 10,
        "ayah": 26
      },
      {
        "surah": 10,
        "ayah": 27
      },
      {
        "surah": 10,
        "ayah": 28
      },
      {
        "surah": 10,
        "ayah": 29
      },
      {
        "surah": 10,
        "ayah": 30
      },
      {
        "surah": 10,
        "ayah": 31
      },
      {
        "surah": 10,
        "ayah": 32
      },
      {
        "surah": 10,
        "ayah": 33
      }
    ]
  },
  {
    "page": 213,
    "juz": 11,
    "hizb": 22,
    "rub": 85,
    "surahs": [
      10
    ],
    "startSurah": 10,
    "startAyah": 34,
    "endSurah": 10,
    "endAyah": 42,
    "verses": [
      {
        "surah": 10,
        "ayah": 34
      },
      {
        "surah": 10,
        "ayah": 35
      },
      {
        "surah": 10,
        "ayah": 36
      },
      {
        "surah": 10,
        "ayah": 37
      },
      {
        "surah": 10,
        "ayah": 38
      },
      {
        "surah": 10,
        "ayah": 39
      },
      {
        "surah": 10,
        "ayah": 40
      },
      {
        "surah": 10,
        "ayah": 41
      },
      {
        "surah": 10,
        "ayah": 42
      }
    ]
  },
  {
    "page": 214,
    "juz": 11,
    "hizb": 22,
    "rub": 85,
    "surahs": [
      10
    ],
    "startSurah": 10,
    "startAyah": 43,
    "endSurah": 10,
    "endAyah": 53,
    "verses": [
      {
        "surah": 10,
        "ayah": 43
      },
      {
        "surah": 10,
        "ayah": 44
      },
      {
        "surah": 10,
        "ayah": 45
      },
      {
        "surah": 10,
        "ayah": 46
      },
      {
        "surah": 10,
        "ayah": 47
      },
      {
        "surah": 10,
        "ayah": 48
      },
      {
        "surah": 10,
        "ayah": 49
      },
      {
        "surah": 10,
        "ayah": 50
      },
      {
        "surah": 10,
        "ayah": 51
      },
      {
        "surah": 10,
        "ayah": 52
      },
      {
        "surah": 10,
        "ayah": 53
      }
    ]
  },
  {
    "page": 215,
    "juz": 11,
    "hizb": 22,
    "rub": 86,
    "surahs": [
      10
    ],
    "startSurah": 10,
    "startAyah": 54,
    "endSurah": 10,
    "endAyah": 61,
    "verses": [
      {
        "surah": 10,
        "ayah": 54
      },
      {
        "surah": 10,
        "ayah": 55
      },
      {
        "surah": 10,
        "ayah": 56
      },
      {
        "surah": 10,
        "ayah": 57
      },
      {
        "surah": 10,
        "ayah": 58
      },
      {
        "surah": 10,
        "ayah": 59
      },
      {
        "surah": 10,
        "ayah": 60
      },
      {
        "surah": 10,
        "ayah": 61
      }
    ]
  },
  {
    "page": 216,
    "juz": 11,
    "hizb": 22,
    "rub": 86,
    "surahs": [
      10
    ],
    "startSurah": 10,
    "startAyah": 62,
    "endSurah": 10,
    "endAyah": 70,
    "verses": [
      {
        "surah": 10,
        "ayah": 62
      },
      {
        "surah": 10,
        "ayah": 63
      },
      {
        "surah": 10,
        "ayah": 64
      },
      {
        "surah": 10,
        "ayah": 65
      },
      {
        "surah": 10,
        "ayah": 66
      },
      {
        "surah": 10,
        "ayah": 67
      },
      {
        "surah": 10,
        "ayah": 68
      },
      {
        "surah": 10,
        "ayah": 69
      },
      {
        "surah": 10,
        "ayah": 70
      }
    ]
  },
  {
    "page": 217,
    "juz": 11,
    "hizb": 22,
    "rub": 87,
    "surahs": [
      10
    ],
    "startSurah": 10,
    "startAyah": 71,
    "endSurah": 10,
    "endAyah": 78,
    "verses": [
      {
        "surah": 10,
        "ayah": 71
      },
      {
        "surah": 10,
        "ayah": 72
      },
      {
        "surah": 10,
        "ayah": 73
      },
      {
        "surah": 10,
        "ayah": 74
      },
      {
        "surah": 10,
        "ayah": 75
      },
      {
        "surah": 10,
        "ayah": 76
      },
      {
        "surah": 10,
        "ayah": 77
      },
      {
        "surah": 10,
        "ayah": 78
      }
    ]
  },
  {
    "page": 218,
    "juz": 11,
    "hizb": 22,
    "rub": 87,
    "surahs": [
      10
    ],
    "startSurah": 10,
    "startAyah": 79,
    "endSurah": 10,
    "endAyah": 88,
    "verses": [
      {
        "surah": 10,
        "ayah": 79
      },
      {
        "surah": 10,
        "ayah": 80
      },
      {
        "surah": 10,
        "ayah": 81
      },
      {
        "surah": 10,
        "ayah": 82
      },
      {
        "surah": 10,
        "ayah": 83
      },
      {
        "surah": 10,
        "ayah": 84
      },
      {
        "surah": 10,
        "ayah": 85
      },
      {
        "surah": 10,
        "ayah": 86
      },
      {
        "surah": 10,
        "ayah": 87
      },
      {
        "surah": 10,
        "ayah": 88
      }
    ]
  },
  {
    "page": 219,
    "juz": 11,
    "hizb": 22,
    "rub": 87,
    "surahs": [
      10
    ],
    "startSurah": 10,
    "startAyah": 89,
    "endSurah": 10,
    "endAyah": 97,
    "verses": [
      {
        "surah": 10,
        "ayah": 89
      },
      {
        "surah": 10,
        "ayah": 90
      },
      {
        "surah": 10,
        "ayah": 91
      },
      {
        "surah": 10,
        "ayah": 92
      },
      {
        "surah": 10,
        "ayah": 93
      },
      {
        "surah": 10,
        "ayah": 94
      },
      {
        "surah": 10,
        "ayah": 95
      },
      {
        "surah": 10,
        "ayah": 96
      },
      {
        "surah": 10,
        "ayah": 97
      }
    ]
  },
  {
    "page": 220,
    "juz": 11,
    "hizb": 22,
    "rub": 88,
    "surahs": [
      10
    ],
    "startSurah": 10,
    "startAyah": 98,
    "endSurah": 10,
    "endAyah": 106,
    "verses": [
      {
        "surah": 10,
        "ayah": 98
      },
      {
        "surah": 10,
        "ayah": 99
      },
      {
        "surah": 10,
        "ayah": 100
      },
      {
        "surah": 10,
        "ayah": 101
      },
      {
        "surah": 10,
        "ayah": 102
      },
      {
        "surah": 10,
        "ayah": 103
      },
      {
        "surah": 10,
        "ayah": 104
      },
      {
        "surah": 10,
        "ayah": 105
      },
      {
        "surah": 10,
        "ayah": 106
      }
    ]
  },
  {
    "page": 221,
    "juz": 11,
    "hizb": 22,
    "rub": 88,
    "surahs": [
      10,
      11
    ],
    "startSurah": 10,
    "startAyah": 107,
    "endSurah": 11,
    "endAyah": 5,
    "verses": [
      {
        "surah": 10,
        "ayah": 107
      },
      {
        "surah": 10,
        "ayah": 108
      },
      {
        "surah": 10,
        "ayah": 109
      },
      {
        "surah": 11,
        "ayah": 1
      },
      {
        "surah": 11,
        "ayah": 2
      },
      {
        "surah": 11,
        "ayah": 3
      },
      {
        "surah": 11,
        "ayah": 4
      },
      {
        "surah": 11,
        "ayah": 5
      }
    ]
  },
  {
    "page": 222,
    "juz": 12,
    "hizb": 23,
    "rub": 89,
    "surahs": [
      11
    ],
    "startSurah": 11,
    "startAyah": 6,
    "endSurah": 11,
    "endAyah": 12,
    "verses": [
      {
        "surah": 11,
        "ayah": 6
      },
      {
        "surah": 11,
        "ayah": 7
      },
      {
        "surah": 11,
        "ayah": 8
      },
      {
        "surah": 11,
        "ayah": 9
      },
      {
        "surah": 11,
        "ayah": 10
      },
      {
        "surah": 11,
        "ayah": 11
      },
      {
        "surah": 11,
        "ayah": 12
      }
    ]
  },
  {
    "page": 223,
    "juz": 12,
    "hizb": 23,
    "rub": 89,
    "surahs": [
      11
    ],
    "startSurah": 11,
    "startAyah": 13,
    "endSurah": 11,
    "endAyah": 19,
    "verses": [
      {
        "surah": 11,
        "ayah": 13
      },
      {
        "surah": 11,
        "ayah": 14
      },
      {
        "surah": 11,
        "ayah": 15
      },
      {
        "surah": 11,
        "ayah": 16
      },
      {
        "surah": 11,
        "ayah": 17
      },
      {
        "surah": 11,
        "ayah": 18
      },
      {
        "surah": 11,
        "ayah": 19
      }
    ]
  },
  {
    "page": 224,
    "juz": 12,
    "hizb": 23,
    "rub": 89,
    "surahs": [
      11
    ],
    "startSurah": 11,
    "startAyah": 20,
    "endSurah": 11,
    "endAyah": 28,
    "verses": [
      {
        "surah": 11,
        "ayah": 20
      },
      {
        "surah": 11,
        "ayah": 21
      },
      {
        "surah": 11,
        "ayah": 22
      },
      {
        "surah": 11,
        "ayah": 23
      },
      {
        "surah": 11,
        "ayah": 24
      },
      {
        "surah": 11,
        "ayah": 25
      },
      {
        "surah": 11,
        "ayah": 26
      },
      {
        "surah": 11,
        "ayah": 27
      },
      {
        "surah": 11,
        "ayah": 28
      }
    ]
  },
  {
    "page": 225,
    "juz": 12,
    "hizb": 23,
    "rub": 90,
    "surahs": [
      11
    ],
    "startSurah": 11,
    "startAyah": 29,
    "endSurah": 11,
    "endAyah": 37,
    "verses": [
      {
        "surah": 11,
        "ayah": 29
      },
      {
        "surah": 11,
        "ayah": 30
      },
      {
        "surah": 11,
        "ayah": 31
      },
      {
        "surah": 11,
        "ayah": 32
      },
      {
        "surah": 11,
        "ayah": 33
      },
      {
        "surah": 11,
        "ayah": 34
      },
      {
        "surah": 11,
        "ayah": 35
      },
      {
        "surah": 11,
        "ayah": 36
      },
      {
        "surah": 11,
        "ayah": 37
      }
    ]
  },
  {
    "page": 226,
    "juz": 12,
    "hizb": 23,
    "rub": 90,
    "surahs": [
      11
    ],
    "startSurah": 11,
    "startAyah": 38,
    "endSurah": 11,
    "endAyah": 45,
    "verses": [
      {
        "surah": 11,
        "ayah": 38
      },
      {
        "surah": 11,
        "ayah": 39
      },
      {
        "surah": 11,
        "ayah": 40
      },
      {
        "surah": 11,
        "ayah": 41
      },
      {
        "surah": 11,
        "ayah": 42
      },
      {
        "surah": 11,
        "ayah": 43
      },
      {
        "surah": 11,
        "ayah": 44
      },
      {
        "surah": 11,
        "ayah": 45
      }
    ]
  },
  {
    "page": 227,
    "juz": 12,
    "hizb": 23,
    "rub": 91,
    "surahs": [
      11
    ],
    "startSurah": 11,
    "startAyah": 46,
    "endSurah": 11,
    "endAyah": 53,
    "verses": [
      {
        "surah": 11,
        "ayah": 46
      },
      {
        "surah": 11,
        "ayah": 47
      },
      {
        "surah": 11,
        "ayah": 48
      },
      {
        "surah": 11,
        "ayah": 49
      },
      {
        "surah": 11,
        "ayah": 50
      },
      {
        "surah": 11,
        "ayah": 51
      },
      {
        "surah": 11,
        "ayah": 52
      },
      {
        "surah": 11,
        "ayah": 53
      }
    ]
  },
  {
    "page": 228,
    "juz": 12,
    "hizb": 23,
    "rub": 91,
    "surahs": [
      11
    ],
    "startSurah": 11,
    "startAyah": 54,
    "endSurah": 11,
    "endAyah": 62,
    "verses": [
      {
        "surah": 11,
        "ayah": 54
      },
      {
        "surah": 11,
        "ayah": 55
      },
      {
        "surah": 11,
        "ayah": 56
      },
      {
        "surah": 11,
        "ayah": 57
      },
      {
        "surah": 11,
        "ayah": 58
      },
      {
        "surah": 11,
        "ayah": 59
      },
      {
        "surah": 11,
        "ayah": 60
      },
      {
        "surah": 11,
        "ayah": 61
      },
      {
        "surah": 11,
        "ayah": 62
      }
    ]
  },
  {
    "page": 229,
    "juz": 12,
    "hizb": 23,
    "rub": 92,
    "surahs": [
      11
    ],
    "startSurah": 11,
    "startAyah": 63,
    "endSurah": 11,
    "endAyah": 71,
    "verses": [
      {
        "surah": 11,
        "ayah": 63
      },
      {
        "surah": 11,
        "ayah": 64
      },
      {
        "surah": 11,
        "ayah": 65
      },
      {
        "surah": 11,
        "ayah": 66
      },
      {
        "surah": 11,
        "ayah": 67
      },
      {
        "surah": 11,
        "ayah": 68
      },
      {
        "surah": 11,
        "ayah": 69
      },
      {
        "surah": 11,
        "ayah": 70
      },
      {
        "surah": 11,
        "ayah": 71
      }
    ]
  },
  {
    "page": 230,
    "juz": 12,
    "hizb": 23,
    "rub": 92,
    "surahs": [
      11
    ],
    "startSurah": 11,
    "startAyah": 72,
    "endSurah": 11,
    "endAyah": 81,
    "verses": [
      {
        "surah": 11,
        "ayah": 72
      },
      {
        "surah": 11,
        "ayah": 73
      },
      {
        "surah": 11,
        "ayah": 74
      },
      {
        "surah": 11,
        "ayah": 75
      },
      {
        "surah": 11,
        "ayah": 76
      },
      {
        "surah": 11,
        "ayah": 77
      },
      {
        "surah": 11,
        "ayah": 78
      },
      {
        "surah": 11,
        "ayah": 79
      },
      {
        "surah": 11,
        "ayah": 80
      },
      {
        "surah": 11,
        "ayah": 81
      }
    ]
  },
  {
    "page": 231,
    "juz": 12,
    "hizb": 23,
    "rub": 92,
    "surahs": [
      11
    ],
    "startSurah": 11,
    "startAyah": 82,
    "endSurah": 11,
    "endAyah": 88,
    "verses": [
      {
        "surah": 11,
        "ayah": 82
      },
      {
        "surah": 11,
        "ayah": 83
      },
      {
        "surah": 11,
        "ayah": 84
      },
      {
        "surah": 11,
        "ayah": 85
      },
      {
        "surah": 11,
        "ayah": 86
      },
      {
        "surah": 11,
        "ayah": 87
      },
      {
        "surah": 11,
        "ayah": 88
      }
    ]
  },
  {
    "page": 232,
    "juz": 12,
    "hizb": 24,
    "rub": 93,
    "surahs": [
      11
    ],
    "startSurah": 11,
    "startAyah": 89,
    "endSurah": 11,
    "endAyah": 97,
    "verses": [
      {
        "surah": 11,
        "ayah": 89
      },
      {
        "surah": 11,
        "ayah": 90
      },
      {
        "surah": 11,
        "ayah": 91
      },
      {
        "surah": 11,
        "ayah": 92
      },
      {
        "surah": 11,
        "ayah": 93
      },
      {
        "surah": 11,
        "ayah": 94
      },
      {
        "surah": 11,
        "ayah": 95
      },
      {
        "surah": 11,
        "ayah": 96
      },
      {
        "surah": 11,
        "ayah": 97
      }
    ]
  },
  {
    "page": 233,
    "juz": 12,
    "hizb": 24,
    "rub": 93,
    "surahs": [
      11
    ],
    "startSurah": 11,
    "startAyah": 98,
    "endSurah": 11,
    "endAyah": 108,
    "verses": [
      {
        "surah": 11,
        "ayah": 98
      },
      {
        "surah": 11,
        "ayah": 99
      },
      {
        "surah": 11,
        "ayah": 100
      },
      {
        "surah": 11,
        "ayah": 101
      },
      {
        "surah": 11,
        "ayah": 102
      },
      {
        "surah": 11,
        "ayah": 103
      },
      {
        "surah": 11,
        "ayah": 104
      },
      {
        "surah": 11,
        "ayah": 105
      },
      {
        "surah": 11,
        "ayah": 106
      },
      {
        "surah": 11,
        "ayah": 107
      },
      {
        "surah": 11,
        "ayah": 108
      }
    ]
  },
  {
    "page": 234,
    "juz": 12,
    "hizb": 24,
    "rub": 94,
    "surahs": [
      11
    ],
    "startSurah": 11,
    "startAyah": 109,
    "endSurah": 11,
    "endAyah": 117,
    "verses": [
      {
        "surah": 11,
        "ayah": 109
      },
      {
        "surah": 11,
        "ayah": 110
      },
      {
        "surah": 11,
        "ayah": 111
      },
      {
        "surah": 11,
        "ayah": 112
      },
      {
        "surah": 11,
        "ayah": 113
      },
      {
        "surah": 11,
        "ayah": 114
      },
      {
        "surah": 11,
        "ayah": 115
      },
      {
        "surah": 11,
        "ayah": 116
      },
      {
        "surah": 11,
        "ayah": 117
      }
    ]
  },
  {
    "page": 235,
    "juz": 12,
    "hizb": 24,
    "rub": 94,
    "surahs": [
      11,
      12
    ],
    "startSurah": 11,
    "startAyah": 118,
    "endSurah": 12,
    "endAyah": 4,
    "verses": [
      {
        "surah": 11,
        "ayah": 118
      },
      {
        "surah": 11,
        "ayah": 119
      },
      {
        "surah": 11,
        "ayah": 120
      },
      {
        "surah": 11,
        "ayah": 121
      },
      {
        "surah": 11,
        "ayah": 122
      },
      {
        "surah": 11,
        "ayah": 123
      },
      {
        "surah": 12,
        "ayah": 1
      },
      {
        "surah": 12,
        "ayah": 2
      },
      {
        "surah": 12,
        "ayah": 3
      },
      {
        "surah": 12,
        "ayah": 4
      }
    ]
  },
  {
    "page": 236,
    "juz": 12,
    "hizb": 24,
    "rub": 94,
    "surahs": [
      12
    ],
    "startSurah": 12,
    "startAyah": 5,
    "endSurah": 12,
    "endAyah": 14,
    "verses": [
      {
        "surah": 12,
        "ayah": 5
      },
      {
        "surah": 12,
        "ayah": 6
      },
      {
        "surah": 12,
        "ayah": 7
      },
      {
        "surah": 12,
        "ayah": 8
      },
      {
        "surah": 12,
        "ayah": 9
      },
      {
        "surah": 12,
        "ayah": 10
      },
      {
        "surah": 12,
        "ayah": 11
      },
      {
        "surah": 12,
        "ayah": 12
      },
      {
        "surah": 12,
        "ayah": 13
      },
      {
        "surah": 12,
        "ayah": 14
      }
    ]
  },
  {
    "page": 237,
    "juz": 12,
    "hizb": 24,
    "rub": 95,
    "surahs": [
      12
    ],
    "startSurah": 12,
    "startAyah": 15,
    "endSurah": 12,
    "endAyah": 22,
    "verses": [
      {
        "surah": 12,
        "ayah": 15
      },
      {
        "surah": 12,
        "ayah": 16
      },
      {
        "surah": 12,
        "ayah": 17
      },
      {
        "surah": 12,
        "ayah": 18
      },
      {
        "surah": 12,
        "ayah": 19
      },
      {
        "surah": 12,
        "ayah": 20
      },
      {
        "surah": 12,
        "ayah": 21
      },
      {
        "surah": 12,
        "ayah": 22
      }
    ]
  },
  {
    "page": 238,
    "juz": 12,
    "hizb": 24,
    "rub": 95,
    "surahs": [
      12
    ],
    "startSurah": 12,
    "startAyah": 23,
    "endSurah": 12,
    "endAyah": 30,
    "verses": [
      {
        "surah": 12,
        "ayah": 23
      },
      {
        "surah": 12,
        "ayah": 24
      },
      {
        "surah": 12,
        "ayah": 25
      },
      {
        "surah": 12,
        "ayah": 26
      },
      {
        "surah": 12,
        "ayah": 27
      },
      {
        "surah": 12,
        "ayah": 28
      },
      {
        "surah": 12,
        "ayah": 29
      },
      {
        "surah": 12,
        "ayah": 30
      }
    ]
  },
  {
    "page": 239,
    "juz": 12,
    "hizb": 24,
    "rub": 96,
    "surahs": [
      12
    ],
    "startSurah": 12,
    "startAyah": 31,
    "endSurah": 12,
    "endAyah": 37,
    "verses": [
      {
        "surah": 12,
        "ayah": 31
      },
      {
        "surah": 12,
        "ayah": 32
      },
      {
        "surah": 12,
        "ayah": 33
      },
      {
        "surah": 12,
        "ayah": 34
      },
      {
        "surah": 12,
        "ayah": 35
      },
      {
        "surah": 12,
        "ayah": 36
      },
      {
        "surah": 12,
        "ayah": 37
      }
    ]
  },
  {
    "page": 240,
    "juz": 12,
    "hizb": 24,
    "rub": 96,
    "surahs": [
      12
    ],
    "startSurah": 12,
    "startAyah": 38,
    "endSurah": 12,
    "endAyah": 43,
    "verses": [
      {
        "surah": 12,
        "ayah": 38
      },
      {
        "surah": 12,
        "ayah": 39
      },
      {
        "surah": 12,
        "ayah": 40
      },
      {
        "surah": 12,
        "ayah": 41
      },
      {
        "surah": 12,
        "ayah": 42
      },
      {
        "surah": 12,
        "ayah": 43
      }
    ]
  },
  {
    "page": 241,
    "juz": 12,
    "hizb": 24,
    "rub": 96,
    "surahs": [
      12
    ],
    "startSurah": 12,
    "startAyah": 44,
    "endSurah": 12,
    "endAyah": 52,
    "verses": [
      {
        "surah": 12,
        "ayah": 44
      },
      {
        "surah": 12,
        "ayah": 45
      },
      {
        "surah": 12,
        "ayah": 46
      },
      {
        "surah": 12,
        "ayah": 47
      },
      {
        "surah": 12,
        "ayah": 48
      },
      {
        "surah": 12,
        "ayah": 49
      },
      {
        "surah": 12,
        "ayah": 50
      },
      {
        "surah": 12,
        "ayah": 51
      },
      {
        "surah": 12,
        "ayah": 52
      }
    ]
  },
  {
    "page": 242,
    "juz": 13,
    "hizb": 25,
    "rub": 97,
    "surahs": [
      12
    ],
    "startSurah": 12,
    "startAyah": 53,
    "endSurah": 12,
    "endAyah": 63,
    "verses": [
      {
        "surah": 12,
        "ayah": 53
      },
      {
        "surah": 12,
        "ayah": 54
      },
      {
        "surah": 12,
        "ayah": 55
      },
      {
        "surah": 12,
        "ayah": 56
      },
      {
        "surah": 12,
        "ayah": 57
      },
      {
        "surah": 12,
        "ayah": 58
      },
      {
        "surah": 12,
        "ayah": 59
      },
      {
        "surah": 12,
        "ayah": 60
      },
      {
        "surah": 12,
        "ayah": 61
      },
      {
        "surah": 12,
        "ayah": 62
      },
      {
        "surah": 12,
        "ayah": 63
      }
    ]
  },
  {
    "page": 243,
    "juz": 13,
    "hizb": 25,
    "rub": 97,
    "surahs": [
      12
    ],
    "startSurah": 12,
    "startAyah": 64,
    "endSurah": 12,
    "endAyah": 69,
    "verses": [
      {
        "surah": 12,
        "ayah": 64
      },
      {
        "surah": 12,
        "ayah": 65
      },
      {
        "surah": 12,
        "ayah": 66
      },
      {
        "surah": 12,
        "ayah": 67
      },
      {
        "surah": 12,
        "ayah": 68
      },
      {
        "surah": 12,
        "ayah": 69
      }
    ]
  },
  {
    "page": 244,
    "juz": 13,
    "hizb": 25,
    "rub": 97,
    "surahs": [
      12
    ],
    "startSurah": 12,
    "startAyah": 70,
    "endSurah": 12,
    "endAyah": 78,
    "verses": [
      {
        "surah": 12,
        "ayah": 70
      },
      {
        "surah": 12,
        "ayah": 71
      },
      {
        "surah": 12,
        "ayah": 72
      },
      {
        "surah": 12,
        "ayah": 73
      },
      {
        "surah": 12,
        "ayah": 74
      },
      {
        "surah": 12,
        "ayah": 75
      },
      {
        "surah": 12,
        "ayah": 76
      },
      {
        "surah": 12,
        "ayah": 77
      },
      {
        "surah": 12,
        "ayah": 78
      }
    ]
  },
  {
    "page": 245,
    "juz": 13,
    "hizb": 25,
    "rub": 98,
    "surahs": [
      12
    ],
    "startSurah": 12,
    "startAyah": 79,
    "endSurah": 12,
    "endAyah": 86,
    "verses": [
      {
        "surah": 12,
        "ayah": 79
      },
      {
        "surah": 12,
        "ayah": 80
      },
      {
        "surah": 12,
        "ayah": 81
      },
      {
        "surah": 12,
        "ayah": 82
      },
      {
        "surah": 12,
        "ayah": 83
      },
      {
        "surah": 12,
        "ayah": 84
      },
      {
        "surah": 12,
        "ayah": 85
      },
      {
        "surah": 12,
        "ayah": 86
      }
    ]
  },
  {
    "page": 246,
    "juz": 13,
    "hizb": 25,
    "rub": 98,
    "surahs": [
      12
    ],
    "startSurah": 12,
    "startAyah": 87,
    "endSurah": 12,
    "endAyah": 95,
    "verses": [
      {
        "surah": 12,
        "ayah": 87
      },
      {
        "surah": 12,
        "ayah": 88
      },
      {
        "surah": 12,
        "ayah": 89
      },
      {
        "surah": 12,
        "ayah": 90
      },
      {
        "surah": 12,
        "ayah": 91
      },
      {
        "surah": 12,
        "ayah": 92
      },
      {
        "surah": 12,
        "ayah": 93
      },
      {
        "surah": 12,
        "ayah": 94
      },
      {
        "surah": 12,
        "ayah": 95
      }
    ]
  },
  {
    "page": 247,
    "juz": 13,
    "hizb": 25,
    "rub": 98,
    "surahs": [
      12
    ],
    "startSurah": 12,
    "startAyah": 96,
    "endSurah": 12,
    "endAyah": 103,
    "verses": [
      {
        "surah": 12,
        "ayah": 96
      },
      {
        "surah": 12,
        "ayah": 97
      },
      {
        "surah": 12,
        "ayah": 98
      },
      {
        "surah": 12,
        "ayah": 99
      },
      {
        "surah": 12,
        "ayah": 100
      },
      {
        "surah": 12,
        "ayah": 101
      },
      {
        "surah": 12,
        "ayah": 102
      },
      {
        "surah": 12,
        "ayah": 103
      }
    ]
  },
  {
    "page": 248,
    "juz": 13,
    "hizb": 25,
    "rub": 99,
    "surahs": [
      12
    ],
    "startSurah": 12,
    "startAyah": 104,
    "endSurah": 12,
    "endAyah": 111,
    "verses": [
      {
        "surah": 12,
        "ayah": 104
      },
      {
        "surah": 12,
        "ayah": 105
      },
      {
        "surah": 12,
        "ayah": 106
      },
      {
        "surah": 12,
        "ayah": 107
      },
      {
        "surah": 12,
        "ayah": 108
      },
      {
        "surah": 12,
        "ayah": 109
      },
      {
        "surah": 12,
        "ayah": 110
      },
      {
        "surah": 12,
        "ayah": 111
      }
    ]
  },
  {
    "page": 249,
    "juz": 13,
    "hizb": 25,
    "rub": 99,
    "surahs": [
      13
    ],
    "startSurah": 13,
    "startAyah": 1,
    "endSurah": 13,
    "endAyah": 5,
    "verses": [
      {
        "surah": 13,
        "ayah": 1
      },
      {
        "surah": 13,
        "ayah": 2
      },
      {
        "surah": 13,
        "ayah": 3
      },
      {
        "surah": 13,
        "ayah": 4
      },
      {
        "surah": 13,
        "ayah": 5
      }
    ]
  },
  {
    "page": 250,
    "juz": 13,
    "hizb": 25,
    "rub": 100,
    "surahs": [
      13
    ],
    "startSurah": 13,
    "startAyah": 6,
    "endSurah": 13,
    "endAyah": 13,
    "verses": [
      {
        "surah": 13,
        "ayah": 6
      },
      {
        "surah": 13,
        "ayah": 7
      },
      {
        "surah": 13,
        "ayah": 8
      },
      {
        "surah": 13,
        "ayah": 9
      },
      {
        "surah": 13,
        "ayah": 10
      },
      {
        "surah": 13,
        "ayah": 11
      },
      {
        "surah": 13,
        "ayah": 12
      },
      {
        "surah": 13,
        "ayah": 13
      }
    ]
  },
  {
    "page": 251,
    "juz": 13,
    "hizb": 25,
    "rub": 100,
    "surahs": [
      13
    ],
    "startSurah": 13,
    "startAyah": 14,
    "endSurah": 13,
    "endAyah": 18,
    "verses": [
      {
        "surah": 13,
        "ayah": 14
      },
      {
        "surah": 13,
        "ayah": 15
      },
      {
        "surah": 13,
        "ayah": 16
      },
      {
        "surah": 13,
        "ayah": 17
      },
      {
        "surah": 13,
        "ayah": 18
      }
    ]
  },
  {
    "page": 252,
    "juz": 13,
    "hizb": 26,
    "rub": 101,
    "surahs": [
      13
    ],
    "startSurah": 13,
    "startAyah": 19,
    "endSurah": 13,
    "endAyah": 28,
    "verses": [
      {
        "surah": 13,
        "ayah": 19
      },
      {
        "surah": 13,
        "ayah": 20
      },
      {
        "surah": 13,
        "ayah": 21
      },
      {
        "surah": 13,
        "ayah": 22
      },
      {
        "surah": 13,
        "ayah": 23
      },
      {
        "surah": 13,
        "ayah": 24
      },
      {
        "surah": 13,
        "ayah": 25
      },
      {
        "surah": 13,
        "ayah": 26
      },
      {
        "surah": 13,
        "ayah": 27
      },
      {
        "surah": 13,
        "ayah": 28
      }
    ]
  },
  {
    "page": 253,
    "juz": 13,
    "hizb": 26,
    "rub": 101,
    "surahs": [
      13
    ],
    "startSurah": 13,
    "startAyah": 29,
    "endSurah": 13,
    "endAyah": 34,
    "verses": [
      {
        "surah": 13,
        "ayah": 29
      },
      {
        "surah": 13,
        "ayah": 30
      },
      {
        "surah": 13,
        "ayah": 31
      },
      {
        "surah": 13,
        "ayah": 32
      },
      {
        "surah": 13,
        "ayah": 33
      },
      {
        "surah": 13,
        "ayah": 34
      }
    ]
  },
  {
    "page": 254,
    "juz": 13,
    "hizb": 26,
    "rub": 102,
    "surahs": [
      13
    ],
    "startSurah": 13,
    "startAyah": 35,
    "endSurah": 13,
    "endAyah": 42,
    "verses": [
      {
        "surah": 13,
        "ayah": 35
      },
      {
        "surah": 13,
        "ayah": 36
      },
      {
        "surah": 13,
        "ayah": 37
      },
      {
        "surah": 13,
        "ayah": 38
      },
      {
        "surah": 13,
        "ayah": 39
      },
      {
        "surah": 13,
        "ayah": 40
      },
      {
        "surah": 13,
        "ayah": 41
      },
      {
        "surah": 13,
        "ayah": 42
      }
    ]
  },
  {
    "page": 255,
    "juz": 13,
    "hizb": 26,
    "rub": 102,
    "surahs": [
      13,
      14
    ],
    "startSurah": 13,
    "startAyah": 43,
    "endSurah": 14,
    "endAyah": 5,
    "verses": [
      {
        "surah": 13,
        "ayah": 43
      },
      {
        "surah": 14,
        "ayah": 1
      },
      {
        "surah": 14,
        "ayah": 2
      },
      {
        "surah": 14,
        "ayah": 3
      },
      {
        "surah": 14,
        "ayah": 4
      },
      {
        "surah": 14,
        "ayah": 5
      }
    ]
  },
  {
    "page": 256,
    "juz": 13,
    "hizb": 26,
    "rub": 102,
    "surahs": [
      14
    ],
    "startSurah": 14,
    "startAyah": 6,
    "endSurah": 14,
    "endAyah": 10,
    "verses": [
      {
        "surah": 14,
        "ayah": 6
      },
      {
        "surah": 14,
        "ayah": 7
      },
      {
        "surah": 14,
        "ayah": 8
      },
      {
        "surah": 14,
        "ayah": 9
      },
      {
        "surah": 14,
        "ayah": 10
      }
    ]
  },
  {
    "page": 257,
    "juz": 13,
    "hizb": 26,
    "rub": 103,
    "surahs": [
      14
    ],
    "startSurah": 14,
    "startAyah": 11,
    "endSurah": 14,
    "endAyah": 18,
    "verses": [
      {
        "surah": 14,
        "ayah": 11
      },
      {
        "surah": 14,
        "ayah": 12
      },
      {
        "surah": 14,
        "ayah": 13
      },
      {
        "surah": 14,
        "ayah": 14
      },
      {
        "surah": 14,
        "ayah": 15
      },
      {
        "surah": 14,
        "ayah": 16
      },
      {
        "surah": 14,
        "ayah": 17
      },
      {
        "surah": 14,
        "ayah": 18
      }
    ]
  },
  {
    "page": 258,
    "juz": 13,
    "hizb": 26,
    "rub": 103,
    "surahs": [
      14
    ],
    "startSurah": 14,
    "startAyah": 19,
    "endSurah": 14,
    "endAyah": 24,
    "verses": [
      {
        "surah": 14,
        "ayah": 19
      },
      {
        "surah": 14,
        "ayah": 20
      },
      {
        "surah": 14,
        "ayah": 21
      },
      {
        "surah": 14,
        "ayah": 22
      },
      {
        "surah": 14,
        "ayah": 23
      },
      {
        "surah": 14,
        "ayah": 24
      }
    ]
  },
  {
    "page": 259,
    "juz": 13,
    "hizb": 26,
    "rub": 103,
    "surahs": [
      14
    ],
    "startSurah": 14,
    "startAyah": 25,
    "endSurah": 14,
    "endAyah": 33,
    "verses": [
      {
        "surah": 14,
        "ayah": 25
      },
      {
        "surah": 14,
        "ayah": 26
      },
      {
        "surah": 14,
        "ayah": 27
      },
      {
        "surah": 14,
        "ayah": 28
      },
      {
        "surah": 14,
        "ayah": 29
      },
      {
        "surah": 14,
        "ayah": 30
      },
      {
        "surah": 14,
        "ayah": 31
      },
      {
        "surah": 14,
        "ayah": 32
      },
      {
        "surah": 14,
        "ayah": 33
      }
    ]
  },
  {
    "page": 260,
    "juz": 13,
    "hizb": 26,
    "rub": 104,
    "surahs": [
      14
    ],
    "startSurah": 14,
    "startAyah": 34,
    "endSurah": 14,
    "endAyah": 42,
    "verses": [
      {
        "surah": 14,
        "ayah": 34
      },
      {
        "surah": 14,
        "ayah": 35
      },
      {
        "surah": 14,
        "ayah": 36
      },
      {
        "surah": 14,
        "ayah": 37
      },
      {
        "surah": 14,
        "ayah": 38
      },
      {
        "surah": 14,
        "ayah": 39
      },
      {
        "surah": 14,
        "ayah": 40
      },
      {
        "surah": 14,
        "ayah": 41
      },
      {
        "surah": 14,
        "ayah": 42
      }
    ]
  },
  {
    "page": 261,
    "juz": 13,
    "hizb": 26,
    "rub": 104,
    "surahs": [
      14
    ],
    "startSurah": 14,
    "startAyah": 43,
    "endSurah": 14,
    "endAyah": 52,
    "verses": [
      {
        "surah": 14,
        "ayah": 43
      },
      {
        "surah": 14,
        "ayah": 44
      },
      {
        "surah": 14,
        "ayah": 45
      },
      {
        "surah": 14,
        "ayah": 46
      },
      {
        "surah": 14,
        "ayah": 47
      },
      {
        "surah": 14,
        "ayah": 48
      },
      {
        "surah": 14,
        "ayah": 49
      },
      {
        "surah": 14,
        "ayah": 50
      },
      {
        "surah": 14,
        "ayah": 51
      },
      {
        "surah": 14,
        "ayah": 52
      }
    ]
  },
  {
    "page": 262,
    "juz": 14,
    "hizb": 27,
    "rub": 105,
    "surahs": [
      15
    ],
    "startSurah": 15,
    "startAyah": 1,
    "endSurah": 15,
    "endAyah": 15,
    "verses": [
      {
        "surah": 15,
        "ayah": 1
      },
      {
        "surah": 15,
        "ayah": 2
      },
      {
        "surah": 15,
        "ayah": 3
      },
      {
        "surah": 15,
        "ayah": 4
      },
      {
        "surah": 15,
        "ayah": 5
      },
      {
        "surah": 15,
        "ayah": 6
      },
      {
        "surah": 15,
        "ayah": 7
      },
      {
        "surah": 15,
        "ayah": 8
      },
      {
        "surah": 15,
        "ayah": 9
      },
      {
        "surah": 15,
        "ayah": 10
      },
      {
        "surah": 15,
        "ayah": 11
      },
      {
        "surah": 15,
        "ayah": 12
      },
      {
        "surah": 15,
        "ayah": 13
      },
      {
        "surah": 15,
        "ayah": 14
      },
      {
        "surah": 15,
        "ayah": 15
      }
    ]
  },
  {
    "page": 263,
    "juz": 14,
    "hizb": 27,
    "rub": 105,
    "surahs": [
      15
    ],
    "startSurah": 15,
    "startAyah": 16,
    "endSurah": 15,
    "endAyah": 31,
    "verses": [
      {
        "surah": 15,
        "ayah": 16
      },
      {
        "surah": 15,
        "ayah": 17
      },
      {
        "surah": 15,
        "ayah": 18
      },
      {
        "surah": 15,
        "ayah": 19
      },
      {
        "surah": 15,
        "ayah": 20
      },
      {
        "surah": 15,
        "ayah": 21
      },
      {
        "surah": 15,
        "ayah": 22
      },
      {
        "surah": 15,
        "ayah": 23
      },
      {
        "surah": 15,
        "ayah": 24
      },
      {
        "surah": 15,
        "ayah": 25
      },
      {
        "surah": 15,
        "ayah": 26
      },
      {
        "surah": 15,
        "ayah": 27
      },
      {
        "surah": 15,
        "ayah": 28
      },
      {
        "surah": 15,
        "ayah": 29
      },
      {
        "surah": 15,
        "ayah": 30
      },
      {
        "surah": 15,
        "ayah": 31
      }
    ]
  },
  {
    "page": 264,
    "juz": 14,
    "hizb": 27,
    "rub": 105,
    "surahs": [
      15
    ],
    "startSurah": 15,
    "startAyah": 32,
    "endSurah": 15,
    "endAyah": 51,
    "verses": [
      {
        "surah": 15,
        "ayah": 32
      },
      {
        "surah": 15,
        "ayah": 33
      },
      {
        "surah": 15,
        "ayah": 34
      },
      {
        "surah": 15,
        "ayah": 35
      },
      {
        "surah": 15,
        "ayah": 36
      },
      {
        "surah": 15,
        "ayah": 37
      },
      {
        "surah": 15,
        "ayah": 38
      },
      {
        "surah": 15,
        "ayah": 39
      },
      {
        "surah": 15,
        "ayah": 40
      },
      {
        "surah": 15,
        "ayah": 41
      },
      {
        "surah": 15,
        "ayah": 42
      },
      {
        "surah": 15,
        "ayah": 43
      },
      {
        "surah": 15,
        "ayah": 44
      },
      {
        "surah": 15,
        "ayah": 45
      },
      {
        "surah": 15,
        "ayah": 46
      },
      {
        "surah": 15,
        "ayah": 47
      },
      {
        "surah": 15,
        "ayah": 48
      },
      {
        "surah": 15,
        "ayah": 49
      },
      {
        "surah": 15,
        "ayah": 50
      },
      {
        "surah": 15,
        "ayah": 51
      }
    ]
  },
  {
    "page": 265,
    "juz": 14,
    "hizb": 27,
    "rub": 106,
    "surahs": [
      15
    ],
    "startSurah": 15,
    "startAyah": 52,
    "endSurah": 15,
    "endAyah": 70,
    "verses": [
      {
        "surah": 15,
        "ayah": 52
      },
      {
        "surah": 15,
        "ayah": 53
      },
      {
        "surah": 15,
        "ayah": 54
      },
      {
        "surah": 15,
        "ayah": 55
      },
      {
        "surah": 15,
        "ayah": 56
      },
      {
        "surah": 15,
        "ayah": 57
      },
      {
        "surah": 15,
        "ayah": 58
      },
      {
        "surah": 15,
        "ayah": 59
      },
      {
        "surah": 15,
        "ayah": 60
      },
      {
        "surah": 15,
        "ayah": 61
      },
      {
        "surah": 15,
        "ayah": 62
      },
      {
        "surah": 15,
        "ayah": 63
      },
      {
        "surah": 15,
        "ayah": 64
      },
      {
        "surah": 15,
        "ayah": 65
      },
      {
        "surah": 15,
        "ayah": 66
      },
      {
        "surah": 15,
        "ayah": 67
      },
      {
        "surah": 15,
        "ayah": 68
      },
      {
        "surah": 15,
        "ayah": 69
      },
      {
        "surah": 15,
        "ayah": 70
      }
    ]
  },
  {
    "page": 266,
    "juz": 14,
    "hizb": 27,
    "rub": 106,
    "surahs": [
      15
    ],
    "startSurah": 15,
    "startAyah": 71,
    "endSurah": 15,
    "endAyah": 90,
    "verses": [
      {
        "surah": 15,
        "ayah": 71
      },
      {
        "surah": 15,
        "ayah": 72
      },
      {
        "surah": 15,
        "ayah": 73
      },
      {
        "surah": 15,
        "ayah": 74
      },
      {
        "surah": 15,
        "ayah": 75
      },
      {
        "surah": 15,
        "ayah": 76
      },
      {
        "surah": 15,
        "ayah": 77
      },
      {
        "surah": 15,
        "ayah": 78
      },
      {
        "surah": 15,
        "ayah": 79
      },
      {
        "surah": 15,
        "ayah": 80
      },
      {
        "surah": 15,
        "ayah": 81
      },
      {
        "surah": 15,
        "ayah": 82
      },
      {
        "surah": 15,
        "ayah": 83
      },
      {
        "surah": 15,
        "ayah": 84
      },
      {
        "surah": 15,
        "ayah": 85
      },
      {
        "surah": 15,
        "ayah": 86
      },
      {
        "surah": 15,
        "ayah": 87
      },
      {
        "surah": 15,
        "ayah": 88
      },
      {
        "surah": 15,
        "ayah": 89
      },
      {
        "surah": 15,
        "ayah": 90
      }
    ]
  },
  {
    "page": 267,
    "juz": 14,
    "hizb": 27,
    "rub": 106,
    "surahs": [
      15,
      16
    ],
    "startSurah": 15,
    "startAyah": 91,
    "endSurah": 16,
    "endAyah": 6,
    "verses": [
      {
        "surah": 15,
        "ayah": 91
      },
      {
        "surah": 15,
        "ayah": 92
      },
      {
        "surah": 15,
        "ayah": 93
      },
      {
        "surah": 15,
        "ayah": 94
      },
      {
        "surah": 15,
        "ayah": 95
      },
      {
        "surah": 15,
        "ayah": 96
      },
      {
        "surah": 15,
        "ayah": 97
      },
      {
        "surah": 15,
        "ayah": 98
      },
      {
        "surah": 15,
        "ayah": 99
      },
      {
        "surah": 16,
        "ayah": 1
      },
      {
        "surah": 16,
        "ayah": 2
      },
      {
        "surah": 16,
        "ayah": 3
      },
      {
        "surah": 16,
        "ayah": 4
      },
      {
        "surah": 16,
        "ayah": 5
      },
      {
        "surah": 16,
        "ayah": 6
      }
    ]
  },
  {
    "page": 268,
    "juz": 14,
    "hizb": 27,
    "rub": 107,
    "surahs": [
      16
    ],
    "startSurah": 16,
    "startAyah": 7,
    "endSurah": 16,
    "endAyah": 14,
    "verses": [
      {
        "surah": 16,
        "ayah": 7
      },
      {
        "surah": 16,
        "ayah": 8
      },
      {
        "surah": 16,
        "ayah": 9
      },
      {
        "surah": 16,
        "ayah": 10
      },
      {
        "surah": 16,
        "ayah": 11
      },
      {
        "surah": 16,
        "ayah": 12
      },
      {
        "surah": 16,
        "ayah": 13
      },
      {
        "surah": 16,
        "ayah": 14
      }
    ]
  },
  {
    "page": 269,
    "juz": 14,
    "hizb": 27,
    "rub": 107,
    "surahs": [
      16
    ],
    "startSurah": 16,
    "startAyah": 15,
    "endSurah": 16,
    "endAyah": 26,
    "verses": [
      {
        "surah": 16,
        "ayah": 15
      },
      {
        "surah": 16,
        "ayah": 16
      },
      {
        "surah": 16,
        "ayah": 17
      },
      {
        "surah": 16,
        "ayah": 18
      },
      {
        "surah": 16,
        "ayah": 19
      },
      {
        "surah": 16,
        "ayah": 20
      },
      {
        "surah": 16,
        "ayah": 21
      },
      {
        "surah": 16,
        "ayah": 22
      },
      {
        "surah": 16,
        "ayah": 23
      },
      {
        "surah": 16,
        "ayah": 24
      },
      {
        "surah": 16,
        "ayah": 25
      },
      {
        "surah": 16,
        "ayah": 26
      }
    ]
  },
  {
    "page": 270,
    "juz": 14,
    "hizb": 27,
    "rub": 107,
    "surahs": [
      16
    ],
    "startSurah": 16,
    "startAyah": 27,
    "endSurah": 16,
    "endAyah": 34,
    "verses": [
      {
        "surah": 16,
        "ayah": 27
      },
      {
        "surah": 16,
        "ayah": 28
      },
      {
        "surah": 16,
        "ayah": 29
      },
      {
        "surah": 16,
        "ayah": 30
      },
      {
        "surah": 16,
        "ayah": 31
      },
      {
        "surah": 16,
        "ayah": 32
      },
      {
        "surah": 16,
        "ayah": 33
      },
      {
        "surah": 16,
        "ayah": 34
      }
    ]
  },
  {
    "page": 271,
    "juz": 14,
    "hizb": 27,
    "rub": 108,
    "surahs": [
      16
    ],
    "startSurah": 16,
    "startAyah": 35,
    "endSurah": 16,
    "endAyah": 42,
    "verses": [
      {
        "surah": 16,
        "ayah": 35
      },
      {
        "surah": 16,
        "ayah": 36
      },
      {
        "surah": 16,
        "ayah": 37
      },
      {
        "surah": 16,
        "ayah": 38
      },
      {
        "surah": 16,
        "ayah": 39
      },
      {
        "surah": 16,
        "ayah": 40
      },
      {
        "surah": 16,
        "ayah": 41
      },
      {
        "surah": 16,
        "ayah": 42
      }
    ]
  },
  {
    "page": 272,
    "juz": 14,
    "hizb": 27,
    "rub": 108,
    "surahs": [
      16
    ],
    "startSurah": 16,
    "startAyah": 43,
    "endSurah": 16,
    "endAyah": 54,
    "verses": [
      {
        "surah": 16,
        "ayah": 43
      },
      {
        "surah": 16,
        "ayah": 44
      },
      {
        "surah": 16,
        "ayah": 45
      },
      {
        "surah": 16,
        "ayah": 46
      },
      {
        "surah": 16,
        "ayah": 47
      },
      {
        "surah": 16,
        "ayah": 48
      },
      {
        "surah": 16,
        "ayah": 49
      },
      {
        "surah": 16,
        "ayah": 50
      },
      {
        "surah": 16,
        "ayah": 51
      },
      {
        "surah": 16,
        "ayah": 52
      },
      {
        "surah": 16,
        "ayah": 53
      },
      {
        "surah": 16,
        "ayah": 54
      }
    ]
  },
  {
    "page": 273,
    "juz": 14,
    "hizb": 28,
    "rub": 109,
    "surahs": [
      16
    ],
    "startSurah": 16,
    "startAyah": 55,
    "endSurah": 16,
    "endAyah": 64,
    "verses": [
      {
        "surah": 16,
        "ayah": 55
      },
      {
        "surah": 16,
        "ayah": 56
      },
      {
        "surah": 16,
        "ayah": 57
      },
      {
        "surah": 16,
        "ayah": 58
      },
      {
        "surah": 16,
        "ayah": 59
      },
      {
        "surah": 16,
        "ayah": 60
      },
      {
        "surah": 16,
        "ayah": 61
      },
      {
        "surah": 16,
        "ayah": 62
      },
      {
        "surah": 16,
        "ayah": 63
      },
      {
        "surah": 16,
        "ayah": 64
      }
    ]
  },
  {
    "page": 274,
    "juz": 14,
    "hizb": 28,
    "rub": 109,
    "surahs": [
      16
    ],
    "startSurah": 16,
    "startAyah": 65,
    "endSurah": 16,
    "endAyah": 72,
    "verses": [
      {
        "surah": 16,
        "ayah": 65
      },
      {
        "surah": 16,
        "ayah": 66
      },
      {
        "surah": 16,
        "ayah": 67
      },
      {
        "surah": 16,
        "ayah": 68
      },
      {
        "surah": 16,
        "ayah": 69
      },
      {
        "surah": 16,
        "ayah": 70
      },
      {
        "surah": 16,
        "ayah": 71
      },
      {
        "surah": 16,
        "ayah": 72
      }
    ]
  },
  {
    "page": 275,
    "juz": 14,
    "hizb": 28,
    "rub": 109,
    "surahs": [
      16
    ],
    "startSurah": 16,
    "startAyah": 73,
    "endSurah": 16,
    "endAyah": 79,
    "verses": [
      {
        "surah": 16,
        "ayah": 73
      },
      {
        "surah": 16,
        "ayah": 74
      },
      {
        "surah": 16,
        "ayah": 75
      },
      {
        "surah": 16,
        "ayah": 76
      },
      {
        "surah": 16,
        "ayah": 77
      },
      {
        "surah": 16,
        "ayah": 78
      },
      {
        "surah": 16,
        "ayah": 79
      }
    ]
  },
  {
    "page": 276,
    "juz": 14,
    "hizb": 28,
    "rub": 110,
    "surahs": [
      16
    ],
    "startSurah": 16,
    "startAyah": 80,
    "endSurah": 16,
    "endAyah": 87,
    "verses": [
      {
        "surah": 16,
        "ayah": 80
      },
      {
        "surah": 16,
        "ayah": 81
      },
      {
        "surah": 16,
        "ayah": 82
      },
      {
        "surah": 16,
        "ayah": 83
      },
      {
        "surah": 16,
        "ayah": 84
      },
      {
        "surah": 16,
        "ayah": 85
      },
      {
        "surah": 16,
        "ayah": 86
      },
      {
        "surah": 16,
        "ayah": 87
      }
    ]
  },
  {
    "page": 277,
    "juz": 14,
    "hizb": 28,
    "rub": 110,
    "surahs": [
      16
    ],
    "startSurah": 16,
    "startAyah": 88,
    "endSurah": 16,
    "endAyah": 93,
    "verses": [
      {
        "surah": 16,
        "ayah": 88
      },
      {
        "surah": 16,
        "ayah": 89
      },
      {
        "surah": 16,
        "ayah": 90
      },
      {
        "surah": 16,
        "ayah": 91
      },
      {
        "surah": 16,
        "ayah": 92
      },
      {
        "surah": 16,
        "ayah": 93
      }
    ]
  },
  {
    "page": 278,
    "juz": 14,
    "hizb": 28,
    "rub": 111,
    "surahs": [
      16
    ],
    "startSurah": 16,
    "startAyah": 94,
    "endSurah": 16,
    "endAyah": 102,
    "verses": [
      {
        "surah": 16,
        "ayah": 94
      },
      {
        "surah": 16,
        "ayah": 95
      },
      {
        "surah": 16,
        "ayah": 96
      },
      {
        "surah": 16,
        "ayah": 97
      },
      {
        "surah": 16,
        "ayah": 98
      },
      {
        "surah": 16,
        "ayah": 99
      },
      {
        "surah": 16,
        "ayah": 100
      },
      {
        "surah": 16,
        "ayah": 101
      },
      {
        "surah": 16,
        "ayah": 102
      }
    ]
  },
  {
    "page": 279,
    "juz": 14,
    "hizb": 28,
    "rub": 111,
    "surahs": [
      16
    ],
    "startSurah": 16,
    "startAyah": 103,
    "endSurah": 16,
    "endAyah": 110,
    "verses": [
      {
        "surah": 16,
        "ayah": 103
      },
      {
        "surah": 16,
        "ayah": 104
      },
      {
        "surah": 16,
        "ayah": 105
      },
      {
        "surah": 16,
        "ayah": 106
      },
      {
        "surah": 16,
        "ayah": 107
      },
      {
        "surah": 16,
        "ayah": 108
      },
      {
        "surah": 16,
        "ayah": 109
      },
      {
        "surah": 16,
        "ayah": 110
      }
    ]
  },
  {
    "page": 280,
    "juz": 14,
    "hizb": 28,
    "rub": 112,
    "surahs": [
      16
    ],
    "startSurah": 16,
    "startAyah": 111,
    "endSurah": 16,
    "endAyah": 118,
    "verses": [
      {
        "surah": 16,
        "ayah": 111
      },
      {
        "surah": 16,
        "ayah": 112
      },
      {
        "surah": 16,
        "ayah": 113
      },
      {
        "surah": 16,
        "ayah": 114
      },
      {
        "surah": 16,
        "ayah": 115
      },
      {
        "surah": 16,
        "ayah": 116
      },
      {
        "surah": 16,
        "ayah": 117
      },
      {
        "surah": 16,
        "ayah": 118
      }
    ]
  },
  {
    "page": 281,
    "juz": 14,
    "hizb": 28,
    "rub": 112,
    "surahs": [
      16
    ],
    "startSurah": 16,
    "startAyah": 119,
    "endSurah": 16,
    "endAyah": 128,
    "verses": [
      {
        "surah": 16,
        "ayah": 119
      },
      {
        "surah": 16,
        "ayah": 120
      },
      {
        "surah": 16,
        "ayah": 121
      },
      {
        "surah": 16,
        "ayah": 122
      },
      {
        "surah": 16,
        "ayah": 123
      },
      {
        "surah": 16,
        "ayah": 124
      },
      {
        "surah": 16,
        "ayah": 125
      },
      {
        "surah": 16,
        "ayah": 126
      },
      {
        "surah": 16,
        "ayah": 127
      },
      {
        "surah": 16,
        "ayah": 128
      }
    ]
  },
  {
    "page": 282,
    "juz": 15,
    "hizb": 29,
    "rub": 113,
    "surahs": [
      17
    ],
    "startSurah": 17,
    "startAyah": 1,
    "endSurah": 17,
    "endAyah": 7,
    "verses": [
      {
        "surah": 17,
        "ayah": 1
      },
      {
        "surah": 17,
        "ayah": 2
      },
      {
        "surah": 17,
        "ayah": 3
      },
      {
        "surah": 17,
        "ayah": 4
      },
      {
        "surah": 17,
        "ayah": 5
      },
      {
        "surah": 17,
        "ayah": 6
      },
      {
        "surah": 17,
        "ayah": 7
      }
    ]
  },
  {
    "page": 283,
    "juz": 15,
    "hizb": 29,
    "rub": 113,
    "surahs": [
      17
    ],
    "startSurah": 17,
    "startAyah": 8,
    "endSurah": 17,
    "endAyah": 17,
    "verses": [
      {
        "surah": 17,
        "ayah": 8
      },
      {
        "surah": 17,
        "ayah": 9
      },
      {
        "surah": 17,
        "ayah": 10
      },
      {
        "surah": 17,
        "ayah": 11
      },
      {
        "surah": 17,
        "ayah": 12
      },
      {
        "surah": 17,
        "ayah": 13
      },
      {
        "surah": 17,
        "ayah": 14
      },
      {
        "surah": 17,
        "ayah": 15
      },
      {
        "surah": 17,
        "ayah": 16
      },
      {
        "surah": 17,
        "ayah": 17
      }
    ]
  },
  {
    "page": 284,
    "juz": 15,
    "hizb": 29,
    "rub": 113,
    "surahs": [
      17
    ],
    "startSurah": 17,
    "startAyah": 18,
    "endSurah": 17,
    "endAyah": 27,
    "verses": [
      {
        "surah": 17,
        "ayah": 18
      },
      {
        "surah": 17,
        "ayah": 19
      },
      {
        "surah": 17,
        "ayah": 20
      },
      {
        "surah": 17,
        "ayah": 21
      },
      {
        "surah": 17,
        "ayah": 22
      },
      {
        "surah": 17,
        "ayah": 23
      },
      {
        "surah": 17,
        "ayah": 24
      },
      {
        "surah": 17,
        "ayah": 25
      },
      {
        "surah": 17,
        "ayah": 26
      },
      {
        "surah": 17,
        "ayah": 27
      }
    ]
  },
  {
    "page": 285,
    "juz": 15,
    "hizb": 29,
    "rub": 114,
    "surahs": [
      17
    ],
    "startSurah": 17,
    "startAyah": 28,
    "endSurah": 17,
    "endAyah": 38,
    "verses": [
      {
        "surah": 17,
        "ayah": 28
      },
      {
        "surah": 17,
        "ayah": 29
      },
      {
        "surah": 17,
        "ayah": 30
      },
      {
        "surah": 17,
        "ayah": 31
      },
      {
        "surah": 17,
        "ayah": 32
      },
      {
        "surah": 17,
        "ayah": 33
      },
      {
        "surah": 17,
        "ayah": 34
      },
      {
        "surah": 17,
        "ayah": 35
      },
      {
        "surah": 17,
        "ayah": 36
      },
      {
        "surah": 17,
        "ayah": 37
      },
      {
        "surah": 17,
        "ayah": 38
      }
    ]
  },
  {
    "page": 286,
    "juz": 15,
    "hizb": 29,
    "rub": 114,
    "surahs": [
      17
    ],
    "startSurah": 17,
    "startAyah": 39,
    "endSurah": 17,
    "endAyah": 49,
    "verses": [
      {
        "surah": 17,
        "ayah": 39
      },
      {
        "surah": 17,
        "ayah": 40
      },
      {
        "surah": 17,
        "ayah": 41
      },
      {
        "surah": 17,
        "ayah": 42
      },
      {
        "surah": 17,
        "ayah": 43
      },
      {
        "surah": 17,
        "ayah": 44
      },
      {
        "surah": 17,
        "ayah": 45
      },
      {
        "surah": 17,
        "ayah": 46
      },
      {
        "surah": 17,
        "ayah": 47
      },
      {
        "surah": 17,
        "ayah": 48
      },
      {
        "surah": 17,
        "ayah": 49
      }
    ]
  },
  {
    "page": 287,
    "juz": 15,
    "hizb": 29,
    "rub": 115,
    "surahs": [
      17
    ],
    "startSurah": 17,
    "startAyah": 50,
    "endSurah": 17,
    "endAyah": 58,
    "verses": [
      {
        "surah": 17,
        "ayah": 50
      },
      {
        "surah": 17,
        "ayah": 51
      },
      {
        "surah": 17,
        "ayah": 52
      },
      {
        "surah": 17,
        "ayah": 53
      },
      {
        "surah": 17,
        "ayah": 54
      },
      {
        "surah": 17,
        "ayah": 55
      },
      {
        "surah": 17,
        "ayah": 56
      },
      {
        "surah": 17,
        "ayah": 57
      },
      {
        "surah": 17,
        "ayah": 58
      }
    ]
  },
  {
    "page": 288,
    "juz": 15,
    "hizb": 29,
    "rub": 115,
    "surahs": [
      17
    ],
    "startSurah": 17,
    "startAyah": 59,
    "endSurah": 17,
    "endAyah": 66,
    "verses": [
      {
        "surah": 17,
        "ayah": 59
      },
      {
        "surah": 17,
        "ayah": 60
      },
      {
        "surah": 17,
        "ayah": 61
      },
      {
        "surah": 17,
        "ayah": 62
      },
      {
        "surah": 17,
        "ayah": 63
      },
      {
        "surah": 17,
        "ayah": 64
      },
      {
        "surah": 17,
        "ayah": 65
      },
      {
        "surah": 17,
        "ayah": 66
      }
    ]
  },
  {
    "page": 289,
    "juz": 15,
    "hizb": 29,
    "rub": 115,
    "surahs": [
      17
    ],
    "startSurah": 17,
    "startAyah": 67,
    "endSurah": 17,
    "endAyah": 75,
    "verses": [
      {
        "surah": 17,
        "ayah": 67
      },
      {
        "surah": 17,
        "ayah": 68
      },
      {
        "surah": 17,
        "ayah": 69
      },
      {
        "surah": 17,
        "ayah": 70
      },
      {
        "surah": 17,
        "ayah": 71
      },
      {
        "surah": 17,
        "ayah": 72
      },
      {
        "surah": 17,
        "ayah": 73
      },
      {
        "surah": 17,
        "ayah": 74
      },
      {
        "surah": 17,
        "ayah": 75
      }
    ]
  },
  {
    "page": 290,
    "juz": 15,
    "hizb": 29,
    "rub": 116,
    "surahs": [
      17
    ],
    "startSurah": 17,
    "startAyah": 76,
    "endSurah": 17,
    "endAyah": 86,
    "verses": [
      {
        "surah": 17,
        "ayah": 76
      },
      {
        "surah": 17,
        "ayah": 77
      },
      {
        "surah": 17,
        "ayah": 78
      },
      {
        "surah": 17,
        "ayah": 79
      },
      {
        "surah": 17,
        "ayah": 80
      },
      {
        "surah": 17,
        "ayah": 81
      },
      {
        "surah": 17,
        "ayah": 82
      },
      {
        "surah": 17,
        "ayah": 83
      },
      {
        "surah": 17,
        "ayah": 84
      },
      {
        "surah": 17,
        "ayah": 85
      },
      {
        "surah": 17,
        "ayah": 86
      }
    ]
  },
  {
    "page": 291,
    "juz": 15,
    "hizb": 29,
    "rub": 116,
    "surahs": [
      17
    ],
    "startSurah": 17,
    "startAyah": 87,
    "endSurah": 17,
    "endAyah": 96,
    "verses": [
      {
        "surah": 17,
        "ayah": 87
      },
      {
        "surah": 17,
        "ayah": 88
      },
      {
        "surah": 17,
        "ayah": 89
      },
      {
        "surah": 17,
        "ayah": 90
      },
      {
        "surah": 17,
        "ayah": 91
      },
      {
        "surah": 17,
        "ayah": 92
      },
      {
        "surah": 17,
        "ayah": 93
      },
      {
        "surah": 17,
        "ayah": 94
      },
      {
        "surah": 17,
        "ayah": 95
      },
      {
        "surah": 17,
        "ayah": 96
      }
    ]
  },
  {
    "page": 292,
    "juz": 15,
    "hizb": 29,
    "rub": 116,
    "surahs": [
      17
    ],
    "startSurah": 17,
    "startAyah": 97,
    "endSurah": 17,
    "endAyah": 104,
    "verses": [
      {
        "surah": 17,
        "ayah": 97
      },
      {
        "surah": 17,
        "ayah": 98
      },
      {
        "surah": 17,
        "ayah": 99
      },
      {
        "surah": 17,
        "ayah": 100
      },
      {
        "surah": 17,
        "ayah": 101
      },
      {
        "surah": 17,
        "ayah": 102
      },
      {
        "surah": 17,
        "ayah": 103
      },
      {
        "surah": 17,
        "ayah": 104
      }
    ]
  },
  {
    "page": 293,
    "juz": 15,
    "hizb": 30,
    "rub": 117,
    "surahs": [
      17,
      18
    ],
    "startSurah": 17,
    "startAyah": 105,
    "endSurah": 18,
    "endAyah": 4,
    "verses": [
      {
        "surah": 17,
        "ayah": 105
      },
      {
        "surah": 17,
        "ayah": 106
      },
      {
        "surah": 17,
        "ayah": 107
      },
      {
        "surah": 17,
        "ayah": 108
      },
      {
        "surah": 17,
        "ayah": 109
      },
      {
        "surah": 17,
        "ayah": 110
      },
      {
        "surah": 17,
        "ayah": 111
      },
      {
        "surah": 18,
        "ayah": 1
      },
      {
        "surah": 18,
        "ayah": 2
      },
      {
        "surah": 18,
        "ayah": 3
      },
      {
        "surah": 18,
        "ayah": 4
      }
    ]
  },
  {
    "page": 294,
    "juz": 15,
    "hizb": 30,
    "rub": 117,
    "surahs": [
      18
    ],
    "startSurah": 18,
    "startAyah": 5,
    "endSurah": 18,
    "endAyah": 15,
    "verses": [
      {
        "surah": 18,
        "ayah": 5
      },
      {
        "surah": 18,
        "ayah": 6
      },
      {
        "surah": 18,
        "ayah": 7
      },
      {
        "surah": 18,
        "ayah": 8
      },
      {
        "surah": 18,
        "ayah": 9
      },
      {
        "surah": 18,
        "ayah": 10
      },
      {
        "surah": 18,
        "ayah": 11
      },
      {
        "surah": 18,
        "ayah": 12
      },
      {
        "surah": 18,
        "ayah": 13
      },
      {
        "surah": 18,
        "ayah": 14
      },
      {
        "surah": 18,
        "ayah": 15
      }
    ]
  },
  {
    "page": 295,
    "juz": 15,
    "hizb": 30,
    "rub": 117,
    "surahs": [
      18
    ],
    "startSurah": 18,
    "startAyah": 16,
    "endSurah": 18,
    "endAyah": 20,
    "verses": [
      {
        "surah": 18,
        "ayah": 16
      },
      {
        "surah": 18,
        "ayah": 17
      },
      {
        "surah": 18,
        "ayah": 18
      },
      {
        "surah": 18,
        "ayah": 19
      },
      {
        "surah": 18,
        "ayah": 20
      }
    ]
  },
  {
    "page": 296,
    "juz": 15,
    "hizb": 30,
    "rub": 118,
    "surahs": [
      18
    ],
    "startSurah": 18,
    "startAyah": 21,
    "endSurah": 18,
    "endAyah": 27,
    "verses": [
      {
        "surah": 18,
        "ayah": 21
      },
      {
        "surah": 18,
        "ayah": 22
      },
      {
        "surah": 18,
        "ayah": 23
      },
      {
        "surah": 18,
        "ayah": 24
      },
      {
        "surah": 18,
        "ayah": 25
      },
      {
        "surah": 18,
        "ayah": 26
      },
      {
        "surah": 18,
        "ayah": 27
      }
    ]
  },
  {
    "page": 297,
    "juz": 15,
    "hizb": 30,
    "rub": 118,
    "surahs": [
      18
    ],
    "startSurah": 18,
    "startAyah": 28,
    "endSurah": 18,
    "endAyah": 34,
    "verses": [
      {
        "surah": 18,
        "ayah": 28
      },
      {
        "surah": 18,
        "ayah": 29
      },
      {
        "surah": 18,
        "ayah": 30
      },
      {
        "surah": 18,
        "ayah": 31
      },
      {
        "surah": 18,
        "ayah": 32
      },
      {
        "surah": 18,
        "ayah": 33
      },
      {
        "surah": 18,
        "ayah": 34
      }
    ]
  },
  {
    "page": 298,
    "juz": 15,
    "hizb": 30,
    "rub": 119,
    "surahs": [
      18
    ],
    "startSurah": 18,
    "startAyah": 35,
    "endSurah": 18,
    "endAyah": 45,
    "verses": [
      {
        "surah": 18,
        "ayah": 35
      },
      {
        "surah": 18,
        "ayah": 36
      },
      {
        "surah": 18,
        "ayah": 37
      },
      {
        "surah": 18,
        "ayah": 38
      },
      {
        "surah": 18,
        "ayah": 39
      },
      {
        "surah": 18,
        "ayah": 40
      },
      {
        "surah": 18,
        "ayah": 41
      },
      {
        "surah": 18,
        "ayah": 42
      },
      {
        "surah": 18,
        "ayah": 43
      },
      {
        "surah": 18,
        "ayah": 44
      },
      {
        "surah": 18,
        "ayah": 45
      }
    ]
  },
  {
    "page": 299,
    "juz": 15,
    "hizb": 30,
    "rub": 119,
    "surahs": [
      18
    ],
    "startSurah": 18,
    "startAyah": 46,
    "endSurah": 18,
    "endAyah": 53,
    "verses": [
      {
        "surah": 18,
        "ayah": 46
      },
      {
        "surah": 18,
        "ayah": 47
      },
      {
        "surah": 18,
        "ayah": 48
      },
      {
        "surah": 18,
        "ayah": 49
      },
      {
        "surah": 18,
        "ayah": 50
      },
      {
        "surah": 18,
        "ayah": 51
      },
      {
        "surah": 18,
        "ayah": 52
      },
      {
        "surah": 18,
        "ayah": 53
      }
    ]
  },
  {
    "page": 300,
    "juz": 15,
    "hizb": 30,
    "rub": 120,
    "surahs": [
      18
    ],
    "startSurah": 18,
    "startAyah": 54,
    "endSurah": 18,
    "endAyah": 61,
    "verses": [
      {
        "surah": 18,
        "ayah": 54
      },
      {
        "surah": 18,
        "ayah": 55
      },
      {
        "surah": 18,
        "ayah": 56
      },
      {
        "surah": 18,
        "ayah": 57
      },
      {
        "surah": 18,
        "ayah": 58
      },
      {
        "surah": 18,
        "ayah": 59
      },
      {
        "surah": 18,
        "ayah": 60
      },
      {
        "surah": 18,
        "ayah": 61
      }
    ]
  },
  {
    "page": 301,
    "juz": 15,
    "hizb": 30,
    "rub": 120,
    "surahs": [
      18
    ],
    "startSurah": 18,
    "startAyah": 62,
    "endSurah": 18,
    "endAyah": 74,
    "verses": [
      {
        "surah": 18,
        "ayah": 62
      },
      {
        "surah": 18,
        "ayah": 63
      },
      {
        "surah": 18,
        "ayah": 64
      },
      {
        "surah": 18,
        "ayah": 65
      },
      {
        "surah": 18,
        "ayah": 66
      },
      {
        "surah": 18,
        "ayah": 67
      },
      {
        "surah": 18,
        "ayah": 68
      },
      {
        "surah": 18,
        "ayah": 69
      },
      {
        "surah": 18,
        "ayah": 70
      },
      {
        "surah": 18,
        "ayah": 71
      },
      {
        "surah": 18,
        "ayah": 72
      },
      {
        "surah": 18,
        "ayah": 73
      },
      {
        "surah": 18,
        "ayah": 74
      }
    ]
  },
  {
    "page": 302,
    "juz": 16,
    "hizb": 31,
    "rub": 121,
    "surahs": [
      18
    ],
    "startSurah": 18,
    "startAyah": 75,
    "endSurah": 18,
    "endAyah": 83,
    "verses": [
      {
        "surah": 18,
        "ayah": 75
      },
      {
        "surah": 18,
        "ayah": 76
      },
      {
        "surah": 18,
        "ayah": 77
      },
      {
        "surah": 18,
        "ayah": 78
      },
      {
        "surah": 18,
        "ayah": 79
      },
      {
        "surah": 18,
        "ayah": 80
      },
      {
        "surah": 18,
        "ayah": 81
      },
      {
        "surah": 18,
        "ayah": 82
      },
      {
        "surah": 18,
        "ayah": 83
      }
    ]
  },
  {
    "page": 303,
    "juz": 16,
    "hizb": 31,
    "rub": 121,
    "surahs": [
      18
    ],
    "startSurah": 18,
    "startAyah": 84,
    "endSurah": 18,
    "endAyah": 97,
    "verses": [
      {
        "surah": 18,
        "ayah": 84
      },
      {
        "surah": 18,
        "ayah": 85
      },
      {
        "surah": 18,
        "ayah": 86
      },
      {
        "surah": 18,
        "ayah": 87
      },
      {
        "surah": 18,
        "ayah": 88
      },
      {
        "surah": 18,
        "ayah": 89
      },
      {
        "surah": 18,
        "ayah": 90
      },
      {
        "surah": 18,
        "ayah": 91
      },
      {
        "surah": 18,
        "ayah": 92
      },
      {
        "surah": 18,
        "ayah": 93
      },
      {
        "surah": 18,
        "ayah": 94
      },
      {
        "surah": 18,
        "ayah": 95
      },
      {
        "surah": 18,
        "ayah": 96
      },
      {
        "surah": 18,
        "ayah": 97
      }
    ]
  },
  {
    "page": 304,
    "juz": 16,
    "hizb": 31,
    "rub": 121,
    "surahs": [
      18
    ],
    "startSurah": 18,
    "startAyah": 98,
    "endSurah": 18,
    "endAyah": 110,
    "verses": [
      {
        "surah": 18,
        "ayah": 98
      },
      {
        "surah": 18,
        "ayah": 99
      },
      {
        "surah": 18,
        "ayah": 100
      },
      {
        "surah": 18,
        "ayah": 101
      },
      {
        "surah": 18,
        "ayah": 102
      },
      {
        "surah": 18,
        "ayah": 103
      },
      {
        "surah": 18,
        "ayah": 104
      },
      {
        "surah": 18,
        "ayah": 105
      },
      {
        "surah": 18,
        "ayah": 106
      },
      {
        "surah": 18,
        "ayah": 107
      },
      {
        "surah": 18,
        "ayah": 108
      },
      {
        "surah": 18,
        "ayah": 109
      },
      {
        "surah": 18,
        "ayah": 110
      }
    ]
  },
  {
    "page": 305,
    "juz": 16,
    "hizb": 31,
    "rub": 122,
    "surahs": [
      19
    ],
    "startSurah": 19,
    "startAyah": 1,
    "endSurah": 19,
    "endAyah": 11,
    "verses": [
      {
        "surah": 19,
        "ayah": 1
      },
      {
        "surah": 19,
        "ayah": 2
      },
      {
        "surah": 19,
        "ayah": 3
      },
      {
        "surah": 19,
        "ayah": 4
      },
      {
        "surah": 19,
        "ayah": 5
      },
      {
        "surah": 19,
        "ayah": 6
      },
      {
        "surah": 19,
        "ayah": 7
      },
      {
        "surah": 19,
        "ayah": 8
      },
      {
        "surah": 19,
        "ayah": 9
      },
      {
        "surah": 19,
        "ayah": 10
      },
      {
        "surah": 19,
        "ayah": 11
      }
    ]
  },
  {
    "page": 306,
    "juz": 16,
    "hizb": 31,
    "rub": 122,
    "surahs": [
      19
    ],
    "startSurah": 19,
    "startAyah": 12,
    "endSurah": 19,
    "endAyah": 25,
    "verses": [
      {
        "surah": 19,
        "ayah": 12
      },
      {
        "surah": 19,
        "ayah": 13
      },
      {
        "surah": 19,
        "ayah": 14
      },
      {
        "surah": 19,
        "ayah": 15
      },
      {
        "surah": 19,
        "ayah": 16
      },
      {
        "surah": 19,
        "ayah": 17
      },
      {
        "surah": 19,
        "ayah": 18
      },
      {
        "surah": 19,
        "ayah": 19
      },
      {
        "surah": 19,
        "ayah": 20
      },
      {
        "surah": 19,
        "ayah": 21
      },
      {
        "surah": 19,
        "ayah": 22
      },
      {
        "surah": 19,
        "ayah": 23
      },
      {
        "surah": 19,
        "ayah": 24
      },
      {
        "surah": 19,
        "ayah": 25
      }
    ]
  },
  {
    "page": 307,
    "juz": 16,
    "hizb": 31,
    "rub": 123,
    "surahs": [
      19
    ],
    "startSurah": 19,
    "startAyah": 26,
    "endSurah": 19,
    "endAyah": 38,
    "verses": [
      {
        "surah": 19,
        "ayah": 26
      },
      {
        "surah": 19,
        "ayah": 27
      },
      {
        "surah": 19,
        "ayah": 28
      },
      {
        "surah": 19,
        "ayah": 29
      },
      {
        "surah": 19,
        "ayah": 30
      },
      {
        "surah": 19,
        "ayah": 31
      },
      {
        "surah": 19,
        "ayah": 32
      },
      {
        "surah": 19,
        "ayah": 33
      },
      {
        "surah": 19,
        "ayah": 34
      },
      {
        "surah": 19,
        "ayah": 35
      },
      {
        "surah": 19,
        "ayah": 36
      },
      {
        "surah": 19,
        "ayah": 37
      },
      {
        "surah": 19,
        "ayah": 38
      }
    ]
  },
  {
    "page": 308,
    "juz": 16,
    "hizb": 31,
    "rub": 123,
    "surahs": [
      19
    ],
    "startSurah": 19,
    "startAyah": 39,
    "endSurah": 19,
    "endAyah": 51,
    "verses": [
      {
        "surah": 19,
        "ayah": 39
      },
      {
        "surah": 19,
        "ayah": 40
      },
      {
        "surah": 19,
        "ayah": 41
      },
      {
        "surah": 19,
        "ayah": 42
      },
      {
        "surah": 19,
        "ayah": 43
      },
      {
        "surah": 19,
        "ayah": 44
      },
      {
        "surah": 19,
        "ayah": 45
      },
      {
        "surah": 19,
        "ayah": 46
      },
      {
        "surah": 19,
        "ayah": 47
      },
      {
        "surah": 19,
        "ayah": 48
      },
      {
        "surah": 19,
        "ayah": 49
      },
      {
        "surah": 19,
        "ayah": 50
      },
      {
        "surah": 19,
        "ayah": 51
      }
    ]
  },
  {
    "page": 309,
    "juz": 16,
    "hizb": 31,
    "rub": 123,
    "surahs": [
      19
    ],
    "startSurah": 19,
    "startAyah": 52,
    "endSurah": 19,
    "endAyah": 64,
    "verses": [
      {
        "surah": 19,
        "ayah": 52
      },
      {
        "surah": 19,
        "ayah": 53
      },
      {
        "surah": 19,
        "ayah": 54
      },
      {
        "surah": 19,
        "ayah": 55
      },
      {
        "surah": 19,
        "ayah": 56
      },
      {
        "surah": 19,
        "ayah": 57
      },
      {
        "surah": 19,
        "ayah": 58
      },
      {
        "surah": 19,
        "ayah": 59
      },
      {
        "surah": 19,
        "ayah": 60
      },
      {
        "surah": 19,
        "ayah": 61
      },
      {
        "surah": 19,
        "ayah": 62
      },
      {
        "surah": 19,
        "ayah": 63
      },
      {
        "surah": 19,
        "ayah": 64
      }
    ]
  },
  {
    "page": 310,
    "juz": 16,
    "hizb": 31,
    "rub": 124,
    "surahs": [
      19
    ],
    "startSurah": 19,
    "startAyah": 65,
    "endSurah": 19,
    "endAyah": 76,
    "verses": [
      {
        "surah": 19,
        "ayah": 65
      },
      {
        "surah": 19,
        "ayah": 66
      },
      {
        "surah": 19,
        "ayah": 67
      },
      {
        "surah": 19,
        "ayah": 68
      },
      {
        "surah": 19,
        "ayah": 69
      },
      {
        "surah": 19,
        "ayah": 70
      },
      {
        "surah": 19,
        "ayah": 71
      },
      {
        "surah": 19,
        "ayah": 72
      },
      {
        "surah": 19,
        "ayah": 73
      },
      {
        "surah": 19,
        "ayah": 74
      },
      {
        "surah": 19,
        "ayah": 75
      },
      {
        "surah": 19,
        "ayah": 76
      }
    ]
  },
  {
    "page": 311,
    "juz": 16,
    "hizb": 31,
    "rub": 124,
    "surahs": [
      19
    ],
    "startSurah": 19,
    "startAyah": 77,
    "endSurah": 19,
    "endAyah": 95,
    "verses": [
      {
        "surah": 19,
        "ayah": 77
      },
      {
        "surah": 19,
        "ayah": 78
      },
      {
        "surah": 19,
        "ayah": 79
      },
      {
        "surah": 19,
        "ayah": 80
      },
      {
        "surah": 19,
        "ayah": 81
      },
      {
        "surah": 19,
        "ayah": 82
      },
      {
        "surah": 19,
        "ayah": 83
      },
      {
        "surah": 19,
        "ayah": 84
      },
      {
        "surah": 19,
        "ayah": 85
      },
      {
        "surah": 19,
        "ayah": 86
      },
      {
        "surah": 19,
        "ayah": 87
      },
      {
        "surah": 19,
        "ayah": 88
      },
      {
        "surah": 19,
        "ayah": 89
      },
      {
        "surah": 19,
        "ayah": 90
      },
      {
        "surah": 19,
        "ayah": 91
      },
      {
        "surah": 19,
        "ayah": 92
      },
      {
        "surah": 19,
        "ayah": 93
      },
      {
        "surah": 19,
        "ayah": 94
      },
      {
        "surah": 19,
        "ayah": 95
      }
    ]
  },
  {
    "page": 312,
    "juz": 16,
    "hizb": 31,
    "rub": 124,
    "surahs": [
      19,
      20
    ],
    "startSurah": 19,
    "startAyah": 96,
    "endSurah": 20,
    "endAyah": 12,
    "verses": [
      {
        "surah": 19,
        "ayah": 96
      },
      {
        "surah": 19,
        "ayah": 97
      },
      {
        "surah": 19,
        "ayah": 98
      },
      {
        "surah": 20,
        "ayah": 1
      },
      {
        "surah": 20,
        "ayah": 2
      },
      {
        "surah": 20,
        "ayah": 3
      },
      {
        "surah": 20,
        "ayah": 4
      },
      {
        "surah": 20,
        "ayah": 5
      },
      {
        "surah": 20,
        "ayah": 6
      },
      {
        "surah": 20,
        "ayah": 7
      },
      {
        "surah": 20,
        "ayah": 8
      },
      {
        "surah": 20,
        "ayah": 9
      },
      {
        "surah": 20,
        "ayah": 10
      },
      {
        "surah": 20,
        "ayah": 11
      },
      {
        "surah": 20,
        "ayah": 12
      }
    ]
  },
  {
    "page": 313,
    "juz": 16,
    "hizb": 32,
    "rub": 125,
    "surahs": [
      20
    ],
    "startSurah": 20,
    "startAyah": 13,
    "endSurah": 20,
    "endAyah": 37,
    "verses": [
      {
        "surah": 20,
        "ayah": 13
      },
      {
        "surah": 20,
        "ayah": 14
      },
      {
        "surah": 20,
        "ayah": 15
      },
      {
        "surah": 20,
        "ayah": 16
      },
      {
        "surah": 20,
        "ayah": 17
      },
      {
        "surah": 20,
        "ayah": 18
      },
      {
        "surah": 20,
        "ayah": 19
      },
      {
        "surah": 20,
        "ayah": 20
      },
      {
        "surah": 20,
        "ayah": 21
      },
      {
        "surah": 20,
        "ayah": 22
      },
      {
        "surah": 20,
        "ayah": 23
      },
      {
        "surah": 20,
        "ayah": 24
      },
      {
        "surah": 20,
        "ayah": 25
      },
      {
        "surah": 20,
        "ayah": 26
      },
      {
        "surah": 20,
        "ayah": 27
      },
      {
        "surah": 20,
        "ayah": 28
      },
      {
        "surah": 20,
        "ayah": 29
      },
      {
        "surah": 20,
        "ayah": 30
      },
      {
        "surah": 20,
        "ayah": 31
      },
      {
        "surah": 20,
        "ayah": 32
      },
      {
        "surah": 20,
        "ayah": 33
      },
      {
        "surah": 20,
        "ayah": 34
      },
      {
        "surah": 20,
        "ayah": 35
      },
      {
        "surah": 20,
        "ayah": 36
      },
      {
        "surah": 20,
        "ayah": 37
      }
    ]
  },
  {
    "page": 314,
    "juz": 16,
    "hizb": 32,
    "rub": 125,
    "surahs": [
      20
    ],
    "startSurah": 20,
    "startAyah": 38,
    "endSurah": 20,
    "endAyah": 51,
    "verses": [
      {
        "surah": 20,
        "ayah": 38
      },
      {
        "surah": 20,
        "ayah": 39
      },
      {
        "surah": 20,
        "ayah": 40
      },
      {
        "surah": 20,
        "ayah": 41
      },
      {
        "surah": 20,
        "ayah": 42
      },
      {
        "surah": 20,
        "ayah": 43
      },
      {
        "surah": 20,
        "ayah": 44
      },
      {
        "surah": 20,
        "ayah": 45
      },
      {
        "surah": 20,
        "ayah": 46
      },
      {
        "surah": 20,
        "ayah": 47
      },
      {
        "surah": 20,
        "ayah": 48
      },
      {
        "surah": 20,
        "ayah": 49
      },
      {
        "surah": 20,
        "ayah": 50
      },
      {
        "surah": 20,
        "ayah": 51
      }
    ]
  },
  {
    "page": 315,
    "juz": 16,
    "hizb": 32,
    "rub": 125,
    "surahs": [
      20
    ],
    "startSurah": 20,
    "startAyah": 52,
    "endSurah": 20,
    "endAyah": 64,
    "verses": [
      {
        "surah": 20,
        "ayah": 52
      },
      {
        "surah": 20,
        "ayah": 53
      },
      {
        "surah": 20,
        "ayah": 54
      },
      {
        "surah": 20,
        "ayah": 55
      },
      {
        "surah": 20,
        "ayah": 56
      },
      {
        "surah": 20,
        "ayah": 57
      },
      {
        "surah": 20,
        "ayah": 58
      },
      {
        "surah": 20,
        "ayah": 59
      },
      {
        "surah": 20,
        "ayah": 60
      },
      {
        "surah": 20,
        "ayah": 61
      },
      {
        "surah": 20,
        "ayah": 62
      },
      {
        "surah": 20,
        "ayah": 63
      },
      {
        "surah": 20,
        "ayah": 64
      }
    ]
  },
  {
    "page": 316,
    "juz": 16,
    "hizb": 32,
    "rub": 126,
    "surahs": [
      20
    ],
    "startSurah": 20,
    "startAyah": 65,
    "endSurah": 20,
    "endAyah": 76,
    "verses": [
      {
        "surah": 20,
        "ayah": 65
      },
      {
        "surah": 20,
        "ayah": 66
      },
      {
        "surah": 20,
        "ayah": 67
      },
      {
        "surah": 20,
        "ayah": 68
      },
      {
        "surah": 20,
        "ayah": 69
      },
      {
        "surah": 20,
        "ayah": 70
      },
      {
        "surah": 20,
        "ayah": 71
      },
      {
        "surah": 20,
        "ayah": 72
      },
      {
        "surah": 20,
        "ayah": 73
      },
      {
        "surah": 20,
        "ayah": 74
      },
      {
        "surah": 20,
        "ayah": 75
      },
      {
        "surah": 20,
        "ayah": 76
      }
    ]
  },
  {
    "page": 317,
    "juz": 16,
    "hizb": 32,
    "rub": 126,
    "surahs": [
      20
    ],
    "startSurah": 20,
    "startAyah": 77,
    "endSurah": 20,
    "endAyah": 87,
    "verses": [
      {
        "surah": 20,
        "ayah": 77
      },
      {
        "surah": 20,
        "ayah": 78
      },
      {
        "surah": 20,
        "ayah": 79
      },
      {
        "surah": 20,
        "ayah": 80
      },
      {
        "surah": 20,
        "ayah": 81
      },
      {
        "surah": 20,
        "ayah": 82
      },
      {
        "surah": 20,
        "ayah": 83
      },
      {
        "surah": 20,
        "ayah": 84
      },
      {
        "surah": 20,
        "ayah": 85
      },
      {
        "surah": 20,
        "ayah": 86
      },
      {
        "surah": 20,
        "ayah": 87
      }
    ]
  },
  {
    "page": 318,
    "juz": 16,
    "hizb": 32,
    "rub": 127,
    "surahs": [
      20
    ],
    "startSurah": 20,
    "startAyah": 88,
    "endSurah": 20,
    "endAyah": 98,
    "verses": [
      {
        "surah": 20,
        "ayah": 88
      },
      {
        "surah": 20,
        "ayah": 89
      },
      {
        "surah": 20,
        "ayah": 90
      },
      {
        "surah": 20,
        "ayah": 91
      },
      {
        "surah": 20,
        "ayah": 92
      },
      {
        "surah": 20,
        "ayah": 93
      },
      {
        "surah": 20,
        "ayah": 94
      },
      {
        "surah": 20,
        "ayah": 95
      },
      {
        "surah": 20,
        "ayah": 96
      },
      {
        "surah": 20,
        "ayah": 97
      },
      {
        "surah": 20,
        "ayah": 98
      }
    ]
  },
  {
    "page": 319,
    "juz": 16,
    "hizb": 32,
    "rub": 127,
    "surahs": [
      20
    ],
    "startSurah": 20,
    "startAyah": 99,
    "endSurah": 20,
    "endAyah": 113,
    "verses": [
      {
        "surah": 20,
        "ayah": 99
      },
      {
        "surah": 20,
        "ayah": 100
      },
      {
        "surah": 20,
        "ayah": 101
      },
      {
        "surah": 20,
        "ayah": 102
      },
      {
        "surah": 20,
        "ayah": 103
      },
      {
        "surah": 20,
        "ayah": 104
      },
      {
        "surah": 20,
        "ayah": 105
      },
      {
        "surah": 20,
        "ayah": 106
      },
      {
        "surah": 20,
        "ayah": 107
      },
      {
        "surah": 20,
        "ayah": 108
      },
      {
        "surah": 20,
        "ayah": 109
      },
      {
        "surah": 20,
        "ayah": 110
      },
      {
        "surah": 20,
        "ayah": 111
      },
      {
        "surah": 20,
        "ayah": 112
      },
      {
        "surah": 20,
        "ayah": 113
      }
    ]
  },
  {
    "page": 320,
    "juz": 16,
    "hizb": 32,
    "rub": 128,
    "surahs": [
      20
    ],
    "startSurah": 20,
    "startAyah": 114,
    "endSurah": 20,
    "endAyah": 125,
    "verses": [
      {
        "surah": 20,
        "ayah": 114
      },
      {
        "surah": 20,
        "ayah": 115
      },
      {
        "surah": 20,
        "ayah": 116
      },
      {
        "surah": 20,
        "ayah": 117
      },
      {
        "surah": 20,
        "ayah": 118
      },
      {
        "surah": 20,
        "ayah": 119
      },
      {
        "surah": 20,
        "ayah": 120
      },
      {
        "surah": 20,
        "ayah": 121
      },
      {
        "surah": 20,
        "ayah": 122
      },
      {
        "surah": 20,
        "ayah": 123
      },
      {
        "surah": 20,
        "ayah": 124
      },
      {
        "surah": 20,
        "ayah": 125
      }
    ]
  },
  {
    "page": 321,
    "juz": 16,
    "hizb": 32,
    "rub": 128,
    "surahs": [
      20
    ],
    "startSurah": 20,
    "startAyah": 126,
    "endSurah": 20,
    "endAyah": 135,
    "verses": [
      {
        "surah": 20,
        "ayah": 126
      },
      {
        "surah": 20,
        "ayah": 127
      },
      {
        "surah": 20,
        "ayah": 128
      },
      {
        "surah": 20,
        "ayah": 129
      },
      {
        "surah": 20,
        "ayah": 130
      },
      {
        "surah": 20,
        "ayah": 131
      },
      {
        "surah": 20,
        "ayah": 132
      },
      {
        "surah": 20,
        "ayah": 133
      },
      {
        "surah": 20,
        "ayah": 134
      },
      {
        "surah": 20,
        "ayah": 135
      }
    ]
  },
  {
    "page": 322,
    "juz": 17,
    "hizb": 33,
    "rub": 129,
    "surahs": [
      21
    ],
    "startSurah": 21,
    "startAyah": 1,
    "endSurah": 21,
    "endAyah": 10,
    "verses": [
      {
        "surah": 21,
        "ayah": 1
      },
      {
        "surah": 21,
        "ayah": 2
      },
      {
        "surah": 21,
        "ayah": 3
      },
      {
        "surah": 21,
        "ayah": 4
      },
      {
        "surah": 21,
        "ayah": 5
      },
      {
        "surah": 21,
        "ayah": 6
      },
      {
        "surah": 21,
        "ayah": 7
      },
      {
        "surah": 21,
        "ayah": 8
      },
      {
        "surah": 21,
        "ayah": 9
      },
      {
        "surah": 21,
        "ayah": 10
      }
    ]
  },
  {
    "page": 323,
    "juz": 17,
    "hizb": 33,
    "rub": 129,
    "surahs": [
      21
    ],
    "startSurah": 21,
    "startAyah": 11,
    "endSurah": 21,
    "endAyah": 24,
    "verses": [
      {
        "surah": 21,
        "ayah": 11
      },
      {
        "surah": 21,
        "ayah": 12
      },
      {
        "surah": 21,
        "ayah": 13
      },
      {
        "surah": 21,
        "ayah": 14
      },
      {
        "surah": 21,
        "ayah": 15
      },
      {
        "surah": 21,
        "ayah": 16
      },
      {
        "surah": 21,
        "ayah": 17
      },
      {
        "surah": 21,
        "ayah": 18
      },
      {
        "surah": 21,
        "ayah": 19
      },
      {
        "surah": 21,
        "ayah": 20
      },
      {
        "surah": 21,
        "ayah": 21
      },
      {
        "surah": 21,
        "ayah": 22
      },
      {
        "surah": 21,
        "ayah": 23
      },
      {
        "surah": 21,
        "ayah": 24
      }
    ]
  },
  {
    "page": 324,
    "juz": 17,
    "hizb": 33,
    "rub": 129,
    "surahs": [
      21
    ],
    "startSurah": 21,
    "startAyah": 25,
    "endSurah": 21,
    "endAyah": 35,
    "verses": [
      {
        "surah": 21,
        "ayah": 25
      },
      {
        "surah": 21,
        "ayah": 26
      },
      {
        "surah": 21,
        "ayah": 27
      },
      {
        "surah": 21,
        "ayah": 28
      },
      {
        "surah": 21,
        "ayah": 29
      },
      {
        "surah": 21,
        "ayah": 30
      },
      {
        "surah": 21,
        "ayah": 31
      },
      {
        "surah": 21,
        "ayah": 32
      },
      {
        "surah": 21,
        "ayah": 33
      },
      {
        "surah": 21,
        "ayah": 34
      },
      {
        "surah": 21,
        "ayah": 35
      }
    ]
  },
  {
    "page": 325,
    "juz": 17,
    "hizb": 33,
    "rub": 130,
    "surahs": [
      21
    ],
    "startSurah": 21,
    "startAyah": 36,
    "endSurah": 21,
    "endAyah": 44,
    "verses": [
      {
        "surah": 21,
        "ayah": 36
      },
      {
        "surah": 21,
        "ayah": 37
      },
      {
        "surah": 21,
        "ayah": 38
      },
      {
        "surah": 21,
        "ayah": 39
      },
      {
        "surah": 21,
        "ayah": 40
      },
      {
        "surah": 21,
        "ayah": 41
      },
      {
        "surah": 21,
        "ayah": 42
      },
      {
        "surah": 21,
        "ayah": 43
      },
      {
        "surah": 21,
        "ayah": 44
      }
    ]
  },
  {
    "page": 326,
    "juz": 17,
    "hizb": 33,
    "rub": 130,
    "surahs": [
      21
    ],
    "startSurah": 21,
    "startAyah": 45,
    "endSurah": 21,
    "endAyah": 57,
    "verses": [
      {
        "surah": 21,
        "ayah": 45
      },
      {
        "surah": 21,
        "ayah": 46
      },
      {
        "surah": 21,
        "ayah": 47
      },
      {
        "surah": 21,
        "ayah": 48
      },
      {
        "surah": 21,
        "ayah": 49
      },
      {
        "surah": 21,
        "ayah": 50
      },
      {
        "surah": 21,
        "ayah": 51
      },
      {
        "surah": 21,
        "ayah": 52
      },
      {
        "surah": 21,
        "ayah": 53
      },
      {
        "surah": 21,
        "ayah": 54
      },
      {
        "surah": 21,
        "ayah": 55
      },
      {
        "surah": 21,
        "ayah": 56
      },
      {
        "surah": 21,
        "ayah": 57
      }
    ]
  },
  {
    "page": 327,
    "juz": 17,
    "hizb": 33,
    "rub": 131,
    "surahs": [
      21
    ],
    "startSurah": 21,
    "startAyah": 58,
    "endSurah": 21,
    "endAyah": 72,
    "verses": [
      {
        "surah": 21,
        "ayah": 58
      },
      {
        "surah": 21,
        "ayah": 59
      },
      {
        "surah": 21,
        "ayah": 60
      },
      {
        "surah": 21,
        "ayah": 61
      },
      {
        "surah": 21,
        "ayah": 62
      },
      {
        "surah": 21,
        "ayah": 63
      },
      {
        "surah": 21,
        "ayah": 64
      },
      {
        "surah": 21,
        "ayah": 65
      },
      {
        "surah": 21,
        "ayah": 66
      },
      {
        "surah": 21,
        "ayah": 67
      },
      {
        "surah": 21,
        "ayah": 68
      },
      {
        "surah": 21,
        "ayah": 69
      },
      {
        "surah": 21,
        "ayah": 70
      },
      {
        "surah": 21,
        "ayah": 71
      },
      {
        "surah": 21,
        "ayah": 72
      }
    ]
  },
  {
    "page": 328,
    "juz": 17,
    "hizb": 33,
    "rub": 131,
    "surahs": [
      21
    ],
    "startSurah": 21,
    "startAyah": 73,
    "endSurah": 21,
    "endAyah": 81,
    "verses": [
      {
        "surah": 21,
        "ayah": 73
      },
      {
        "surah": 21,
        "ayah": 74
      },
      {
        "surah": 21,
        "ayah": 75
      },
      {
        "surah": 21,
        "ayah": 76
      },
      {
        "surah": 21,
        "ayah": 77
      },
      {
        "surah": 21,
        "ayah": 78
      },
      {
        "surah": 21,
        "ayah": 79
      },
      {
        "surah": 21,
        "ayah": 80
      },
      {
        "surah": 21,
        "ayah": 81
      }
    ]
  },
  {
    "page": 329,
    "juz": 17,
    "hizb": 33,
    "rub": 131,
    "surahs": [
      21
    ],
    "startSurah": 21,
    "startAyah": 82,
    "endSurah": 21,
    "endAyah": 90,
    "verses": [
      {
        "surah": 21,
        "ayah": 82
      },
      {
        "surah": 21,
        "ayah": 83
      },
      {
        "surah": 21,
        "ayah": 84
      },
      {
        "surah": 21,
        "ayah": 85
      },
      {
        "surah": 21,
        "ayah": 86
      },
      {
        "surah": 21,
        "ayah": 87
      },
      {
        "surah": 21,
        "ayah": 88
      },
      {
        "surah": 21,
        "ayah": 89
      },
      {
        "surah": 21,
        "ayah": 90
      }
    ]
  },
  {
    "page": 330,
    "juz": 17,
    "hizb": 33,
    "rub": 132,
    "surahs": [
      21
    ],
    "startSurah": 21,
    "startAyah": 91,
    "endSurah": 21,
    "endAyah": 101,
    "verses": [
      {
        "surah": 21,
        "ayah": 91
      },
      {
        "surah": 21,
        "ayah": 92
      },
      {
        "surah": 21,
        "ayah": 93
      },
      {
        "surah": 21,
        "ayah": 94
      },
      {
        "surah": 21,
        "ayah": 95
      },
      {
        "surah": 21,
        "ayah": 96
      },
      {
        "surah": 21,
        "ayah": 97
      },
      {
        "surah": 21,
        "ayah": 98
      },
      {
        "surah": 21,
        "ayah": 99
      },
      {
        "surah": 21,
        "ayah": 100
      },
      {
        "surah": 21,
        "ayah": 101
      }
    ]
  },
  {
    "page": 331,
    "juz": 17,
    "hizb": 33,
    "rub": 132,
    "surahs": [
      21
    ],
    "startSurah": 21,
    "startAyah": 102,
    "endSurah": 21,
    "endAyah": 112,
    "verses": [
      {
        "surah": 21,
        "ayah": 102
      },
      {
        "surah": 21,
        "ayah": 103
      },
      {
        "surah": 21,
        "ayah": 104
      },
      {
        "surah": 21,
        "ayah": 105
      },
      {
        "surah": 21,
        "ayah": 106
      },
      {
        "surah": 21,
        "ayah": 107
      },
      {
        "surah": 21,
        "ayah": 108
      },
      {
        "surah": 21,
        "ayah": 109
      },
      {
        "surah": 21,
        "ayah": 110
      },
      {
        "surah": 21,
        "ayah": 111
      },
      {
        "surah": 21,
        "ayah": 112
      }
    ]
  },
  {
    "page": 332,
    "juz": 17,
    "hizb": 34,
    "rub": 133,
    "surahs": [
      22
    ],
    "startSurah": 22,
    "startAyah": 1,
    "endSurah": 22,
    "endAyah": 5,
    "verses": [
      {
        "surah": 22,
        "ayah": 1
      },
      {
        "surah": 22,
        "ayah": 2
      },
      {
        "surah": 22,
        "ayah": 3
      },
      {
        "surah": 22,
        "ayah": 4
      },
      {
        "surah": 22,
        "ayah": 5
      }
    ]
  },
  {
    "page": 333,
    "juz": 17,
    "hizb": 34,
    "rub": 133,
    "surahs": [
      22
    ],
    "startSurah": 22,
    "startAyah": 6,
    "endSurah": 22,
    "endAyah": 15,
    "verses": [
      {
        "surah": 22,
        "ayah": 6
      },
      {
        "surah": 22,
        "ayah": 7
      },
      {
        "surah": 22,
        "ayah": 8
      },
      {
        "surah": 22,
        "ayah": 9
      },
      {
        "surah": 22,
        "ayah": 10
      },
      {
        "surah": 22,
        "ayah": 11
      },
      {
        "surah": 22,
        "ayah": 12
      },
      {
        "surah": 22,
        "ayah": 13
      },
      {
        "surah": 22,
        "ayah": 14
      },
      {
        "surah": 22,
        "ayah": 15
      }
    ]
  },
  {
    "page": 334,
    "juz": 17,
    "hizb": 34,
    "rub": 133,
    "surahs": [
      22
    ],
    "startSurah": 22,
    "startAyah": 16,
    "endSurah": 22,
    "endAyah": 23,
    "verses": [
      {
        "surah": 22,
        "ayah": 16
      },
      {
        "surah": 22,
        "ayah": 17
      },
      {
        "surah": 22,
        "ayah": 18
      },
      {
        "surah": 22,
        "ayah": 19
      },
      {
        "surah": 22,
        "ayah": 20
      },
      {
        "surah": 22,
        "ayah": 21
      },
      {
        "surah": 22,
        "ayah": 22
      },
      {
        "surah": 22,
        "ayah": 23
      }
    ]
  },
  {
    "page": 335,
    "juz": 17,
    "hizb": 34,
    "rub": 134,
    "surahs": [
      22
    ],
    "startSurah": 22,
    "startAyah": 24,
    "endSurah": 22,
    "endAyah": 30,
    "verses": [
      {
        "surah": 22,
        "ayah": 24
      },
      {
        "surah": 22,
        "ayah": 25
      },
      {
        "surah": 22,
        "ayah": 26
      },
      {
        "surah": 22,
        "ayah": 27
      },
      {
        "surah": 22,
        "ayah": 28
      },
      {
        "surah": 22,
        "ayah": 29
      },
      {
        "surah": 22,
        "ayah": 30
      }
    ]
  },
  {
    "page": 336,
    "juz": 17,
    "hizb": 34,
    "rub": 134,
    "surahs": [
      22
    ],
    "startSurah": 22,
    "startAyah": 31,
    "endSurah": 22,
    "endAyah": 38,
    "verses": [
      {
        "surah": 22,
        "ayah": 31
      },
      {
        "surah": 22,
        "ayah": 32
      },
      {
        "surah": 22,
        "ayah": 33
      },
      {
        "surah": 22,
        "ayah": 34
      },
      {
        "surah": 22,
        "ayah": 35
      },
      {
        "surah": 22,
        "ayah": 36
      },
      {
        "surah": 22,
        "ayah": 37
      },
      {
        "surah": 22,
        "ayah": 38
      }
    ]
  },
  {
    "page": 337,
    "juz": 17,
    "hizb": 34,
    "rub": 135,
    "surahs": [
      22
    ],
    "startSurah": 22,
    "startAyah": 39,
    "endSurah": 22,
    "endAyah": 46,
    "verses": [
      {
        "surah": 22,
        "ayah": 39
      },
      {
        "surah": 22,
        "ayah": 40
      },
      {
        "surah": 22,
        "ayah": 41
      },
      {
        "surah": 22,
        "ayah": 42
      },
      {
        "surah": 22,
        "ayah": 43
      },
      {
        "surah": 22,
        "ayah": 44
      },
      {
        "surah": 22,
        "ayah": 45
      },
      {
        "surah": 22,
        "ayah": 46
      }
    ]
  },
  {
    "page": 338,
    "juz": 17,
    "hizb": 34,
    "rub": 135,
    "surahs": [
      22
    ],
    "startSurah": 22,
    "startAyah": 47,
    "endSurah": 22,
    "endAyah": 55,
    "verses": [
      {
        "surah": 22,
        "ayah": 47
      },
      {
        "surah": 22,
        "ayah": 48
      },
      {
        "surah": 22,
        "ayah": 49
      },
      {
        "surah": 22,
        "ayah": 50
      },
      {
        "surah": 22,
        "ayah": 51
      },
      {
        "surah": 22,
        "ayah": 52
      },
      {
        "surah": 22,
        "ayah": 53
      },
      {
        "surah": 22,
        "ayah": 54
      },
      {
        "surah": 22,
        "ayah": 55
      }
    ]
  },
  {
    "page": 339,
    "juz": 17,
    "hizb": 34,
    "rub": 135,
    "surahs": [
      22
    ],
    "startSurah": 22,
    "startAyah": 56,
    "endSurah": 22,
    "endAyah": 64,
    "verses": [
      {
        "surah": 22,
        "ayah": 56
      },
      {
        "surah": 22,
        "ayah": 57
      },
      {
        "surah": 22,
        "ayah": 58
      },
      {
        "surah": 22,
        "ayah": 59
      },
      {
        "surah": 22,
        "ayah": 60
      },
      {
        "surah": 22,
        "ayah": 61
      },
      {
        "surah": 22,
        "ayah": 62
      },
      {
        "surah": 22,
        "ayah": 63
      },
      {
        "surah": 22,
        "ayah": 64
      }
    ]
  },
  {
    "page": 340,
    "juz": 17,
    "hizb": 34,
    "rub": 136,
    "surahs": [
      22
    ],
    "startSurah": 22,
    "startAyah": 65,
    "endSurah": 22,
    "endAyah": 72,
    "verses": [
      {
        "surah": 22,
        "ayah": 65
      },
      {
        "surah": 22,
        "ayah": 66
      },
      {
        "surah": 22,
        "ayah": 67
      },
      {
        "surah": 22,
        "ayah": 68
      },
      {
        "surah": 22,
        "ayah": 69
      },
      {
        "surah": 22,
        "ayah": 70
      },
      {
        "surah": 22,
        "ayah": 71
      },
      {
        "surah": 22,
        "ayah": 72
      }
    ]
  },
  {
    "page": 341,
    "juz": 17,
    "hizb": 34,
    "rub": 136,
    "surahs": [
      22
    ],
    "startSurah": 22,
    "startAyah": 73,
    "endSurah": 22,
    "endAyah": 78,
    "verses": [
      {
        "surah": 22,
        "ayah": 73
      },
      {
        "surah": 22,
        "ayah": 74
      },
      {
        "surah": 22,
        "ayah": 75
      },
      {
        "surah": 22,
        "ayah": 76
      },
      {
        "surah": 22,
        "ayah": 77
      },
      {
        "surah": 22,
        "ayah": 78
      }
    ]
  },
  {
    "page": 342,
    "juz": 18,
    "hizb": 35,
    "rub": 137,
    "surahs": [
      23
    ],
    "startSurah": 23,
    "startAyah": 1,
    "endSurah": 23,
    "endAyah": 17,
    "verses": [
      {
        "surah": 23,
        "ayah": 1
      },
      {
        "surah": 23,
        "ayah": 2
      },
      {
        "surah": 23,
        "ayah": 3
      },
      {
        "surah": 23,
        "ayah": 4
      },
      {
        "surah": 23,
        "ayah": 5
      },
      {
        "surah": 23,
        "ayah": 6
      },
      {
        "surah": 23,
        "ayah": 7
      },
      {
        "surah": 23,
        "ayah": 8
      },
      {
        "surah": 23,
        "ayah": 9
      },
      {
        "surah": 23,
        "ayah": 10
      },
      {
        "surah": 23,
        "ayah": 11
      },
      {
        "surah": 23,
        "ayah": 12
      },
      {
        "surah": 23,
        "ayah": 13
      },
      {
        "surah": 23,
        "ayah": 14
      },
      {
        "surah": 23,
        "ayah": 15
      },
      {
        "surah": 23,
        "ayah": 16
      },
      {
        "surah": 23,
        "ayah": 17
      }
    ]
  },
  {
    "page": 343,
    "juz": 18,
    "hizb": 35,
    "rub": 137,
    "surahs": [
      23
    ],
    "startSurah": 23,
    "startAyah": 18,
    "endSurah": 23,
    "endAyah": 27,
    "verses": [
      {
        "surah": 23,
        "ayah": 18
      },
      {
        "surah": 23,
        "ayah": 19
      },
      {
        "surah": 23,
        "ayah": 20
      },
      {
        "surah": 23,
        "ayah": 21
      },
      {
        "surah": 23,
        "ayah": 22
      },
      {
        "surah": 23,
        "ayah": 23
      },
      {
        "surah": 23,
        "ayah": 24
      },
      {
        "surah": 23,
        "ayah": 25
      },
      {
        "surah": 23,
        "ayah": 26
      },
      {
        "surah": 23,
        "ayah": 27
      }
    ]
  },
  {
    "page": 344,
    "juz": 18,
    "hizb": 35,
    "rub": 137,
    "surahs": [
      23
    ],
    "startSurah": 23,
    "startAyah": 28,
    "endSurah": 23,
    "endAyah": 42,
    "verses": [
      {
        "surah": 23,
        "ayah": 28
      },
      {
        "surah": 23,
        "ayah": 29
      },
      {
        "surah": 23,
        "ayah": 30
      },
      {
        "surah": 23,
        "ayah": 31
      },
      {
        "surah": 23,
        "ayah": 32
      },
      {
        "surah": 23,
        "ayah": 33
      },
      {
        "surah": 23,
        "ayah": 34
      },
      {
        "surah": 23,
        "ayah": 35
      },
      {
        "surah": 23,
        "ayah": 36
      },
      {
        "surah": 23,
        "ayah": 37
      },
      {
        "surah": 23,
        "ayah": 38
      },
      {
        "surah": 23,
        "ayah": 39
      },
      {
        "surah": 23,
        "ayah": 40
      },
      {
        "surah": 23,
        "ayah": 41
      },
      {
        "surah": 23,
        "ayah": 42
      }
    ]
  },
  {
    "page": 345,
    "juz": 18,
    "hizb": 35,
    "rub": 138,
    "surahs": [
      23
    ],
    "startSurah": 23,
    "startAyah": 43,
    "endSurah": 23,
    "endAyah": 59,
    "verses": [
      {
        "surah": 23,
        "ayah": 43
      },
      {
        "surah": 23,
        "ayah": 44
      },
      {
        "surah": 23,
        "ayah": 45
      },
      {
        "surah": 23,
        "ayah": 46
      },
      {
        "surah": 23,
        "ayah": 47
      },
      {
        "surah": 23,
        "ayah": 48
      },
      {
        "surah": 23,
        "ayah": 49
      },
      {
        "surah": 23,
        "ayah": 50
      },
      {
        "surah": 23,
        "ayah": 51
      },
      {
        "surah": 23,
        "ayah": 52
      },
      {
        "surah": 23,
        "ayah": 53
      },
      {
        "surah": 23,
        "ayah": 54
      },
      {
        "surah": 23,
        "ayah": 55
      },
      {
        "surah": 23,
        "ayah": 56
      },
      {
        "surah": 23,
        "ayah": 57
      },
      {
        "surah": 23,
        "ayah": 58
      },
      {
        "surah": 23,
        "ayah": 59
      }
    ]
  },
  {
    "page": 346,
    "juz": 18,
    "hizb": 35,
    "rub": 138,
    "surahs": [
      23
    ],
    "startSurah": 23,
    "startAyah": 60,
    "endSurah": 23,
    "endAyah": 74,
    "verses": [
      {
        "surah": 23,
        "ayah": 60
      },
      {
        "surah": 23,
        "ayah": 61
      },
      {
        "surah": 23,
        "ayah": 62
      },
      {
        "surah": 23,
        "ayah": 63
      },
      {
        "surah": 23,
        "ayah": 64
      },
      {
        "surah": 23,
        "ayah": 65
      },
      {
        "surah": 23,
        "ayah": 66
      },
      {
        "surah": 23,
        "ayah": 67
      },
      {
        "surah": 23,
        "ayah": 68
      },
      {
        "surah": 23,
        "ayah": 69
      },
      {
        "surah": 23,
        "ayah": 70
      },
      {
        "surah": 23,
        "ayah": 71
      },
      {
        "surah": 23,
        "ayah": 72
      },
      {
        "surah": 23,
        "ayah": 73
      },
      {
        "surah": 23,
        "ayah": 74
      }
    ]
  },
  {
    "page": 347,
    "juz": 18,
    "hizb": 35,
    "rub": 139,
    "surahs": [
      23
    ],
    "startSurah": 23,
    "startAyah": 75,
    "endSurah": 23,
    "endAyah": 89,
    "verses": [
      {
        "surah": 23,
        "ayah": 75
      },
      {
        "surah": 23,
        "ayah": 76
      },
      {
        "surah": 23,
        "ayah": 77
      },
      {
        "surah": 23,
        "ayah": 78
      },
      {
        "surah": 23,
        "ayah": 79
      },
      {
        "surah": 23,
        "ayah": 80
      },
      {
        "surah": 23,
        "ayah": 81
      },
      {
        "surah": 23,
        "ayah": 82
      },
      {
        "surah": 23,
        "ayah": 83
      },
      {
        "surah": 23,
        "ayah": 84
      },
      {
        "surah": 23,
        "ayah": 85
      },
      {
        "surah": 23,
        "ayah": 86
      },
      {
        "surah": 23,
        "ayah": 87
      },
      {
        "surah": 23,
        "ayah": 88
      },
      {
        "surah": 23,
        "ayah": 89
      }
    ]
  },
  {
    "page": 348,
    "juz": 18,
    "hizb": 35,
    "rub": 139,
    "surahs": [
      23
    ],
    "startSurah": 23,
    "startAyah": 90,
    "endSurah": 23,
    "endAyah": 104,
    "verses": [
      {
        "surah": 23,
        "ayah": 90
      },
      {
        "surah": 23,
        "ayah": 91
      },
      {
        "surah": 23,
        "ayah": 92
      },
      {
        "surah": 23,
        "ayah": 93
      },
      {
        "surah": 23,
        "ayah": 94
      },
      {
        "surah": 23,
        "ayah": 95
      },
      {
        "surah": 23,
        "ayah": 96
      },
      {
        "surah": 23,
        "ayah": 97
      },
      {
        "surah": 23,
        "ayah": 98
      },
      {
        "surah": 23,
        "ayah": 99
      },
      {
        "surah": 23,
        "ayah": 100
      },
      {
        "surah": 23,
        "ayah": 101
      },
      {
        "surah": 23,
        "ayah": 102
      },
      {
        "surah": 23,
        "ayah": 103
      },
      {
        "surah": 23,
        "ayah": 104
      }
    ]
  },
  {
    "page": 349,
    "juz": 18,
    "hizb": 35,
    "rub": 139,
    "surahs": [
      23
    ],
    "startSurah": 23,
    "startAyah": 105,
    "endSurah": 23,
    "endAyah": 118,
    "verses": [
      {
        "surah": 23,
        "ayah": 105
      },
      {
        "surah": 23,
        "ayah": 106
      },
      {
        "surah": 23,
        "ayah": 107
      },
      {
        "surah": 23,
        "ayah": 108
      },
      {
        "surah": 23,
        "ayah": 109
      },
      {
        "surah": 23,
        "ayah": 110
      },
      {
        "surah": 23,
        "ayah": 111
      },
      {
        "surah": 23,
        "ayah": 112
      },
      {
        "surah": 23,
        "ayah": 113
      },
      {
        "surah": 23,
        "ayah": 114
      },
      {
        "surah": 23,
        "ayah": 115
      },
      {
        "surah": 23,
        "ayah": 116
      },
      {
        "surah": 23,
        "ayah": 117
      },
      {
        "surah": 23,
        "ayah": 118
      }
    ]
  },
  {
    "page": 350,
    "juz": 18,
    "hizb": 35,
    "rub": 140,
    "surahs": [
      24
    ],
    "startSurah": 24,
    "startAyah": 1,
    "endSurah": 24,
    "endAyah": 10,
    "verses": [
      {
        "surah": 24,
        "ayah": 1
      },
      {
        "surah": 24,
        "ayah": 2
      },
      {
        "surah": 24,
        "ayah": 3
      },
      {
        "surah": 24,
        "ayah": 4
      },
      {
        "surah": 24,
        "ayah": 5
      },
      {
        "surah": 24,
        "ayah": 6
      },
      {
        "surah": 24,
        "ayah": 7
      },
      {
        "surah": 24,
        "ayah": 8
      },
      {
        "surah": 24,
        "ayah": 9
      },
      {
        "surah": 24,
        "ayah": 10
      }
    ]
  },
  {
    "page": 351,
    "juz": 18,
    "hizb": 35,
    "rub": 140,
    "surahs": [
      24
    ],
    "startSurah": 24,
    "startAyah": 11,
    "endSurah": 24,
    "endAyah": 20,
    "verses": [
      {
        "surah": 24,
        "ayah": 11
      },
      {
        "surah": 24,
        "ayah": 12
      },
      {
        "surah": 24,
        "ayah": 13
      },
      {
        "surah": 24,
        "ayah": 14
      },
      {
        "surah": 24,
        "ayah": 15
      },
      {
        "surah": 24,
        "ayah": 16
      },
      {
        "surah": 24,
        "ayah": 17
      },
      {
        "surah": 24,
        "ayah": 18
      },
      {
        "surah": 24,
        "ayah": 19
      },
      {
        "surah": 24,
        "ayah": 20
      }
    ]
  },
  {
    "page": 352,
    "juz": 18,
    "hizb": 36,
    "rub": 141,
    "surahs": [
      24
    ],
    "startSurah": 24,
    "startAyah": 21,
    "endSurah": 24,
    "endAyah": 27,
    "verses": [
      {
        "surah": 24,
        "ayah": 21
      },
      {
        "surah": 24,
        "ayah": 22
      },
      {
        "surah": 24,
        "ayah": 23
      },
      {
        "surah": 24,
        "ayah": 24
      },
      {
        "surah": 24,
        "ayah": 25
      },
      {
        "surah": 24,
        "ayah": 26
      },
      {
        "surah": 24,
        "ayah": 27
      }
    ]
  },
  {
    "page": 353,
    "juz": 18,
    "hizb": 36,
    "rub": 141,
    "surahs": [
      24
    ],
    "startSurah": 24,
    "startAyah": 28,
    "endSurah": 24,
    "endAyah": 31,
    "verses": [
      {
        "surah": 24,
        "ayah": 28
      },
      {
        "surah": 24,
        "ayah": 29
      },
      {
        "surah": 24,
        "ayah": 30
      },
      {
        "surah": 24,
        "ayah": 31
      }
    ]
  },
  {
    "page": 354,
    "juz": 18,
    "hizb": 36,
    "rub": 141,
    "surahs": [
      24
    ],
    "startSurah": 24,
    "startAyah": 32,
    "endSurah": 24,
    "endAyah": 36,
    "verses": [
      {
        "surah": 24,
        "ayah": 32
      },
      {
        "surah": 24,
        "ayah": 33
      },
      {
        "surah": 24,
        "ayah": 34
      },
      {
        "surah": 24,
        "ayah": 35
      },
      {
        "surah": 24,
        "ayah": 36
      }
    ]
  },
  {
    "page": 355,
    "juz": 18,
    "hizb": 36,
    "rub": 142,
    "surahs": [
      24
    ],
    "startSurah": 24,
    "startAyah": 37,
    "endSurah": 24,
    "endAyah": 43,
    "verses": [
      {
        "surah": 24,
        "ayah": 37
      },
      {
        "surah": 24,
        "ayah": 38
      },
      {
        "surah": 24,
        "ayah": 39
      },
      {
        "surah": 24,
        "ayah": 40
      },
      {
        "surah": 24,
        "ayah": 41
      },
      {
        "surah": 24,
        "ayah": 42
      },
      {
        "surah": 24,
        "ayah": 43
      }
    ]
  },
  {
    "page": 356,
    "juz": 18,
    "hizb": 36,
    "rub": 142,
    "surahs": [
      24
    ],
    "startSurah": 24,
    "startAyah": 44,
    "endSurah": 24,
    "endAyah": 53,
    "verses": [
      {
        "surah": 24,
        "ayah": 44
      },
      {
        "surah": 24,
        "ayah": 45
      },
      {
        "surah": 24,
        "ayah": 46
      },
      {
        "surah": 24,
        "ayah": 47
      },
      {
        "surah": 24,
        "ayah": 48
      },
      {
        "surah": 24,
        "ayah": 49
      },
      {
        "surah": 24,
        "ayah": 50
      },
      {
        "surah": 24,
        "ayah": 51
      },
      {
        "surah": 24,
        "ayah": 52
      },
      {
        "surah": 24,
        "ayah": 53
      }
    ]
  },
  {
    "page": 357,
    "juz": 18,
    "hizb": 36,
    "rub": 143,
    "surahs": [
      24
    ],
    "startSurah": 24,
    "startAyah": 54,
    "endSurah": 24,
    "endAyah": 58,
    "verses": [
      {
        "surah": 24,
        "ayah": 54
      },
      {
        "surah": 24,
        "ayah": 55
      },
      {
        "surah": 24,
        "ayah": 56
      },
      {
        "surah": 24,
        "ayah": 57
      },
      {
        "surah": 24,
        "ayah": 58
      }
    ]
  },
  {
    "page": 358,
    "juz": 18,
    "hizb": 36,
    "rub": 143,
    "surahs": [
      24
    ],
    "startSurah": 24,
    "startAyah": 59,
    "endSurah": 24,
    "endAyah": 61,
    "verses": [
      {
        "surah": 24,
        "ayah": 59
      },
      {
        "surah": 24,
        "ayah": 60
      },
      {
        "surah": 24,
        "ayah": 61
      }
    ]
  },
  {
    "page": 359,
    "juz": 18,
    "hizb": 36,
    "rub": 143,
    "surahs": [
      24,
      25
    ],
    "startSurah": 24,
    "startAyah": 62,
    "endSurah": 25,
    "endAyah": 2,
    "verses": [
      {
        "surah": 24,
        "ayah": 62
      },
      {
        "surah": 24,
        "ayah": 63
      },
      {
        "surah": 24,
        "ayah": 64
      },
      {
        "surah": 25,
        "ayah": 1
      },
      {
        "surah": 25,
        "ayah": 2
      }
    ]
  },
  {
    "page": 360,
    "juz": 18,
    "hizb": 36,
    "rub": 144,
    "surahs": [
      25
    ],
    "startSurah": 25,
    "startAyah": 3,
    "endSurah": 25,
    "endAyah": 11,
    "verses": [
      {
        "surah": 25,
        "ayah": 3
      },
      {
        "surah": 25,
        "ayah": 4
      },
      {
        "surah": 25,
        "ayah": 5
      },
      {
        "surah": 25,
        "ayah": 6
      },
      {
        "surah": 25,
        "ayah": 7
      },
      {
        "surah": 25,
        "ayah": 8
      },
      {
        "surah": 25,
        "ayah": 9
      },
      {
        "surah": 25,
        "ayah": 10
      },
      {
        "surah": 25,
        "ayah": 11
      }
    ]
  },
  {
    "page": 361,
    "juz": 18,
    "hizb": 36,
    "rub": 144,
    "surahs": [
      25
    ],
    "startSurah": 25,
    "startAyah": 12,
    "endSurah": 25,
    "endAyah": 20,
    "verses": [
      {
        "surah": 25,
        "ayah": 12
      },
      {
        "surah": 25,
        "ayah": 13
      },
      {
        "surah": 25,
        "ayah": 14
      },
      {
        "surah": 25,
        "ayah": 15
      },
      {
        "surah": 25,
        "ayah": 16
      },
      {
        "surah": 25,
        "ayah": 17
      },
      {
        "surah": 25,
        "ayah": 18
      },
      {
        "surah": 25,
        "ayah": 19
      },
      {
        "surah": 25,
        "ayah": 20
      }
    ]
  },
  {
    "page": 362,
    "juz": 19,
    "hizb": 37,
    "rub": 145,
    "surahs": [
      25
    ],
    "startSurah": 25,
    "startAyah": 21,
    "endSurah": 25,
    "endAyah": 32,
    "verses": [
      {
        "surah": 25,
        "ayah": 21
      },
      {
        "surah": 25,
        "ayah": 22
      },
      {
        "surah": 25,
        "ayah": 23
      },
      {
        "surah": 25,
        "ayah": 24
      },
      {
        "surah": 25,
        "ayah": 25
      },
      {
        "surah": 25,
        "ayah": 26
      },
      {
        "surah": 25,
        "ayah": 27
      },
      {
        "surah": 25,
        "ayah": 28
      },
      {
        "surah": 25,
        "ayah": 29
      },
      {
        "surah": 25,
        "ayah": 30
      },
      {
        "surah": 25,
        "ayah": 31
      },
      {
        "surah": 25,
        "ayah": 32
      }
    ]
  },
  {
    "page": 363,
    "juz": 19,
    "hizb": 37,
    "rub": 145,
    "surahs": [
      25
    ],
    "startSurah": 25,
    "startAyah": 33,
    "endSurah": 25,
    "endAyah": 43,
    "verses": [
      {
        "surah": 25,
        "ayah": 33
      },
      {
        "surah": 25,
        "ayah": 34
      },
      {
        "surah": 25,
        "ayah": 35
      },
      {
        "surah": 25,
        "ayah": 36
      },
      {
        "surah": 25,
        "ayah": 37
      },
      {
        "surah": 25,
        "ayah": 38
      },
      {
        "surah": 25,
        "ayah": 39
      },
      {
        "surah": 25,
        "ayah": 40
      },
      {
        "surah": 25,
        "ayah": 41
      },
      {
        "surah": 25,
        "ayah": 42
      },
      {
        "surah": 25,
        "ayah": 43
      }
    ]
  },
  {
    "page": 364,
    "juz": 19,
    "hizb": 37,
    "rub": 145,
    "surahs": [
      25
    ],
    "startSurah": 25,
    "startAyah": 44,
    "endSurah": 25,
    "endAyah": 55,
    "verses": [
      {
        "surah": 25,
        "ayah": 44
      },
      {
        "surah": 25,
        "ayah": 45
      },
      {
        "surah": 25,
        "ayah": 46
      },
      {
        "surah": 25,
        "ayah": 47
      },
      {
        "surah": 25,
        "ayah": 48
      },
      {
        "surah": 25,
        "ayah": 49
      },
      {
        "surah": 25,
        "ayah": 50
      },
      {
        "surah": 25,
        "ayah": 51
      },
      {
        "surah": 25,
        "ayah": 52
      },
      {
        "surah": 25,
        "ayah": 53
      },
      {
        "surah": 25,
        "ayah": 54
      },
      {
        "surah": 25,
        "ayah": 55
      }
    ]
  },
  {
    "page": 365,
    "juz": 19,
    "hizb": 37,
    "rub": 146,
    "surahs": [
      25
    ],
    "startSurah": 25,
    "startAyah": 56,
    "endSurah": 25,
    "endAyah": 67,
    "verses": [
      {
        "surah": 25,
        "ayah": 56
      },
      {
        "surah": 25,
        "ayah": 57
      },
      {
        "surah": 25,
        "ayah": 58
      },
      {
        "surah": 25,
        "ayah": 59
      },
      {
        "surah": 25,
        "ayah": 60
      },
      {
        "surah": 25,
        "ayah": 61
      },
      {
        "surah": 25,
        "ayah": 62
      },
      {
        "surah": 25,
        "ayah": 63
      },
      {
        "surah": 25,
        "ayah": 64
      },
      {
        "surah": 25,
        "ayah": 65
      },
      {
        "surah": 25,
        "ayah": 66
      },
      {
        "surah": 25,
        "ayah": 67
      }
    ]
  },
  {
    "page": 366,
    "juz": 19,
    "hizb": 37,
    "rub": 146,
    "surahs": [
      25
    ],
    "startSurah": 25,
    "startAyah": 68,
    "endSurah": 25,
    "endAyah": 77,
    "verses": [
      {
        "surah": 25,
        "ayah": 68
      },
      {
        "surah": 25,
        "ayah": 69
      },
      {
        "surah": 25,
        "ayah": 70
      },
      {
        "surah": 25,
        "ayah": 71
      },
      {
        "surah": 25,
        "ayah": 72
      },
      {
        "surah": 25,
        "ayah": 73
      },
      {
        "surah": 25,
        "ayah": 74
      },
      {
        "surah": 25,
        "ayah": 75
      },
      {
        "surah": 25,
        "ayah": 76
      },
      {
        "surah": 25,
        "ayah": 77
      }
    ]
  },
  {
    "page": 367,
    "juz": 19,
    "hizb": 37,
    "rub": 147,
    "surahs": [
      26
    ],
    "startSurah": 26,
    "startAyah": 1,
    "endSurah": 26,
    "endAyah": 19,
    "verses": [
      {
        "surah": 26,
        "ayah": 1
      },
      {
        "surah": 26,
        "ayah": 2
      },
      {
        "surah": 26,
        "ayah": 3
      },
      {
        "surah": 26,
        "ayah": 4
      },
      {
        "surah": 26,
        "ayah": 5
      },
      {
        "surah": 26,
        "ayah": 6
      },
      {
        "surah": 26,
        "ayah": 7
      },
      {
        "surah": 26,
        "ayah": 8
      },
      {
        "surah": 26,
        "ayah": 9
      },
      {
        "surah": 26,
        "ayah": 10
      },
      {
        "surah": 26,
        "ayah": 11
      },
      {
        "surah": 26,
        "ayah": 12
      },
      {
        "surah": 26,
        "ayah": 13
      },
      {
        "surah": 26,
        "ayah": 14
      },
      {
        "surah": 26,
        "ayah": 15
      },
      {
        "surah": 26,
        "ayah": 16
      },
      {
        "surah": 26,
        "ayah": 17
      },
      {
        "surah": 26,
        "ayah": 18
      },
      {
        "surah": 26,
        "ayah": 19
      }
    ]
  },
  {
    "page": 368,
    "juz": 19,
    "hizb": 37,
    "rub": 147,
    "surahs": [
      26
    ],
    "startSurah": 26,
    "startAyah": 20,
    "endSurah": 26,
    "endAyah": 39,
    "verses": [
      {
        "surah": 26,
        "ayah": 20
      },
      {
        "surah": 26,
        "ayah": 21
      },
      {
        "surah": 26,
        "ayah": 22
      },
      {
        "surah": 26,
        "ayah": 23
      },
      {
        "surah": 26,
        "ayah": 24
      },
      {
        "surah": 26,
        "ayah": 25
      },
      {
        "surah": 26,
        "ayah": 26
      },
      {
        "surah": 26,
        "ayah": 27
      },
      {
        "surah": 26,
        "ayah": 28
      },
      {
        "surah": 26,
        "ayah": 29
      },
      {
        "surah": 26,
        "ayah": 30
      },
      {
        "surah": 26,
        "ayah": 31
      },
      {
        "surah": 26,
        "ayah": 32
      },
      {
        "surah": 26,
        "ayah": 33
      },
      {
        "surah": 26,
        "ayah": 34
      },
      {
        "surah": 26,
        "ayah": 35
      },
      {
        "surah": 26,
        "ayah": 36
      },
      {
        "surah": 26,
        "ayah": 37
      },
      {
        "surah": 26,
        "ayah": 38
      },
      {
        "surah": 26,
        "ayah": 39
      }
    ]
  },
  {
    "page": 369,
    "juz": 19,
    "hizb": 37,
    "rub": 147,
    "surahs": [
      26
    ],
    "startSurah": 26,
    "startAyah": 40,
    "endSurah": 26,
    "endAyah": 60,
    "verses": [
      {
        "surah": 26,
        "ayah": 40
      },
      {
        "surah": 26,
        "ayah": 41
      },
      {
        "surah": 26,
        "ayah": 42
      },
      {
        "surah": 26,
        "ayah": 43
      },
      {
        "surah": 26,
        "ayah": 44
      },
      {
        "surah": 26,
        "ayah": 45
      },
      {
        "surah": 26,
        "ayah": 46
      },
      {
        "surah": 26,
        "ayah": 47
      },
      {
        "surah": 26,
        "ayah": 48
      },
      {
        "surah": 26,
        "ayah": 49
      },
      {
        "surah": 26,
        "ayah": 50
      },
      {
        "surah": 26,
        "ayah": 51
      },
      {
        "surah": 26,
        "ayah": 52
      },
      {
        "surah": 26,
        "ayah": 53
      },
      {
        "surah": 26,
        "ayah": 54
      },
      {
        "surah": 26,
        "ayah": 55
      },
      {
        "surah": 26,
        "ayah": 56
      },
      {
        "surah": 26,
        "ayah": 57
      },
      {
        "surah": 26,
        "ayah": 58
      },
      {
        "surah": 26,
        "ayah": 59
      },
      {
        "surah": 26,
        "ayah": 60
      }
    ]
  },
  {
    "page": 370,
    "juz": 19,
    "hizb": 37,
    "rub": 148,
    "surahs": [
      26
    ],
    "startSurah": 26,
    "startAyah": 61,
    "endSurah": 26,
    "endAyah": 83,
    "verses": [
      {
        "surah": 26,
        "ayah": 61
      },
      {
        "surah": 26,
        "ayah": 62
      },
      {
        "surah": 26,
        "ayah": 63
      },
      {
        "surah": 26,
        "ayah": 64
      },
      {
        "surah": 26,
        "ayah": 65
      },
      {
        "surah": 26,
        "ayah": 66
      },
      {
        "surah": 26,
        "ayah": 67
      },
      {
        "surah": 26,
        "ayah": 68
      },
      {
        "surah": 26,
        "ayah": 69
      },
      {
        "surah": 26,
        "ayah": 70
      },
      {
        "surah": 26,
        "ayah": 71
      },
      {
        "surah": 26,
        "ayah": 72
      },
      {
        "surah": 26,
        "ayah": 73
      },
      {
        "surah": 26,
        "ayah": 74
      },
      {
        "surah": 26,
        "ayah": 75
      },
      {
        "surah": 26,
        "ayah": 76
      },
      {
        "surah": 26,
        "ayah": 77
      },
      {
        "surah": 26,
        "ayah": 78
      },
      {
        "surah": 26,
        "ayah": 79
      },
      {
        "surah": 26,
        "ayah": 80
      },
      {
        "surah": 26,
        "ayah": 81
      },
      {
        "surah": 26,
        "ayah": 82
      },
      {
        "surah": 26,
        "ayah": 83
      }
    ]
  },
  {
    "page": 371,
    "juz": 19,
    "hizb": 37,
    "rub": 148,
    "surahs": [
      26
    ],
    "startSurah": 26,
    "startAyah": 84,
    "endSurah": 26,
    "endAyah": 111,
    "verses": [
      {
        "surah": 26,
        "ayah": 84
      },
      {
        "surah": 26,
        "ayah": 85
      },
      {
        "surah": 26,
        "ayah": 86
      },
      {
        "surah": 26,
        "ayah": 87
      },
      {
        "surah": 26,
        "ayah": 88
      },
      {
        "surah": 26,
        "ayah": 89
      },
      {
        "surah": 26,
        "ayah": 90
      },
      {
        "surah": 26,
        "ayah": 91
      },
      {
        "surah": 26,
        "ayah": 92
      },
      {
        "surah": 26,
        "ayah": 93
      },
      {
        "surah": 26,
        "ayah": 94
      },
      {
        "surah": 26,
        "ayah": 95
      },
      {
        "surah": 26,
        "ayah": 96
      },
      {
        "surah": 26,
        "ayah": 97
      },
      {
        "surah": 26,
        "ayah": 98
      },
      {
        "surah": 26,
        "ayah": 99
      },
      {
        "surah": 26,
        "ayah": 100
      },
      {
        "surah": 26,
        "ayah": 101
      },
      {
        "surah": 26,
        "ayah": 102
      },
      {
        "surah": 26,
        "ayah": 103
      },
      {
        "surah": 26,
        "ayah": 104
      },
      {
        "surah": 26,
        "ayah": 105
      },
      {
        "surah": 26,
        "ayah": 106
      },
      {
        "surah": 26,
        "ayah": 107
      },
      {
        "surah": 26,
        "ayah": 108
      },
      {
        "surah": 26,
        "ayah": 109
      },
      {
        "surah": 26,
        "ayah": 110
      },
      {
        "surah": 26,
        "ayah": 111
      }
    ]
  },
  {
    "page": 372,
    "juz": 19,
    "hizb": 38,
    "rub": 149,
    "surahs": [
      26
    ],
    "startSurah": 26,
    "startAyah": 112,
    "endSurah": 26,
    "endAyah": 136,
    "verses": [
      {
        "surah": 26,
        "ayah": 112
      },
      {
        "surah": 26,
        "ayah": 113
      },
      {
        "surah": 26,
        "ayah": 114
      },
      {
        "surah": 26,
        "ayah": 115
      },
      {
        "surah": 26,
        "ayah": 116
      },
      {
        "surah": 26,
        "ayah": 117
      },
      {
        "surah": 26,
        "ayah": 118
      },
      {
        "surah": 26,
        "ayah": 119
      },
      {
        "surah": 26,
        "ayah": 120
      },
      {
        "surah": 26,
        "ayah": 121
      },
      {
        "surah": 26,
        "ayah": 122
      },
      {
        "surah": 26,
        "ayah": 123
      },
      {
        "surah": 26,
        "ayah": 124
      },
      {
        "surah": 26,
        "ayah": 125
      },
      {
        "surah": 26,
        "ayah": 126
      },
      {
        "surah": 26,
        "ayah": 127
      },
      {
        "surah": 26,
        "ayah": 128
      },
      {
        "surah": 26,
        "ayah": 129
      },
      {
        "surah": 26,
        "ayah": 130
      },
      {
        "surah": 26,
        "ayah": 131
      },
      {
        "surah": 26,
        "ayah": 132
      },
      {
        "surah": 26,
        "ayah": 133
      },
      {
        "surah": 26,
        "ayah": 134
      },
      {
        "surah": 26,
        "ayah": 135
      },
      {
        "surah": 26,
        "ayah": 136
      }
    ]
  },
  {
    "page": 373,
    "juz": 19,
    "hizb": 38,
    "rub": 149,
    "surahs": [
      26
    ],
    "startSurah": 26,
    "startAyah": 137,
    "endSurah": 26,
    "endAyah": 159,
    "verses": [
      {
        "surah": 26,
        "ayah": 137
      },
      {
        "surah": 26,
        "ayah": 138
      },
      {
        "surah": 26,
        "ayah": 139
      },
      {
        "surah": 26,
        "ayah": 140
      },
      {
        "surah": 26,
        "ayah": 141
      },
      {
        "surah": 26,
        "ayah": 142
      },
      {
        "surah": 26,
        "ayah": 143
      },
      {
        "surah": 26,
        "ayah": 144
      },
      {
        "surah": 26,
        "ayah": 145
      },
      {
        "surah": 26,
        "ayah": 146
      },
      {
        "surah": 26,
        "ayah": 147
      },
      {
        "surah": 26,
        "ayah": 148
      },
      {
        "surah": 26,
        "ayah": 149
      },
      {
        "surah": 26,
        "ayah": 150
      },
      {
        "surah": 26,
        "ayah": 151
      },
      {
        "surah": 26,
        "ayah": 152
      },
      {
        "surah": 26,
        "ayah": 153
      },
      {
        "surah": 26,
        "ayah": 154
      },
      {
        "surah": 26,
        "ayah": 155
      },
      {
        "surah": 26,
        "ayah": 156
      },
      {
        "surah": 26,
        "ayah": 157
      },
      {
        "surah": 26,
        "ayah": 158
      },
      {
        "surah": 26,
        "ayah": 159
      }
    ]
  },
  {
    "page": 374,
    "juz": 19,
    "hizb": 38,
    "rub": 149,
    "surahs": [
      26
    ],
    "startSurah": 26,
    "startAyah": 160,
    "endSurah": 26,
    "endAyah": 183,
    "verses": [
      {
        "surah": 26,
        "ayah": 160
      },
      {
        "surah": 26,
        "ayah": 161
      },
      {
        "surah": 26,
        "ayah": 162
      },
      {
        "surah": 26,
        "ayah": 163
      },
      {
        "surah": 26,
        "ayah": 164
      },
      {
        "surah": 26,
        "ayah": 165
      },
      {
        "surah": 26,
        "ayah": 166
      },
      {
        "surah": 26,
        "ayah": 167
      },
      {
        "surah": 26,
        "ayah": 168
      },
      {
        "surah": 26,
        "ayah": 169
      },
      {
        "surah": 26,
        "ayah": 170
      },
      {
        "surah": 26,
        "ayah": 171
      },
      {
        "surah": 26,
        "ayah": 172
      },
      {
        "surah": 26,
        "ayah": 173
      },
      {
        "surah": 26,
        "ayah": 174
      },
      {
        "surah": 26,
        "ayah": 175
      },
      {
        "surah": 26,
        "ayah": 176
      },
      {
        "surah": 26,
        "ayah": 177
      },
      {
        "surah": 26,
        "ayah": 178
      },
      {
        "surah": 26,
        "ayah": 179
      },
      {
        "surah": 26,
        "ayah": 180
      },
      {
        "surah": 26,
        "ayah": 181
      },
      {
        "surah": 26,
        "ayah": 182
      },
      {
        "surah": 26,
        "ayah": 183
      }
    ]
  },
  {
    "page": 375,
    "juz": 19,
    "hizb": 38,
    "rub": 150,
    "surahs": [
      26
    ],
    "startSurah": 26,
    "startAyah": 184,
    "endSurah": 26,
    "endAyah": 206,
    "verses": [
      {
        "surah": 26,
        "ayah": 184
      },
      {
        "surah": 26,
        "ayah": 185
      },
      {
        "surah": 26,
        "ayah": 186
      },
      {
        "surah": 26,
        "ayah": 187
      },
      {
        "surah": 26,
        "ayah": 188
      },
      {
        "surah": 26,
        "ayah": 189
      },
      {
        "surah": 26,
        "ayah": 190
      },
      {
        "surah": 26,
        "ayah": 191
      },
      {
        "surah": 26,
        "ayah": 192
      },
      {
        "surah": 26,
        "ayah": 193
      },
      {
        "surah": 26,
        "ayah": 194
      },
      {
        "surah": 26,
        "ayah": 195
      },
      {
        "surah": 26,
        "ayah": 196
      },
      {
        "surah": 26,
        "ayah": 197
      },
      {
        "surah": 26,
        "ayah": 198
      },
      {
        "surah": 26,
        "ayah": 199
      },
      {
        "surah": 26,
        "ayah": 200
      },
      {
        "surah": 26,
        "ayah": 201
      },
      {
        "surah": 26,
        "ayah": 202
      },
      {
        "surah": 26,
        "ayah": 203
      },
      {
        "surah": 26,
        "ayah": 204
      },
      {
        "surah": 26,
        "ayah": 205
      },
      {
        "surah": 26,
        "ayah": 206
      }
    ]
  },
  {
    "page": 376,
    "juz": 19,
    "hizb": 38,
    "rub": 150,
    "surahs": [
      26
    ],
    "startSurah": 26,
    "startAyah": 207,
    "endSurah": 26,
    "endAyah": 227,
    "verses": [
      {
        "surah": 26,
        "ayah": 207
      },
      {
        "surah": 26,
        "ayah": 208
      },
      {
        "surah": 26,
        "ayah": 209
      },
      {
        "surah": 26,
        "ayah": 210
      },
      {
        "surah": 26,
        "ayah": 211
      },
      {
        "surah": 26,
        "ayah": 212
      },
      {
        "surah": 26,
        "ayah": 213
      },
      {
        "surah": 26,
        "ayah": 214
      },
      {
        "surah": 26,
        "ayah": 215
      },
      {
        "surah": 26,
        "ayah": 216
      },
      {
        "surah": 26,
        "ayah": 217
      },
      {
        "surah": 26,
        "ayah": 218
      },
      {
        "surah": 26,
        "ayah": 219
      },
      {
        "surah": 26,
        "ayah": 220
      },
      {
        "surah": 26,
        "ayah": 221
      },
      {
        "surah": 26,
        "ayah": 222
      },
      {
        "surah": 26,
        "ayah": 223
      },
      {
        "surah": 26,
        "ayah": 224
      },
      {
        "surah": 26,
        "ayah": 225
      },
      {
        "surah": 26,
        "ayah": 226
      },
      {
        "surah": 26,
        "ayah": 227
      }
    ]
  },
  {
    "page": 377,
    "juz": 19,
    "hizb": 38,
    "rub": 151,
    "surahs": [
      27
    ],
    "startSurah": 27,
    "startAyah": 1,
    "endSurah": 27,
    "endAyah": 13,
    "verses": [
      {
        "surah": 27,
        "ayah": 1
      },
      {
        "surah": 27,
        "ayah": 2
      },
      {
        "surah": 27,
        "ayah": 3
      },
      {
        "surah": 27,
        "ayah": 4
      },
      {
        "surah": 27,
        "ayah": 5
      },
      {
        "surah": 27,
        "ayah": 6
      },
      {
        "surah": 27,
        "ayah": 7
      },
      {
        "surah": 27,
        "ayah": 8
      },
      {
        "surah": 27,
        "ayah": 9
      },
      {
        "surah": 27,
        "ayah": 10
      },
      {
        "surah": 27,
        "ayah": 11
      },
      {
        "surah": 27,
        "ayah": 12
      },
      {
        "surah": 27,
        "ayah": 13
      }
    ]
  },
  {
    "page": 378,
    "juz": 19,
    "hizb": 38,
    "rub": 151,
    "surahs": [
      27
    ],
    "startSurah": 27,
    "startAyah": 14,
    "endSurah": 27,
    "endAyah": 22,
    "verses": [
      {
        "surah": 27,
        "ayah": 14
      },
      {
        "surah": 27,
        "ayah": 15
      },
      {
        "surah": 27,
        "ayah": 16
      },
      {
        "surah": 27,
        "ayah": 17
      },
      {
        "surah": 27,
        "ayah": 18
      },
      {
        "surah": 27,
        "ayah": 19
      },
      {
        "surah": 27,
        "ayah": 20
      },
      {
        "surah": 27,
        "ayah": 21
      },
      {
        "surah": 27,
        "ayah": 22
      }
    ]
  },
  {
    "page": 379,
    "juz": 19,
    "hizb": 38,
    "rub": 151,
    "surahs": [
      27
    ],
    "startSurah": 27,
    "startAyah": 23,
    "endSurah": 27,
    "endAyah": 35,
    "verses": [
      {
        "surah": 27,
        "ayah": 23
      },
      {
        "surah": 27,
        "ayah": 24
      },
      {
        "surah": 27,
        "ayah": 25
      },
      {
        "surah": 27,
        "ayah": 26
      },
      {
        "surah": 27,
        "ayah": 27
      },
      {
        "surah": 27,
        "ayah": 28
      },
      {
        "surah": 27,
        "ayah": 29
      },
      {
        "surah": 27,
        "ayah": 30
      },
      {
        "surah": 27,
        "ayah": 31
      },
      {
        "surah": 27,
        "ayah": 32
      },
      {
        "surah": 27,
        "ayah": 33
      },
      {
        "surah": 27,
        "ayah": 34
      },
      {
        "surah": 27,
        "ayah": 35
      }
    ]
  },
  {
    "page": 380,
    "juz": 19,
    "hizb": 38,
    "rub": 152,
    "surahs": [
      27
    ],
    "startSurah": 27,
    "startAyah": 36,
    "endSurah": 27,
    "endAyah": 44,
    "verses": [
      {
        "surah": 27,
        "ayah": 36
      },
      {
        "surah": 27,
        "ayah": 37
      },
      {
        "surah": 27,
        "ayah": 38
      },
      {
        "surah": 27,
        "ayah": 39
      },
      {
        "surah": 27,
        "ayah": 40
      },
      {
        "surah": 27,
        "ayah": 41
      },
      {
        "surah": 27,
        "ayah": 42
      },
      {
        "surah": 27,
        "ayah": 43
      },
      {
        "surah": 27,
        "ayah": 44
      }
    ]
  },
  {
    "page": 381,
    "juz": 19,
    "hizb": 38,
    "rub": 152,
    "surahs": [
      27
    ],
    "startSurah": 27,
    "startAyah": 45,
    "endSurah": 27,
    "endAyah": 55,
    "verses": [
      {
        "surah": 27,
        "ayah": 45
      },
      {
        "surah": 27,
        "ayah": 46
      },
      {
        "surah": 27,
        "ayah": 47
      },
      {
        "surah": 27,
        "ayah": 48
      },
      {
        "surah": 27,
        "ayah": 49
      },
      {
        "surah": 27,
        "ayah": 50
      },
      {
        "surah": 27,
        "ayah": 51
      },
      {
        "surah": 27,
        "ayah": 52
      },
      {
        "surah": 27,
        "ayah": 53
      },
      {
        "surah": 27,
        "ayah": 54
      },
      {
        "surah": 27,
        "ayah": 55
      }
    ]
  },
  {
    "page": 382,
    "juz": 20,
    "hizb": 39,
    "rub": 153,
    "surahs": [
      27
    ],
    "startSurah": 27,
    "startAyah": 56,
    "endSurah": 27,
    "endAyah": 63,
    "verses": [
      {
        "surah": 27,
        "ayah": 56
      },
      {
        "surah": 27,
        "ayah": 57
      },
      {
        "surah": 27,
        "ayah": 58
      },
      {
        "surah": 27,
        "ayah": 59
      },
      {
        "surah": 27,
        "ayah": 60
      },
      {
        "surah": 27,
        "ayah": 61
      },
      {
        "surah": 27,
        "ayah": 62
      },
      {
        "surah": 27,
        "ayah": 63
      }
    ]
  },
  {
    "page": 383,
    "juz": 20,
    "hizb": 39,
    "rub": 153,
    "surahs": [
      27
    ],
    "startSurah": 27,
    "startAyah": 64,
    "endSurah": 27,
    "endAyah": 76,
    "verses": [
      {
        "surah": 27,
        "ayah": 64
      },
      {
        "surah": 27,
        "ayah": 65
      },
      {
        "surah": 27,
        "ayah": 66
      },
      {
        "surah": 27,
        "ayah": 67
      },
      {
        "surah": 27,
        "ayah": 68
      },
      {
        "surah": 27,
        "ayah": 69
      },
      {
        "surah": 27,
        "ayah": 70
      },
      {
        "surah": 27,
        "ayah": 71
      },
      {
        "surah": 27,
        "ayah": 72
      },
      {
        "surah": 27,
        "ayah": 73
      },
      {
        "surah": 27,
        "ayah": 74
      },
      {
        "surah": 27,
        "ayah": 75
      },
      {
        "surah": 27,
        "ayah": 76
      }
    ]
  },
  {
    "page": 384,
    "juz": 20,
    "hizb": 39,
    "rub": 153,
    "surahs": [
      27
    ],
    "startSurah": 27,
    "startAyah": 77,
    "endSurah": 27,
    "endAyah": 88,
    "verses": [
      {
        "surah": 27,
        "ayah": 77
      },
      {
        "surah": 27,
        "ayah": 78
      },
      {
        "surah": 27,
        "ayah": 79
      },
      {
        "surah": 27,
        "ayah": 80
      },
      {
        "surah": 27,
        "ayah": 81
      },
      {
        "surah": 27,
        "ayah": 82
      },
      {
        "surah": 27,
        "ayah": 83
      },
      {
        "surah": 27,
        "ayah": 84
      },
      {
        "surah": 27,
        "ayah": 85
      },
      {
        "surah": 27,
        "ayah": 86
      },
      {
        "surah": 27,
        "ayah": 87
      },
      {
        "surah": 27,
        "ayah": 88
      }
    ]
  },
  {
    "page": 385,
    "juz": 20,
    "hizb": 39,
    "rub": 154,
    "surahs": [
      27,
      28
    ],
    "startSurah": 27,
    "startAyah": 89,
    "endSurah": 28,
    "endAyah": 5,
    "verses": [
      {
        "surah": 27,
        "ayah": 89
      },
      {
        "surah": 27,
        "ayah": 90
      },
      {
        "surah": 27,
        "ayah": 91
      },
      {
        "surah": 27,
        "ayah": 92
      },
      {
        "surah": 27,
        "ayah": 93
      },
      {
        "surah": 28,
        "ayah": 1
      },
      {
        "surah": 28,
        "ayah": 2
      },
      {
        "surah": 28,
        "ayah": 3
      },
      {
        "surah": 28,
        "ayah": 4
      },
      {
        "surah": 28,
        "ayah": 5
      }
    ]
  },
  {
    "page": 386,
    "juz": 20,
    "hizb": 39,
    "rub": 154,
    "surahs": [
      28
    ],
    "startSurah": 28,
    "startAyah": 6,
    "endSurah": 28,
    "endAyah": 13,
    "verses": [
      {
        "surah": 28,
        "ayah": 6
      },
      {
        "surah": 28,
        "ayah": 7
      },
      {
        "surah": 28,
        "ayah": 8
      },
      {
        "surah": 28,
        "ayah": 9
      },
      {
        "surah": 28,
        "ayah": 10
      },
      {
        "surah": 28,
        "ayah": 11
      },
      {
        "surah": 28,
        "ayah": 12
      },
      {
        "surah": 28,
        "ayah": 13
      }
    ]
  },
  {
    "page": 387,
    "juz": 20,
    "hizb": 39,
    "rub": 155,
    "surahs": [
      28
    ],
    "startSurah": 28,
    "startAyah": 14,
    "endSurah": 28,
    "endAyah": 21,
    "verses": [
      {
        "surah": 28,
        "ayah": 14
      },
      {
        "surah": 28,
        "ayah": 15
      },
      {
        "surah": 28,
        "ayah": 16
      },
      {
        "surah": 28,
        "ayah": 17
      },
      {
        "surah": 28,
        "ayah": 18
      },
      {
        "surah": 28,
        "ayah": 19
      },
      {
        "surah": 28,
        "ayah": 20
      },
      {
        "surah": 28,
        "ayah": 21
      }
    ]
  },
  {
    "page": 388,
    "juz": 20,
    "hizb": 39,
    "rub": 155,
    "surahs": [
      28
    ],
    "startSurah": 28,
    "startAyah": 22,
    "endSurah": 28,
    "endAyah": 28,
    "verses": [
      {
        "surah": 28,
        "ayah": 22
      },
      {
        "surah": 28,
        "ayah": 23
      },
      {
        "surah": 28,
        "ayah": 24
      },
      {
        "surah": 28,
        "ayah": 25
      },
      {
        "surah": 28,
        "ayah": 26
      },
      {
        "surah": 28,
        "ayah": 27
      },
      {
        "surah": 28,
        "ayah": 28
      }
    ]
  },
  {
    "page": 389,
    "juz": 20,
    "hizb": 39,
    "rub": 156,
    "surahs": [
      28
    ],
    "startSurah": 28,
    "startAyah": 29,
    "endSurah": 28,
    "endAyah": 35,
    "verses": [
      {
        "surah": 28,
        "ayah": 29
      },
      {
        "surah": 28,
        "ayah": 30
      },
      {
        "surah": 28,
        "ayah": 31
      },
      {
        "surah": 28,
        "ayah": 32
      },
      {
        "surah": 28,
        "ayah": 33
      },
      {
        "surah": 28,
        "ayah": 34
      },
      {
        "surah": 28,
        "ayah": 35
      }
    ]
  },
  {
    "page": 390,
    "juz": 20,
    "hizb": 39,
    "rub": 156,
    "surahs": [
      28
    ],
    "startSurah": 28,
    "startAyah": 36,
    "endSurah": 28,
    "endAyah": 43,
    "verses": [
      {
        "surah": 28,
        "ayah": 36
      },
      {
        "surah": 28,
        "ayah": 37
      },
      {
        "surah": 28,
        "ayah": 38
      },
      {
        "surah": 28,
        "ayah": 39
      },
      {
        "surah": 28,
        "ayah": 40
      },
      {
        "surah": 28,
        "ayah": 41
      },
      {
        "surah": 28,
        "ayah": 42
      },
      {
        "surah": 28,
        "ayah": 43
      }
    ]
  },
  {
    "page": 391,
    "juz": 20,
    "hizb": 39,
    "rub": 156,
    "surahs": [
      28
    ],
    "startSurah": 28,
    "startAyah": 44,
    "endSurah": 28,
    "endAyah": 50,
    "verses": [
      {
        "surah": 28,
        "ayah": 44
      },
      {
        "surah": 28,
        "ayah": 45
      },
      {
        "surah": 28,
        "ayah": 46
      },
      {
        "surah": 28,
        "ayah": 47
      },
      {
        "surah": 28,
        "ayah": 48
      },
      {
        "surah": 28,
        "ayah": 49
      },
      {
        "surah": 28,
        "ayah": 50
      }
    ]
  },
  {
    "page": 392,
    "juz": 20,
    "hizb": 40,
    "rub": 157,
    "surahs": [
      28
    ],
    "startSurah": 28,
    "startAyah": 51,
    "endSurah": 28,
    "endAyah": 59,
    "verses": [
      {
        "surah": 28,
        "ayah": 51
      },
      {
        "surah": 28,
        "ayah": 52
      },
      {
        "surah": 28,
        "ayah": 53
      },
      {
        "surah": 28,
        "ayah": 54
      },
      {
        "surah": 28,
        "ayah": 55
      },
      {
        "surah": 28,
        "ayah": 56
      },
      {
        "surah": 28,
        "ayah": 57
      },
      {
        "surah": 28,
        "ayah": 58
      },
      {
        "surah": 28,
        "ayah": 59
      }
    ]
  },
  {
    "page": 393,
    "juz": 20,
    "hizb": 40,
    "rub": 157,
    "surahs": [
      28
    ],
    "startSurah": 28,
    "startAyah": 60,
    "endSurah": 28,
    "endAyah": 70,
    "verses": [
      {
        "surah": 28,
        "ayah": 60
      },
      {
        "surah": 28,
        "ayah": 61
      },
      {
        "surah": 28,
        "ayah": 62
      },
      {
        "surah": 28,
        "ayah": 63
      },
      {
        "surah": 28,
        "ayah": 64
      },
      {
        "surah": 28,
        "ayah": 65
      },
      {
        "surah": 28,
        "ayah": 66
      },
      {
        "surah": 28,
        "ayah": 67
      },
      {
        "surah": 28,
        "ayah": 68
      },
      {
        "surah": 28,
        "ayah": 69
      },
      {
        "surah": 28,
        "ayah": 70
      }
    ]
  },
  {
    "page": 394,
    "juz": 20,
    "hizb": 40,
    "rub": 157,
    "surahs": [
      28
    ],
    "startSurah": 28,
    "startAyah": 71,
    "endSurah": 28,
    "endAyah": 77,
    "verses": [
      {
        "surah": 28,
        "ayah": 71
      },
      {
        "surah": 28,
        "ayah": 72
      },
      {
        "surah": 28,
        "ayah": 73
      },
      {
        "surah": 28,
        "ayah": 74
      },
      {
        "surah": 28,
        "ayah": 75
      },
      {
        "surah": 28,
        "ayah": 76
      },
      {
        "surah": 28,
        "ayah": 77
      }
    ]
  },
  {
    "page": 395,
    "juz": 20,
    "hizb": 40,
    "rub": 158,
    "surahs": [
      28
    ],
    "startSurah": 28,
    "startAyah": 78,
    "endSurah": 28,
    "endAyah": 84,
    "verses": [
      {
        "surah": 28,
        "ayah": 78
      },
      {
        "surah": 28,
        "ayah": 79
      },
      {
        "surah": 28,
        "ayah": 80
      },
      {
        "surah": 28,
        "ayah": 81
      },
      {
        "surah": 28,
        "ayah": 82
      },
      {
        "surah": 28,
        "ayah": 83
      },
      {
        "surah": 28,
        "ayah": 84
      }
    ]
  },
  {
    "page": 396,
    "juz": 20,
    "hizb": 40,
    "rub": 158,
    "surahs": [
      28,
      29
    ],
    "startSurah": 28,
    "startAyah": 85,
    "endSurah": 29,
    "endAyah": 6,
    "verses": [
      {
        "surah": 28,
        "ayah": 85
      },
      {
        "surah": 28,
        "ayah": 86
      },
      {
        "surah": 28,
        "ayah": 87
      },
      {
        "surah": 28,
        "ayah": 88
      },
      {
        "surah": 29,
        "ayah": 1
      },
      {
        "surah": 29,
        "ayah": 2
      },
      {
        "surah": 29,
        "ayah": 3
      },
      {
        "surah": 29,
        "ayah": 4
      },
      {
        "surah": 29,
        "ayah": 5
      },
      {
        "surah": 29,
        "ayah": 6
      }
    ]
  },
  {
    "page": 397,
    "juz": 20,
    "hizb": 40,
    "rub": 159,
    "surahs": [
      29
    ],
    "startSurah": 29,
    "startAyah": 7,
    "endSurah": 29,
    "endAyah": 14,
    "verses": [
      {
        "surah": 29,
        "ayah": 7
      },
      {
        "surah": 29,
        "ayah": 8
      },
      {
        "surah": 29,
        "ayah": 9
      },
      {
        "surah": 29,
        "ayah": 10
      },
      {
        "surah": 29,
        "ayah": 11
      },
      {
        "surah": 29,
        "ayah": 12
      },
      {
        "surah": 29,
        "ayah": 13
      },
      {
        "surah": 29,
        "ayah": 14
      }
    ]
  },
  {
    "page": 398,
    "juz": 20,
    "hizb": 40,
    "rub": 159,
    "surahs": [
      29
    ],
    "startSurah": 29,
    "startAyah": 15,
    "endSurah": 29,
    "endAyah": 23,
    "verses": [
      {
        "surah": 29,
        "ayah": 15
      },
      {
        "surah": 29,
        "ayah": 16
      },
      {
        "surah": 29,
        "ayah": 17
      },
      {
        "surah": 29,
        "ayah": 18
      },
      {
        "surah": 29,
        "ayah": 19
      },
      {
        "surah": 29,
        "ayah": 20
      },
      {
        "surah": 29,
        "ayah": 21
      },
      {
        "surah": 29,
        "ayah": 22
      },
      {
        "surah": 29,
        "ayah": 23
      }
    ]
  },
  {
    "page": 399,
    "juz": 20,
    "hizb": 40,
    "rub": 159,
    "surahs": [
      29
    ],
    "startSurah": 29,
    "startAyah": 24,
    "endSurah": 29,
    "endAyah": 30,
    "verses": [
      {
        "surah": 29,
        "ayah": 24
      },
      {
        "surah": 29,
        "ayah": 25
      },
      {
        "surah": 29,
        "ayah": 26
      },
      {
        "surah": 29,
        "ayah": 27
      },
      {
        "surah": 29,
        "ayah": 28
      },
      {
        "surah": 29,
        "ayah": 29
      },
      {
        "surah": 29,
        "ayah": 30
      }
    ]
  },
  {
    "page": 400,
    "juz": 20,
    "hizb": 40,
    "rub": 160,
    "surahs": [
      29
    ],
    "startSurah": 29,
    "startAyah": 31,
    "endSurah": 29,
    "endAyah": 38,
    "verses": [
      {
        "surah": 29,
        "ayah": 31
      },
      {
        "surah": 29,
        "ayah": 32
      },
      {
        "surah": 29,
        "ayah": 33
      },
      {
        "surah": 29,
        "ayah": 34
      },
      {
        "surah": 29,
        "ayah": 35
      },
      {
        "surah": 29,
        "ayah": 36
      },
      {
        "surah": 29,
        "ayah": 37
      },
      {
        "surah": 29,
        "ayah": 38
      }
    ]
  },
  {
    "page": 401,
    "juz": 20,
    "hizb": 40,
    "rub": 160,
    "surahs": [
      29
    ],
    "startSurah": 29,
    "startAyah": 39,
    "endSurah": 29,
    "endAyah": 45,
    "verses": [
      {
        "surah": 29,
        "ayah": 39
      },
      {
        "surah": 29,
        "ayah": 40
      },
      {
        "surah": 29,
        "ayah": 41
      },
      {
        "surah": 29,
        "ayah": 42
      },
      {
        "surah": 29,
        "ayah": 43
      },
      {
        "surah": 29,
        "ayah": 44
      },
      {
        "surah": 29,
        "ayah": 45
      }
    ]
  },
  {
    "page": 402,
    "juz": 21,
    "hizb": 41,
    "rub": 161,
    "surahs": [
      29
    ],
    "startSurah": 29,
    "startAyah": 46,
    "endSurah": 29,
    "endAyah": 52,
    "verses": [
      {
        "surah": 29,
        "ayah": 46
      },
      {
        "surah": 29,
        "ayah": 47
      },
      {
        "surah": 29,
        "ayah": 48
      },
      {
        "surah": 29,
        "ayah": 49
      },
      {
        "surah": 29,
        "ayah": 50
      },
      {
        "surah": 29,
        "ayah": 51
      },
      {
        "surah": 29,
        "ayah": 52
      }
    ]
  },
  {
    "page": 403,
    "juz": 21,
    "hizb": 41,
    "rub": 161,
    "surahs": [
      29
    ],
    "startSurah": 29,
    "startAyah": 53,
    "endSurah": 29,
    "endAyah": 63,
    "verses": [
      {
        "surah": 29,
        "ayah": 53
      },
      {
        "surah": 29,
        "ayah": 54
      },
      {
        "surah": 29,
        "ayah": 55
      },
      {
        "surah": 29,
        "ayah": 56
      },
      {
        "surah": 29,
        "ayah": 57
      },
      {
        "surah": 29,
        "ayah": 58
      },
      {
        "surah": 29,
        "ayah": 59
      },
      {
        "surah": 29,
        "ayah": 60
      },
      {
        "surah": 29,
        "ayah": 61
      },
      {
        "surah": 29,
        "ayah": 62
      },
      {
        "surah": 29,
        "ayah": 63
      }
    ]
  },
  {
    "page": 404,
    "juz": 21,
    "hizb": 41,
    "rub": 161,
    "surahs": [
      29,
      30
    ],
    "startSurah": 29,
    "startAyah": 64,
    "endSurah": 30,
    "endAyah": 5,
    "verses": [
      {
        "surah": 29,
        "ayah": 64
      },
      {
        "surah": 29,
        "ayah": 65
      },
      {
        "surah": 29,
        "ayah": 66
      },
      {
        "surah": 29,
        "ayah": 67
      },
      {
        "surah": 29,
        "ayah": 68
      },
      {
        "surah": 29,
        "ayah": 69
      },
      {
        "surah": 30,
        "ayah": 1
      },
      {
        "surah": 30,
        "ayah": 2
      },
      {
        "surah": 30,
        "ayah": 3
      },
      {
        "surah": 30,
        "ayah": 4
      },
      {
        "surah": 30,
        "ayah": 5
      }
    ]
  },
  {
    "page": 405,
    "juz": 21,
    "hizb": 41,
    "rub": 162,
    "surahs": [
      30
    ],
    "startSurah": 30,
    "startAyah": 6,
    "endSurah": 30,
    "endAyah": 15,
    "verses": [
      {
        "surah": 30,
        "ayah": 6
      },
      {
        "surah": 30,
        "ayah": 7
      },
      {
        "surah": 30,
        "ayah": 8
      },
      {
        "surah": 30,
        "ayah": 9
      },
      {
        "surah": 30,
        "ayah": 10
      },
      {
        "surah": 30,
        "ayah": 11
      },
      {
        "surah": 30,
        "ayah": 12
      },
      {
        "surah": 30,
        "ayah": 13
      },
      {
        "surah": 30,
        "ayah": 14
      },
      {
        "surah": 30,
        "ayah": 15
      }
    ]
  },
  {
    "page": 406,
    "juz": 21,
    "hizb": 41,
    "rub": 162,
    "surahs": [
      30
    ],
    "startSurah": 30,
    "startAyah": 16,
    "endSurah": 30,
    "endAyah": 24,
    "verses": [
      {
        "surah": 30,
        "ayah": 16
      },
      {
        "surah": 30,
        "ayah": 17
      },
      {
        "surah": 30,
        "ayah": 18
      },
      {
        "surah": 30,
        "ayah": 19
      },
      {
        "surah": 30,
        "ayah": 20
      },
      {
        "surah": 30,
        "ayah": 21
      },
      {
        "surah": 30,
        "ayah": 22
      },
      {
        "surah": 30,
        "ayah": 23
      },
      {
        "surah": 30,
        "ayah": 24
      }
    ]
  },
  {
    "page": 407,
    "juz": 21,
    "hizb": 41,
    "rub": 162,
    "surahs": [
      30
    ],
    "startSurah": 30,
    "startAyah": 25,
    "endSurah": 30,
    "endAyah": 32,
    "verses": [
      {
        "surah": 30,
        "ayah": 25
      },
      {
        "surah": 30,
        "ayah": 26
      },
      {
        "surah": 30,
        "ayah": 27
      },
      {
        "surah": 30,
        "ayah": 28
      },
      {
        "surah": 30,
        "ayah": 29
      },
      {
        "surah": 30,
        "ayah": 30
      },
      {
        "surah": 30,
        "ayah": 31
      },
      {
        "surah": 30,
        "ayah": 32
      }
    ]
  },
  {
    "page": 408,
    "juz": 21,
    "hizb": 41,
    "rub": 163,
    "surahs": [
      30
    ],
    "startSurah": 30,
    "startAyah": 33,
    "endSurah": 30,
    "endAyah": 41,
    "verses": [
      {
        "surah": 30,
        "ayah": 33
      },
      {
        "surah": 30,
        "ayah": 34
      },
      {
        "surah": 30,
        "ayah": 35
      },
      {
        "surah": 30,
        "ayah": 36
      },
      {
        "surah": 30,
        "ayah": 37
      },
      {
        "surah": 30,
        "ayah": 38
      },
      {
        "surah": 30,
        "ayah": 39
      },
      {
        "surah": 30,
        "ayah": 40
      },
      {
        "surah": 30,
        "ayah": 41
      }
    ]
  },
  {
    "page": 409,
    "juz": 21,
    "hizb": 41,
    "rub": 163,
    "surahs": [
      30
    ],
    "startSurah": 30,
    "startAyah": 42,
    "endSurah": 30,
    "endAyah": 50,
    "verses": [
      {
        "surah": 30,
        "ayah": 42
      },
      {
        "surah": 30,
        "ayah": 43
      },
      {
        "surah": 30,
        "ayah": 44
      },
      {
        "surah": 30,
        "ayah": 45
      },
      {
        "surah": 30,
        "ayah": 46
      },
      {
        "surah": 30,
        "ayah": 47
      },
      {
        "surah": 30,
        "ayah": 48
      },
      {
        "surah": 30,
        "ayah": 49
      },
      {
        "surah": 30,
        "ayah": 50
      }
    ]
  },
  {
    "page": 410,
    "juz": 21,
    "hizb": 41,
    "rub": 163,
    "surahs": [
      30
    ],
    "startSurah": 30,
    "startAyah": 51,
    "endSurah": 30,
    "endAyah": 60,
    "verses": [
      {
        "surah": 30,
        "ayah": 51
      },
      {
        "surah": 30,
        "ayah": 52
      },
      {
        "surah": 30,
        "ayah": 53
      },
      {
        "surah": 30,
        "ayah": 54
      },
      {
        "surah": 30,
        "ayah": 55
      },
      {
        "surah": 30,
        "ayah": 56
      },
      {
        "surah": 30,
        "ayah": 57
      },
      {
        "surah": 30,
        "ayah": 58
      },
      {
        "surah": 30,
        "ayah": 59
      },
      {
        "surah": 30,
        "ayah": 60
      }
    ]
  },
  {
    "page": 411,
    "juz": 21,
    "hizb": 41,
    "rub": 164,
    "surahs": [
      31
    ],
    "startSurah": 31,
    "startAyah": 1,
    "endSurah": 31,
    "endAyah": 11,
    "verses": [
      {
        "surah": 31,
        "ayah": 1
      },
      {
        "surah": 31,
        "ayah": 2
      },
      {
        "surah": 31,
        "ayah": 3
      },
      {
        "surah": 31,
        "ayah": 4
      },
      {
        "surah": 31,
        "ayah": 5
      },
      {
        "surah": 31,
        "ayah": 6
      },
      {
        "surah": 31,
        "ayah": 7
      },
      {
        "surah": 31,
        "ayah": 8
      },
      {
        "surah": 31,
        "ayah": 9
      },
      {
        "surah": 31,
        "ayah": 10
      },
      {
        "surah": 31,
        "ayah": 11
      }
    ]
  },
  {
    "page": 412,
    "juz": 21,
    "hizb": 41,
    "rub": 164,
    "surahs": [
      31
    ],
    "startSurah": 31,
    "startAyah": 12,
    "endSurah": 31,
    "endAyah": 19,
    "verses": [
      {
        "surah": 31,
        "ayah": 12
      },
      {
        "surah": 31,
        "ayah": 13
      },
      {
        "surah": 31,
        "ayah": 14
      },
      {
        "surah": 31,
        "ayah": 15
      },
      {
        "surah": 31,
        "ayah": 16
      },
      {
        "surah": 31,
        "ayah": 17
      },
      {
        "surah": 31,
        "ayah": 18
      },
      {
        "surah": 31,
        "ayah": 19
      }
    ]
  },
  {
    "page": 413,
    "juz": 21,
    "hizb": 41,
    "rub": 164,
    "surahs": [
      31
    ],
    "startSurah": 31,
    "startAyah": 20,
    "endSurah": 31,
    "endAyah": 28,
    "verses": [
      {
        "surah": 31,
        "ayah": 20
      },
      {
        "surah": 31,
        "ayah": 21
      },
      {
        "surah": 31,
        "ayah": 22
      },
      {
        "surah": 31,
        "ayah": 23
      },
      {
        "surah": 31,
        "ayah": 24
      },
      {
        "surah": 31,
        "ayah": 25
      },
      {
        "surah": 31,
        "ayah": 26
      },
      {
        "surah": 31,
        "ayah": 27
      },
      {
        "surah": 31,
        "ayah": 28
      }
    ]
  },
  {
    "page": 414,
    "juz": 21,
    "hizb": 42,
    "rub": 165,
    "surahs": [
      31
    ],
    "startSurah": 31,
    "startAyah": 29,
    "endSurah": 31,
    "endAyah": 34,
    "verses": [
      {
        "surah": 31,
        "ayah": 29
      },
      {
        "surah": 31,
        "ayah": 30
      },
      {
        "surah": 31,
        "ayah": 31
      },
      {
        "surah": 31,
        "ayah": 32
      },
      {
        "surah": 31,
        "ayah": 33
      },
      {
        "surah": 31,
        "ayah": 34
      }
    ]
  },
  {
    "page": 415,
    "juz": 21,
    "hizb": 42,
    "rub": 165,
    "surahs": [
      32
    ],
    "startSurah": 32,
    "startAyah": 1,
    "endSurah": 32,
    "endAyah": 11,
    "verses": [
      {
        "surah": 32,
        "ayah": 1
      },
      {
        "surah": 32,
        "ayah": 2
      },
      {
        "surah": 32,
        "ayah": 3
      },
      {
        "surah": 32,
        "ayah": 4
      },
      {
        "surah": 32,
        "ayah": 5
      },
      {
        "surah": 32,
        "ayah": 6
      },
      {
        "surah": 32,
        "ayah": 7
      },
      {
        "surah": 32,
        "ayah": 8
      },
      {
        "surah": 32,
        "ayah": 9
      },
      {
        "surah": 32,
        "ayah": 10
      },
      {
        "surah": 32,
        "ayah": 11
      }
    ]
  },
  {
    "page": 416,
    "juz": 21,
    "hizb": 42,
    "rub": 166,
    "surahs": [
      32
    ],
    "startSurah": 32,
    "startAyah": 12,
    "endSurah": 32,
    "endAyah": 20,
    "verses": [
      {
        "surah": 32,
        "ayah": 12
      },
      {
        "surah": 32,
        "ayah": 13
      },
      {
        "surah": 32,
        "ayah": 14
      },
      {
        "surah": 32,
        "ayah": 15
      },
      {
        "surah": 32,
        "ayah": 16
      },
      {
        "surah": 32,
        "ayah": 17
      },
      {
        "surah": 32,
        "ayah": 18
      },
      {
        "surah": 32,
        "ayah": 19
      },
      {
        "surah": 32,
        "ayah": 20
      }
    ]
  },
  {
    "page": 417,
    "juz": 21,
    "hizb": 42,
    "rub": 166,
    "surahs": [
      32
    ],
    "startSurah": 32,
    "startAyah": 21,
    "endSurah": 32,
    "endAyah": 30,
    "verses": [
      {
        "surah": 32,
        "ayah": 21
      },
      {
        "surah": 32,
        "ayah": 22
      },
      {
        "surah": 32,
        "ayah": 23
      },
      {
        "surah": 32,
        "ayah": 24
      },
      {
        "surah": 32,
        "ayah": 25
      },
      {
        "surah": 32,
        "ayah": 26
      },
      {
        "surah": 32,
        "ayah": 27
      },
      {
        "surah": 32,
        "ayah": 28
      },
      {
        "surah": 32,
        "ayah": 29
      },
      {
        "surah": 32,
        "ayah": 30
      }
    ]
  },
  {
    "page": 418,
    "juz": 21,
    "hizb": 42,
    "rub": 167,
    "surahs": [
      33
    ],
    "startSurah": 33,
    "startAyah": 1,
    "endSurah": 33,
    "endAyah": 6,
    "verses": [
      {
        "surah": 33,
        "ayah": 1
      },
      {
        "surah": 33,
        "ayah": 2
      },
      {
        "surah": 33,
        "ayah": 3
      },
      {
        "surah": 33,
        "ayah": 4
      },
      {
        "surah": 33,
        "ayah": 5
      },
      {
        "surah": 33,
        "ayah": 6
      }
    ]
  },
  {
    "page": 419,
    "juz": 21,
    "hizb": 42,
    "rub": 167,
    "surahs": [
      33
    ],
    "startSurah": 33,
    "startAyah": 7,
    "endSurah": 33,
    "endAyah": 15,
    "verses": [
      {
        "surah": 33,
        "ayah": 7
      },
      {
        "surah": 33,
        "ayah": 8
      },
      {
        "surah": 33,
        "ayah": 9
      },
      {
        "surah": 33,
        "ayah": 10
      },
      {
        "surah": 33,
        "ayah": 11
      },
      {
        "surah": 33,
        "ayah": 12
      },
      {
        "surah": 33,
        "ayah": 13
      },
      {
        "surah": 33,
        "ayah": 14
      },
      {
        "surah": 33,
        "ayah": 15
      }
    ]
  },
  {
    "page": 420,
    "juz": 21,
    "hizb": 42,
    "rub": 167,
    "surahs": [
      33
    ],
    "startSurah": 33,
    "startAyah": 16,
    "endSurah": 33,
    "endAyah": 22,
    "verses": [
      {
        "surah": 33,
        "ayah": 16
      },
      {
        "surah": 33,
        "ayah": 17
      },
      {
        "surah": 33,
        "ayah": 18
      },
      {
        "surah": 33,
        "ayah": 19
      },
      {
        "surah": 33,
        "ayah": 20
      },
      {
        "surah": 33,
        "ayah": 21
      },
      {
        "surah": 33,
        "ayah": 22
      }
    ]
  },
  {
    "page": 421,
    "juz": 21,
    "hizb": 42,
    "rub": 168,
    "surahs": [
      33
    ],
    "startSurah": 33,
    "startAyah": 23,
    "endSurah": 33,
    "endAyah": 30,
    "verses": [
      {
        "surah": 33,
        "ayah": 23
      },
      {
        "surah": 33,
        "ayah": 24
      },
      {
        "surah": 33,
        "ayah": 25
      },
      {
        "surah": 33,
        "ayah": 26
      },
      {
        "surah": 33,
        "ayah": 27
      },
      {
        "surah": 33,
        "ayah": 28
      },
      {
        "surah": 33,
        "ayah": 29
      },
      {
        "surah": 33,
        "ayah": 30
      }
    ]
  },
  {
    "page": 422,
    "juz": 22,
    "hizb": 43,
    "rub": 169,
    "surahs": [
      33
    ],
    "startSurah": 33,
    "startAyah": 31,
    "endSurah": 33,
    "endAyah": 35,
    "verses": [
      {
        "surah": 33,
        "ayah": 31
      },
      {
        "surah": 33,
        "ayah": 32
      },
      {
        "surah": 33,
        "ayah": 33
      },
      {
        "surah": 33,
        "ayah": 34
      },
      {
        "surah": 33,
        "ayah": 35
      }
    ]
  },
  {
    "page": 423,
    "juz": 22,
    "hizb": 43,
    "rub": 169,
    "surahs": [
      33
    ],
    "startSurah": 33,
    "startAyah": 36,
    "endSurah": 33,
    "endAyah": 43,
    "verses": [
      {
        "surah": 33,
        "ayah": 36
      },
      {
        "surah": 33,
        "ayah": 37
      },
      {
        "surah": 33,
        "ayah": 38
      },
      {
        "surah": 33,
        "ayah": 39
      },
      {
        "surah": 33,
        "ayah": 40
      },
      {
        "surah": 33,
        "ayah": 41
      },
      {
        "surah": 33,
        "ayah": 42
      },
      {
        "surah": 33,
        "ayah": 43
      }
    ]
  },
  {
    "page": 424,
    "juz": 22,
    "hizb": 43,
    "rub": 169,
    "surahs": [
      33
    ],
    "startSurah": 33,
    "startAyah": 44,
    "endSurah": 33,
    "endAyah": 50,
    "verses": [
      {
        "surah": 33,
        "ayah": 44
      },
      {
        "surah": 33,
        "ayah": 45
      },
      {
        "surah": 33,
        "ayah": 46
      },
      {
        "surah": 33,
        "ayah": 47
      },
      {
        "surah": 33,
        "ayah": 48
      },
      {
        "surah": 33,
        "ayah": 49
      },
      {
        "surah": 33,
        "ayah": 50
      }
    ]
  },
  {
    "page": 425,
    "juz": 22,
    "hizb": 43,
    "rub": 170,
    "surahs": [
      33
    ],
    "startSurah": 33,
    "startAyah": 51,
    "endSurah": 33,
    "endAyah": 54,
    "verses": [
      {
        "surah": 33,
        "ayah": 51
      },
      {
        "surah": 33,
        "ayah": 52
      },
      {
        "surah": 33,
        "ayah": 53
      },
      {
        "surah": 33,
        "ayah": 54
      }
    ]
  },
  {
    "page": 426,
    "juz": 22,
    "hizb": 43,
    "rub": 170,
    "surahs": [
      33
    ],
    "startSurah": 33,
    "startAyah": 55,
    "endSurah": 33,
    "endAyah": 62,
    "verses": [
      {
        "surah": 33,
        "ayah": 55
      },
      {
        "surah": 33,
        "ayah": 56
      },
      {
        "surah": 33,
        "ayah": 57
      },
      {
        "surah": 33,
        "ayah": 58
      },
      {
        "surah": 33,
        "ayah": 59
      },
      {
        "surah": 33,
        "ayah": 60
      },
      {
        "surah": 33,
        "ayah": 61
      },
      {
        "surah": 33,
        "ayah": 62
      }
    ]
  },
  {
    "page": 427,
    "juz": 22,
    "hizb": 43,
    "rub": 171,
    "surahs": [
      33
    ],
    "startSurah": 33,
    "startAyah": 63,
    "endSurah": 33,
    "endAyah": 73,
    "verses": [
      {
        "surah": 33,
        "ayah": 63
      },
      {
        "surah": 33,
        "ayah": 64
      },
      {
        "surah": 33,
        "ayah": 65
      },
      {
        "surah": 33,
        "ayah": 66
      },
      {
        "surah": 33,
        "ayah": 67
      },
      {
        "surah": 33,
        "ayah": 68
      },
      {
        "surah": 33,
        "ayah": 69
      },
      {
        "surah": 33,
        "ayah": 70
      },
      {
        "surah": 33,
        "ayah": 71
      },
      {
        "surah": 33,
        "ayah": 72
      },
      {
        "surah": 33,
        "ayah": 73
      }
    ]
  },
  {
    "page": 428,
    "juz": 22,
    "hizb": 43,
    "rub": 171,
    "surahs": [
      34
    ],
    "startSurah": 34,
    "startAyah": 1,
    "endSurah": 34,
    "endAyah": 7,
    "verses": [
      {
        "surah": 34,
        "ayah": 1
      },
      {
        "surah": 34,
        "ayah": 2
      },
      {
        "surah": 34,
        "ayah": 3
      },
      {
        "surah": 34,
        "ayah": 4
      },
      {
        "surah": 34,
        "ayah": 5
      },
      {
        "surah": 34,
        "ayah": 6
      },
      {
        "surah": 34,
        "ayah": 7
      }
    ]
  },
  {
    "page": 429,
    "juz": 22,
    "hizb": 43,
    "rub": 171,
    "surahs": [
      34
    ],
    "startSurah": 34,
    "startAyah": 8,
    "endSurah": 34,
    "endAyah": 14,
    "verses": [
      {
        "surah": 34,
        "ayah": 8
      },
      {
        "surah": 34,
        "ayah": 9
      },
      {
        "surah": 34,
        "ayah": 10
      },
      {
        "surah": 34,
        "ayah": 11
      },
      {
        "surah": 34,
        "ayah": 12
      },
      {
        "surah": 34,
        "ayah": 13
      },
      {
        "surah": 34,
        "ayah": 14
      }
    ]
  },
  {
    "page": 430,
    "juz": 22,
    "hizb": 43,
    "rub": 172,
    "surahs": [
      34
    ],
    "startSurah": 34,
    "startAyah": 15,
    "endSurah": 34,
    "endAyah": 22,
    "verses": [
      {
        "surah": 34,
        "ayah": 15
      },
      {
        "surah": 34,
        "ayah": 16
      },
      {
        "surah": 34,
        "ayah": 17
      },
      {
        "surah": 34,
        "ayah": 18
      },
      {
        "surah": 34,
        "ayah": 19
      },
      {
        "surah": 34,
        "ayah": 20
      },
      {
        "surah": 34,
        "ayah": 21
      },
      {
        "surah": 34,
        "ayah": 22
      }
    ]
  },
  {
    "page": 431,
    "juz": 22,
    "hizb": 43,
    "rub": 172,
    "surahs": [
      34
    ],
    "startSurah": 34,
    "startAyah": 23,
    "endSurah": 34,
    "endAyah": 31,
    "verses": [
      {
        "surah": 34,
        "ayah": 23
      },
      {
        "surah": 34,
        "ayah": 24
      },
      {
        "surah": 34,
        "ayah": 25
      },
      {
        "surah": 34,
        "ayah": 26
      },
      {
        "surah": 34,
        "ayah": 27
      },
      {
        "surah": 34,
        "ayah": 28
      },
      {
        "surah": 34,
        "ayah": 29
      },
      {
        "surah": 34,
        "ayah": 30
      },
      {
        "surah": 34,
        "ayah": 31
      }
    ]
  },
  {
    "page": 432,
    "juz": 22,
    "hizb": 44,
    "rub": 173,
    "surahs": [
      34
    ],
    "startSurah": 34,
    "startAyah": 32,
    "endSurah": 34,
    "endAyah": 39,
    "verses": [
      {
        "surah": 34,
        "ayah": 32
      },
      {
        "surah": 34,
        "ayah": 33
      },
      {
        "surah": 34,
        "ayah": 34
      },
      {
        "surah": 34,
        "ayah": 35
      },
      {
        "surah": 34,
        "ayah": 36
      },
      {
        "surah": 34,
        "ayah": 37
      },
      {
        "surah": 34,
        "ayah": 38
      },
      {
        "surah": 34,
        "ayah": 39
      }
    ]
  },
  {
    "page": 433,
    "juz": 22,
    "hizb": 44,
    "rub": 173,
    "surahs": [
      34
    ],
    "startSurah": 34,
    "startAyah": 40,
    "endSurah": 34,
    "endAyah": 48,
    "verses": [
      {
        "surah": 34,
        "ayah": 40
      },
      {
        "surah": 34,
        "ayah": 41
      },
      {
        "surah": 34,
        "ayah": 42
      },
      {
        "surah": 34,
        "ayah": 43
      },
      {
        "surah": 34,
        "ayah": 44
      },
      {
        "surah": 34,
        "ayah": 45
      },
      {
        "surah": 34,
        "ayah": 46
      },
      {
        "surah": 34,
        "ayah": 47
      },
      {
        "surah": 34,
        "ayah": 48
      }
    ]
  },
  {
    "page": 434,
    "juz": 22,
    "hizb": 44,
    "rub": 174,
    "surahs": [
      34,
      35
    ],
    "startSurah": 34,
    "startAyah": 49,
    "endSurah": 35,
    "endAyah": 3,
    "verses": [
      {
        "surah": 34,
        "ayah": 49
      },
      {
        "surah": 34,
        "ayah": 50
      },
      {
        "surah": 34,
        "ayah": 51
      },
      {
        "surah": 34,
        "ayah": 52
      },
      {
        "surah": 34,
        "ayah": 53
      },
      {
        "surah": 34,
        "ayah": 54
      },
      {
        "surah": 35,
        "ayah": 1
      },
      {
        "surah": 35,
        "ayah": 2
      },
      {
        "surah": 35,
        "ayah": 3
      }
    ]
  },
  {
    "page": 435,
    "juz": 22,
    "hizb": 44,
    "rub": 174,
    "surahs": [
      35
    ],
    "startSurah": 35,
    "startAyah": 4,
    "endSurah": 35,
    "endAyah": 11,
    "verses": [
      {
        "surah": 35,
        "ayah": 4
      },
      {
        "surah": 35,
        "ayah": 5
      },
      {
        "surah": 35,
        "ayah": 6
      },
      {
        "surah": 35,
        "ayah": 7
      },
      {
        "surah": 35,
        "ayah": 8
      },
      {
        "surah": 35,
        "ayah": 9
      },
      {
        "surah": 35,
        "ayah": 10
      },
      {
        "surah": 35,
        "ayah": 11
      }
    ]
  },
  {
    "page": 436,
    "juz": 22,
    "hizb": 44,
    "rub": 174,
    "surahs": [
      35
    ],
    "startSurah": 35,
    "startAyah": 12,
    "endSurah": 35,
    "endAyah": 18,
    "verses": [
      {
        "surah": 35,
        "ayah": 12
      },
      {
        "surah": 35,
        "ayah": 13
      },
      {
        "surah": 35,
        "ayah": 14
      },
      {
        "surah": 35,
        "ayah": 15
      },
      {
        "surah": 35,
        "ayah": 16
      },
      {
        "surah": 35,
        "ayah": 17
      },
      {
        "surah": 35,
        "ayah": 18
      }
    ]
  },
  {
    "page": 437,
    "juz": 22,
    "hizb": 44,
    "rub": 175,
    "surahs": [
      35
    ],
    "startSurah": 35,
    "startAyah": 19,
    "endSurah": 35,
    "endAyah": 30,
    "verses": [
      {
        "surah": 35,
        "ayah": 19
      },
      {
        "surah": 35,
        "ayah": 20
      },
      {
        "surah": 35,
        "ayah": 21
      },
      {
        "surah": 35,
        "ayah": 22
      },
      {
        "surah": 35,
        "ayah": 23
      },
      {
        "surah": 35,
        "ayah": 24
      },
      {
        "surah": 35,
        "ayah": 25
      },
      {
        "surah": 35,
        "ayah": 26
      },
      {
        "surah": 35,
        "ayah": 27
      },
      {
        "surah": 35,
        "ayah": 28
      },
      {
        "surah": 35,
        "ayah": 29
      },
      {
        "surah": 35,
        "ayah": 30
      }
    ]
  },
  {
    "page": 438,
    "juz": 22,
    "hizb": 44,
    "rub": 175,
    "surahs": [
      35
    ],
    "startSurah": 35,
    "startAyah": 31,
    "endSurah": 35,
    "endAyah": 38,
    "verses": [
      {
        "surah": 35,
        "ayah": 31
      },
      {
        "surah": 35,
        "ayah": 32
      },
      {
        "surah": 35,
        "ayah": 33
      },
      {
        "surah": 35,
        "ayah": 34
      },
      {
        "surah": 35,
        "ayah": 35
      },
      {
        "surah": 35,
        "ayah": 36
      },
      {
        "surah": 35,
        "ayah": 37
      },
      {
        "surah": 35,
        "ayah": 38
      }
    ]
  },
  {
    "page": 439,
    "juz": 22,
    "hizb": 44,
    "rub": 175,
    "surahs": [
      35
    ],
    "startSurah": 35,
    "startAyah": 39,
    "endSurah": 35,
    "endAyah": 44,
    "verses": [
      {
        "surah": 35,
        "ayah": 39
      },
      {
        "surah": 35,
        "ayah": 40
      },
      {
        "surah": 35,
        "ayah": 41
      },
      {
        "surah": 35,
        "ayah": 42
      },
      {
        "surah": 35,
        "ayah": 43
      },
      {
        "surah": 35,
        "ayah": 44
      }
    ]
  },
  {
    "page": 440,
    "juz": 22,
    "hizb": 44,
    "rub": 176,
    "surahs": [
      35,
      36
    ],
    "startSurah": 35,
    "startAyah": 45,
    "endSurah": 36,
    "endAyah": 12,
    "verses": [
      {
        "surah": 35,
        "ayah": 45
      },
      {
        "surah": 36,
        "ayah": 1
      },
      {
        "surah": 36,
        "ayah": 2
      },
      {
        "surah": 36,
        "ayah": 3
      },
      {
        "surah": 36,
        "ayah": 4
      },
      {
        "surah": 36,
        "ayah": 5
      },
      {
        "surah": 36,
        "ayah": 6
      },
      {
        "surah": 36,
        "ayah": 7
      },
      {
        "surah": 36,
        "ayah": 8
      },
      {
        "surah": 36,
        "ayah": 9
      },
      {
        "surah": 36,
        "ayah": 10
      },
      {
        "surah": 36,
        "ayah": 11
      },
      {
        "surah": 36,
        "ayah": 12
      }
    ]
  },
  {
    "page": 441,
    "juz": 22,
    "hizb": 44,
    "rub": 176,
    "surahs": [
      36
    ],
    "startSurah": 36,
    "startAyah": 13,
    "endSurah": 36,
    "endAyah": 27,
    "verses": [
      {
        "surah": 36,
        "ayah": 13
      },
      {
        "surah": 36,
        "ayah": 14
      },
      {
        "surah": 36,
        "ayah": 15
      },
      {
        "surah": 36,
        "ayah": 16
      },
      {
        "surah": 36,
        "ayah": 17
      },
      {
        "surah": 36,
        "ayah": 18
      },
      {
        "surah": 36,
        "ayah": 19
      },
      {
        "surah": 36,
        "ayah": 20
      },
      {
        "surah": 36,
        "ayah": 21
      },
      {
        "surah": 36,
        "ayah": 22
      },
      {
        "surah": 36,
        "ayah": 23
      },
      {
        "surah": 36,
        "ayah": 24
      },
      {
        "surah": 36,
        "ayah": 25
      },
      {
        "surah": 36,
        "ayah": 26
      },
      {
        "surah": 36,
        "ayah": 27
      }
    ]
  },
  {
    "page": 442,
    "juz": 23,
    "hizb": 45,
    "rub": 177,
    "surahs": [
      36
    ],
    "startSurah": 36,
    "startAyah": 28,
    "endSurah": 36,
    "endAyah": 40,
    "verses": [
      {
        "surah": 36,
        "ayah": 28
      },
      {
        "surah": 36,
        "ayah": 29
      },
      {
        "surah": 36,
        "ayah": 30
      },
      {
        "surah": 36,
        "ayah": 31
      },
      {
        "surah": 36,
        "ayah": 32
      },
      {
        "surah": 36,
        "ayah": 33
      },
      {
        "surah": 36,
        "ayah": 34
      },
      {
        "surah": 36,
        "ayah": 35
      },
      {
        "surah": 36,
        "ayah": 36
      },
      {
        "surah": 36,
        "ayah": 37
      },
      {
        "surah": 36,
        "ayah": 38
      },
      {
        "surah": 36,
        "ayah": 39
      },
      {
        "surah": 36,
        "ayah": 40
      }
    ]
  },
  {
    "page": 443,
    "juz": 23,
    "hizb": 45,
    "rub": 177,
    "surahs": [
      36
    ],
    "startSurah": 36,
    "startAyah": 41,
    "endSurah": 36,
    "endAyah": 54,
    "verses": [
      {
        "surah": 36,
        "ayah": 41
      },
      {
        "surah": 36,
        "ayah": 42
      },
      {
        "surah": 36,
        "ayah": 43
      },
      {
        "surah": 36,
        "ayah": 44
      },
      {
        "surah": 36,
        "ayah": 45
      },
      {
        "surah": 36,
        "ayah": 46
      },
      {
        "surah": 36,
        "ayah": 47
      },
      {
        "surah": 36,
        "ayah": 48
      },
      {
        "surah": 36,
        "ayah": 49
      },
      {
        "surah": 36,
        "ayah": 50
      },
      {
        "surah": 36,
        "ayah": 51
      },
      {
        "surah": 36,
        "ayah": 52
      },
      {
        "surah": 36,
        "ayah": 53
      },
      {
        "surah": 36,
        "ayah": 54
      }
    ]
  },
  {
    "page": 444,
    "juz": 23,
    "hizb": 45,
    "rub": 177,
    "surahs": [
      36
    ],
    "startSurah": 36,
    "startAyah": 55,
    "endSurah": 36,
    "endAyah": 70,
    "verses": [
      {
        "surah": 36,
        "ayah": 55
      },
      {
        "surah": 36,
        "ayah": 56
      },
      {
        "surah": 36,
        "ayah": 57
      },
      {
        "surah": 36,
        "ayah": 58
      },
      {
        "surah": 36,
        "ayah": 59
      },
      {
        "surah": 36,
        "ayah": 60
      },
      {
        "surah": 36,
        "ayah": 61
      },
      {
        "surah": 36,
        "ayah": 62
      },
      {
        "surah": 36,
        "ayah": 63
      },
      {
        "surah": 36,
        "ayah": 64
      },
      {
        "surah": 36,
        "ayah": 65
      },
      {
        "surah": 36,
        "ayah": 66
      },
      {
        "surah": 36,
        "ayah": 67
      },
      {
        "surah": 36,
        "ayah": 68
      },
      {
        "surah": 36,
        "ayah": 69
      },
      {
        "surah": 36,
        "ayah": 70
      }
    ]
  },
  {
    "page": 445,
    "juz": 23,
    "hizb": 45,
    "rub": 178,
    "surahs": [
      36
    ],
    "startSurah": 36,
    "startAyah": 71,
    "endSurah": 36,
    "endAyah": 83,
    "verses": [
      {
        "surah": 36,
        "ayah": 71
      },
      {
        "surah": 36,
        "ayah": 72
      },
      {
        "surah": 36,
        "ayah": 73
      },
      {
        "surah": 36,
        "ayah": 74
      },
      {
        "surah": 36,
        "ayah": 75
      },
      {
        "surah": 36,
        "ayah": 76
      },
      {
        "surah": 36,
        "ayah": 77
      },
      {
        "surah": 36,
        "ayah": 78
      },
      {
        "surah": 36,
        "ayah": 79
      },
      {
        "surah": 36,
        "ayah": 80
      },
      {
        "surah": 36,
        "ayah": 81
      },
      {
        "surah": 36,
        "ayah": 82
      },
      {
        "surah": 36,
        "ayah": 83
      }
    ]
  },
  {
    "page": 446,
    "juz": 23,
    "hizb": 45,
    "rub": 178,
    "surahs": [
      37
    ],
    "startSurah": 37,
    "startAyah": 1,
    "endSurah": 37,
    "endAyah": 24,
    "verses": [
      {
        "surah": 37,
        "ayah": 1
      },
      {
        "surah": 37,
        "ayah": 2
      },
      {
        "surah": 37,
        "ayah": 3
      },
      {
        "surah": 37,
        "ayah": 4
      },
      {
        "surah": 37,
        "ayah": 5
      },
      {
        "surah": 37,
        "ayah": 6
      },
      {
        "surah": 37,
        "ayah": 7
      },
      {
        "surah": 37,
        "ayah": 8
      },
      {
        "surah": 37,
        "ayah": 9
      },
      {
        "surah": 37,
        "ayah": 10
      },
      {
        "surah": 37,
        "ayah": 11
      },
      {
        "surah": 37,
        "ayah": 12
      },
      {
        "surah": 37,
        "ayah": 13
      },
      {
        "surah": 37,
        "ayah": 14
      },
      {
        "surah": 37,
        "ayah": 15
      },
      {
        "surah": 37,
        "ayah": 16
      },
      {
        "surah": 37,
        "ayah": 17
      },
      {
        "surah": 37,
        "ayah": 18
      },
      {
        "surah": 37,
        "ayah": 19
      },
      {
        "surah": 37,
        "ayah": 20
      },
      {
        "surah": 37,
        "ayah": 21
      },
      {
        "surah": 37,
        "ayah": 22
      },
      {
        "surah": 37,
        "ayah": 23
      },
      {
        "surah": 37,
        "ayah": 24
      }
    ]
  },
  {
    "page": 447,
    "juz": 23,
    "hizb": 45,
    "rub": 179,
    "surahs": [
      37
    ],
    "startSurah": 37,
    "startAyah": 25,
    "endSurah": 37,
    "endAyah": 51,
    "verses": [
      {
        "surah": 37,
        "ayah": 25
      },
      {
        "surah": 37,
        "ayah": 26
      },
      {
        "surah": 37,
        "ayah": 27
      },
      {
        "surah": 37,
        "ayah": 28
      },
      {
        "surah": 37,
        "ayah": 29
      },
      {
        "surah": 37,
        "ayah": 30
      },
      {
        "surah": 37,
        "ayah": 31
      },
      {
        "surah": 37,
        "ayah": 32
      },
      {
        "surah": 37,
        "ayah": 33
      },
      {
        "surah": 37,
        "ayah": 34
      },
      {
        "surah": 37,
        "ayah": 35
      },
      {
        "surah": 37,
        "ayah": 36
      },
      {
        "surah": 37,
        "ayah": 37
      },
      {
        "surah": 37,
        "ayah": 38
      },
      {
        "surah": 37,
        "ayah": 39
      },
      {
        "surah": 37,
        "ayah": 40
      },
      {
        "surah": 37,
        "ayah": 41
      },
      {
        "surah": 37,
        "ayah": 42
      },
      {
        "surah": 37,
        "ayah": 43
      },
      {
        "surah": 37,
        "ayah": 44
      },
      {
        "surah": 37,
        "ayah": 45
      },
      {
        "surah": 37,
        "ayah": 46
      },
      {
        "surah": 37,
        "ayah": 47
      },
      {
        "surah": 37,
        "ayah": 48
      },
      {
        "surah": 37,
        "ayah": 49
      },
      {
        "surah": 37,
        "ayah": 50
      },
      {
        "surah": 37,
        "ayah": 51
      }
    ]
  },
  {
    "page": 448,
    "juz": 23,
    "hizb": 45,
    "rub": 179,
    "surahs": [
      37
    ],
    "startSurah": 37,
    "startAyah": 52,
    "endSurah": 37,
    "endAyah": 76,
    "verses": [
      {
        "surah": 37,
        "ayah": 52
      },
      {
        "surah": 37,
        "ayah": 53
      },
      {
        "surah": 37,
        "ayah": 54
      },
      {
        "surah": 37,
        "ayah": 55
      },
      {
        "surah": 37,
        "ayah": 56
      },
      {
        "surah": 37,
        "ayah": 57
      },
      {
        "surah": 37,
        "ayah": 58
      },
      {
        "surah": 37,
        "ayah": 59
      },
      {
        "surah": 37,
        "ayah": 60
      },
      {
        "surah": 37,
        "ayah": 61
      },
      {
        "surah": 37,
        "ayah": 62
      },
      {
        "surah": 37,
        "ayah": 63
      },
      {
        "surah": 37,
        "ayah": 64
      },
      {
        "surah": 37,
        "ayah": 65
      },
      {
        "surah": 37,
        "ayah": 66
      },
      {
        "surah": 37,
        "ayah": 67
      },
      {
        "surah": 37,
        "ayah": 68
      },
      {
        "surah": 37,
        "ayah": 69
      },
      {
        "surah": 37,
        "ayah": 70
      },
      {
        "surah": 37,
        "ayah": 71
      },
      {
        "surah": 37,
        "ayah": 72
      },
      {
        "surah": 37,
        "ayah": 73
      },
      {
        "surah": 37,
        "ayah": 74
      },
      {
        "surah": 37,
        "ayah": 75
      },
      {
        "surah": 37,
        "ayah": 76
      }
    ]
  },
  {
    "page": 449,
    "juz": 23,
    "hizb": 45,
    "rub": 179,
    "surahs": [
      37
    ],
    "startSurah": 37,
    "startAyah": 77,
    "endSurah": 37,
    "endAyah": 102,
    "verses": [
      {
        "surah": 37,
        "ayah": 77
      },
      {
        "surah": 37,
        "ayah": 78
      },
      {
        "surah": 37,
        "ayah": 79
      },
      {
        "surah": 37,
        "ayah": 80
      },
      {
        "surah": 37,
        "ayah": 81
      },
      {
        "surah": 37,
        "ayah": 82
      },
      {
        "surah": 37,
        "ayah": 83
      },
      {
        "surah": 37,
        "ayah": 84
      },
      {
        "surah": 37,
        "ayah": 85
      },
      {
        "surah": 37,
        "ayah": 86
      },
      {
        "surah": 37,
        "ayah": 87
      },
      {
        "surah": 37,
        "ayah": 88
      },
      {
        "surah": 37,
        "ayah": 89
      },
      {
        "surah": 37,
        "ayah": 90
      },
      {
        "surah": 37,
        "ayah": 91
      },
      {
        "surah": 37,
        "ayah": 92
      },
      {
        "surah": 37,
        "ayah": 93
      },
      {
        "surah": 37,
        "ayah": 94
      },
      {
        "surah": 37,
        "ayah": 95
      },
      {
        "surah": 37,
        "ayah": 96
      },
      {
        "surah": 37,
        "ayah": 97
      },
      {
        "surah": 37,
        "ayah": 98
      },
      {
        "surah": 37,
        "ayah": 99
      },
      {
        "surah": 37,
        "ayah": 100
      },
      {
        "surah": 37,
        "ayah": 101
      },
      {
        "surah": 37,
        "ayah": 102
      }
    ]
  },
  {
    "page": 450,
    "juz": 23,
    "hizb": 45,
    "rub": 180,
    "surahs": [
      37
    ],
    "startSurah": 37,
    "startAyah": 103,
    "endSurah": 37,
    "endAyah": 126,
    "verses": [
      {
        "surah": 37,
        "ayah": 103
      },
      {
        "surah": 37,
        "ayah": 104
      },
      {
        "surah": 37,
        "ayah": 105
      },
      {
        "surah": 37,
        "ayah": 106
      },
      {
        "surah": 37,
        "ayah": 107
      },
      {
        "surah": 37,
        "ayah": 108
      },
      {
        "surah": 37,
        "ayah": 109
      },
      {
        "surah": 37,
        "ayah": 110
      },
      {
        "surah": 37,
        "ayah": 111
      },
      {
        "surah": 37,
        "ayah": 112
      },
      {
        "surah": 37,
        "ayah": 113
      },
      {
        "surah": 37,
        "ayah": 114
      },
      {
        "surah": 37,
        "ayah": 115
      },
      {
        "surah": 37,
        "ayah": 116
      },
      {
        "surah": 37,
        "ayah": 117
      },
      {
        "surah": 37,
        "ayah": 118
      },
      {
        "surah": 37,
        "ayah": 119
      },
      {
        "surah": 37,
        "ayah": 120
      },
      {
        "surah": 37,
        "ayah": 121
      },
      {
        "surah": 37,
        "ayah": 122
      },
      {
        "surah": 37,
        "ayah": 123
      },
      {
        "surah": 37,
        "ayah": 124
      },
      {
        "surah": 37,
        "ayah": 125
      },
      {
        "surah": 37,
        "ayah": 126
      }
    ]
  },
  {
    "page": 451,
    "juz": 23,
    "hizb": 45,
    "rub": 180,
    "surahs": [
      37
    ],
    "startSurah": 37,
    "startAyah": 127,
    "endSurah": 37,
    "endAyah": 153,
    "verses": [
      {
        "surah": 37,
        "ayah": 127
      },
      {
        "surah": 37,
        "ayah": 128
      },
      {
        "surah": 37,
        "ayah": 129
      },
      {
        "surah": 37,
        "ayah": 130
      },
      {
        "surah": 37,
        "ayah": 131
      },
      {
        "surah": 37,
        "ayah": 132
      },
      {
        "surah": 37,
        "ayah": 133
      },
      {
        "surah": 37,
        "ayah": 134
      },
      {
        "surah": 37,
        "ayah": 135
      },
      {
        "surah": 37,
        "ayah": 136
      },
      {
        "surah": 37,
        "ayah": 137
      },
      {
        "surah": 37,
        "ayah": 138
      },
      {
        "surah": 37,
        "ayah": 139
      },
      {
        "surah": 37,
        "ayah": 140
      },
      {
        "surah": 37,
        "ayah": 141
      },
      {
        "surah": 37,
        "ayah": 142
      },
      {
        "surah": 37,
        "ayah": 143
      },
      {
        "surah": 37,
        "ayah": 144
      },
      {
        "surah": 37,
        "ayah": 145
      },
      {
        "surah": 37,
        "ayah": 146
      },
      {
        "surah": 37,
        "ayah": 147
      },
      {
        "surah": 37,
        "ayah": 148
      },
      {
        "surah": 37,
        "ayah": 149
      },
      {
        "surah": 37,
        "ayah": 150
      },
      {
        "surah": 37,
        "ayah": 151
      },
      {
        "surah": 37,
        "ayah": 152
      },
      {
        "surah": 37,
        "ayah": 153
      }
    ]
  },
  {
    "page": 452,
    "juz": 23,
    "hizb": 46,
    "rub": 181,
    "surahs": [
      37
    ],
    "startSurah": 37,
    "startAyah": 154,
    "endSurah": 37,
    "endAyah": 182,
    "verses": [
      {
        "surah": 37,
        "ayah": 154
      },
      {
        "surah": 37,
        "ayah": 155
      },
      {
        "surah": 37,
        "ayah": 156
      },
      {
        "surah": 37,
        "ayah": 157
      },
      {
        "surah": 37,
        "ayah": 158
      },
      {
        "surah": 37,
        "ayah": 159
      },
      {
        "surah": 37,
        "ayah": 160
      },
      {
        "surah": 37,
        "ayah": 161
      },
      {
        "surah": 37,
        "ayah": 162
      },
      {
        "surah": 37,
        "ayah": 163
      },
      {
        "surah": 37,
        "ayah": 164
      },
      {
        "surah": 37,
        "ayah": 165
      },
      {
        "surah": 37,
        "ayah": 166
      },
      {
        "surah": 37,
        "ayah": 167
      },
      {
        "surah": 37,
        "ayah": 168
      },
      {
        "surah": 37,
        "ayah": 169
      },
      {
        "surah": 37,
        "ayah": 170
      },
      {
        "surah": 37,
        "ayah": 171
      },
      {
        "surah": 37,
        "ayah": 172
      },
      {
        "surah": 37,
        "ayah": 173
      },
      {
        "surah": 37,
        "ayah": 174
      },
      {
        "surah": 37,
        "ayah": 175
      },
      {
        "surah": 37,
        "ayah": 176
      },
      {
        "surah": 37,
        "ayah": 177
      },
      {
        "surah": 37,
        "ayah": 178
      },
      {
        "surah": 37,
        "ayah": 179
      },
      {
        "surah": 37,
        "ayah": 180
      },
      {
        "surah": 37,
        "ayah": 181
      },
      {
        "surah": 37,
        "ayah": 182
      }
    ]
  },
  {
    "page": 453,
    "juz": 23,
    "hizb": 46,
    "rub": 181,
    "surahs": [
      38
    ],
    "startSurah": 38,
    "startAyah": 1,
    "endSurah": 38,
    "endAyah": 16,
    "verses": [
      {
        "surah": 38,
        "ayah": 1
      },
      {
        "surah": 38,
        "ayah": 2
      },
      {
        "surah": 38,
        "ayah": 3
      },
      {
        "surah": 38,
        "ayah": 4
      },
      {
        "surah": 38,
        "ayah": 5
      },
      {
        "surah": 38,
        "ayah": 6
      },
      {
        "surah": 38,
        "ayah": 7
      },
      {
        "surah": 38,
        "ayah": 8
      },
      {
        "surah": 38,
        "ayah": 9
      },
      {
        "surah": 38,
        "ayah": 10
      },
      {
        "surah": 38,
        "ayah": 11
      },
      {
        "surah": 38,
        "ayah": 12
      },
      {
        "surah": 38,
        "ayah": 13
      },
      {
        "surah": 38,
        "ayah": 14
      },
      {
        "surah": 38,
        "ayah": 15
      },
      {
        "surah": 38,
        "ayah": 16
      }
    ]
  },
  {
    "page": 454,
    "juz": 23,
    "hizb": 46,
    "rub": 181,
    "surahs": [
      38
    ],
    "startSurah": 38,
    "startAyah": 17,
    "endSurah": 38,
    "endAyah": 26,
    "verses": [
      {
        "surah": 38,
        "ayah": 17
      },
      {
        "surah": 38,
        "ayah": 18
      },
      {
        "surah": 38,
        "ayah": 19
      },
      {
        "surah": 38,
        "ayah": 20
      },
      {
        "surah": 38,
        "ayah": 21
      },
      {
        "surah": 38,
        "ayah": 22
      },
      {
        "surah": 38,
        "ayah": 23
      },
      {
        "surah": 38,
        "ayah": 24
      },
      {
        "surah": 38,
        "ayah": 25
      },
      {
        "surah": 38,
        "ayah": 26
      }
    ]
  },
  {
    "page": 455,
    "juz": 23,
    "hizb": 46,
    "rub": 182,
    "surahs": [
      38
    ],
    "startSurah": 38,
    "startAyah": 27,
    "endSurah": 38,
    "endAyah": 42,
    "verses": [
      {
        "surah": 38,
        "ayah": 27
      },
      {
        "surah": 38,
        "ayah": 28
      },
      {
        "surah": 38,
        "ayah": 29
      },
      {
        "surah": 38,
        "ayah": 30
      },
      {
        "surah": 38,
        "ayah": 31
      },
      {
        "surah": 38,
        "ayah": 32
      },
      {
        "surah": 38,
        "ayah": 33
      },
      {
        "surah": 38,
        "ayah": 34
      },
      {
        "surah": 38,
        "ayah": 35
      },
      {
        "surah": 38,
        "ayah": 36
      },
      {
        "surah": 38,
        "ayah": 37
      },
      {
        "surah": 38,
        "ayah": 38
      },
      {
        "surah": 38,
        "ayah": 39
      },
      {
        "surah": 38,
        "ayah": 40
      },
      {
        "surah": 38,
        "ayah": 41
      },
      {
        "surah": 38,
        "ayah": 42
      }
    ]
  },
  {
    "page": 456,
    "juz": 23,
    "hizb": 46,
    "rub": 182,
    "surahs": [
      38
    ],
    "startSurah": 38,
    "startAyah": 43,
    "endSurah": 38,
    "endAyah": 61,
    "verses": [
      {
        "surah": 38,
        "ayah": 43
      },
      {
        "surah": 38,
        "ayah": 44
      },
      {
        "surah": 38,
        "ayah": 45
      },
      {
        "surah": 38,
        "ayah": 46
      },
      {
        "surah": 38,
        "ayah": 47
      },
      {
        "surah": 38,
        "ayah": 48
      },
      {
        "surah": 38,
        "ayah": 49
      },
      {
        "surah": 38,
        "ayah": 50
      },
      {
        "surah": 38,
        "ayah": 51
      },
      {
        "surah": 38,
        "ayah": 52
      },
      {
        "surah": 38,
        "ayah": 53
      },
      {
        "surah": 38,
        "ayah": 54
      },
      {
        "surah": 38,
        "ayah": 55
      },
      {
        "surah": 38,
        "ayah": 56
      },
      {
        "surah": 38,
        "ayah": 57
      },
      {
        "surah": 38,
        "ayah": 58
      },
      {
        "surah": 38,
        "ayah": 59
      },
      {
        "surah": 38,
        "ayah": 60
      },
      {
        "surah": 38,
        "ayah": 61
      }
    ]
  },
  {
    "page": 457,
    "juz": 23,
    "hizb": 46,
    "rub": 183,
    "surahs": [
      38
    ],
    "startSurah": 38,
    "startAyah": 62,
    "endSurah": 38,
    "endAyah": 83,
    "verses": [
      {
        "surah": 38,
        "ayah": 62
      },
      {
        "surah": 38,
        "ayah": 63
      },
      {
        "surah": 38,
        "ayah": 64
      },
      {
        "surah": 38,
        "ayah": 65
      },
      {
        "surah": 38,
        "ayah": 66
      },
      {
        "surah": 38,
        "ayah": 67
      },
      {
        "surah": 38,
        "ayah": 68
      },
      {
        "surah": 38,
        "ayah": 69
      },
      {
        "surah": 38,
        "ayah": 70
      },
      {
        "surah": 38,
        "ayah": 71
      },
      {
        "surah": 38,
        "ayah": 72
      },
      {
        "surah": 38,
        "ayah": 73
      },
      {
        "surah": 38,
        "ayah": 74
      },
      {
        "surah": 38,
        "ayah": 75
      },
      {
        "surah": 38,
        "ayah": 76
      },
      {
        "surah": 38,
        "ayah": 77
      },
      {
        "surah": 38,
        "ayah": 78
      },
      {
        "surah": 38,
        "ayah": 79
      },
      {
        "surah": 38,
        "ayah": 80
      },
      {
        "surah": 38,
        "ayah": 81
      },
      {
        "surah": 38,
        "ayah": 82
      },
      {
        "surah": 38,
        "ayah": 83
      }
    ]
  },
  {
    "page": 458,
    "juz": 23,
    "hizb": 46,
    "rub": 183,
    "surahs": [
      38,
      39
    ],
    "startSurah": 38,
    "startAyah": 84,
    "endSurah": 39,
    "endAyah": 5,
    "verses": [
      {
        "surah": 38,
        "ayah": 84
      },
      {
        "surah": 38,
        "ayah": 85
      },
      {
        "surah": 38,
        "ayah": 86
      },
      {
        "surah": 38,
        "ayah": 87
      },
      {
        "surah": 38,
        "ayah": 88
      },
      {
        "surah": 39,
        "ayah": 1
      },
      {
        "surah": 39,
        "ayah": 2
      },
      {
        "surah": 39,
        "ayah": 3
      },
      {
        "surah": 39,
        "ayah": 4
      },
      {
        "surah": 39,
        "ayah": 5
      }
    ]
  },
  {
    "page": 459,
    "juz": 23,
    "hizb": 46,
    "rub": 183,
    "surahs": [
      39
    ],
    "startSurah": 39,
    "startAyah": 6,
    "endSurah": 39,
    "endAyah": 10,
    "verses": [
      {
        "surah": 39,
        "ayah": 6
      },
      {
        "surah": 39,
        "ayah": 7
      },
      {
        "surah": 39,
        "ayah": 8
      },
      {
        "surah": 39,
        "ayah": 9
      },
      {
        "surah": 39,
        "ayah": 10
      }
    ]
  },
  {
    "page": 460,
    "juz": 23,
    "hizb": 46,
    "rub": 184,
    "surahs": [
      39
    ],
    "startSurah": 39,
    "startAyah": 11,
    "endSurah": 39,
    "endAyah": 21,
    "verses": [
      {
        "surah": 39,
        "ayah": 11
      },
      {
        "surah": 39,
        "ayah": 12
      },
      {
        "surah": 39,
        "ayah": 13
      },
      {
        "surah": 39,
        "ayah": 14
      },
      {
        "surah": 39,
        "ayah": 15
      },
      {
        "surah": 39,
        "ayah": 16
      },
      {
        "surah": 39,
        "ayah": 17
      },
      {
        "surah": 39,
        "ayah": 18
      },
      {
        "surah": 39,
        "ayah": 19
      },
      {
        "surah": 39,
        "ayah": 20
      },
      {
        "surah": 39,
        "ayah": 21
      }
    ]
  },
  {
    "page": 461,
    "juz": 23,
    "hizb": 46,
    "rub": 184,
    "surahs": [
      39
    ],
    "startSurah": 39,
    "startAyah": 22,
    "endSurah": 39,
    "endAyah": 31,
    "verses": [
      {
        "surah": 39,
        "ayah": 22
      },
      {
        "surah": 39,
        "ayah": 23
      },
      {
        "surah": 39,
        "ayah": 24
      },
      {
        "surah": 39,
        "ayah": 25
      },
      {
        "surah": 39,
        "ayah": 26
      },
      {
        "surah": 39,
        "ayah": 27
      },
      {
        "surah": 39,
        "ayah": 28
      },
      {
        "surah": 39,
        "ayah": 29
      },
      {
        "surah": 39,
        "ayah": 30
      },
      {
        "surah": 39,
        "ayah": 31
      }
    ]
  },
  {
    "page": 462,
    "juz": 24,
    "hizb": 47,
    "rub": 185,
    "surahs": [
      39
    ],
    "startSurah": 39,
    "startAyah": 32,
    "endSurah": 39,
    "endAyah": 40,
    "verses": [
      {
        "surah": 39,
        "ayah": 32
      },
      {
        "surah": 39,
        "ayah": 33
      },
      {
        "surah": 39,
        "ayah": 34
      },
      {
        "surah": 39,
        "ayah": 35
      },
      {
        "surah": 39,
        "ayah": 36
      },
      {
        "surah": 39,
        "ayah": 37
      },
      {
        "surah": 39,
        "ayah": 38
      },
      {
        "surah": 39,
        "ayah": 39
      },
      {
        "surah": 39,
        "ayah": 40
      }
    ]
  },
  {
    "page": 463,
    "juz": 24,
    "hizb": 47,
    "rub": 185,
    "surahs": [
      39
    ],
    "startSurah": 39,
    "startAyah": 41,
    "endSurah": 39,
    "endAyah": 47,
    "verses": [
      {
        "surah": 39,
        "ayah": 41
      },
      {
        "surah": 39,
        "ayah": 42
      },
      {
        "surah": 39,
        "ayah": 43
      },
      {
        "surah": 39,
        "ayah": 44
      },
      {
        "surah": 39,
        "ayah": 45
      },
      {
        "surah": 39,
        "ayah": 46
      },
      {
        "surah": 39,
        "ayah": 47
      }
    ]
  },
  {
    "page": 464,
    "juz": 24,
    "hizb": 47,
    "rub": 185,
    "surahs": [
      39
    ],
    "startSurah": 39,
    "startAyah": 48,
    "endSurah": 39,
    "endAyah": 56,
    "verses": [
      {
        "surah": 39,
        "ayah": 48
      },
      {
        "surah": 39,
        "ayah": 49
      },
      {
        "surah": 39,
        "ayah": 50
      },
      {
        "surah": 39,
        "ayah": 51
      },
      {
        "surah": 39,
        "ayah": 52
      },
      {
        "surah": 39,
        "ayah": 53
      },
      {
        "surah": 39,
        "ayah": 54
      },
      {
        "surah": 39,
        "ayah": 55
      },
      {
        "surah": 39,
        "ayah": 56
      }
    ]
  },
  {
    "page": 465,
    "juz": 24,
    "hizb": 47,
    "rub": 186,
    "surahs": [
      39
    ],
    "startSurah": 39,
    "startAyah": 57,
    "endSurah": 39,
    "endAyah": 67,
    "verses": [
      {
        "surah": 39,
        "ayah": 57
      },
      {
        "surah": 39,
        "ayah": 58
      },
      {
        "surah": 39,
        "ayah": 59
      },
      {
        "surah": 39,
        "ayah": 60
      },
      {
        "surah": 39,
        "ayah": 61
      },
      {
        "surah": 39,
        "ayah": 62
      },
      {
        "surah": 39,
        "ayah": 63
      },
      {
        "surah": 39,
        "ayah": 64
      },
      {
        "surah": 39,
        "ayah": 65
      },
      {
        "surah": 39,
        "ayah": 66
      },
      {
        "surah": 39,
        "ayah": 67
      }
    ]
  },
  {
    "page": 466,
    "juz": 24,
    "hizb": 47,
    "rub": 186,
    "surahs": [
      39
    ],
    "startSurah": 39,
    "startAyah": 68,
    "endSurah": 39,
    "endAyah": 74,
    "verses": [
      {
        "surah": 39,
        "ayah": 68
      },
      {
        "surah": 39,
        "ayah": 69
      },
      {
        "surah": 39,
        "ayah": 70
      },
      {
        "surah": 39,
        "ayah": 71
      },
      {
        "surah": 39,
        "ayah": 72
      },
      {
        "surah": 39,
        "ayah": 73
      },
      {
        "surah": 39,
        "ayah": 74
      }
    ]
  },
  {
    "page": 467,
    "juz": 24,
    "hizb": 47,
    "rub": 186,
    "surahs": [
      39,
      40
    ],
    "startSurah": 39,
    "startAyah": 75,
    "endSurah": 40,
    "endAyah": 7,
    "verses": [
      {
        "surah": 39,
        "ayah": 75
      },
      {
        "surah": 40,
        "ayah": 1
      },
      {
        "surah": 40,
        "ayah": 2
      },
      {
        "surah": 40,
        "ayah": 3
      },
      {
        "surah": 40,
        "ayah": 4
      },
      {
        "surah": 40,
        "ayah": 5
      },
      {
        "surah": 40,
        "ayah": 6
      },
      {
        "surah": 40,
        "ayah": 7
      }
    ]
  },
  {
    "page": 468,
    "juz": 24,
    "hizb": 47,
    "rub": 187,
    "surahs": [
      40
    ],
    "startSurah": 40,
    "startAyah": 8,
    "endSurah": 40,
    "endAyah": 16,
    "verses": [
      {
        "surah": 40,
        "ayah": 8
      },
      {
        "surah": 40,
        "ayah": 9
      },
      {
        "surah": 40,
        "ayah": 10
      },
      {
        "surah": 40,
        "ayah": 11
      },
      {
        "surah": 40,
        "ayah": 12
      },
      {
        "surah": 40,
        "ayah": 13
      },
      {
        "surah": 40,
        "ayah": 14
      },
      {
        "surah": 40,
        "ayah": 15
      },
      {
        "surah": 40,
        "ayah": 16
      }
    ]
  },
  {
    "page": 469,
    "juz": 24,
    "hizb": 47,
    "rub": 187,
    "surahs": [
      40
    ],
    "startSurah": 40,
    "startAyah": 17,
    "endSurah": 40,
    "endAyah": 25,
    "verses": [
      {
        "surah": 40,
        "ayah": 17
      },
      {
        "surah": 40,
        "ayah": 18
      },
      {
        "surah": 40,
        "ayah": 19
      },
      {
        "surah": 40,
        "ayah": 20
      },
      {
        "surah": 40,
        "ayah": 21
      },
      {
        "surah": 40,
        "ayah": 22
      },
      {
        "surah": 40,
        "ayah": 23
      },
      {
        "surah": 40,
        "ayah": 24
      },
      {
        "surah": 40,
        "ayah": 25
      }
    ]
  },
  {
    "page": 470,
    "juz": 24,
    "hizb": 47,
    "rub": 188,
    "surahs": [
      40
    ],
    "startSurah": 40,
    "startAyah": 26,
    "endSurah": 40,
    "endAyah": 33,
    "verses": [
      {
        "surah": 40,
        "ayah": 26
      },
      {
        "surah": 40,
        "ayah": 27
      },
      {
        "surah": 40,
        "ayah": 28
      },
      {
        "surah": 40,
        "ayah": 29
      },
      {
        "surah": 40,
        "ayah": 30
      },
      {
        "surah": 40,
        "ayah": 31
      },
      {
        "surah": 40,
        "ayah": 32
      },
      {
        "surah": 40,
        "ayah": 33
      }
    ]
  },
  {
    "page": 471,
    "juz": 24,
    "hizb": 47,
    "rub": 188,
    "surahs": [
      40
    ],
    "startSurah": 40,
    "startAyah": 34,
    "endSurah": 40,
    "endAyah": 40,
    "verses": [
      {
        "surah": 40,
        "ayah": 34
      },
      {
        "surah": 40,
        "ayah": 35
      },
      {
        "surah": 40,
        "ayah": 36
      },
      {
        "surah": 40,
        "ayah": 37
      },
      {
        "surah": 40,
        "ayah": 38
      },
      {
        "surah": 40,
        "ayah": 39
      },
      {
        "surah": 40,
        "ayah": 40
      }
    ]
  },
  {
    "page": 472,
    "juz": 24,
    "hizb": 48,
    "rub": 189,
    "surahs": [
      40
    ],
    "startSurah": 40,
    "startAyah": 41,
    "endSurah": 40,
    "endAyah": 49,
    "verses": [
      {
        "surah": 40,
        "ayah": 41
      },
      {
        "surah": 40,
        "ayah": 42
      },
      {
        "surah": 40,
        "ayah": 43
      },
      {
        "surah": 40,
        "ayah": 44
      },
      {
        "surah": 40,
        "ayah": 45
      },
      {
        "surah": 40,
        "ayah": 46
      },
      {
        "surah": 40,
        "ayah": 47
      },
      {
        "surah": 40,
        "ayah": 48
      },
      {
        "surah": 40,
        "ayah": 49
      }
    ]
  },
  {
    "page": 473,
    "juz": 24,
    "hizb": 48,
    "rub": 189,
    "surahs": [
      40
    ],
    "startSurah": 40,
    "startAyah": 50,
    "endSurah": 40,
    "endAyah": 58,
    "verses": [
      {
        "surah": 40,
        "ayah": 50
      },
      {
        "surah": 40,
        "ayah": 51
      },
      {
        "surah": 40,
        "ayah": 52
      },
      {
        "surah": 40,
        "ayah": 53
      },
      {
        "surah": 40,
        "ayah": 54
      },
      {
        "surah": 40,
        "ayah": 55
      },
      {
        "surah": 40,
        "ayah": 56
      },
      {
        "surah": 40,
        "ayah": 57
      },
      {
        "surah": 40,
        "ayah": 58
      }
    ]
  },
  {
    "page": 474,
    "juz": 24,
    "hizb": 48,
    "rub": 189,
    "surahs": [
      40
    ],
    "startSurah": 40,
    "startAyah": 59,
    "endSurah": 40,
    "endAyah": 66,
    "verses": [
      {
        "surah": 40,
        "ayah": 59
      },
      {
        "surah": 40,
        "ayah": 60
      },
      {
        "surah": 40,
        "ayah": 61
      },
      {
        "surah": 40,
        "ayah": 62
      },
      {
        "surah": 40,
        "ayah": 63
      },
      {
        "surah": 40,
        "ayah": 64
      },
      {
        "surah": 40,
        "ayah": 65
      },
      {
        "surah": 40,
        "ayah": 66
      }
    ]
  },
  {
    "page": 475,
    "juz": 24,
    "hizb": 48,
    "rub": 190,
    "surahs": [
      40
    ],
    "startSurah": 40,
    "startAyah": 67,
    "endSurah": 40,
    "endAyah": 77,
    "verses": [
      {
        "surah": 40,
        "ayah": 67
      },
      {
        "surah": 40,
        "ayah": 68
      },
      {
        "surah": 40,
        "ayah": 69
      },
      {
        "surah": 40,
        "ayah": 70
      },
      {
        "surah": 40,
        "ayah": 71
      },
      {
        "surah": 40,
        "ayah": 72
      },
      {
        "surah": 40,
        "ayah": 73
      },
      {
        "surah": 40,
        "ayah": 74
      },
      {
        "surah": 40,
        "ayah": 75
      },
      {
        "surah": 40,
        "ayah": 76
      },
      {
        "surah": 40,
        "ayah": 77
      }
    ]
  },
  {
    "page": 476,
    "juz": 24,
    "hizb": 48,
    "rub": 190,
    "surahs": [
      40
    ],
    "startSurah": 40,
    "startAyah": 78,
    "endSurah": 40,
    "endAyah": 85,
    "verses": [
      {
        "surah": 40,
        "ayah": 78
      },
      {
        "surah": 40,
        "ayah": 79
      },
      {
        "surah": 40,
        "ayah": 80
      },
      {
        "surah": 40,
        "ayah": 81
      },
      {
        "surah": 40,
        "ayah": 82
      },
      {
        "surah": 40,
        "ayah": 83
      },
      {
        "surah": 40,
        "ayah": 84
      },
      {
        "surah": 40,
        "ayah": 85
      }
    ]
  },
  {
    "page": 477,
    "juz": 24,
    "hizb": 48,
    "rub": 190,
    "surahs": [
      41
    ],
    "startSurah": 41,
    "startAyah": 1,
    "endSurah": 41,
    "endAyah": 11,
    "verses": [
      {
        "surah": 41,
        "ayah": 1
      },
      {
        "surah": 41,
        "ayah": 2
      },
      {
        "surah": 41,
        "ayah": 3
      },
      {
        "surah": 41,
        "ayah": 4
      },
      {
        "surah": 41,
        "ayah": 5
      },
      {
        "surah": 41,
        "ayah": 6
      },
      {
        "surah": 41,
        "ayah": 7
      },
      {
        "surah": 41,
        "ayah": 8
      },
      {
        "surah": 41,
        "ayah": 9
      },
      {
        "surah": 41,
        "ayah": 10
      },
      {
        "surah": 41,
        "ayah": 11
      }
    ]
  },
  {
    "page": 478,
    "juz": 24,
    "hizb": 48,
    "rub": 191,
    "surahs": [
      41
    ],
    "startSurah": 41,
    "startAyah": 12,
    "endSurah": 41,
    "endAyah": 20,
    "verses": [
      {
        "surah": 41,
        "ayah": 12
      },
      {
        "surah": 41,
        "ayah": 13
      },
      {
        "surah": 41,
        "ayah": 14
      },
      {
        "surah": 41,
        "ayah": 15
      },
      {
        "surah": 41,
        "ayah": 16
      },
      {
        "surah": 41,
        "ayah": 17
      },
      {
        "surah": 41,
        "ayah": 18
      },
      {
        "surah": 41,
        "ayah": 19
      },
      {
        "surah": 41,
        "ayah": 20
      }
    ]
  },
  {
    "page": 479,
    "juz": 24,
    "hizb": 48,
    "rub": 191,
    "surahs": [
      41
    ],
    "startSurah": 41,
    "startAyah": 21,
    "endSurah": 41,
    "endAyah": 29,
    "verses": [
      {
        "surah": 41,
        "ayah": 21
      },
      {
        "surah": 41,
        "ayah": 22
      },
      {
        "surah": 41,
        "ayah": 23
      },
      {
        "surah": 41,
        "ayah": 24
      },
      {
        "surah": 41,
        "ayah": 25
      },
      {
        "surah": 41,
        "ayah": 26
      },
      {
        "surah": 41,
        "ayah": 27
      },
      {
        "surah": 41,
        "ayah": 28
      },
      {
        "surah": 41,
        "ayah": 29
      }
    ]
  },
  {
    "page": 480,
    "juz": 24,
    "hizb": 48,
    "rub": 192,
    "surahs": [
      41
    ],
    "startSurah": 41,
    "startAyah": 30,
    "endSurah": 41,
    "endAyah": 38,
    "verses": [
      {
        "surah": 41,
        "ayah": 30
      },
      {
        "surah": 41,
        "ayah": 31
      },
      {
        "surah": 41,
        "ayah": 32
      },
      {
        "surah": 41,
        "ayah": 33
      },
      {
        "surah": 41,
        "ayah": 34
      },
      {
        "surah": 41,
        "ayah": 35
      },
      {
        "surah": 41,
        "ayah": 36
      },
      {
        "surah": 41,
        "ayah": 37
      },
      {
        "surah": 41,
        "ayah": 38
      }
    ]
  },
  {
    "page": 481,
    "juz": 24,
    "hizb": 48,
    "rub": 192,
    "surahs": [
      41
    ],
    "startSurah": 41,
    "startAyah": 39,
    "endSurah": 41,
    "endAyah": 46,
    "verses": [
      {
        "surah": 41,
        "ayah": 39
      },
      {
        "surah": 41,
        "ayah": 40
      },
      {
        "surah": 41,
        "ayah": 41
      },
      {
        "surah": 41,
        "ayah": 42
      },
      {
        "surah": 41,
        "ayah": 43
      },
      {
        "surah": 41,
        "ayah": 44
      },
      {
        "surah": 41,
        "ayah": 45
      },
      {
        "surah": 41,
        "ayah": 46
      }
    ]
  },
  {
    "page": 482,
    "juz": 25,
    "hizb": 49,
    "rub": 193,
    "surahs": [
      41
    ],
    "startSurah": 41,
    "startAyah": 47,
    "endSurah": 41,
    "endAyah": 54,
    "verses": [
      {
        "surah": 41,
        "ayah": 47
      },
      {
        "surah": 41,
        "ayah": 48
      },
      {
        "surah": 41,
        "ayah": 49
      },
      {
        "surah": 41,
        "ayah": 50
      },
      {
        "surah": 41,
        "ayah": 51
      },
      {
        "surah": 41,
        "ayah": 52
      },
      {
        "surah": 41,
        "ayah": 53
      },
      {
        "surah": 41,
        "ayah": 54
      }
    ]
  },
  {
    "page": 483,
    "juz": 25,
    "hizb": 49,
    "rub": 193,
    "surahs": [
      42
    ],
    "startSurah": 42,
    "startAyah": 1,
    "endSurah": 42,
    "endAyah": 10,
    "verses": [
      {
        "surah": 42,
        "ayah": 1
      },
      {
        "surah": 42,
        "ayah": 2
      },
      {
        "surah": 42,
        "ayah": 3
      },
      {
        "surah": 42,
        "ayah": 4
      },
      {
        "surah": 42,
        "ayah": 5
      },
      {
        "surah": 42,
        "ayah": 6
      },
      {
        "surah": 42,
        "ayah": 7
      },
      {
        "surah": 42,
        "ayah": 8
      },
      {
        "surah": 42,
        "ayah": 9
      },
      {
        "surah": 42,
        "ayah": 10
      }
    ]
  },
  {
    "page": 484,
    "juz": 25,
    "hizb": 49,
    "rub": 193,
    "surahs": [
      42
    ],
    "startSurah": 42,
    "startAyah": 11,
    "endSurah": 42,
    "endAyah": 15,
    "verses": [
      {
        "surah": 42,
        "ayah": 11
      },
      {
        "surah": 42,
        "ayah": 12
      },
      {
        "surah": 42,
        "ayah": 13
      },
      {
        "surah": 42,
        "ayah": 14
      },
      {
        "surah": 42,
        "ayah": 15
      }
    ]
  },
  {
    "page": 485,
    "juz": 25,
    "hizb": 49,
    "rub": 194,
    "surahs": [
      42
    ],
    "startSurah": 42,
    "startAyah": 16,
    "endSurah": 42,
    "endAyah": 22,
    "verses": [
      {
        "surah": 42,
        "ayah": 16
      },
      {
        "surah": 42,
        "ayah": 17
      },
      {
        "surah": 42,
        "ayah": 18
      },
      {
        "surah": 42,
        "ayah": 19
      },
      {
        "surah": 42,
        "ayah": 20
      },
      {
        "surah": 42,
        "ayah": 21
      },
      {
        "surah": 42,
        "ayah": 22
      }
    ]
  },
  {
    "page": 486,
    "juz": 25,
    "hizb": 49,
    "rub": 194,
    "surahs": [
      42
    ],
    "startSurah": 42,
    "startAyah": 23,
    "endSurah": 42,
    "endAyah": 31,
    "verses": [
      {
        "surah": 42,
        "ayah": 23
      },
      {
        "surah": 42,
        "ayah": 24
      },
      {
        "surah": 42,
        "ayah": 25
      },
      {
        "surah": 42,
        "ayah": 26
      },
      {
        "surah": 42,
        "ayah": 27
      },
      {
        "surah": 42,
        "ayah": 28
      },
      {
        "surah": 42,
        "ayah": 29
      },
      {
        "surah": 42,
        "ayah": 30
      },
      {
        "surah": 42,
        "ayah": 31
      }
    ]
  },
  {
    "page": 487,
    "juz": 25,
    "hizb": 49,
    "rub": 195,
    "surahs": [
      42
    ],
    "startSurah": 42,
    "startAyah": 32,
    "endSurah": 42,
    "endAyah": 44,
    "verses": [
      {
        "surah": 42,
        "ayah": 32
      },
      {
        "surah": 42,
        "ayah": 33
      },
      {
        "surah": 42,
        "ayah": 34
      },
      {
        "surah": 42,
        "ayah": 35
      },
      {
        "surah": 42,
        "ayah": 36
      },
      {
        "surah": 42,
        "ayah": 37
      },
      {
        "surah": 42,
        "ayah": 38
      },
      {
        "surah": 42,
        "ayah": 39
      },
      {
        "surah": 42,
        "ayah": 40
      },
      {
        "surah": 42,
        "ayah": 41
      },
      {
        "surah": 42,
        "ayah": 42
      },
      {
        "surah": 42,
        "ayah": 43
      },
      {
        "surah": 42,
        "ayah": 44
      }
    ]
  },
  {
    "page": 488,
    "juz": 25,
    "hizb": 49,
    "rub": 195,
    "surahs": [
      42
    ],
    "startSurah": 42,
    "startAyah": 45,
    "endSurah": 42,
    "endAyah": 51,
    "verses": [
      {
        "surah": 42,
        "ayah": 45
      },
      {
        "surah": 42,
        "ayah": 46
      },
      {
        "surah": 42,
        "ayah": 47
      },
      {
        "surah": 42,
        "ayah": 48
      },
      {
        "surah": 42,
        "ayah": 49
      },
      {
        "surah": 42,
        "ayah": 50
      },
      {
        "surah": 42,
        "ayah": 51
      }
    ]
  },
  {
    "page": 489,
    "juz": 25,
    "hizb": 49,
    "rub": 196,
    "surahs": [
      42,
      43
    ],
    "startSurah": 42,
    "startAyah": 52,
    "endSurah": 43,
    "endAyah": 10,
    "verses": [
      {
        "surah": 42,
        "ayah": 52
      },
      {
        "surah": 42,
        "ayah": 53
      },
      {
        "surah": 43,
        "ayah": 1
      },
      {
        "surah": 43,
        "ayah": 2
      },
      {
        "surah": 43,
        "ayah": 3
      },
      {
        "surah": 43,
        "ayah": 4
      },
      {
        "surah": 43,
        "ayah": 5
      },
      {
        "surah": 43,
        "ayah": 6
      },
      {
        "surah": 43,
        "ayah": 7
      },
      {
        "surah": 43,
        "ayah": 8
      },
      {
        "surah": 43,
        "ayah": 9
      },
      {
        "surah": 43,
        "ayah": 10
      }
    ]
  },
  {
    "page": 490,
    "juz": 25,
    "hizb": 49,
    "rub": 196,
    "surahs": [
      43
    ],
    "startSurah": 43,
    "startAyah": 11,
    "endSurah": 43,
    "endAyah": 22,
    "verses": [
      {
        "surah": 43,
        "ayah": 11
      },
      {
        "surah": 43,
        "ayah": 12
      },
      {
        "surah": 43,
        "ayah": 13
      },
      {
        "surah": 43,
        "ayah": 14
      },
      {
        "surah": 43,
        "ayah": 15
      },
      {
        "surah": 43,
        "ayah": 16
      },
      {
        "surah": 43,
        "ayah": 17
      },
      {
        "surah": 43,
        "ayah": 18
      },
      {
        "surah": 43,
        "ayah": 19
      },
      {
        "surah": 43,
        "ayah": 20
      },
      {
        "surah": 43,
        "ayah": 21
      },
      {
        "surah": 43,
        "ayah": 22
      }
    ]
  },
  {
    "page": 491,
    "juz": 25,
    "hizb": 49,
    "rub": 196,
    "surahs": [
      43
    ],
    "startSurah": 43,
    "startAyah": 23,
    "endSurah": 43,
    "endAyah": 33,
    "verses": [
      {
        "surah": 43,
        "ayah": 23
      },
      {
        "surah": 43,
        "ayah": 24
      },
      {
        "surah": 43,
        "ayah": 25
      },
      {
        "surah": 43,
        "ayah": 26
      },
      {
        "surah": 43,
        "ayah": 27
      },
      {
        "surah": 43,
        "ayah": 28
      },
      {
        "surah": 43,
        "ayah": 29
      },
      {
        "surah": 43,
        "ayah": 30
      },
      {
        "surah": 43,
        "ayah": 31
      },
      {
        "surah": 43,
        "ayah": 32
      },
      {
        "surah": 43,
        "ayah": 33
      }
    ]
  },
  {
    "page": 492,
    "juz": 25,
    "hizb": 50,
    "rub": 197,
    "surahs": [
      43
    ],
    "startSurah": 43,
    "startAyah": 34,
    "endSurah": 43,
    "endAyah": 47,
    "verses": [
      {
        "surah": 43,
        "ayah": 34
      },
      {
        "surah": 43,
        "ayah": 35
      },
      {
        "surah": 43,
        "ayah": 36
      },
      {
        "surah": 43,
        "ayah": 37
      },
      {
        "surah": 43,
        "ayah": 38
      },
      {
        "surah": 43,
        "ayah": 39
      },
      {
        "surah": 43,
        "ayah": 40
      },
      {
        "surah": 43,
        "ayah": 41
      },
      {
        "surah": 43,
        "ayah": 42
      },
      {
        "surah": 43,
        "ayah": 43
      },
      {
        "surah": 43,
        "ayah": 44
      },
      {
        "surah": 43,
        "ayah": 45
      },
      {
        "surah": 43,
        "ayah": 46
      },
      {
        "surah": 43,
        "ayah": 47
      }
    ]
  },
  {
    "page": 493,
    "juz": 25,
    "hizb": 50,
    "rub": 197,
    "surahs": [
      43
    ],
    "startSurah": 43,
    "startAyah": 48,
    "endSurah": 43,
    "endAyah": 60,
    "verses": [
      {
        "surah": 43,
        "ayah": 48
      },
      {
        "surah": 43,
        "ayah": 49
      },
      {
        "surah": 43,
        "ayah": 50
      },
      {
        "surah": 43,
        "ayah": 51
      },
      {
        "surah": 43,
        "ayah": 52
      },
      {
        "surah": 43,
        "ayah": 53
      },
      {
        "surah": 43,
        "ayah": 54
      },
      {
        "surah": 43,
        "ayah": 55
      },
      {
        "surah": 43,
        "ayah": 56
      },
      {
        "surah": 43,
        "ayah": 57
      },
      {
        "surah": 43,
        "ayah": 58
      },
      {
        "surah": 43,
        "ayah": 59
      },
      {
        "surah": 43,
        "ayah": 60
      }
    ]
  },
  {
    "page": 494,
    "juz": 25,
    "hizb": 50,
    "rub": 198,
    "surahs": [
      43
    ],
    "startSurah": 43,
    "startAyah": 61,
    "endSurah": 43,
    "endAyah": 73,
    "verses": [
      {
        "surah": 43,
        "ayah": 61
      },
      {
        "surah": 43,
        "ayah": 62
      },
      {
        "surah": 43,
        "ayah": 63
      },
      {
        "surah": 43,
        "ayah": 64
      },
      {
        "surah": 43,
        "ayah": 65
      },
      {
        "surah": 43,
        "ayah": 66
      },
      {
        "surah": 43,
        "ayah": 67
      },
      {
        "surah": 43,
        "ayah": 68
      },
      {
        "surah": 43,
        "ayah": 69
      },
      {
        "surah": 43,
        "ayah": 70
      },
      {
        "surah": 43,
        "ayah": 71
      },
      {
        "surah": 43,
        "ayah": 72
      },
      {
        "surah": 43,
        "ayah": 73
      }
    ]
  },
  {
    "page": 495,
    "juz": 25,
    "hizb": 50,
    "rub": 198,
    "surahs": [
      43
    ],
    "startSurah": 43,
    "startAyah": 74,
    "endSurah": 43,
    "endAyah": 89,
    "verses": [
      {
        "surah": 43,
        "ayah": 74
      },
      {
        "surah": 43,
        "ayah": 75
      },
      {
        "surah": 43,
        "ayah": 76
      },
      {
        "surah": 43,
        "ayah": 77
      },
      {
        "surah": 43,
        "ayah": 78
      },
      {
        "surah": 43,
        "ayah": 79
      },
      {
        "surah": 43,
        "ayah": 80
      },
      {
        "surah": 43,
        "ayah": 81
      },
      {
        "surah": 43,
        "ayah": 82
      },
      {
        "surah": 43,
        "ayah": 83
      },
      {
        "surah": 43,
        "ayah": 84
      },
      {
        "surah": 43,
        "ayah": 85
      },
      {
        "surah": 43,
        "ayah": 86
      },
      {
        "surah": 43,
        "ayah": 87
      },
      {
        "surah": 43,
        "ayah": 88
      },
      {
        "surah": 43,
        "ayah": 89
      }
    ]
  },
  {
    "page": 496,
    "juz": 25,
    "hizb": 50,
    "rub": 198,
    "surahs": [
      44
    ],
    "startSurah": 44,
    "startAyah": 1,
    "endSurah": 44,
    "endAyah": 18,
    "verses": [
      {
        "surah": 44,
        "ayah": 1
      },
      {
        "surah": 44,
        "ayah": 2
      },
      {
        "surah": 44,
        "ayah": 3
      },
      {
        "surah": 44,
        "ayah": 4
      },
      {
        "surah": 44,
        "ayah": 5
      },
      {
        "surah": 44,
        "ayah": 6
      },
      {
        "surah": 44,
        "ayah": 7
      },
      {
        "surah": 44,
        "ayah": 8
      },
      {
        "surah": 44,
        "ayah": 9
      },
      {
        "surah": 44,
        "ayah": 10
      },
      {
        "surah": 44,
        "ayah": 11
      },
      {
        "surah": 44,
        "ayah": 12
      },
      {
        "surah": 44,
        "ayah": 13
      },
      {
        "surah": 44,
        "ayah": 14
      },
      {
        "surah": 44,
        "ayah": 15
      },
      {
        "surah": 44,
        "ayah": 16
      },
      {
        "surah": 44,
        "ayah": 17
      },
      {
        "surah": 44,
        "ayah": 18
      }
    ]
  },
  {
    "page": 497,
    "juz": 25,
    "hizb": 50,
    "rub": 199,
    "surahs": [
      44
    ],
    "startSurah": 44,
    "startAyah": 19,
    "endSurah": 44,
    "endAyah": 39,
    "verses": [
      {
        "surah": 44,
        "ayah": 19
      },
      {
        "surah": 44,
        "ayah": 20
      },
      {
        "surah": 44,
        "ayah": 21
      },
      {
        "surah": 44,
        "ayah": 22
      },
      {
        "surah": 44,
        "ayah": 23
      },
      {
        "surah": 44,
        "ayah": 24
      },
      {
        "surah": 44,
        "ayah": 25
      },
      {
        "surah": 44,
        "ayah": 26
      },
      {
        "surah": 44,
        "ayah": 27
      },
      {
        "surah": 44,
        "ayah": 28
      },
      {
        "surah": 44,
        "ayah": 29
      },
      {
        "surah": 44,
        "ayah": 30
      },
      {
        "surah": 44,
        "ayah": 31
      },
      {
        "surah": 44,
        "ayah": 32
      },
      {
        "surah": 44,
        "ayah": 33
      },
      {
        "surah": 44,
        "ayah": 34
      },
      {
        "surah": 44,
        "ayah": 35
      },
      {
        "surah": 44,
        "ayah": 36
      },
      {
        "surah": 44,
        "ayah": 37
      },
      {
        "surah": 44,
        "ayah": 38
      },
      {
        "surah": 44,
        "ayah": 39
      }
    ]
  },
  {
    "page": 498,
    "juz": 25,
    "hizb": 50,
    "rub": 199,
    "surahs": [
      44
    ],
    "startSurah": 44,
    "startAyah": 40,
    "endSurah": 44,
    "endAyah": 59,
    "verses": [
      {
        "surah": 44,
        "ayah": 40
      },
      {
        "surah": 44,
        "ayah": 41
      },
      {
        "surah": 44,
        "ayah": 42
      },
      {
        "surah": 44,
        "ayah": 43
      },
      {
        "surah": 44,
        "ayah": 44
      },
      {
        "surah": 44,
        "ayah": 45
      },
      {
        "surah": 44,
        "ayah": 46
      },
      {
        "surah": 44,
        "ayah": 47
      },
      {
        "surah": 44,
        "ayah": 48
      },
      {
        "surah": 44,
        "ayah": 49
      },
      {
        "surah": 44,
        "ayah": 50
      },
      {
        "surah": 44,
        "ayah": 51
      },
      {
        "surah": 44,
        "ayah": 52
      },
      {
        "surah": 44,
        "ayah": 53
      },
      {
        "surah": 44,
        "ayah": 54
      },
      {
        "surah": 44,
        "ayah": 55
      },
      {
        "surah": 44,
        "ayah": 56
      },
      {
        "surah": 44,
        "ayah": 57
      },
      {
        "surah": 44,
        "ayah": 58
      },
      {
        "surah": 44,
        "ayah": 59
      }
    ]
  },
  {
    "page": 499,
    "juz": 25,
    "hizb": 50,
    "rub": 199,
    "surahs": [
      45
    ],
    "startSurah": 45,
    "startAyah": 1,
    "endSurah": 45,
    "endAyah": 13,
    "verses": [
      {
        "surah": 45,
        "ayah": 1
      },
      {
        "surah": 45,
        "ayah": 2
      },
      {
        "surah": 45,
        "ayah": 3
      },
      {
        "surah": 45,
        "ayah": 4
      },
      {
        "surah": 45,
        "ayah": 5
      },
      {
        "surah": 45,
        "ayah": 6
      },
      {
        "surah": 45,
        "ayah": 7
      },
      {
        "surah": 45,
        "ayah": 8
      },
      {
        "surah": 45,
        "ayah": 9
      },
      {
        "surah": 45,
        "ayah": 10
      },
      {
        "surah": 45,
        "ayah": 11
      },
      {
        "surah": 45,
        "ayah": 12
      },
      {
        "surah": 45,
        "ayah": 13
      }
    ]
  },
  {
    "page": 500,
    "juz": 25,
    "hizb": 50,
    "rub": 200,
    "surahs": [
      45
    ],
    "startSurah": 45,
    "startAyah": 14,
    "endSurah": 45,
    "endAyah": 22,
    "verses": [
      {
        "surah": 45,
        "ayah": 14
      },
      {
        "surah": 45,
        "ayah": 15
      },
      {
        "surah": 45,
        "ayah": 16
      },
      {
        "surah": 45,
        "ayah": 17
      },
      {
        "surah": 45,
        "ayah": 18
      },
      {
        "surah": 45,
        "ayah": 19
      },
      {
        "surah": 45,
        "ayah": 20
      },
      {
        "surah": 45,
        "ayah": 21
      },
      {
        "surah": 45,
        "ayah": 22
      }
    ]
  },
  {
    "page": 501,
    "juz": 25,
    "hizb": 50,
    "rub": 200,
    "surahs": [
      45
    ],
    "startSurah": 45,
    "startAyah": 23,
    "endSurah": 45,
    "endAyah": 32,
    "verses": [
      {
        "surah": 45,
        "ayah": 23
      },
      {
        "surah": 45,
        "ayah": 24
      },
      {
        "surah": 45,
        "ayah": 25
      },
      {
        "surah": 45,
        "ayah": 26
      },
      {
        "surah": 45,
        "ayah": 27
      },
      {
        "surah": 45,
        "ayah": 28
      },
      {
        "surah": 45,
        "ayah": 29
      },
      {
        "surah": 45,
        "ayah": 30
      },
      {
        "surah": 45,
        "ayah": 31
      },
      {
        "surah": 45,
        "ayah": 32
      }
    ]
  },
  {
    "page": 502,
    "juz": 25,
    "hizb": 50,
    "rub": 200,
    "surahs": [
      45,
      46
    ],
    "startSurah": 45,
    "startAyah": 33,
    "endSurah": 46,
    "endAyah": 5,
    "verses": [
      {
        "surah": 45,
        "ayah": 33
      },
      {
        "surah": 45,
        "ayah": 34
      },
      {
        "surah": 45,
        "ayah": 35
      },
      {
        "surah": 45,
        "ayah": 36
      },
      {
        "surah": 45,
        "ayah": 37
      },
      {
        "surah": 46,
        "ayah": 1
      },
      {
        "surah": 46,
        "ayah": 2
      },
      {
        "surah": 46,
        "ayah": 3
      },
      {
        "surah": 46,
        "ayah": 4
      },
      {
        "surah": 46,
        "ayah": 5
      }
    ]
  },
  {
    "page": 503,
    "juz": 26,
    "hizb": 51,
    "rub": 201,
    "surahs": [
      46
    ],
    "startSurah": 46,
    "startAyah": 6,
    "endSurah": 46,
    "endAyah": 14,
    "verses": [
      {
        "surah": 46,
        "ayah": 6
      },
      {
        "surah": 46,
        "ayah": 7
      },
      {
        "surah": 46,
        "ayah": 8
      },
      {
        "surah": 46,
        "ayah": 9
      },
      {
        "surah": 46,
        "ayah": 10
      },
      {
        "surah": 46,
        "ayah": 11
      },
      {
        "surah": 46,
        "ayah": 12
      },
      {
        "surah": 46,
        "ayah": 13
      },
      {
        "surah": 46,
        "ayah": 14
      }
    ]
  },
  {
    "page": 504,
    "juz": 26,
    "hizb": 51,
    "rub": 201,
    "surahs": [
      46
    ],
    "startSurah": 46,
    "startAyah": 15,
    "endSurah": 46,
    "endAyah": 20,
    "verses": [
      {
        "surah": 46,
        "ayah": 15
      },
      {
        "surah": 46,
        "ayah": 16
      },
      {
        "surah": 46,
        "ayah": 17
      },
      {
        "surah": 46,
        "ayah": 18
      },
      {
        "surah": 46,
        "ayah": 19
      },
      {
        "surah": 46,
        "ayah": 20
      }
    ]
  },
  {
    "page": 505,
    "juz": 26,
    "hizb": 51,
    "rub": 202,
    "surahs": [
      46
    ],
    "startSurah": 46,
    "startAyah": 21,
    "endSurah": 46,
    "endAyah": 28,
    "verses": [
      {
        "surah": 46,
        "ayah": 21
      },
      {
        "surah": 46,
        "ayah": 22
      },
      {
        "surah": 46,
        "ayah": 23
      },
      {
        "surah": 46,
        "ayah": 24
      },
      {
        "surah": 46,
        "ayah": 25
      },
      {
        "surah": 46,
        "ayah": 26
      },
      {
        "surah": 46,
        "ayah": 27
      },
      {
        "surah": 46,
        "ayah": 28
      }
    ]
  },
  {
    "page": 506,
    "juz": 26,
    "hizb": 51,
    "rub": 202,
    "surahs": [
      46
    ],
    "startSurah": 46,
    "startAyah": 29,
    "endSurah": 46,
    "endAyah": 35,
    "verses": [
      {
        "surah": 46,
        "ayah": 29
      },
      {
        "surah": 46,
        "ayah": 30
      },
      {
        "surah": 46,
        "ayah": 31
      },
      {
        "surah": 46,
        "ayah": 32
      },
      {
        "surah": 46,
        "ayah": 33
      },
      {
        "surah": 46,
        "ayah": 34
      },
      {
        "surah": 46,
        "ayah": 35
      }
    ]
  },
  {
    "page": 507,
    "juz": 26,
    "hizb": 51,
    "rub": 202,
    "surahs": [
      47
    ],
    "startSurah": 47,
    "startAyah": 1,
    "endSurah": 47,
    "endAyah": 11,
    "verses": [
      {
        "surah": 47,
        "ayah": 1
      },
      {
        "surah": 47,
        "ayah": 2
      },
      {
        "surah": 47,
        "ayah": 3
      },
      {
        "surah": 47,
        "ayah": 4
      },
      {
        "surah": 47,
        "ayah": 5
      },
      {
        "surah": 47,
        "ayah": 6
      },
      {
        "surah": 47,
        "ayah": 7
      },
      {
        "surah": 47,
        "ayah": 8
      },
      {
        "surah": 47,
        "ayah": 9
      },
      {
        "surah": 47,
        "ayah": 10
      },
      {
        "surah": 47,
        "ayah": 11
      }
    ]
  },
  {
    "page": 508,
    "juz": 26,
    "hizb": 51,
    "rub": 203,
    "surahs": [
      47
    ],
    "startSurah": 47,
    "startAyah": 12,
    "endSurah": 47,
    "endAyah": 19,
    "verses": [
      {
        "surah": 47,
        "ayah": 12
      },
      {
        "surah": 47,
        "ayah": 13
      },
      {
        "surah": 47,
        "ayah": 14
      },
      {
        "surah": 47,
        "ayah": 15
      },
      {
        "surah": 47,
        "ayah": 16
      },
      {
        "surah": 47,
        "ayah": 17
      },
      {
        "surah": 47,
        "ayah": 18
      },
      {
        "surah": 47,
        "ayah": 19
      }
    ]
  },
  {
    "page": 509,
    "juz": 26,
    "hizb": 51,
    "rub": 203,
    "surahs": [
      47
    ],
    "startSurah": 47,
    "startAyah": 20,
    "endSurah": 47,
    "endAyah": 29,
    "verses": [
      {
        "surah": 47,
        "ayah": 20
      },
      {
        "surah": 47,
        "ayah": 21
      },
      {
        "surah": 47,
        "ayah": 22
      },
      {
        "surah": 47,
        "ayah": 23
      },
      {
        "surah": 47,
        "ayah": 24
      },
      {
        "surah": 47,
        "ayah": 25
      },
      {
        "surah": 47,
        "ayah": 26
      },
      {
        "surah": 47,
        "ayah": 27
      },
      {
        "surah": 47,
        "ayah": 28
      },
      {
        "surah": 47,
        "ayah": 29
      }
    ]
  },
  {
    "page": 510,
    "juz": 26,
    "hizb": 51,
    "rub": 203,
    "surahs": [
      47
    ],
    "startSurah": 47,
    "startAyah": 30,
    "endSurah": 47,
    "endAyah": 38,
    "verses": [
      {
        "surah": 47,
        "ayah": 30
      },
      {
        "surah": 47,
        "ayah": 31
      },
      {
        "surah": 47,
        "ayah": 32
      },
      {
        "surah": 47,
        "ayah": 33
      },
      {
        "surah": 47,
        "ayah": 34
      },
      {
        "surah": 47,
        "ayah": 35
      },
      {
        "surah": 47,
        "ayah": 36
      },
      {
        "surah": 47,
        "ayah": 37
      },
      {
        "surah": 47,
        "ayah": 38
      }
    ]
  },
  {
    "page": 511,
    "juz": 26,
    "hizb": 51,
    "rub": 204,
    "surahs": [
      48
    ],
    "startSurah": 48,
    "startAyah": 1,
    "endSurah": 48,
    "endAyah": 9,
    "verses": [
      {
        "surah": 48,
        "ayah": 1
      },
      {
        "surah": 48,
        "ayah": 2
      },
      {
        "surah": 48,
        "ayah": 3
      },
      {
        "surah": 48,
        "ayah": 4
      },
      {
        "surah": 48,
        "ayah": 5
      },
      {
        "surah": 48,
        "ayah": 6
      },
      {
        "surah": 48,
        "ayah": 7
      },
      {
        "surah": 48,
        "ayah": 8
      },
      {
        "surah": 48,
        "ayah": 9
      }
    ]
  },
  {
    "page": 512,
    "juz": 26,
    "hizb": 51,
    "rub": 204,
    "surahs": [
      48
    ],
    "startSurah": 48,
    "startAyah": 10,
    "endSurah": 48,
    "endAyah": 15,
    "verses": [
      {
        "surah": 48,
        "ayah": 10
      },
      {
        "surah": 48,
        "ayah": 11
      },
      {
        "surah": 48,
        "ayah": 12
      },
      {
        "surah": 48,
        "ayah": 13
      },
      {
        "surah": 48,
        "ayah": 14
      },
      {
        "surah": 48,
        "ayah": 15
      }
    ]
  },
  {
    "page": 513,
    "juz": 26,
    "hizb": 51,
    "rub": 204,
    "surahs": [
      48
    ],
    "startSurah": 48,
    "startAyah": 16,
    "endSurah": 48,
    "endAyah": 23,
    "verses": [
      {
        "surah": 48,
        "ayah": 16
      },
      {
        "surah": 48,
        "ayah": 17
      },
      {
        "surah": 48,
        "ayah": 18
      },
      {
        "surah": 48,
        "ayah": 19
      },
      {
        "surah": 48,
        "ayah": 20
      },
      {
        "surah": 48,
        "ayah": 21
      },
      {
        "surah": 48,
        "ayah": 22
      },
      {
        "surah": 48,
        "ayah": 23
      }
    ]
  },
  {
    "page": 514,
    "juz": 26,
    "hizb": 52,
    "rub": 205,
    "surahs": [
      48
    ],
    "startSurah": 48,
    "startAyah": 24,
    "endSurah": 48,
    "endAyah": 28,
    "verses": [
      {
        "surah": 48,
        "ayah": 24
      },
      {
        "surah": 48,
        "ayah": 25
      },
      {
        "surah": 48,
        "ayah": 26
      },
      {
        "surah": 48,
        "ayah": 27
      },
      {
        "surah": 48,
        "ayah": 28
      }
    ]
  },
  {
    "page": 515,
    "juz": 26,
    "hizb": 52,
    "rub": 205,
    "surahs": [
      48,
      49
    ],
    "startSurah": 48,
    "startAyah": 29,
    "endSurah": 49,
    "endAyah": 4,
    "verses": [
      {
        "surah": 48,
        "ayah": 29
      },
      {
        "surah": 49,
        "ayah": 1
      },
      {
        "surah": 49,
        "ayah": 2
      },
      {
        "surah": 49,
        "ayah": 3
      },
      {
        "surah": 49,
        "ayah": 4
      }
    ]
  },
  {
    "page": 516,
    "juz": 26,
    "hizb": 52,
    "rub": 206,
    "surahs": [
      49
    ],
    "startSurah": 49,
    "startAyah": 5,
    "endSurah": 49,
    "endAyah": 11,
    "verses": [
      {
        "surah": 49,
        "ayah": 5
      },
      {
        "surah": 49,
        "ayah": 6
      },
      {
        "surah": 49,
        "ayah": 7
      },
      {
        "surah": 49,
        "ayah": 8
      },
      {
        "surah": 49,
        "ayah": 9
      },
      {
        "surah": 49,
        "ayah": 10
      },
      {
        "surah": 49,
        "ayah": 11
      }
    ]
  },
  {
    "page": 517,
    "juz": 26,
    "hizb": 52,
    "rub": 206,
    "surahs": [
      49
    ],
    "startSurah": 49,
    "startAyah": 12,
    "endSurah": 49,
    "endAyah": 18,
    "verses": [
      {
        "surah": 49,
        "ayah": 12
      },
      {
        "surah": 49,
        "ayah": 13
      },
      {
        "surah": 49,
        "ayah": 14
      },
      {
        "surah": 49,
        "ayah": 15
      },
      {
        "surah": 49,
        "ayah": 16
      },
      {
        "surah": 49,
        "ayah": 17
      },
      {
        "surah": 49,
        "ayah": 18
      }
    ]
  },
  {
    "page": 518,
    "juz": 26,
    "hizb": 52,
    "rub": 207,
    "surahs": [
      50
    ],
    "startSurah": 50,
    "startAyah": 1,
    "endSurah": 50,
    "endAyah": 15,
    "verses": [
      {
        "surah": 50,
        "ayah": 1
      },
      {
        "surah": 50,
        "ayah": 2
      },
      {
        "surah": 50,
        "ayah": 3
      },
      {
        "surah": 50,
        "ayah": 4
      },
      {
        "surah": 50,
        "ayah": 5
      },
      {
        "surah": 50,
        "ayah": 6
      },
      {
        "surah": 50,
        "ayah": 7
      },
      {
        "surah": 50,
        "ayah": 8
      },
      {
        "surah": 50,
        "ayah": 9
      },
      {
        "surah": 50,
        "ayah": 10
      },
      {
        "surah": 50,
        "ayah": 11
      },
      {
        "surah": 50,
        "ayah": 12
      },
      {
        "surah": 50,
        "ayah": 13
      },
      {
        "surah": 50,
        "ayah": 14
      },
      {
        "surah": 50,
        "ayah": 15
      }
    ]
  },
  {
    "page": 519,
    "juz": 26,
    "hizb": 52,
    "rub": 207,
    "surahs": [
      50
    ],
    "startSurah": 50,
    "startAyah": 16,
    "endSurah": 50,
    "endAyah": 35,
    "verses": [
      {
        "surah": 50,
        "ayah": 16
      },
      {
        "surah": 50,
        "ayah": 17
      },
      {
        "surah": 50,
        "ayah": 18
      },
      {
        "surah": 50,
        "ayah": 19
      },
      {
        "surah": 50,
        "ayah": 20
      },
      {
        "surah": 50,
        "ayah": 21
      },
      {
        "surah": 50,
        "ayah": 22
      },
      {
        "surah": 50,
        "ayah": 23
      },
      {
        "surah": 50,
        "ayah": 24
      },
      {
        "surah": 50,
        "ayah": 25
      },
      {
        "surah": 50,
        "ayah": 26
      },
      {
        "surah": 50,
        "ayah": 27
      },
      {
        "surah": 50,
        "ayah": 28
      },
      {
        "surah": 50,
        "ayah": 29
      },
      {
        "surah": 50,
        "ayah": 30
      },
      {
        "surah": 50,
        "ayah": 31
      },
      {
        "surah": 50,
        "ayah": 32
      },
      {
        "surah": 50,
        "ayah": 33
      },
      {
        "surah": 50,
        "ayah": 34
      },
      {
        "surah": 50,
        "ayah": 35
      }
    ]
  },
  {
    "page": 520,
    "juz": 26,
    "hizb": 52,
    "rub": 208,
    "surahs": [
      50,
      51
    ],
    "startSurah": 50,
    "startAyah": 36,
    "endSurah": 51,
    "endAyah": 6,
    "verses": [
      {
        "surah": 50,
        "ayah": 36
      },
      {
        "surah": 50,
        "ayah": 37
      },
      {
        "surah": 50,
        "ayah": 38
      },
      {
        "surah": 50,
        "ayah": 39
      },
      {
        "surah": 50,
        "ayah": 40
      },
      {
        "surah": 50,
        "ayah": 41
      },
      {
        "surah": 50,
        "ayah": 42
      },
      {
        "surah": 50,
        "ayah": 43
      },
      {
        "surah": 50,
        "ayah": 44
      },
      {
        "surah": 50,
        "ayah": 45
      },
      {
        "surah": 51,
        "ayah": 1
      },
      {
        "surah": 51,
        "ayah": 2
      },
      {
        "surah": 51,
        "ayah": 3
      },
      {
        "surah": 51,
        "ayah": 4
      },
      {
        "surah": 51,
        "ayah": 5
      },
      {
        "surah": 51,
        "ayah": 6
      }
    ]
  },
  {
    "page": 521,
    "juz": 26,
    "hizb": 52,
    "rub": 208,
    "surahs": [
      51
    ],
    "startSurah": 51,
    "startAyah": 7,
    "endSurah": 51,
    "endAyah": 30,
    "verses": [
      {
        "surah": 51,
        "ayah": 7
      },
      {
        "surah": 51,
        "ayah": 8
      },
      {
        "surah": 51,
        "ayah": 9
      },
      {
        "surah": 51,
        "ayah": 10
      },
      {
        "surah": 51,
        "ayah": 11
      },
      {
        "surah": 51,
        "ayah": 12
      },
      {
        "surah": 51,
        "ayah": 13
      },
      {
        "surah": 51,
        "ayah": 14
      },
      {
        "surah": 51,
        "ayah": 15
      },
      {
        "surah": 51,
        "ayah": 16
      },
      {
        "surah": 51,
        "ayah": 17
      },
      {
        "surah": 51,
        "ayah": 18
      },
      {
        "surah": 51,
        "ayah": 19
      },
      {
        "surah": 51,
        "ayah": 20
      },
      {
        "surah": 51,
        "ayah": 21
      },
      {
        "surah": 51,
        "ayah": 22
      },
      {
        "surah": 51,
        "ayah": 23
      },
      {
        "surah": 51,
        "ayah": 24
      },
      {
        "surah": 51,
        "ayah": 25
      },
      {
        "surah": 51,
        "ayah": 26
      },
      {
        "surah": 51,
        "ayah": 27
      },
      {
        "surah": 51,
        "ayah": 28
      },
      {
        "surah": 51,
        "ayah": 29
      },
      {
        "surah": 51,
        "ayah": 30
      }
    ]
  },
  {
    "page": 522,
    "juz": 27,
    "hizb": 53,
    "rub": 209,
    "surahs": [
      51
    ],
    "startSurah": 51,
    "startAyah": 31,
    "endSurah": 51,
    "endAyah": 51,
    "verses": [
      {
        "surah": 51,
        "ayah": 31
      },
      {
        "surah": 51,
        "ayah": 32
      },
      {
        "surah": 51,
        "ayah": 33
      },
      {
        "surah": 51,
        "ayah": 34
      },
      {
        "surah": 51,
        "ayah": 35
      },
      {
        "surah": 51,
        "ayah": 36
      },
      {
        "surah": 51,
        "ayah": 37
      },
      {
        "surah": 51,
        "ayah": 38
      },
      {
        "surah": 51,
        "ayah": 39
      },
      {
        "surah": 51,
        "ayah": 40
      },
      {
        "surah": 51,
        "ayah": 41
      },
      {
        "surah": 51,
        "ayah": 42
      },
      {
        "surah": 51,
        "ayah": 43
      },
      {
        "surah": 51,
        "ayah": 44
      },
      {
        "surah": 51,
        "ayah": 45
      },
      {
        "surah": 51,
        "ayah": 46
      },
      {
        "surah": 51,
        "ayah": 47
      },
      {
        "surah": 51,
        "ayah": 48
      },
      {
        "surah": 51,
        "ayah": 49
      },
      {
        "surah": 51,
        "ayah": 50
      },
      {
        "surah": 51,
        "ayah": 51
      }
    ]
  },
  {
    "page": 523,
    "juz": 27,
    "hizb": 53,
    "rub": 209,
    "surahs": [
      51,
      52
    ],
    "startSurah": 51,
    "startAyah": 52,
    "endSurah": 52,
    "endAyah": 14,
    "verses": [
      {
        "surah": 51,
        "ayah": 52
      },
      {
        "surah": 51,
        "ayah": 53
      },
      {
        "surah": 51,
        "ayah": 54
      },
      {
        "surah": 51,
        "ayah": 55
      },
      {
        "surah": 51,
        "ayah": 56
      },
      {
        "surah": 51,
        "ayah": 57
      },
      {
        "surah": 51,
        "ayah": 58
      },
      {
        "surah": 51,
        "ayah": 59
      },
      {
        "surah": 51,
        "ayah": 60
      },
      {
        "surah": 52,
        "ayah": 1
      },
      {
        "surah": 52,
        "ayah": 2
      },
      {
        "surah": 52,
        "ayah": 3
      },
      {
        "surah": 52,
        "ayah": 4
      },
      {
        "surah": 52,
        "ayah": 5
      },
      {
        "surah": 52,
        "ayah": 6
      },
      {
        "surah": 52,
        "ayah": 7
      },
      {
        "surah": 52,
        "ayah": 8
      },
      {
        "surah": 52,
        "ayah": 9
      },
      {
        "surah": 52,
        "ayah": 10
      },
      {
        "surah": 52,
        "ayah": 11
      },
      {
        "surah": 52,
        "ayah": 12
      },
      {
        "surah": 52,
        "ayah": 13
      },
      {
        "surah": 52,
        "ayah": 14
      }
    ]
  },
  {
    "page": 524,
    "juz": 27,
    "hizb": 53,
    "rub": 209,
    "surahs": [
      52
    ],
    "startSurah": 52,
    "startAyah": 15,
    "endSurah": 52,
    "endAyah": 31,
    "verses": [
      {
        "surah": 52,
        "ayah": 15
      },
      {
        "surah": 52,
        "ayah": 16
      },
      {
        "surah": 52,
        "ayah": 17
      },
      {
        "surah": 52,
        "ayah": 18
      },
      {
        "surah": 52,
        "ayah": 19
      },
      {
        "surah": 52,
        "ayah": 20
      },
      {
        "surah": 52,
        "ayah": 21
      },
      {
        "surah": 52,
        "ayah": 22
      },
      {
        "surah": 52,
        "ayah": 23
      },
      {
        "surah": 52,
        "ayah": 24
      },
      {
        "surah": 52,
        "ayah": 25
      },
      {
        "surah": 52,
        "ayah": 26
      },
      {
        "surah": 52,
        "ayah": 27
      },
      {
        "surah": 52,
        "ayah": 28
      },
      {
        "surah": 52,
        "ayah": 29
      },
      {
        "surah": 52,
        "ayah": 30
      },
      {
        "surah": 52,
        "ayah": 31
      }
    ]
  },
  {
    "page": 525,
    "juz": 27,
    "hizb": 53,
    "rub": 210,
    "surahs": [
      52
    ],
    "startSurah": 52,
    "startAyah": 32,
    "endSurah": 52,
    "endAyah": 49,
    "verses": [
      {
        "surah": 52,
        "ayah": 32
      },
      {
        "surah": 52,
        "ayah": 33
      },
      {
        "surah": 52,
        "ayah": 34
      },
      {
        "surah": 52,
        "ayah": 35
      },
      {
        "surah": 52,
        "ayah": 36
      },
      {
        "surah": 52,
        "ayah": 37
      },
      {
        "surah": 52,
        "ayah": 38
      },
      {
        "surah": 52,
        "ayah": 39
      },
      {
        "surah": 52,
        "ayah": 40
      },
      {
        "surah": 52,
        "ayah": 41
      },
      {
        "surah": 52,
        "ayah": 42
      },
      {
        "surah": 52,
        "ayah": 43
      },
      {
        "surah": 52,
        "ayah": 44
      },
      {
        "surah": 52,
        "ayah": 45
      },
      {
        "surah": 52,
        "ayah": 46
      },
      {
        "surah": 52,
        "ayah": 47
      },
      {
        "surah": 52,
        "ayah": 48
      },
      {
        "surah": 52,
        "ayah": 49
      }
    ]
  },
  {
    "page": 526,
    "juz": 27,
    "hizb": 53,
    "rub": 210,
    "surahs": [
      53
    ],
    "startSurah": 53,
    "startAyah": 1,
    "endSurah": 53,
    "endAyah": 26,
    "verses": [
      {
        "surah": 53,
        "ayah": 1
      },
      {
        "surah": 53,
        "ayah": 2
      },
      {
        "surah": 53,
        "ayah": 3
      },
      {
        "surah": 53,
        "ayah": 4
      },
      {
        "surah": 53,
        "ayah": 5
      },
      {
        "surah": 53,
        "ayah": 6
      },
      {
        "surah": 53,
        "ayah": 7
      },
      {
        "surah": 53,
        "ayah": 8
      },
      {
        "surah": 53,
        "ayah": 9
      },
      {
        "surah": 53,
        "ayah": 10
      },
      {
        "surah": 53,
        "ayah": 11
      },
      {
        "surah": 53,
        "ayah": 12
      },
      {
        "surah": 53,
        "ayah": 13
      },
      {
        "surah": 53,
        "ayah": 14
      },
      {
        "surah": 53,
        "ayah": 15
      },
      {
        "surah": 53,
        "ayah": 16
      },
      {
        "surah": 53,
        "ayah": 17
      },
      {
        "surah": 53,
        "ayah": 18
      },
      {
        "surah": 53,
        "ayah": 19
      },
      {
        "surah": 53,
        "ayah": 20
      },
      {
        "surah": 53,
        "ayah": 21
      },
      {
        "surah": 53,
        "ayah": 22
      },
      {
        "surah": 53,
        "ayah": 23
      },
      {
        "surah": 53,
        "ayah": 24
      },
      {
        "surah": 53,
        "ayah": 25
      },
      {
        "surah": 53,
        "ayah": 26
      }
    ]
  },
  {
    "page": 527,
    "juz": 27,
    "hizb": 53,
    "rub": 211,
    "surahs": [
      53
    ],
    "startSurah": 53,
    "startAyah": 27,
    "endSurah": 53,
    "endAyah": 44,
    "verses": [
      {
        "surah": 53,
        "ayah": 27
      },
      {
        "surah": 53,
        "ayah": 28
      },
      {
        "surah": 53,
        "ayah": 29
      },
      {
        "surah": 53,
        "ayah": 30
      },
      {
        "surah": 53,
        "ayah": 31
      },
      {
        "surah": 53,
        "ayah": 32
      },
      {
        "surah": 53,
        "ayah": 33
      },
      {
        "surah": 53,
        "ayah": 34
      },
      {
        "surah": 53,
        "ayah": 35
      },
      {
        "surah": 53,
        "ayah": 36
      },
      {
        "surah": 53,
        "ayah": 37
      },
      {
        "surah": 53,
        "ayah": 38
      },
      {
        "surah": 53,
        "ayah": 39
      },
      {
        "surah": 53,
        "ayah": 40
      },
      {
        "surah": 53,
        "ayah": 41
      },
      {
        "surah": 53,
        "ayah": 42
      },
      {
        "surah": 53,
        "ayah": 43
      },
      {
        "surah": 53,
        "ayah": 44
      }
    ]
  },
  {
    "page": 528,
    "juz": 27,
    "hizb": 53,
    "rub": 211,
    "surahs": [
      53,
      54
    ],
    "startSurah": 53,
    "startAyah": 45,
    "endSurah": 54,
    "endAyah": 6,
    "verses": [
      {
        "surah": 53,
        "ayah": 45
      },
      {
        "surah": 53,
        "ayah": 46
      },
      {
        "surah": 53,
        "ayah": 47
      },
      {
        "surah": 53,
        "ayah": 48
      },
      {
        "surah": 53,
        "ayah": 49
      },
      {
        "surah": 53,
        "ayah": 50
      },
      {
        "surah": 53,
        "ayah": 51
      },
      {
        "surah": 53,
        "ayah": 52
      },
      {
        "surah": 53,
        "ayah": 53
      },
      {
        "surah": 53,
        "ayah": 54
      },
      {
        "surah": 53,
        "ayah": 55
      },
      {
        "surah": 53,
        "ayah": 56
      },
      {
        "surah": 53,
        "ayah": 57
      },
      {
        "surah": 53,
        "ayah": 58
      },
      {
        "surah": 53,
        "ayah": 59
      },
      {
        "surah": 53,
        "ayah": 60
      },
      {
        "surah": 53,
        "ayah": 61
      },
      {
        "surah": 53,
        "ayah": 62
      },
      {
        "surah": 54,
        "ayah": 1
      },
      {
        "surah": 54,
        "ayah": 2
      },
      {
        "surah": 54,
        "ayah": 3
      },
      {
        "surah": 54,
        "ayah": 4
      },
      {
        "surah": 54,
        "ayah": 5
      },
      {
        "surah": 54,
        "ayah": 6
      }
    ]
  },
  {
    "page": 529,
    "juz": 27,
    "hizb": 53,
    "rub": 211,
    "surahs": [
      54
    ],
    "startSurah": 54,
    "startAyah": 7,
    "endSurah": 54,
    "endAyah": 27,
    "verses": [
      {
        "surah": 54,
        "ayah": 7
      },
      {
        "surah": 54,
        "ayah": 8
      },
      {
        "surah": 54,
        "ayah": 9
      },
      {
        "surah": 54,
        "ayah": 10
      },
      {
        "surah": 54,
        "ayah": 11
      },
      {
        "surah": 54,
        "ayah": 12
      },
      {
        "surah": 54,
        "ayah": 13
      },
      {
        "surah": 54,
        "ayah": 14
      },
      {
        "surah": 54,
        "ayah": 15
      },
      {
        "surah": 54,
        "ayah": 16
      },
      {
        "surah": 54,
        "ayah": 17
      },
      {
        "surah": 54,
        "ayah": 18
      },
      {
        "surah": 54,
        "ayah": 19
      },
      {
        "surah": 54,
        "ayah": 20
      },
      {
        "surah": 54,
        "ayah": 21
      },
      {
        "surah": 54,
        "ayah": 22
      },
      {
        "surah": 54,
        "ayah": 23
      },
      {
        "surah": 54,
        "ayah": 24
      },
      {
        "surah": 54,
        "ayah": 25
      },
      {
        "surah": 54,
        "ayah": 26
      },
      {
        "surah": 54,
        "ayah": 27
      }
    ]
  },
  {
    "page": 530,
    "juz": 27,
    "hizb": 53,
    "rub": 212,
    "surahs": [
      54
    ],
    "startSurah": 54,
    "startAyah": 28,
    "endSurah": 54,
    "endAyah": 49,
    "verses": [
      {
        "surah": 54,
        "ayah": 28
      },
      {
        "surah": 54,
        "ayah": 29
      },
      {
        "surah": 54,
        "ayah": 30
      },
      {
        "surah": 54,
        "ayah": 31
      },
      {
        "surah": 54,
        "ayah": 32
      },
      {
        "surah": 54,
        "ayah": 33
      },
      {
        "surah": 54,
        "ayah": 34
      },
      {
        "surah": 54,
        "ayah": 35
      },
      {
        "surah": 54,
        "ayah": 36
      },
      {
        "surah": 54,
        "ayah": 37
      },
      {
        "surah": 54,
        "ayah": 38
      },
      {
        "surah": 54,
        "ayah": 39
      },
      {
        "surah": 54,
        "ayah": 40
      },
      {
        "surah": 54,
        "ayah": 41
      },
      {
        "surah": 54,
        "ayah": 42
      },
      {
        "surah": 54,
        "ayah": 43
      },
      {
        "surah": 54,
        "ayah": 44
      },
      {
        "surah": 54,
        "ayah": 45
      },
      {
        "surah": 54,
        "ayah": 46
      },
      {
        "surah": 54,
        "ayah": 47
      },
      {
        "surah": 54,
        "ayah": 48
      },
      {
        "surah": 54,
        "ayah": 49
      }
    ]
  },
  {
    "page": 531,
    "juz": 27,
    "hizb": 53,
    "rub": 212,
    "surahs": [
      54,
      55
    ],
    "startSurah": 54,
    "startAyah": 50,
    "endSurah": 55,
    "endAyah": 16,
    "verses": [
      {
        "surah": 54,
        "ayah": 50
      },
      {
        "surah": 54,
        "ayah": 51
      },
      {
        "surah": 54,
        "ayah": 52
      },
      {
        "surah": 54,
        "ayah": 53
      },
      {
        "surah": 54,
        "ayah": 54
      },
      {
        "surah": 54,
        "ayah": 55
      },
      {
        "surah": 55,
        "ayah": 1
      },
      {
        "surah": 55,
        "ayah": 2
      },
      {
        "surah": 55,
        "ayah": 3
      },
      {
        "surah": 55,
        "ayah": 4
      },
      {
        "surah": 55,
        "ayah": 5
      },
      {
        "surah": 55,
        "ayah": 6
      },
      {
        "surah": 55,
        "ayah": 7
      },
      {
        "surah": 55,
        "ayah": 8
      },
      {
        "surah": 55,
        "ayah": 9
      },
      {
        "surah": 55,
        "ayah": 10
      },
      {
        "surah": 55,
        "ayah": 11
      },
      {
        "surah": 55,
        "ayah": 12
      },
      {
        "surah": 55,
        "ayah": 13
      },
      {
        "surah": 55,
        "ayah": 14
      },
      {
        "surah": 55,
        "ayah": 15
      },
      {
        "surah": 55,
        "ayah": 16
      }
    ]
  },
  {
    "page": 532,
    "juz": 27,
    "hizb": 54,
    "rub": 213,
    "surahs": [
      55
    ],
    "startSurah": 55,
    "startAyah": 17,
    "endSurah": 55,
    "endAyah": 40,
    "verses": [
      {
        "surah": 55,
        "ayah": 17
      },
      {
        "surah": 55,
        "ayah": 18
      },
      {
        "surah": 55,
        "ayah": 19
      },
      {
        "surah": 55,
        "ayah": 20
      },
      {
        "surah": 55,
        "ayah": 21
      },
      {
        "surah": 55,
        "ayah": 22
      },
      {
        "surah": 55,
        "ayah": 23
      },
      {
        "surah": 55,
        "ayah": 24
      },
      {
        "surah": 55,
        "ayah": 25
      },
      {
        "surah": 55,
        "ayah": 26
      },
      {
        "surah": 55,
        "ayah": 27
      },
      {
        "surah": 55,
        "ayah": 28
      },
      {
        "surah": 55,
        "ayah": 29
      },
      {
        "surah": 55,
        "ayah": 30
      },
      {
        "surah": 55,
        "ayah": 31
      },
      {
        "surah": 55,
        "ayah": 32
      },
      {
        "surah": 55,
        "ayah": 33
      },
      {
        "surah": 55,
        "ayah": 34
      },
      {
        "surah": 55,
        "ayah": 35
      },
      {
        "surah": 55,
        "ayah": 36
      },
      {
        "surah": 55,
        "ayah": 37
      },
      {
        "surah": 55,
        "ayah": 38
      },
      {
        "surah": 55,
        "ayah": 39
      },
      {
        "surah": 55,
        "ayah": 40
      }
    ]
  },
  {
    "page": 533,
    "juz": 27,
    "hizb": 54,
    "rub": 213,
    "surahs": [
      55
    ],
    "startSurah": 55,
    "startAyah": 41,
    "endSurah": 55,
    "endAyah": 67,
    "verses": [
      {
        "surah": 55,
        "ayah": 41
      },
      {
        "surah": 55,
        "ayah": 42
      },
      {
        "surah": 55,
        "ayah": 43
      },
      {
        "surah": 55,
        "ayah": 44
      },
      {
        "surah": 55,
        "ayah": 45
      },
      {
        "surah": 55,
        "ayah": 46
      },
      {
        "surah": 55,
        "ayah": 47
      },
      {
        "surah": 55,
        "ayah": 48
      },
      {
        "surah": 55,
        "ayah": 49
      },
      {
        "surah": 55,
        "ayah": 50
      },
      {
        "surah": 55,
        "ayah": 51
      },
      {
        "surah": 55,
        "ayah": 52
      },
      {
        "surah": 55,
        "ayah": 53
      },
      {
        "surah": 55,
        "ayah": 54
      },
      {
        "surah": 55,
        "ayah": 55
      },
      {
        "surah": 55,
        "ayah": 56
      },
      {
        "surah": 55,
        "ayah": 57
      },
      {
        "surah": 55,
        "ayah": 58
      },
      {
        "surah": 55,
        "ayah": 59
      },
      {
        "surah": 55,
        "ayah": 60
      },
      {
        "surah": 55,
        "ayah": 61
      },
      {
        "surah": 55,
        "ayah": 62
      },
      {
        "surah": 55,
        "ayah": 63
      },
      {
        "surah": 55,
        "ayah": 64
      },
      {
        "surah": 55,
        "ayah": 65
      },
      {
        "surah": 55,
        "ayah": 66
      },
      {
        "surah": 55,
        "ayah": 67
      }
    ]
  },
  {
    "page": 534,
    "juz": 27,
    "hizb": 54,
    "rub": 213,
    "surahs": [
      55,
      56
    ],
    "startSurah": 55,
    "startAyah": 68,
    "endSurah": 56,
    "endAyah": 16,
    "verses": [
      {
        "surah": 55,
        "ayah": 68
      },
      {
        "surah": 55,
        "ayah": 69
      },
      {
        "surah": 55,
        "ayah": 70
      },
      {
        "surah": 55,
        "ayah": 71
      },
      {
        "surah": 55,
        "ayah": 72
      },
      {
        "surah": 55,
        "ayah": 73
      },
      {
        "surah": 55,
        "ayah": 74
      },
      {
        "surah": 55,
        "ayah": 75
      },
      {
        "surah": 55,
        "ayah": 76
      },
      {
        "surah": 55,
        "ayah": 77
      },
      {
        "surah": 55,
        "ayah": 78
      },
      {
        "surah": 56,
        "ayah": 1
      },
      {
        "surah": 56,
        "ayah": 2
      },
      {
        "surah": 56,
        "ayah": 3
      },
      {
        "surah": 56,
        "ayah": 4
      },
      {
        "surah": 56,
        "ayah": 5
      },
      {
        "surah": 56,
        "ayah": 6
      },
      {
        "surah": 56,
        "ayah": 7
      },
      {
        "surah": 56,
        "ayah": 8
      },
      {
        "surah": 56,
        "ayah": 9
      },
      {
        "surah": 56,
        "ayah": 10
      },
      {
        "surah": 56,
        "ayah": 11
      },
      {
        "surah": 56,
        "ayah": 12
      },
      {
        "surah": 56,
        "ayah": 13
      },
      {
        "surah": 56,
        "ayah": 14
      },
      {
        "surah": 56,
        "ayah": 15
      },
      {
        "surah": 56,
        "ayah": 16
      }
    ]
  },
  {
    "page": 535,
    "juz": 27,
    "hizb": 54,
    "rub": 214,
    "surahs": [
      56
    ],
    "startSurah": 56,
    "startAyah": 17,
    "endSurah": 56,
    "endAyah": 50,
    "verses": [
      {
        "surah": 56,
        "ayah": 17
      },
      {
        "surah": 56,
        "ayah": 18
      },
      {
        "surah": 56,
        "ayah": 19
      },
      {
        "surah": 56,
        "ayah": 20
      },
      {
        "surah": 56,
        "ayah": 21
      },
      {
        "surah": 56,
        "ayah": 22
      },
      {
        "surah": 56,
        "ayah": 23
      },
      {
        "surah": 56,
        "ayah": 24
      },
      {
        "surah": 56,
        "ayah": 25
      },
      {
        "surah": 56,
        "ayah": 26
      },
      {
        "surah": 56,
        "ayah": 27
      },
      {
        "surah": 56,
        "ayah": 28
      },
      {
        "surah": 56,
        "ayah": 29
      },
      {
        "surah": 56,
        "ayah": 30
      },
      {
        "surah": 56,
        "ayah": 31
      },
      {
        "surah": 56,
        "ayah": 32
      },
      {
        "surah": 56,
        "ayah": 33
      },
      {
        "surah": 56,
        "ayah": 34
      },
      {
        "surah": 56,
        "ayah": 35
      },
      {
        "surah": 56,
        "ayah": 36
      },
      {
        "surah": 56,
        "ayah": 37
      },
      {
        "surah": 56,
        "ayah": 38
      },
      {
        "surah": 56,
        "ayah": 39
      },
      {
        "surah": 56,
        "ayah": 40
      },
      {
        "surah": 56,
        "ayah": 41
      },
      {
        "surah": 56,
        "ayah": 42
      },
      {
        "surah": 56,
        "ayah": 43
      },
      {
        "surah": 56,
        "ayah": 44
      },
      {
        "surah": 56,
        "ayah": 45
      },
      {
        "surah": 56,
        "ayah": 46
      },
      {
        "surah": 56,
        "ayah": 47
      },
      {
        "surah": 56,
        "ayah": 48
      },
      {
        "surah": 56,
        "ayah": 49
      },
      {
        "surah": 56,
        "ayah": 50
      }
    ]
  },
  {
    "page": 536,
    "juz": 27,
    "hizb": 54,
    "rub": 214,
    "surahs": [
      56
    ],
    "startSurah": 56,
    "startAyah": 51,
    "endSurah": 56,
    "endAyah": 76,
    "verses": [
      {
        "surah": 56,
        "ayah": 51
      },
      {
        "surah": 56,
        "ayah": 52
      },
      {
        "surah": 56,
        "ayah": 53
      },
      {
        "surah": 56,
        "ayah": 54
      },
      {
        "surah": 56,
        "ayah": 55
      },
      {
        "surah": 56,
        "ayah": 56
      },
      {
        "surah": 56,
        "ayah": 57
      },
      {
        "surah": 56,
        "ayah": 58
      },
      {
        "surah": 56,
        "ayah": 59
      },
      {
        "surah": 56,
        "ayah": 60
      },
      {
        "surah": 56,
        "ayah": 61
      },
      {
        "surah": 56,
        "ayah": 62
      },
      {
        "surah": 56,
        "ayah": 63
      },
      {
        "surah": 56,
        "ayah": 64
      },
      {
        "surah": 56,
        "ayah": 65
      },
      {
        "surah": 56,
        "ayah": 66
      },
      {
        "surah": 56,
        "ayah": 67
      },
      {
        "surah": 56,
        "ayah": 68
      },
      {
        "surah": 56,
        "ayah": 69
      },
      {
        "surah": 56,
        "ayah": 70
      },
      {
        "surah": 56,
        "ayah": 71
      },
      {
        "surah": 56,
        "ayah": 72
      },
      {
        "surah": 56,
        "ayah": 73
      },
      {
        "surah": 56,
        "ayah": 74
      },
      {
        "surah": 56,
        "ayah": 75
      },
      {
        "surah": 56,
        "ayah": 76
      }
    ]
  },
  {
    "page": 537,
    "juz": 27,
    "hizb": 54,
    "rub": 215,
    "surahs": [
      56,
      57
    ],
    "startSurah": 56,
    "startAyah": 77,
    "endSurah": 57,
    "endAyah": 3,
    "verses": [
      {
        "surah": 56,
        "ayah": 77
      },
      {
        "surah": 56,
        "ayah": 78
      },
      {
        "surah": 56,
        "ayah": 79
      },
      {
        "surah": 56,
        "ayah": 80
      },
      {
        "surah": 56,
        "ayah": 81
      },
      {
        "surah": 56,
        "ayah": 82
      },
      {
        "surah": 56,
        "ayah": 83
      },
      {
        "surah": 56,
        "ayah": 84
      },
      {
        "surah": 56,
        "ayah": 85
      },
      {
        "surah": 56,
        "ayah": 86
      },
      {
        "surah": 56,
        "ayah": 87
      },
      {
        "surah": 56,
        "ayah": 88
      },
      {
        "surah": 56,
        "ayah": 89
      },
      {
        "surah": 56,
        "ayah": 90
      },
      {
        "surah": 56,
        "ayah": 91
      },
      {
        "surah": 56,
        "ayah": 92
      },
      {
        "surah": 56,
        "ayah": 93
      },
      {
        "surah": 56,
        "ayah": 94
      },
      {
        "surah": 56,
        "ayah": 95
      },
      {
        "surah": 56,
        "ayah": 96
      },
      {
        "surah": 57,
        "ayah": 1
      },
      {
        "surah": 57,
        "ayah": 2
      },
      {
        "surah": 57,
        "ayah": 3
      }
    ]
  },
  {
    "page": 538,
    "juz": 27,
    "hizb": 54,
    "rub": 215,
    "surahs": [
      57
    ],
    "startSurah": 57,
    "startAyah": 4,
    "endSurah": 57,
    "endAyah": 11,
    "verses": [
      {
        "surah": 57,
        "ayah": 4
      },
      {
        "surah": 57,
        "ayah": 5
      },
      {
        "surah": 57,
        "ayah": 6
      },
      {
        "surah": 57,
        "ayah": 7
      },
      {
        "surah": 57,
        "ayah": 8
      },
      {
        "surah": 57,
        "ayah": 9
      },
      {
        "surah": 57,
        "ayah": 10
      },
      {
        "surah": 57,
        "ayah": 11
      }
    ]
  },
  {
    "page": 539,
    "juz": 27,
    "hizb": 54,
    "rub": 215,
    "surahs": [
      57
    ],
    "startSurah": 57,
    "startAyah": 12,
    "endSurah": 57,
    "endAyah": 18,
    "verses": [
      {
        "surah": 57,
        "ayah": 12
      },
      {
        "surah": 57,
        "ayah": 13
      },
      {
        "surah": 57,
        "ayah": 14
      },
      {
        "surah": 57,
        "ayah": 15
      },
      {
        "surah": 57,
        "ayah": 16
      },
      {
        "surah": 57,
        "ayah": 17
      },
      {
        "surah": 57,
        "ayah": 18
      }
    ]
  },
  {
    "page": 540,
    "juz": 27,
    "hizb": 54,
    "rub": 216,
    "surahs": [
      57
    ],
    "startSurah": 57,
    "startAyah": 19,
    "endSurah": 57,
    "endAyah": 24,
    "verses": [
      {
        "surah": 57,
        "ayah": 19
      },
      {
        "surah": 57,
        "ayah": 20
      },
      {
        "surah": 57,
        "ayah": 21
      },
      {
        "surah": 57,
        "ayah": 22
      },
      {
        "surah": 57,
        "ayah": 23
      },
      {
        "surah": 57,
        "ayah": 24
      }
    ]
  },
  {
    "page": 541,
    "juz": 27,
    "hizb": 54,
    "rub": 216,
    "surahs": [
      57
    ],
    "startSurah": 57,
    "startAyah": 25,
    "endSurah": 57,
    "endAyah": 29,
    "verses": [
      {
        "surah": 57,
        "ayah": 25
      },
      {
        "surah": 57,
        "ayah": 26
      },
      {
        "surah": 57,
        "ayah": 27
      },
      {
        "surah": 57,
        "ayah": 28
      },
      {
        "surah": 57,
        "ayah": 29
      }
    ]
  },
  {
    "page": 542,
    "juz": 28,
    "hizb": 55,
    "rub": 217,
    "surahs": [
      58
    ],
    "startSurah": 58,
    "startAyah": 1,
    "endSurah": 58,
    "endAyah": 6,
    "verses": [
      {
        "surah": 58,
        "ayah": 1
      },
      {
        "surah": 58,
        "ayah": 2
      },
      {
        "surah": 58,
        "ayah": 3
      },
      {
        "surah": 58,
        "ayah": 4
      },
      {
        "surah": 58,
        "ayah": 5
      },
      {
        "surah": 58,
        "ayah": 6
      }
    ]
  },
  {
    "page": 543,
    "juz": 28,
    "hizb": 55,
    "rub": 217,
    "surahs": [
      58
    ],
    "startSurah": 58,
    "startAyah": 7,
    "endSurah": 58,
    "endAyah": 11,
    "verses": [
      {
        "surah": 58,
        "ayah": 7
      },
      {
        "surah": 58,
        "ayah": 8
      },
      {
        "surah": 58,
        "ayah": 9
      },
      {
        "surah": 58,
        "ayah": 10
      },
      {
        "surah": 58,
        "ayah": 11
      }
    ]
  },
  {
    "page": 544,
    "juz": 28,
    "hizb": 55,
    "rub": 217,
    "surahs": [
      58
    ],
    "startSurah": 58,
    "startAyah": 12,
    "endSurah": 58,
    "endAyah": 21,
    "verses": [
      {
        "surah": 58,
        "ayah": 12
      },
      {
        "surah": 58,
        "ayah": 13
      },
      {
        "surah": 58,
        "ayah": 14
      },
      {
        "surah": 58,
        "ayah": 15
      },
      {
        "surah": 58,
        "ayah": 16
      },
      {
        "surah": 58,
        "ayah": 17
      },
      {
        "surah": 58,
        "ayah": 18
      },
      {
        "surah": 58,
        "ayah": 19
      },
      {
        "surah": 58,
        "ayah": 20
      },
      {
        "surah": 58,
        "ayah": 21
      }
    ]
  },
  {
    "page": 545,
    "juz": 28,
    "hizb": 55,
    "rub": 218,
    "surahs": [
      58,
      59
    ],
    "startSurah": 58,
    "startAyah": 22,
    "endSurah": 59,
    "endAyah": 3,
    "verses": [
      {
        "surah": 58,
        "ayah": 22
      },
      {
        "surah": 59,
        "ayah": 1
      },
      {
        "surah": 59,
        "ayah": 2
      },
      {
        "surah": 59,
        "ayah": 3
      }
    ]
  },
  {
    "page": 546,
    "juz": 28,
    "hizb": 55,
    "rub": 218,
    "surahs": [
      59
    ],
    "startSurah": 59,
    "startAyah": 4,
    "endSurah": 59,
    "endAyah": 9,
    "verses": [
      {
        "surah": 59,
        "ayah": 4
      },
      {
        "surah": 59,
        "ayah": 5
      },
      {
        "surah": 59,
        "ayah": 6
      },
      {
        "surah": 59,
        "ayah": 7
      },
      {
        "surah": 59,
        "ayah": 8
      },
      {
        "surah": 59,
        "ayah": 9
      }
    ]
  },
  {
    "page": 547,
    "juz": 28,
    "hizb": 55,
    "rub": 218,
    "surahs": [
      59
    ],
    "startSurah": 59,
    "startAyah": 10,
    "endSurah": 59,
    "endAyah": 16,
    "verses": [
      {
        "surah": 59,
        "ayah": 10
      },
      {
        "surah": 59,
        "ayah": 11
      },
      {
        "surah": 59,
        "ayah": 12
      },
      {
        "surah": 59,
        "ayah": 13
      },
      {
        "surah": 59,
        "ayah": 14
      },
      {
        "surah": 59,
        "ayah": 15
      },
      {
        "surah": 59,
        "ayah": 16
      }
    ]
  },
  {
    "page": 548,
    "juz": 28,
    "hizb": 55,
    "rub": 219,
    "surahs": [
      59
    ],
    "startSurah": 59,
    "startAyah": 17,
    "endSurah": 59,
    "endAyah": 24,
    "verses": [
      {
        "surah": 59,
        "ayah": 17
      },
      {
        "surah": 59,
        "ayah": 18
      },
      {
        "surah": 59,
        "ayah": 19
      },
      {
        "surah": 59,
        "ayah": 20
      },
      {
        "surah": 59,
        "ayah": 21
      },
      {
        "surah": 59,
        "ayah": 22
      },
      {
        "surah": 59,
        "ayah": 23
      },
      {
        "surah": 59,
        "ayah": 24
      }
    ]
  },
  {
    "page": 549,
    "juz": 28,
    "hizb": 55,
    "rub": 219,
    "surahs": [
      60
    ],
    "startSurah": 60,
    "startAyah": 1,
    "endSurah": 60,
    "endAyah": 5,
    "verses": [
      {
        "surah": 60,
        "ayah": 1
      },
      {
        "surah": 60,
        "ayah": 2
      },
      {
        "surah": 60,
        "ayah": 3
      },
      {
        "surah": 60,
        "ayah": 4
      },
      {
        "surah": 60,
        "ayah": 5
      }
    ]
  },
  {
    "page": 550,
    "juz": 28,
    "hizb": 55,
    "rub": 219,
    "surahs": [
      60
    ],
    "startSurah": 60,
    "startAyah": 6,
    "endSurah": 60,
    "endAyah": 11,
    "verses": [
      {
        "surah": 60,
        "ayah": 6
      },
      {
        "surah": 60,
        "ayah": 7
      },
      {
        "surah": 60,
        "ayah": 8
      },
      {
        "surah": 60,
        "ayah": 9
      },
      {
        "surah": 60,
        "ayah": 10
      },
      {
        "surah": 60,
        "ayah": 11
      }
    ]
  },
  {
    "page": 551,
    "juz": 28,
    "hizb": 55,
    "rub": 220,
    "surahs": [
      60,
      61
    ],
    "startSurah": 60,
    "startAyah": 12,
    "endSurah": 61,
    "endAyah": 5,
    "verses": [
      {
        "surah": 60,
        "ayah": 12
      },
      {
        "surah": 60,
        "ayah": 13
      },
      {
        "surah": 61,
        "ayah": 1
      },
      {
        "surah": 61,
        "ayah": 2
      },
      {
        "surah": 61,
        "ayah": 3
      },
      {
        "surah": 61,
        "ayah": 4
      },
      {
        "surah": 61,
        "ayah": 5
      }
    ]
  },
  {
    "page": 552,
    "juz": 28,
    "hizb": 55,
    "rub": 220,
    "surahs": [
      61
    ],
    "startSurah": 61,
    "startAyah": 6,
    "endSurah": 61,
    "endAyah": 14,
    "verses": [
      {
        "surah": 61,
        "ayah": 6
      },
      {
        "surah": 61,
        "ayah": 7
      },
      {
        "surah": 61,
        "ayah": 8
      },
      {
        "surah": 61,
        "ayah": 9
      },
      {
        "surah": 61,
        "ayah": 10
      },
      {
        "surah": 61,
        "ayah": 11
      },
      {
        "surah": 61,
        "ayah": 12
      },
      {
        "surah": 61,
        "ayah": 13
      },
      {
        "surah": 61,
        "ayah": 14
      }
    ]
  },
  {
    "page": 553,
    "juz": 28,
    "hizb": 56,
    "rub": 221,
    "surahs": [
      62
    ],
    "startSurah": 62,
    "startAyah": 1,
    "endSurah": 62,
    "endAyah": 8,
    "verses": [
      {
        "surah": 62,
        "ayah": 1
      },
      {
        "surah": 62,
        "ayah": 2
      },
      {
        "surah": 62,
        "ayah": 3
      },
      {
        "surah": 62,
        "ayah": 4
      },
      {
        "surah": 62,
        "ayah": 5
      },
      {
        "surah": 62,
        "ayah": 6
      },
      {
        "surah": 62,
        "ayah": 7
      },
      {
        "surah": 62,
        "ayah": 8
      }
    ]
  },
  {
    "page": 554,
    "juz": 28,
    "hizb": 56,
    "rub": 221,
    "surahs": [
      62,
      63
    ],
    "startSurah": 62,
    "startAyah": 9,
    "endSurah": 63,
    "endAyah": 4,
    "verses": [
      {
        "surah": 62,
        "ayah": 9
      },
      {
        "surah": 62,
        "ayah": 10
      },
      {
        "surah": 62,
        "ayah": 11
      },
      {
        "surah": 63,
        "ayah": 1
      },
      {
        "surah": 63,
        "ayah": 2
      },
      {
        "surah": 63,
        "ayah": 3
      },
      {
        "surah": 63,
        "ayah": 4
      }
    ]
  },
  {
    "page": 555,
    "juz": 28,
    "hizb": 56,
    "rub": 222,
    "surahs": [
      63
    ],
    "startSurah": 63,
    "startAyah": 5,
    "endSurah": 63,
    "endAyah": 11,
    "verses": [
      {
        "surah": 63,
        "ayah": 5
      },
      {
        "surah": 63,
        "ayah": 6
      },
      {
        "surah": 63,
        "ayah": 7
      },
      {
        "surah": 63,
        "ayah": 8
      },
      {
        "surah": 63,
        "ayah": 9
      },
      {
        "surah": 63,
        "ayah": 10
      },
      {
        "surah": 63,
        "ayah": 11
      }
    ]
  },
  {
    "page": 556,
    "juz": 28,
    "hizb": 56,
    "rub": 222,
    "surahs": [
      64
    ],
    "startSurah": 64,
    "startAyah": 1,
    "endSurah": 64,
    "endAyah": 9,
    "verses": [
      {
        "surah": 64,
        "ayah": 1
      },
      {
        "surah": 64,
        "ayah": 2
      },
      {
        "surah": 64,
        "ayah": 3
      },
      {
        "surah": 64,
        "ayah": 4
      },
      {
        "surah": 64,
        "ayah": 5
      },
      {
        "surah": 64,
        "ayah": 6
      },
      {
        "surah": 64,
        "ayah": 7
      },
      {
        "surah": 64,
        "ayah": 8
      },
      {
        "surah": 64,
        "ayah": 9
      }
    ]
  },
  {
    "page": 557,
    "juz": 28,
    "hizb": 56,
    "rub": 222,
    "surahs": [
      64
    ],
    "startSurah": 64,
    "startAyah": 10,
    "endSurah": 64,
    "endAyah": 18,
    "verses": [
      {
        "surah": 64,
        "ayah": 10
      },
      {
        "surah": 64,
        "ayah": 11
      },
      {
        "surah": 64,
        "ayah": 12
      },
      {
        "surah": 64,
        "ayah": 13
      },
      {
        "surah": 64,
        "ayah": 14
      },
      {
        "surah": 64,
        "ayah": 15
      },
      {
        "surah": 64,
        "ayah": 16
      },
      {
        "surah": 64,
        "ayah": 17
      },
      {
        "surah": 64,
        "ayah": 18
      }
    ]
  },
  {
    "page": 558,
    "juz": 28,
    "hizb": 56,
    "rub": 223,
    "surahs": [
      65
    ],
    "startSurah": 65,
    "startAyah": 1,
    "endSurah": 65,
    "endAyah": 5,
    "verses": [
      {
        "surah": 65,
        "ayah": 1
      },
      {
        "surah": 65,
        "ayah": 2
      },
      {
        "surah": 65,
        "ayah": 3
      },
      {
        "surah": 65,
        "ayah": 4
      },
      {
        "surah": 65,
        "ayah": 5
      }
    ]
  },
  {
    "page": 559,
    "juz": 28,
    "hizb": 56,
    "rub": 223,
    "surahs": [
      65
    ],
    "startSurah": 65,
    "startAyah": 6,
    "endSurah": 65,
    "endAyah": 12,
    "verses": [
      {
        "surah": 65,
        "ayah": 6
      },
      {
        "surah": 65,
        "ayah": 7
      },
      {
        "surah": 65,
        "ayah": 8
      },
      {
        "surah": 65,
        "ayah": 9
      },
      {
        "surah": 65,
        "ayah": 10
      },
      {
        "surah": 65,
        "ayah": 11
      },
      {
        "surah": 65,
        "ayah": 12
      }
    ]
  },
  {
    "page": 560,
    "juz": 28,
    "hizb": 56,
    "rub": 224,
    "surahs": [
      66
    ],
    "startSurah": 66,
    "startAyah": 1,
    "endSurah": 66,
    "endAyah": 7,
    "verses": [
      {
        "surah": 66,
        "ayah": 1
      },
      {
        "surah": 66,
        "ayah": 2
      },
      {
        "surah": 66,
        "ayah": 3
      },
      {
        "surah": 66,
        "ayah": 4
      },
      {
        "surah": 66,
        "ayah": 5
      },
      {
        "surah": 66,
        "ayah": 6
      },
      {
        "surah": 66,
        "ayah": 7
      }
    ]
  },
  {
    "page": 561,
    "juz": 28,
    "hizb": 56,
    "rub": 224,
    "surahs": [
      66
    ],
    "startSurah": 66,
    "startAyah": 8,
    "endSurah": 66,
    "endAyah": 12,
    "verses": [
      {
        "surah": 66,
        "ayah": 8
      },
      {
        "surah": 66,
        "ayah": 9
      },
      {
        "surah": 66,
        "ayah": 10
      },
      {
        "surah": 66,
        "ayah": 11
      },
      {
        "surah": 66,
        "ayah": 12
      }
    ]
  },
  {
    "page": 562,
    "juz": 29,
    "hizb": 57,
    "rub": 225,
    "surahs": [
      67
    ],
    "startSurah": 67,
    "startAyah": 1,
    "endSurah": 67,
    "endAyah": 12,
    "verses": [
      {
        "surah": 67,
        "ayah": 1
      },
      {
        "surah": 67,
        "ayah": 2
      },
      {
        "surah": 67,
        "ayah": 3
      },
      {
        "surah": 67,
        "ayah": 4
      },
      {
        "surah": 67,
        "ayah": 5
      },
      {
        "surah": 67,
        "ayah": 6
      },
      {
        "surah": 67,
        "ayah": 7
      },
      {
        "surah": 67,
        "ayah": 8
      },
      {
        "surah": 67,
        "ayah": 9
      },
      {
        "surah": 67,
        "ayah": 10
      },
      {
        "surah": 67,
        "ayah": 11
      },
      {
        "surah": 67,
        "ayah": 12
      }
    ]
  },
  {
    "page": 563,
    "juz": 29,
    "hizb": 57,
    "rub": 225,
    "surahs": [
      67
    ],
    "startSurah": 67,
    "startAyah": 13,
    "endSurah": 67,
    "endAyah": 26,
    "verses": [
      {
        "surah": 67,
        "ayah": 13
      },
      {
        "surah": 67,
        "ayah": 14
      },
      {
        "surah": 67,
        "ayah": 15
      },
      {
        "surah": 67,
        "ayah": 16
      },
      {
        "surah": 67,
        "ayah": 17
      },
      {
        "surah": 67,
        "ayah": 18
      },
      {
        "surah": 67,
        "ayah": 19
      },
      {
        "surah": 67,
        "ayah": 20
      },
      {
        "surah": 67,
        "ayah": 21
      },
      {
        "surah": 67,
        "ayah": 22
      },
      {
        "surah": 67,
        "ayah": 23
      },
      {
        "surah": 67,
        "ayah": 24
      },
      {
        "surah": 67,
        "ayah": 25
      },
      {
        "surah": 67,
        "ayah": 26
      }
    ]
  },
  {
    "page": 564,
    "juz": 29,
    "hizb": 57,
    "rub": 225,
    "surahs": [
      67,
      68
    ],
    "startSurah": 67,
    "startAyah": 27,
    "endSurah": 68,
    "endAyah": 15,
    "verses": [
      {
        "surah": 67,
        "ayah": 27
      },
      {
        "surah": 67,
        "ayah": 28
      },
      {
        "surah": 67,
        "ayah": 29
      },
      {
        "surah": 67,
        "ayah": 30
      },
      {
        "surah": 68,
        "ayah": 1
      },
      {
        "surah": 68,
        "ayah": 2
      },
      {
        "surah": 68,
        "ayah": 3
      },
      {
        "surah": 68,
        "ayah": 4
      },
      {
        "surah": 68,
        "ayah": 5
      },
      {
        "surah": 68,
        "ayah": 6
      },
      {
        "surah": 68,
        "ayah": 7
      },
      {
        "surah": 68,
        "ayah": 8
      },
      {
        "surah": 68,
        "ayah": 9
      },
      {
        "surah": 68,
        "ayah": 10
      },
      {
        "surah": 68,
        "ayah": 11
      },
      {
        "surah": 68,
        "ayah": 12
      },
      {
        "surah": 68,
        "ayah": 13
      },
      {
        "surah": 68,
        "ayah": 14
      },
      {
        "surah": 68,
        "ayah": 15
      }
    ]
  },
  {
    "page": 565,
    "juz": 29,
    "hizb": 57,
    "rub": 226,
    "surahs": [
      68
    ],
    "startSurah": 68,
    "startAyah": 16,
    "endSurah": 68,
    "endAyah": 42,
    "verses": [
      {
        "surah": 68,
        "ayah": 16
      },
      {
        "surah": 68,
        "ayah": 17
      },
      {
        "surah": 68,
        "ayah": 18
      },
      {
        "surah": 68,
        "ayah": 19
      },
      {
        "surah": 68,
        "ayah": 20
      },
      {
        "surah": 68,
        "ayah": 21
      },
      {
        "surah": 68,
        "ayah": 22
      },
      {
        "surah": 68,
        "ayah": 23
      },
      {
        "surah": 68,
        "ayah": 24
      },
      {
        "surah": 68,
        "ayah": 25
      },
      {
        "surah": 68,
        "ayah": 26
      },
      {
        "surah": 68,
        "ayah": 27
      },
      {
        "surah": 68,
        "ayah": 28
      },
      {
        "surah": 68,
        "ayah": 29
      },
      {
        "surah": 68,
        "ayah": 30
      },
      {
        "surah": 68,
        "ayah": 31
      },
      {
        "surah": 68,
        "ayah": 32
      },
      {
        "surah": 68,
        "ayah": 33
      },
      {
        "surah": 68,
        "ayah": 34
      },
      {
        "surah": 68,
        "ayah": 35
      },
      {
        "surah": 68,
        "ayah": 36
      },
      {
        "surah": 68,
        "ayah": 37
      },
      {
        "surah": 68,
        "ayah": 38
      },
      {
        "surah": 68,
        "ayah": 39
      },
      {
        "surah": 68,
        "ayah": 40
      },
      {
        "surah": 68,
        "ayah": 41
      },
      {
        "surah": 68,
        "ayah": 42
      }
    ]
  },
  {
    "page": 566,
    "juz": 29,
    "hizb": 57,
    "rub": 226,
    "surahs": [
      68,
      69
    ],
    "startSurah": 68,
    "startAyah": 43,
    "endSurah": 69,
    "endAyah": 8,
    "verses": [
      {
        "surah": 68,
        "ayah": 43
      },
      {
        "surah": 68,
        "ayah": 44
      },
      {
        "surah": 68,
        "ayah": 45
      },
      {
        "surah": 68,
        "ayah": 46
      },
      {
        "surah": 68,
        "ayah": 47
      },
      {
        "surah": 68,
        "ayah": 48
      },
      {
        "surah": 68,
        "ayah": 49
      },
      {
        "surah": 68,
        "ayah": 50
      },
      {
        "surah": 68,
        "ayah": 51
      },
      {
        "surah": 68,
        "ayah": 52
      },
      {
        "surah": 69,
        "ayah": 1
      },
      {
        "surah": 69,
        "ayah": 2
      },
      {
        "surah": 69,
        "ayah": 3
      },
      {
        "surah": 69,
        "ayah": 4
      },
      {
        "surah": 69,
        "ayah": 5
      },
      {
        "surah": 69,
        "ayah": 6
      },
      {
        "surah": 69,
        "ayah": 7
      },
      {
        "surah": 69,
        "ayah": 8
      }
    ]
  },
  {
    "page": 567,
    "juz": 29,
    "hizb": 57,
    "rub": 227,
    "surahs": [
      69
    ],
    "startSurah": 69,
    "startAyah": 9,
    "endSurah": 69,
    "endAyah": 34,
    "verses": [
      {
        "surah": 69,
        "ayah": 9
      },
      {
        "surah": 69,
        "ayah": 10
      },
      {
        "surah": 69,
        "ayah": 11
      },
      {
        "surah": 69,
        "ayah": 12
      },
      {
        "surah": 69,
        "ayah": 13
      },
      {
        "surah": 69,
        "ayah": 14
      },
      {
        "surah": 69,
        "ayah": 15
      },
      {
        "surah": 69,
        "ayah": 16
      },
      {
        "surah": 69,
        "ayah": 17
      },
      {
        "surah": 69,
        "ayah": 18
      },
      {
        "surah": 69,
        "ayah": 19
      },
      {
        "surah": 69,
        "ayah": 20
      },
      {
        "surah": 69,
        "ayah": 21
      },
      {
        "surah": 69,
        "ayah": 22
      },
      {
        "surah": 69,
        "ayah": 23
      },
      {
        "surah": 69,
        "ayah": 24
      },
      {
        "surah": 69,
        "ayah": 25
      },
      {
        "surah": 69,
        "ayah": 26
      },
      {
        "surah": 69,
        "ayah": 27
      },
      {
        "surah": 69,
        "ayah": 28
      },
      {
        "surah": 69,
        "ayah": 29
      },
      {
        "surah": 69,
        "ayah": 30
      },
      {
        "surah": 69,
        "ayah": 31
      },
      {
        "surah": 69,
        "ayah": 32
      },
      {
        "surah": 69,
        "ayah": 33
      },
      {
        "surah": 69,
        "ayah": 34
      }
    ]
  },
  {
    "page": 568,
    "juz": 29,
    "hizb": 57,
    "rub": 227,
    "surahs": [
      69,
      70
    ],
    "startSurah": 69,
    "startAyah": 35,
    "endSurah": 70,
    "endAyah": 10,
    "verses": [
      {
        "surah": 69,
        "ayah": 35
      },
      {
        "surah": 69,
        "ayah": 36
      },
      {
        "surah": 69,
        "ayah": 37
      },
      {
        "surah": 69,
        "ayah": 38
      },
      {
        "surah": 69,
        "ayah": 39
      },
      {
        "surah": 69,
        "ayah": 40
      },
      {
        "surah": 69,
        "ayah": 41
      },
      {
        "surah": 69,
        "ayah": 42
      },
      {
        "surah": 69,
        "ayah": 43
      },
      {
        "surah": 69,
        "ayah": 44
      },
      {
        "surah": 69,
        "ayah": 45
      },
      {
        "surah": 69,
        "ayah": 46
      },
      {
        "surah": 69,
        "ayah": 47
      },
      {
        "surah": 69,
        "ayah": 48
      },
      {
        "surah": 69,
        "ayah": 49
      },
      {
        "surah": 69,
        "ayah": 50
      },
      {
        "surah": 69,
        "ayah": 51
      },
      {
        "surah": 69,
        "ayah": 52
      },
      {
        "surah": 70,
        "ayah": 1
      },
      {
        "surah": 70,
        "ayah": 2
      },
      {
        "surah": 70,
        "ayah": 3
      },
      {
        "surah": 70,
        "ayah": 4
      },
      {
        "surah": 70,
        "ayah": 5
      },
      {
        "surah": 70,
        "ayah": 6
      },
      {
        "surah": 70,
        "ayah": 7
      },
      {
        "surah": 70,
        "ayah": 8
      },
      {
        "surah": 70,
        "ayah": 9
      },
      {
        "surah": 70,
        "ayah": 10
      }
    ]
  },
  {
    "page": 569,
    "juz": 29,
    "hizb": 57,
    "rub": 227,
    "surahs": [
      70
    ],
    "startSurah": 70,
    "startAyah": 11,
    "endSurah": 70,
    "endAyah": 39,
    "verses": [
      {
        "surah": 70,
        "ayah": 11
      },
      {
        "surah": 70,
        "ayah": 12
      },
      {
        "surah": 70,
        "ayah": 13
      },
      {
        "surah": 70,
        "ayah": 14
      },
      {
        "surah": 70,
        "ayah": 15
      },
      {
        "surah": 70,
        "ayah": 16
      },
      {
        "surah": 70,
        "ayah": 17
      },
      {
        "surah": 70,
        "ayah": 18
      },
      {
        "surah": 70,
        "ayah": 19
      },
      {
        "surah": 70,
        "ayah": 20
      },
      {
        "surah": 70,
        "ayah": 21
      },
      {
        "surah": 70,
        "ayah": 22
      },
      {
        "surah": 70,
        "ayah": 23
      },
      {
        "surah": 70,
        "ayah": 24
      },
      {
        "surah": 70,
        "ayah": 25
      },
      {
        "surah": 70,
        "ayah": 26
      },
      {
        "surah": 70,
        "ayah": 27
      },
      {
        "surah": 70,
        "ayah": 28
      },
      {
        "surah": 70,
        "ayah": 29
      },
      {
        "surah": 70,
        "ayah": 30
      },
      {
        "surah": 70,
        "ayah": 31
      },
      {
        "surah": 70,
        "ayah": 32
      },
      {
        "surah": 70,
        "ayah": 33
      },
      {
        "surah": 70,
        "ayah": 34
      },
      {
        "surah": 70,
        "ayah": 35
      },
      {
        "surah": 70,
        "ayah": 36
      },
      {
        "surah": 70,
        "ayah": 37
      },
      {
        "surah": 70,
        "ayah": 38
      },
      {
        "surah": 70,
        "ayah": 39
      }
    ]
  },
  {
    "page": 570,
    "juz": 29,
    "hizb": 57,
    "rub": 228,
    "surahs": [
      70,
      71
    ],
    "startSurah": 70,
    "startAyah": 40,
    "endSurah": 71,
    "endAyah": 10,
    "verses": [
      {
        "surah": 70,
        "ayah": 40
      },
      {
        "surah": 70,
        "ayah": 41
      },
      {
        "surah": 70,
        "ayah": 42
      },
      {
        "surah": 70,
        "ayah": 43
      },
      {
        "surah": 70,
        "ayah": 44
      },
      {
        "surah": 71,
        "ayah": 1
      },
      {
        "surah": 71,
        "ayah": 2
      },
      {
        "surah": 71,
        "ayah": 3
      },
      {
        "surah": 71,
        "ayah": 4
      },
      {
        "surah": 71,
        "ayah": 5
      },
      {
        "surah": 71,
        "ayah": 6
      },
      {
        "surah": 71,
        "ayah": 7
      },
      {
        "surah": 71,
        "ayah": 8
      },
      {
        "surah": 71,
        "ayah": 9
      },
      {
        "surah": 71,
        "ayah": 10
      }
    ]
  },
  {
    "page": 571,
    "juz": 29,
    "hizb": 57,
    "rub": 228,
    "surahs": [
      71
    ],
    "startSurah": 71,
    "startAyah": 11,
    "endSurah": 71,
    "endAyah": 28,
    "verses": [
      {
        "surah": 71,
        "ayah": 11
      },
      {
        "surah": 71,
        "ayah": 12
      },
      {
        "surah": 71,
        "ayah": 13
      },
      {
        "surah": 71,
        "ayah": 14
      },
      {
        "surah": 71,
        "ayah": 15
      },
      {
        "surah": 71,
        "ayah": 16
      },
      {
        "surah": 71,
        "ayah": 17
      },
      {
        "surah": 71,
        "ayah": 18
      },
      {
        "surah": 71,
        "ayah": 19
      },
      {
        "surah": 71,
        "ayah": 20
      },
      {
        "surah": 71,
        "ayah": 21
      },
      {
        "surah": 71,
        "ayah": 22
      },
      {
        "surah": 71,
        "ayah": 23
      },
      {
        "surah": 71,
        "ayah": 24
      },
      {
        "surah": 71,
        "ayah": 25
      },
      {
        "surah": 71,
        "ayah": 26
      },
      {
        "surah": 71,
        "ayah": 27
      },
      {
        "surah": 71,
        "ayah": 28
      }
    ]
  },
  {
    "page": 572,
    "juz": 29,
    "hizb": 58,
    "rub": 229,
    "surahs": [
      72
    ],
    "startSurah": 72,
    "startAyah": 1,
    "endSurah": 72,
    "endAyah": 13,
    "verses": [
      {
        "surah": 72,
        "ayah": 1
      },
      {
        "surah": 72,
        "ayah": 2
      },
      {
        "surah": 72,
        "ayah": 3
      },
      {
        "surah": 72,
        "ayah": 4
      },
      {
        "surah": 72,
        "ayah": 5
      },
      {
        "surah": 72,
        "ayah": 6
      },
      {
        "surah": 72,
        "ayah": 7
      },
      {
        "surah": 72,
        "ayah": 8
      },
      {
        "surah": 72,
        "ayah": 9
      },
      {
        "surah": 72,
        "ayah": 10
      },
      {
        "surah": 72,
        "ayah": 11
      },
      {
        "surah": 72,
        "ayah": 12
      },
      {
        "surah": 72,
        "ayah": 13
      }
    ]
  },
  {
    "page": 573,
    "juz": 29,
    "hizb": 58,
    "rub": 229,
    "surahs": [
      72
    ],
    "startSurah": 72,
    "startAyah": 14,
    "endSurah": 72,
    "endAyah": 28,
    "verses": [
      {
        "surah": 72,
        "ayah": 14
      },
      {
        "surah": 72,
        "ayah": 15
      },
      {
        "surah": 72,
        "ayah": 16
      },
      {
        "surah": 72,
        "ayah": 17
      },
      {
        "surah": 72,
        "ayah": 18
      },
      {
        "surah": 72,
        "ayah": 19
      },
      {
        "surah": 72,
        "ayah": 20
      },
      {
        "surah": 72,
        "ayah": 21
      },
      {
        "surah": 72,
        "ayah": 22
      },
      {
        "surah": 72,
        "ayah": 23
      },
      {
        "surah": 72,
        "ayah": 24
      },
      {
        "surah": 72,
        "ayah": 25
      },
      {
        "surah": 72,
        "ayah": 26
      },
      {
        "surah": 72,
        "ayah": 27
      },
      {
        "surah": 72,
        "ayah": 28
      }
    ]
  },
  {
    "page": 574,
    "juz": 29,
    "hizb": 58,
    "rub": 229,
    "surahs": [
      73
    ],
    "startSurah": 73,
    "startAyah": 1,
    "endSurah": 73,
    "endAyah": 19,
    "verses": [
      {
        "surah": 73,
        "ayah": 1
      },
      {
        "surah": 73,
        "ayah": 2
      },
      {
        "surah": 73,
        "ayah": 3
      },
      {
        "surah": 73,
        "ayah": 4
      },
      {
        "surah": 73,
        "ayah": 5
      },
      {
        "surah": 73,
        "ayah": 6
      },
      {
        "surah": 73,
        "ayah": 7
      },
      {
        "surah": 73,
        "ayah": 8
      },
      {
        "surah": 73,
        "ayah": 9
      },
      {
        "surah": 73,
        "ayah": 10
      },
      {
        "surah": 73,
        "ayah": 11
      },
      {
        "surah": 73,
        "ayah": 12
      },
      {
        "surah": 73,
        "ayah": 13
      },
      {
        "surah": 73,
        "ayah": 14
      },
      {
        "surah": 73,
        "ayah": 15
      },
      {
        "surah": 73,
        "ayah": 16
      },
      {
        "surah": 73,
        "ayah": 17
      },
      {
        "surah": 73,
        "ayah": 18
      },
      {
        "surah": 73,
        "ayah": 19
      }
    ]
  },
  {
    "page": 575,
    "juz": 29,
    "hizb": 58,
    "rub": 230,
    "surahs": [
      73,
      74
    ],
    "startSurah": 73,
    "startAyah": 20,
    "endSurah": 74,
    "endAyah": 17,
    "verses": [
      {
        "surah": 73,
        "ayah": 20
      },
      {
        "surah": 74,
        "ayah": 1
      },
      {
        "surah": 74,
        "ayah": 2
      },
      {
        "surah": 74,
        "ayah": 3
      },
      {
        "surah": 74,
        "ayah": 4
      },
      {
        "surah": 74,
        "ayah": 5
      },
      {
        "surah": 74,
        "ayah": 6
      },
      {
        "surah": 74,
        "ayah": 7
      },
      {
        "surah": 74,
        "ayah": 8
      },
      {
        "surah": 74,
        "ayah": 9
      },
      {
        "surah": 74,
        "ayah": 10
      },
      {
        "surah": 74,
        "ayah": 11
      },
      {
        "surah": 74,
        "ayah": 12
      },
      {
        "surah": 74,
        "ayah": 13
      },
      {
        "surah": 74,
        "ayah": 14
      },
      {
        "surah": 74,
        "ayah": 15
      },
      {
        "surah": 74,
        "ayah": 16
      },
      {
        "surah": 74,
        "ayah": 17
      }
    ]
  },
  {
    "page": 576,
    "juz": 29,
    "hizb": 58,
    "rub": 230,
    "surahs": [
      74
    ],
    "startSurah": 74,
    "startAyah": 18,
    "endSurah": 74,
    "endAyah": 47,
    "verses": [
      {
        "surah": 74,
        "ayah": 18
      },
      {
        "surah": 74,
        "ayah": 19
      },
      {
        "surah": 74,
        "ayah": 20
      },
      {
        "surah": 74,
        "ayah": 21
      },
      {
        "surah": 74,
        "ayah": 22
      },
      {
        "surah": 74,
        "ayah": 23
      },
      {
        "surah": 74,
        "ayah": 24
      },
      {
        "surah": 74,
        "ayah": 25
      },
      {
        "surah": 74,
        "ayah": 26
      },
      {
        "surah": 74,
        "ayah": 27
      },
      {
        "surah": 74,
        "ayah": 28
      },
      {
        "surah": 74,
        "ayah": 29
      },
      {
        "surah": 74,
        "ayah": 30
      },
      {
        "surah": 74,
        "ayah": 31
      },
      {
        "surah": 74,
        "ayah": 32
      },
      {
        "surah": 74,
        "ayah": 33
      },
      {
        "surah": 74,
        "ayah": 34
      },
      {
        "surah": 74,
        "ayah": 35
      },
      {
        "surah": 74,
        "ayah": 36
      },
      {
        "surah": 74,
        "ayah": 37
      },
      {
        "surah": 74,
        "ayah": 38
      },
      {
        "surah": 74,
        "ayah": 39
      },
      {
        "surah": 74,
        "ayah": 40
      },
      {
        "surah": 74,
        "ayah": 41
      },
      {
        "surah": 74,
        "ayah": 42
      },
      {
        "surah": 74,
        "ayah": 43
      },
      {
        "surah": 74,
        "ayah": 44
      },
      {
        "surah": 74,
        "ayah": 45
      },
      {
        "surah": 74,
        "ayah": 46
      },
      {
        "surah": 74,
        "ayah": 47
      }
    ]
  },
  {
    "page": 577,
    "juz": 29,
    "hizb": 58,
    "rub": 230,
    "surahs": [
      74,
      75
    ],
    "startSurah": 74,
    "startAyah": 48,
    "endSurah": 75,
    "endAyah": 19,
    "verses": [
      {
        "surah": 74,
        "ayah": 48
      },
      {
        "surah": 74,
        "ayah": 49
      },
      {
        "surah": 74,
        "ayah": 50
      },
      {
        "surah": 74,
        "ayah": 51
      },
      {
        "surah": 74,
        "ayah": 52
      },
      {
        "surah": 74,
        "ayah": 53
      },
      {
        "surah": 74,
        "ayah": 54
      },
      {
        "surah": 74,
        "ayah": 55
      },
      {
        "surah": 74,
        "ayah": 56
      },
      {
        "surah": 75,
        "ayah": 1
      },
      {
        "surah": 75,
        "ayah": 2
      },
      {
        "surah": 75,
        "ayah": 3
      },
      {
        "surah": 75,
        "ayah": 4
      },
      {
        "surah": 75,
        "ayah": 5
      },
      {
        "surah": 75,
        "ayah": 6
      },
      {
        "surah": 75,
        "ayah": 7
      },
      {
        "surah": 75,
        "ayah": 8
      },
      {
        "surah": 75,
        "ayah": 9
      },
      {
        "surah": 75,
        "ayah": 10
      },
      {
        "surah": 75,
        "ayah": 11
      },
      {
        "surah": 75,
        "ayah": 12
      },
      {
        "surah": 75,
        "ayah": 13
      },
      {
        "surah": 75,
        "ayah": 14
      },
      {
        "surah": 75,
        "ayah": 15
      },
      {
        "surah": 75,
        "ayah": 16
      },
      {
        "surah": 75,
        "ayah": 17
      },
      {
        "surah": 75,
        "ayah": 18
      },
      {
        "surah": 75,
        "ayah": 19
      }
    ]
  },
  {
    "page": 578,
    "juz": 29,
    "hizb": 58,
    "rub": 231,
    "surahs": [
      75,
      76
    ],
    "startSurah": 75,
    "startAyah": 20,
    "endSurah": 76,
    "endAyah": 5,
    "verses": [
      {
        "surah": 75,
        "ayah": 20
      },
      {
        "surah": 75,
        "ayah": 21
      },
      {
        "surah": 75,
        "ayah": 22
      },
      {
        "surah": 75,
        "ayah": 23
      },
      {
        "surah": 75,
        "ayah": 24
      },
      {
        "surah": 75,
        "ayah": 25
      },
      {
        "surah": 75,
        "ayah": 26
      },
      {
        "surah": 75,
        "ayah": 27
      },
      {
        "surah": 75,
        "ayah": 28
      },
      {
        "surah": 75,
        "ayah": 29
      },
      {
        "surah": 75,
        "ayah": 30
      },
      {
        "surah": 75,
        "ayah": 31
      },
      {
        "surah": 75,
        "ayah": 32
      },
      {
        "surah": 75,
        "ayah": 33
      },
      {
        "surah": 75,
        "ayah": 34
      },
      {
        "surah": 75,
        "ayah": 35
      },
      {
        "surah": 75,
        "ayah": 36
      },
      {
        "surah": 75,
        "ayah": 37
      },
      {
        "surah": 75,
        "ayah": 38
      },
      {
        "surah": 75,
        "ayah": 39
      },
      {
        "surah": 75,
        "ayah": 40
      },
      {
        "surah": 76,
        "ayah": 1
      },
      {
        "surah": 76,
        "ayah": 2
      },
      {
        "surah": 76,
        "ayah": 3
      },
      {
        "surah": 76,
        "ayah": 4
      },
      {
        "surah": 76,
        "ayah": 5
      }
    ]
  },
  {
    "page": 579,
    "juz": 29,
    "hizb": 58,
    "rub": 231,
    "surahs": [
      76
    ],
    "startSurah": 76,
    "startAyah": 6,
    "endSurah": 76,
    "endAyah": 25,
    "verses": [
      {
        "surah": 76,
        "ayah": 6
      },
      {
        "surah": 76,
        "ayah": 7
      },
      {
        "surah": 76,
        "ayah": 8
      },
      {
        "surah": 76,
        "ayah": 9
      },
      {
        "surah": 76,
        "ayah": 10
      },
      {
        "surah": 76,
        "ayah": 11
      },
      {
        "surah": 76,
        "ayah": 12
      },
      {
        "surah": 76,
        "ayah": 13
      },
      {
        "surah": 76,
        "ayah": 14
      },
      {
        "surah": 76,
        "ayah": 15
      },
      {
        "surah": 76,
        "ayah": 16
      },
      {
        "surah": 76,
        "ayah": 17
      },
      {
        "surah": 76,
        "ayah": 18
      },
      {
        "surah": 76,
        "ayah": 19
      },
      {
        "surah": 76,
        "ayah": 20
      },
      {
        "surah": 76,
        "ayah": 21
      },
      {
        "surah": 76,
        "ayah": 22
      },
      {
        "surah": 76,
        "ayah": 23
      },
      {
        "surah": 76,
        "ayah": 24
      },
      {
        "surah": 76,
        "ayah": 25
      }
    ]
  },
  {
    "page": 580,
    "juz": 29,
    "hizb": 58,
    "rub": 232,
    "surahs": [
      76,
      77
    ],
    "startSurah": 76,
    "startAyah": 26,
    "endSurah": 77,
    "endAyah": 19,
    "verses": [
      {
        "surah": 76,
        "ayah": 26
      },
      {
        "surah": 76,
        "ayah": 27
      },
      {
        "surah": 76,
        "ayah": 28
      },
      {
        "surah": 76,
        "ayah": 29
      },
      {
        "surah": 76,
        "ayah": 30
      },
      {
        "surah": 76,
        "ayah": 31
      },
      {
        "surah": 77,
        "ayah": 1
      },
      {
        "surah": 77,
        "ayah": 2
      },
      {
        "surah": 77,
        "ayah": 3
      },
      {
        "surah": 77,
        "ayah": 4
      },
      {
        "surah": 77,
        "ayah": 5
      },
      {
        "surah": 77,
        "ayah": 6
      },
      {
        "surah": 77,
        "ayah": 7
      },
      {
        "surah": 77,
        "ayah": 8
      },
      {
        "surah": 77,
        "ayah": 9
      },
      {
        "surah": 77,
        "ayah": 10
      },
      {
        "surah": 77,
        "ayah": 11
      },
      {
        "surah": 77,
        "ayah": 12
      },
      {
        "surah": 77,
        "ayah": 13
      },
      {
        "surah": 77,
        "ayah": 14
      },
      {
        "surah": 77,
        "ayah": 15
      },
      {
        "surah": 77,
        "ayah": 16
      },
      {
        "surah": 77,
        "ayah": 17
      },
      {
        "surah": 77,
        "ayah": 18
      },
      {
        "surah": 77,
        "ayah": 19
      }
    ]
  },
  {
    "page": 581,
    "juz": 29,
    "hizb": 58,
    "rub": 232,
    "surahs": [
      77
    ],
    "startSurah": 77,
    "startAyah": 20,
    "endSurah": 77,
    "endAyah": 50,
    "verses": [
      {
        "surah": 77,
        "ayah": 20
      },
      {
        "surah": 77,
        "ayah": 21
      },
      {
        "surah": 77,
        "ayah": 22
      },
      {
        "surah": 77,
        "ayah": 23
      },
      {
        "surah": 77,
        "ayah": 24
      },
      {
        "surah": 77,
        "ayah": 25
      },
      {
        "surah": 77,
        "ayah": 26
      },
      {
        "surah": 77,
        "ayah": 27
      },
      {
        "surah": 77,
        "ayah": 28
      },
      {
        "surah": 77,
        "ayah": 29
      },
      {
        "surah": 77,
        "ayah": 30
      },
      {
        "surah": 77,
        "ayah": 31
      },
      {
        "surah": 77,
        "ayah": 32
      },
      {
        "surah": 77,
        "ayah": 33
      },
      {
        "surah": 77,
        "ayah": 34
      },
      {
        "surah": 77,
        "ayah": 35
      },
      {
        "surah": 77,
        "ayah": 36
      },
      {
        "surah": 77,
        "ayah": 37
      },
      {
        "surah": 77,
        "ayah": 38
      },
      {
        "surah": 77,
        "ayah": 39
      },
      {
        "surah": 77,
        "ayah": 40
      },
      {
        "surah": 77,
        "ayah": 41
      },
      {
        "surah": 77,
        "ayah": 42
      },
      {
        "surah": 77,
        "ayah": 43
      },
      {
        "surah": 77,
        "ayah": 44
      },
      {
        "surah": 77,
        "ayah": 45
      },
      {
        "surah": 77,
        "ayah": 46
      },
      {
        "surah": 77,
        "ayah": 47
      },
      {
        "surah": 77,
        "ayah": 48
      },
      {
        "surah": 77,
        "ayah": 49
      },
      {
        "surah": 77,
        "ayah": 50
      }
    ]
  },
  {
    "page": 582,
    "juz": 30,
    "hizb": 59,
    "rub": 233,
    "surahs": [
      78
    ],
    "startSurah": 78,
    "startAyah": 1,
    "endSurah": 78,
    "endAyah": 30,
    "verses": [
      {
        "surah": 78,
        "ayah": 1
      },
      {
        "surah": 78,
        "ayah": 2
      },
      {
        "surah": 78,
        "ayah": 3
      },
      {
        "surah": 78,
        "ayah": 4
      },
      {
        "surah": 78,
        "ayah": 5
      },
      {
        "surah": 78,
        "ayah": 6
      },
      {
        "surah": 78,
        "ayah": 7
      },
      {
        "surah": 78,
        "ayah": 8
      },
      {
        "surah": 78,
        "ayah": 9
      },
      {
        "surah": 78,
        "ayah": 10
      },
      {
        "surah": 78,
        "ayah": 11
      },
      {
        "surah": 78,
        "ayah": 12
      },
      {
        "surah": 78,
        "ayah": 13
      },
      {
        "surah": 78,
        "ayah": 14
      },
      {
        "surah": 78,
        "ayah": 15
      },
      {
        "surah": 78,
        "ayah": 16
      },
      {
        "surah": 78,
        "ayah": 17
      },
      {
        "surah": 78,
        "ayah": 18
      },
      {
        "surah": 78,
        "ayah": 19
      },
      {
        "surah": 78,
        "ayah": 20
      },
      {
        "surah": 78,
        "ayah": 21
      },
      {
        "surah": 78,
        "ayah": 22
      },
      {
        "surah": 78,
        "ayah": 23
      },
      {
        "surah": 78,
        "ayah": 24
      },
      {
        "surah": 78,
        "ayah": 25
      },
      {
        "surah": 78,
        "ayah": 26
      },
      {
        "surah": 78,
        "ayah": 27
      },
      {
        "surah": 78,
        "ayah": 28
      },
      {
        "surah": 78,
        "ayah": 29
      },
      {
        "surah": 78,
        "ayah": 30
      }
    ]
  },
  {
    "page": 583,
    "juz": 30,
    "hizb": 59,
    "rub": 233,
    "surahs": [
      78,
      79
    ],
    "startSurah": 78,
    "startAyah": 31,
    "endSurah": 79,
    "endAyah": 15,
    "verses": [
      {
        "surah": 78,
        "ayah": 31
      },
      {
        "surah": 78,
        "ayah": 32
      },
      {
        "surah": 78,
        "ayah": 33
      },
      {
        "surah": 78,
        "ayah": 34
      },
      {
        "surah": 78,
        "ayah": 35
      },
      {
        "surah": 78,
        "ayah": 36
      },
      {
        "surah": 78,
        "ayah": 37
      },
      {
        "surah": 78,
        "ayah": 38
      },
      {
        "surah": 78,
        "ayah": 39
      },
      {
        "surah": 78,
        "ayah": 40
      },
      {
        "surah": 79,
        "ayah": 1
      },
      {
        "surah": 79,
        "ayah": 2
      },
      {
        "surah": 79,
        "ayah": 3
      },
      {
        "surah": 79,
        "ayah": 4
      },
      {
        "surah": 79,
        "ayah": 5
      },
      {
        "surah": 79,
        "ayah": 6
      },
      {
        "surah": 79,
        "ayah": 7
      },
      {
        "surah": 79,
        "ayah": 8
      },
      {
        "surah": 79,
        "ayah": 9
      },
      {
        "surah": 79,
        "ayah": 10
      },
      {
        "surah": 79,
        "ayah": 11
      },
      {
        "surah": 79,
        "ayah": 12
      },
      {
        "surah": 79,
        "ayah": 13
      },
      {
        "surah": 79,
        "ayah": 14
      },
      {
        "surah": 79,
        "ayah": 15
      }
    ]
  },
  {
    "page": 584,
    "juz": 30,
    "hizb": 59,
    "rub": 233,
    "surahs": [
      79
    ],
    "startSurah": 79,
    "startAyah": 16,
    "endSurah": 79,
    "endAyah": 46,
    "verses": [
      {
        "surah": 79,
        "ayah": 16
      },
      {
        "surah": 79,
        "ayah": 17
      },
      {
        "surah": 79,
        "ayah": 18
      },
      {
        "surah": 79,
        "ayah": 19
      },
      {
        "surah": 79,
        "ayah": 20
      },
      {
        "surah": 79,
        "ayah": 21
      },
      {
        "surah": 79,
        "ayah": 22
      },
      {
        "surah": 79,
        "ayah": 23
      },
      {
        "surah": 79,
        "ayah": 24
      },
      {
        "surah": 79,
        "ayah": 25
      },
      {
        "surah": 79,
        "ayah": 26
      },
      {
        "surah": 79,
        "ayah": 27
      },
      {
        "surah": 79,
        "ayah": 28
      },
      {
        "surah": 79,
        "ayah": 29
      },
      {
        "surah": 79,
        "ayah": 30
      },
      {
        "surah": 79,
        "ayah": 31
      },
      {
        "surah": 79,
        "ayah": 32
      },
      {
        "surah": 79,
        "ayah": 33
      },
      {
        "surah": 79,
        "ayah": 34
      },
      {
        "surah": 79,
        "ayah": 35
      },
      {
        "surah": 79,
        "ayah": 36
      },
      {
        "surah": 79,
        "ayah": 37
      },
      {
        "surah": 79,
        "ayah": 38
      },
      {
        "surah": 79,
        "ayah": 39
      },
      {
        "surah": 79,
        "ayah": 40
      },
      {
        "surah": 79,
        "ayah": 41
      },
      {
        "surah": 79,
        "ayah": 42
      },
      {
        "surah": 79,
        "ayah": 43
      },
      {
        "surah": 79,
        "ayah": 44
      },
      {
        "surah": 79,
        "ayah": 45
      },
      {
        "surah": 79,
        "ayah": 46
      }
    ]
  },
  {
    "page": 585,
    "juz": 30,
    "hizb": 59,
    "rub": 234,
    "surahs": [
      80
    ],
    "startSurah": 80,
    "startAyah": 1,
    "endSurah": 80,
    "endAyah": 42,
    "verses": [
      {
        "surah": 80,
        "ayah": 1
      },
      {
        "surah": 80,
        "ayah": 2
      },
      {
        "surah": 80,
        "ayah": 3
      },
      {
        "surah": 80,
        "ayah": 4
      },
      {
        "surah": 80,
        "ayah": 5
      },
      {
        "surah": 80,
        "ayah": 6
      },
      {
        "surah": 80,
        "ayah": 7
      },
      {
        "surah": 80,
        "ayah": 8
      },
      {
        "surah": 80,
        "ayah": 9
      },
      {
        "surah": 80,
        "ayah": 10
      },
      {
        "surah": 80,
        "ayah": 11
      },
      {
        "surah": 80,
        "ayah": 12
      },
      {
        "surah": 80,
        "ayah": 13
      },
      {
        "surah": 80,
        "ayah": 14
      },
      {
        "surah": 80,
        "ayah": 15
      },
      {
        "surah": 80,
        "ayah": 16
      },
      {
        "surah": 80,
        "ayah": 17
      },
      {
        "surah": 80,
        "ayah": 18
      },
      {
        "surah": 80,
        "ayah": 19
      },
      {
        "surah": 80,
        "ayah": 20
      },
      {
        "surah": 80,
        "ayah": 21
      },
      {
        "surah": 80,
        "ayah": 22
      },
      {
        "surah": 80,
        "ayah": 23
      },
      {
        "surah": 80,
        "ayah": 24
      },
      {
        "surah": 80,
        "ayah": 25
      },
      {
        "surah": 80,
        "ayah": 26
      },
      {
        "surah": 80,
        "ayah": 27
      },
      {
        "surah": 80,
        "ayah": 28
      },
      {
        "surah": 80,
        "ayah": 29
      },
      {
        "surah": 80,
        "ayah": 30
      },
      {
        "surah": 80,
        "ayah": 31
      },
      {
        "surah": 80,
        "ayah": 32
      },
      {
        "surah": 80,
        "ayah": 33
      },
      {
        "surah": 80,
        "ayah": 34
      },
      {
        "surah": 80,
        "ayah": 35
      },
      {
        "surah": 80,
        "ayah": 36
      },
      {
        "surah": 80,
        "ayah": 37
      },
      {
        "surah": 80,
        "ayah": 38
      },
      {
        "surah": 80,
        "ayah": 39
      },
      {
        "surah": 80,
        "ayah": 40
      },
      {
        "surah": 80,
        "ayah": 41
      },
      {
        "surah": 80,
        "ayah": 42
      }
    ]
  },
  {
    "page": 586,
    "juz": 30,
    "hizb": 59,
    "rub": 234,
    "surahs": [
      81
    ],
    "startSurah": 81,
    "startAyah": 1,
    "endSurah": 81,
    "endAyah": 29,
    "verses": [
      {
        "surah": 81,
        "ayah": 1
      },
      {
        "surah": 81,
        "ayah": 2
      },
      {
        "surah": 81,
        "ayah": 3
      },
      {
        "surah": 81,
        "ayah": 4
      },
      {
        "surah": 81,
        "ayah": 5
      },
      {
        "surah": 81,
        "ayah": 6
      },
      {
        "surah": 81,
        "ayah": 7
      },
      {
        "surah": 81,
        "ayah": 8
      },
      {
        "surah": 81,
        "ayah": 9
      },
      {
        "surah": 81,
        "ayah": 10
      },
      {
        "surah": 81,
        "ayah": 11
      },
      {
        "surah": 81,
        "ayah": 12
      },
      {
        "surah": 81,
        "ayah": 13
      },
      {
        "surah": 81,
        "ayah": 14
      },
      {
        "surah": 81,
        "ayah": 15
      },
      {
        "surah": 81,
        "ayah": 16
      },
      {
        "surah": 81,
        "ayah": 17
      },
      {
        "surah": 81,
        "ayah": 18
      },
      {
        "surah": 81,
        "ayah": 19
      },
      {
        "surah": 81,
        "ayah": 20
      },
      {
        "surah": 81,
        "ayah": 21
      },
      {
        "surah": 81,
        "ayah": 22
      },
      {
        "surah": 81,
        "ayah": 23
      },
      {
        "surah": 81,
        "ayah": 24
      },
      {
        "surah": 81,
        "ayah": 25
      },
      {
        "surah": 81,
        "ayah": 26
      },
      {
        "surah": 81,
        "ayah": 27
      },
      {
        "surah": 81,
        "ayah": 28
      },
      {
        "surah": 81,
        "ayah": 29
      }
    ]
  },
  {
    "page": 587,
    "juz": 30,
    "hizb": 59,
    "rub": 235,
    "surahs": [
      82,
      83
    ],
    "startSurah": 82,
    "startAyah": 1,
    "endSurah": 83,
    "endAyah": 6,
    "verses": [
      {
        "surah": 82,
        "ayah": 1
      },
      {
        "surah": 82,
        "ayah": 2
      },
      {
        "surah": 82,
        "ayah": 3
      },
      {
        "surah": 82,
        "ayah": 4
      },
      {
        "surah": 82,
        "ayah": 5
      },
      {
        "surah": 82,
        "ayah": 6
      },
      {
        "surah": 82,
        "ayah": 7
      },
      {
        "surah": 82,
        "ayah": 8
      },
      {
        "surah": 82,
        "ayah": 9
      },
      {
        "surah": 82,
        "ayah": 10
      },
      {
        "surah": 82,
        "ayah": 11
      },
      {
        "surah": 82,
        "ayah": 12
      },
      {
        "surah": 82,
        "ayah": 13
      },
      {
        "surah": 82,
        "ayah": 14
      },
      {
        "surah": 82,
        "ayah": 15
      },
      {
        "surah": 82,
        "ayah": 16
      },
      {
        "surah": 82,
        "ayah": 17
      },
      {
        "surah": 82,
        "ayah": 18
      },
      {
        "surah": 82,
        "ayah": 19
      },
      {
        "surah": 83,
        "ayah": 1
      },
      {
        "surah": 83,
        "ayah": 2
      },
      {
        "surah": 83,
        "ayah": 3
      },
      {
        "surah": 83,
        "ayah": 4
      },
      {
        "surah": 83,
        "ayah": 5
      },
      {
        "surah": 83,
        "ayah": 6
      }
    ]
  },
  {
    "page": 588,
    "juz": 30,
    "hizb": 59,
    "rub": 235,
    "surahs": [
      83
    ],
    "startSurah": 83,
    "startAyah": 7,
    "endSurah": 83,
    "endAyah": 34,
    "verses": [
      {
        "surah": 83,
        "ayah": 7
      },
      {
        "surah": 83,
        "ayah": 8
      },
      {
        "surah": 83,
        "ayah": 9
      },
      {
        "surah": 83,
        "ayah": 10
      },
      {
        "surah": 83,
        "ayah": 11
      },
      {
        "surah": 83,
        "ayah": 12
      },
      {
        "surah": 83,
        "ayah": 13
      },
      {
        "surah": 83,
        "ayah": 14
      },
      {
        "surah": 83,
        "ayah": 15
      },
      {
        "surah": 83,
        "ayah": 16
      },
      {
        "surah": 83,
        "ayah": 17
      },
      {
        "surah": 83,
        "ayah": 18
      },
      {
        "surah": 83,
        "ayah": 19
      },
      {
        "surah": 83,
        "ayah": 20
      },
      {
        "surah": 83,
        "ayah": 21
      },
      {
        "surah": 83,
        "ayah": 22
      },
      {
        "surah": 83,
        "ayah": 23
      },
      {
        "surah": 83,
        "ayah": 24
      },
      {
        "surah": 83,
        "ayah": 25
      },
      {
        "surah": 83,
        "ayah": 26
      },
      {
        "surah": 83,
        "ayah": 27
      },
      {
        "surah": 83,
        "ayah": 28
      },
      {
        "surah": 83,
        "ayah": 29
      },
      {
        "surah": 83,
        "ayah": 30
      },
      {
        "surah": 83,
        "ayah": 31
      },
      {
        "surah": 83,
        "ayah": 32
      },
      {
        "surah": 83,
        "ayah": 33
      },
      {
        "surah": 83,
        "ayah": 34
      }
    ]
  },
  {
    "page": 589,
    "juz": 30,
    "hizb": 59,
    "rub": 235,
    "surahs": [
      83,
      84
    ],
    "startSurah": 83,
    "startAyah": 35,
    "endSurah": 84,
    "endAyah": 25,
    "verses": [
      {
        "surah": 83,
        "ayah": 35
      },
      {
        "surah": 83,
        "ayah": 36
      },
      {
        "surah": 84,
        "ayah": 1
      },
      {
        "surah": 84,
        "ayah": 2
      },
      {
        "surah": 84,
        "ayah": 3
      },
      {
        "surah": 84,
        "ayah": 4
      },
      {
        "surah": 84,
        "ayah": 5
      },
      {
        "surah": 84,
        "ayah": 6
      },
      {
        "surah": 84,
        "ayah": 7
      },
      {
        "surah": 84,
        "ayah": 8
      },
      {
        "surah": 84,
        "ayah": 9
      },
      {
        "surah": 84,
        "ayah": 10
      },
      {
        "surah": 84,
        "ayah": 11
      },
      {
        "surah": 84,
        "ayah": 12
      },
      {
        "surah": 84,
        "ayah": 13
      },
      {
        "surah": 84,
        "ayah": 14
      },
      {
        "surah": 84,
        "ayah": 15
      },
      {
        "surah": 84,
        "ayah": 16
      },
      {
        "surah": 84,
        "ayah": 17
      },
      {
        "surah": 84,
        "ayah": 18
      },
      {
        "surah": 84,
        "ayah": 19
      },
      {
        "surah": 84,
        "ayah": 20
      },
      {
        "surah": 84,
        "ayah": 21
      },
      {
        "surah": 84,
        "ayah": 22
      },
      {
        "surah": 84,
        "ayah": 23
      },
      {
        "surah": 84,
        "ayah": 24
      },
      {
        "surah": 84,
        "ayah": 25
      }
    ]
  },
  {
    "page": 590,
    "juz": 30,
    "hizb": 59,
    "rub": 236,
    "surahs": [
      85
    ],
    "startSurah": 85,
    "startAyah": 1,
    "endSurah": 85,
    "endAyah": 22,
    "verses": [
      {
        "surah": 85,
        "ayah": 1
      },
      {
        "surah": 85,
        "ayah": 2
      },
      {
        "surah": 85,
        "ayah": 3
      },
      {
        "surah": 85,
        "ayah": 4
      },
      {
        "surah": 85,
        "ayah": 5
      },
      {
        "surah": 85,
        "ayah": 6
      },
      {
        "surah": 85,
        "ayah": 7
      },
      {
        "surah": 85,
        "ayah": 8
      },
      {
        "surah": 85,
        "ayah": 9
      },
      {
        "surah": 85,
        "ayah": 10
      },
      {
        "surah": 85,
        "ayah": 11
      },
      {
        "surah": 85,
        "ayah": 12
      },
      {
        "surah": 85,
        "ayah": 13
      },
      {
        "surah": 85,
        "ayah": 14
      },
      {
        "surah": 85,
        "ayah": 15
      },
      {
        "surah": 85,
        "ayah": 16
      },
      {
        "surah": 85,
        "ayah": 17
      },
      {
        "surah": 85,
        "ayah": 18
      },
      {
        "surah": 85,
        "ayah": 19
      },
      {
        "surah": 85,
        "ayah": 20
      },
      {
        "surah": 85,
        "ayah": 21
      },
      {
        "surah": 85,
        "ayah": 22
      }
    ]
  },
  {
    "page": 591,
    "juz": 30,
    "hizb": 59,
    "rub": 236,
    "surahs": [
      86,
      87
    ],
    "startSurah": 86,
    "startAyah": 1,
    "endSurah": 87,
    "endAyah": 15,
    "verses": [
      {
        "surah": 86,
        "ayah": 1
      },
      {
        "surah": 86,
        "ayah": 2
      },
      {
        "surah": 86,
        "ayah": 3
      },
      {
        "surah": 86,
        "ayah": 4
      },
      {
        "surah": 86,
        "ayah": 5
      },
      {
        "surah": 86,
        "ayah": 6
      },
      {
        "surah": 86,
        "ayah": 7
      },
      {
        "surah": 86,
        "ayah": 8
      },
      {
        "surah": 86,
        "ayah": 9
      },
      {
        "surah": 86,
        "ayah": 10
      },
      {
        "surah": 86,
        "ayah": 11
      },
      {
        "surah": 86,
        "ayah": 12
      },
      {
        "surah": 86,
        "ayah": 13
      },
      {
        "surah": 86,
        "ayah": 14
      },
      {
        "surah": 86,
        "ayah": 15
      },
      {
        "surah": 86,
        "ayah": 16
      },
      {
        "surah": 86,
        "ayah": 17
      },
      {
        "surah": 87,
        "ayah": 1
      },
      {
        "surah": 87,
        "ayah": 2
      },
      {
        "surah": 87,
        "ayah": 3
      },
      {
        "surah": 87,
        "ayah": 4
      },
      {
        "surah": 87,
        "ayah": 5
      },
      {
        "surah": 87,
        "ayah": 6
      },
      {
        "surah": 87,
        "ayah": 7
      },
      {
        "surah": 87,
        "ayah": 8
      },
      {
        "surah": 87,
        "ayah": 9
      },
      {
        "surah": 87,
        "ayah": 10
      },
      {
        "surah": 87,
        "ayah": 11
      },
      {
        "surah": 87,
        "ayah": 12
      },
      {
        "surah": 87,
        "ayah": 13
      },
      {
        "surah": 87,
        "ayah": 14
      },
      {
        "surah": 87,
        "ayah": 15
      }
    ]
  },
  {
    "page": 592,
    "juz": 30,
    "hizb": 60,
    "rub": 237,
    "surahs": [
      87,
      88
    ],
    "startSurah": 87,
    "startAyah": 16,
    "endSurah": 88,
    "endAyah": 26,
    "verses": [
      {
        "surah": 87,
        "ayah": 16
      },
      {
        "surah": 87,
        "ayah": 17
      },
      {
        "surah": 87,
        "ayah": 18
      },
      {
        "surah": 87,
        "ayah": 19
      },
      {
        "surah": 88,
        "ayah": 1
      },
      {
        "surah": 88,
        "ayah": 2
      },
      {
        "surah": 88,
        "ayah": 3
      },
      {
        "surah": 88,
        "ayah": 4
      },
      {
        "surah": 88,
        "ayah": 5
      },
      {
        "surah": 88,
        "ayah": 6
      },
      {
        "surah": 88,
        "ayah": 7
      },
      {
        "surah": 88,
        "ayah": 8
      },
      {
        "surah": 88,
        "ayah": 9
      },
      {
        "surah": 88,
        "ayah": 10
      },
      {
        "surah": 88,
        "ayah": 11
      },
      {
        "surah": 88,
        "ayah": 12
      },
      {
        "surah": 88,
        "ayah": 13
      },
      {
        "surah": 88,
        "ayah": 14
      },
      {
        "surah": 88,
        "ayah": 15
      },
      {
        "surah": 88,
        "ayah": 16
      },
      {
        "surah": 88,
        "ayah": 17
      },
      {
        "surah": 88,
        "ayah": 18
      },
      {
        "surah": 88,
        "ayah": 19
      },
      {
        "surah": 88,
        "ayah": 20
      },
      {
        "surah": 88,
        "ayah": 21
      },
      {
        "surah": 88,
        "ayah": 22
      },
      {
        "surah": 88,
        "ayah": 23
      },
      {
        "surah": 88,
        "ayah": 24
      },
      {
        "surah": 88,
        "ayah": 25
      },
      {
        "surah": 88,
        "ayah": 26
      }
    ]
  },
  {
    "page": 593,
    "juz": 30,
    "hizb": 60,
    "rub": 237,
    "surahs": [
      89
    ],
    "startSurah": 89,
    "startAyah": 1,
    "endSurah": 89,
    "endAyah": 23,
    "verses": [
      {
        "surah": 89,
        "ayah": 1
      },
      {
        "surah": 89,
        "ayah": 2
      },
      {
        "surah": 89,
        "ayah": 3
      },
      {
        "surah": 89,
        "ayah": 4
      },
      {
        "surah": 89,
        "ayah": 5
      },
      {
        "surah": 89,
        "ayah": 6
      },
      {
        "surah": 89,
        "ayah": 7
      },
      {
        "surah": 89,
        "ayah": 8
      },
      {
        "surah": 89,
        "ayah": 9
      },
      {
        "surah": 89,
        "ayah": 10
      },
      {
        "surah": 89,
        "ayah": 11
      },
      {
        "surah": 89,
        "ayah": 12
      },
      {
        "surah": 89,
        "ayah": 13
      },
      {
        "surah": 89,
        "ayah": 14
      },
      {
        "surah": 89,
        "ayah": 15
      },
      {
        "surah": 89,
        "ayah": 16
      },
      {
        "surah": 89,
        "ayah": 17
      },
      {
        "surah": 89,
        "ayah": 18
      },
      {
        "surah": 89,
        "ayah": 19
      },
      {
        "surah": 89,
        "ayah": 20
      },
      {
        "surah": 89,
        "ayah": 21
      },
      {
        "surah": 89,
        "ayah": 22
      },
      {
        "surah": 89,
        "ayah": 23
      }
    ]
  },
  {
    "page": 594,
    "juz": 30,
    "hizb": 60,
    "rub": 237,
    "surahs": [
      89,
      90
    ],
    "startSurah": 89,
    "startAyah": 24,
    "endSurah": 90,
    "endAyah": 20,
    "verses": [
      {
        "surah": 89,
        "ayah": 24
      },
      {
        "surah": 89,
        "ayah": 25
      },
      {
        "surah": 89,
        "ayah": 26
      },
      {
        "surah": 89,
        "ayah": 27
      },
      {
        "surah": 89,
        "ayah": 28
      },
      {
        "surah": 89,
        "ayah": 29
      },
      {
        "surah": 89,
        "ayah": 30
      },
      {
        "surah": 90,
        "ayah": 1
      },
      {
        "surah": 90,
        "ayah": 2
      },
      {
        "surah": 90,
        "ayah": 3
      },
      {
        "surah": 90,
        "ayah": 4
      },
      {
        "surah": 90,
        "ayah": 5
      },
      {
        "surah": 90,
        "ayah": 6
      },
      {
        "surah": 90,
        "ayah": 7
      },
      {
        "surah": 90,
        "ayah": 8
      },
      {
        "surah": 90,
        "ayah": 9
      },
      {
        "surah": 90,
        "ayah": 10
      },
      {
        "surah": 90,
        "ayah": 11
      },
      {
        "surah": 90,
        "ayah": 12
      },
      {
        "surah": 90,
        "ayah": 13
      },
      {
        "surah": 90,
        "ayah": 14
      },
      {
        "surah": 90,
        "ayah": 15
      },
      {
        "surah": 90,
        "ayah": 16
      },
      {
        "surah": 90,
        "ayah": 17
      },
      {
        "surah": 90,
        "ayah": 18
      },
      {
        "surah": 90,
        "ayah": 19
      },
      {
        "surah": 90,
        "ayah": 20
      }
    ]
  },
  {
    "page": 595,
    "juz": 30,
    "hizb": 60,
    "rub": 238,
    "surahs": [
      91,
      92
    ],
    "startSurah": 91,
    "startAyah": 1,
    "endSurah": 92,
    "endAyah": 14,
    "verses": [
      {
        "surah": 91,
        "ayah": 1
      },
      {
        "surah": 91,
        "ayah": 2
      },
      {
        "surah": 91,
        "ayah": 3
      },
      {
        "surah": 91,
        "ayah": 4
      },
      {
        "surah": 91,
        "ayah": 5
      },
      {
        "surah": 91,
        "ayah": 6
      },
      {
        "surah": 91,
        "ayah": 7
      },
      {
        "surah": 91,
        "ayah": 8
      },
      {
        "surah": 91,
        "ayah": 9
      },
      {
        "surah": 91,
        "ayah": 10
      },
      {
        "surah": 91,
        "ayah": 11
      },
      {
        "surah": 91,
        "ayah": 12
      },
      {
        "surah": 91,
        "ayah": 13
      },
      {
        "surah": 91,
        "ayah": 14
      },
      {
        "surah": 91,
        "ayah": 15
      },
      {
        "surah": 92,
        "ayah": 1
      },
      {
        "surah": 92,
        "ayah": 2
      },
      {
        "surah": 92,
        "ayah": 3
      },
      {
        "surah": 92,
        "ayah": 4
      },
      {
        "surah": 92,
        "ayah": 5
      },
      {
        "surah": 92,
        "ayah": 6
      },
      {
        "surah": 92,
        "ayah": 7
      },
      {
        "surah": 92,
        "ayah": 8
      },
      {
        "surah": 92,
        "ayah": 9
      },
      {
        "surah": 92,
        "ayah": 10
      },
      {
        "surah": 92,
        "ayah": 11
      },
      {
        "surah": 92,
        "ayah": 12
      },
      {
        "surah": 92,
        "ayah": 13
      },
      {
        "surah": 92,
        "ayah": 14
      }
    ]
  },
  {
    "page": 596,
    "juz": 30,
    "hizb": 60,
    "rub": 238,
    "surahs": [
      92,
      93,
      94
    ],
    "startSurah": 92,
    "startAyah": 15,
    "endSurah": 94,
    "endAyah": 8,
    "verses": [
      {
        "surah": 92,
        "ayah": 15
      },
      {
        "surah": 92,
        "ayah": 16
      },
      {
        "surah": 92,
        "ayah": 17
      },
      {
        "surah": 92,
        "ayah": 18
      },
      {
        "surah": 92,
        "ayah": 19
      },
      {
        "surah": 92,
        "ayah": 20
      },
      {
        "surah": 92,
        "ayah": 21
      },
      {
        "surah": 93,
        "ayah": 1
      },
      {
        "surah": 93,
        "ayah": 2
      },
      {
        "surah": 93,
        "ayah": 3
      },
      {
        "surah": 93,
        "ayah": 4
      },
      {
        "surah": 93,
        "ayah": 5
      },
      {
        "surah": 93,
        "ayah": 6
      },
      {
        "surah": 93,
        "ayah": 7
      },
      {
        "surah": 93,
        "ayah": 8
      },
      {
        "surah": 93,
        "ayah": 9
      },
      {
        "surah": 93,
        "ayah": 10
      },
      {
        "surah": 93,
        "ayah": 11
      },
      {
        "surah": 94,
        "ayah": 1
      },
      {
        "surah": 94,
        "ayah": 2
      },
      {
        "surah": 94,
        "ayah": 3
      },
      {
        "surah": 94,
        "ayah": 4
      },
      {
        "surah": 94,
        "ayah": 5
      },
      {
        "surah": 94,
        "ayah": 6
      },
      {
        "surah": 94,
        "ayah": 7
      },
      {
        "surah": 94,
        "ayah": 8
      }
    ]
  },
  {
    "page": 597,
    "juz": 30,
    "hizb": 60,
    "rub": 239,
    "surahs": [
      95,
      96
    ],
    "startSurah": 95,
    "startAyah": 1,
    "endSurah": 96,
    "endAyah": 19,
    "verses": [
      {
        "surah": 95,
        "ayah": 1
      },
      {
        "surah": 95,
        "ayah": 2
      },
      {
        "surah": 95,
        "ayah": 3
      },
      {
        "surah": 95,
        "ayah": 4
      },
      {
        "surah": 95,
        "ayah": 5
      },
      {
        "surah": 95,
        "ayah": 6
      },
      {
        "surah": 95,
        "ayah": 7
      },
      {
        "surah": 95,
        "ayah": 8
      },
      {
        "surah": 96,
        "ayah": 1
      },
      {
        "surah": 96,
        "ayah": 2
      },
      {
        "surah": 96,
        "ayah": 3
      },
      {
        "surah": 96,
        "ayah": 4
      },
      {
        "surah": 96,
        "ayah": 5
      },
      {
        "surah": 96,
        "ayah": 6
      },
      {
        "surah": 96,
        "ayah": 7
      },
      {
        "surah": 96,
        "ayah": 8
      },
      {
        "surah": 96,
        "ayah": 9
      },
      {
        "surah": 96,
        "ayah": 10
      },
      {
        "surah": 96,
        "ayah": 11
      },
      {
        "surah": 96,
        "ayah": 12
      },
      {
        "surah": 96,
        "ayah": 13
      },
      {
        "surah": 96,
        "ayah": 14
      },
      {
        "surah": 96,
        "ayah": 15
      },
      {
        "surah": 96,
        "ayah": 16
      },
      {
        "surah": 96,
        "ayah": 17
      },
      {
        "surah": 96,
        "ayah": 18
      },
      {
        "surah": 96,
        "ayah": 19
      }
    ]
  },
  {
    "page": 598,
    "juz": 30,
    "hizb": 60,
    "rub": 239,
    "surahs": [
      97,
      98
    ],
    "startSurah": 97,
    "startAyah": 1,
    "endSurah": 98,
    "endAyah": 7,
    "verses": [
      {
        "surah": 97,
        "ayah": 1
      },
      {
        "surah": 97,
        "ayah": 2
      },
      {
        "surah": 97,
        "ayah": 3
      },
      {
        "surah": 97,
        "ayah": 4
      },
      {
        "surah": 97,
        "ayah": 5
      },
      {
        "surah": 98,
        "ayah": 1
      },
      {
        "surah": 98,
        "ayah": 2
      },
      {
        "surah": 98,
        "ayah": 3
      },
      {
        "surah": 98,
        "ayah": 4
      },
      {
        "surah": 98,
        "ayah": 5
      },
      {
        "surah": 98,
        "ayah": 6
      },
      {
        "surah": 98,
        "ayah": 7
      }
    ]
  },
  {
    "page": 599,
    "juz": 30,
    "hizb": 60,
    "rub": 239,
    "surahs": [
      98,
      99,
      100
    ],
    "startSurah": 98,
    "startAyah": 8,
    "endSurah": 100,
    "endAyah": 9,
    "verses": [
      {
        "surah": 98,
        "ayah": 8
      },
      {
        "surah": 99,
        "ayah": 1
      },
      {
        "surah": 99,
        "ayah": 2
      },
      {
        "surah": 99,
        "ayah": 3
      },
      {
        "surah": 99,
        "ayah": 4
      },
      {
        "surah": 99,
        "ayah": 5
      },
      {
        "surah": 99,
        "ayah": 6
      },
      {
        "surah": 99,
        "ayah": 7
      },
      {
        "surah": 99,
        "ayah": 8
      },
      {
        "surah": 100,
        "ayah": 1
      },
      {
        "surah": 100,
        "ayah": 2
      },
      {
        "surah": 100,
        "ayah": 3
      },
      {
        "surah": 100,
        "ayah": 4
      },
      {
        "surah": 100,
        "ayah": 5
      },
      {
        "surah": 100,
        "ayah": 6
      },
      {
        "surah": 100,
        "ayah": 7
      },
      {
        "surah": 100,
        "ayah": 8
      },
      {
        "surah": 100,
        "ayah": 9
      }
    ]
  },
  {
    "page": 600,
    "juz": 30,
    "hizb": 60,
    "rub": 240,
    "surahs": [
      100,
      101,
      102
    ],
    "startSurah": 100,
    "startAyah": 10,
    "endSurah": 102,
    "endAyah": 8,
    "verses": [
      {
        "surah": 100,
        "ayah": 10
      },
      {
        "surah": 100,
        "ayah": 11
      },
      {
        "surah": 101,
        "ayah": 1
      },
      {
        "surah": 101,
        "ayah": 2
      },
      {
        "surah": 101,
        "ayah": 3
      },
      {
        "surah": 101,
        "ayah": 4
      },
      {
        "surah": 101,
        "ayah": 5
      },
      {
        "surah": 101,
        "ayah": 6
      },
      {
        "surah": 101,
        "ayah": 7
      },
      {
        "surah": 101,
        "ayah": 8
      },
      {
        "surah": 101,
        "ayah": 9
      },
      {
        "surah": 101,
        "ayah": 10
      },
      {
        "surah": 101,
        "ayah": 11
      },
      {
        "surah": 102,
        "ayah": 1
      },
      {
        "surah": 102,
        "ayah": 2
      },
      {
        "surah": 102,
        "ayah": 3
      },
      {
        "surah": 102,
        "ayah": 4
      },
      {
        "surah": 102,
        "ayah": 5
      },
      {
        "surah": 102,
        "ayah": 6
      },
      {
        "surah": 102,
        "ayah": 7
      },
      {
        "surah": 102,
        "ayah": 8
      }
    ]
  },
  {
    "page": 601,
    "juz": 30,
    "hizb": 60,
    "rub": 240,
    "surahs": [
      103,
      104,
      105
    ],
    "startSurah": 103,
    "startAyah": 1,
    "endSurah": 105,
    "endAyah": 5,
    "verses": [
      {
        "surah": 103,
        "ayah": 1
      },
      {
        "surah": 103,
        "ayah": 2
      },
      {
        "surah": 103,
        "ayah": 3
      },
      {
        "surah": 104,
        "ayah": 1
      },
      {
        "surah": 104,
        "ayah": 2
      },
      {
        "surah": 104,
        "ayah": 3
      },
      {
        "surah": 104,
        "ayah": 4
      },
      {
        "surah": 104,
        "ayah": 5
      },
      {
        "surah": 104,
        "ayah": 6
      },
      {
        "surah": 104,
        "ayah": 7
      },
      {
        "surah": 104,
        "ayah": 8
      },
      {
        "surah": 104,
        "ayah": 9
      },
      {
        "surah": 105,
        "ayah": 1
      },
      {
        "surah": 105,
        "ayah": 2
      },
      {
        "surah": 105,
        "ayah": 3
      },
      {
        "surah": 105,
        "ayah": 4
      },
      {
        "surah": 105,
        "ayah": 5
      }
    ]
  },
  {
    "page": 602,
    "juz": 30,
    "hizb": 60,
    "rub": 240,
    "surahs": [
      106,
      107,
      108
    ],
    "startSurah": 106,
    "startAyah": 1,
    "endSurah": 108,
    "endAyah": 3,
    "verses": [
      {
        "surah": 106,
        "ayah": 1
      },
      {
        "surah": 106,
        "ayah": 2
      },
      {
        "surah": 106,
        "ayah": 3
      },
      {
        "surah": 106,
        "ayah": 4
      },
      {
        "surah": 107,
        "ayah": 1
      },
      {
        "surah": 107,
        "ayah": 2
      },
      {
        "surah": 107,
        "ayah": 3
      },
      {
        "surah": 107,
        "ayah": 4
      },
      {
        "surah": 107,
        "ayah": 5
      },
      {
        "surah": 107,
        "ayah": 6
      },
      {
        "surah": 107,
        "ayah": 7
      },
      {
        "surah": 108,
        "ayah": 1
      },
      {
        "surah": 108,
        "ayah": 2
      },
      {
        "surah": 108,
        "ayah": 3
      }
    ]
  },
  {
    "page": 603,
    "juz": 30,
    "hizb": 60,
    "rub": 240,
    "surahs": [
      109,
      110,
      111
    ],
    "startSurah": 109,
    "startAyah": 1,
    "endSurah": 111,
    "endAyah": 5,
    "verses": [
      {
        "surah": 109,
        "ayah": 1
      },
      {
        "surah": 109,
        "ayah": 2
      },
      {
        "surah": 109,
        "ayah": 3
      },
      {
        "surah": 109,
        "ayah": 4
      },
      {
        "surah": 109,
        "ayah": 5
      },
      {
        "surah": 109,
        "ayah": 6
      },
      {
        "surah": 110,
        "ayah": 1
      },
      {
        "surah": 110,
        "ayah": 2
      },
      {
        "surah": 110,
        "ayah": 3
      },
      {
        "surah": 111,
        "ayah": 1
      },
      {
        "surah": 111,
        "ayah": 2
      },
      {
        "surah": 111,
        "ayah": 3
      },
      {
        "surah": 111,
        "ayah": 4
      },
      {
        "surah": 111,
        "ayah": 5
      }
    ]
  },
  {
    "page": 604,
    "juz": 30,
    "hizb": 60,
    "rub": 240,
    "surahs": [
      112,
      113,
      114
    ],
    "startSurah": 112,
    "startAyah": 1,
    "endSurah": 114,
    "endAyah": 6,
    "verses": [
      {
        "surah": 112,
        "ayah": 1
      },
      {
        "surah": 112,
        "ayah": 2
      },
      {
        "surah": 112,
        "ayah": 3
      },
      {
        "surah": 112,
        "ayah": 4
      },
      {
        "surah": 113,
        "ayah": 1
      },
      {
        "surah": 113,
        "ayah": 2
      },
      {
        "surah": 113,
        "ayah": 3
      },
      {
        "surah": 113,
        "ayah": 4
      },
      {
        "surah": 113,
        "ayah": 5
      },
      {
        "surah": 114,
        "ayah": 1
      },
      {
        "surah": 114,
        "ayah": 2
      },
      {
        "surah": 114,
        "ayah": 3
      },
      {
        "surah": 114,
        "ayah": 4
      },
      {
        "surah": 114,
        "ayah": 5
      },
      {
        "surah": 114,
        "ayah": 6
      }
    ]
  }
];

export function getMushafPageMeta(pageNumber: number): MushafPageMeta {
  const normalized = Math.max(1, Math.min(604, pageNumber));
  return MUSHAF_604_PAGES[normalized - 1] ?? MUSHAF_604_PAGES[0]!;
}

export function findMushafPageForAyah(surahNumber: number, ayahNumber: number): number {
  for (const p of MUSHAF_604_PAGES) {
    const hasVerse = p.verses.some(v => v.surah === surahNumber && v.ayah === ayahNumber);
    if (hasVerse) return p.page;
  }
  return 1;
}

export function findFirstPageOfSurah(surahNumber: number): number {
  for (const p of MUSHAF_604_PAGES) {
    if (p.surahs.includes(surahNumber)) {
      const match = p.verses.find(v => v.surah === surahNumber && v.ayah === 1);
      if (match) return p.page;
    }
  }
  return 1;
}

export function findFirstPageOfJuz(juzNumber: number): number {
  const match = MUSHAF_604_PAGES.find(p => p.juz === juzNumber);
  return match ? match.page : 1;
}
