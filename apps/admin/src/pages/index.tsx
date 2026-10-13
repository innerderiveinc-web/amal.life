import React, { useState } from 'react';
import Head from 'next/head';
import { AmalTheme } from '@amal/ui';
import { SirahQuarantineAudit } from '../features/sirah/components/SirahQuarantineAudit';
import { SirahFeatureFlagManager } from '../features/sirah/components/SirahFeatureFlagManager';

interface ReviewItem {
  id: string;
  sourceRef: string;
  type: string;
  tier: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'FLAGS' | 'QUARANTINE' | 'QUEUE'>('OVERVIEW');
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([
    {
      id: 'REV-1092',
      sourceRef: 'Sahih Muslim 776 (Night Prayer & Tahajjud)',
      type: 'Hadith Passage',
      tier: 'Tier 1 Canonical',
      status: 'PENDING',
    },
    {
      id: 'REV-1093',
      sourceRef: 'Al-Hidayah (Kitab al-Nikah, p. 142)',
      type: 'Fiqh Codex',
      tier: 'Tier 1 Classical Text',
      status: 'PENDING',
    },
    {
      id: 'REV-1094',
      sourceRef: 'Riyadh al-Salihin (Bab al-Tawbah 14)',
      type: 'Hadith Selection',
      tier: 'Tier 2 Authentic',
      status: 'PENDING',
    },
  ]);

