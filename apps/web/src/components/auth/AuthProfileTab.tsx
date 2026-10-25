import React from 'react';

export interface AuthProfileTabProps {
  user: {
    name: string;
    username?: string;
    madhhab?: string;
    role?: string;
  };
  onExportSovereignData: () => void;
  onSignOut: () => void;
}

export const AuthProfileTab: React.FC<AuthProfileTabProps> = ({
  user,
  onExportSovereignData,
  onSignOut,
}) => {
  return (
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
            backgroundColor: '#064E3B',
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
          <div style={{ fontSize: 12, color: '#047857', fontWeight: 600 }}>@{user.username || 'seeker'}</div>
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
          onClick={onExportSovereignData}
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
          onClick={onSignOut}
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
  );
};
