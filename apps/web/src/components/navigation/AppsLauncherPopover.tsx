import React from 'react';
import Link from 'next/link';

export interface NavAppItem {
  title: string;
  titleUrdu: string;
  href: string;
  icon: string;
}

export interface AppsLauncherPopoverProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  allApps: NavAppItem[];
  currentLang: 'en' | 'ur' | 'ar';
  currentPath: string;
}

export const AppsLauncherPopover: React.FC<AppsLauncherPopoverProps> = ({
  isOpen,
  onToggle,
  onClose,
  allApps,
  currentLang,
  currentPath,
}) => {
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={onToggle}
        aria-label="Open AMAL All Apps and Hubs Menu"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          border: '1px solid #E2E8F0',
          borderRadius: 8,
          padding: '6px 12px',
          backgroundColor: isOpen ? '#064E3B' : '#FFFFFF',
          color: isOpen ? '#FFFFFF' : '#1E293B',
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          transition: 'all 0.15s ease',
        }}
        title="All 15 AMAL OS Applications"
      >
        <span style={{ fontSize: 13 }}>⠿</span>
        <span>{currentLang === 'ur' ? 'تمام ایپس' : 'All Apps'}</span>
      </button>

      {/* 9-Dots Popover Grid */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '115%',
            right: 0,
            backgroundColor: '#FFFFFF',
            borderRadius: 14,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.08)',
            border: '1px solid #E5E7EB',
            width: 'min(380px, calc(100vw - 32px))',
            padding: 16,
            zIndex: 1200,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
              paddingBottom: 8,
              borderBottom: '1px solid #F3F4F6',
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 800, color: '#111827' }}>
              AMAL OS SUITE (15 MODULES)
            </span>
            <span style={{ fontSize: 11, color: '#047857', fontWeight: 600 }}>Local Offline Engines</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 10,
            }}
          >
            {allApps.map((app) => (
              <Link
                key={app.href}
                href={app.href}
                onClick={onClose}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '10px 6px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  backgroundColor: currentPath === app.href ? '#ECFDF5' : '#F9FAFB',
                  border: `1px solid ${currentPath === app.href ? '#A7F3D0' : '#F3F4F6'}`,
                }}
              >
                <span style={{ fontSize: 22, marginBottom: 4 }}>{app.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#1F2937', lineHeight: 1.2 }}>
                  {currentLang === 'ur' ? app.titleUrdu : app.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
