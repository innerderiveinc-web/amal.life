import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import { UniversalSearchEngine, SearchResultItem } from '@amal/amal-engine';
import { AmalTheme } from '@amal/ui';
import { SMART_FIQH_DATA, SmartFiqhItem } from '../data/smart-fiqh-finder-data';

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UniversalSearchModal: React.FC<UniversalSearchModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'ALL' | 'FIQH'>('ALL');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = UniversalSearchEngine.getPopularSuggestions();

  // Match Smart Fiqh items with deterministic accuracy
  const matchedFiqhItems = useMemo<SmartFiqhItem[]>(() => {
    if (!query.trim()) {
      return searchMode === 'FIQH' ? SMART_FIQH_DATA : [];
    }
    const q = query.toLowerCase().trim();
    return SMART_FIQH_DATA.filter(item => {
      const matchKeyword = item.keywords.some(k => k.toLowerCase().includes(q) || q.includes(k.toLowerCase()));
      const matchUrdu = item.questionUrdu.includes(q) || item.summaryUrdu.includes(q);
      const matchEn = item.questionEnglish.toLowerCase().includes(q) || item.summaryEnglish.toLowerCase().includes(q);
      return matchKeyword || matchUrdu || matchEn;
    });
  }, [query, searchMode]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setResults(UniversalSearchEngine.search(''));
    } else {
      setQuery('');
      setResults([]);
      setSearchMode('ALL');
    }
  }, [isOpen]);

  const handleQueryChange = (text: string) => {
    setQuery(text);
    if (text.trim().length > 0) {
      const matched = UniversalSearchEngine.search(text, 10);
      setResults(matched);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '10vh',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '92%',
          maxWidth: 640,
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #E2E8F0',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #E2E8F0',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 20 }}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => handleQueryChange(e.target.value)}
            placeholder="تلاش کریں / Search Quran, Hadith, Duas, Zakat, Miras, Prayer..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: 16,
              color: '#1E293B',
            }}
          />
          {query && (
            <button
              onClick={() => handleQueryChange('')}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: '#94A3B8',
                fontSize: 14,
              }}
            >
              ✕
            </button>
          )}
          <span
            style={{
              fontSize: 11,
              color: '#64748B',
              backgroundColor: '#F1F5F9',
              padding: '2px 6px',
              borderRadius: 4,
              fontWeight: 600,
            }}
          >
            ESC
          </span>
        </div>

        {/* Search Mode Switcher Tabs */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#F8FAFC',
            padding: '8px 20px',
            gap: 10,
            borderBottom: '1px solid #E2E8F0',
          }}
        >
          <button
            onClick={() => setSearchMode('ALL')}
            style={{
              padding: '5px 14px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: searchMode === 'ALL' ? '#065F46' : '#E2E8F0',
              color: searchMode === 'ALL' ? '#FFFFFF' : '#475569',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.15s ease',
            }}
          >
            <span>🔍</span>
            <span>ہمہ جہت تلاش (All Search)</span>
          </button>

          <button
            onClick={() => setSearchMode('FIQH')}
            style={{
              padding: '5px 14px',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: searchMode === 'FIQH' ? '#065F46' : '#E2E8F0',
              color: searchMode === 'FIQH' ? '#FFFFFF' : '#475569',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.15s ease',
            }}
          >
            <span>⚡</span>
            <span>فوری فقہی رہنمائی (Smart Fiqh Finder)</span>
          </button>
        </div>

        {/* Suggestion Chips when query is empty */}
        {query.trim().length === 0 && (
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ fontSize: 12, color: '#64748B', marginBottom: 8, fontWeight: 600 }}>
              POPULAR DISCOVERY TOPICS (اہم موضوعات):
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => handleQueryChange(s)}
                  style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: 20,
                    padding: '4px 12px',
                    fontSize: 12,
                    color: '#334155',
                    cursor: 'pointer',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        <div style={{ maxHeight: 420, overflowY: 'auto', padding: '8px 0' }}>
          {/* Smart Fiqh Finder Direct Verified Answers */}
          {matchedFiqhItems.length > 0 && (
            <div style={{ padding: '8px 16px', marginBottom: 8 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#065F46',
                  textTransform: 'uppercase',
                  letterSpacing: 0.8,
                  marginBottom: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>⚡</span>
                <span>مصدقہ فقہی فتاویٰ و احکام (Source-Backed Classical Rulings):</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {matchedFiqhItems.map((fiqh) => (
                  <div
                    key={fiqh.id}
                    style={{
                      backgroundColor: '#F0FDF4',
                      border: '1px solid #BBF7D0',
                      borderRadius: 12,
                      padding: '14px 16px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#064E3B' }}>
                          {fiqh.questionUrdu}
                        </div>
                        <div style={{ fontSize: 12, color: '#334155', marginTop: 2 }}>
                          {fiqh.questionEnglish}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: 6,
                          backgroundColor:
                            fiqh.hukmType === 'FARZ'
                              ? '#DC2626'
                              : fiqh.hukmType === 'WAJIB'
                              ? '#D97706'
                              : fiqh.hukmType === 'SUNNAH'
                              ? '#059669'
                              : '#2563EB',
                          color: '#FFFFFF',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {fiqh.hukmUrdu}
                      </span>
                    </div>

                    <div style={{ fontSize: 13, color: '#1E293B', lineHeight: 1.6, marginTop: 6, backgroundColor: '#FFFFFF', padding: '10px 12px', borderRadius: 8, border: '1px solid #DCFCE7' }}>
                      <p style={{ margin: '0 0 4px', fontWeight: 600 }}>{fiqh.summaryUrdu}</p>
                      <p style={{ margin: 0, fontSize: 12, color: '#475569' }}>{fiqh.summaryEnglish}</p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, flexWrap: 'wrap', gap: 6 }}>
                      <div style={{ fontSize: 11, color: '#047857', fontWeight: 700 }}>
                        📖 حوالہ: {fiqh.canonicalReference}
                      </div>
                      {fiqh.libraryBookId && (
                        <button
                          onClick={() => handleSelect(`/library?book=${fiqh.libraryBookId}`)}
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            backgroundColor: '#065F46',
                            color: '#FFFFFF',
                            border: 'none',
                            borderRadius: 6,
                            padding: '4px 10px',
                            cursor: 'pointer',
                          }}
                        >
                          کتاب میں مطالعہ کریں →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchMode === 'FIQH' && matchedFiqhItems.length === 0 && query.trim().length > 0 && (
            <div style={{ padding: '32px 20px', textAlign: 'center', color: '#64748B', fontSize: 14 }}>
              اس فقہی سوال کا مصدقہ حوالہ تلاش نہیں ہو سکا۔
              <br />
              <span style={{ fontSize: 12, color: '#94A3B8' }}>
                نمونہ الفاظ: سفر، قصر، غسل، سجدہ سہو، زکوٰۃ، حیض، وتر، انجکشن، ناخن پالش
              </span>
            </div>
          )}

          {searchMode === 'ALL' && results.length === 0 && matchedFiqhItems.length === 0 && query.trim().length > 0 && (
            <div style={{ padding: '32px 20px', textAlign: 'center', color: '#64748B', fontSize: 14 }}>
              کوئی نتیجہ نہیں ملا۔ برائے مہربانی آسان الفاظ لکھیں۔
              <br />
              <span style={{ fontSize: 12, color: '#94A3B8' }}>No results found for &quot;{query}&quot;. Try generic keywords.</span>
            </div>
          )}

          {searchMode === 'ALL' && results.map(item => (
            <div
              key={item.id}
              onClick={() => handleSelect(item.href)}
              style={{
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                borderBottom: '1px solid #F8FAFC',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      backgroundColor:
                        item.category === 'QURAN'
                          ? '#D1FAE5'
                          : item.category === 'HADITH'
                          ? '#DBEAFE'
                          : item.category === 'FIQH'
                          ? '#EDE9FE'
                          : item.category === 'AQEEDAH'
                          ? '#FEF08A'
                          : item.category === 'DUA'
                          ? '#E0F2FE'
                          : item.category === 'CALCULATOR'
                          ? '#FEF3C7'
                          : item.category === 'SIRAH'
                          ? '#FCE7F3'
                          : '#F3F4F6',
                      color:
                        item.category === 'QURAN'
                          ? '#065F46'
                          : item.category === 'HADITH'
                          ? '#1E40AF'
                          : item.category === 'FIQH'
                          ? '#5B21B6'
                          : item.category === 'AQEEDAH'
                          ? '#854D0E'
                          : item.category === 'DUA'
                          ? '#0369A1'
                          : item.category === 'CALCULATOR'
                          ? '#92400E'
                          : item.category === 'SIRAH'
                          ? '#9D174D'
                          : '#374151',
                      padding: '2px 6px',
                      borderRadius: 4,
                    }}
                  >
                    {item.category}
                  </span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#1E293B' }}>
                    {item.titleEn}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: '#475569', marginTop: 3 }}>
                  {item.titleUr}
                </div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>
                  {item.snippetEn}
                </div>
              </div>

              <span style={{ fontSize: 16, color: '#94A3B8' }}>→</span>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div
          style={{
            padding: '10px 20px',
            backgroundColor: '#F8FAFC',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 11,
            color: '#64748B',
          }}
        >
          <span>100% Sunni Classical Corpus & Verified Calculations</span>
          <span>پوری ایپ میں فوری تلاش</span>
        </div>
      </div>
    </div>
  );
};
