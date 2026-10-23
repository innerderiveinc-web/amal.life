import React from 'react';
import { GlobalCity } from '../../lib/global-locations';
import { CalculationMethod } from '@amal/amal-engine';

interface CitySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  citySearchQuery: string;
  setCitySearchQuery: (q: string) => void;
  handleSearchWorldMap: () => void;
  isGeocoding: boolean;
  handleUseGPS: () => void;
  externalResults: any[];
  filteredPresetCities: GlobalCity[];
  selectedCity: GlobalCity;
  handleSelectCity: (city: GlobalCity) => void;
  method: CalculationMethod;
}

export const CitySearchModal: React.FC<CitySearchModalProps> = ({
  isOpen,
  onClose,
  citySearchQuery,
  setCitySearchQuery,
  handleSearchWorldMap,
  isGeocoding,
  handleUseGPS,
  externalResults,
  filteredPresetCities,
  selectedCity,
  handleSelectCity,
  method,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 10005,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '92%',
          maxWidth: 620,
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: 28,
          border: '1px solid #E2E8F0',
          maxHeight: '85vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1B4332', margin: 0 }}>
              🌍 Select or Search Any City in the World
            </h2>
            <p style={{ fontSize: 12, color: '#64748B', margin: '4px 0 0' }}>
              Choose from 100+ preset global cities or type any town or village worldwide.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', fontSize: 20, cursor: 'pointer', color: '#94A3B8' }}
            aria-label="Close City Search Modal"
          >
            ✕
          </button>
        </div>

        {/* Search Input */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <input
            type="text"
            autoFocus
            value={citySearchQuery}
            onChange={(e) => setCitySearchQuery(e.target.value)}
            placeholder="Type city name (e.g. Delhi, Lucknow, Hyderabad, London, Dubai)..."
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: 10,
              border: '2px solid #1B4332',
              fontSize: 14,
              outline: 'none',
            }}
          />
          <button
            onClick={handleSearchWorldMap}
            disabled={isGeocoding || !citySearchQuery.trim()}
            style={{
              padding: '12px 18px',
              borderRadius: 10,
              backgroundColor: '#1B4332',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {isGeocoding ? 'Searching...' : 'Search Map ↗'}
          </button>
        </div>

        {/* Quick GPS Button */}
        <div style={{ marginBottom: 16 }}>
          <button
            onClick={handleUseGPS}
            style={{
              width: '100%',
              padding: 10,
              borderRadius: 8,
              backgroundColor: '#ECFDF5',
              color: '#065F46',
              border: '1px solid #A7F3D0',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <span>📍</span>
            <span>Auto-Detect My GPS Location Right Now</span>
          </button>
        </div>

        {/* Online OpenStreetMap Geocoded Results (if any) */}
        {externalResults.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#047857', marginBottom: 8 }}>
              WORLD MAP GEOCODING RESULTS:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {externalResults.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const newCity: GlobalCity = {
                      name: item.name || item.display_name.split(',')[0],
                      country: item.display_name.split(',').pop()?.trim() || 'Worldwide',
                      region: 'Geocoded Map',
                      lat: Number(parseFloat(item.lat).toFixed(4)),
                      lon: Number(parseFloat(item.lon).toFixed(4)),
                      defaultMethod: method,
                    };
                    handleSelectCity(newCity);
                  }}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 8,
                    backgroundColor: '#F0FDF4',
                    border: '1px solid #86EFAC',
                    cursor: 'pointer',
                    fontSize: 13,
                  }}
                >
                  <div style={{ fontWeight: 700, color: '#166534' }}>{item.display_name}</div>
                  <div style={{ fontSize: 11, color: '#4B5563', marginTop: 2 }}>
                    Coordinates: {parseFloat(item.lat).toFixed(4)}° N, {parseFloat(item.lon).toFixed(4)}° E
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Preset Global Cities List */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
            <span>PRESET GLOBAL CITIES ({filteredPresetCities.length})</span>
            {citySearchQuery && <span>Matching &ldquo;{citySearchQuery}&rdquo;</span>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 360, overflowY: 'auto' }}>
            {filteredPresetCities.map((c, idx) => {
              const isSelected = selectedCity.name === c.name;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelectCity(c)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 8,
                    backgroundColor: isSelected ? '#ECFDF5' : '#F8FAFC',
                    border: isSelected ? '2px solid #10B981' : '1px solid #E2E8F0',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.1s ease',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, color: '#1E293B', fontSize: 14 }}>
                      {c.name}
                    </div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>
                      {c.country} • {c.region}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 11, color: '#94A3B8', fontFamily: 'monospace' }}>
                      {c.lat.toFixed(2)}°, {c.lon.toFixed(2)}°
                    </span>
                    {isSelected && (
                      <div style={{ fontSize: 11, color: '#059669', fontWeight: 800 }}>✓ SELECTED</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
