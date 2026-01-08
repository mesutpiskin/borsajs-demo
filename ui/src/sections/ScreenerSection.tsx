import React, { useEffect, useState } from 'react';
import { ApiSection } from '../components/SharedComponents';
import { screenerAPI } from '../utils/api';

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
                const result = await screenerAPI.screen(template);
                setStocks((result.data || result).slice(0, 10));
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
                                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: 600 }}>Şirket</th>
                                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: 600 }}>Temettü %</th>
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
                                    <td style={{ padding: '1rem' }}>{stock.name || '—'}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <span style={{ color: 'var(--success)', fontWeight: 600 }}>
                                            %{stock.criteria_33?.toFixed(2) || '—'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </ApiSection>
    );
};
