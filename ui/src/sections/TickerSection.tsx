import React, { useEffect, useState } from 'react';
import { ApiSection, DataCard } from '../components/SharedComponents';
import { tickerAPI } from '../utils/api';

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
    const [searchSymbol, setSearchSymbol] = useState('');
    const [searchResult, setSearchResult] = useState<StockData | null>(null);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const symbols = ['THYAO', 'AKBNK', 'ASELS'];
                const results = await Promise.all(
                    symbols.map(symbol => tickerAPI.getInfo(symbol))
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

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchSymbol.trim()) return;

        setSearching(true);
        setSearchResult(null);
        try {
            const result = await tickerAPI.getInfo(searchSymbol.toUpperCase());
            setSearchResult(result);
        } catch (error) {
            console.error('Search error:', error);
            alert(`Hisse "${searchSymbol}" bulunamadı`);
        } finally {
            setSearching(false);
        }
    };

    return (
        <ApiSection
            id="ticker"
            title="Ticker - Hisse Senetleri"
            description="BIST'te işlem gören hisse senetlerinin anlık fiyat bilgilerine, hacim verilerine ve günlük değişimlerine erişin. 500+ hisseyi sorgulayabilirsiniz."
            icon="📈"
            codeExample={codeExample}
        >
            {/* Search Form */}
            <form onSubmit={handleSearch} style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="text"
                        value={searchSymbol}
                        onChange={(e) => setSearchSymbol(e.target.value)}
                        placeholder="Hisse sembolü girin (örn: THYAO)"
                        style={{
                            flex: 1,
                            padding: '0.75rem 1rem',
                            background: 'var(--bg-tertiary)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text-primary)',
                            fontSize: '1rem'
                        }}
                    />
                    <button
                        type="submit"
                        disabled={searching}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'var(--gradient-primary)',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            color: 'white',
                            fontWeight: 600,
                            cursor: searching ? 'wait' : 'pointer',
                            opacity: searching ? 0.7 : 1
                        }}
                    >
                        {searching ? '🔍 Aranıyor...' : '🔍 Ara'}
                    </button>
                </div>
            </form>

            {/* Search Result */}
            {searchResult && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                        Arama Sonucu:
                    </h3>
                    <DataCard
                        label={searchResult.symbol}
                        value={`₺${searchResult.last.toFixed(2)}`}
                        change={searchResult.changePercent}
                    />
                </div>
            )}

            {/* Default Stocks */}
            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Popüler Hisseler:
            </h3>
            {loading ? (
                <div className="flex-center" style={{ padding: '2rem' }}>
                    <div className="loading"></div>
                </div>
            ) : (
                <div className="grid grid-3">
                    {stocks.map((stock) => (
                        <DataCard
                            key={stock.symbol}
                            label={stock.symbol}
                            value={`₺${stock.last.toFixed(2)}`}
                            change={stock.changePercent}
                        />
                    ))}
                </div>
            )}
        </ApiSection>
    );
};
