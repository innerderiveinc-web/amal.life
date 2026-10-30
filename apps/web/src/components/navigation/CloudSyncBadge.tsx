import React, { useState, useEffect } from 'react';
import { cloudSyncService, SyncState } from '../../services/cloud-sync-service';
import { useLanguage } from '../../context/LanguageContext';

export interface CloudSyncBadgeProps {
  currentLang?: string;
}

export const CloudSyncBadge: React.FC<CloudSyncBadgeProps> = () => {
  const { t } = useLanguage();
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

  let icon = '🟢';
  let label = t('Cloud Synced', 'محفوظ کلاؤڈ', 'سحابي متزامن', 'Cloud Synced');
  let title = t(
    'State synced with AMAL cloud session across your devices. Click to re-sync now.',
    'کلاؤڈ سیشن تمام ڈیوائسز پر ہم آہنگ ہے۔ ابھی دوبارہ سنک کرنے کے لیے کلک کریں۔',
    'الحالة متزامنة مع الجلسة السحابية عبر جميع أجهزتك.',
    'Amal cloud session tamam devices par sync hai.'
  );
  let bg = 'rgba(16, 185, 129, 0.15)';
  let border = 'rgba(52, 211, 153, 0.3)';
  let color = '#86EFAC';

  if (syncState.status === 'SYNCING') {
    icon = '🔄';
    label = t('Syncing...', 'ہم آہنگ ہو رہا ہے...', 'جاري المزامنة...', 'Syncing...');
    title = t(
      'Synchronizing bookmarks and preferences with cloud...',
      'بک مارکس اور ترجیحات کلاؤڈ کے ساتھ ہم آہنگ ہو رہی ہیں...',
      'جاري مزامنة الإشارات المرجعية والتفضيلات سحابياً...',
      'Bookmarks aur tarjeehaat sync ho rahi hain...'
    );
    bg = 'rgba(59, 130, 246, 0.15)';
    border = 'rgba(96, 165, 250, 0.3)';
    color = '#93C5FD';
  } else if (syncState.status === 'OFFLINE') {
    icon = '📡';
    label = t('Offline', 'آف لائن', 'غير متصل', 'Offline');
    title = t(
      'Working offline. Changes will auto-sync when connection is restored.',
      'آف لائن موڈ۔ رابطہ بحال ہونے پر تبدیلیاں خود بخود ہم آہنگ ہو جائیں گی۔',
      'العمل دون اتصال. ستتم المزامنة تلقائياً عند استعادة الاتصال.',
      'Offline mode. Connection aane par auto-sync ho jayega.'
    );
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
        backgroundColor: bg,
        color: color,
        fontSize: 10,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      title={title}
      aria-label={label}
    >
      <span style={{ fontSize: 10 }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
};
