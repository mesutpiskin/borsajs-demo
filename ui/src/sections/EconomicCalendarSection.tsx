import React, { useEffect, useState } from 'react';
import { ApiSection } from '../components/SharedComponents';
import { calendarAPI } from '../utils/api';

const codeExample = `import { EconomicCalendar } from 'borsajs';

const cal = new EconomicCalendar();

// Bu haftanın etkinlikleri
const events = await cal.thisWeek();

// Yüksek önem dereceli
const highEvents = await cal.highImportance({ 
  period: '1w' 
});`;

export const EconomicCalendarSection: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await calendarAPI.thisWeek();
                setEvents((result.data || result).slice(0, 10)); // İlk 10 etkinlik
            } catch (error) {
                console.error('Error fetching economic calendar:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getImportanceColor = (importance: string) => {
        switch (importance) {
            case 'high': return 'var(--error)';
            case 'medium': return 'var(--warning)';
            case 'low': return 'var(--text-muted)';
            default: return 'var(--text-secondary)';
        }
    };

    return (
        <ApiSection
            id="economic-calendar"
            title="Economic Calendar - Ekonomik Takvim"
            description="Küresel ekonomik göstergeleri ve etkinlikleri gerçek zamanlı takip edin. TR, US, EU ve diğer ülkelerin önemli ekonomik verilerini öğrenin."
            icon="📅"
            codeExample={codeExample}
        >
            {loading ? (
                <div className="flex-center" style={{ padding: '2rem' }}>
                    <div className="loading"></div>
                </div>
            ) : (
                <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>📊 Bu Haftanın Etkinlikleri</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '500px', overflowY: 'auto' }}>
                        {events.map((event, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: 'var(--bg-secondary)',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    display: 'grid',
                                    gridTemplateColumns: 'auto 1fr',
                                    gap: '1rem'
                                }}
                            >
                                <div style={{
                                    width: '4px',
                                    background: getImportanceColor(event.importance),
                                    borderRadius: '2px'
                                }}></div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{event.countryCode}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{event.time}</span>
                                        <span
                                            style={{
                                                fontSize: '0.7rem',
                                                padding: '2px 6px',
                                                background: getImportanceColor(event.importance) + '20',
                                                color: getImportanceColor(event.importance),
                                                borderRadius: '3px',
                                                textTransform: 'uppercase',
                                                fontWeight: 600
                                            }}
                                        >
                                            {event.importance}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                                        {event.event}
                                    </div>
                                    {event.actual && (
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Gerçekleşen:</span> {event.actual}
                                            {event.forecast && <> | <span style={{ color: 'var(--text-muted)' }}>Beklenen:</span> {event.forecast}</>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </ApiSection>
    );
};
