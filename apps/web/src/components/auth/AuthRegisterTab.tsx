import React from 'react';

export interface AuthRegisterTabProps {
  username: string;
  setUsername: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  madhhab: 'Hanafi' | 'Shafi\'i' | 'Maliki' | 'Hanbali';
  setMadhhab: (val: 'Hanafi' | 'Shafi\'i' | 'Maliki' | 'Hanbali') => void;
  city: string;
  setCity: (val: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export const AuthRegisterTab: React.FC<AuthRegisterTabProps> = ({
  username,
  setUsername,
  name,
  setName,
  password,
  setPassword,
  madhhab,
  setMadhhab,
  city,
  setCity,
  isSubmitting,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
            Username (Unique ID)
          </label>
          <span style={{ fontSize: 12, color: '#6B7280' }}>
            صارف کا شناختی نام (لاگ ان کے لیے)
          </span>
        </div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_.-]/g, ''))}
          placeholder="ashraf786 (حروف و ہندسے)"
          required
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: 10,
            border: '1.5px solid #D1D5DB',
            fontSize: 14,
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
            Full Name / Title
          </label>
          <span style={{ fontSize: 12, color: '#6B7280' }}>
            پورا نام
          </span>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Muhammad Ashraf"
          required
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: 10,
            border: '1.5px solid #D1D5DB',
            fontSize: 14,
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
            Password
          </label>
          <span style={{ fontSize: 12, color: '#6B7280' }}>
            پاسورڈ / خفیہ پن
          </span>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="•••••••• (کم از کم ۴ حروف یا ہندسے)"
          required
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: 10,
            border: '1.5px solid #D1D5DB',
            fontSize: 14,
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
            Primary Fiqh School (Madhhab)
          </label>
          <span style={{ fontSize: 12, color: '#6B7280' }}>
            فقہی مسلک
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          {(['Hanafi', 'Shafi\'i', 'Maliki', 'Hanbali'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMadhhab(m)}
              style={{
                padding: '8px 10px',
                borderRadius: 8,
                border: madhhab === m ? '2px solid #065F46' : '1px solid #D1D5DB',
                backgroundColor: madhhab === m ? '#ECFDF5' : '#FFFFFF',
                color: madhhab === m ? '#065F46' : '#374151',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {m === 'Hanafi' ? 'Hanafi · حنفی' : m === 'Shafi\'i' ? 'Shafi\'i · شافعی' : m === 'Maliki' ? 'Maliki · مالکی' : 'Hanbali · حنبلی'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
            City &amp; Country (Prayer Times)
          </label>
          <span style={{ fontSize: 12, color: '#6B7280' }}>
            شہر و ملک
          </span>
        </div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Delhi / Mumbai / Lucknow / Bareilly, India"
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: 10,
            border: '1.5px solid #D1D5DB',
            fontSize: 14,
            boxSizing: 'border-box',
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
        <span>{isSubmitting ? 'اکاؤنٹ بن رہا ہے...' : 'نیا اکاؤنٹ بنائیں · Create Account'}</span>
        <span>✓</span>
      </button>
    </form>
  );
};
