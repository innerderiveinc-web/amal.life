import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export const AboutStewardshipSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      {/* Engineering & Stewardship by Qsura India Pvt Ltd */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: '36px 32px',
          border: '1px solid #E5E7EB',
          marginBottom: 48,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 28 }}>🏛️</span>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1B4332', margin: 0 }}>
              {t(
                'Engineering & Stewardship by Qsura India Pvt Ltd',
                'قصورہ انڈیا پرائیویٹ لمیٹڈ کی سرپرستی اور انجینئرنگ',
                'التطوير الهندسي والأمانة المؤسسية لشركة قصورة',
                'Engineering & Stewardship by Qsura India Pvt Ltd'
              )}
            </h2>
            <span style={{ fontSize: 12, color: '#059669', fontWeight: 700 }}>
              {t('Public Benefit Islamic Technology', 'عوامی فلاح و شرعی امانت', 'تقنية إسلامية للنفع العام والأمانة الشرعية', 'Public Benefit Islamic Technology')}
            </span>
          </div>
        </div>
        <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: '0 0 14px' }}>
          {t(
            'AMAL OS is the proprietary intellectual property of Qsura India Pvt Ltd, founded and architected by Dr. Irfan Ashraf. Designed from the ground up as a dedicated sovereign life platform for the global Muslim Ummah, its engineering unites deep technological rigor with authentic traditional orthodoxy (Ahl al-Sunnah wal-Jama\'ah).',
            'عمل او ایس قصورہ انڈیا پرائیویٹ لمیٹڈ کی فکری ملکیت ہے جس کے بانی اور چیف آرکیٹیکٹ ڈاکٹر عرفان اشرف ہیں۔ امتِ مسلمہ کے لیے ایک خود مختار اور نجی اسلامی پلیٹ فارم کے طور پر تیار کردہ یہ سسٹم جدید ترین ٹیکنالوجی اور اہل سنت و جماعت کے مسلکِ اعتدال کا سنگم ہے۔',
            'نظام أمل هو ملكية فكرية لشركة قصورة إنديا الخاصة المحدودة، أسسه وصممه الدكتور عرفان أشرف كمنظومة إسلامية سيادية تجمع بين دقة التكنولوجيا المعاصرة وأصالة منهج أهل السنة والجماعة.',
            'AMAL OS Qsura India Pvt Ltd ki intellectual property hai, jise Dr. Irfan Ashraf ne architect kiya hai — modern technology aur Ahl al-Sunnah orthodoxy ka behtareen imtizaj.'
          )}
        </p>
        <div style={{ backgroundColor: '#F8FAFC', borderRadius: 12, padding: '16px 20px', border: '1px solid #E2E8F0', marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>
            {t('Founder & Chief Architect: ', 'بانی و چیف آرکیٹیکٹ: ', 'المؤسس والمهندس الرئيسي: ', 'Founder & Chief Architect: ')}
            <span style={{ color: '#065F46' }}>{t('Dr. Irfan Ashraf', 'ڈاکٹر عرفان اشرف', 'د. عرفان أشرف', 'Dr. Irfan Ashraf')}</span>
          </div>
          <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6 }}>
            {t(
              'Steward Entity: Qsura India Pvt Ltd · Guiding the mission of delivering an ad-free, private, mathematically exact Islamic computing system free from sectarian deviation and commercial exploitation.',
              'نگران ادارہ: قصورہ انڈیا پرائیویٹ لمیٹڈ · اشتہارات سے پاک، پرائیویٹ، اور قطعی ریاضیاتی اسلامی کمپیوٹنگ سسٹم جو ہر قسم کے تجارتی استحصال سے پاک ہو۔',
              'الجهة الراعية: شركة قصورة إنديا · تحقيق رؤية منصة إسلامية خالية من الإعلانات والتتبع التجاري ومبنية على الحسابات الفلكية القطعية.',
              'Steward Entity: Qsura India Pvt Ltd · Ad-free, private, mathematically exact computing system jo har tarah ke commercial ads se pak ho.'
            )}
          </div>
        </div>
        <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.7, margin: 0 }}>
          {t(
            'Qsura India Pvt Ltd commits that AMAL OS shall remain 100% ad-free, devoid of commercial tracking, strictly grounded in the consensus of Sawad al-A\'zam, and protected against algorithmic distortion. All digital calculation engines and foundational canons are offered as a perpetual Waqf in service of divine worship.',
            'قصورہ انڈیا پرائیویٹ لمیٹڈ عہد کرتا ہے کہ امل او ایس ہمیشہ کمرشل اشتہارات اور ٹریکنگ سے پاک رہے گا، سوادِ اعظم کے متفقہ اصولوں پر قائم رہے گا، اور اس کے حسابی انجن بارگاہِ الٰہی میں خدمت کے لیے وقف رہیں گے۔',
            'تلتزم شركة قصورة بأن يظل نظام أمل خالياً تماماً من الإعلانات والتتبع التجاري، مؤصلاً على منهج السواد الأعظم، ومحفوظاً من التشويه الآلي، وقفاً في خدمة عبادة الله تعالى.',
            'Qsura India Pvt Ltd ka pukhta ahad hai ke AMAL OS hamesha ad-free, zero-tracking aur Sawad-e-Azam ke maslak par mustahkam rahega.'
          )}
        </p>
      </section>

      {/* Contact & Scholarly Review Banner */}
      <section
        style={{
          backgroundColor: '#E8F5E9',
          borderRadius: 14,
          padding: '36px 28px',
          border: '1px solid #A7F3D0',
          textAlign: 'center',
          maxWidth: 860,
          margin: '0 auto',
        }}
      >
        <span style={{ fontSize: 36 }}>📬</span>
        <h3
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: '#1B4332',
            marginTop: 10,
            marginBottom: 8,
          }}
        >
          {t(
            'Scholarly Feedback & Community Contact',
            'علمی نظرثانی اور ادارہ جاتی رابطہ',
            'المراجعات العلمية والتواصل المؤسسي',
            'Scholarly Feedback & Contact'
          )}
        </h3>
        <p
          style={{
            fontSize: 14,
            color: '#166534',
            maxWidth: 640,
            margin: '0 auto 20px',
            lineHeight: 1.6,
          }}
        >
          {t(
            'Are you an Islamic scholar (Alim / Mufti), researcher, or seeker with feedback, corpus corrections, or institutional inquiries? We welcome scholarly review with deep gratitude.',
            'کیا آپ ایک مستند عالمِ دین، مفتی، محقق یا علمی طالب علم ہیں جو کتب و حوالہ جات کی تصحیح یا تجاویز دینا چاہتے ہیں؟ ہم آپ کے علمی فیڈ بیک کا تہہ دل سے خیر مقدم کرتے ہیں۔',
            'هل أنت باحث شرعي أو مفتٍ أو طالب علم ترغب في تقديم مراجعات أو تصويبات تراثية؟ نرحب بمراجعاتكم العلمية ببالغ الامتنان والتقدير.',
            'Kya aap ek aalim, mufti ya researcher hain jo references ya corpus mein koi suggestion dena chahte hain? Hum scholarly review ka tahe-dil se khair-maqdam karte hain.'
          )}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <a
            href="mailto:scholars@amal.life"
            style={{
              backgroundColor: '#1B4332',
              color: '#FFFFFF',
              padding: '10px 20px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 13,
              textDecoration: 'none',
            }}
          >
            {t('Contact Scholarly Desk (scholars@amal.life)', 'علمی ڈیسک سے رابطہ (scholars@amal.life)', 'مراسلة المكتب العلمي (scholars@amal.life)', 'Contact Scholarly Desk (scholars@amal.life)')}
          </a>
          <Link
            href="/privacy"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#1B4332',
              padding: '10px 20px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 13,
              textDecoration: 'none',
              border: '1px solid #A7F3D0',
            }}
          >
            {t('Read Privacy Pledge 🔒', 'رازداری اور امانت کا عہدنامہ 🔒', 'ميثاق الخصوصية والأمانة 🔒', 'Read Privacy Pledge 🔒')}
          </Link>
        </div>
      </section>
    </>
  );
};
