import React, { type ReactNode } from 'react';

interface DataCardProps {
    label: string;
    value: string | number;
    change?: number;
    icon?: string;
    loading?: boolean;
}

export const DataCard: React.FC<DataCardProps> = ({ label, value, change, icon, loading }) => {
    if (loading) {
        return (
            <div className="data-item">
                <div className="data-label">{label}</div>
                <div className="flex-center" style={{ padding: '1rem 0' }}>
                    <div className="loading"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="data-item">
            <div className="data-label">{label}</div>
            <div className="data-value">
                {icon && <span>{icon}</span>}
                <span>{value}</span>
                {change !== undefined && (
                    <span className={`data-change ${change >= 0 ? 'positive' : 'negative'}`}>
                        {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
                    </span>
                )}
            </div>
        </div>
    );
};

interface ApiSectionProps {
    id: string;
    title: string;
    description: string;
    icon: string;
    codeExample: string;
    children: ReactNode;
}

export const ApiSection: React.FC<ApiSectionProps> = ({
    id,
    title,
    description,
    icon,
    codeExample,
    children
}) => {
    return (
        <section id={id} className="section">
            <div className="card">
                <div className="card-header">
                    <div className="card-icon">{icon}</div>
                    <div>
                        <h2 className="card-title">{title}</h2>
                    </div>
                </div>
                <p className="card-description">{description}</p>

                {children}

                <div className="mt-xl">
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>📝 Kod Örneği</h3>
                    <div className="code-block">
                        <div className="code-content">
                            <pre><code>{codeExample}</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
