import React, { useState, useEffect } from 'react';

interface SistersVaultTabProps {
  isUrdu: boolean;
  hasPinConfigured: boolean;
  setHasPinConfigured: (configured: boolean) => void;
  isPinLocked: boolean;
  setIsPinLocked: (locked: boolean) => void;
  isSettingUpPin: boolean;
  setIsSettingUpPin: (settingUp: boolean) => void;
}

export function SistersVaultTab({
  isUrdu,
  hasPinConfigured,
  setHasPinConfigured,
  isPinLocked,
  setIsPinLocked,
  isSettingUpPin,
  setIsSettingUpPin,
}: SistersVaultTabProps) {
  const [enteredPin, setEnteredPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinError, setPinError] = useState('');

  // Cycle Logs State (Stored 100% on-device in localStorage)
  const [cycleStartDate, setCycleStartDate] = useState('');
  const [cycleEndDate, setCycleEndDate] = useState('');
  const [cycleNotes, setCycleNotes] = useState('');
  const [savedCycles, setSavedCycles] = useState<
    { id: string; start: string; end: string; notes: string; durationDays: number }[]
  >([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedCycles = localStorage.getItem('amal_nisa_cycle_logs');
        if (storedCycles) {
          setSavedCycles(JSON.parse(storedCycles));
        }
      } catch (e) {
        console.error('Failed to parse cycle logs', e);
      }
    }
  }, []);

  const handleUnlockPin = () => {
    const storedPin = localStorage.getItem('amal_nisa_pin');
    if (enteredPin === storedPin) {
      setIsPinLocked(false);
      setPinError('');
      setEnteredPin('');
    } else {
      setPinError(isUrdu ? 'غلط پن کوڈ! براہِ کرم دوبارہ کوشش کریں۔' : 'Incorrect PIN! Please try again.');
    }
  };

  const handleSavePin = () => {
    if (newPin.length === 4 && /^\d+$/.test(newPin)) {
      localStorage.setItem('amal_nisa_pin', newPin);
      setHasPinConfigured(true);
      setIsPinLocked(false);
      setIsSettingUpPin(false);
      setNewPin('');
      setPinError('');
    } else {
      setPinError(isUrdu ? 'براہِ کرم ۴ ہندسوں پر مشتمل درست پن کوڈ درج کریں۔' : 'Please enter a valid 4-digit numeric PIN.');
    }
  };

  const handleRemovePin = () => {
    if (window.confirm(isUrdu ? 'کیا آپ واقعی پن لاک ختم کرنا چاہتے ہیں؟' : 'Are you sure you want to remove the PIN lock?')) {
      localStorage.removeItem('amal_nisa_pin');
      setHasPinConfigured(false);
      setIsPinLocked(false);
    }
  };

  const handleSaveCycle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cycleStartDate) return;

    let durationDays = 0;
    if (cycleEndDate) {
      const start = new Date(cycleStartDate);
      const end = new Date(cycleEndDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      durationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }

    const newEntry = {
      id: Date.now().toString(),
      start: cycleStartDate,
      end: cycleEndDate || (isUrdu ? 'جاری ہے' : 'Ongoing'),
      notes: cycleNotes,
      durationDays,
    };

    const updated = [newEntry, ...savedCycles];
    setSavedCycles(updated);
    localStorage.setItem('amal_nisa_cycle_logs', JSON.stringify(updated));
    setCycleStartDate('');
    setCycleEndDate('');
    setCycleNotes('');
  };

  const handleDeleteCycle = (id: string) => {
    const updated = savedCycles.filter((c) => c.id !== id);
    setSavedCycles(updated);
    localStorage.setItem('amal_nisa_cycle_logs', JSON.stringify(updated));
  };

  return (
    <div>
      {/* If PIN is locked and configured */}
      {isPinLocked && hasPinConfigured ? (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 36,
            border: '1px solid #E5E7EB',
            maxWidth: 420,
            margin: '40px auto',
            textAlign: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔒</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#064E3B', margin: '0 0 6px 0' }}>
            {isUrdu ? 'نجی گوشہ لاک ہے' : 'Private Sanctuary Locked'}
          </h2>
          <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 20 }}>
            {isUrdu
              ? 'اپنے مخصوص ایام کے اندراجات اور نجی ڈائری دیکھنے کے لیے ۴ ہندسوں کا پن کوڈ درج کریں۔'
              : 'Enter your 4-digit PIN to access your personal cycle logs and reflections.'}
          </p>

          <input
            type="password"
            maxLength={4}
            placeholder="••••"
            value={enteredPin}
            onChange={(e) => setEnteredPin(e.target.value)}
            style={{
              width: 140,
              padding: '10px 16px',
              fontSize: 24,
              textAlign: 'center',
              letterSpacing: 8,
              borderRadius: 10,
              border: '2px solid #064E3B',
              marginBottom: 12,
            }}
          />

          {pinError && (
            <div style={{ color: '#DC2626', fontSize: 12, marginBottom: 12 }}>
              {pinError}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            <button
              onClick={handleUnlockPin}
              style={{
                backgroundColor: '#064E3B',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 24px',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              {isUrdu ? 'ان لاک کریں' : 'Unlock'}
            </button>
            <button
              onClick={handleRemovePin}
              style={{
                backgroundColor: 'transparent',
                color: '#EF4444',
                border: 'none',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              {isUrdu ? 'پن بھول گئے؟' : 'Forgot PIN?'}
            </button>
          </div>
        </div>
      ) : (
        /* Unlocked Vault */
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
                    onClick={() => setIsPinLocked(true)}
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
                    onClick={handleRemovePin}
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
                  onClick={() => setIsSettingUpPin(true)}
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
                  onClick={handleSavePin}
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
                  onClick={() => setIsSettingUpPin(false)}
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
              onSubmit={handleSaveCycle}
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
                      const isHaidhValid =
                        c.durationDays >= 3 && c.durationDays <= 10;
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
                              onClick={() => handleDeleteCycle(c.id)}
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
      )}
    </div>
  );
}
