import React from 'react';

interface ErrorMessageProps {
    title?: string;
    message?: string;
}

export const CORSErrorMessage: React.FC<ErrorMessageProps> = ({
    title = "⚠️ Browser Kısıtlaması",
    message = "Bu API tarayıcıdan erişilemez (CORS kısıtlaması). borsajs, Node.js backend ortamları için tasarlanmıştır."
}) => {
    return (
        <div style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid rgba(255, 185, 0, 0.3)',
            borderLeft: '4px solid var(--warning)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-lg)',
            marginTop: 'var(--spacing-md)'
        }}>
            <h4 style={{
                fontSize: '1rem',
                marginBottom: 'var(--spacing-sm)',
                color: 'var(--warning)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)'
            }}>
                {title}
            </h4>
            <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--spacing-sm)'
            }}>
                {message}
            </p>
            <p style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                margin: 0
            }}>
                💡 <strong>Çözüm:</strong> Backend API oluşturun veya Node.js ortamında kullanın.{' '}
                <a
                    href="https://github.com/mesutpiskin/borsajs#-önemli-tarayıcı-kullanımı"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--primary-light)', textDecoration: 'underline' }}
                >
                    Detaylar için dokümantasyona bakın →
                </a>
            </p>
        </div>
    );
};

export const ErrorBoundary: React.FC<{ error: Error | null; children: React.ReactNode }> = ({ error, children }) => {
    if (error) {
        const isCORSError = error.message.includes('Network Error') ||
            error.message.includes('CORS') ||
            error.message.includes('Failed to fetch');

        if (isCORSError) {
            return <CORSErrorMessage />;
        }

        return (
            <div style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid var(--error)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-lg)',
                marginTop: 'var(--spacing-md)'
            }}>
                <p style={{ color: 'var(--error)', margin: 0 }}>
                    ❌ Hata: {error.message}
                </p>
            </div>
        );
    }

    return <>{children}</>;
};
