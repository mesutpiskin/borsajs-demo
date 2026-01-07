import React, { useEffect, useState } from 'react';
import { Index } from 'borsajs';
import { ApiSection, DataCard } from '../components/SharedComponents';

const codeExample = `import { Index } from 'borsajs';

const xu100 = new Index('XU100');
const info = await xu100.getInfo();

console.log(info);
// {
//   symbol: 'XU100',
//   last: 11498.38,
//   change: 236.86,
//   changePercent: 2.1,
//   name: 'BIST 100'
// }`;

interface IndexData {
    symbol: string;
    last: number;
    changePercent: number;
    name: string;
}

export const IndexSection: React.FC = () => {
    const [indices, setIndices] = useState<IndexData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const symbols = ['XU100', 'XU030', 'XBANK'];
                const results = await Promise.all(
                    symbols.map(async (symbol) => {
                        const index = new Index(symbol);
                        return await index.getInfo();
                    })
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
                            label={index.name || index.symbol}
                            value={index.last?.toFixed(2) || '—'}
                            change={index.changePercent}
                        />
                    ))
                )}
            </div>
        </ApiSection>
    );
};
