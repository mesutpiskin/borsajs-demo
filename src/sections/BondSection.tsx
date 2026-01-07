import React, { useEffect, useState } from 'react';
import { bonds, riskFreeRate } from 'borsajs';
import { ApiSection, DataCard } from '../components/SharedComponents';

const codeExample = `import { bonds, riskFreeRate } from 'borsajs';

// Tüm tahvilleri al
const allBonds = await bonds();

// DCF hesaplamaları için risksiz getiri
const rfr = await riskFreeRate();
console.log(rfr); // 0.2905 (29.05% için)`;

export const BondSection: React.FC = () => {
    const [bondData, setBondData] = useState<any[]>([]);
    const [rfr, setRfr] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allBonds = await bonds();
                setBondData(allBonds);

                const riskFree = await riskFreeRate();
                setRfr(riskFree);
            } catch (error) {
                console.error('Error fetching bond data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <ApiSection
            id="bond"
            title="Bond - Tahvil Getirileri"
            description="Türk devlet tahvillerinin getirilerini anlık izleyin. 2, 5 ve 10 yıllık tahvil faizlerini ve değişimlerini takip edin."
            icon="📜"
            codeExample={codeExample}
        >
            {loading ? (
                <div className="flex-center" style={{ padding: '2rem' }}>
                    <div className="loading"></div>
                </div>
            ) : (
                <div className="grid grid-4">
                    {bondData.map((bond) => (
                        <DataCard
                            key={bond.maturity}
                            label={bond.name}
                            value={`%${bond.yield}`}
                            change={bond.changePct}
                        />
                    ))}
                    {rfr !== null && (
                        <div style={{
                            background: 'var(--gradient-primary)',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-md)',
                            color: 'white'
                        }}>
                            <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                                RISKSIZ GETİRİ (10Y)
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 700 }}>
                                %{(rfr * 100).toFixed(2)}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </ApiSection>
    );
};
