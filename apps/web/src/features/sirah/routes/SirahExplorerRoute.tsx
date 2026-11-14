import React, { useState } from 'react';
import {
  PropheticLifePeriod,
  SirahEventRecord,
  ShamailReportRecord,
  SirahReportVariantRecord,
} from '@amal/types';
import { AmalTheme } from '@amal/ui';
import { PropheticTimeline } from '../components/PropheticTimeline';
import { ShamailCard } from '../components/ShamailCard';
import { ReportComparisonView } from '../components/ReportComparisonView';
import { UniversalContentShareModal, UniversalCardPayload } from '../../../components/cards/UniversalContentShareModal';
import { useLanguage } from '../../../context/LanguageContext';

interface SirahExplorerRouteProps {
  events: SirahEventRecord[];
  shamailReports: ShamailReportRecord[];
  variants: SirahReportVariantRecord[];
}

export const SirahExplorerRoute: React.FC<SirahExplorerRouteProps> = ({
  events,
  shamailReports,
  variants,
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'TIMELINE' | 'SHAMAIL' | 'VARIANTS'>('TIMELINE');
  const [selectedPeriod, setSelectedPeriod] = useState<PropheticLifePeriod | undefined>(undefined);
  const [sharePayload, setSharePayload] = useState<UniversalCardPayload | null>(null);

  const periods: { id: PropheticLifePeriod; labelEn: string; labelUr: string; labelAr: string; labelRoman: string }[] = [
    {
      id: 'PRE_PROPHETIC_EARLY_LIFE',
      labelEn: 'Pre-Prophetic Early Life',
      labelUr: 'بعثت سے قبل کی حیاتِ طیبہ',
      labelAr: 'قبل البعثة النبوية',
      labelRoman: 'Besat Se Qabl Ki Hayat-e-Tayyibah',
    },
    {
      id: 'MAKKAH_EARLY_DAWAH',
      labelEn: 'Early Makkah Dawah',
      labelUr: 'مکہ: ابتدائی دعوت',
      labelAr: 'مكة: الدعوة الأولى',
      labelRoman: 'Makkah: Ibtidayi Dawah',
    },
    {
      id: 'MAKKAH_PERSECUTION_BOYCOTT',
      labelEn: 'Persecution & Boycott',
      labelUr: 'مکہ: مصائب و شعبِ ابی طالب',
      labelAr: 'مكة: الحصار والمحن',
      labelRoman: 'Makkah: Masaib o Sheb-e-Abi Talib',
    },
    {
      id: 'MAKKAH_YEAR_OF_SORROW_ISRA',
      labelEn: 'Year of Sorrow & Al-Isra',
      labelUr: 'عام الحزن و واقعۂ معراج',
      labelAr: 'عام الحزن والإسراء والمعراج',
      labelRoman: 'Aam-ul-Huzn o Waqiah-e-Meraj',
    },
    {
      id: 'THE_HIJRAH_MIGRATION',
      labelEn: 'The Blessed Hijrah',
      labelUr: 'ہجرتِ مدینہ منورہ',
      labelAr: 'الهجرة النبوية المباركة',
      labelRoman: 'Hijrat-e-Madinah Munawwarah',
    },
    {
      id: 'MADINAH_EARLY_COMMUNITY',
      labelEn: 'Madinah Early Community',
      labelUr: 'مدینہ: مسجدِ نبوی و مواخات',
      labelAr: 'المدينة: بناء المسجد والمؤاخاة',
      labelRoman: 'Madinah: Masjid-e-Nabawi o Muwakhat',
    },
    {
      id: 'MADINAH_EXPEDITIONS_DEFENSE',
      labelEn: 'Expeditions & Defense',
      labelUr: 'مدینہ: غزوات و دفاع',
      labelAr: 'المدينة: الغزوات والدفاع',
      labelRoman: 'Madinah: Ghazwat o Difa',
    },
    {
      id: 'MADINAH_TREATY_EXPANSION',
      labelEn: 'Hudaybiyyah & Letters',
      labelUr: 'صلحِ حدیبیہ و مکاتیبِ ملوک',
      labelAr: 'صلح الحديبية ومكاتيب الملوك',
      labelRoman: 'Sulh-e-Hudaybiyyah o Makateeb-e-Mulook',
    },
    {
      id: 'CONQUEST_AND_DELEGATIONS',
      labelEn: 'Conquest & Delegations',
      labelUr: 'فتحِ مکہ و عام الوفود',
      labelAr: 'فتح مكة وعام الوفود',
      labelRoman: 'Fatah-e-Makkah o Aam-ul-Wufood',
    },
    {
      id: 'FAREWELL_PILGRIMAGE_AND_PASSING',
      labelEn: 'Farewell Hajj & Wisal',
      labelUr: 'حجۃ الوداع و وصالِ مبارک',
      labelAr: 'حجة الوداع والوفاة الشريفة',
      labelRoman: 'Hujjat-ul-Wada o Wisal-e-Mubarak',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header Banner */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <span style={{ fontSize: 12, fontWeight: 700, color: AmalTheme.colors.primary, letterSpacing: 1 }}>
              {t('AMAL KNOWLEDGE ATLAS', 'امل علمی انسائیکلوپیڈیا', 'أطلس المعرفة النبوية', 'AMAL KNOWLEDGE ATLAS')}
            </span>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: '6px 0 2px', color: AmalTheme.colors.text.primaryLight }}>
              {t('Prophetic Life Graph & Shama\'il', 'سیرت النبی ﷺ و شمائلِ مصطفیٰ', 'السيرة النبوية والشمائل المحمدية', 'Seerat-e-Mustafa ﷺ o Shamail Graph')}
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: '#666' }}>
              {t(
                'Chronologically ordered, evidence-linked, and scholar-governed exploration of the Sirah and Prophetic traits.',
                'تاریخی ترتیب، مستند اسناد اور جلیل القدر ائمہ کے اصولوں پر مرتب شدہ سیرتِ طیبہ و اوصافِ مصطفیٰ ﷺ کا جائزہ۔',
                'دراسة موثقة ومحققة لسيرة النبي ﷺ وشمائله الشريفة وفق الترتيب الزمني المحكم.',
                'Tareekhi tarteeb, sanad aur mustanad ma\'akhiz par mabni Seerat-e-Tayyibah aur Shamail ka mutala.'
              )}
            </p>
          </div>
          <span style={{
            fontSize: 12,
            padding: '4px 12px',
            borderRadius: 16,
            backgroundColor: '#E8F5E9',
            color: '#2E7D32',
            fontWeight: 700,
          }}>
            ✓ {t('AUTHENTIC SIRAH CORPUS', 'مستند کتبِ سیرت', 'متن السيرة المعتمد', 'Mustanad Seerat Corpus')}
          </span>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('TIMELINE')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: activeTab === 'TIMELINE' ? AmalTheme.colors.primary : '#F0F0F0',
              color: activeTab === 'TIMELINE' ? '#FFFFFF' : '#333',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {t('Chronological Timeline', 'تاریخی ٹائم لائن', 'الخط الزمني للسيرة', 'Tareekhi Timeline')}
          </button>
          <button
            onClick={() => setActiveTab('SHAMAIL')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: activeTab === 'SHAMAIL' ? AmalTheme.colors.primary : '#F0F0F0',
              color: activeTab === 'SHAMAIL' ? '#FFFFFF' : '#333',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {t('Shama\'il al-Muhammadiyyah', 'شمائلِ محمدیہ ﷺ', 'الشمائل المحمدية', 'Shamail-e-Muhammadiyyah ﷺ')}
          </button>
          <button
            onClick={() => setActiveTab('VARIANTS')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: activeTab === 'VARIANTS' ? AmalTheme.colors.primary : '#F0F0F0',
              color: activeTab === 'VARIANTS' ? '#FFFFFF' : '#333',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {t('Transmission Variants', 'روایتی اختلافات و مقارنہ', 'مقارنة الروايات', 'Riwayati Ikhtilafat o Muqarnah')}
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'TIMELINE' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Period selector chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <button
              onClick={() => setSelectedPeriod(undefined)}
              style={{
                padding: '6px 12px',
                borderRadius: 20,
                border: '1px solid #CCC',
                backgroundColor: selectedPeriod === undefined ? '#263238' : '#FFF',
                color: selectedPeriod === undefined ? '#FFF' : '#333',
                fontSize: 12,
                cursor: 'pointer',
                fontWeight: selectedPeriod === undefined ? 700 : 500,
              }}
            >
              {t('All Periods', 'تمام ادوار', 'جميع المراحل', 'Tamam Adwar')}
            </button>
            {periods.map((p) => {
              const label = t(p.labelEn, p.labelUr, p.labelAr, p.labelRoman);
              const isSelected = selectedPeriod === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPeriod(p.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 20,
                    border: '1px solid #CCC',
                    backgroundColor: isSelected ? '#263238' : '#FFF',
                    color: isSelected ? '#FFF' : '#333',
                    fontSize: 12,
                    cursor: 'pointer',
                    fontWeight: isSelected ? 700 : 500,
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <PropheticTimeline events={events} activePeriod={selectedPeriod} />
        </div>
      )}

      {activeTab === 'SHAMAIL' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
          {shamailReports.map((report) => (
            <ShamailCard
              key={report.report_id}
              report={report}
              onShareCard={(rep) => {
                setSharePayload({
                  category: 'SHAMAIL',
                  titleUrdu: language === 'roman' ? 'Shamail-e-Mustafa ﷺ' : 'شمائلِ مصطفیٰ ﷺ',
                  badgeContext: `${t('Chapter: ', 'باب: ', 'باب: ', 'Bab: ')}${rep.category.replace(/_/g, ' ')}`,
                  arabicText: rep.arabic_matn,
                  primaryTextUrdu: rep.urdu_translation || rep.english_translation,
                  secondaryTextEnglish: rep.urdu_translation ? rep.english_translation : undefined,
                  sourceCitation: `${rep.source_hadith_ref || rep.primary_source_work} (${t('Narrator: ', 'راوی: ', 'الراوي: ', 'Rawi: ')}${rep.primary_narrator})`,
                  tafseerInsightUrdu: `✨ ${t('Sirah & Adab Lesson: ', 'سیرت و اداب: ', 'درس السيرة والآداب: ', 'Seerat o Adab Sabaq: ')}${rep.practical_adab_lesson}`,
                });
              }}
            />
          ))}
        </div>
      )}

      {activeTab === 'VARIANTS' && (
        <ReportComparisonView variants={variants} />
      )}

      {/* Sacred Universal Share Modal */}
      {sharePayload && (
        <UniversalContentShareModal
          isOpen={!!sharePayload}
          onClose={() => setSharePayload(null)}
          payload={sharePayload}
        />
      )}
    </div>
  );
};
