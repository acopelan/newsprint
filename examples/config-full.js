// FULL-FEATURED CONFIGURATION
// Comprehensive setup with all features enabled
// NOTE: This is an example configuration. Please replace the values with your own.

/*******************************
 * API & EMAIL SETTINGS
 *******************************/
const OPENAI_API_KEY = "sk-your-full-openai-api-key";
const RECIPIENT_EMAIL = "your@email.com";
const KINDLE_EMAIL = "yourname@kindle.com";
const USE_KINDLE = false;  // Set true to send to Kindle

/*******************************
 * LOCATIONS FOR WEATHER
 *******************************/
const LOCATIONS = {
  "San Francisco": { lat: 37.7749, lon: -122.4194 },
  "Palo Alto": { lat: 37.4419, lon: -122.1430 },
  "New York": { lat: 40.7128, lon: -74.0060 },
  "London": { lat: 51.5074, lon: -0.1278 },
  "Tokyo": { lat: 35.6895, lon: 139.6917 }
};

/*******************************
 * NEWS SOURCES - COMPREHENSIVE
 *******************************/
const NEWS_SOURCES = [
  // US & International
  { name: "New York Times", url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml" },
  { name: "Wall Street Journal", url: "https://feeds.a.dj.com/rss/RSSWorldNews.xml" },
  { name: "Reuters", url: "https://feeds.reuters.com/reuters/topNews" },
  { name: "Associated Press", url: "https://apnews.com/apf-topnews" },
  { name: "BBC News", url: "http://feeds.bbci.co.uk/news/rss.xml" },
  
  // Technology
  { name: "TechCrunch", url: "https://techcrunch.com/feed/" },
  { name: "Hacker News", url: "https://news.ycombinator.com/rss" },
  { name: "The Verge", url: "https://www.theverge.com/rss/index.xml" },
  { name: "Ars Technica", url: "http://feeds.arstechnica.com/arstechnica/index" },
  
  // Business & Finance
  { name: "Bloomberg", url: "https://www.bloomberg.com/feed/podcast/bloomberg-surveillance.xml" },
  { name: "Financial Times", url: "https://www.ft.com/?format=rss" },
  { name: "CNBC", url: "https://www.cnbc.com/id/100003114/device/rss/rss.html" },

  // Science
  { name: "Nature", url: "http://feeds.nature.com/nature/rss/current" },
  { name: "Science Magazine", url: "https://www.science.org/rss/news_current.xml" }
];

/*******************************
 * TOPIC MONITORING - COMPREHENSIVE
 *******************************/
const ALERT_TOPICS = [
  // Personal
  "\"Your Name\"",
  
  // Professional
  "\"Artificial Intelligence\"",
  "\"Machine Learning\"",
  "\"Cloud Computing\"",
  "\"SaaS\"",
  
  // Competitors
  "\"Salesforce\"",
  "\"Oracle\"",
  "\"SAP\"",
  "\"Microsoft Dynamics\"",
  
  // Research Topics
  "\"Natural Language Processing\"",
  "\"Computer Vision\"",
  "\"Reinforcement Learning\"",
  "\"Neural Networks\"",
  
  // Locations
  "\"San Francisco\"",
  "\"Silicon Valley\"",
  "\"Bay Area\"",
  "\"Palo Alto\"",
  
  // Professional Network
  "\"Tech Conference 2026\"",
  "\"Y Combinator\"",
  
  // Other Interests
  "\"Venture Capital\"",
  "\"Startup Funding\"",
  "\"Tech IPOs\"",
  
  // Real Estate
  "\"San Francisco real estate\"",
  "\"Bay Area housing market\""
];

/*******************************
 * MARKET DATA
 *******************************/
// Your stock portfolio
const STOCKS = [
  "AAPL",   // Apple
  "GOOGL",  // Google
  "MSFT",   // Microsoft
  "TSLA",   // Tesla
  "NVDA",   // NVIDIA
  "SPY",    // S&P 500 ETF
  "QQQ"     // Nasdaq ETF
];

// Crypto holdings
const CRYPTO = [
  "BTC",    // Bitcoin
  "ETH",    // Ethereum
  "SOL",    // Solana
  "ADA"     // Cardano
];

// Currency pairs
const FOREX = [
  "EUR/USD",  // Euro to Dollar
  "GBP/USD",  // Pound to Dollar
  "USD/JPY"   // Dollar to Yen
];

/*******************************
 * ADVANCED SETTINGS (OPTIONAL)
 *******************************/

// Customize alert lookback period (in hours)
const ALERT_LOOKBACK_HOURS = 12;

// Rate limiting delay between alert searches (ms)
const ALERT_SEARCH_DELAY = 800;

// Maximum news items per source
const MAX_ITEMS_PER_SOURCE = 10;

// Weather forecast days
const WEATHER_FORECAST_DAYS = 3;

// ChatGPT model selection
const GPT_MODEL = "gpt-4";  // or "gpt-3.5-turbo" for cheaper

// Maximum tokens for summary
const SUMMARY_MAX_TOKENS = 1000;

/*******************************
 * CUSTOM FUNCTIONS
 *******************************/

// Run different versions for different times
function morningBrief() {
  // Lighter version for morning
  const customConfig = {
    includeMarkets: false,  // Skip market data in morning
    shortSummary: true      // Briefer summary
  };
  // ... custom logic
}

function eveningDigest() {
  // Full version for evening
  const customConfig = {
    includeMarkets: true,   // Include market close
    fullAnalysis: true      // Detailed summary
  };
  // ... custom logic
}

// Weekend edition - different sources
function weekendEdition() {
  const WEEKEND_SOURCES = [
    { name: "NYT Sunday", url: "https://rss.nytimes.com/services/xml/rss/nyt/sunday-review.xml" },
    { name: "WSJ Opinion", url: "https://feeds.a.dj.com/rss/RSSOpinion.xml" }
  ];
  // ... weekend logic
}

/*******************************
 * NOTES ON THIS CONFIGURATION
 *******************************/

/*
This is a comprehensive example showing all features.
You may want to:

1. REMOVE sources you don't read
2. REDUCE topics to 15-20 most important
3. LIMIT stocks/crypto to your actual holdings
4. ADJUST locations to places you care about
5. SET appropriate alert lookback period
6. CUSTOMIZE email formatting

Performance considerations:
- More sources = slower execution
- More topics = risk of rate limiting
- More locations = more API calls
- Balance comprehensiveness vs speed

Cost considerations:
- Each run uses OpenAI tokens (~$0.01-0.05/day with GPT-4)
- Use GPT-3.5-turbo to reduce costs
- Consider summarizing only on weekdays

Recommended approach:
1. Start with minimal config
2. Add sources gradually
3. Monitor execution time
4. Adjust based on what's useful
*/
