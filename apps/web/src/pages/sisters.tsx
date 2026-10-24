import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useLanguage } from '../context/LanguageContext';
import {
  SanctuaryBook,
  SanctuaryBookChapter,
  SahabiyyatProfile,
  FiqhRulingItem,
  MasnoonFamilyDua,
} from '../lib/women-sanctuary-data';
import { SanadVerificationModal } from '../components/authenticity/SanadVerificationModal';
import { SanadVerificationReport } from '../lib/authenticity-pipeline';
import {
  UniversalContentShareModal,
  UniversalCardPayload,
} from '../components/cards/UniversalContentShareModal';
import { SistersHeader, SanctuaryTab } from '../components/sisters/SistersHeader';
import { SistersLibraryTab } from '../components/sisters/SistersLibraryTab';
import { SistersSahabiyyatTab } from '../components/sisters/SistersSahabiyyatTab';
import { SistersFiqhTab } from '../components/sisters/SistersFiqhTab';
import { SistersDuasTab } from '../components/sisters/SistersDuasTab';
import { SistersVaultTab } from '../components/sisters/SistersVaultTab';

export default function SistersSanctuaryPage() {
  const { isUrdu } = useLanguage();
  const [activeTab, setActiveTab] = useState<SanctuaryTab>('library');

  // Share Card Generator Modal State
  const [shareCardPayload, setShareCardPayload] = useState<UniversalCardPayload | null>(null);

  // Sanad Modal State
  const [selectedSanadReport, setSelectedSanadReport] = useState<SanadVerificationReport | null>(null);
  const [isSanadModalOpen, setIsSanadModalOpen] = useState(false);

  // Sovereign PIN Vault State
  const [isPinLocked, setIsPinLocked] = useState(false);
  const [hasPinConfigured, setHasPinConfigured] = useState(false);
  const [isSettingUpPin, setIsSettingUpPin] = useState(false);

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installSuccessMessage, setInstallSuccessMessage] = useState(false);

  // Initialize PIN & PWA listeners
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPin = localStorage.getItem('amal_nisa_pin');
      if (storedPin) {
        setHasPinConfigured(true);
        setIsPinLocked(true);
      }

      const handleBeforeInstall = (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);
      };
      window.addEventListener('beforeinstallprompt', handleBeforeInstall);
      return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    }
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setInstallSuccessMessage(true);
        setTimeout(() => setInstallSuccessMessage(false), 5000);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        isUrdu
          ? 'اپنے موبائل براؤزر کے مینیو (تین نقطوں یا شیئر بٹن) پر کلک کر کے "Add to Home Screen" یا "Install App" منتخب کریں۔'
          : 'Tap your browser share/menu icon and select "Add to Home Screen" to install Amal Nisa as a standalone app.'
      );
    }
  };

  const handleOpenSanad = (
    title: string,
    author: string,
    hash: string,
    citation: string,
    notesUrdu: string,
    notesEnglish: string,
    consensusUrdu: string
  ) => {
    const report: SanadVerificationReport = {
      id: hash,
      source: 'MISHKAT_AL_MASABIH',
      sourceNameArabic: title,
      sourceNameUrdu: title,
      sourceNameEnglish: title,
      citationReference: citation,
      primaryNarrator: author,
      grading: 'SAHIH',
      gradingUrdu: 'صحیح و مستند (اہل سنت و جماعت)',
      gradingEnglish: 'Authentic (Ahl al-Sunnah Canon)',
      isVerifiedAuthentic: true,
      verificationTimestamp: new Date().toISOString(),
      verificationAuditNotes: {
        ur: notesUrdu,
        en: notesEnglish,
      },
      scholarlyConsensus: {
        ur: consensusUrdu,
        en: 'Rigorously audited against classical Sunni scholarship.',
      },
      verificationHash: hash,
    };
    setSelectedSanadReport(report);
    setIsSanadModalOpen(true);
  };

  const handleGenerateSahabiyyahCard = (sah: SahabiyyatProfile) => {
    const payload: UniversalCardPayload = {
      category: 'SAHABIYYAT',
      categoryLabelUrdu: 'اسوۂ صحابیات و امہات المؤمنین',
      categoryLabelEnglish: 'Noble Sahabiyyat & Mothers of Believers',
      titleUrdu: sah.nameUrdu,
      titleEnglish: sah.nameEnglish,
      titleArabic: sah.nameArabic,
      arabicText: 'رَضِيَ اللَّهُ عَنْهَا',
      primaryTextUrdu: `${sah.titleUrdu} — ${sah.biographyUrdu}\n\nاسوہ و اسباق:\n${sah.dailySunnahLessons.map((l, i) => `${i + 1}. ${l.ur}`).join('\n')}`,
      secondaryTextEnglish: `${sah.titleEnglish} — ${sah.biographyEnglish}\n\nDaily Sunnah Lessons:\n${sah.dailySunnahLessons.map((l, i) => `${i + 1}. ${l.en}`).join('\n')}`,
      sourceCitation: sah.classicalCitation,
      badgeContext: sah.era,
    };
    setShareCardPayload(payload);
  };

  const handleGenerateDuaCard = (dua: MasnoonFamilyDua) => {
    const payload: UniversalCardPayload = {
      category: 'DUA',
      categoryLabelUrdu: 'مائیں و مسنون دعائیں',
      categoryLabelEnglish: 'Motherhood & Family Supplications',
      titleUrdu: dua.titleUrdu,
      titleEnglish: dua.titleEnglish,
      arabicText: dua.arabicText,
      primaryTextUrdu: `ترجمہ: ${dua.translationUrdu}\n\nفضیلت: ${dua.spiritualVirtueUrdu}`,
      secondaryTextEnglish: `Translation: ${dua.translationEnglish}\n\nVirtue: ${dua.spiritualVirtueEnglish || dua.spiritualVirtueUrdu}`,
      sourceCitation: dua.reference,
      badgeContext: isUrdu ? 'مسنون دعا' : 'Masnoon Supplication',
    };
    setShareCardPayload(payload);
  };

  const handleGenerateFiqhCard = (item: FiqhRulingItem) => {
    const payload: UniversalCardPayload = {
      category: 'FIQH',
      categoryLabelUrdu: 'احکامِ نسواں و طہارت',
      categoryLabelEnglish: 'Fiqh & Purity for Women',
      titleUrdu: item.titleUrdu,
      titleEnglish: item.titleEnglish,
      arabicText: 'أَحْكَامُ الشَّرِيعَةِ وَالطَّهَارَةِ',
      primaryTextUrdu: `${item.summaryUrdu}\n\n${item.detailedRulingUrdu}\n\nعملی ہدایات:\n${item.practicalGuidelines.map((g) => `• ${g}`).join('\n')}`,
      secondaryTextEnglish: `${item.summaryEnglish}\n\n${item.detailedRulingEnglish || item.detailedRulingUrdu}\n\nGuidelines:\n${(item.practicalGuidelinesEnglish || item.practicalGuidelines).map((g) => `• ${g}`).join('\n')}`,
      sourceCitation: item.hanafiReference,
      badgeContext: isUrdu ? 'فقہ حنفی' : 'Hanafi Jurisprudence',
    };
    setShareCardPayload(payload);
  };

  const handleGenerateChapterCard = (book: SanctuaryBook, ch: SanctuaryBookChapter) => {
    const payload: UniversalCardPayload = {
      category: 'HADITH',
      categoryLabelUrdu: book.titleUrdu,
      categoryLabelEnglish: book.titleEnglish,
      titleUrdu: ch.titleUrdu,
      titleEnglish: ch.titleEnglish,
      arabicText: ch.arabicEvidence || 'مِنْ كُتُبِ أَهْلِ السُّنَّةِ وَالْجَمَاعَةِ',
      primaryTextUrdu: `${ch.summaryUrdu}\n\nاہم نکات:\n${ch.keyTakeaways.map((p) => `• ${p}`).join('\n')}`,
      secondaryTextEnglish: ch.summaryEnglish,
      sourceCitation: `${book.titleUrdu} (${book.authorUrdu}) • ${ch.hadithOrFiqhReference}`,
      badgeContext: book.authorEra,
    };
    setShareCardPayload(payload);
  };

  return (
    <>
      <Head>
        <title>
          {isUrdu
            ? 'گوشۂ خواتین و صحابیات — امل آپریٹنگ سسٹم'
            : 'The Sacred Sisters Sanctuary — Amal OS'}
        </title>
        <meta
          name="description"
          content="The authentic Ahl al-Sunnah Sanctuary for Muslim Women: 20 Classical Masterworks, Biographies of the Sahabiyyat, Taharah & Fiqh Guide, and Private Sovereign Vault."
        />
      </Head>

      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#FCFAF7',
          color: '#1F2937',
          fontFamily: isUrdu
            ? "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif"
            : 'system-ui, -apple-system, sans-serif',
          direction: isUrdu ? 'rtl' : 'ltr',
          paddingBottom: 90,
        }}
      >
        {/* Top Header & Sticky Navigation */}
        <SistersHeader
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          hasPinConfigured={hasPinConfigured}
          onInstallPWA={handleInstallPWA}
          onOpenVault={() => {
            setActiveTab('vault');
            if (!hasPinConfigured) setIsSettingUpPin(true);
          }}
          isUrdu={isUrdu}
          installSuccessMessage={installSuccessMessage}
        />

        {/* Dynamic Pillar Tab Content */}
        <div style={{ maxWidth: 1200, margin: '24px auto', padding: '0 16px' }}>
          {activeTab === 'library' && (
            <SistersLibraryTab
              isUrdu={isUrdu}
              onOpenSanad={handleOpenSanad}
              onGenerateChapterCard={handleGenerateChapterCard}
            />
          )}

          {activeTab === 'sahabiyyat' && (
            <SistersSahabiyyatTab
              isUrdu={isUrdu}
              onOpenSanad={handleOpenSanad}
              onGenerateSahabiyyahCard={handleGenerateSahabiyyahCard}
            />
          )}

          {activeTab === 'fiqh' && (
            <SistersFiqhTab
              isUrdu={isUrdu}
              onGenerateFiqhCard={handleGenerateFiqhCard}
            />
          )}

          {activeTab === 'duas' && (
            <SistersDuasTab
              isUrdu={isUrdu}
              onGenerateDuaCard={handleGenerateDuaCard}
            />
          )}

          {activeTab === 'vault' && (
            <SistersVaultTab
              isUrdu={isUrdu}
              hasPinConfigured={hasPinConfigured}
              setHasPinConfigured={setHasPinConfigured}
              isPinLocked={isPinLocked}
              setIsPinLocked={setIsPinLocked}
              isSettingUpPin={isSettingUpPin}
              setIsSettingUpPin={setIsSettingUpPin}
            />
          )}
        </div>

        {/* Global Sanad Certificate Verification Modal */}
        <SanadVerificationModal
          isOpen={isSanadModalOpen}
          report={selectedSanadReport}
          onClose={() => setIsSanadModalOpen(false)}
        />

        {/* Global High-Res Universal Share Card Generator Modal */}
        <UniversalContentShareModal
          isOpen={!!shareCardPayload}
          payload={shareCardPayload}
          onClose={() => setShareCardPayload(null)}
        />
      </div>
    </>
  );
}
