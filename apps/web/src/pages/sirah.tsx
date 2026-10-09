import React, { useEffect, useState } from 'react';
import Head from 'next/head';
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
        <SirahExplorerRoute
          events={events}
          shamailReports={shamail}
          variants={variants}
        />
      </main>
    </div>
  );
}