  const [quarantinedItems, setQuarantinedItems] = useState<any[]>([
    {
      id: 'QUAR-801',
      title: 'Unverified Isra\'iliyyat Narrative attributed to Ibn Abbas (Da\'if)',
      reason: 'Missing chain of transmission (Munqati\') & potential Mawdu\' attribution',
      quarantinedAt: '2026-10-10 14:22',
      status: 'QUARANTINED',
    },
    {
      id: 'QUAR-802',
      title: 'Disputed Battle Timeline Segment without Canonical Isnad',
      reason: 'Contradicts verified Sahih al-Bukhari Kitab al-Maghazi chronology',
      quarantinedAt: '2026-10-11 09:15',
      status: 'QUARANTINED',
    },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleApprove = (id: string) => {
    setReviewItems(prev => prev.map(item => item.id === id ? { ...item, status: 'APPROVED' } : item));
    showToast(`✓ Item ${id} approved and promoted to Tier 1 verified index.`);
  };

  const handleReject = (id: string) => {
    setReviewItems(prev => prev.map(item => item.id === id ? { ...item, status: 'REJECTED' } : item));
    showToast(`✗ Item ${id} rejected and placed into quarantine audit.`);
  };

  const metrics = [
    { label: 'Published Sources', value: '76', status: '100% Provenance Anchored' },
    { label: 'Canonical Works', value: '106', status: '4 Sunni Madhhabs Verified' },
    { label: 'Citation Audit Accuracy', value: '99.8%', status: 'Target >99% (Medina Mushaf Validated)' },
    { label: 'Fabricated Citations', value: '0', status: 'Zero Tolerated (INV_07)' },
    { label: 'Fatwa Safety Blocks', value: '42', status: 'Multilingual Triage Active' },
  ];

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>AMAL OS Control Plane — Admin & Governance</title>
      </Head>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: 20,
          right: 20,
          backgroundColor: '#065F46',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: 8,
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          zIndex: 99999,
          fontSize: 14,
          fontWeight: 700,
        }}>
          {toastMessage}
        </div>
      )}

      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <aside style={{ width: 270, backgroundColor: '#0F172A', minHeight: '100vh', padding: 24, color: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <span style={{ fontSize: 24 }}>🛡️</span>
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 900, margin: 0, color: '#38BDF8', letterSpacing: 0.5 }}>
                AMAL CONTROL PLANE
              </h2>
              <span style={{ fontSize: 10, color: '#94A3B8', fontWeight: 600 }}>Sovereign Governance V1</span>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { key: 'OVERVIEW', label: '📊 Dashboard & Telemetry', badge: null },
              { key: 'QUEUE', label: '📝 Editorial Review Queue', badge: reviewItems.filter(i => i.status === 'PENDING').length },
              { key: 'QUARANTINE', label: '🚫 Quarantine Vault', badge: quarantinedItems.length },
              { key: 'FLAGS', label: '⚙️ Platform Feature Flags', badge: null },
            ].map(tab => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 8,
                    backgroundColor: active ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                    color: active ? '#38BDF8' : '#94A3B8',
                    border: 'none',
                    fontWeight: active ? 700 : 500,
                    fontSize: 13,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>{tab.label}</span>
                  {tab.badge !== null && (
                    <span style={{
                      fontSize: 10,
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: 10,
                      backgroundColor: active ? '#38BDF8' : '#334155',
                      color: active ? '#0F172A' : '#F1F5F9',
                    }}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main style={{ flex: 1, padding: 36, maxWidth: 1200 }}>
          {/* Header */}
          <div style={{ marginBottom: 30 }}>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: '#1E293B', margin: '0 0 6px 0' }}>
              Knowledge Governance & Safety Control Plane
            </h1>
            <p style={{ color: '#64748B', margin: 0, fontSize: 14 }}>
              Real-time telemetry, Fatwa Firewall auditing, and canonical source verification conforming to Sawad al-A'zam orthodoxy.
            </p>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'OVERVIEW' && (
            <div>
              {/* Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16, marginBottom: 32 }}>
                {metrics.map((m, idx) => (
                  <div key={idx} style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                    <span style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>{m.label}</span>
                    <div style={{ fontSize: 30, fontWeight: 900, color: '#0F172A', margin: '6px 0' }}>{m.value}</div>
                    <span style={{ fontSize: 11, color: '#0D9488', fontWeight: 700 }}>✓ {m.status}</span>
                  </div>
                ))}
              </div>

              {/* Quick Status Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: 22, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1E293B', margin: '0 0 10px 0' }}>
                    🛡️ Fatwa Safety Firewall Telemetry
                  </h3>
                  <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6, margin: '0 0 14px' }}>
                    Multilingual Class D & E triggers actively monitoring across English, Urdu, Roman Urdu, and Arabic. Zero autonomous machine verdicts allowed.
                  </p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ fontSize: 11, backgroundColor: '#ECFDF5', color: '#065F46', padding: '4px 8px', borderRadius: 6, fontWeight: 700 }}>
                      English: Active
                    </span>
                    <span style={{ fontSize: 11, backgroundColor: '#ECFDF5', color: '#065F46', padding: '4px 8px', borderRadius: 6, fontWeight: 700 }}>
                      Urdu/Roman: Active
                    </span>
                    <span style={{ fontSize: 11, backgroundColor: '#ECFDF5', color: '#065F46', padding: '4px 8px', borderRadius: 6, fontWeight: 700 }}>
                      Arabic: Active
                    </span>
                  </div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: 22, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1E293B', margin: '0 0 10px 0' }}>
                    ⚖️ Two-Scholar Dual Jurist Protocol (INV_07)
                  </h3>
                  <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6, margin: '0 0 14px' }}>
                    All sensitive Fiqh claims require independent sign-off from two certified human jurists prior to canonical indexing.
                  </p>
                  <button
                    onClick={() => setActiveTab('QUEUE')}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 6,
                      backgroundColor: '#0F172A',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Open Review Queue ({reviewItems.filter(i => i.status === 'PENDING').length} pending) →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EDITORIAL REVIEW QUEUE */}
          {activeTab === 'QUEUE' && (
            <section style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 12, border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ margin: 0, fontSize: 18, color: '#1E293B', fontWeight: 800 }}>
                  Pending Editorial Review Queue ({reviewItems.length})
                </h3>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #F1F5F9', color: '#64748B' }}>
                    <th style={{ padding: '10px 8px' }}>Item ID</th>
                    <th>Source Reference</th>
                    <th>Type</th>
                    <th>Authority Tier</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right', paddingRight: 8 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewItems.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '14px 8px', fontWeight: 700, color: '#1E293B' }}>{item.id}</td>
                      <td style={{ fontWeight: 600, color: '#334155' }}>{item.sourceRef}</td>
                      <td style={{ color: '#64748B' }}>{item.type}</td>
                      <td>
                        <span style={{ fontSize: 11, backgroundColor: '#F1F5F9', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                          {item.tier}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          backgroundColor: item.status === 'PENDING' ? '#FEF3C7' : item.status === 'APPROVED' ? '#DCFCE7' : '#FEE2E2',
                          color: item.status === 'PENDING' ? '#D97706' : item.status === 'APPROVED' ? '#166534' : '#991B1B',
                          padding: '3px 8px',
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 700,
                        }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right', paddingRight: 8 }}>
                        {item.status === 'PENDING' ? (
                          <div style={{ display: 'inline-flex', gap: 6 }}>
                            <button
                              onClick={() => handleApprove(item.id)}
                              style={{
                                backgroundColor: '#15803D',
                                color: '#FFFFFF',
                                border: 'none',
                                padding: '6px 12px',
                                borderRadius: 6,
                                cursor: 'pointer',
                                fontSize: 12,
                                fontWeight: 700,
                              }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(item.id)}
                              style={{
                                backgroundColor: '#DC2626',
                                color: '#FFFFFF',
                                border: 'none',
                                padding: '6px 12px',
                                borderRadius: 6,
                                cursor: 'pointer',
                                fontSize: 12,
                                fontWeight: 700,
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600 }}>Resolved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* TAB 3: QUARANTINE VAULT */}
          {activeTab === 'QUARANTINE' && (
            <SirahQuarantineAudit
              items={quarantinedItems}
              onReleaseItem={(id) => {
                setQuarantinedItems(prev => prev.filter(i => i.id !== id));
                showToast(`Item ${id} released from quarantine after scholar review.`);
              }}
              onPurgeItem={(id) => {
                setQuarantinedItems(prev => prev.filter(i => i.id !== id));
                showToast(`Item ${id} permanently purged from candidate index.`);
              }}
            />
          )}

          {/* TAB 4: FEATURE FLAGS */}
          {activeTab === 'FLAGS' && (
            <SirahFeatureFlagManager
              onSaveFlags={() => showToast('Feature flags updated across platform clusters.')}
            />
          )}
        </main>
      </div>
    </div>
  );
}
