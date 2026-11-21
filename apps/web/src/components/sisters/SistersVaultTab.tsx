import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SistersPinLockView } from './SistersPinLockView';
import { SistersCycleLogManager, SavedCycleRecord } from './SistersCycleLogManager';

// WebCrypto SHA-256 Cryptographic Hash Helper for PIN Protection
async function hashPin(pin: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(`amal_nisa_sovereign_salt_${pin}`);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  return `hash_${pin}`;
}

export interface SistersVaultTabProps {
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
  const { t } = useLanguage();
  const [enteredPin, setEnteredPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [pinError, setPinError] = useState('');

  // Cycle Logs State (Stored 100% on-device in localStorage)
  const [cycleStartDate, setCycleStartDate] = useState('');
  const [cycleEndDate, setCycleEndDate] = useState('');
  const [cycleNotes, setCycleNotes] = useState('');
  const [savedCycles, setSavedCycles] = useState<SavedCycleRecord[]>([]);

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

  const handleUnlockPin = async () => {
    const storedPin = localStorage.getItem('amal_nisa_pin');
    if (!storedPin) return;

    let isMatch = false;
    // Transparently handle and upgrade legacy 4-digit plain-text PIN
    if (storedPin.length === 4) {
      if (enteredPin === storedPin) {
        isMatch = true;
        const upgradedHash = await hashPin(enteredPin);
        localStorage.setItem('amal_nisa_pin', upgradedHash);
      }
    } else {
      const enteredHash = await hashPin(enteredPin);
      if (enteredHash === storedPin) {
        isMatch = true;
      }
    }

    if (isMatch) {
      setIsPinLocked(false);
      setPinError('');
      setEnteredPin('');
    } else {
      setPinError(
        t(
          'Incorrect PIN! Please try again.',
          'غلط پن کوڈ! براہِ کرم دوبارہ کوشش کریں۔',
          'الرمز السري غير صحيح! يرجى المحاولة مرة أخرى.',
          'Ghalat PIN code! Barah-e-karam dobara koshish karein.'
        )
      );
    }
  };

  const handleSavePin = async () => {
    if (newPin.length === 4 && /^\d+$/.test(newPin)) {
      const hashed = await hashPin(newPin);
      localStorage.setItem('amal_nisa_pin', hashed);
      setHasPinConfigured(true);
      setIsPinLocked(false);
      setIsSettingUpPin(false);
      setNewPin('');
      setPinError('');
    } else {
      setPinError(
        t(
          'Please enter a valid 4-digit numeric PIN.',
          'براہِ کرم ۴ ہندسوں پر مشتمل درست پن کوڈ درج کریں۔',
          'يرجى إدخال رمز سري صحيح مكون من ٤ أرقام.',
          'Barah-e-karam 4 hindson par mushtamil durust PIN darj karein.'
        )
      );
    }
  };

  const handleRemovePin = () => {
    if (
      window.confirm(
        t(
          'Are you sure you want to remove the PIN lock?',
          'کیا آپ واقعی پن لاک ختم کرنا چاہتے ہیں؟',
          'هل أنت متأكد من رغبتك في إزالة قفل الرمز السري؟',
          'Kya aap waqai PIN lock khatam karna chahte hain?'
        )
      )
    ) {
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
      end: cycleEndDate || t('Ongoing', 'جاری ہے', 'مستمر', 'Jari hai'),
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
        <SistersPinLockView
          isUrdu={isUrdu}
          enteredPin={enteredPin}
          pinError={pinError}
          setEnteredPin={setEnteredPin}
          onUnlockPin={handleUnlockPin}
          onRemovePin={handleRemovePin}
        />
      ) : (
        /* Unlocked Vault */
        <SistersCycleLogManager
          isUrdu={isUrdu}
          hasPinConfigured={hasPinConfigured}
          isSettingUpPin={isSettingUpPin}
          newPin={newPin}
          pinError={pinError}
          cycleStartDate={cycleStartDate}
          cycleEndDate={cycleEndDate}
          cycleNotes={cycleNotes}
          savedCycles={savedCycles}
          onLockVault={() => setIsPinLocked(true)}
          onRemovePin={handleRemovePin}
          onOpenPinSetup={() => setIsSettingUpPin(true)}
          onCancelPinSetup={() => setIsSettingUpPin(false)}
          setNewPin={setNewPin}
          onSavePin={handleSavePin}
          setCycleStartDate={setCycleStartDate}
          setCycleEndDate={setCycleEndDate}
          setCycleNotes={setCycleNotes}
          onSaveCycle={handleSaveCycle}
          onDeleteCycle={handleDeleteCycle}
        />
      )}
    </div>
  );
}
