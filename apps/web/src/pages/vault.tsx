import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { knowledgeVaultEngine, VaultSavedNote } from '@amal/amal-engine';
import { MASTER_CANONICAL_CORPUS } from '@amal/evidence';
import { useLanguage } from '../context/LanguageContext';
import { showAmalToast } from '../components/Toast';
import { exportSovereignBackup, restoreSovereignBackup } from '../lib/sovereign-backup';
import { triggerHaptic } from '../lib/haptics';
import { getSavedBookmarks, BookmarkRecord } from '../lib/bookmarks-store';

export default function KnowledgeVaultPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'NOTES' | 'REFLECTIONS' | 'BOOKMARKS' | 'CANONICAL_CORPUS'>('NOTES');
  const [notes, setNotes] = useState<VaultSavedNote[]>([]);
  const [reflections, setReflections] = useState<any[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>([]);
  const [corpusFilter, setCorpusFilter] = useState('');
  const [title, setTitle] = useState('');
  const [sourceType, setSourceType] = useState<VaultSavedNote['sourceType']>('FRIDAY_KHUTBAH');
  const [rawText, setRawText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Restore saved notes, reflections, and bookmarks from LocalStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedNotes = localStorage.getItem('amal_vault_notes');
        if (savedNotes) {
          const parsed = JSON.parse(savedNotes);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setNotes(parsed);
          } else {
            setNotes(knowledgeVaultEngine.getUserNotes('usr_demo_1'));
          }
        } else {
          setNotes(knowledgeVaultEngine.getUserNotes('usr_demo_1'));
        }

        // Hydrate personal reflections
        const savedReflections = localStorage.getItem('amal_reflections');
        if (savedReflections) {
          const parsed = JSON.parse(savedReflections);
          if (Array.isArray(parsed)) setReflections(parsed);
        }

        // Hydrate bookmarks
        setBookmarks(getSavedBookmarks());
      } catch (err) {
        console.warn('Could not parse vault items:', err);
        setNotes(knowledgeVaultEngine.getUserNotes('usr_demo_1'));
      }
    }
  }, []);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !rawText.trim()) return;
    triggerHaptic('success');
    const newNote = knowledgeVaultEngine.ingestAndAnalyzeNote('usr_demo_1', title.trim(), sourceType, rawText.trim());
    const updated = [newNote, ...notes];
    setNotes(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('amal_vault_notes', JSON.stringify(updated));
      } catch {}
    }
    setTitle('');
    setRawText('');
    setIsAdding(false);
    showAmalToast(t('Note analyzed and permanently saved to Vault!', 'نوٹ محفوظ کر دیا گیا ہے!', 'تم حفظ الفائدة بنجاح', 'Note Vault mein mehfooz ho gaya!'), 'success');
  };

  const handleDeleteNote = (noteId: string) => {
    triggerHaptic('warning');
    const updated = notes.filter((n) => n.noteId !== noteId);
    setNotes(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('amal_vault_notes', JSON.stringify(updated));
      } catch {}
    }
    showAmalToast(t('Note removed from Vault', 'نوٹ حذف کر دیا گیا', 'تم حذف الفائدة', 'Note delete kar diya gaya'), 'info');
  };

  const handleExportBackup = () => {
    const ok = exportSovereignBackup();
    if (ok) {
      showAmalToast(
        t('Sovereign backup downloaded successfully (.json)', 'ذاتی محفوظ بیک اپ کامیابی کے ساتھ ڈاؤنلوڈ ہو گیا', 'تم تنزيل النسخة الاحتياطية السيادية بنجاح', 'Sovereign backup download ho gaya (.json)'),
        'success'
      );
    }
  };

  const handleRestoreFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const res = await restoreSovereignBackup(file);
    if (res.success) {
      showAmalToast(
        t(`Sovereign restore complete: ${res.restoredCount} records restored.`, `محفوظ بیک اپ بحال: ${res.restoredCount} ریکارڈز بحال ہو گئے۔`, `تمت استعادة البيانات بنجاح: ${res.restoredCount} مدخلات`, `Sovereign restore mukammal: ${res.restoredCount} records restore ho gaye.`),
        'success'
      );
      setTimeout(() => window.location.reload(), 1200);
    } else {
      showAmalToast(res.error || 'Restore failed', 'warning');
    }
  };

  const getSourceTypeLabel = (st: VaultSavedNote['sourceType']) => {
    switch (st) {
      case 'FRIDAY_KHUTBAH':
        return t('Friday Khutbah', 'خطبہ جمعہ', 'خطبة الجمعة', 'Khutbah-e-Juma');
      case 'HALAQAH_LECTURE':
        return t('Halaqah / Dars', 'حلقہ درس و بیان', 'حلقة علم أو درس', 'Halaqah / Dars');
      case 'BOOK_READING':
        return t('Book Reading Excerpt', 'کتابی اقتباس', 'اقتباس من كتاب', 'Kitabi Iqtibas');
      case 'PERSONAL_THOUGHT':
        return t('Personal Thought', 'ذاتی تاثر و خیال', 'خاطرة إيمانية', 'Zati Khayal o Tasawwur');
      default:
        return st;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', paddingBottom: 60, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <Head>
        <title>{`AMAL OS — ${t('Personal Islamic Knowledge Vault', 'ذاتی علمی و معلوماتی ذخیرہ', 'المستودع المعرفي الإسلامي الشخصي', 'Zati Ilmi Vault')}`}</title>
        <meta name="description" content="Hardware-backed Sovereign Vault Guard, Encrypted Private Notes, and Local Reflection Security." />
      </Head>
      <Navigation />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 28 }}>📚</span>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1B4332', margin: 0 }}>
              {t('Personal Islamic Knowledge Vault', 'ذاتی علمی و معلوماتی ذخیرہ', 'المستودع المعرفي الإسلامي الشخصي', 'Zati Ilmi Vault')}
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: 14, lineHeight: 1.6 }}>
            {t(
              'Ingest Friday Khutbahs, dars notes, and book excerpts. AMAL automatically scans and extracts Quranic verses, Hadith citations, and classical scholar quotes, cross-checking authenticity against the 106 Canonical Masterworks.',
              'خطباتِ جمعہ، علمی دروس کے نوٹس اور کتب کے اقتباسات محفوظ فرمائیں۔ عمل خودکار طریقے سے قرآنی آیات، احادیث اور اقوالِ سلف کا استخراج کر کے ۱۰۶ امہات الکتب سے ان کی اسناد و توثیق کرتا ہے۔',
              'احفظ خطب الجمعة وفوائد الدروس واقتباسات الكتب. يقوم عمل بمسح النصوص واستخراج الآيات والأحاديث النبوية وأقوال السلف ومطابقتها مع أمهات الكتب الإسلامية المعتمدة.',
              'Juma khutbat, dars ke notes aur kitabi iqtibasat darj karein. AMAL khud-kar tareeqe se Quran, Hadith aur aqwal-e-salaf ko talash kar ke 106 Canonical Kutub se sanad janchta hai.'
            )}
          </p>
        </div>

        {/* Action Button Row */}
        {/* Sovereign Vault Domain Navigation Tabs */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          <button
            type="button"
            onClick={() => setActiveTab('NOTES')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              border: activeTab === 'NOTES' ? '2px solid #1B4332' : '1px solid #D1D5DB',
              backgroundColor: activeTab === 'NOTES' ? '#1B4332' : '#FFFFFF',
              color: activeTab === 'NOTES' ? '#FFFFFF' : '#374151',
            }}
          >
            📝 {t('Khutbah & Study Notes', 'خطبات و مطالعہ نوٹس', 'فوائد وخطب الجمعة', 'Khutbat o Study Notes')} ({notes.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('REFLECTIONS')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              border: activeTab === 'REFLECTIONS' ? '2px solid #1B4332' : '1px solid #D1D5DB',
              backgroundColor: activeTab === 'REFLECTIONS' ? '#1B4332' : '#FFFFFF',
              color: activeTab === 'REFLECTIONS' ? '#FFFFFF' : '#374151',
            }}
          >
            🌱 {t('Muhasabah Reflections', 'محاسبہ و تاثرات', 'الخواطر والمحاسبة', 'Muhasabah Reflections')} ({reflections.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('BOOKMARKS')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              border: activeTab === 'BOOKMARKS' ? '2px solid #1B4332' : '1px solid #D1D5DB',
              backgroundColor: activeTab === 'BOOKMARKS' ? '#1B4332' : '#FFFFFF',
              color: activeTab === 'BOOKMARKS' ? '#FFFFFF' : '#374151',
            }}
          >
            🔖 {t('Sacred Bookmarks', 'محفوظ آیات و اسباق', 'المحفوظات القرآنية', 'Mehfooz Bookmarks')} ({bookmarks.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('CANONICAL_CORPUS')}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              border: activeTab === 'CANONICAL_CORPUS' ? '2px solid #1B4332' : '1px solid #D1D5DB',
              backgroundColor: activeTab === 'CANONICAL_CORPUS' ? '#1B4332' : '#FFFFFF',
              color: activeTab === 'CANONICAL_CORPUS' ? '#FFFFFF' : '#374151',
            }}
          >
            📚 {t('151 Classical Works Catalog', '۱۵۱ امہات الکتب کی فہرست', 'فهرس الأصول المعتمدة', '151 Classical Books Catalog')} ({MASTER_CANONICAL_CORPUS.length})
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              type="button"
              onClick={handleExportBackup}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                border: '1px solid #A7F3D0',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
              title={t('Export complete local data to JSON backup', 'مکمل ذاتی ڈیٹا کو محفوظ بیک اپ فائل میں ڈاؤنلوڈ کریں', 'تصدير النسخة الاحتياطية الكاملة إلى ملف', 'Data backup download karein')}
            >
              <span>💾</span>
              <span>{t('Export Sovereign Backup', 'ذاتی بیک اپ ڈاؤنلوڈ', 'تصدير النسخة السيادية', 'Export Sovereign Backup')}</span>
            </button>

            <label
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                backgroundColor: '#F1F5F9',
                color: '#334155',
                border: '1px solid #CBD5E1',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
              title={t('Restore data from JSON backup', 'بیک اپ فائل سے تمام ڈیٹا بحال کریں', 'استعادة البيانات من ملف النسخة الاحتياطية', 'Backup file se restore karein')}
            >
              <span>📥</span>
              <span>{t('Restore Backup', 'بیک اپ بحال کریں', 'استعادة النسخة', 'Restore Backup')}</span>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleRestoreFile}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          {activeTab === 'NOTES' && (
            <button
              onClick={() => setIsAdding(!isAdding)}
              style={{
                padding: '10px 20px',
                borderRadius: 8,
                backgroundColor: '#1B4332',
                color: '#FFFFFF',
                border: 'none',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {isAdding
                ? t('✕ Cancel', '✕ منسوخ کریں', '✕ إلغاء', '✕ Mansookh')
                : t('+ Ingest Lecture / Khutbah Note', '+ درس یا خطبے کا نوٹ درج کریں', '+ إضافة فائدة علمية أو خطبة', '+ Dars Ya Khutbah Note Darj Karein')}
            </button>
          )}

          {activeTab === 'REFLECTIONS' && (
            <Link
              href="/reflections"
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                backgroundColor: '#1B4332',
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>✍️</span>
              <span>{t('Open Muhasabah Studio', 'محاسبہ سٹوڈیو کھولیں', 'فتح استوديو المحاسبة', 'Open Muhasabah Studio')}</span>
            </Link>
          )}

          {activeTab === 'CANONICAL_CORPUS' && (
            <Link
              href="/library"
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                backgroundColor: '#1B4332',
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>📖</span>
              <span>{t('Open Full Library Reader', 'مکمل مکتبہ کھولیں', 'فتح المكتبة الشاملة', 'Open Full Library')}</span>
            </Link>
          )}
        </div>

        {isAdding && (
          <form onSubmit={handleSaveNote} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB', marginBottom: 24 }}>
            <h3 style={{ margin: '0 0 14px', fontSize: 16, fontWeight: 700, color: '#111827' }}>
              {t('Add Speech Transcript or Reading Note', 'بیان کا متن یا مطالعے کا نوٹ درج کریں', 'إضافة نص خطبة أو فائدة قراءة', 'Bayan Ya Mutala Ka Note Darj Karein')}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="vault-grid-2" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 4 }}>
                    {t('Note Title', 'نوٹ کا عنوان', 'عنوان الفائدة', 'Note Ka Unwan')}
                  </label>
                  <input
                    type="text"
                    placeholder={t('E.g., Friday Khutbah on Sincerity & Dhikr...', 'مثلاً: خطبہ جمعہ — اخلاص و ذکر کی فضیلت...', 'مثلاً: خطبة الجمعة في الإخلاص وفضل الذكر...', 'Maslan: Khutbah-e-Juma — Ikhlas o Zikr ki Fazeelat...')}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 14 }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 4 }}>
                    {t('Source Category', 'ماخذ کی قسم', 'نوع المصدر', 'Ma\'akhiz Ki Qism')}
                  </label>
                  <select
                    value={sourceType}
                    onChange={(e) => setSourceType(e.target.value as VaultSavedNote['sourceType'])}
                    style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 14 }}
                  >
                    <option value="FRIDAY_KHUTBAH">{getSourceTypeLabel('FRIDAY_KHUTBAH')}</option>
                    <option value="HALAQAH_LECTURE">{getSourceTypeLabel('HALAQAH_LECTURE')}</option>
                    <option value="BOOK_READING">{getSourceTypeLabel('BOOK_READING')}</option>
                    <option value="PERSONAL_THOUGHT">{getSourceTypeLabel('PERSONAL_THOUGHT')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 4 }}>
                  {t('Raw Speech / Notes Text', 'بیان یا نوٹس کی تفصیلات', 'نص المحاضرة أو الملاحظات', 'Bayan Ya Notes Ki Tafseelat')}
                </label>
                <textarea
                  rows={5}
                  placeholder={t(
                    'Paste speech transcript, notes, or quotes. AMAL will scan and extract Quran, Hadith, and classical quotes...',
                    'یہاں بیان کا متن یا اقتباس چسپاں کریں۔ عمل خودکار انداز میں قرآنی آیات، احادیث اور اقوال کا استخراج کرے گا...',
                    'الصق نص الفائدة أو الخطبة هنا، وسيقوم عمل باستخراج الآيات والأحاديث النبوية وأقوال العلماء تلقائياً...',
                    'Bayan ya notes yahan paste karein. AMAL khud-kar tareeqe se Quran, Hadith aur aqwal-e-salaf extract karega...'
                  )}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  style={{ width: '100%', padding: 12, borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 14, fontFamily: 'inherit' }}
                />
              </div>

              <button
                type="submit"
                style={{ padding: '10px 22px', borderRadius: 8, backgroundColor: '#047857', color: '#FFF', border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer', alignSelf: 'flex-start' }}
              >
                {t('Scan, Extract & Save to Vault →', 'استخراج کریں اور ذخیرے میں محفوظ کریں ➔', 'استخراج الفوائد وحفظها ➔', 'Extract Karein Aur Vault Mein Save Karein ➔')}
              </button>
            </div>
          </form>
        )}

        {/* Tab 1: Saved Notes List */}
        {activeTab === 'NOTES' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {notes.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, border: '1px dashed #CBD5E1' }}>
                <span style={{ fontSize: 32, display: 'block', marginBottom: 12 }}>📝</span>
                <p style={{ margin: 0, fontWeight: 700, color: '#475569' }}>
                  {t('No lecture or study notes ingested yet.', 'ابھی تک کوئی درس یا خطبے کا نوٹ درج نہیں کیا گیا۔', 'لا توجد ملاحظات مسجلة بعد.', 'Abhi tak koi dars ya khutbah note darj nahi hua.')}
                </p>
              </div>
            ) : (
              notes.map(n => (
                <div key={n.noteId} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, border: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#047857', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: 4 }}>
                      {getSourceTypeLabel(n.sourceType)}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 12, color: '#6B7280' }}>
                        {t('Added: ', 'تاریخِ اندراج: ', 'تاريخ الإضافة: ', 'Indiraj: ')}{n.dateAdded}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteNote(n.noteId)}
                        style={{
                          border: '1px solid #FCA5A5',
                          backgroundColor: '#FEF2F2',
                          color: '#DC2626',
                          borderRadius: 6,
                          cursor: 'pointer',
                          fontSize: 11.5,
                          fontWeight: 700,
                          padding: '3px 8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                        title="Delete Note permanently"
                      >
                        <span>🗑️</span>
                        <span>{t('Delete', 'حذف کریں', 'حذف', 'Delete')}</span>
                      </button>
                    </div>
                  </div>

                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#111827', margin: '4px 0 10px' }}>{n.title}</h3>
                  <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6, margin: '0 0 16px', backgroundColor: '#F9FAFB', padding: 12, borderRadius: 8 }}>
                    "{n.rawText}"
                  </p>

                  {/* Extracted Citations */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#1B4332', marginBottom: 8 }}>
                      {t('VERIFIED CITATIONS EXTRACTED:', 'مستند مصادر و اسناد کا استخراج:', 'الشواهد المعتمدة المستخرجة:', 'Mustanad Hawala Jaat (Citations):')}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {n.extractedItems.map((item, idx) => (
                        <div key={idx} style={{ padding: 10, borderRadius: 6, backgroundColor: '#F0FDF4', border: '1px solid #86EFAC' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: '#166534' }}>{item.type}</span>
                            <span style={{ fontSize: 10, color: '#047857', fontWeight: 700 }}>
                              ✓ {t('CANONICAL MATCH', 'امہات الکتب سے توثیق شدہ', 'مطابق للأصول المعتمدة', 'Kutub Se Tasdeeq Shuda')}
                            </span>
                          </div>
                          <div style={{ fontSize: 13, color: '#111827', margin: '4px 0' }}>{item.content}</div>
                          <div style={{ fontSize: 11, color: '#6B7280' }}>
                            {t('Ref: ', 'حوالہ: ', 'المرجع: ', 'Hawala: ')}{item.sourceAttribution}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Spiritual Takeaways */}
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#1B4332', marginBottom: 6 }}>
                      {t('PRACTICAL SPIRITUAL TAKEAWAYS:', 'اہم عملی و روحانی نتائج:', 'الفوائد والدروس العملية:', 'Ahem Amli o Ruhani Nataij:')}
                    </div>
                    <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#374151', lineHeight: 1.6 }}>
                      {n.keySpiritualTakeaways.map((takeaway, idx) => (
                        <li key={idx}>{takeaway}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Spiritual Muhasabah Reflections */}
        {activeTab === 'REFLECTIONS' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {reflections.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, border: '1px dashed #CBD5E1' }}>
                <span style={{ fontSize: 32, display: 'block', marginBottom: 12 }}>🌱</span>
                <p style={{ margin: '0 0 14px', fontWeight: 700, color: '#475569' }}>
                  {t('No Muhasabah reflections logged yet.', 'ابھی تک کوئی ذاتی محاسبہ درج نہیں کیا گیا۔', 'لا توجد خواطر محاسبة مسجلة بعد.', 'Abhi tak koi zaati muhasabah darj nahi hua.')}
                </p>
                <Link
                  href="/reflections"
                  style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    borderRadius: 8,
                    backgroundColor: '#1B4332',
                    color: '#FFFFFF',
                    fontSize: 12,
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  {t('Write First Reflection →', 'پہلا محاسبہ لکھیں ➔', 'كتابة أول خاطرة ➔', 'Pehla Muhasabah Likhein ➔')}
                </Link>
              </div>
            ) : (
              reflections.map((r, idx) => (
                <div key={r.id || idx} style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#047857', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: 4 }}>
                      {r.type || 'DAILY_MUHASABAH'}
                    </span>
                    <span style={{ fontSize: 12, color: '#64748B' }}>
                      {r.timestamp ? new Date(r.timestamp).toLocaleDateString() : 'On-Device Record'}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: '#1E293B', lineHeight: 1.7, margin: 0, whiteSpace: 'pre-wrap' }}>
                    {r.content}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Sacred Bookmarks & Saved Ayahs */}
        {activeTab === 'BOOKMARKS' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {bookmarks.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, border: '1px dashed #CBD5E1' }}>
                <span style={{ fontSize: 32, display: 'block', marginBottom: 12 }}>🔖</span>
                <p style={{ margin: 0, fontWeight: 700, color: '#475569' }}>
                  {t('No bookmarks saved yet. Tap the bookmark icon while reading Quran or classical books.', 'ابھی کوئی بک مارک محفوظ نہیں۔ قرآن یا کتب کے مطالعے کے دوران بک مارک کا بٹن دبائیں۔', 'لا توجد محفوظات حالياً.', 'Koi bookmark save nahi hai. Quran ya kutub parhte waqt bookmark karein.')}
                </p>
              </div>
            ) : (
              bookmarks.map((bm) => (
                <div key={bm.id} style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 18, border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: '#0369A1', backgroundColor: '#F0F9FF', padding: '2px 6px', borderRadius: 4, textTransform: 'uppercase' }}>
                        {bm.category}
                      </span>
                      <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#0F172A' }}>
                        {bm.titleEnglish || bm.titleUrdu}
                      </h4>
                    </div>
                    {bm.excerpt && (
                      <p style={{ margin: '4px 0 0', fontSize: 12, color: '#475569', fontStyle: 'italic' }}>
                        "{bm.excerpt.slice(0, 120)}..."
                      </p>
                    )}
                    <span style={{ fontSize: 11, color: '#94A3B8' }}>{bm.sourceOrAuthor}</span>
                  </div>

                  <Link
                    href={bm.category === 'quran' ? `/quran?surah=${bm.targetId}` : `/library`}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 6,
                      backgroundColor: '#F8FAFC',
                      color: '#047857',
                      border: '1px solid #CBD5E1',
                      fontSize: 12,
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    {t('Open →', 'کھولیں ➔', 'عرض ➔', 'Kholein ➔')}
                  </Link>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 4: 151 Classical Works Catalog */}
        {activeTab === 'CANONICAL_CORPUS' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ marginBottom: 8 }}>
              <input
                type="text"
                placeholder={t('Search 151 classical works by title, author, or discipline (e.g. Ghazali, Nawawi, Bukhari, Hidayah)...', 'کتاب، مصنف یا فن کے اعتبار سے تلاش کریں (مثلاً: بخاری، نووی، قدوری، احیاء العلوم)...', 'ابحث في أمهات الكتب...', 'Kitab, musannif ya fan se search karein...')}
                value={corpusFilter}
                onChange={(e) => setCorpusFilter(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 13 }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
              {MASTER_CANONICAL_CORPUS.filter(w => {
                if (!corpusFilter.trim()) return true;
                const q = corpusFilter.toLowerCase();
                return (
                  w.title_transliterated.toLowerCase().includes(q) ||
                  w.title_arabic.includes(q) ||
                  w.author_name.toLowerCase().includes(q) ||
                  w.discipline.toLowerCase().includes(q)
                );
              }).map(w => (
                <div key={w.work_id} style={{ backgroundColor: '#FFFFFF', borderRadius: 10, padding: 16, border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#B45309', backgroundColor: '#FEF3C7', padding: '2px 6px', borderRadius: 4 }}>
                      {w.discipline}
                    </span>
                    <h4 style={{ margin: '8px 0 4px', fontSize: 15, fontWeight: 800, color: '#1B4332' }}>
                      {w.title_transliterated}
                    </h4>
                    <div style={{ fontSize: 13, color: '#475569', fontFamily: 'Amiri, serif', direction: 'rtl', textAlign: 'right', marginBottom: 6 }}>
                      {w.title_arabic}
                    </div>
                    <div style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>
                      {w.author_name} ({w.author_death_hijri} AH)
                    </div>
                  </div>

                  <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 10, color: '#059669', fontWeight: 700 }}>✓ Sawad al-A'zam</span>
                    <Link
                      href={`/library?work=${w.work_id}`}
                      style={{
                        padding: '4px 10px',
                        borderRadius: 6,
                        backgroundColor: '#ECFDF5',
                        color: '#065F46',
                        fontSize: 11.5,
                        fontWeight: 700,
                        textDecoration: 'none',
                        border: '1px solid #A7F3D0',
                      }}
                    >
                      {t('Read in Library →', 'مطالعہ کریں ➔', 'قراءة ➔', 'Read in Library ➔')}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}