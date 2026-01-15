# 📰 Newsprint - Personalized Daily News Digest

A Google Apps Script-based automated news aggregation system that delivers personalized daily digests combining RSS feeds, market data, weather, and topic monitoring directly to your email and Kindle.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=google&logoColor=white)](https://script.google.com)

## ✨ Features

- 📡 **RSS Feed Aggregation** - Combine multiple news sources into one digest
- 🎯 **Topic Monitoring** - Google Alerts replacement with customizable topic tracking
- 📈 **Market Data** - Stock prices, crypto, and forex updates
- 🌤️ **Weather Forecasts** - Multi-location weather reports
- 🤖 **AI Summarization** - ChatGPT-powered news summaries
- 📧 **Email Delivery** - Daily digest to email or Kindle e-reader
- 🌐 **Multi-language Support** - Supports content from various languages

## 🚀 Quick Start

### Prerequisites

- Google Account
- OpenAI API Key (for summaries)
- Amazon Kindle email (optional, for e-reader delivery)

### Installation

1. **Open Google Apps Script**
   - Go to [script.google.com](https://script.google.com)
   - Create a new project

2. **Copy the Code**
   - Copy the contents of `newsprint.gs` into the script editor
   - Save the project (give it a name like "Newsprint")

3. **Securely Store Your API Key**
   - In the Apps Script editor, go to **Project Settings** (the ⚙️ icon on the left).
   - Under **Script Properties**, click **Add script property**.
   - For the **Property** name, enter `OPENAI_API_KEY`.
   - For the **Value**, paste your secret OpenAI API key.
   - Click **Save script properties**.

   This keeps your API key from being exposed directly in the code.

4. **Configure Your Script**
   - This project uses a configuration block at the top of the `newsprint.gs` file. You can customize your digest by editing these settings.
   - For a starting point, see the `examples` directory. Copy the contents of `examples/config-minimal.js` or `examples/config-full.js` and paste it into the configuration section of `newsprint.gs`.
   - See the [Configuration Guide](#️-configuration-guide) below for more details.

5. **Set Up Trigger**
   - In Apps Script: Click ⏰ (Triggers)
   - Add new trigger:
     - Function: `dailyReport`
     - Event: Time-driven
     - Type: Day timer
     - Time: Select your preferred time (e.g., 6:00 AM)

6. **Authorize the Script**
   - Run the script manually once by clicking **▶️ Run**.
   - A dialog will appear asking for authorization. Grant the necessary permissions.
   - Check your email!

## ⚙️ Configuration Guide

This script is configured by editing the variables in the `CONFIGURATION` section at the top of the `newsprint.gs` file.

### RSS News Sources

Add or modify RSS feeds in the `NEWS_SOURCES` array:

```javascript
const NEWS_SOURCES = [
  { name: "Associated Press", url: "https://apnews.com/apf-topnews" },
  { name: "Reuters", url: "https://feeds.reuters.com/reuters/topNews" },
  { name: "New York Times", url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml" },
  // Add your sources here
];
```

See `docs/RSS_SOURCES.md` for a comprehensive list of international news RSS feeds.

### Topic Monitoring

The `ALERT_TOPICS` array functions as a Google Alerts replacement, monitoring news mentions:

```javascript
const ALERT_TOPICS = [
  "Company Name",
  "\"exact phrase match\"",  // Use quotes for exact matching
  "tech industry",
  "global economy",
];
```

**Tips:**
- Use quotes for exact phrase matching
- Topics are checked every 12 hours for new mentions
- Supports English and other languages depending on news sources

### Market Data

Configure your portfolio tracking:

```javascript
const STOCKS = ["AAPL", "GOOGL", "MSFT"];
const CRYPTO = ["BTC", "ETH", "SOL"];
const FOREX = ["EUR/USD", "GBP/USD"];
```

### Weather Locations

Add locations you want weather for:

```javascript
const LOCATIONS = {
  "New York": { lat: 40.7128, lon: -74.0060 },
  "London": { lat: 51.5074, lon: -0.1278 },
  "Your City": { lat: YOUR_LAT, lon: YOUR_LON }
};
```

## 📧 Kindle Delivery Setup

To receive digests on your Kindle:

1. **Find Your Kindle Email**
   - Go to Amazon → Manage Your Content and Devices → Devices
   - Find your Kindle's email (e.g., `yourname@kindle.com`)

2. **Approve Sender**
   - Go to Settings → Personal Document Settings
   - Add your Gmail to "Approved Personal Document E-mail List"

3. **Update Script**
   ```javascript
   const KINDLE_EMAIL = "yourname@kindle.com";
   const USE_KINDLE = true;
   ```

## 📁 Project Structure

```
newsprint/
├── README.md                 # This file
├── newsprint.gs             # Main Google Apps Script
├── LICENSE                   # MIT License
├── docs/
│   ├── RSS_SOURCES.md       # Comprehensive RSS feed list
│   ├── TOPIC_IDEAS.md       # Ideas for topic monitoring
│   ├── TROUBLESHOOTING.md   # Common issues and solutions
│   └── ADVanced.md          # Advanced configuration
└── examples/
    ├── config-minimal.js    # Minimal configuration example
    ├── config-full.js       # Full-featured configuration
    └── output-sample.txt    # Sample email output
```

## 🎯 Use Cases

- **Daily News Briefing** - Wake up to curated news summary
- **Name/Brand Monitoring** - Track mentions of yourself, company, or competitors
- **Market Tracking** - Monitor your investment portfolio
- **E-reader Reading** - Distraction-free news on Kindle
- **Location-based Alerts** - Track news about specific places

## 🔧 Advanced Features

### Multiple Daily Reports

Run different reports at different times:

```javascript
// Morning brief - news + weather
function morningReport() {
  // Configure for morning priorities
}

// Evening digest - market close + full news
function eveningReport() {
  // Configure for evening reading
}
```

Set up separate triggers for each function.

### Custom Summarization

Adjust the ChatGPT prompt in `summarizeWithChatGPT()`:

```javascript
const prompt = `
Summarize these news articles:
- Focus on [your specific interests]
- Highlight [specific topics]
- Keep under 500 words
`;
```

### Filtering and Prioritization

Add content filtering logic:

```javascript
function filterNews(articles) {
  return articles.filter(article => {
    // Add your filtering logic
    return article.title.includes("keyword") || 
           article.source === "priority-source";
  });
}
```

## 🌐 RSS Feed Resources

### International Sources
- **Reuters**: `https://feeds.reuters.com/reuters/topNews`
- **BBC News**: `http://feeds.bbci.co.uk/news/rss.xml`
- **New York Times**: `https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml`
- **Wall Street Journal**: `https://feeds.a.dj.com/rss/RSSWorldNews.xml`
- **Associated Press**: `https://apnews.com/apf-topnews`

See `docs/RSS_SOURCES.md` for comprehensive list.

## 🐛 Troubleshooting

**No email received?**
- Check spam/junk folder
- Verify script execution in Apps Script (View → Executions)
- Check that trigger is set up correctly

**Topic alerts not working?**
- Google News RSS can be rate-limited
- Try reducing number of topics or increasing delay
- Check execution logs for errors

**Kindle not receiving?**
- Verify Kindle email is correct
- Check that sender is approved in Amazon settings
- Amazon has daily limits on personal documents

**Market data missing?**
- APIs can have outages or rate limits
- Script includes fallbacks for crypto data
- Check specific API status

See `docs/TROUBLESHOOTING.md` for more details.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Ideas for contributions:**
- Additional news sources
- New market data providers
- Enhanced summarization prompts
- Support for more languages
- Web UI for configuration
- Alternative delivery methods (Telegram, etc.)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need for modern newspaper experience on e-readers
- Uses OpenAI's GPT for intelligent summarization
- Leverages Google Apps Script for serverless automation

## 📧 Support & Contact

For support, please open an issue on the GitHub repository.

---

**Built for intentional readers**

*Newsprint: Mindful news consumption for the modern reader.*
