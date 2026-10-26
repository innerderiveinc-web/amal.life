import { useState } from 'react';

export interface MobileAppState {
  activeScreen: string;
  selectedLanguage: 'ur' | 'en';
  isOfflineMode: boolean;
  selectedCity: string;
}

const defaultState: MobileAppState = {
  activeScreen: 'Today',
  selectedLanguage: 'ur',
  isOfflineMode: false,
  selectedCity: 'Karachi, Pakistan',
};

export function useAppStore() {
  const [state, setState] = useState<MobileAppState>(defaultState);

  const setActiveScreen = (screen: string) => {
    setState((prev) => ({ ...prev, activeScreen: screen }));
  };

  const toggleLanguage = () => {
    setState((prev) => ({ ...prev, selectedLanguage: prev.selectedLanguage === 'ur' ? 'en' : 'ur' }));
  };

  const setCity = (city: string) => {
    setState((prev) => ({ ...prev, selectedCity: city }));
  };

  return {
    ...state,
    setActiveScreen,
    toggleLanguage,
    setCity,
  };
}
