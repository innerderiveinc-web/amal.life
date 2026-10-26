import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { AmalTheme } from '@amal/ui';
import { SirahExplorerRoute } from '../features/sirah/routes/SirahExplorerRoute';
import { SirahEventRecord, ShamailReportRecord, SirahReportVariantRecord } from '@amal/types';
import { sirahEngine } from '@amal/amal-engine';

export default function SirahPage() {
  const [events, setEvents] = useState<SirahEventRecord[]>([]);
  const [shamail, setShamail] = useState<ShamailReportRecord[]>([]);
  const [variants, setVariants] = useState<SirahReportVariantRecord[]>([]);

  useEffect(() => {
    try {
      const timeline = sirahEngine.getTimeline();
      const shamailList = sirahEngine.listShamailReports();
      setEvents(timeline.events || []);
      setShamail(shamailList || []);
      setVariants([]);
    } catch (err) {
      console.error('Failed to load Sirah timeline from engine', err);
    }
  }, []);

  return (
    <div style={{ backgroundColor: AmalTheme.colors.surface.backgroundLight, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>AMAL OS — Prophetic Life Graph & Shama'il</title>
      </Head>
      <Navigation />
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '0 20px 60px' }}>
        {/* Banner connecting text Sirah to canonical Sirah Audiobooks */}
        <div
          style={{
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            borderRadius: 14,
            padding: '14px 18px',
            marginBottom: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#065F46', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>🎧</span>
              <span>۴ شاہکار صوتی کتبِ سیرت و تفصیلی شروحات (Sirah Audiobooks Suite)</span>
            </div>
            <div style={{ fontSize: 12, color: '#047857', marginTop: 2 }}>
              الرحیق المختوم، ضیاء النبی ﷺ، سیرتِ مصطفیٰ ﷺ، اور درسِ شفاء کے مکمل سلسلہ وار دروس سنیں۔
            </div>
          </div>
          <Link
            href="/audio?tab=SIRAH"
            style={{
              textDecoration: 'none',
              padding: '8px 16px',
              backgroundColor: '#065F46',
              color: '#FFFFFF',
              borderRadius: 8,
              fontSize: 12.5,
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: '0 2px 4px rgba(6, 95, 70, 0.2)',
            }}
          >
            <span>سیرت آڈیو پورٹل کھولیں ➔</span>
          </Link>
        </div>

        <SirahExplorerRoute
          events={events}
          shamailReports={shamail}
          variants={variants}
        />
      </main>
    </div>
  );
}
