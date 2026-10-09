import React from 'react';
import { SirahEventRecord, PropheticLifePeriod } from '@amal/types';
import { AmalTheme } from '@amal/ui';

interface PropheticTimelineProps {
  events: SirahEventRecord[];
  activePeriod?: PropheticLifePeriod;
  onSelectEvent?: (event: SirahEventRecord) => void;
}

export const PropheticTimeline: React.FC<PropheticTimelineProps> = ({
  events,
  activePeriod,
  onSelectEvent,
}) => {
  const filteredEvents = activePeriod
    ? events.filter((e) => e.life_period === activePeriod)
    : events;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: AmalTheme.colors.text.primaryLight }}>
        Chronological Prophetic Milestones ({filteredEvents.length})
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filteredEvents.map((evt) => (
          <div
            key={evt.event_id}
            onClick={() => onSelectEvent?.(evt)}
            style={{
              padding: 16,
              borderRadius: 12,
              backgroundColor: '#FFFFFF',
              border: `1px solid ${AmalTheme.colors.surface.borderLight}`,
              cursor: onSelectEvent ? 'pointer' : 'default',
              transition: 'box-shadow 0.2s',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: AmalTheme.colors.primary, textTransform: 'uppercase' }}>
                  {evt.life_period.replace(/_/g, ' ')} · {evt.start_hijri_year ? `${evt.start_hijri_year} AH` : 'Pre-Hijrah'}
                </span>
                <h4 style={{ margin: '4px 0', fontSize: 16, fontWeight: 700 }}>
                  {evt.canonical_title} <span style={{ color: '#666', fontWeight: 400 }}>({evt.arabic_title})</span>
                </h4>
              </div>
              <span style={{
                fontSize: 11,
                padding: '2px 8px',
                borderRadius: 8,
                backgroundColor: evt.location_certainty === 'ESTABLISHED' ? '#E8F5E9' : '#FFF3E0',
                color: evt.location_certainty === 'ESTABLISHED' ? '#2E7D32' : '#E65100',
                fontWeight: 600,
              }}>
                {evt.location_name}
              </span>
            </div>
            <p style={{ margin: '8px 0 0', fontSize: 13, color: '#555', lineHeight: 1.5 }}>
              {evt.description_neutral}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
