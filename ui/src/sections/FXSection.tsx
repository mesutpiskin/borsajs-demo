import React, { useEffect, useState } from 'react';
import { ApiSection, DataCard } from '../components/SharedComponents';
import { fxAPI } from '../utils/api';

const codeExample = `import { FX } from 'borsajs';

const usd = new FX('USD');
const rate = await usd.getCurrent();

console.log(rate);
// {
//   symbol: 'USD',
//   last: 43.02,
//   updateTime: '2026-01-02T20:59:58.000Z'
// }`;

interface FXData {
    symbol: string;
    last: number;
}

export const FXSection: React.FC = () => {
    const [rates, setRates] = useState<FXData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const symbols = ['USD', 'EUR', 'GBP', 'gram-altin'];
                const results = await Promise.all(
                    symbols.map(symbol => fxAPI.getCurrent(symbol))
                );
                setRates(results);
            } catch (error) {
                console.error('Error fetching FX data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <ApiSection
            id="fx"
            title="FX - Döviz & Emtia"
            description="Döviz kurları ve emtia fiyatlarını canlı takip edin. USD, EUR gibi döviz kurlarının yanı sıra altın, gümüş ve ons fiyatlarına anında erişebilirsiniz."
            icon="💱"
            codeExample={codeExample}
        >
            <div className="grid grid-4">
                {loading ? (
                    <>
                        <DataCard label="Loading..." value="—" loading />
                        <DataCard label="Loading..." value="—" loading />
                        <DataCard label="Loading..." value="—" loading />
                        <DataCard label="Loading..." value="—" loading />
                    </>
                ) : (
                    rates.map((rate) => (
                        <DataCard
                            key={rate.symbol}
                            label={rate.symbol.toUpperCase()}
                            value={`₺${rate.last?.toFixed(2) || '—'}`}
                        />
                    ))
                )}
            </div>
        </ApiSection>
    );
};
