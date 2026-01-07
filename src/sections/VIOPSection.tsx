import React, { useEffect, useState } from 'react';
import { VIOP } from 'borsajs';
import { ApiSection } from '../components/SharedComponents';

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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const viop = new VIOP();
                let results: any[] = [];

                switch (category) {
                    case 'stock':
                        results = await viop.getStockFutures();
                        break;
                    case 'index':
                        results = await viop.getIndexFutures();
                        break;
                    case 'currency':
                        results = await viop.getCurrencyFutures();
                        break;
                    case 'commodity':
                        results = await viop.getCommodityFutures();
                        break;
                }

                setContracts(results.slice(0, 10));
            } catch (error) {
                console.error('Error fetching VIOP data:', error);
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
