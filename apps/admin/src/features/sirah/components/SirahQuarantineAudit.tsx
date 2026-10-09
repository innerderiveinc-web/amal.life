import React from 'react';
import { AmalTheme } from '@amal/ui';

interface QuarantinedItem {
  id: string;
  title: string;
  reason: string;
  quarantinedAt: string;
  status: 'QUARANTINED' | 'UNDER_REVIEW' | 'PURGED';
}

interface SirahQuarantineAuditProps {
  items: QuarantinedItem[];
  onReleaseItem?: (id: string) => void;
  onPurgeItem?: (id: string) => void;
}

export const SirahQuarantineAudit: React.FC<SirahQuarantineAuditProps> = ({
  items,
  onReleaseItem,
  onPurgeItem,
}) => {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 14,
      padding: 24,
      border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#C62828' }}>
            Production Quarantine & Isolation Vault ({items.length})
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: '#666' }}>
            Unverified, forged, rights-restricted, or disputed items isolated from retrieval index.
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div style={{ padding: 16, backgroundColor: '#E8F5E9', borderRadius: 10, color: '#2E7D32', fontSize: 13 }}>
          ✓ Quarantine is empty. All candidate Sirah sources in storage have passed integrity audits.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                padding: 14,
                borderRadius: 10,
                backgroundColor: '#FFEBEE',
                border: '1px solid #FFCDD2',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#B71C1C' }}>
                  {item.title} ({item.id})
                </div>
                <div style={{ fontSize: 12, color: '#C62828', marginTop: 2 }}>
                  Reason: {item.reason}
                </div>
                <div style={{ fontSize: 11, color: '#777', marginTop: 2 }}>
                  Quarantined: {item.quarantinedAt}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                {onReleaseItem && (
                  <button
                    onClick={() => onReleaseItem(item.id)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 6,
                      border: 'none',
                      backgroundColor: '#2E7D32',
                      color: '#FFF',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Release
                  </button>
                )}
                {onPurgeItem && (
                  <button
                    onClick={() => onPurgeItem(item.id)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 6,
                      border: 'none',
                      backgroundColor: '#C62828',
                      color: '#FFF',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Purge
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
