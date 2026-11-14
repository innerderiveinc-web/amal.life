import React from 'react';
import { ALL_114_SURAHS } from '../../lib/quran-114-directory';
import { triggerHaptic } from '../../lib/haptics';
import { showAmalToast } from '../Toast';
import { IconPlay, IconPause, IconCopy, IconBookmark, IconShare, IconClose } from '../icons/AmalIcons';

export interface MushafSelectedAyah {
  surahNumber: number;
  ayahNumber: number;
  textArabic: string;
  textUrdu?: string;
  textEnglish?: string;
}

export interface MushafAyahActionSheetProps {
  selectedAyah: MushafSelectedAyah | null;
  onClose: () => void;
  isPlaying: boolean;
  onTogglePlay: (surahNumber: number, ayahNumber: number) => void;
  onSetKhatmahBookmark: (page: number, surahNumber: number, ayahNumber: number) => void;
  currentPage: number;
  onOpenShareModal: (ayah: {
    surahNumber: number;
    surahNameArabic: string;
    surahNameEnglish: string;
    surahNameUrdu: string;
    ayahNumber: number;
    arabicText: string;
    urduTranslation: string;
    englishTranslation?: string;
  }) => void;
}

export const MushafAyahActionSheet: React.FC<MushafAyahActionSheetProps> = ({
  selectedAyah,
  onClose,
  isPlaying,
  onTogglePlay,
  onSetKhatmahBookmark,
  currentPage,
  onOpenShareModal,
}) => {
  if (!selectedAyah) return null;

  const meta = ALL_114_SURAHS.find((s) => s.number === selectedAyah.surahNumber);

  const handleCopy = () => {
    triggerHaptic('selection');
    const textToCopy = `${selectedAyah.textArabic}\n\n[${meta?.nameTransliterated || 'Surah'} ${selectedAyah.surahNumber}:${selectedAyah.ayahNumber}]\n${selectedAyah.textUrdu || ''}\n${selectedAyah.textEnglish || ''}`;
    navigator.clipboard?.writeText(textToCopy);
    showAmalToast('Ayah copied to clipboard · آیت کاپی ہوگئی', 'success');
  };

  const handleBookmark = () => {
    triggerHaptic('success');
    onSetKhatmahBookmark(currentPage, selectedAyah.surahNumber, selectedAyah.ayahNumber);
    showAmalToast(`Khatmah bookmark set on Page ${currentPage} (${meta?.nameTransliterated} ${selectedAyah.ayahNumber})`, 'success');
  };

  const handleShare = () => {
    triggerHaptic('selection');
    onOpenShareModal({
      surahNumber: selectedAyah.surahNumber,
      surahNameArabic: meta?.nameArabic || '',
      surahNameEnglish: meta?.nameEnglish || '',
      surahNameUrdu: meta?.nameUrdu || '',
      ayahNumber: selectedAyah.ayahNumber,
      arabicText: selectedAyah.textArabic,
      urduTranslation: selectedAyah.textUrdu || '',
      englishTranslation: selectedAyah.textEnglish || '',
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.2)',
          borderTop: '2px solid #D4AF37',
          padding: '20px 24px 28px',
          maxHeight: '85vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          maxWidth: 720,
          width: '100%',
          margin: '0 auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle / top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                border: '1px solid #A7F3D0',
                borderRadius: 8,
                padding: '3px 10px',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {meta?.nameTransliterated} · {selectedAyah.surahNumber}:{selectedAyah.ayahNumber}
            </span>
            <span style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>
              Page {currentPage} · {meta?.nameUrdu}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Action Sheet"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 6,
              borderRadius: '50%',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconClose size={20} />
          </button>
        </div>

        {/* Arabic Text */}
        <div
          dir="rtl"
          style={{
            fontFamily: '"Amiri", "Scheherazade New", serif',
            fontSize: 26,
            lineHeight: 2,
            color: '#111827',
            textAlign: 'right',
            padding: '12px 14px',
            backgroundColor: '#FDFBF7',
            borderRadius: 12,
            border: '1px solid rgba(212, 175, 55, 0.2)',
          }}
        >
          {selectedAyah.textArabic}
        </div>

        {/* Urdu Translation */}
        {selectedAyah.textUrdu && (
          <div
            dir="rtl"
            style={{
              fontSize: 15,
              color: '#1F2937',
              lineHeight: 1.8,
              textAlign: 'right',
              padding: '6px 4px',
              fontFamily: '"Noto Nastaliq Urdu", serif',
            }}
          >
            <span style={{ color: '#047857', fontWeight: 700, fontSize: 13, marginLeft: 6 }}>کنز الایمان:</span>
            {selectedAyah.textUrdu}
          </div>
        )}

        {/* English Translation */}
        {selectedAyah.textEnglish && (
          <div
            style={{
              fontSize: 13.5,
              color: '#475569',
              lineHeight: 1.6,
              fontStyle: 'italic',
              padding: '4px 4px',
              borderTop: '1px dashed #E2E8F0',
              paddingTop: 8,
            }}
          >
            <span style={{ color: '#065F46', fontWeight: 700, fontStyle: 'normal', fontSize: 11, marginRight: 6 }}>EN:</span>
            {selectedAyah.textEnglish}
          </div>
        )}

        {/* Primary Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 8 }}>
          <button
            onClick={() => onTogglePlay(selectedAyah.surahNumber, selectedAyah.ayahNumber)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              padding: '10px 8px',
              borderRadius: 10,
              border: isPlaying ? '1px solid #10B981' : '1px solid #E2E8F0',
              backgroundColor: isPlaying ? '#ECFDF5' : '#F8FAFC',
              color: isPlaying ? '#065F46' : '#1E293B',
              fontSize: 11.5,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            {isPlaying ? <IconPause size={18} color="#059669" /> : <IconPlay size={18} color="#065F46" />}
            <span>{isPlaying ? 'Pause' : 'Tilawat'}</span>
          </button>

          <button
            onClick={handleBookmark}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              padding: '10px 8px',
              borderRadius: 10,
              border: '1px solid #E2E8F0',
              backgroundColor: '#F8FAFC',
              color: '#D97706',
              fontSize: 11.5,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            title="Set as Khatmah Bookmark"
          >
            <IconBookmark size={18} color="#D97706" />
            <span>Khatmah</span>
          </button>

          <button
            onClick={handleCopy}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              padding: '10px 8px',
              borderRadius: 10,
              border: '1px solid #E2E8F0',
              backgroundColor: '#F8FAFC',
              color: '#475569',
              fontSize: 11.5,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            title="Copy Arabic & Translations"
          >
            <IconCopy size={18} color="#64748B" />
            <span>Copy</span>
          </button>

          <button
            onClick={handleShare}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              padding: '10px 8px',
              borderRadius: 10,
              border: '1px solid #E2E8F0',
              backgroundColor: '#F8FAFC',
              color: '#0284C7',
              fontSize: 11.5,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            title="Create Visual Ayah Card"
          >
            <IconShare size={18} color="#0284C7" />
            <span>Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};
