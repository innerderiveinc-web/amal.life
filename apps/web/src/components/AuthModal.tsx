import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { showAmalToast } from './Toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { user, signIn, register, continueAsGuest, signOut, exportSovereignData } = useAuth();
  const [activeTab, setActiveTab] = useState<'SIGNIN' | 'REGISTER' | 'PROFILE'>(
    user && !user.isGuest ? 'PROFILE' : 'SIGNIN'
  );

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [madhhab, setMadhhab] = useState<'Hanafi' | 'Shafi\'i' | 'Maliki' | 'Hanbali'>('Hanafi');
  const [city, setCity] = useState('Delhi, India');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showAmalToast('Please enter your email', 'warning');
      return;
    }
    setIsSubmitting(true);
    const success = await signIn(email, password);
    setIsSubmitting(false);
    if (success) onClose();
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      showAmalToast('Please enter your name and email', 'warning');
      return;
    }
    setIsSubmitting(true);
    const success = await register({ name, email, password, madhhab, city });
    setIsSubmitting(false);
    if (success) onClose();
  };

  const handleQuickDemo = async () => {
    setIsSubmitting(true);
    const success = await signIn('seeker@amal.local', 'amal2026');
    setIsSubmitting(false);
    if (success) onClose();
  };

  const isGuest = user?.isGuest ?? true;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          width: '100%',
          maxWidth: 480,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #E5E7EB',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #064E3B 0%, #0F291E 100%)',
            padding: '24px 28px',
            color: '#FFFFFF',
            position: 'relative',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 18,
              right: 18,
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              color: '#FFFFFF',
              width: 32,
              height: 32,
              borderRadius: '50%',
              fontSize: 16,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 24 }}>👤</span>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: -0.3 }}>
                AMAL OS اکاؤنٹ و شناخت
              </h2>
              <div style={{ fontSize: 11, color: '#A7F3D0', fontWeight: 600 }}>
                Sovereign Identity &amp; Cross-Device Cloud Sync
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '8px 0 0', fontSize: 11, color: '#A7F3D0', fontWeight: 600, flexWrap: 'wrap' }}>
            <span>🔒 100% Private</span>
            <span>•</span>
            <span>Zero Tracking</span>
            <span>•</span>
            <span>Ad-Free</span>
            <span>•</span>
            <span>محفوظ نجی سنک</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #E5E7EB',
            backgroundColor: '#F9FAFB',
            padding: '4px 8px',
            gap: 6,
          }}
        >
          {!isGuest ? (
            <button
              onClick={() => setActiveTab('PROFILE')}
              style={{
                flex: 1,
                padding: '10px 12px',
                border: 'none',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                backgroundColor: activeTab === 'PROFILE' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'PROFILE' ? '#065F46' : '#6B7280',
                boxShadow: activeTab === 'PROFILE' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer',
              }}
            >
              My Profile · پروفائل
            </button>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('SIGNIN')}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  backgroundColor: activeTab === 'SIGNIN' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'SIGNIN' ? '#065F46' : '#6B7280',
                  boxShadow: activeTab === 'SIGNIN' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer',
                }}
              >
                Sign In · لاگ ان
              </button>
              <button
                onClick={() => setActiveTab('REGISTER')}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  backgroundColor: activeTab === 'REGISTER' ? '#FFFFFF' : 'transparent',
                  color: activeTab === 'REGISTER' ? '#065F46' : '#6B7280',
                  boxShadow: activeTab === 'REGISTER' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer',
                }}
              >
                Register · نیا اکاؤنٹ
              </button>
            </>
          )}
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto' }}>
          {/* TAB 1: SIGN IN */}
          {activeTab === 'SIGNIN' && (
            <form onSubmit={handleSignInSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>
                    Email Address
                  </label>
                  <span style={{ fontSize: 12, color: '#6B7280' }}>
                    ای میل ایڈریس
                  </span>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
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
                    پاسورڈ
                  </span>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
                  cursor: 'pointer',
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
                  onClick={() => {
                    continueAsGuest();
                    onClose();
                  }}
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
          )}

          {/* TAB 2: REGISTER */}
          {activeTab === 'REGISTER' && (
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
                    Email Address
                  </label>
                  <span style={{ fontSize: 12, color: '#6B7280' }}>
                    ای میل ایڈریس
                  </span>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ashraf@example.com"
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
                  cursor: 'pointer',
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
          )}

          {/* TAB 3: SIGNED IN PROFILE VIEW */}
          {activeTab === 'PROFILE' && user && !user.isGuest && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Profile Card */}
              <div
                style={{
                  backgroundColor: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  borderRadius: 12,
                  padding: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: '#065F46',
                    color: '#FFFFFF',
                    fontSize: 20,
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#064E3B' }}>{user.name}</div>
                  <div style={{ fontSize: 12, color: '#047857' }}>{user.email}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, backgroundColor: '#D1FAE5', color: '#065F46', padding: '1px 6px', borderRadius: 4 }}>
                      {user.madhhab} Fiqh
                    </span>
                    <span style={{ fontSize: 10, fontWeight: 700, backgroundColor: '#D1FAE5', color: '#065F46', padding: '1px 6px', borderRadius: 4 }}>
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sync Status Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: 10,
                  border: '1px solid #E2E8F0',
                  fontSize: 13,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }}></span>
                  <span style={{ fontWeight: 700, color: '#1E293B' }}>Cloud Sync Active</span>
                </div>
                <span style={{ fontSize: 11, color: '#64748B' }}>
                  Device &amp; Family Circles Connected
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  type="button"
                  onClick={exportSovereignData}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1px solid #D1D5DB',
                    backgroundColor: '#FFFFFF',
                    color: '#374151',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <span>📥</span>
                  <span>Export Sovereign Data (.json)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setActiveTab('SIGNIN');
                  }}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1px solid #FCA5A5',
                    backgroundColor: '#FEF2F2',
                    color: '#DC2626',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <span>🚪</span>
                  <span>سائن آؤٹ کریں · Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
