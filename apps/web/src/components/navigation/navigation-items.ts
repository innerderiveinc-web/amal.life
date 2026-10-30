export interface NavigationItem {
  title: string;
  titleUrdu: string;
  titleArabic?: string;
  titleRoman?: string;
  href: string;
  icon: string;
}

// Pillar 1: Ibadah & Daily Rhythm (عبادت و معمولات)
export const ibadatItems: NavigationItem[] = [
  { title: 'Auqat-e-Namaz & Qibla', titleUrdu: 'نماز کے اوقات و قبلہ', titleArabic: 'مواقيت الصلاة والقبلة', titleRoman: 'Auqat-e-Namaz wa Qiblah', href: '/prayer', icon: '🕋' },
  { title: 'Morning & Evening Adhkar', titleUrdu: 'صبح و شام کے اذکار', titleArabic: 'أذكار الصباح والمساء', titleRoman: 'Subh wa Sham ke Adhkar', href: '/adhkar', icon: '🌅' },
  { title: 'Digital Masnoon Tasbih', titleUrdu: 'مسنون تسبیح کاؤنٹر', titleArabic: 'المسبحة الإلكترونية المسنونة', titleRoman: 'Masnoon Tasbih Counter', href: '/tasbih', icon: '📿' },
  { title: 'Hijri Calendar & Fasting', titleUrdu: 'ہجری کیلنڈر و روزے', titleArabic: 'التقويم الهجري وأيام الصيام', titleRoman: 'Hijri Calendar wa Rozey', href: '/calendar', icon: '🌙' },
  { title: 'Hajj & Umrah Pilgrimage Guide', titleUrdu: 'حج و عمرہ رہنمائی', titleArabic: 'دليل الحج والعمرة المعتمد', titleRoman: 'Hajj wa Umrah Rahnumai', href: '/hajj', icon: '✨' },
];

// Pillar 2: Quran & Sacred Knowledge (قرآن و علومِ سلف)
export const ilmItems: NavigationItem[] = [
  { title: 'Al-Quran Al-Kareem (114 Surahs)', titleUrdu: 'قرآن کریم (کنز الایمان)', titleArabic: 'القرآن الكريم (١١٤ سورة)', titleRoman: 'Quran Kareem (Kanz-ul-Iman)', href: '/quran', icon: '📖' },
  { title: 'Quran Audio Hub (4 Master Qurra)', titleUrdu: 'تلاوت قرآن (۴ قراء)', titleArabic: 'تلاوات القرآن (٤ قراء)', titleRoman: 'Tilawat-e-Quran (4 Qurra)', href: '/quran?tab=audio', icon: '🎧' },
  { title: 'Word-by-Word Tajweed & Makharij', titleUrdu: 'تجوید و مخارج آڈیو', titleArabic: 'أحكام التجويد والمخارج', titleRoman: 'Tajweed wa Makharij Audio', href: '/quran?tab=tajweed', icon: '🎙️' },
  { title: 'Ayah Wisdom & Sunnah Cards Studio', titleUrdu: 'قرآنی حکمت و تدبر کارڈز', titleArabic: 'بطاقات الحكمة والتدبر', titleRoman: 'Qurani Hikmat wa Tadabbur Cards', href: '/wisdom', icon: '✨' },
  { title: '106-Book Canonical Library', titleUrdu: 'کتب خانہ السواد الاعظم', titleArabic: 'المكتبة التراثية الجامعة', titleRoman: 'Kutub Khana Al-Sawad al-Azam', href: '/library', icon: '📚' },
  { title: 'Living Sirah & Shama\'il Audiobooks', titleUrdu: 'سیرت النبی ﷺ و شمائل آڈیو بکس', titleArabic: 'السيرة العطرة والشمائل المحمدية', titleRoman: 'Sirat-un-Nabi ﷺ wa Shamail Audio', href: '/audio?tab=SIRAH', icon: '🕊️' },
  { title: 'Classical Dars & Knowledge Vault', titleUrdu: 'خطبات و درس کا خزانہ', titleArabic: 'خزانة الدروس والخطب', titleRoman: 'Khutbat wa Dars ka Khazana', href: '/vault', icon: '🏛️' },
];

