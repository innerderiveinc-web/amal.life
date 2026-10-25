import React from 'react';

export interface AuthSignInTabProps {
  username: string;
  setUsername: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onContinueAsGuest: () => void;
}

export const AuthSignInTab: React.FC<AuthSignInTabProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  isSubmitting,
  onSubmit,
  onContinueAsGuest,
}) => {
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
            Username
          </label>
          <span style={{ fontSize: 12, color: '#6B7280' }}>
            صارف کا نام / شناختی نام
          </span>
        </div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="ashraf786"
          required
          style={{
            width: '100%',
            padding: '11px 14px',
            borderRadius: 10,
            border: '1.5px solid #D1D5DB',
            fontSize: 14,
            boxSizing: 'border-box',
            outline: 'none',
          }}
        />
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
            Password
          </label>
          <span style={{ fontSize: 12, color: '#6B7280' }}>
            پاسورڈ / خفیہ کوڈ
          </span>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          style={{
            width: '100%',
            padding: '11px 14px',
            borderRadius: 10,
            border: '1.5px solid #D1D5DB',
            fontSize: 14,
            boxSizing: 'border-box',
            outline: 'none',
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          backgroundColor: '#065F46',
          color: '#FFFFFF',
          padding: '12px 16px',
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 800,
          border: 'none',
          cursor: isSubmitting ? 'wait' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          marginTop: 6,
        }}
      >
        <span>{isSubmitting ? 'تصدیق ہو رہی ہے...' : 'Sign In · لاگ ان کریں'}</span>
        <span>➔</span>
      </button>

      <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 14, textAlign: 'center' }}>
        <button
          type="button"
          onClick={onContinueAsGuest}
          style={{
            background: 'none',
            border: 'none',
            color: '#065F46',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            padding: '6px 12px',
          }}
        >
          بغیر اکاؤنٹ کے آف لائن استعمال جاری رکھیں · Continue as Sovereign Guest →
        </button>
      </div>
    </form>
  );
};
