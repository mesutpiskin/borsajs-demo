// API Client for borsajs-demo backend
// All API calls go through Firebase Functions

const API_BASE_URL = '/api'; // Relative to current domain

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Request failed:', error);
        throw error;
    }
}



// Ticker API
export const tickerAPI = {
    getInfo: (symbol: string) => apiRequest<any>(`/ticker/${symbol}`),
    getHistory: (symbol: string, period = '1mo', interval = '1d') =>
        apiRequest<any>(`/ticker/${symbol}/history?period=${period}&interval=${interval}`),
};

// FX API
export const fxAPI = {
    getCurrent: (symbol: string) => apiRequest<any>(`/fx/${symbol}`),
};

// Crypto API
export const cryptoAPI = {
    getCurrent: (symbol: string) => apiRequest<any>(`/crypto/${symbol}`),
};

// Index API
export const indexAPI = {
    getInfo: (symbol: string) => apiRequest<any>(`/index/${symbol}`),
};

// Inflation API
export const inflationAPI = {
    getLatest: () => apiRequest<any>('/inflation/latest'),
    calculate: (amount: number, startDate: string, endDate: string) =>
        apiRequest<any>('/inflation/calculate', {
            method: 'POST',
            body: JSON.stringify({ amount, startDate, endDate }),
        }),
};

// KAP API
export const kapAPI = {
    getCompanies: () => apiRequest<any>('/kap/companies'),
    search: (query: string) => apiRequest<any>(`/kap/search?q=${encodeURIComponent(query)}`),
    getDisclosures: (ticker: string, limit = 5) => apiRequest<any>(`/kap/disclosures/${ticker}?limit=${limit}`),
    getCalendar: (ticker: string) => apiRequest<any>(`/kap/calendar/${ticker}`),
    getDetails: (ticker: string) => apiRequest<any>(`/kap/details/${ticker}`),
};

// Calendar API
export const calendarAPI = {
    thisWeek: () => apiRequest<any>('/calendar/week'),
};

// Bonds API
export const bondsAPI = {
    getAll: () => apiRequest<any>('/bonds'),
};

// Screener API
export const screenerAPI = {
    screen: (template: string) =>
        apiRequest<any>('/screener', {
            method: 'POST',
            body: JSON.stringify({ template }),
        }),
};

// VIOP API
export const viopAPI = {
    getStockFutures: () => apiRequest<any>('/viop/stock-futures'),
    getIndexFutures: () => apiRequest<any>('/viop/index-futures'),
    getCurrencyFutures: () => apiRequest<any>('/viop/currency-futures'),
};
// TCMB API
export const tcmbAPI = {
    getRates: () => apiRequest<any>('/tcmb/rates'),
};

// Eurobond API
export const eurobondAPI = {
    getList: (currency?: string) => apiRequest<any>(`/eurobond${currency ? `?currency=${currency}` : ''}`),
    getByISIN: (isin: string) => apiRequest<any>(`/eurobond/${isin}`),
};
