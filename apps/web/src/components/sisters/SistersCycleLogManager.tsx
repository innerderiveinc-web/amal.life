import React from 'react';

export interface SavedCycleRecord {
  id: string;
  start: string;
  end: string;
  notes: string;
  durationDays: number;
}

export interface SistersCycleLogManagerProps {
  isUrdu: boolean;
  hasPinConfigured: boolean;
  isSettingUpPin: boolean;
  newPin: string;
  pinError: string;
  cycleStartDate: string;
  cycleEndDate: string;
  cycleNotes: string;
  savedCycles: SavedCycleRecord[];
  onLockVault: () => void;
  onRemovePin: () => void;
  onOpenPinSetup: () => void;
  onCancelPinSetup: () => void;
  setNewPin: (val: string) => void;
  onSavePin: () => void;
  setCycleStartDate: (val: string) => void;
  setCycleEndDate: (val: string) => void;
  setCycleNotes: (val: string) => void;
  onSaveCycle: (e: React.FormEvent) => void;
  onDeleteCycle: (id: string) => void;
}

export const SistersCycleLogManager: React.FC<SistersCycleLogManagerProps> = ({
  isUrdu,
  hasPinConfigured,
  isSettingUpPin,
  newPin,
  pinError,
  cycleStartDate,
  cycleEndDate,
  cycleNotes,
  savedCycles,
  onLockVault,
  onRemovePin,
  onOpenPinSetup,
  onCancelPinSetup,
  setNewPin,
  onSavePin,
  setCycleStartDate,
  setCycleEndDate,
  setCycleNotes,
  onSaveCycle,
  onDeleteCycle,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Top Privacy Notice & PIN Setup bar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          padding: 20,
          border: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: '#064E3B',
              margin: '0 0 4px 0',
            }}
          >
            {isUrdu ? 'میرا نجی گوشہ و ماہواری ڈائری' : 'Personal Cycle Log & Private Reflections'}
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: '#6B7280' }}>
            {isUrdu
              ? 'یہ تمام ڈیٹا صرف آپ کے فون پر ۱۰۰٪ محفوظ ہے، انٹرنیٹ پر نہیں بھیجا جاتا۔'
              : '100% on-device sovereign privacy. Zero data leaves your device.'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {hasPinConfigured ? (
            <>
              <button
                onClick={onLockVault}
                style={{
                  backgroundColor: '#9D174D',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                🔒 {isUrdu ? 'لاک کریں' : 'Lock Vault'}
              </button>
              <button
                onClick={onRemovePin}
                style={{
                  backgroundColor: '#F3F4F6',
                  color: '#4B5563',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                {isUrdu ? 'پن ہٹائیں' : 'Remove PIN'}
              </button>
            </>
          ) : (
            <button
              onClick={onOpenPinSetup}
              style={{
                backgroundColor: '#064E3B',
                color: '#FFFFFF',
                border: 'none',
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              🔒 {isUrdu ? '۴ ہندسوں کا پن سیٹ کریں' : 'Set 4-Digit PIN'}
            </button>
          )}
        </div>
      </div>

      {/* Modal/Box to setup PIN */}
      {isSettingUpPin && (
        <div
          style={{
            backgroundColor: '#FEF2F2',
            padding: 16,
            borderRadius: 12,
            border: '1px solid #FECACA',
            maxWidth: 400,
          }}
        >
          <div style={{ fontWeight: 700, color: '#991B1B', marginBottom: 8, fontSize: 14 }}>
            {isUrdu ? '۴ ہندسوں کا نیا پن درج کریں:' : 'Set New 4-Digit PIN:'}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="password"
              maxLength={4}
              placeholder="1234"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #D1D5DB',
                width: 100,
                textAlign: 'center',
                fontSize: 18,
                letterSpacing: 4,
              }}
            />
            <button
              onClick={onSavePin}
              style={{
                backgroundColor: '#064E3B',
                color: '#FFFFFF',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {isUrdu ? 'محفوظ کریں' : 'Save'}
            </button>
            <button
              onClick={onCancelPinSetup}
              style={{
                backgroundColor: '#E5E7EB',
                border: 'none',
                padding: '8px 12px',
                borderRadius: 8,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {isUrdu ? 'منسوخ' : 'Cancel'}
            </button>
          </div>
          {pinError && (
            <div style={{ color: '#DC2626', fontSize: 12, marginTop: 6 }}>{pinError}</div>
          )}
        </div>
      )}

      {/* Cycle Input Form */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          padding: 20,
          border: '1px solid #E5E7EB',
        }}
      >
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#064E3B',
            margin: '0 0 14px 0',
          }}
        >
          {isUrdu ? 'نیا اندراج (خون شروع اور بند ہونے کی تاریخ):' : 'Add New Cycle Entry:'}
        </h3>
        <form
          onSubmit={onSaveCycle}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12,
            alignItems: 'flex-end',
          }}
        >
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#4B5563', marginBottom: 4 }}>
              {isUrdu ? 'شروع ہونے کی تاریخ:' : 'Start Date:'}
            </label>
            <input
              type="date"
              required
              value={cycleStartDate}
              onChange={(e) => setCycleStartDate(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #D1D5DB',
                fontSize: 13,
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#4B5563', marginBottom: 4 }}>
              {isUrdu ? 'بند ہونے کی تاریخ (اختیاری):' : 'End Date (Optional):'}
            </label>
            <input
              type="date"
              value={cycleEndDate}
              onChange={(e) => setCycleEndDate(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #D1D5DB',
                fontSize: 13,
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#4B5563', marginBottom: 4 }}>
              {isUrdu ? 'نوٹس یا علامات:' : 'Notes / Symptoms:'}
            </label>
            <input
              type="text"
              placeholder={isUrdu ? 'عادت کے دن، استحاضہ وغیرہ' : 'Normal cycle, pain, etc.'}
              value={cycleNotes}
              onChange={(e) => setCycleNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #D1D5DB',
                fontSize: 13,
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#064E3B',
              color: '#FFFFFF',
              border: 'none',
              padding: '10px 18px',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              height: 38,
            }}
          >
            {isUrdu ? 'اندراج محفوظ کریں' : 'Save Entry'}
          </button>
        </form>
      </div>

      {/* Saved Cycles Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 14,
          padding: 20,
          border: '1px solid #E5E7EB',
        }}
      >
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#064E3B',
            margin: '0 0 14px 0',
          }}
        >
          {isUrdu ? 'ماضی کے محفوظ ریکارڈز:' : 'Saved Cycle History:'}
        </h3>

        {savedCycles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 24, color: '#9CA3AF', fontSize: 13 }}>
            {isUrdu
              ? 'ابھی تک کوئی اندراج محفوظ نہیں ہوا۔ اوپر دیئے گئے فارم سے تاریخ درج کریں۔'
              : 'No cycle records saved yet. Add an entry using the form above.'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 13,
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                  <th style={{ padding: '8px 12px', textAlign: isUrdu ? 'right' : 'left' }}>
                    {isUrdu ? 'شروع' : 'Start'}
                  </th>
                  <th style={{ padding: '8px 12px', textAlign: isUrdu ? 'right' : 'left' }}>
                    {isUrdu ? 'اختتام' : 'End'}
                  </th>
                  <th style={{ padding: '8px 12px', textAlign: 'center' }}>
                    {isUrdu ? 'کل دن' : 'Duration'}
                  </th>
                  <th style={{ padding: '8px 12px', textAlign: isUrdu ? 'right' : 'left' }}>
                    {isUrdu ? 'فقہی جائزہ' : 'Fiqh Status'}
                  </th>
                  <th style={{ padding: '8px 12px', textAlign: isUrdu ? 'right' : 'left' }}>
                    {isUrdu ? 'نوٹس' : 'Notes'}
                  </th>
                  <th style={{ padding: '8px 12px', textAlign: 'center' }}>
                    {isUrdu ? 'حذف' : 'Action'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {savedCycles.map((c) => {
                  const isHaidhValid = c.durationDays >= 3 && c.durationDays <= 10;
                  return (
                    <tr key={c.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '10px 12px' }}>{c.start}</td>
                      <td style={{ padding: '10px 12px' }}>{c.end}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700 }}>
                        {c.durationDays ? `${c.durationDays} ${isUrdu ? 'دن' : 'days'}` : '—'}
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        {c.durationDays ? (
                          isHaidhValid ? (
                            <span
                              style={{
                                backgroundColor: '#ECFDF5',
                                color: '#065F46',
                                padding: '2px 8px',
                                borderRadius: 6,
                                fontSize: 11,
                                fontWeight: 600,
                              }}
                            >
                              {isUrdu ? 'حیض (۳ تا ۱۰ دن)' : 'Valid Haidh'}
                            </span>
                          ) : (
                            <span
                              style={{
                                backgroundColor: '#FEF2F2',
                                color: '#991B1B',
                                padding: '2px 8px',
                                borderRadius: 6,
                                fontSize: 11,
                                fontWeight: 600,
                              }}
                            >
                              {isUrdu ? 'استحاضہ کی تفتیش کریں' : 'Investigate Istihadha'}
                            </span>
                          )
                        ) : (
                          '—'
                        )}
                      </td>
                      <td style={{ padding: '10px 12px', color: '#6B7280' }}>
                        {c.notes || '—'}
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                        <button
                          onClick={() => onDeleteCycle(c.id)}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#EF4444',
                            cursor: 'pointer',
                            fontSize: 14,
                          }}
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
