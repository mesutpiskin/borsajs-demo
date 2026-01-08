# BorsaJS Demo

Modern, interactive demo application for the [borsajs](https://github.com/mesutpiskin/borsajs) library showcasing all API features with a beautiful, responsive UI.

🌐 **Live Demo:** https://borsajs-showcase.web.app

## 🎯 Overview

This project demonstrates all capabilities of the borsajs library through an interactive web interface. It features a **Firebase Functions backend** that acts as a proxy to resolve CORS issues and enable seamless deployment with live data.

## ✨ Features

### Data Modules (10 Sections)
- **📈 Ticker** - Real-time stock prices with search functionality
- **💱 FX** - Currency exchange rates and commodities (USD, EUR, Gold, etc.)
- **₿ Crypto** - Cryptocurrency prices (BTC, ETH, XRP, etc.)
- **📊 Index** - BIST market indices (XU100, XU030, XBANK, etc.)
- **📉 Inflation** - Latest inflation data and calculator
- **📢 KAP** - Public disclosure platform data
- **📅 Economic Calendar** - Weekly economic events
- **📜 Bonds** - Government bond yields
- **🔍 Screener** - Stock screening with dividend yield display
- **⚡ VIOP** - Derivatives and futures data

### UI Features
- 🎨 Modern glassmorphism design
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive layout
- 🔄 Real-time data updates
- 📋 Copy-to-clipboard code examples
- 🔍 Interactive search (Ticker section)
- ⚡ Smooth animations and transitions
- 🎭 Error handling with user-friendly messages

### Backend Features
- 🔥 **Firebase Functions** - Express.js API backend
- 🔒 **CORS Resolution** - Server-side proxy bypasses browser restrictions
- ⚡ **5-Minute Caching** - Optimized for free tier
- 🛡️ **Error Handling** - Graceful degradation for API failures
- 📦 **15+ API Endpoints** - Full borsajs feature coverage

## 🏗️ Architecture

```
borsajs-demo/
├── api/                    # Firebase Functions (Backend)
│   ├── src/
│   │   ├── index.ts       # Express app & routes
│   │   ├── middleware/    # CORS, error handling
│   │   ├── routes/        # API endpoints
│   │   └── utils/         # Cache utility
│   └── package.json
├── ui/                     # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── sections/      # 10 feature sections
│   │   └── utils/
│   │       └── api.ts     # API client
│   └── vite.config.ts     # Dev proxy config
└── firebase.json          # Firebase configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Firebase CLI (`npm install -g firebase-tools`)
- Firebase project with Blaze plan (for Functions)

### Installation

```bash
# Clone the repository
git clone https://github.com/mesutpiskin/borsajs-demo.git
cd borsajs-demo

# Install UI dependencies
cd ui
npm install

# Install API dependencies
cd ../api
npm install
```

### Local Development

**Option 1: Full Stack (UI + API)**

```bash
# Terminal 1 - Start Firebase Emulators (API)
cd api
npm run serve

# Terminal 2 - Start Vite Dev Server (UI)
cd ui
npm run dev
```

Then open http://localhost:5173

**Option 2: UI Only**

```bash
cd ui
npm run dev
```

Note: Without API backend, data won't load due to CORS restrictions.

## � Deployment

### Deploy to Firebase

```bash
# Build both UI and API
cd ui && npm run build
cd ../api && npm run build

# Deploy everything
firebase deploy

# Or deploy separately
firebase deploy --only hosting    # UI only
firebase deploy --only functions  # API only
```

### Environment Requirements
- **Hosting:** Works on free Spark plan
- **Functions:** Requires Blaze (pay-as-you-go) plan
- **Cost:** Free for typical demo usage (within quotas)

## 🔧 Configuration

### firebase.json
```json
{
  "hosting": {
    "public": "ui/dist",
    "rewrites": [
      {
        "source": "/api/**",
        "function": {
          "functionId": "api",
          "region": "us-central1"
        }
      }
    ]
  },
  "functions": {
    "source": "api",
    "runtime": "nodejs20"
  }
}
```

### vite.config.ts (Development)
```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001/borsajs-showcase/us-central1',
        changeOrigin: true
      }
    }
  }
})
```

## 📡 API Endpoints

All endpoints are available at `/api/*`:

| Endpoint | Description | Example |
|----------|-------------|---------|
| `/api/ticker/:symbol` | Get stock info | `/api/ticker/THYAO` |
| `/api/fx/:symbol` | Get FX rates | `/api/fx/USD` |
| `/api/crypto/:symbol` | Get crypto prices | `/api/crypto/BTCTRY` |
| `/api/index/:symbol` | Get index data | `/api/index/XU100` |
| `/api/inflation/latest` | Latest inflation | `/api/inflation/latest` |
| `/api/kap/disclosures/:ticker` | KAP disclosures | `/api/kap/disclosures/THYAO` |
| `/api/calendar/week` | Economic events | `/api/calendar/week` |
| `/api/bonds` | Bond yields | `/api/bonds` |
| `/api/screener` | Screen stocks (POST) | `/api/screener` |
| `/api/viop/stock-futures` | VIOP futures | `/api/viop/stock-futures` |

Full API documentation: See `/api/src/routes/` directory

## 🎨 Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **CSS3** - Custom glassmorphism design

### Backend
- **Firebase Functions** - Serverless compute
- **Express.js** - Web framework
- **Node.js 20** - Runtime
- **TypeScript** - Type safety

### Libraries
- **borsajs** - Turkish financial data API
- **CORS** - Cross-origin resource sharing
- **Firebase Admin SDK** - Firebase integration

## 🔍 Key Features Explained

### 1. Company Search (Ticker Section)
Search any BIST stock by symbol:
```typescript
// Search GARAN
const result = await tickerAPI.getInfo('GARAN');
```

### 2. Smart Caching
5-minute in-memory cache reduces API calls:
```typescript
// Cached for 5 minutes
const cached = cache.get(cacheKey);
if (cached) return cached;
```

### 3. Error Handling
User-friendly error messages:
```typescript
// VIOP section shows graceful error
if (error) {
  return <ErrorMessage>VIOP verileri kullanılamıyor</ErrorMessage>
}
```

### 4. Screener Optimization
Shows dividend yield instead of missing price data:
```typescript
// Displays criteria_33 (dividend %)
<span>%{stock.criteria_33?.toFixed(2)}</span>
```

## 🐛 Known Issues & Solutions

### VIOP Data Unavailable
- **Issue:** borsajs VIOP endpoints return 404
- **Solution:** Error handling shows user-friendly message
- **Impact:** Demo shows graceful degradation

### Production vs Development
- **Development:** Uses Vite proxy (`localhost:5173/api`)
- **Production:** Uses Firebase rewrites (`borsajs-showcase.web.app/api`)

## 📊 Performance

- **Build Size:** ~224 KB (gzipped: 68 KB)
- **First Load:** <2s on 3G
- **API Response:** 100-500ms (cached: <10ms)
- **Lighthouse Score:** 95+ Performance

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is for demonstration purposes. 

**Important:** 
- The borsajs library is provided as-is
- This demo is not affiliated with any financial institution
- Data is for educational purposes only
- Not financial advice

## 🔗 Links

- **Live Demo:** https://borsajs-showcase.web.app
- **BorsaJS Library:** https://github.com/mesutpiskin/borsajs
- **Firebase Console:** https://console.firebase.google.com/project/borsajs-showcase
- **NPM Package:** https://www.npmjs.com/package/borsajs

## � Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the wiki documentation

## 🎉 Acknowledgments

- Built with [borsajs](https://github.com/mesutpiskin/borsajs) by [@mesutpiskin](https://github.com/mesutpiskin)
- Hosted on Firebase
- Inspired by modern financial dashboards

---

Made with ❤️ for the Turkish developer community
