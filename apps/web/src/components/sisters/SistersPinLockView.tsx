import React from 'react';

export interface SistersPinLockViewProps {
  isUrdu: boolean;
  enteredPin: string;
  pinError: string;
  setEnteredPin: (val: string) => void;
  onUnlockPin: () => void;
  onRemovePin: () => void;
}

export const SistersPinLockView: React.FC<SistersPinLockViewProps> = ({
  isUrdu,
  enteredPin,
  pinError,
  setEnteredPin,
  onUnlockPin,
  onRemovePin,
}) => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 36,
        border: '1px solid #E5E7EB',
        maxWidth: 420,
        margin: '40px auto',
        textAlign: 'center',
        boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 12 }}>🔒</div>
      <h2 style={{ fontSize: 20, fontWeight: 800, color: '#064E3B', margin: '0 0 6px 0' }}>
        {isUrdu ? 'نجی گوشہ لاک ہے' : 'Private Sanctuary Locked'}
      </h2>
      <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 20 }}>
        {isUrdu
          ? 'اپنے مخصوص ایام کے اندراجات اور نجی ڈائری دیکھنے کے لیے ۴ ہندسوں کا پن کوڈ درج کریں۔'
          : 'Enter your 4-digit PIN to access your personal cycle logs and reflections.'}
      </p>

      <input
        type="password"
        maxLength={4}
        placeholder="••••"
        value={enteredPin}
        onChange={(e) => setEnteredPin(e.target.value)}
        style={{
          width: 140,
          padding: '10px 16px',
          fontSize: 24,
          textAlign: 'center',
          letterSpacing: 8,
          borderRadius: 10,
          border: '2px solid #064E3B',
          marginBottom: 12,
        }}
      />

      {pinError && (
        <div style={{ color: '#DC2626', fontSize: 12, marginBottom: 12 }}>
          {pinError}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
        <button
          onClick={onUnlockPin}
          style={{
            backgroundColor: '#064E3B',
            color: '#FFFFFF',
            border: 'none',
            padding: '10px 24px',
            borderRadius: 10,
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          {isUrdu ? 'ان لاک کریں' : 'Unlock'}
        </button>
        <button
          onClick={onRemovePin}
          style={{
            backgroundColor: 'transparent',
            color: '#EF4444',
            border: 'none',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          {isUrdu ? 'پن بھول گئے؟' : 'Forgot PIN?'}
        </button>
      </div>
    </div>
  );
};
