import React, { useEffect, useState } from 'react';
import { ApiSection } from '../components/SharedComponents';
import { viopAPI } from '../utils/api';

const codeExample = `import { VIOP } from 'borsajs';

const viop = new VIOP();

// Tüm vadeli işlemleri al
const futures = await viop.getFutures();

// Hisse senedi vadeli işlemleri
const stockFutures = await viop.getStockFutures();

// Belirli bir hisse için kontratlar
const thyaoContracts = await viop.getBySymbol('THYAO');`;

export const VIOPSection: React.FC = () => {
    const [contracts, setContracts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState<'stock' | 'index' | 'currency' | 'commodity'>('stock');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setLoading(true);
            try {
                let result: any;

                switch (category) {
                    case 'stock':
                        result = await viopAPI.getStockFutures();
                        break;
                    case 'index':
                        result = await viopAPI.getIndexFutures();
                        break;
                    case 'currency':
                        result = await viopAPI.getCurrencyFutures();
                        break;
                    case 'commodity':
                        // Commodity futures not in API yet, use stock as fallback
                        result = await viopAPI.getStockFutures();
                        break;
                }

                setContracts((result.data || result).slice(0, 10));
            } catch (error) {
                console.error('Error fetching VIOP data:', error);
                setError("VIOP verileri şu anda kullanılamıyor");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [category]);

    const categories = [
        { id: 'stock', name: '📈 Hisse', icon: '📈' },
        { id: 'index', name: '📊 Endeks', icon: '📊' },
        { id: 'currency', name: '💱 Döviz', icon: '💱' },
        { id: 'commodity', name: '🥇 Emtia', icon: '🥇' }
    ];

    return (
        <ApiSection
            id="viop"
            title="VIOP - Vadeli İşlem ve Opsiyon"
            description="Türk türev piyasasını gerçek zamanlı takip edin. Hisse senedi, endeks, döviz ve emtia vadeli işlem kontratlarına anında erişin."
            icon="⚡"
            codeExample={codeExample}
        >
            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setCategory(cat.id as any)}
                            className="nav-item"
                            style={{
                                background: category === cat.id ? 'var(--gradient-primary)' : 'var(--bg-glass)',
                                borderColor: category === cat.id ? 'transparent' : 'rgba(255,255,255,0.1)',
                                color: category === cat.id ? 'white' : 'var(--text-secondary)'
                            }}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex-center" style={{ padding: '2rem' }}>
                    <div className="loading"></div>
                </div>
            
) : error ? (
                <div style={{ padding: "2rem", textAlign: "center", background: "var(--bg-tertiary)", borderRadius: "var(--radius-lg)", color: "var(--text-muted)" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
                    <div>{error}</div>
                </div>
            ) : (
                <div className="grid grid-2">
                    {contracts.map((contract, idx) => (
                        <div
                            key={idx}
                            style={{
                                background: 'var(--bg-tertiary)',
                                padding: '1.5rem',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                        {contract.code}
                                    </div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                                        {contract.contract}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                                        ₺{contract.price?.toFixed(2) || '—'}
                                    </div>
                                    {contract.change !== undefined && (
                                        <div className={`data-change ${contract.change >= 0 ? 'positive' : 'negative'}`} style={{ marginTop: '0.25rem' }}>
                                            {contract.change >= 0 ? '↑' : '↓'} {Math.abs(contract.change).toFixed(2)}%
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.875rem' }}>
                                <div>
                                    <div style={{ color: 'var(--text-muted)' }}>Hacim (TL)</div>
                                    <div style={{ fontWeight: 600 }}>
                                        {contract.volumeTl ? `₺${(contract.volumeTl / 1000000).toFixed(1)}M` : '—'}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ color: 'var(--text-muted)' }}>Miktar</div>
                                    <div style={{ fontWeight: 600 }}>
                                        {contract.volumeQty?.toLocaleString('tr-TR') || '—'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </ApiSection>
    );
};
