import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

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
  isUrdu: propIsUrdu,
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
  const { t, isUrdu, isArabic, isRomanUrdu } = useLanguage();
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
            {t(
              'Personal Cycle Log & Private Reflections',
              'میرا نجی گوشہ و ماہواری ڈائری',
              'سجل الدورة الخاصة والمذكرات',
              'Mera Niji Gosha wa Cycle Diary'
            )}
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: '#6B7280' }}>
            {t(
              '100% on-device sovereign privacy. Zero data leaves your device.',
              'یہ تمام ڈیٹا صرف آپ کے فون پر ۱۰۰٪ محفوظ ہے، انٹرنیٹ پر نہیں بھیجا جاتا۔',
              'خصوصية تامة بنسبة ١٠٠٪ على جهازك. لا تغادر أي بيانات.',
              'Yeh tamam data sirf aapke device par 100% mehfooz hai, internet par nahi bheja jata.'
            )}
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
                🔒 {t('Lock Vault', 'لاک کریں', 'قفل الخزانة', 'Lock Karein')}
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
                {t('Remove PIN', 'پن ہٹائیں', 'إزالة الرمز', 'PIN Hatayein')}
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
              🔒 {t('Set 4-Digit PIN', '۴ ہندسوں کا پن سیٹ کریں', 'تعيين رمز ٤ أرقام', '4-Digit PIN Set Karein')}
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
            {t(
              'Set New 4-Digit PIN:',
              '۴ ہندسوں کا نیا پن درج کریں:',
              'أدخل الرمز السري الجديد المكون من ٤ أرقام:',
              '4 Hindson ka Naya PIN Darj Karein:'
            )}
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
              {t('Save', 'محفوظ کریں', 'حفظ', 'Mehfooz Karein')}
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
              {t('Cancel', 'منسوخ', 'إلغاء', 'Mansookh')}
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
          {t(
            'Add New Cycle Entry:',
            'نیا اندراج (خون شروع اور بند ہونے کی تاریخ):',
            'إضافة سجل جديد للدورة:',
            'Naya Indraj (Start aur End Date):'
          )}
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
              {t('Start Date:', 'شروع ہونے کی تاریخ:', 'تاريخ البداية:', 'Shuru Hone ki Tareekh:')}
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
              {t('End Date (Optional):', 'بند ہونے کی تاریخ (اختیاری):', 'تاريخ الانتهاء (اختياري):', 'Band Hone ki Tareekh (Ikhtiyari):')}
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
              {t('Notes / Symptoms:', 'نوٹس یا علامات:', 'ملاحظات / أعراض:', 'Notes / Alamaat:')}
            </label>
            <input
              type="text"
              placeholder={t('Normal cycle, pain, etc.', 'عادت کے دن، استحاضہ وغیرہ', 'الدورة المعتادة، ألم، إلخ', 'Aadat ke din, istehadha waghaira')}
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
            {t('Save Entry', 'اندراج محفوظ کریں', 'حفظ السجل', 'Indraj Mehfooz Karein')}
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
          {t('Saved Cycle History:', 'ماضی کے محفوظ ریکارڈز:', 'سجل الدورات السابقة:', 'Mazi ke Mehfooz Records:')}
        </h3>

        {savedCycles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 24, color: '#9CA3AF', fontSize: 13 }}>
            {t(
              'No cycle records saved yet. Add an entry using the form above.',
              'ابھی تک کوئی اندراج محفوظ نہیں ہوا۔ اوپر دیئے گئے فارم سے تاریخ درج کریں۔',
              'لا توجد سجلات محفوظة بعد. يرجى إضافة سجل باستخدام النموذج أعلاه.',
              'Abhi tak koi indraj mehfooz nahi hua. Upar diye gaye form se tareekh darj karein.'
            )}
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
                  <th style={{ padding: '8px 12px', textAlign: (isUrdu || isArabic) ? 'right' : 'left' }}>
                    {t('Start', 'شروع', 'البداية', 'Shuru')}
                  </th>
                  <th style={{ padding: '8px 12px', textAlign: (isUrdu || isArabic) ? 'right' : 'left' }}>
                    {t('End', 'اختتام', 'النهاية', 'Ikhtitam')}
                  </th>
                  <th style={{ padding: '8px 12px', textAlign: 'center' }}>
                    {t('Duration', 'کل دن', 'المدة', 'Kul Din')}
                  </th>
                  <th style={{ padding: '8px 12px', textAlign: (isUrdu || isArabic) ? 'right' : 'left' }}>
                    {t('Fiqh Status', 'فقہی جائزہ', 'الحكم الفقهي', 'Fiqhi Jaiza')}
                  </th>
                  <th style={{ padding: '8px 12px', textAlign: (isUrdu || isArabic) ? 'right' : 'left' }}>
                    {t('Notes', 'نوٹس', 'ملاحظات', 'Notes')}
                  </th>
                  <th style={{ padding: '8px 12px', textAlign: 'center' }}>
                    {t('Action', 'حذف', 'إجراء', 'Action')}
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
                        {c.durationDays ? `${c.durationDays} ${t('days', 'دن', 'أيام', 'din')}` : '—'}
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
                              {t('Valid Haidh (3-10 days)', 'حیض (۳ تا ۱۰ دن)', 'حيض صحيح (٣-١٠ أيام)', 'Haidh (3 se 10 din)')}
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
                              {t('Investigate Istihadha', 'استحاضہ کی تفتیش کریں', 'تحقق من الاستحاضة', 'Istehadha ki taftish karein')}
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
