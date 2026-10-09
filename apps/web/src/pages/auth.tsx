import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { useAuth } from '../context/AuthContext';
import { showAmalToast } from '../components/Toast';

export default function AuthPage() {
  const { user, signIn, register, continueAsGuest, signOut, exportSovereignData } = useAuth();
  const [mode, setMode] = useState<'SIGNIN' | 'REGISTER'>('SIGNIN');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [madhhab, setMadhhab] = useState<'Hanafi' | 'Shafi\'i' | 'Maliki' | 'Hanbali'>('Hanafi');
  const [city, setCity] = useState('Delhi, India');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    await signIn(email, password);
    setIsSubmitting(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setIsSubmitting(true);
    await register({ name, email, password, madhhab, city });
    setIsSubmitting(false);
  };

  const isGuest = user?.isGuest ?? true;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
      <Head>
        <title>Account, Sign In &amp; Sovereign Identity | AMAL OS</title>
      </Head>

      <Navigation />

      <main style={{ maxWidth: 540, margin: '40px auto', padding: '0 20px' }}>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            border: '1px solid #E5E7EB',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #064E3B 0%, #0F291E 100%)',
              padding: '28px 32px',
              color: '#FFFFFF',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: 36, display: 'block', marginBottom: 8 }}>👤</span>
            <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0, letterSpacing: -0.3 }}>
              AMAL OS اکاؤنٹ و کلاؤڈ سنک
            </h1>
            <p style={{ margin: '8px 0 0', fontSize: 13, color: '#A7F3D0' }}>
              Sovereign Identity · Multi-Device Cloud Sync · Zero-Ad Architecture
            </p>
          </div>

          <div style={{ padding: '28px 32px' }}>
            {!isGuest && user ? (
              /* Already Signed In View */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div
                  style={{
                    backgroundColor: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    borderRadius: 14,
                    padding: 20,
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      backgroundColor: '#065F46',
                      color: '#FFF',
                      fontSize: 24,
                      fontWeight: 800,
                      margin: '0 auto 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#064E3B' }}>{user.name}</h3>
                  <div style={{ fontSize: 13, color: '#047857', marginTop: 4 }}>{user.email}</div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, backgroundColor: '#D1FAE5', color: '#065F46', padding: '2px 8px', borderRadius: 12 }}>
                      {user.madhhab} Fiqh
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, backgroundColor: '#D1FAE5', color: '#065F46', padding: '2px 8px', borderRadius: 12 }}>
                      {user.city}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <button
                    onClick={exportSovereignData}
                    style={{
                      padding: '12px',
                      borderRadius: 10,
                      border: '1px solid #D1D5DB',
                      backgroundColor: '#FFFFFF',
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    📥 Export All Data (.json)
                  </button>

                  <button
                    onClick={signOut}
                    style={{
                      padding: '12px',
                      borderRadius: 10,
                      border: '1px solid #FCA5A5',
                      backgroundColor: '#FEF2F2',
                      color: '#DC2626',
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    🚪 سائن آؤٹ کریں (Sign Out)
                  </button>

                  <Link
                    href="/"
                    style={{
                      textAlign: 'center',
                      padding: '12px',
                      borderRadius: 10,
                      backgroundColor: '#065F46',
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      fontSize: 14,
                      fontWeight: 800,
                    }}
                  >
                    ہوم پیج پر واپس جائیں (Back to Home)
                  </Link>
                </div>
              </div>
            ) : (
              /* Auth Form (Sign In / Register) */
              <div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 24, borderBottom: '1px solid #E5E7EB', paddingBottom: 8 }}>
                  <button
                    onClick={() => setMode('SIGNIN')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 800,
                      backgroundColor: mode === 'SIGNIN' ? '#ECFDF5' : 'transparent',
                      color: mode === 'SIGNIN' ? '#065F46' : '#6B7280',
                      cursor: 'pointer',
                    }}
                  >
                    Sign In · لاگ ان
                  </button>
                  <button
                    onClick={() => setMode('REGISTER')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 800,
                      backgroundColor: mode === 'REGISTER' ? '#ECFDF5' : 'transparent',
                      color: mode === 'REGISTER' ? '#065F46' : '#6B7280',
                      cursor: 'pointer',
                    }}
                  >
                    Register · نیا اکاؤنٹ
                  </button>
                </div>

                {mode === 'SIGNIN' ? (
                  <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #D1D5DB', fontSize: 14, boxSizing: 'border-box' }}
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
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #D1D5DB', fontSize: 14, boxSizing: 'border-box' }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: '#065F46',
                        color: '#FFFFFF',
                        padding: '13px 18px',
                        borderRadius: 10,
                        fontSize: 15,
                        fontWeight: 800,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {isSubmitting ? 'تصدیق ہو رہی ہے...' : 'Sign In · لاگ ان کریں'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #D1D5DB', fontSize: 14, boxSizing: 'border-box' }}
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
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #D1D5DB', fontSize: 14, boxSizing: 'border-box' }}
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
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid #D1D5DB', fontSize: 14, boxSizing: 'border-box' }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: '#065F46',
                        color: '#FFFFFF',
                        padding: '13px 18px',
                        borderRadius: 10,
                        fontSize: 15,
                        fontWeight: 800,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {isSubmitting ? 'اکاؤنٹ بن رہا ہے...' : 'نیا اکاؤنٹ بنائیں · Create Account'}
                    </button>
                  </form>
                )}

                <div style={{ marginTop: 20, textAlign: 'center', borderTop: '1px solid #E5E7EB', paddingTop: 14 }}>
                  <button
                    type="button"
                    onClick={continueAsGuest}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#6B7280',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    بغیر اکاؤنٹ کے آف لائن موڈ میں جاری رکھیں (Continue as Guest)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
