import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class GlobalCrashGuardErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message || 'An unexpected error occurred.',
    };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AMAL OS Crash Guard caught an unhandled error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, errorMessage: '' });
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            backgroundColor: '#F8F9FA',
          }}
        >
          <div
            style={{
              maxWidth: 500,
              width: '100%',
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: '32px 24px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 16 }}>🛡️</div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: '#065F46',
                margin: '0 0 8px',
              }}
            >
              الْحَمْدُ لِلَّهِ — Data is Protected
            </h2>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: '#1F2937',
                marginBottom: 8,
                direction: 'rtl',
                fontFamily: 'var(--font-urdu), serif',
              }}
            >
              پریشان نہ ہوں، آپ کا ڈیٹا اور ترتیبات بالکل محفوظ ہیں۔
            </div>
            <p
              style={{
                fontSize: 13,
                color: '#4B5563',
                lineHeight: 1.6,
                margin: '0 0 20px',
              }}
            >
              An unexpected display issue occurred in this section. Your habit streaks, bookmarks, and audio playback session remain safely preserved.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                onClick={this.handleReset}
                style={{
                  padding: '10px 24px',
                  borderRadius: 10,
                  backgroundColor: '#065F46',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: 14,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(6, 95, 70, 0.25)',
                  transition: 'all 0.15s ease',
                }}
              >
                🔄 Refresh & Recover
              </button>

              <button
                onClick={() => {
                  this.setState({ hasError: false, errorMessage: '' });
                }}
                style={{
                  padding: '10px 20px',
                  borderRadius: 10,
                  backgroundColor: '#F3F4F6',
                  color: '#374151',
                  fontWeight: 600,
                  fontSize: 13,
                  border: '1px solid #D1D5DB',
                  cursor: 'pointer',
                }}
              >
                Ignore & Continue
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
