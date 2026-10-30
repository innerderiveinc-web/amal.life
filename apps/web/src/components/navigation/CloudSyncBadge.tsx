import React, { useState, useEffect } from 'react';
import { cloudSyncService, SyncState } from '../../services/cloud-sync-service';

export interface CloudSyncBadgeProps {
  currentLang: string;
}

export const CloudSyncBadge: React.FC<CloudSyncBadgeProps> = ({ currentLang }) => {
  const [mounted, setMounted] = useState(false);
  const [syncState, setSyncState] = useState<SyncState>({
    status: 'LOCAL_ONLY',
    pendingChanges: false,
    lastSyncedAt: null,
    version: 0,
  });

  useEffect(() => {
    setMounted(true);
    setSyncState(cloudSyncService.getStatus());
    const unsubscribe = cloudSyncService.subscribe((state) => {
      setSyncState(state);
    });
    return unsubscribe;
  }, []);

  const handleClick = () => {
    cloudSyncService.pushSync();
  };

  // Prevent SSR / Client hydration mismatch by ensuring mounted state
  if (!mounted || syncState.status === 'LOCAL_ONLY') {
    return null;
  }

  const isUrdu = currentLang === 'ur';

  let icon = '🟢';
  let label = isUrdu ? 'محفوظ کلاؤڈ' : 'Cloud Synced';
  let title = 'State synced with AMAL cloud session across your devices. Click to re-sync now.';
  let bg = 'rgba(16, 185, 129, 0.15)';
  let border = 'rgba(52, 211, 153, 0.3)';
  let color = '#86EFAC';

  if (syncState.status === 'SYNCING') {
    icon = '🔄';
    label = isUrdu ? 'ہم آہنگ ہو رہا ہے...' : 'Syncing...';
    title = 'Synchronizing bookmarks and preferences with cloud...';
    bg = 'rgba(59, 130, 246, 0.15)';
    border = 'rgba(96, 165, 250, 0.3)';
    color = '#93C5FD';
  } else if (syncState.status === 'OFFLINE') {
    icon = '📡';
    label = isUrdu ? 'آف لائن' : 'Offline';
    title = 'Working offline. Changes will auto-sync when connection is restored.';
    bg = 'rgba(245, 158, 11, 0.15)';
    border = 'rgba(251, 191, 36, 0.3)';
    color = '#FDE68A';
  }

  return (
    <button
      onClick={handleClick}
      style={{
        border: `1px solid ${border}`,
        borderRadius: 14,
        padding: '3px 9px',
        fontSize: 10,
        fontWeight: 600,
        backgroundColor: bg,
        color: color,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        transition: 'all 0.15s ease',
      }}
      title={title}
      aria-label={`Cloud Sync Status: ${label}`}
    >
      <span style={{ fontSize: 9 }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
};
