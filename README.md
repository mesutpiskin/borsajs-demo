# borsajs Demo UI

Modern, interaktif web uygulaması - **borsajs** kütüphanesinin tüm yeteneklerini sergiler.

## 🚀 Özellikler

Bu demo aşağıdaki **10 API modülünü** içerir:

- 📈 **Ticker** - BIST hisse senetleri anlık fiyatları
- 💱 **FX** - Döviz kurları ve emtia fiyatları
- ₿ **Crypto** - Kripto para fiyatları (BtcTurk)
- 📊 **Index** - BIST endeksleri
- 📉 **Inflation** - Enflasyon verileri ve hesaplama
- 📢 **KAP** - Kamu Aydınlatma Platformu bildirimleri
- 📅 **Economic Calendar** - Ekonomik takvim ve etkinlikler
- 📜 **Bond** - Tahvil getirileri
- 🔍 **Screener** - Hisse tarayıcı
- ⚡ **VIOP** - Vadeli işlem ve opsiyon piyasası

## 🎨 Tasarım

- **Dark/Light Mode** - Theme toggle ile kolay geçiş
- **Gradient Colors** - Modern mor/mavi gradient renk paleti
- **Glassmorphism** - Cam efektli kartlar ve componentler
- **Smooth Animations** - Akıcı geçişler ve animasyonlar
- **Responsive** - Tüm ekran boyutlarında mükemmel görünüm

## 🛠️ Teknolojiler

- **Vite** - Hızlı geliştirme ortamı
- **React** - UI framework
- **TypeScript** - Tip güvenliği
- **borsajs** - Finansal veri API'si
- **Chart.js** - Grafikler (opsiyonel)

## 📦 Kurulum

```bash
npm install
```

## 🚀 Çalıştırma

```bash
npm run dev
```

Tarayıcınızda `http://localhost:5173` adresine gidin.

## 📝 Build

```bash
npm run build
```

Build sonucu `dist` klasörüne oluşturulur.

## 🚀 GitHub Pages'e Deploy

Bu proje GitHub Actions ile otomatik deploy için yapılandırılmıştır.

### Adımlar:

1. **GitHub'da Repository Oluşturun**
   - Repository adı: `borsajs-demo` (önemli: vite.config.ts'deki base path ile eşleşmeli)

2. **Kodu Push Edin**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADINIZ/borsajs-demo.git
   git push -u origin main
   ```

3. **GitHub Pages'i Aktifleştirin**
   - GitHub repository'nize gidin
   - Settings → Pages
   - Source: "GitHub Actions" seçin
   - Workflow otomatik çalışacak ve deploy edecek

4. **Siteniz Hazır!**
   - URL: `https://KULLANICI_ADINIZ.github.io/borsajs-demo/`
   - Her `main` branch'e push'ta otomatik güncellenir

> **Not:** Farklı bir repository adı kullanıyorsanız, `vite.config.ts` dosyasındaki `base` değerini güncelleyin.

## 🔗 Linkler

- **borsajs GitHub**: https://github.com/mesutpiskin/borsajs
- **borsajs NPM**: https://www.npmjs.com/package/borsajs
- **Dokümantasyon**: https://github.com/mesutpiskin/borsajs/blob/main/README.md

## 📄 Lisans

Bu demo proje, borsajs kütüphanesinin yeteneklerini göstermek için oluşturulmuştur.
borsajs Apache 2.0 lisansı altında dağıtılmaktadır.

## 👨‍💻 Geliştirici

**Mesut Piskin**
- GitHub: [@mesutpiskin](https://github.com/mesutpiskin)
