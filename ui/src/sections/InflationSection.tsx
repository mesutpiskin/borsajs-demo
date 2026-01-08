import React, { useEffect, useState } from 'react';
import { ApiSection } from '../components/SharedComponents';
import { inflationAPI } from '../utils/api';

const codeExample = `import { Inflation } from 'borsajs';

const inflation = new Inflation();

// Son enflasyon verisi
const latest = await inflation.getLatest();

// Enflasyon hesaplama
const calc = await inflation.calculate(
  100000,    // Başlangıç tutarı
  '2020-01', // Başlangıç tarihi
  '2024-01'  // Bitiş tarihi
);`;

export const InflationSection: React.FC = () => {
    const [latestData, setLatestData] = useState<any>(null);
    const [calcResult, setCalcResult] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const latest = await inflationAPI.getLatest();
                setLatestData(latest);

                // Calculate example
                const result = await inflationAPI.calculate(100000, '2020-01', '2024-01');
                setCalcResult(result);
            } catch (error) {
                console.error('Error fetching inflation data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <ApiSection
            id="inflation"
            title="Inflation - Enflasyon"
            description="TCMB'nin resmi enflasyon verilerine doğrudan erişin. Aylık ve yıllık TÜFE oranlarını sorgulayın, geçmiş tarihler arasında enflasyon hesaplayın."
            icon="📉"
            codeExample={codeExample}
        >
            {loading ? (
                <div className="flex-center" style={{ padding: '2rem' }}>
                    <div className="loading"></div>
                </div>
            ) : (
                <div className="grid grid-2">
                    <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>📅 Son Veri</h3>
                        {latestData && (
                            <div style={{ display: 'grid', gap: '0.75rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Tarih</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{latestData.yearMonth}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Yıllık Enflasyon</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--error)' }}>
                                        %{latestData.yearlyInflation}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Aylık Enflasyon</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                                        %{latestData.monthlyInflation}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>🧮 Enflasyon Hesaplama</h3>
                        {calcResult && (
                            <div style={{ display: 'grid', gap: '0.75rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Dönem</div>
                                    <div style={{ fontWeight: 600 }}>
                                        {calcResult.startDate} → {calcResult.endDate}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Başlangıç Değeri</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                                        ₺{calcResult.initialValue?.toLocaleString('tr-TR')}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Bugünkü Değeri</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                                        ₺{calcResult.finalValue?.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Toplam Artış</div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--error)' }}>
                                        %{calcResult.totalChange}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </ApiSection>
    );
};
