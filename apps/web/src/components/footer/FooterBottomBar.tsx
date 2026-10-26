import React from 'react';
import Link from 'next/link';

export interface FooterBottomBarProps {
  isUrdu: boolean;
}

export const FooterBottomBar: React.FC<FooterBottomBarProps> = ({ isUrdu }) => {
  return (
    <div
      style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: 22,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
        fontSize: 12,
        color: '#9CA3AF',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 800, color: '#FFFFFF' }}>© 2026 AMAL OS by Qsura India Pvt Ltd.</span>
          <span style={{ color: '#6B7280' }}>
            {isUrdu ? 'تمام حقوق شرعی اغراض کے لیے محفوظ ہیں۔' : 'All Rights Reserved.'}
          </span>
          <span style={{ color: '#10B981', fontWeight: 700 }}>
            · {isUrdu ? 'وقف برائے خدمتِ امتِ محمدیہ ﷺ' : 'Waqf Lil-Ummah'}
          </span>
        </div>
        <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
          Crafted &amp; Stewarded by Qsura India Pvt Ltd · Sadaqah Jariyah Lil-Ummah · Zero Commercial Exploitation · 100% Ad-Free Sovereign Deen OS
        </div>
      </div>

      {/* Quick Legal Pill Links */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <Link
          href="/terms"
          style={{
            color: '#E2E8F0',
            textDecoration: 'none',
            backgroundColor: 'rgba(255,255,255,0.06)',
            padding: '6px 14px',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.12)',
            fontSize: 12,
            fontWeight: 600,
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
          }}
        >
          {isUrdu ? 'شرائط و ضوابط' : 'Terms & Conditions'}
        </Link>

        <Link
          href="/privacy"
          style={{
            color: '#34D399',
            textDecoration: 'none',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            padding: '6px 14px',
            borderRadius: 20,
            border: '1px solid rgba(52, 211, 153, 0.3)',
            fontSize: 12,
            fontWeight: 700,
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.22)';
            e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(52, 211, 153, 0.3)';
          }}
        >
          {isUrdu ? 'پرائیویسی پالیسی' : 'Privacy Policy'}
        </Link>

        <Link
          href="/copyright"
          style={{
            color: '#E2E8F0',
            textDecoration: 'none',
            backgroundColor: 'rgba(255,255,255,0.06)',
            padding: '6px 14px',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.12)',
            fontSize: 12,
            fontWeight: 600,
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
          }}
        >
          {isUrdu ? 'کاپی رائٹ و وقف' : 'Copyright & Waqf'}
        </Link>

        <Link
          href="/contact"
          style={{
            color: '#E2E8F0',
            textDecoration: 'none',
            backgroundColor: 'rgba(255,255,255,0.06)',
            padding: '6px 14px',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.12)',
            fontSize: 12,
            fontWeight: 600,
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
          }}
        >
          {isUrdu ? 'رابطہ و تعاون' : 'Contact & Support'}
        </Link>
      </div>
    </div>
  );
};
