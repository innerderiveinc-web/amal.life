import React, { useState, useEffect } from 'react';
import { SistersPinLockView } from './SistersPinLockView';
import { SistersCycleLogManager, SavedCycleRecord } from './SistersCycleLogManager';

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
