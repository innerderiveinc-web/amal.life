import React from 'react';
import { FiqhRulingItem } from '../../lib/women-sanctuary-data';

export interface FiqhRulingCardListProps {
  isUrdu: boolean;
  filteredFiqh: FiqhRulingItem[];
  onGenerateFiqhCard: (ruling: FiqhRulingItem) => void;
}

export const FiqhRulingCardList: React.FC<FiqhRulingCardListProps> = ({
  isUrdu,
  filteredFiqh,
  onGenerateFiqhCard,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {filteredFiqh.map((item) => (
        <div
          key={item.id}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 14,
            padding: 20,
            border: '1px solid #E5E7EB',
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: 800,
                color: '#064E3B',
              }}
            >
              {isUrdu ? item.titleUrdu : item.titleEnglish}
            </h3>
            <span
              style={{
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                padding: '3px 8px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {item.hanafiReference}
            </span>
          </div>
          <div
            style={{
              fontSize: 12,
              color: '#059669',
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            {isUrdu ? item.titleEnglish : item.titleUrdu}
          </div>

          <p
            style={{
              fontSize: 14,
              color: '#1F2937',
              fontWeight: 600,
              lineHeight: 1.6,
              marginBottom: 10,
            }}
          >
            {isUrdu ? item.summaryUrdu : item.summaryEnglish}
          </p>

          <p
            style={{
              fontSize: 14,
              color: '#4B5563',
              lineHeight: 1.7,
              marginBottom: 14,
            }}
          >
            {isUrdu ? item.detailedRulingUrdu : item.detailedRulingEnglish || item.detailedRulingUrdu}
          </p>

          <div
            style={{
              backgroundColor: '#F9FAFB',
              padding: 12,
              borderRadius: 10,
              border: '1px solid #F3F4F6',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#064E3B',
                marginBottom: 4,
              }}
            >
              {isUrdu ? 'عملی ہدایات و فقہی احتیاطیں:' : 'Practical Guidelines:'}
            </div>
            <ul
              style={{
                margin: 0,
                paddingInlineStart: 18,
                fontSize: 13,
                color: '#374151',
                lineHeight: 1.6,
              }}
            >
              {((isUrdu || !item.practicalGuidelinesEnglish)
                ? item.practicalGuidelines
                : item.practicalGuidelinesEnglish
              ).map((g, idx) => (
                <li key={idx}>{g}</li>
              ))}
            </ul>
          </div>

          <div
            style={{
              marginTop: 12,
              display: 'flex',
              justifyContent: 'flex-end',
              borderTop: '1px solid #F3F4F6',
              paddingTop: 10,
            }}
          >
            <button
              onClick={() => onGenerateFiqhCard(item)}
              style={{
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                border: '1px solid #A7F3D0',
                padding: '5px 12px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>🎨</span>
              <span>{isUrdu ? 'فقہی کارڈ بنائیں' : 'Generate Fiqh Card'}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
