import React, { useEffect, useState } from 'react';
import { ApiSection, DataCard } from '../components/SharedComponents';
import { indexAPI } from '../utils/api';

const codeExample = `import { Index } from 'borsajs';

const xu100 = new Index('XU100');
const info = await xu100.getInfo();

console.log(info);
// {
//   symbol: 'XU100',
//   last: 9875.45,
//   change: 125.30,
//   changePercent: 1.29,
//   volume: 95123456789
// }`;

interface IndexData {
    symbol: string;
    last: number;
    changePercent: number;
    volume: number;
}

export const IndexSection: React.FC = () => {
    const [indices, setIndices] = useState<IndexData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const symbols = ['XU100', 'XU030', 'XBANK'];
                const results = await Promise.all(
                    symbols.map(symbol => indexAPI.getInfo(symbol))
                );
                setIndices(results);
            } catch (error) {
                console.error('Error fetching index data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <ApiSection
            id="index"
            title="Index - Endeksler"
            description="BIST endekslerini gerçek zamanlı izleyin. XU100, XU030, XBANK gibi sektör ve piyasa endekslerinin güncel değerleri."
            icon="📊"
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
                    indices.map((index) => (
                        <DataCard
                            key={index.symbol}
                            label={index.symbol}
                            value={index.last?.toFixed(2) || '—'}
                            change={index.changePercent}
                        />
                    ))
                )}
            </div>
        </ApiSection>
    );
};
