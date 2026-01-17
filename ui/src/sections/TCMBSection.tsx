
import React, { useEffect, useState } from 'react';
import { ApiSection } from '../components/SharedComponents';
import { tcmbAPI } from '../utils/api';

const codeExample = `import { TCMB } from 'borsajs';

const tcmb = new TCMB();

// Politika faizi (1 Hafta Repo)
const policy = await tcmb.getPolicyRate();

// Faiz koridoru
const overnight = await tcmb.getOvernightRates();

// Tüm oranlar
const all = await tcmb.getAllRates();`;

export const TCMBSection: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await tcmbAPI.getRates();
                setData(Array.isArray(result) ? result : (result.data || []));
            } catch (error) {
                console.error('Error fetching TCMB rates:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getLabel = (type: string) => {
        switch(type) {
            case 'policy': return 'Politika Faizi (1 Hafta Repo)';
            case 'overnight': return 'Gecelik Borçlanma/Borç Verme';
            case 'late_liquidity': return 'Geç Likidite Penceresi (LON)';
            default: return type.toUpperCase();
        }
    };

    return (
        <ApiSection
            id="tcmb"
            title="TCMB Faiz Oranları"
            description="Merkez Bankası politika faizi ve faiz koridoru oranlarına erişim."
            icon="🏦"
            codeExample={codeExample}
        >
            {loading ? (
                <div className="flex-center" style={{ padding: '2rem' }}>
                    <div className="loading"></div>
                </div>
            ) : (
                <div className="grid grid-3">
                     {data.map((rate, idx) => (
                        <div key={idx} style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', height: '2.5rem' }}>
                                {getLabel(rate.rateType)}
                            </h3>
                            
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.8rem' }}>Tarih:</span>
                                    <span style={{ fontWeight: 600 }}>{rate.date}</span>
                                </div>
                                
                                {rate.lending !== null && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem' }}>Borç Verme:</span>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>
                                            %{rate.lending}
                                        </span>
                                    </div>
                                )}
                                
                                {rate.borrowing !== null && (
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.8rem' }}>Borçlanma:</span>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                                            %{rate.borrowing}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </ApiSection>
    );
};
