import React from 'react';
import Link from 'next/link';

export function FinancialLifecycleBar() {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        border: '1px solid #E5E7EB',
        marginTop: 28,
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      <div>
        <span style={{ fontSize: 11, fontWeight: 800, color: '#92400E', letterSpacing: 1 }}>
          FINANCIAL LIFECYCLE (مالیاتی فقہ اور تنازعات کا حل)
        </span>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginTop: 2 }}>
          Need Scholar Review, Family Allocation, or Dispute Resolution?
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Link
          href="/decision-room"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            borderRadius: 8,
            backgroundColor: '#FEF3C7',
            color: '#92400E',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: 13,
            border: '1px solid #FCD34D',
          }}
        >
          <span>⚖️ Deen Decision Room</span>
        </Link>
        <Link
          href="/family"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            borderRadius: 8,
            backgroundColor: '#F3F4F6',
            color: '#374151',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: 13,
            border: '1px solid #E5E7EB',
          }}
        >
          <span>👨‍👩‍👧‍👦 Family Deen Circles</span>
        </Link>
        <Link
          href="/ask"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            borderRadius: 8,
            backgroundColor: '#F3F4F6',
            color: '#374151',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: 13,
            border: '1px solid #E5E7EB',
          }}
        >
          <span>💬 Ask Certified Mufti</span>
        </Link>
      </div>
    </div>
  );
}
