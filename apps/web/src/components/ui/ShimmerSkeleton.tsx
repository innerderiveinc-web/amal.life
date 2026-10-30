import React from 'react';

export interface ShimmerSkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
  circle?: boolean;
}

export const ShimmerSkeleton: React.FC<ShimmerSkeletonProps> = ({
  width = '100%',
  height = 18,
  borderRadius = 8,
  className = '',
  style = {},
  circle = false,
}) => {
  const finalRadius = circle ? '50%' : borderRadius;

  return (
    <div
      className={`amal-shimmer-skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius: finalRadius,
        backgroundColor: '#F1F5F9',
        backgroundImage: 'linear-gradient(90deg, rgba(241, 245, 249, 0) 0%, rgba(255, 255, 255, 0.6) 50%, rgba(241, 245, 249, 0) 100%)',
        backgroundSize: '200% 100%',
        animation: 'amal-shimmer-wave 1.6s infinite ease-in-out',
        ...style,
      }}
    />
  );
};

export const ShimmerCardSkeleton: React.FC<{ rows?: number }> = ({ rows = 3 }) => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        border: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <ShimmerSkeleton circle width={42} height={42} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <ShimmerSkeleton width="45%" height={16} />
          <ShimmerSkeleton width="75%" height={12} />
        </div>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <ShimmerSkeleton key={i} width={`${90 - i * 15}%`} height={12} />
      ))}
    </div>
  );
};
