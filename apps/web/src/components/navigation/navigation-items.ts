export interface NavigationItem {
  title: string;
  titleUrdu: string;
  href: string;
  icon: string;
}

// Pillar 1: Ibadah & Daily Rhythm (عبادت و معمولات)
export const ibadatItems: NavigationItem[] = [
  { title: 'Auqat-e-Namaz & Qibla', titleUrdu: 'نماز کے اوقات و قبلہ', href: '/prayer', icon: '🕋' },
  { title: 'Morning & Evening Adhkar', titleUrdu: 'صبح و شام کے اذکار', href: '/adhkar', icon: '🌅' },
  { title: 'Digital Masnoon Tasbih', titleUrdu: 'مسنون تسبیح کاؤنٹر', href: '/tasbih', icon: '📿' },
  { title: 'Hijri Calendar & Fasting', titleUrdu: 'ہجری کیلنڈر و روزے', href: '/calendar', icon: '🌙' },
  { title: 'Hajj & Umrah Pilgrimage Guide', titleUrdu: 'حج و عمرہ رہنمائی', href: '/hajj', icon: '✨' },
];

// Pillar 2: Quran & Sacred Knowledge (قرآن و علومِ سلف)
export const ilmItems: NavigationItem[] = [
  { title: 'Al-Quran Al-Kareem (114 Surahs)', titleUrdu: 'قرآن کریم (کنز الایمان)', href: '/quran', icon: '📖' },
  { title: 'Ayah Wisdom & Sunnah Cards Studio', titleUrdu: 'قرآنی حکمت و تدبر کارڈز', href: '/wisdom', icon: '✨' },
  { title: '106-Book Canonical Library', titleUrdu: 'کتب خانہ السواد الاعظم', href: '/library', icon: '📚' },
  { title: 'Living Sirah & Shama\'il', titleUrdu: 'سیرت النبی ﷺ و شمائل', href: '/sirah', icon: '🕊️' },
  { title: 'Human Voice Quran Audio (4 Qurra)', titleUrdu: 'تلاوت قرآن (۴ قراء)', href: '/audio', icon: '🎧' },
  { title: 'Tajweed & Makharij Audio', titleUrdu: 'تجوید و مخارج آڈیو', href: '/tajweed', icon: '🎙️' },
  { title: 'Classical Dars & Knowledge Vault', titleUrdu: 'خطبات و درس کا خزانہ', href: '/vault', icon: '🏛️' },
];

// Pillar 3: Family & Sisters Sanctuary (خاندان و گوشۂ نسواں)
export const familySistersItems: NavigationItem[] = [
  { title: 'The Sisters Sanctuary (Amal Nisa)', titleUrdu: 'گوشۂ خواتین و صحابیات', href: '/sisters', icon: '🌸' },
  { title: '20 Classical Women\'s Masterworks', titleUrdu: '۲۰ کتبِ نسواں (جنتی زیور وغیرہ)', href: '/sisters?tab=library', icon: '📖' },
  { title: '10 Noble Sahabiyyat Models', titleUrdu: '۱۰ جلیل القدر صحابیات', href: '/sisters?tab=sahabiyyat', icon: '🌺' },
  { title: 'Taharah & Hanafi Fiqh Guide', titleUrdu: 'احکامِ طہارت و حیض', href: '/sisters?tab=fiqh', icon: '⚖️' },
  { title: 'Motherhood & Family Duas', titleUrdu: 'ماؤں کی دعائیں و برکت', href: '/sisters?tab=duas', icon: '🤲' },
  { title: 'Family Deen OS & Child Tarbiyah', titleUrdu: 'فیملی سرکل و معمولات', href: '/family', icon: '👨‍👩‍👧‍👦' },
];

// Pillar 4: Fiqh, Miras & Suluk Journeys (احکام، میراث و سلوک)
export const ahkamItems: NavigationItem[] = [
  { title: 'Zakat & Gold Jewelry Calculator', titleUrdu: 'زکوٰۃ و نصاب کیلکولیٹر', href: '/calculator', icon: '💰' },
  { title: 'Miras (Fara\'id) Shares & PDF', titleUrdu: 'میراث و فرائض تقسیم', href: '/calculator', icon: '📜' },
  { title: 'Deen Decision Room (Mufti Packet)', titleUrdu: 'ڈیسیژن روم (مفتی پیکٹ)', href: '/decision-room', icon: '⚖️' },
  { title: '14-Day Structured Journeys (Suluk)', titleUrdu: 'منظم دینی سفر (سلوک)', href: '/journeys', icon: '🛤️' },
  { title: 'Niyyah Goals & Spiritual Baselines', titleUrdu: 'دینی اہداف و نیت', href: '/goals', icon: '🎯' },
  { title: 'Private Muhasabah Vault', titleUrdu: 'شام کا محاسبہ', href: '/reflections', icon: '📝' },
  { title: 'Deen Replay Annual Review', titleUrdu: 'دین ری پلے (سالانہ جائزہ)', href: '/replay', icon: '🔄' },
];

export const allApps: NavigationItem[] = [
  ...ibadatItems,
  ...ilmItems,
  ...familySistersItems,
  ...ahkamItems,
  { title: 'Canonical Evidence Explorer', titleUrdu: 'کتبِ معتبرہ سے تلاش و رہنمائی', href: '/ask', icon: '💬' },
  { title: 'Security & Trust Vault', titleUrdu: 'پرائیویسی و امانت سینٹر', href: '/privacy', icon: '🛡️' },
  { title: 'System Settings Control Center', titleUrdu: 'مرکزی ترتیبات', href: '/settings', icon: '⚙️' },
  { title: 'About & Methodology', titleUrdu: 'تعارف و منہج عمل', href: '/about', icon: '🕌' },
];
