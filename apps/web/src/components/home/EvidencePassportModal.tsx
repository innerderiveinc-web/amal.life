import React, { useEffect } from 'react';
import { EvidencePassport } from '@amal/amal-engine';
import { useLanguage } from '../../context/LanguageContext';

export interface EvidencePassportModalProps {
  activePassport: EvidencePassport | null;
  onClose: () => void;
}

export const EvidencePassportModal: React.FC<EvidencePassportModalProps> = ({
  activePassport,
  onClose,
}) => {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!activePassport) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          maxWidth: 720,
          width: '100%',
          maxHeight: '88vh',
          overflowY: 'auto',
          padding: 28,
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          border: '1px solid #D1FAE5',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
            borderBottom: '1px solid #E5E7EB',
            paddingBottom: 12,
          }}
        >
          <div>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#047857', letterSpacing: 1 }}>
              {t('EVIDENCE PASSPORT • PROOF MODE', 'پاسپورٹِ سند • موڈ برائے ثبوت', 'جواز الإثبات • سند الأدلة القطعية', 'EVIDENCE PASSPORT • PROOF MODE')}
            </span>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#1B4332', margin: '4px 0 0' }}>
              {t(
                'Complete Provenance & Reasoning Chain',
                'مکمل استدلال و سلسلۂ اسناد و کتب',
                'سلسلة التوثيق وسياق الاستدلال الفقهي',
                'Mukammal Sanad o Fiqhi Istidlal Chain'
              )}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Evidence Passport"
            style={{
              backgroundColor: '#F1F5F9',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              cursor: 'pointer',
              fontWeight: 700,
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* Passport Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ backgroundColor: '#F9FAFB', padding: 12, borderRadius: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#6B7280' }}>
              {t('WHAT WAS RECOMMENDED:', 'حکم / فتویٰ کا خلاصہ:', 'الخلاصة والفتوى المستنبطة:', 'Hukm / Fatawa ka Khulasa:')}
            </span>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 2 }}>
              {activePassport.whatAmalSynthesized}
            </div>
          </div>

          <div>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#1B4332' }}>
              {t(
                '1. PRIMARY QURAN & HADITH EVIDENCE:',
                '۱. اصل قرآنی و حدیثی اسناد:',
                '١. الأدلة الشرعية الأصلية (الكتاب والسنة):',
                '1. Primary Quran o Hadith Sanad:'
              )}
            </span>
            {(activePassport.primaryEvidence?.hadithReferences || []).map((h, i) => (
              <div
                key={i}
                style={{
                  marginTop: 6,
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  fontSize: 12,
                }}
              >
                <div style={{ direction: 'rtl', fontSize: 15, color: '#047857', fontWeight: 700, lineHeight: 1.6 }}>
                  {h.arabicMatn}
                </div>
                <div style={{ marginTop: 6, color: '#374151' }}>&ldquo;{h.translation}&rdquo;</div>
                <div style={{ marginTop: 4, fontSize: 11, color: '#166534', fontWeight: 600 }}>
                  {t('Source:', 'ماخذ:', 'المصدر:', 'Source:')} {h.canonicalCollection} ({h.hadithNumber}) • {t('Grade:', 'درجہ:', 'الدرجة:', 'Darja:')} {h.classicalGrading}
                </div>
              </div>
            ))}
          </div>

          <div>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#1B4332' }}>
              {t(
                '2. PHYSICAL PRINT PROVENANCE & CRITICAL EDITION:',
                '۲. مطبوعہ نسخہ و تحقیق و صفحات کا حوالہ:',
                '٢. توثيق الطبعة والمخطوط والمحقق المعتمد:',
                '2. Matboo\'a Nuskha o Muhaqqiq Hawala:'
              )}
            </span>
            {(activePassport.provenanceAndEditions || []).map((p, i) => (
              <div
                key={i}
                style={{
                  marginTop: 6,
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: '#F9FAFB',
                  border: '1px solid #E2E8F0',
                  fontSize: 12,
                  color: '#374151',
                }}
              >
                <div>
                  <strong>{t('Title:', 'کتاب:', 'الكتاب:', 'Kitab:')}</strong> {p.bookTitle} by {p.author} (d. {p.deathYearHijri} AH)
                </div>
                <div>
                  <strong>{t('Edition:', 'اشاعت:', 'الطبعة والناشر:', 'Print:')}</strong> {p.printEdition} ({p.publisher})
                </div>
                <div>
                  <strong>{t('Editor (Muhaqqiq):', 'محقق:', 'المحقق:', 'Muhaqqiq:')}</strong> {p.muhaqqiq} • {t('Location:', 'مقام:', 'الموضع:', 'Maqam:')} {p.volumeAndPage}
                </div>
                <div style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>
                  SHA-256 Hash: {p.sha256ProvenanceHash}
                </div>
              </div>
            ))}
          </div>

          <div>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#1B4332' }}>
              {t(
                '3. THE FOUR SUNNI MADHHABS POSITIONS:',
                '۳. چاروں ائمہ اہل سنت کا موقف:',
                '٣. مذاهب الأئمة الأربعة المعتمدة:',
                '3. Charon Aimma-e-Sunnat ka Mauqif:'
              )}
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8, marginTop: 6 }}>
              <div style={{ padding: 10, borderRadius: 8, backgroundColor: '#F9FAFB', border: '1px solid #E2E8F0', fontSize: 11 }}>
                <strong style={{ color: '#065F46' }}>{t('Hanafi:', 'حنفی:', 'الحنفي:', 'Hanafi:')}</strong> {activePassport.madhhabPositions.hanafi}
              </div>
              <div style={{ padding: 10, borderRadius: 8, backgroundColor: '#F9FAFB', border: '1px solid #E2E8F0', fontSize: 11 }}>
                <strong style={{ color: '#0369A1' }}>{t('Shafi\'i:', 'شافعی:', 'الشافعي:', 'Shafi\'i:')}</strong> {activePassport.madhhabPositions.shafii}
              </div>
              <div style={{ padding: 10, borderRadius: 8, backgroundColor: '#F9FAFB', border: '1px solid #E2E8F0', fontSize: 11 }}>
                <strong style={{ color: '#B45309' }}>{t('Maliki:', 'مالکی:', 'المالكي:', 'Maliki:')}</strong> {activePassport.madhhabPositions.maliki}
              </div>
              <div style={{ padding: 10, borderRadius: 8, backgroundColor: '#F9FAFB', border: '1px solid #E2E8F0', fontSize: 11 }}>
                <strong style={{ color: '#4B5563' }}>{t('Hanbali:', 'حنبلی:', 'الحنبلي:', 'Hanbali:')}</strong> {activePassport.madhhabPositions.hanbali}
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#FEF3C7',
              padding: 12,
              borderRadius: 8,
              border: '1px solid #FCD34D',
              fontSize: 11,
              color: '#92400E',
              lineHeight: 1.5,
            }}
          >
            <strong>{t('EPISTEMIC LIMITATION NOTE:', 'شرعی تنبیہ و دائرۂ کار:', 'تنبيه معرفي وشرعي:', 'Shar\'i Tanbeeh:')}</strong>{' '}
            {activePassport.epistemicUncertainty.whatDependsOnPersonalContext}
          </div>
        </div>
      </div>
    </div>
  );
};
