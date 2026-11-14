import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { triggerHaptic } from '../../lib/haptics';
import { IslamicStarRosette } from '../ui/IslamicArabesqueFrame';

interface PrayerQiblaCardProps {
  qibla: {
    bearingDegrees: number;
    compassDirection: string;
    distanceKm: number;
  };
  selectedCityName: string;
}

export function PrayerQiblaCard({ qibla, selectedCityName }: PrayerQiblaCardProps) {
  const { t } = useLanguage();
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [hasSensorSupport, setHasSensorSupport] = useState(false);
  const lastVibratedRef = useRef<number>(0);

  // Check if device orientation is supported
  useEffect(() => {
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      setHasSensorSupport(true);
      // Auto-start on devices that do not require explicit iOS permissions
      if (typeof (window as any).DeviceOrientationEvent?.requestPermission !== 'function') {
        startOrientationListener();
      }
    }
  }, []);

  const handleOrientation = (e: DeviceOrientationEvent) => {
    let heading: number | null = null;
    if ((e as any).webkitCompassHeading !== undefined && (e as any).webkitCompassHeading !== null) {
      // iOS Safari heading (0 - 360)
      heading = (e as any).webkitCompassHeading;
    } else if (e.alpha !== null && e.alpha !== undefined) {
      // Android / standard compass
      heading = (360 - e.alpha) % 360;
    }

    if (heading !== null) {
      setDeviceHeading(Math.round(heading));
      setIsSensorActive(true);

      // Check alignment with Qibla (within +/- 3.5 degrees)
      const diff = Math.abs((heading - qibla.bearingDegrees + 360) % 360);
      const isAligned = diff <= 3.5 || diff >= 356.5;
      const now = Date.now();
      if (isAligned && now - lastVibratedRef.current > 1500) {
        lastVibratedRef.current = now;
        triggerHaptic('success');
      }
    }
  };

  const startOrientationListener = () => {
    if (typeof window !== 'undefined') {
      window.addEventListener('deviceorientationabsolute' as any, handleOrientation as any, true);
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
  };

  const requestSensorPermission = async () => {
    if (typeof window !== 'undefined' && typeof (window as any).DeviceOrientationEvent?.requestPermission === 'function') {
      try {
        const perm = await (window as any).DeviceOrientationEvent.requestPermission();
        if (perm === 'granted') {
          startOrientationListener();
          setIsSensorActive(true);
        }
      } catch (err) {
        console.warn('Orientation permission denied:', err);
      }
    } else {
      startOrientationListener();
    }
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientationabsolute' as any, handleOrientation as any, true);
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, []);

  // Needle angle: if sensor active, needle points to (bearing - heading); else points to bearing
  const needleRotation = deviceHeading !== null
    ? (qibla.bearingDegrees - deviceHeading + 360) % 360
    : qibla.bearingDegrees;

  const diffFromKaaba = deviceHeading !== null
    ? Math.abs((deviceHeading - qibla.bearingDegrees + 360) % 360)
    : 999;
  const isAlignedWithKaaba = diffFromKaaba <= 3.5 || diffFromKaaba >= 356.5;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 24,
        border: isAlignedWithKaaba ? '2px solid #10B981' : '1px solid #E5E7EB',
        textAlign: 'center',
        transition: 'border 0.3s ease, box-shadow 0.3s ease',
        boxShadow: isAlignedWithKaaba ? '0 8px 24px rgba(16, 185, 129, 0.2)' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1B4332', margin: 0 }}>
          {t('Qibla Azimuth & Compass', 'قبلہ رخ و کمپاس', 'اتجاه القبلة والبوصلة', 'Qibla Direction & Compass')}
        </h2>
        {isSensorActive && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 999,
              backgroundColor: isAlignedWithKaaba ? '#D1FAE5' : '#E0F2FE',
              color: isAlignedWithKaaba ? '#065F46' : '#0369A1',
            }}
          >
            {isAlignedWithKaaba
              ? t('ALIGNED', 'کعبہ رخ', 'مواجه للقبلة', 'ALIGNED')
              : t('LIVE SENSOR', 'لائیو سینسر', 'مستشعر حي', 'LIVE SENSOR')}
          </span>
        )}
      </div>

      <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 20 }}>
        {t(`Great circle heading towards the Kaaba (Makkah al-Mukarramah) from ${selectedCityName}`, `${selectedCityName} سے مکہ مکرمہ کی طرف خانہ کعبہ کا حقیقی رخ`, `الاتجاه نحو الكعبة المشرفة بمكة المكرمة من ${selectedCityName}`, `${selectedCityName} se Khana-e-Kaba (Makkah) ka direct rukh`)}
      </p>

      {/* Compass Visualization */}
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: '50%',
          margin: '0 auto 16px',
          border: isAlignedWithKaaba ? '4px solid #10B981' : '4px solid #1B4332',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isAlignedWithKaaba ? '#ECFDF5' : '#F0FDF4',
          boxShadow: isAlignedWithKaaba ? '0 0 20px rgba(16, 185, 129, 0.35)' : '0 4px 12px rgba(27,67,50,0.1)',
          transition: 'all 0.3s ease',
        }}
      >
        <span style={{ position: 'absolute', top: 6, fontWeight: 800, fontSize: 12, color: '#1B4332' }}>N</span>
        <span style={{ position: 'absolute', bottom: 6, fontWeight: 800, fontSize: 12, color: '#1B4332' }}>S</span>
        <span style={{ position: 'absolute', left: 8, fontWeight: 800, fontSize: 12, color: '#1B4332' }}>W</span>
        <span style={{ position: 'absolute', right: 8, fontWeight: 800, fontSize: 12, color: '#1B4332' }}>E</span>

        {/* Needle pointing to Qibla bearing */}
        <div
          style={{
            width: 4,
            height: 120,
            position: 'absolute',
            transform: `rotate(${needleRotation}deg)`,
            transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* North / Qibla pointer */}
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderBottom: isAlignedWithKaaba ? '20px solid #10B981' : '20px solid #DC2626',
            }}
          />
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IslamicStarRosette size={18} color={isAlignedWithKaaba ? '#10B981' : '#D4AF37'} />
          </div>
          {/* Opposite pointer */}
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderTop: '20px solid #64748B',
            }}
          />
        </div>
      </div>

      {/* Alignment status alert */}
      {isAlignedWithKaaba && (
        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: '#065F46',
            backgroundColor: '#D1FAE5',
            padding: '6px 14px',
            borderRadius: 8,
            marginBottom: 12,
            display: 'inline-block',
          }}
        >
          {t('✓ Facing Kaaba directly', '✓ قبلہ رخ سیدھا سامنے ہے', '✓ مواجه للكعبة المشرفة مباشرة', '✓ Facing Kaaba directly')}
        </div>
      )}

      <div style={{ fontSize: 28, fontWeight: 800, color: '#1B4332' }}>
        {qibla.bearingDegrees}°
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#4B5563', marginTop: 4 }}>
        {t('Heading: ', 'رخ: ', 'الاتجاه: ', 'Heading: ')}{qibla.compassDirection}
        {deviceHeading !== null && (
          <span style={{ fontSize: 12, color: '#64748B', marginLeft: 6, fontWeight: 500 }}>
            ({t('Device: ', 'ڈیوائس: ', 'الجهاز: ', 'Device: ')}{deviceHeading}°)
          </span>
        )}
      </div>

      {/* Compass Status: Live activation on mobile vs stationary guidance on desktop */}
      {!isSensorActive && hasSensorSupport ? (
        <div style={{ marginTop: 12 }}>
          <button
            type="button"
            onClick={requestSensorPermission}
            style={{
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 600,
              color: '#1B4332',
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            {t('Activate Live Gyro Compass', 'لائیو گائرو کمپاس فعال کریں', 'تفعيل البوصلة الحية', 'Live Gyro Compass On Karein')}
          </button>
        </div>
      ) : !isSensorActive ? (
        <div style={{ marginTop: 10, fontSize: 11, color: '#64748B' }}>
          {t(
            `Desktop / Stationary Mode: Face ${qibla.bearingDegrees}° (${qibla.compassDirection}) using standard magnetic north`,
            `ڈیسک ٹاپ موڈ: قطب نما کی مدد سے ${qibla.bearingDegrees}° (${qibla.compassDirection}) رخ اختیار فرمائیں`,
            `وضع سطح المكتب: اتجه نحو ${qibla.bearingDegrees} درجة (${qibla.compassDirection}) باستخدام الشمال المغناطيسي`,
            `Desktop Mode: Standard compass se ${qibla.bearingDegrees}° (${qibla.compassDirection}) rukh karein`
          )}
        </div>
      ) : (
        <div style={{ marginTop: 10, fontSize: 11, color: '#64748B' }}>
          {t(
            '🧭 Live Gyro Compass · Gently rotate device in a figure-8 motion if needle drifts',
            '🧭 لائیو کمپاس فعال ہے · سوئی میں فرق آنے پر فون کو 8 کے انداز میں گھمائیں',
            '🧭 البوصلة نشطة · حرّك الهاتف برفق على شكل ٨ لمعايرة المستشعر',
            '🧭 Live Gyro Compass · Needle drift karey to device ko figure-8 mein rotate karein'
          )}
        </div>
      )}

      <div
        style={{
          fontSize: 12,
          color: '#6B7280',
          marginTop: 12,
          padding: '8px 12px',
          backgroundColor: '#F9FAFB',
          borderRadius: 8,
        }}
      >
        {t('Distance to Holy Kaaba: ', 'خانہ کعبہ کا فاصلہ: ', 'المسافة إلى الكعبة المشرفة: ', 'Khana-e-Kaba ka Faasla: ')}<strong>{qibla.distanceKm.toLocaleString()} km</strong>
      </div>
    </div>
  );
}

