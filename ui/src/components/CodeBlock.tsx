import React, { useState } from 'react';

interface CodeBlockProps {
    code: string;
    language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'typescript' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="code-block">
            <div className="code-header">
                <span className="code-language">{language}</span>
                <button
                    className={`copy-button ${copied ? 'copied' : ''}`}
                    onClick={handleCopy}
                >
                    {copied ? '✓ Copied!' : '📋 Copy'}
                </button>
            </div>
            <div className="code-content">
                <pre><code>{code}</code></pre>
            </div>
        </div>
    );
};
