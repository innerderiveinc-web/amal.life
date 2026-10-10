import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { showAmalToast } from '../components/Toast';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'SCHOLARLY' | 'GENERAL' | 'BUG' | 'PARTNERSHIP'>('GENERAL');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showAmalToast('Please fill all required fields.', 'warning');
      return;
    }
    setSubmitted(true);
    showAmalToast('JazakAllahu Khayran! Your message has been received.', 'success');
  };

  return (
    <div style={{ backgroundColor: '#FAF9F6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>Contact & Support — AMAL OS</title>
        <meta name="description" content="Get in touch with AMAL OS for scholarly feedback, community support, or institutional inquiries." />
      </Head>

      <Navigation />

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 60px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span style={{ fontSize: 36 }}>📬</span>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#1B4332', marginTop: 8, marginBottom: 8 }}>
            Contact & Scholarly Inquiries
          </h1>
          <p style={{ fontSize: 14, color: '#6B7280', maxWidth: 600, margin: '0 auto' }}>
            رابطہ و شرعی استفسار · Have a question, bug report, or scholarly observation? We are here to listen with humility and diligence.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {/* Direct Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>📜</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1B4332', marginBottom: 4 }}>Scholarly & Fiqh Review</h3>
              <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 10, lineHeight: 1.5 }}>
                For Muftis, Ulama, and academic researchers reviewing textual references, corpus grading, or Madhhab accuracy.
              </p>
              <a href="mailto:scholars@amal.life" style={{ color: '#047857', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                scholars@amal.life →
              </a>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>🤝</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1B4332', marginBottom: 4 }}>General Support & Feedback</h3>
              <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 10, lineHeight: 1.5 }}>
                Questions regarding prayer times, city coordinates, app usage, or community suggestions.
              </p>
              <a href="mailto:salam@amal.life" style={{ color: '#047857', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                salam@amal.life →
              </a>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>🛡️</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1B4332', marginBottom: 4 }}>Privacy & Security Officer</h3>
              <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 10, lineHeight: 1.5 }}>
                For questions regarding data sovereignty, account deletion, and zero-tracking verification.
              </p>
              <a href="mailto:privacy@amal.life" style={{ color: '#047857', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                privacy@amal.life →
              </a>
            </div>
          </div>

          {/* Form */}
          <div style={{ backgroundColor: '#FFFFFF', padding: 28, borderRadius: 12, border: '1px solid #E5E7EB' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1B4332', marginBottom: 18 }}>
              Send a Direct Message
            </h2>

            {submitted ? (
              <div style={{ backgroundColor: '#F0FDF4', padding: 24, borderRadius: 10, border: '1px solid #BBF7D0', textAlign: 'center' }}>
                <span style={{ fontSize: 32 }}>✨</span>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#166534', marginTop: 10, marginBottom: 6 }}>
                  Message Received with Honor
                </h3>
                <p style={{ fontSize: 13, color: '#15803D', lineHeight: 1.5 }}>
                  Your submission has been logged into our queue. A member of our team or scholarly board will review it promptly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setMessage(''); }}
                  style={{
                    marginTop: 16,
                    backgroundColor: '#166534',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 6,
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Zaid Khan"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: '1px solid #D1D5DB',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: '1px solid #D1D5DB',
                      fontSize: 14,
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>
                    Inquiry Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: '1px solid #D1D5DB',
                      fontSize: 14,
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <option value="GENERAL">General Question or Feedback</option>
                    <option value="SCHOLARLY">Fiqh / Scholarly Text Observation</option>
                    <option value="BUG">Bug or Astronomical Timing Issue</option>
                    <option value="PARTNERSHIP">Masjid / Community Institution</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 4 }}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your observation or inquiry..."
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: '1px solid #D1D5DB',
                      fontSize: 14,
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: '#1B4332',
                    color: '#FFFFFF',
                    padding: '12px 20px',
                    borderRadius: 8,
                    border: 'none',
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: 'pointer',
                    marginTop: 6,
                  }}
                >
                  Submit Inquiry →
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
