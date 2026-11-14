import { useState, useEffect } from 'react';
import { showAmalToast } from '../Toast';

const getLang = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('amal_app_language') || 'ur';
  }
  return 'ur';
};

export function usePWAInstallPrompt(isOpen: boolean, onClose: () => void) {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [canPrompt, setCanPrompt] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect standalone PWA mode
    const checkStandalone = () => {
      const isWindowStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isNavStandalone = window.navigator.standalone === true;
      setIsStandalone(isWindowStandalone || isNavStandalone);
    };

    checkStandalone();

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Check if deferredPrompt is present
    const updatePromptStatus = () => {
      setCanPrompt(Boolean(window.deferredPrompt));
    };

    updatePromptStatus();

    window.addEventListener('amal-pwa-installable', updatePromptStatus);
    window.addEventListener('amal-pwa-installed', () => {
      setIsStandalone(true);
      setCanPrompt(false);
    });

    return () => {
      window.removeEventListener('amal-pwa-installable', updatePromptStatus);
    };
  }, [isOpen]);

  const handleInstallClick = async () => {
    const promptEvent = window.deferredPrompt;
    if (promptEvent) {
      setIsInstalling(true);
      try {
        await promptEvent.prompt();
        const choiceResult = await promptEvent.userChoice;
        const lang = getLang();
        if (choiceResult.outcome === 'accepted') {
          showAmalToast(
            lang === 'ur'
              ? 'AMAL OS کامیابی سے آپ کی ہوم اسکرین پر شامل ہو گیا ہے!'
              : lang === 'ar'
              ? 'تمت إضافة نظام عمل بنجاح إلى شاشتك الرئيسية!'
              : lang === 'ru'
              ? 'AMAL OS kamyabi se home screen par shamil ho gaya!'
              : 'AMAL OS successfully installed to your home screen!',
            'success'
          );
          window.deferredPrompt = null;
          setCanPrompt(false);
          setIsStandalone(true);
          onClose();
        } else {
          showAmalToast(
            lang === 'ur'
              ? 'انسٹالیشن منسوخ کر دی گئی۔'
              : lang === 'ar'
              ? 'تم إلغاء التثبيت.'
              : lang === 'ru'
              ? 'Installation mansookh kar di gayi.'
              : 'Installation cancelled.',
            'info'
          );
        }
      } catch (err) {
        const lang = getLang();
        showAmalToast(
          lang === 'ur'
            ? 'براؤزر میں انسٹال کرنے کے لیے براؤزر مینیو استعمال کریں۔'
            : lang === 'ar'
            ? 'يرجى استخدام قائمة المتصفح للتثبيت.'
            : lang === 'ru'
            ? 'Browser menu se install karein.'
            : 'Please use the browser menu to install.',
          'info'
        );
      } finally {
        setIsInstalling(false);
      }
    } else if (isIOS) {
      // iOS has no programmatic prompt, keep modal open to show instructions
    } else {
      const lang = getLang();
      showAmalToast(
        lang === 'ur'
          ? 'براؤزر کے مینیو میں جا کر "Add to Home Screen" یا "Install AMAL OS" منتخب کریں۔'
          : lang === 'ar'
          ? 'اختر "إضافة إلى الشاشة الرئيسية" من قائمة المتصفح.'
          : lang === 'ru'
          ? 'Browser menu se "Add to Home Screen" select karein.'
          : 'Select "Add to Home Screen" or "Install AMAL OS" from the browser menu.',
        'info'
      );
    }
  };

  return {
    isIOS,
    isStandalone,
    canPrompt,
    isInstalling,
    handleInstallClick,
  };
}
