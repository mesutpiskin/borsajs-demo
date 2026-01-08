import React, { useEffect, useState } from 'react';
import { ApiSection, DataCard } from '../components/SharedComponents';
import { cryptoAPI } from '../utils/api';

const codeExample = `const btc = await cryptoAPI.getCurrent('BTCTRY');

console.log(btc);
// {
//   symbol: 'BTCTRY',
//   last: 2850000.0,
//   change: 25000.0,
//   volume: 1234567890
// }`;

interface CryptoData {
    symbol: string;
    last: number;
    change: number;
    volume: number;
}

export const CryptoSection: React.FC = () => {
    const [cryptos, setCryptos] = useState<CryptoData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const symbols = ['BTCTRY', 'ETHTRY', 'XRPTRY'];
                const results = await Promise.all(
                    symbols.map(symbol => cryptoAPI.getCurrent(symbol))
                );
                setCryptos(results);
            } catch (error) {
                console.error('Error fetching crypto data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <ApiSection
            id="crypto"
            title="Crypto - Kripto Para"
            description="Türkiye'nin en büyük kripto borsası BtcTurk'ten anlık veriler. Bitcoin, Ethereum ve diğer kripto paraların TRY karşılığını takip edin."
            icon="₿"
            codeExample={codeExample}
        >
            <div className="grid grid-3">
                {loading ? (
                    <>
                        <DataCard label="Loading..." value="—" loading />
                        <DataCard label="Loading..." value="—" loading />
                        <DataCard label="Loading..." value="—" loading />
                    </>
                ) : (
                    cryptos.map((crypto) => (
                        <DataCard
                            key={crypto.symbol}
                            label={crypto.symbol}
                            value={`₺${crypto.last?.toLocaleString('tr-TR') || '—'}`}
                            change={crypto.change}
                        />
                    ))
                )}
            </div>
        </ApiSection>
    );
};
