import React, { useState, useEffect } from 'react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export function showAmalToast(message: string, type: 'success' | 'info' | 'warning' = 'success') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('amal-toast', {
        detail: { message, type },
      })
    );
  }
}

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToastEvent = (e: CustomEvent<{ message: string; type?: 'success' | 'info' | 'warning' }>) => {
      const newToast: ToastMessage = {
        id: `toast_${Date.now()}_${Math.random()}`,
        message: e.detail.message,
        type: e.detail.type || 'success',
      };

      setToasts((prev) => [...prev, newToast]);

      // Auto dismiss after 3200ms
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 3200);
    };

    window.addEventListener('amal-toast' as any, handleToastEvent);
    return () => window.removeEventListener('amal-toast' as any, handleToastEvent);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      zIndex: 10000,
      pointerEvents: 'none',
      maxWidth: '90vw',
    }}>
      {toasts.map((t) => {
        const isSuccess = t.type === 'success';
        const isWarning = t.type === 'warning';

        return (
          <div
            key={t.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 18px',
              borderRadius: 30,
              backgroundColor: isSuccess ? '#064E3B' : isWarning ? '#78350F' : '#1E293B',
              color: '#FFFFFF',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              fontSize: 13,
              fontWeight: 600,
              border: `1px solid ${isSuccess ? '#059669' : isWarning ? '#D97706' : '#475569'}`,
              animation: 'toast-in 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: 'auto',
            }}
          >
            <span>{isSuccess ? '✓' : isWarning ? '⚠' : 'ℹ'}</span>
            <span>{t.message}</span>
          </div>
        );
      })}
    </div>
  );
};
