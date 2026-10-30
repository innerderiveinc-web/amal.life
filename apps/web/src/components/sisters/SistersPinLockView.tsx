import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export interface SistersPinLockViewProps {
  isUrdu: boolean;
  enteredPin: string;
  pinError: string;
  setEnteredPin: (val: string) => void;
  onUnlockPin: () => void;
  onRemovePin: () => void;
}

export const SistersPinLockView: React.FC<SistersPinLockViewProps> = ({
  isUrdu: propIsUrdu,
  enteredPin,
  pinError,
  setEnteredPin,
  onUnlockPin,
  onRemovePin,
}) => {
  const { t } = useLanguage();
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
        {t(
          'Private Sanctuary Locked',
          'نجی گوشہ لاک ہے',
          'الخزانة الخاصة مقفلة',
          'Niji Gosha Locked Hai'
        )}
      </h2>
      <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 20 }}>
        {t(
          'Enter your 4-digit PIN to access your personal cycle logs and reflections.',
          'اپنے مخصوص ایام کے اندراجات اور نجی ڈائری دیکھنے کے لیے ۴ ہندسوں کا پن کوڈ درج کریں۔',
          'أدخل رمز الدخول المكون من ٤ أرقام للوصول إلى سجلاتك الخاصة.',
          'Apne makhsoos ayaam ke indrajat dekhne ke liye 4 hindson ka PIN code darj karein.'
        )}
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
          {t('Unlock', 'ان لاک کریں', 'فتح القفل', 'Unlock Karein')}
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
          {t('Forgot PIN?', 'پن بھول گئے؟', 'نسيت الرمز؟', 'PIN Bhool Gaye?')}
        </button>
      </div>
    </div>
  );
};
