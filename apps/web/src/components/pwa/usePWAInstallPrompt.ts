import { useState, useEffect } from 'react';
import { showAmalToast } from '../Toast';

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
      const isNavStandalone = (window.navigator as any).standalone === true;
      setIsStandalone(isWindowStandalone || isNavStandalone);
    };

    checkStandalone();

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Check if deferredPrompt is present
    const updatePromptStatus = () => {
      setCanPrompt(Boolean((window as any).deferredPrompt));
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
    const promptEvent = (window as any).deferredPrompt;
    if (promptEvent) {
      setIsInstalling(true);
      try {
        await promptEvent.prompt();
        const choiceResult = await promptEvent.userChoice;
        if (choiceResult.outcome === 'accepted') {
          showAmalToast('AMAL OS کامیابی سے آپ کی ہوم اسکرین پر شامل ہو گیا ہے!', 'success');
          (window as any).deferredPrompt = null;
          setCanPrompt(false);
          setIsStandalone(true);
          onClose();
        } else {
          showAmalToast('انسٹالیشن منسوخ کر دی گئی۔', 'info');
        }
      } catch (err) {
        showAmalToast('براؤزر میں انسٹال کرنے کے لیے براؤزر مینیو استعمال کریں۔', 'info');
      } finally {
        setIsInstalling(false);
      }
    } else if (isIOS) {
      // iOS has no programmatic prompt, keep modal open to show instructions
    } else {
      showAmalToast('براؤزر کے مینیو میں جا کر "Add to Home Screen" یا "Install AMAL OS" منتخب کریں۔', 'info');
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