// Pillar 3: Family & Sisters Sanctuary (خاندان و گوشۂ نسواں)
export const familySistersItems: NavigationItem[] = [
  { title: 'The Sisters Sanctuary (Amal Nisa)', titleUrdu: 'گوشۂ خواتین و صحابیات', titleArabic: 'واحة المرأة المسلمة والصحابيات', titleRoman: 'Gosha-e-Khawateen wa Sahabiyyat', href: '/sisters', icon: '🌸' },
  { title: '20 Classical Women\'s Masterworks', titleUrdu: '۲۰ کتبِ نسواں (جنتی زیور وغیرہ)', titleArabic: '٢٠ كتاباً معتمداً في فقه المرأة', titleRoman: '20 Kutub-e-Niswan (Jannati Zewar)', href: '/sisters?tab=library', icon: '📖' },
  { title: '15 Noble Sahabiyyat & Paragons', titleUrdu: '۱۵ جلیل القدر صحابیات و امہات المؤمنین', titleArabic: '١٥ صحابية وقدوة من أمهات المؤمنين', titleRoman: '15 Sahabiyyat wa Ummahat-ul-Momineen', href: '/sisters?tab=sahabiyyat', icon: '🌺' },
  { title: 'Taharah & Hanafi Fiqh Guide', titleUrdu: 'احکامِ طہارت و حیض', titleArabic: 'أحكام الطهارة والحيض والنفاس', titleRoman: 'Ahkam-e-Taharah wa Haidh', href: '/sisters?tab=fiqh', icon: '⚖️' },
  { title: 'Motherhood & Family Duas', titleUrdu: 'ماؤں کی دعائیں و برکت', titleArabic: 'أدعية الأمهات والبركة الأسرية', titleRoman: 'Maaon ki Duayein wa Barkat', href: '/sisters?tab=duas', icon: '🤲' },
  { title: 'Family Deen OS & Child Tarbiyah', titleUrdu: 'فیملی سرکل و معمولات', titleArabic: 'نظام الأسرة وتربية الأبناء', titleRoman: 'Family Circle wa Ma\'moolat', href: '/family', icon: '👨‍👩‍👧‍👦' },
];

// Pillar 4: Fiqh, Miras & Suluk Journeys (احکام، میراث و سلوک)
export const ahkamItems: NavigationItem[] = [
  { title: 'Zakat & Gold Jewelry Calculator', titleUrdu: 'زکوٰۃ و نصاب کیلکولیٹر', titleArabic: 'حاسبة الزكاة والذهب والنصاب', titleRoman: 'Zakat wa Nisab Calculator', href: '/calculator?tab=zakat', icon: '💰' },
  { title: 'Miras (Fara\'id) Shares & PDF', titleUrdu: 'میراث و فرائض تقسیم', titleArabic: 'قسمة المواريث والفرائض الشرعية', titleRoman: 'Miras wa Faraiz Taqseem', href: '/calculator?tab=miras', icon: '📜' },
  { title: 'Qadha-e-Umri & Contemporary Fiqh', titleUrdu: 'قضائے عمری و جدید فقہی مسائل', titleArabic: 'قضاء الفوائت والفقه المعاصر', titleRoman: 'Qadha-e-Umri wa Fiqhi Masail', href: '/calculator?tab=qadha', icon: '⏳' },
  { title: 'Deen Decision Room (Mufti Packet)', titleUrdu: 'ڈیسیژن روم (مفتی پیکٹ)', titleArabic: 'غرفة القرارات الشرعية', titleRoman: 'Decision Room (Mufti Packet)', href: '/decision-room', icon: '⚖️' },
  { title: '14-Day Structured Journeys (Suluk)', titleUrdu: 'منظم دینی سفر (سلوک)', titleArabic: 'الرحلات الإيمانية والسلوك', titleRoman: 'Munazzam Deeni Safar (Suluk)', href: '/journeys', icon: '🛤️' },
  { title: 'Niyyah Goals & Spiritual Baselines', titleUrdu: 'دینی اہداف و نیت', titleArabic: 'الأهداف الإيمانية والنيات', titleRoman: 'Deeni Ahdaf wa Niyyat', href: '/goals', icon: '🎯' },
  { title: 'Private Muhasabah Vault', titleUrdu: 'شام کا محاسبہ', titleArabic: 'المحاسبة المسائية الخاصة', titleRoman: 'Sham ka Muhasabah', href: '/reflections', icon: '📝' },
  { title: 'Deen Replay Annual Review', titleUrdu: 'دین ری پلے (سالانہ جائزہ)', titleArabic: 'المراجعة السنوية للحياة الإيمانية', titleRoman: 'Deen Replay (Salana Jaiza)', href: '/replay', icon: '🔄' },
];

export const allApps: NavigationItem[] = [
  ...ibadatItems,
  ...ilmItems,
  ...familySistersItems,
  ...ahkamItems,
  { title: 'Canonical Evidence Explorer', titleUrdu: 'کتبِ معتبرہ سے تلاش و رہنمائی', titleArabic: 'البحث في الأدلة المعتمدة', titleRoman: 'Mustanad Kutub se Rahnumai', href: '/ask', icon: '💬' },
  { title: 'Security & Trust Vault', titleUrdu: 'پرائیویسی و امانت سینٹر', titleArabic: 'خزانة الأمان والخصوصية', titleRoman: 'Privacy wa Amanat Center', href: '/privacy', icon: '🛡️' },
  { title: 'System Settings Control Center', titleUrdu: 'مرکزی ترتیبات', titleArabic: 'مركز الإعدادات الشامل', titleRoman: 'Markazi Tarteebat (Settings)', href: '/settings', icon: '⚙️' },
  { title: 'About & Methodology', titleUrdu: 'تعارف و منہج عمل', titleArabic: 'عن المنظومة والمنهج الشرعي', titleRoman: 'Ta\'aruf wa Manhaj-e-Amal', href: '/about', icon: '🕌' },
];
