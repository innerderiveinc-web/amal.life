import React from 'react';

export interface TahajjudSunnahGuideProps {
  showGuide: boolean;
}

export const TahajjudSunnahGuide: React.FC<TahajjudSunnahGuideProps> = ({ showGuide }) => {
  return (
    <>
      {/* HADITH QUDSI ACCREDITATION */}
      <div
        style={{
          padding: '14px 18px',
          borderRadius: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          borderLeft: '4px solid #F59E0B',
          fontSize: 13,
          lineHeight: 1.7,
        }}
      >
        <div
          dir="rtl"
          style={{
            fontFamily: 'var(--font-arabic), "Amiri", serif',
            fontSize: 17,
            color: '#FEF3C7',
            marginBottom: 6,
          }}
        >
          «يَنْزِلُ رَبُّنَا تَبَارَكَ وَتَعَالَى كُلَّ لَيْلَةٍ إِلَى السَّمَاءِ الدُّنْيَا حِينَ يَبْقَى ثُلُثُ اللَّيْلِ الآخِرُ فَيَقُولُ: مَنْ يَدْعُونِي فَأَسْتَجِيبَ لَهُ، مَنْ يَسْأَلُنِي فَأُعْطِيَهُ، مَنْ يَسْتَغْفِرُنِي فَأَغْفِرَ لَهُ»
        </div>
        <div dir="rtl" className="font-urdu" style={{ fontSize: 13, color: '#E2E8F0' }}>
          رسول اللہ ﷺ نے فرمایا: ہمارا پروردگار تبارک و تعالی ہر رات آسمانِ دنیا پر نزولِ اجلال فرماتا ہے جب رات کا آخری تہائی حصہ باقی رہ جاتا ہے، اور ارشاد فرماتا ہے: کون ہے جو مجھ سے دعا کرے تاکہ میں اس کی دعا قبول کروں؟ کون ہے جو مجھ سے مانگے تاکہ میں اسے عطا کروں؟ کون ہے جو مجھ سے مغفرت طلب کرے تاکہ میں اسے بخش دوں؟ (صحیح البخاری: 1145، صحیح مسلم: 758)
        </div>
      </div>

      {/* EXPANDABLE SUNNAH TAHAJJUD GUIDE */}
      {showGuide && (
        <div
          style={{
            marginTop: 18,
            padding: '18px 20px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 12,
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 800, color: '#FDE68A' }}>
            مسنون صلوٰۃ التہجد کا طریقہ و سنن (بہارِ شریعت و کتبِ فقہ)
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 14,
            }}
          >
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#A7F3D0', marginBottom: 4 }}>
                1. بیداری و مسواک
              </div>
              <div style={{ fontSize: 12, color: '#CBD5E1', lineHeight: 1.5 }}>
                چہرے سے نیند کے آثار زائل کریں، مسواک کے ساتھ مکمل طہارت و وضو فرمائیں اور رسول اللہ ﷺ کی یہ مسنون دعا پڑھیں:
                <em style={{ display: 'block', marginTop: 4, color: '#FEF3C7' }}>
                  «الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ»
                </em>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#A7F3D0', marginBottom: 4 }}>
                2. تعدادِ رکعات
              </div>
              <div style={{ fontSize: 12, color: '#CBD5E1', lineHeight: 1.5 }}>
                تہجد کی کم سے کم ۲ رکعتیں اور مسنون تعداد ۸ رکعتیں ہیں۔ دو دو رکعت کر کے نیت فرمائیں۔ ہر دو رکعت پر سلام پھیرنا مستحب ہے۔
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#A7F3D0', marginBottom: 4 }}>
                3. قراءت و خشوع
              </div>
              <div style={{ fontSize: 12, color: '#CBD5E1', lineHeight: 1.5 }}>
                رات کی خاموشی میں قرآن کریم کی آیات ترتیل اور تدبر کے ساتھ تلاوت فرمائیں۔ رکوع و سجود کو دراز رکھیں اور بارگاہِ الٰہی میں عاجزی اختیار کریں۔
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: 12, borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#A7F3D0', marginBottom: 4 }}>
                4. وتر و سحر کا استغفار
              </div>
              <div style={{ fontSize: 12, color: '#CBD5E1', lineHeight: 1.5 }}>
                اگر عشاء کے بعد وتر نہ پڑھے ہوں تو تہجد کے بعد ۳ رکعت وتر ادا فرمائیں۔ فجر کے داخلے سے قبل آخری لمحات میں سید الاستغفار اور توبہ و استغفار کثرت سے کریں۔
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
