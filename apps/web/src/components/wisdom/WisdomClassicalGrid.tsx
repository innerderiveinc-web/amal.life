import React from 'react';
import { UniversalCardPayload } from '../cards/UniversalContentShareModal';
import { showAmalToast } from '../Toast';

export interface ClassicalWisdomItem {
  id: string;
  category: 'HADITH' | 'SHAMAIL' | 'TASAWWUF' | 'FIQH' | 'DUA';
  categoryUrdu: string;
  sourceWork: string;
  chapterTitleArabic: string;
  chapterTitleUrdu: string;
  arabicMatn: string;
  urduTranslation: string;
  englishSynopsis?: string;
  scholarlyNotes?: string;
}

interface WisdomClassicalGridProps {
  items: ClassicalWisdomItem[];
  onShareCard: (payload: UniversalCardPayload) => void;
}

export const WisdomClassicalGrid: React.FC<WisdomClassicalGridProps> = ({
  items,
  onShareCard,
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: 18,
      }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid #E2E8F0',
            padding: 22,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div>
            {/* Card Header: Category & Source */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  backgroundColor: '#ECFDF5',
                  color: '#065F46',
                  padding: '3px 10px',
                  borderRadius: 8,
                  border: '1px solid #A7F3D0',
                }}
              >
                {item.categoryUrdu} · {item.sourceWork}
              </span>
              <button
                type="button"
                onClick={() => {
                  onShareCard({
                    category: item.category,
                    titleUrdu: item.chapterTitleUrdu,
                    badgeContext: item.sourceWork,
                    arabicText:
                      item.arabicMatn.split('\n')[0]?.slice(0, 320) || item.arabicMatn.slice(0, 320),
                    primaryTextUrdu:
                      item.urduTranslation.split('\n')[0]?.slice(0, 360) ||
                      item.urduTranslation.slice(0, 360),
                    secondaryTextEnglish: item.englishSynopsis
                      ? item.englishSynopsis.slice(0, 240)
                      : undefined,
                    sourceCitation: `${item.sourceWork} · مصدقہ علمی سند`,
                    tafseerInsightUrdu: item.scholarlyNotes
                      ? item.scholarlyNotes.slice(0, 260)
                      : undefined,
                  });
                }}
                style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: '1px solid #059669',
                  backgroundColor: '#F0FDF4',
                  color: '#065F46',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
                title="اس کا خوبصورت سوشل میڈیا امیج کارڈ بنائیں"
              >
                <span>📸</span>
                <span>امیج کارڈ بنائیں</span>
              </button>
            </div>

            {/* Title */}
            <h3
              style={{
                margin: '0 0 12px',
                fontSize: 16,
                fontWeight: 800,
                color: '#0F172A',
                direction: 'rtl',
                textAlign: 'right',
              }}
            >
              {item.chapterTitleUrdu}
            </h3>

            {/* Arabic Matn */}
            <div
              dir="rtl"
              style={{
                fontFamily: 'var(--font-arabic), "Amiri", serif',
                fontSize: 19,
                lineHeight: 1.8,
                color: '#064E3B',
                textAlign: 'right',
                backgroundColor: '#F8FAFC',
                padding: '14px 16px',
                borderRadius: 10,
                marginBottom: 14,
                fontWeight: 600,
              }}
            >
              {item.arabicMatn.split('\n')[0]?.slice(0, 350) || item.arabicMatn.slice(0, 350)}
            </div>

            {/* Urdu Translation */}
            <div
              dir="rtl"
              style={{
                fontFamily: 'var(--font-urdu), serif',
                fontSize: 15,
                lineHeight: 2.1,
                color: '#1E293B',
                textAlign: 'right',
                borderRight: '3px solid #059669',
                paddingRight: 10,
                marginBottom: 12,
              }}
            >
              {item.urduTranslation.split('\n')[0]?.slice(0, 380) ||
                item.urduTranslation.slice(0, 380)}
            </div>

            {/* English synopsis */}
            {item.englishSynopsis && (
              <div
                style={{
                  fontSize: 13,
                  color: '#475569',
                  lineHeight: 1.5,
                  marginBottom: 12,
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{item.englishSynopsis.slice(0, 200)}...&rdquo;
              </div>
            )}

            {/* Scholarly note */}
            {item.scholarlyNotes && (
              <div
                style={{
                  fontSize: 12,
                  color: '#92400E',
                  backgroundColor: '#FEF3C7',
                  padding: '8px 12px',
                  borderRadius: 8,
                  lineHeight: 1.5,
                }}
              >
                💡 <strong>علمی نکتہ:</strong> {item.scholarlyNotes.slice(0, 180)}...
              </div>
            )}
          </div>

          {/* Card Bottom Actions */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              marginTop: 16,
              paddingTop: 12,
              borderTop: '1px solid #F1F5F9',
            }}
          >
            <button
              type="button"
              onClick={() => {
                onShareCard({
                  category: item.category,
                  titleUrdu: item.chapterTitleUrdu,
                  badgeContext: item.sourceWork,
                  arabicText:
                    item.arabicMatn.split('\n')[0]?.slice(0, 320) || item.arabicMatn.slice(0, 320),
                  primaryTextUrdu:
                    item.urduTranslation.split('\n')[0]?.slice(0, 360) ||
                    item.urduTranslation.slice(0, 360),
                  secondaryTextEnglish: item.englishSynopsis
                    ? item.englishSynopsis.slice(0, 240)
                    : undefined,
                  sourceCitation: `${item.sourceWork} · مصدقہ علمی سند`,
                  tafseerInsightUrdu: item.scholarlyNotes
                    ? item.scholarlyNotes.slice(0, 260)
                    : undefined,
                });
              }}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 8,
                backgroundColor: '#065F46',
                color: '#FFFFFF',
                border: 'none',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <span>📸</span>
              <span>امیج کارڈ بنائیں</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const text = encodeURIComponent(
                  `✨ *${item.chapterTitleUrdu}*\n\n` +
                    `*${item.arabicMatn.split('\n')[0] || ''}*\n\n` +
                    `*ترجمہ:*\n${item.urduTranslation.split('\n')[0] || ''}\n\n` +
                    `📖 *ماخذ:* ${item.sourceWork}\n` +
                    `_AMAL OS (amal.life)_`
                );
                window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
              }}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                border: 'none',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
              title="واٹس ایپ پر شیئر کریں"
            >
              <span>💬</span>
            </button>

            <button
              type="button"
              onClick={async () => {
                const text =
                  `✨ ${item.chapterTitleUrdu}\n\n` +
                  `${item.arabicMatn.split('\n')[0] || ''}\n\n` +
                  `${item.urduTranslation.split('\n')[0] || ''}\n\n` +
                  `ماخذ: ${item.sourceWork} — AMAL OS`;
                await navigator.clipboard.writeText(text);
                showAmalToast('متن و حوالہ کاپی کر لیا گیا!', 'success');
              }}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                backgroundColor: '#F8FAFC',
                color: '#475569',
                border: '1px solid #CBD5E1',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
              title="متن کاپی کریں"
            >
              📋
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
