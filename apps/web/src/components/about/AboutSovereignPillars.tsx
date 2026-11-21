import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export const AboutSovereignPillars: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* Five Core Pillars */}
      <section style={{ marginBottom: 56 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1B4332' }}>
            {t(
              'The Five Sovereign Pillars of AMAL OS',
              'امل او ایس کے پانچ خود مختار بنیادی اصول',
              'الأركان السيادية الخمسة لنظام عمل',
              'AMAL OS ke Paanch Buniyadi Usool'
            )}
          </h2>
          <p style={{ fontSize: 14, color: '#6B7280', marginTop: 6 }}>
            {t(
              'The principles behind every line of code we write',
              'ہمارے ۵ بنیادی اصول — جن پر اس پورے سسٹم کی بنیاد رکھی گئی ہے',
              'المبادئ الحاكمة لكل سطر برمجي نكتبه',
              'Hamare 5 Buniyadi Usool — The principles behind every line of code'
            )}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {[
            {
              icon: '🌿',
              title: t('Sakinah Calm (Zero Gamification)', 'سکینہ و وقار (بغیر کسی دکھاوے کے)', 'السكينة والهدوء (دون تشتيت)', 'Sakinah Calm (Zero Gamification)'),
              desc: t(
                'We categorically reject "Taqwa Points", spiritual leaderboards, and panic-inducing guilt streaks. Faith is for Allah (Ikhlas), not algorithm dopamine. AMAL OS fosters peaceful, longitudinal habit formation rooted in Prophetic ease.',
                'ہم اسکورنگ اور اسٹریکس کے ذریعے عبادت کو کھیل بنانے کے قطعی خلاف ہیں۔ ایمان اور عبادت صرف اللہ کی رضا (اخلاص) کے لیے ہے۔ امل او ایس نبوی اعتدال اور سکون کے ساتھ معمولات قائم کرنے میں مدد دیتا ہے۔',
                'نرفض تحويل العبادات إلى منافسات ونقاط. الإيمان لله تعالى وحده بإخلاص. يعزز نظام عمل الاستقامة الهادئة وفق الهدي النبوي الشريف.',
                'Hum taqwa points ya guilt streaks ke sakht khilaf hain. Ibadat sirf Allah ke liye (Ikhlas) hai. AMAL OS pur-sukoon aur mustaqil mamoolat banata hai.'
              ),
            },
            {
              icon: '🛡️',
              title: t('100% Zero-Tracking & Private Vault', '۱۰۰٪ بغیر ٹریکنگ نجی والٹ', 'خزانة خاصة دون تتبع بنسبة ١٠٠٪', '100% Zero-Tracking & Private Vault'),
              desc: t(
                'No commercial ads, no selling location data to brokers, and no invasive behavioral trackers. Your personal evening reflections and repentance remain isolated even from family sync via our Domestic Privacy Vault.',
                'کوئی تجارتی اشتہارات نہیں، نہ لوکیشن بروکرز کو بیچی جاتی ہے، اور نہ کوئی بیہیویرل ٹریکر موجود ہے۔ آپ کا شام کا نجی محاسبہ اور توبہ مکمل طور پر آپ کے اپنے فون میں محفوظ رہتی ہے۔',
                'خالٍ تماماً من الإعلانات ومن بيع البيانات لأي جهة. محاسبتك المسائية وتأملاتك الخاصة تظل محفوظة ومحمية على جهازك المحلي.',
                'Commercial ads aur data selling se 100% pak. Aapka zaati muhasabah aur tauba aapke apne device mein mehfooz rehti hai.'
              ),
            },
            {
              icon: '⚖️',
              title: t('Fatwa Firewall & Scholar Oversight', 'اہلِ علم کی نگرانی اور فتویٰ فائر وال', 'ضوابط الإفتاء وإشراف العلماء', 'Fatwa Firewall & Scholar Oversight'),
              desc: t(
                'Issuing legal verdicts (Fatwas) belongs exclusively to living, qualified Islamic jurists (Muftis). AMAL OS strictly prohibits machine-generated rulings; all fiqh discussions cite canonical classical texts, and complex inquiries are routed directly to living scholars.',
                'شریعت کے حتمی فیصلے اور فتاویٰ صرف زندہ و مستند مفتیانِ کرام کا منصب ہیں۔ امل میں کسی خود ساختہ رائے کی قطعی ممانعت ہے؛ تمام فقہی مباحث صرف مستند کلاسیکی کتب سے پیش کیے جاتے ہیں اور پیچیدہ سوالات باقاعدہ اہل علم کے سپرد کیے جاتے ہیں۔',
                'إصدار الفتاوى الشرعية حق حصري للفقهاء والمفتين المؤهلين. يمنع نظام عمل الأحكام المستحدثة آلياً، ويعتمد على النصوص التراثية الموثقة.',
                'Fatwa dena sirf ahl-e-ilm aur muftiyan-e-kiram ka mansab hai. AMAL OS machine rulings se pak hai aur sirf classical maraje pesh karta hai.'
              ),
            },
            {
              icon: '🕌',
              title: t('Ahl al-Sunnah & Four-Madhhab Parity', 'اہل سنت و جماعت اور چاروں فقہی مذاہب کا احترام', 'أهل السنة والجماعة والمذاهب الأربعة', 'Ahl al-Sunnah & Four Madhhabs'),
              desc: t(
                "Universal fidelity to the Sawad al-A'zam. We honor Imam Abu Hanifa, Imam Malik, Imam al-Shafi'i, and Imam Ahmad ibn Hanbal equally, providing full Madhhab toggles for Asr times, Zakat, and comparative Fiqh.",
                'سوادِ اعظم کے مسلکِ حق پر کامل استقامت۔ امام اعظم ابو حنیفہ، امام مالک، امام شافعی، اور امام احمد بن حنبل رحمہم اللہ کا یکساں احترام، اور عصر کے اوقات اور زکوٰۃ کے لیے مذاہب کے انتخاب کی مکمل سہولت۔',
                'الالتزام بالسواد الأعظم وأئمة الفقه الأربعة (أبو حنيفة، مالك، الشافعي، أحمد بن حنبل) مع إتاحة خيارات المذاهب في مواقيت الصلاة والزكاة.',
                'Sawad-e-A\'zam ke manhaj par Charon Madhahib (Hanafi, Maliki, Shafi\'i, Hanbali) ka yaksaan ehtiram aur options.'
              ),
            },
            {
              icon: '🧭',
              title: t('On-Device Deterministic Math', 'ڈیوائس پر ریاضیاتی و فلکیاتی حساب', 'حسابات فلكية قطعية على الجهاز', 'On-Device Deterministic Math'),
              desc: t(
                'Prayer times, lunar Hijri dates, and Kaaba Qibla bearings are computed mathematically on your local device. The app works 100% offline and will never stop functioning due to third-party server outages.',
                'نماز کے اوقات، ہجری تاریخ، اور قبلہ کی سمت کا قطعی حساب مکمل طور پر آپ کی ڈیوائس پر ہوتا ہے۔ یہ ایپ انٹرنیٹ کے بغیر سو فیصد آف لائن کام کرتی ہے۔',
                'مواقيت الصلاة، التقويم الهجري، واتجاه القبلة تُحسب فلكياً على الجهاز مباشرة دون الحاجة لإنترنت أو خوادم خارجية.',
                'Namaz ke auqaat, Hijri tareekh aur Qibla rukh local device par mathematically calculate hote hain, 100% offline.'
              ),
            },
            {
              icon: '📚',
              title: t('Verified 106-Book Canonical Corpus', '۱۰۶ مصدقہ کلاسیکی کتب کا ذخیرہ', 'المجموعة التراثية المعتمدة (١٠٦ كتب)', 'Verified 106-Book Canonical Corpus'),
              desc: t(
                'Every quote, Hadith grading, and Fiqh ruling is cryptographically anchored in primary classical texts (Al-Hidayah, Al-Umm, Al-Risalah, Al-Mughni, Bahar-e-Shariat, Riyadh al-Salihin).',
                'ہر حوالہ، حدیث کا درجہ اور فقہی مسئلہ براہ راست بنیادی کتب (الہدایہ، الام، الرسالہ، المغنی، بہارِ شریعت، ریاض الصالحین) سے ماخوذ و مصدقہ ہے۔',
                'كل نص وحكم فقهي موثق بدقة من أمهات الكتب المعتمدة (الهداية، الأم، الرسالة، المغني، بهار شريعت، رياض الصالحين).',
                'Har hawala aur fiqhi ruling classical motabar kutub (Al-Hidayah, Bahar-e-Shariat, Riyadh al-Salihin) se verified hai.'
              ),
            },
          ].map((pillar, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                padding: 24,
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{pillar.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1B4332', marginBottom: 8 }}>
                {pillar.title}
              </h3>
              <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 CANONICAL PILLARS: HOW DIGITAL TECHNOLOGY SERVES CLASSICAL SCHOLARSHIP */}
      <section style={{ marginBottom: 56 }}>
        <div
          style={{
            backgroundColor: '#0F291E',
            borderRadius: 16,
            padding: '36px 32px',
            color: '#FFFFFF',
            border: '2px solid #D4AF37',
            boxShadow: '0 8px 24px rgba(15, 41, 30, 0.15)',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 36px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                padding: '5px 14px',
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 800,
                color: '#FDE68A',
                marginBottom: 14,
                letterSpacing: 0.8,
              }}
            >
              <span>🛡️</span> ZERO FATWA FABRICATIONS · STRICT SCHOLARLY BOUNDARIES
            </div>
            <h2
              style={{
                fontSize: 'clamp(22px, 3vw, 28px)',
                fontWeight: 800,
                margin: '0 0 10px',
                color: '#FFFFFF',
              }}
            >
              {t(
                '4 Canonical Pillars: How Digital Research Serves Classical Scholarship',
                '۴ بنیادی ستون: ڈیجیٹل ریسرچ کس طرح کلاسیکی علوم کی خدمت کرتی ہے',
                'الأركان الأربعة: كيف يخدم البحث الرقمي العلوم الشرعية',
                '4 Buniyadi Sutoon: Digital Research Classical Uloom ki Khidmat'
              )}
            </h2>
            <p style={{ fontSize: 15, color: '#A7F3D0', margin: 0, fontWeight: 700 }}>
              {t(
                'Digital Research Serving Classical Scholarship (Clerical Assistant, Never a Mufti)',
                'روایتی علومِ دینیہ کی خدمت میں ڈیجیٹل انڈیکس (صرف کاتب و خادم، کبھی مفتی نہیں)',
                'البحث الرقمي في خدمة التراث الإسلامي (كاتب وخادم، وليس مفتياً)',
                'Digital Research Serving Classical Scholarship (Sirf Kaatib, Mufti Nahi)'
              )}
            </p>
            <p style={{ fontSize: 13, color: '#D1D5DB', marginTop: 12, lineHeight: 1.6 }}>
              {t(
                'Islam requires rigorous fidelity to truth. In AMAL OS, digital technology is never a Mufti, Lawgiver, or Preacher. It is strictly a specialized digital clerk (Kaatib) and indexer that upholds canonical Ahl al-Sunnah literature without altering a single letter of sacred text.',
                'اسلام سچائی اور امانت داری پر سخت اصرار کرتا ہے۔ امل او ایس میں جدید ٹیکنالوجی کبھی مفتی، شارع یا خطیب نہیں بنتی؛ بلکہ یہ صرف ایک تخصیصی کاتب اور اشاریہ ہے جو کتبِ اہل سنت کی نصوص میں بغیر کسی رد و بدل کے ان کی خدمت انجام دیتا ہے۔',
                'يتطلب الإسلام تحري الصدق والأمانة. في نظام عمل، التكنولوجيا ليست مفتياً ولا مشرعاً، بل هي مجرد كاتب مفهرس ومساعد تقني يخدم نصوص أهل السنة دون تبديل.',
                'Islam amanatdari par zor deta hai. AMAL OS mein technology mufti ya shar\'i judge nahi, balki ek digital kaatib hai jo sacred texts ko bina badle organize karta hai.'
              )}
            </p>
          </div>

          {/* The 4 Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
              marginBottom: 30,
            }}
          >
            {/* Card 1 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 12,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: 'rgba(52, 211, 153, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      border: '1px solid rgba(52, 211, 153, 0.3)',
                    }}
                  >
                    💬
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: '#34D399',
                        letterSpacing: 0.5,
                        textTransform: 'uppercase',
                      }}
                    >
                      {t(
                        'Pillar 1 · Search & Guidance',
                        'بنیاد ۱ · تلاش و رہنمائی',
                        'الركن ١ · البحث والاهتداء',
                        'Bunyaad 1 · Talash wa Rahnumai'
                      )}
                    </span>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                      Semantic Evidence Retrieval
                    </h3>
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#86EFAC', marginBottom: 8 }}>
                  {t(
                    '("Ask AMAL" — Emotional & Practical Retrieval)',
                    '("Ask AMAL" — احساس و ضرورت کی بنیاد پر قرآنی نصوص کی تلاش)',
                    '("اسأل عمل" — استرجاع النصوص بحسب الحاجة الروحية والواقعية)',
                    '("Ask AMAL" — Ehsas wa Zaroorat ki Bunyad par Qurani Nusoos ki Talash)'
                  )}
                </div>
                <p style={{ fontSize: 13, color: '#E5E7EB', lineHeight: 1.6, margin: 0 }}>
                  When a user writes: <em>&ldquo;I feel overwhelmed by workplace pressure and cannot focus during prayer,&rdquo;</em> the semantic search engine identifies the exact Ayahs on Sakinah (peace) and Sabr (patience) directly from the verified classical corpus—<strong>without altering a single word or letter of Islamic text</strong>.
                </p>
              </div>
              <div
                style={{
                  marginTop: 16,
                  paddingTop: 12,
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  color: '#CBD5E1',
                  fontWeight: 500,
                }}
              >
                <span>Shar&apos;i Boundary: 100% Verbatim</span>
                <Link href="/ask" style={{ color: '#6EE7B7', textDecoration: 'none', fontWeight: 700 }}>
                  Try Ask AMAL ➔
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 12,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: 'rgba(52, 211, 153, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      border: '1px solid rgba(52, 211, 153, 0.3)',
                    }}
                  >
                    🎯
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: '#34D399',
                        letterSpacing: 0.5,
                        textTransform: 'uppercase',
                      }}
                    >
                      {t(
                        'Pillar 2 · Niyyah Engine',
                        'بنیاد ۲ · نیت انجن',
                        'الركن ٢ · محرك النية والعمل',
                        'Bunyaad 2 · Niyyah Engine'
                      )}
                    </span>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                      Intention-to-Action Translation
                    </h3>
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#86EFAC', marginBottom: 8 }}>
                  {t(
                    '(Transforming broad goals into structured Sunnah habits)',
                    '(عام نیتوں کو باقاعدہ مسنون اعمال میں تبدیل کرنا)',
                    '(تحويل المقاصد العامة إلى عادات مسنونة محكمة)',
                    '(Aam Niyyaton ko Baqaida Masnoon Amaal mein Tabdeel Karna)'
                  )}
                </div>
                <p style={{ fontSize: 13, color: '#E5E7EB', lineHeight: 1.6, margin: 0 }}>
                  Digital routines break down sweeping aspirations (such as <em>&ldquo;I want to establish Tahajjud&rdquo;</em>) into progressive, micro-habit roadmaps rooted in the Sunnah (e.g., praying 2 Rakahs Witr before sleep, sleeping on right side with Taharah, setting a gentle alarm).
                </p>
              </div>
              <div
                style={{
                  marginTop: 16,
                  paddingTop: 12,
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  color: '#CBD5E1',
                  fontWeight: 500,
                }}
              >
                <span>Shar&apos;i Boundary: Sunnah Habits Only</span>
                <Link href="/journeys" style={{ color: '#6EE7B7', textDecoration: 'none', fontWeight: 700 }}>
                  View Journeys ➔
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 12,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: 'rgba(52, 211, 153, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      border: '1px solid rgba(52, 211, 153, 0.3)',
                    }}
                  >
                    🔗
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: '#34D399',
                        letterSpacing: 0.5,
                        textTransform: 'uppercase',
                      }}
                    >
                      {t(
                        'Pillar 3 · Classical Heritage',
                        'بنیاد ۳ · تراث و علمی اسناد',
                        'الركن ٣ · الإسناد والتراث الأصيل',
                        'Bunyaad 3 · Turas wa Ilmi Asnad'
                      )}
                    </span>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                      Automatic Cross-Referencing
                    </h3>
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#86EFAC', marginBottom: 8 }}>
                  {t(
                    '(Linking Quran with Kanz-ul-Iman, Khaza\'in & Bahar-e-Shariat)',
                    '(قرآن کریم کو کنز الایمان، خزائن العرفان اور بہارِ شریعت سے جوڑنا)',
                    '(ربط القرآن بكنز الإيمان وخزائن العرفان وبهار شريعت)',
                    '(Quran Kareem ko Kanz-ul-Iman, Khazain wa Bahar-e-Shariat se Jorna)'
                  )}
                </div>
                <p style={{ fontSize: 13, color: '#E5E7EB', lineHeight: 1.6, margin: 0 }}>
                  When reading a verse in the Holy Quran, the cross-referencing index automatically surfaces corresponding commentary from <em>Khaza'in-ul-Irfan</em>, legal applications from <em>Bahar-e-Shariat</em>, and relevant Hadith from <em>Riyadh al-Salihin</em>, providing complete context in seconds.
                </p>
              </div>
              <div
                style={{
                  marginTop: 16,
                  paddingTop: 12,
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  color: '#CBD5E1',
                  fontWeight: 500,
                }}
              >
                <span>Shar&apos;i Boundary: Unaltered Primary Sources</span>
                <Link href="/library" style={{ color: '#6EE7B7', textDecoration: 'none', fontWeight: 700 }}>
                  Explore 106 Works ➔
                </Link>
              </div>
            </div>

            {/* Card 4 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 12,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: 'rgba(52, 211, 153, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      border: '1px solid rgba(52, 211, 153, 0.3)',
                    }}
                  >
                    ⚖️
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: '#34D399',
                        letterSpacing: 0.5,
                        textTransform: 'uppercase',
                      }}
                    >
                      {t(
                        'Pillar 4 · Mufti Secretariat',
                        'بنیاد ۴ · فتویٰ سیکریٹریٹ',
                        'الركن ٤ · أمانة الفتوى والاستفتاء',
                        'Bunyaad 4 · Fatwa Secretariat'
                      )}
                    </span>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                      Mufti Query Dossier Preparation
                    </h3>
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#86EFAC', marginBottom: 8 }}>
                  {t(
                    '(Organized Dossier Structuring for Human Muftis)',
                    '(مفتیانِ کرام کے لیے سوال و حالات کی باقاعدہ فائل بندی)',
                    '(تنظيم ملف الاستفتاء الفقهي للسادة المفتين)',
                    '(Muftiyan-e-Kiram ke liye Sawal wa Halat ki Baqaida File Bandi)'
                  )}
                </div>
                <p style={{ fontSize: 13, color: '#E5E7EB', lineHeight: 1.6, margin: 0 }}>
                  When a user submits a complex question, the system structures the background details (context, timeline, parties involved) into an organized case brief for a qualified human Mufti to review, speeding up authentic scholarly response times without ever attempting to issue the verdict itself.
                </p>
              </div>
              <div
                style={{
                  marginTop: 16,
                  paddingTop: 12,
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  color: '#CBD5E1',
                  fontWeight: 500,
                }}
              >
                <span>Shar&apos;i Boundary: Strict Human Mufti Ifta</span>
                <Link href="/decision-room" style={{ color: '#6EE7B7', textDecoration: 'none', fontWeight: 700 }}>
                  Deen Decision Room ➔
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Comparative Table Banner */}
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              borderRadius: 12,
              padding: '16px 20px',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
              fontSize: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20 }}>📜</span>
              <span style={{ color: '#F9FAFB' }}>
                <strong>{t('The Sovereign AMAL OS Guarantee:', 'عمل او ایس کی خود مختار ضمانت:', 'ضمان AMAL OS السيادي:', 'The Sovereign AMAL OS Guarantee:')}</strong>{' '}
                {t(
                  'Machine learning is our clerk; classical consensus (Ijma) is our anchor; human scholars are our arbiters.',
                  'مشین لرننگ ہمارا منشی ہے، فقہی اجماع ہماری بنیاد ہے، اور علمائے کرام ہمارے فیصل ہیں۔',
                  'التعلم الآلي هو كاتبنا، والإجماع الفقهي هو مرساتنا، والعلماء الأجلاء هم مراجعنا.',
                  'Machine learning hamara clerk hai, Ijma hamara anchor hai, ulama hamare faisal hain.'
                )}
              </span>
            </div>
            <span style={{ color: '#D4AF37', fontWeight: 800 }}>
              {t(
                'Ad-Free · Hallucination-Free · Ahl al-Sunnah',
                'اشتہارات سے پاک · بے بنیاد باتوں سے محفوظ · اہلِ سنت و جماعت',
                'خالٍ من الإعلانات · مأمون من الهذيان · أهل السنة والجماعة',
                'Ad-Free · Hallucination-Free · Ahl al-Sunnah'
              )}
            </span>
          </div>
        </div>
      </section>
    </>
  );
};
