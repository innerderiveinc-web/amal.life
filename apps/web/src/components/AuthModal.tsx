import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { showAmalToast } from './Toast';
import { AuthSignInTab } from './auth/AuthSignInTab';
import { AuthRegisterTab } from './auth/AuthRegisterTab';
import { AuthProfileTab } from './auth/AuthProfileTab';

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [madhhab, setMadhhab] = useState<'Hanafi' | 'Shafi\'i' | 'Maliki' | 'Hanbali'>('Hanafi');
  const [city, setCity] = useState('Delhi, India');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      showAmalToast('Please enter your username', 'warning');
      return;
    }
    if (!password.trim()) {
      showAmalToast('Please enter your password', 'warning');
      return;
    }
    setIsSubmitting(true);
    const success = await signIn(username, password);
    setIsSubmitting(false);
    if (success) onClose();
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      showAmalToast('Please choose a username', 'warning');
      return;
    }
    if (!name.trim()) {
      showAmalToast('Please enter your full name', 'warning');
      return;
    }
    if (!password.trim() || password.length < 4) {
      showAmalToast('Please enter a password (min 4 characters)', 'warning');
      return;
    }
    setIsSubmitting(true);
    const success = await register({ username, name, password, madhhab, city });
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
          {activeTab === 'SIGNIN' && (
            <AuthSignInTab
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              isSubmitting={isSubmitting}
              onSubmit={handleSignInSubmit}
              onContinueAsGuest={() => {
                continueAsGuest();
                onClose();
              }}
            />
          )}

          {activeTab === 'REGISTER' && (
            <AuthRegisterTab
              username={username}
              setUsername={setUsername}
              name={name}
              setName={setName}
              password={password}
              setPassword={setPassword}
              madhhab={madhhab}
              setMadhhab={setMadhhab}
              city={city}
              setCity={setCity}
              isSubmitting={isSubmitting}
              onSubmit={handleRegisterSubmit}
            />
          )}

          {activeTab === 'PROFILE' && user && !user.isGuest && (
            <AuthProfileTab
              user={user}
              onExportSovereignData={exportSovereignData}
              onSignOut={() => {
                signOut();
                setActiveTab('SIGNIN');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
