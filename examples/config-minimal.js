// MINIMAL CONFIGURATION
// Perfect for getting started quickly
// NOTE: This is an example configuration. Please replace the values with your own.

const OPENAI_API_KEY = "YOUR_KEY_HERE";
const RECIPIENT_EMAIL = "your@email.com";

// Just 3 locations
const LOCATIONS = {
  "New York": { lat: 40.7128, lon: -74.0060 },
  "London": { lat: 51.5074, lon: -0.1278 },
  "San Francisco": { lat: 37.7749, lon: -122.4194 }
};

// Core news sources only
const NEWS_SOURCES = [
  { name: "Associated Press", url: "https://apnews.com/apf-topnews" },
  { name: "Reuters", url: "https://feeds.reuters.com/reuters/topNews" },
  { name: "BBC News", url: "http://feeds.bbci.co.uk/news/rss.xml" }
];

// Personal monitoring only
const ALERT_TOPICS = [
  "\"Your Full Name\"",
  "\"Your Company\"",
  "\"Your City\""
];

// Essential stocks only
const STOCKS = ["SPY"];
const CRYPTO = [];
const FOREX = ["EUR/USD"];
