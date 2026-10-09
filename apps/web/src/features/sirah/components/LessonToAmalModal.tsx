import React from 'react';
import { SirahAmalMappingRecord } from '@amal/types';
import { AmalTheme } from '@amal/ui';

interface LessonToAmalModalProps {
  mapping: SirahAmalMappingRecord;
  onClose: () => void;
  onCommit: (mapping: SirahAmalMappingRecord) => void;
}

export const LessonToAmalModal: React.FC<LessonToAmalModalProps> = ({
  mapping,
  onClose,
  onCommit,
}) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 20,
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        maxWidth: 540,
        width: '100%',
        padding: 24,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: AmalTheme.colors.primary, letterSpacing: 1 }}>
            TRANSLATE LESSON TO PRACTICAL AMAL
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer' }}>✕</button>
        </div>

        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>
          {mapping.practice_title}
        </h3>

        <div style={{ fontSize: 13, color: '#444', backgroundColor: '#F9F9F9', padding: 12, borderRadius: 10 }}>
          <strong>Derived Moral Lesson:</strong>
          <p style={{ margin: '4px 0 0', color: '#666' }}>{mapping.derived_lesson}</p>
        </div>

        <div style={{ fontSize: 13, color: '#1565C0', backgroundColor: '#E3F2FD', padding: 12, borderRadius: 10 }}>
          <strong>Actionable Step:</strong>
          <p style={{ margin: '4px 0 0' }}>{mapping.actionable_step}</p>
        </div>

        {/* Non-Invented Obligation Invariant Warning */}
        <div style={{
          backgroundColor: '#FFF8E1',
          borderLeft: '4px solid #FFA000',
          padding: 12,
          borderRadius: 8,
          fontSize: 12,
          color: '#E65100',
          lineHeight: 1.5,
        }}>
          <strong>Non-Invented Obligation Notice:</strong> {mapping.non_invented_obligation_disclaimer}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: '1px solid #CCC',
              backgroundColor: '#FFF',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onCommit(mapping)}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              border: 'none',
              backgroundColor: AmalTheme.colors.primary,
              color: '#FFF',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            Add to My Daily Amal Plan
          </button>
        </div>
      </div>
    </div>
  );
};
