import React, { useEffect, useState } from 'react';
import { getKapProvider } from 'borsajs';
import { ApiSection } from '../components/SharedComponents';

const codeExample = `import { getKapProvider } from 'borsajs';

const kap = getKapProvider();

// Şirket bildirimlerini sorgula
const disclosures = await kap.getDisclosures('THYAO', 5);

// Şirket detayları
const details = await kap.getCompanyDetails('THYAO');

// Bildirim takvimi
const calendar = await kap.getCalendar('THYAO');`;

export const KAPSection: React.FC = () => {
    const [disclosures, setDisclosures] = useState<any[]>([]);
    const [companyDetails, setCompanyDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const kap = getKapProvider();
                const thyaoDisclosures = await kap.getDisclosures('THYAO', 5);
                setDisclosures(thyaoDisclosures);

                const details = await kap.getCompanyDetails('THYAO');
                setCompanyDetails(details);
            } catch (error) {
                console.error('Error fetching KAP data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <ApiSection
            id="kap"
            title="KAP - Kamu Aydınlatma Platformu"
            description="Şirketlerin resmi açıklamalarına ve bildirimlerine tek noktadan ulaşın. 731 BIST şirketinin bildirimlerini, beklenen rapor takvimlerini ve kurumsal bilgilerini sorgulayabilirsiniz."
            icon="📢"
            codeExample={codeExample}
        >
            {loading ? (
                <div className="flex-center" style={{ padding: '2rem' }}>
                    <div className="loading"></div>
                </div>
            ) : (
                <div className="grid grid-2">
                    <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>📄 Son Bildirimler (THYAO)</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '400px', overflowY: 'auto' }}>
                            {disclosures.map((disclosure, idx) => (
                                <a
                                    key={idx}
                                    href={disclosure.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        background: 'var(--bg-secondary)',
                                        padding: '1rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--primary)';
                                        e.currentTarget.style.transform = 'translateX(4px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                                        e.currentTarget.style.transform = 'translateX(0)';
                                    }}
                                >
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                                        {disclosure.date}
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                                        {disclosure.title}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {companyDetails && (
                        <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>🏢 Şirket Detayları</h3>
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Sektör</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{companyDetails.sector}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Pazar</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{companyDetails.market}</div>
                                </div>
                                {companyDetails.website && (
                                    <div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Web Sitesi</div>
                                        <a
                                            href={`https://${companyDetails.website.split(' / ')[0]}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ fontSize: '0.9rem', color: 'var(--primary-light)' }}
                                        >
                                            {companyDetails.website.split(' / ')[0]}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </ApiSection>
    );
};
