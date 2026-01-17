
import React, { useEffect, useState } from 'react';
import { ApiSection } from '../components/SharedComponents';
import { eurobondAPI } from '../utils/api';

const codeExample = `import { Eurobond } from 'borsajs';

const eurobond = new Eurobond();

// Tüm Eurobond listesi
const list = await eurobond.getList();

// Sadece USD olanlar
const usdBonds = await eurobond.getList('USD');

// Belirli bir tahvil detay
const bond = await eurobond.getByISIN('US900123DB31');`;

export const EurobondSection: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [currency, setCurrency] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await eurobondAPI.getList(currency || undefined);
                setData(Array.isArray(result) ? result : (result.data || []));
            } catch (error) {
                console.error('Error fetching Eurobonds:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currency]);

    return (
        <ApiSection
            id="eurobond"
            title="Eurobond (Ziraat)"
            description="Türkiye Cumhuriyeti hazine Eurobond verileri. Ziraat Bankası indikatif fiyatları."
            icon="🇪🇺"
            codeExample={codeExample}
        >
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button 
                    className={`btn-sm ${currency === '' ? 'active' : ''}`}
                    onClick={() => setCurrency('')}
                    style={{ background: currency === '' ? 'var(--primary)' : 'var(--bg-tertiary)', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', color: 'white', cursor: 'pointer' }}
                >
                    Tümü
                </button>
                <button 
                    className={`btn-sm ${currency === 'USD' ? 'active' : ''}`}
                    onClick={() => setCurrency('USD')}
                    style={{ background: currency === 'USD' ? 'var(--primary)' : 'var(--bg-tertiary)', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', color: 'white', cursor: 'pointer' }}
                >
                    USD
                </button>
                <button 
                    className={`btn-sm ${currency === 'EUR' ? 'active' : ''}`}
                    onClick={() => setCurrency('EUR')}
                    style={{ background: currency === 'EUR' ? 'var(--primary)' : 'var(--bg-tertiary)', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', color: 'white', cursor: 'pointer' }}
                >
                    EUR
                </button>
            </div>

            {loading ? (
                <div className="flex-center" style={{ padding: '2rem' }}>
                    <div className="loading"></div>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '0.5rem', maxHeight: '400px', overflowY: 'auto' }}>
                     {data.length === 0 && <div>Veri bulunamadı.</div>}
                     {data.slice(0, 50).map((bond) => (
                        <div key={bond.isin} style={{ 
                            display: 'grid', 
                            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', 
                            gap: '0.5rem', 
                            background: 'var(--bg-tertiary)', 
                            padding: '0.75rem', 
                            borderRadius: '4px',
                            fontSize: '0.9rem',
                            alignItems: 'center'
                        }}>
                            <div style={{ fontWeight: 600 }}>{bond.isin}</div>
                            <div>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>Vade</span>
                                {bond.maturity}
                            </div>
                            <div>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>Kalan Gün</span>
                                {bond.daysToMaturity}
                            </div>
                             <div>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>Alış/Satış Fiyat</span>
                                {bond.bidPrice} / {bond.askPrice} {bond.currency}
                            </div>
                            <div>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', display: 'block' }}>Alış/Satış Getiri</span>
                                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>%{bond.bidYield}</span> / %{bond.askYield}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </ApiSection>
    );
};
