import React, { useEffect, useState } from 'react';
import { screenStocks } from 'borsajs';
import { ApiSection } from '../components/SharedComponents';

const codeExample = `import { screenStocks } from 'borsajs';

// Hazır şablon kullan
const highDivStocks = await screenStocks({ 
  template: 'high_dividend' 
});

// Özel filtreler
const customStocks = await screenStocks({
  marketCapMin: 1000,  // Min 1000M TL
  peMax: 15,           // Maks 15 F/K
  dividendYieldMin: 3  // Min %3 temettü
});`;

export const ScreenerSection: React.FC = () => {
    const [stocks, setStocks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [template, setTemplate] = useState('high_dividend');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const results = await screenStocks({ template: template as any });
                setStocks(results.slice(0, 10)); // İlk 10 sonuç
            } catch (error) {
                console.error('Error fetching screener data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [template]);

    const templates = [
        { id: 'high_dividend', name: 'Yüksek Temettü' },
        { id: 'low_pe', name: 'Düşük F/K' },
        { id: 'high_roe', name: 'Yüksek ROE' },
        { id: 'small_cap', name: 'Küçük Şirketler' }
    ];

    return (
        <ApiSection
            id="screener"
            title="Screener - Hisse Tarayıcı"
            description="BIST hisselerini 40+ farklı kritere göre tarayın. 15 hazır şablon veya özel filtreler ile yatırım stratejinize uygun hisseleri keşfedin."
            icon="🔍"
            codeExample={codeExample}
        >
            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {templates.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTemplate(t.id)}
                            className="nav-item"
                            style={{
                                background: template === t.id ? 'var(--gradient-primary)' : 'var(--bg-glass)',
                                borderColor: template === t.id ? 'transparent' : 'rgba(255,255,255,0.1)',
                                color: template === t.id ? 'white' : 'var(--text-secondary)'
                            }}
                        >
                            {t.name}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex-center" style={{ padding: '2rem' }}>
                    <div className="loading"></div>
                </div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        background: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-lg)',
                        overflow: 'hidden'
                    }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-secondary)' }}>
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600 }}>Sembol</th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: 600 }}>Fiyat</th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: 600 }}>Değişim</th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: 600 }}>F/K</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stocks.map((stock, idx) => (
                                <tr
                                    key={idx}
                                    style={{
                                        borderTop: '1px solid rgba(255,255,255,0.05)',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    <td style={{ padding: '1rem', fontWeight: 600 }}>{stock.symbol || stock.ticker}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>₺{stock.price?.toFixed(2) || '—'}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <span className={`data-change ${(stock.change || 0) >= 0 ? 'positive' : 'negative'}`}>
                                            {(stock.change || 0) >= 0 ? '↑' : '↓'} {Math.abs(stock.change || 0).toFixed(2)}%
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>{stock.pe?.toFixed(2) || '—'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </ApiSection>
    );
};
