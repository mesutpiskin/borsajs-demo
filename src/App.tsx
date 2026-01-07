import React, { useState } from 'react';
import './index.css';
import { ThemeToggle } from './components/ThemeToggle';
import { TickerSection } from './sections/TickerSection';
import { FXSection } from './sections/FXSection';
import { CryptoSection } from './sections/CryptoSection';
import { IndexSection } from './sections/IndexSection';
import { InflationSection } from './sections/InflationSection';
import { KAPSection } from './sections/KAPSection';
import { EconomicCalendarSection } from './sections/EconomicCalendarSection';
import { BondSection } from './sections/BondSection';
import { ScreenerSection } from './sections/ScreenerSection';
import { VIOPSection } from './sections/VIOPSection';

function App() {
  const [activeSection, setActiveSection] = useState('ticker');

  const navItems = [
    { id: 'ticker', name: '📈 Ticker', label: 'Hisse Senedi' },
    { id: 'fx', name: '💱 FX', label: 'Döviz & Emtia' },
    { id: 'crypto', name: '₿ Crypto', label: 'Kripto' },
    { id: 'index', name: '📊 Index', label: 'Endeksler' },
    { id: 'inflation', name: '📉 Inflation', label: 'Enflasyon' },
    { id: 'kap', name: '📢 KAP', label: 'Bildirimler' },
    { id: 'economic-calendar', name: '📅 Calendar', label: 'Ekonomik Takvim' },
    { id: 'bond', name: '📜 Bond', label: 'Tahvil' },
    { id: 'screener', name: '🔍 Screener', label: 'Tarayıcı' },
    { id: 'viop', name: '⚡ VIOP', label: 'Türev' }
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Nav bar height
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <div className="hero-badge">
            <span>⚡</span>
            <span>Türkiye Finansal Piyasalar API</span>
          </div>
          <h1>borsajs Demo Showcase</h1>
          <p>
            Türkiye finansal piyasaları için TypeScript/JavaScript veri kütüphanesi.
            BIST hisseleri, döviz, kripto, yatırım fonları ve ekonomik veriler için
            kapsamlı bir çözüm.
          </p>
          <div style={{
            display: 'inline-block',
            background: 'var(--bg-tertiary)',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            fontFamily: 'monospace',
            fontSize: '1rem',
            marginBottom: '1rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>$</span>{' '}
            <span style={{ color: 'var(--text-primary)' }}>npm install borsajs</span>
          </div>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            <a
              href="https://github.com/mesutpiskin/borsajs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              📦 GitHub Repository
            </a>
            <a
              href="https://www.npmjs.com/package/borsajs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ background: 'var(--gradient-secondary)' }}
            >
              📚 NPM Package
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav">
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container" style={{ paddingBottom: '4rem' }}>
        <TickerSection />
        <FXSection />
        <CryptoSection />
        <IndexSection />
        <InflationSection />
        <KAPSection />
        <EconomicCalendarSection />
        <BondSection />
        <ScreenerSection />
        <VIOPSection />
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '3rem 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        marginTop: '4rem'
      }}>
        <div className="container">
          <p style={{ marginBottom: '1rem' }}>
            Made with ❤️ using <strong>borsajs</strong>
          </p>

          {/* Warning Section */}
          <div style={{
            background: 'var(--bg-tertiary)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255, 185, 0, 0.3)',
            borderLeft: '4px solid var(--warning)',
            marginBottom: '1.5rem',
            maxWidth: '800px',
            margin: '0 auto 1.5rem'
          }}>
            <h3 style={{
              fontSize: '1rem',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '1.25rem' }}>⚠️</span>
              Önemli Uyarı
            </h3>
            <p style={{
              fontSize: '0.875rem',
              marginBottom: '0.5rem',
              color: 'var(--text-secondary)',
              textAlign: 'left'
            }}>
              <strong>Bu kütüphane yalnızca kişisel ve eğitim amaçlı kullanım için tasarlanmıştır.</strong>
            </p>
            <p style={{
              fontSize: '0.875rem',
              marginBottom: 0,
              color: 'var(--text-muted)',
              textAlign: 'left'
            }}>
              Ticari kullanım için ilgili veri kaynağı sağlayıcılarından açık izin almanız gerekmektedir.
              Detaylar için{' '}
              <a
                href="https://github.com/mesutpiskin/borsajs#readme"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--primary-light)', textDecoration: 'underline' }}
              >
                borsajs dokümantasyonuna
              </a>
              {' '}bakınız.
            </p>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Bu demo, borsajs kütüphanesinin tüm yeteneklerini göstermek için oluşturulmuştur.
          </p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://github.com/mesutpiskin/borsajs" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.npmjs.com/package/borsajs" target="_blank" rel="noopener noreferrer">
              NPM
            </a>
            <a href="https://github.com/mesutpiskin/borsajs/blob/main/README.md" target="_blank" rel="noopener noreferrer">
              Dökümanlar
            </a>
          </div>
        </div>
      </footer>

      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  );
}

export default App;
