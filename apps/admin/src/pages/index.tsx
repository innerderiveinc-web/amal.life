import React from 'react';
import Head from 'next/head';
import { AmalTheme } from '@amal/ui';

export default function AdminDashboard() {
  const metrics = [
    { label: 'Published Sources', value: '4', status: '100% Provenance' },
    { label: 'Verified Passages', value: '9', status: 'Tier 1 & Tier 2 Approved' },
    { label: 'Citation Audit Accuracy', value: '99.4%', status: 'Target >99%' },
    { label: 'Fabricated Citations', value: '0', status: 'Zero Tolerated' },
    { label: 'Scholar Escalations', value: '3', status: 'Class D Triage Active' },
  ];

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Head>
        <title>AMAL OS Control Plane — Admin & Review</title>
      </Head>

      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <aside style={{ width: 260, backgroundColor: '#0F172A', minHeight: '100vh', padding: 24, color: '#FFFFFF' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 30px 0', color: '#38BDF8' }}>AMAL CONTROL PLANE</h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <span style={{ fontWeight: 700, color: '#FFFFFF', cursor: 'pointer' }}>Dashboard & Safety</span>
            <span style={{ color: '#94A3B8', cursor: 'pointer' }}>Source Management</span>
            <span style={{ color: '#94A3B8', cursor: 'pointer' }}>Review Queue (1 pending)</span>
            <span style={{ color: '#94A3B8', cursor: 'pointer' }}>Citation Audit Logs</span>
            <span style={{ color: '#94A3B8', cursor: 'pointer' }}>Privacy & Export Requests</span>
          </nav>
        </aside>

        {/* Content */}
        <main style={{ flex: 1, padding: 36 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#1E293B', margin: '0 0 8px 0' }}>AI Safety & Knowledge Governance</h1>
          <p style={{ color: '#64748B', margin: '0 0 30px 0' }}>Real-time telemetry, source verification states, and Fatwa firewall monitoring.</p>

          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 36 }}>
            {metrics.map((m, idx) => (
              <div key={idx} style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>{m.label}</span>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', margin: '6px 0' }}>{m.value}</div>
                <span style={{ fontSize: 12, color: '#0D9488', fontWeight: 600 }}>✓ {m.status}</span>
              </div>
            ))}
          </div>

          {/* Review Queue */}
          <section style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 12, border: '1px solid #E2E8F0', marginBottom: 30 }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: 18, color: '#1E293B' }}>Pending Editorial Review Queue</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F1F5F9', color: '#64748B' }}>
                  <th style={{ padding: '8px 0' }}>Item ID</th>
                  <th>Source Reference</th>
                  <th>Type</th>
                  <th>Authority Tier</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 0' }}>REV-1092</td>
                  <td>Sahih Muslim 776 (Night Prayer)</td>
                  <td>Hadith Passage</td>
                  <td>Tier 2 Authentic</td>
                  <td><span style={{ backgroundColor: '#FEF3C7', color: '#D97706', padding: '2px 8px', borderRadius: 4, fontSize: 12 }}>Under Scholar Review</span></td>
                  <td><button style={{ backgroundColor: '#0F4C3A', color: '#FFFFFF', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }}>Approve Source</button></td>
                </tr>
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}
