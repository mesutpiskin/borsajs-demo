import React, { useEffect, useState } from 'react';
import { Crypto } from 'borsajs';
import { ApiSection, DataCard } from '../components/SharedComponents';

const codeExample = `import { Crypto } from 'borsajs';

const btc = new Crypto('BTCTRY');
const price = await btc.getCurrent();

console.log(price);
// {
//   symbol: 'BTCTRY',
//   last: 3839080,
//   change: 18121,
//   changePercent: 0.44,
//   volume: 36.22
// }`;

interface CryptoData {
    symbol: string;
    last: number;
    changePercent: number;
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
                    symbols.map(async (symbol) => {
                        const crypto = new Crypto(symbol);
                        return await crypto.getCurrent();
                    })
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
                            change={crypto.changePercent}
                        />
                    ))
                )}
            </div>
        </ApiSection>
    );
};
