import React, { useEffect, useState } from 'react';
import { Ticker } from 'borsajs';
import { ApiSection, DataCard } from '../components/SharedComponents';

const codeExample = `import { Ticker } from 'borsajs';

const stock = new Ticker('THYAO');
const info = await stock.getInfo();

console.log(info);
// {
//   symbol: 'THYAO',
//   last: 274.25,
//   change: 5.75,
//   changePercent: 2.14,
//   volume: 7853192164.25
// }`;

interface StockData {
    symbol: string;
    last: number;
    changePercent: number;
    volume: number;
    high: number;
    low: number;
}

export const TickerSection: React.FC = () => {
    const [stocks, setStocks] = useState<StockData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const symbols = ['THYAO', 'AKBNK', 'ASELS'];
                const results = await Promise.all(
                    symbols.map(async (symbol) => {
                        const ticker = new Ticker(symbol);
                        return await ticker.getInfo();
                    })
                );
                setStocks(results);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <ApiSection
            id="ticker"
            title="Ticker - Hisse Senedi"
            description="BIST hisselerinin anlık fiyat ve hacim verilerine saniyeler içinde ulaşın. Teknik analiz, portföy takibi veya otomatik alım-satım stratejileri için ideal."
            icon="📈"
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
                    stocks.map((stock) => (
                        <div key={stock.symbol} style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
                                {stock.symbol}
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                ₺{stock.last?.toFixed(2) || '—'}
                            </div>
                            <div className={`data-change ${(stock.changePercent || 0) >= 0 ? 'positive' : 'negative'}`} style={{ display: 'inline-block', marginBottom: '1rem' }}>
                                {(stock.changePercent || 0) >= 0 ? '↑' : '↓'} {Math.abs(stock.changePercent || 0).toFixed(2)}%
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.875rem' }}>
                                <div>
                                    <div style={{ color: 'var(--text-muted)' }}>Yüksek</div>
                                    <div style={{ fontWeight: 600 }}>₺{stock.high?.toFixed(2) || '—'}</div>
                                </div>
                                <div>
                                    <div style={{ color: 'var(--text-muted)' }}>Düşük</div>
                                    <div style={{ fontWeight: 600 }}>₺{stock.low?.toFixed(2) || '—'}</div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </ApiSection>
    );
};
