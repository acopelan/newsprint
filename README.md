# 📰 Newsprint - Your Personalized Daily News Digest

Newsprint is a Google Apps Script that automates the creation and delivery of a personalized news digest. It combines RSS feeds, topic monitoring, market data, and weather forecasts into a beautifully formatted email, delivered daily to your inbox or Kindle.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=google&logoColor=white)](https://script.google.com)

## ✨ Features

- 📡 **RSS Feed Aggregation**: Combine your favorite news sources into a single, clean digest.
- 🎯 **Topic Monitoring**: Track news about specific keywords, brands, or topics.
- 📈 **Market Data**: Get daily updates on stocks and cryptocurrencies.
- 🌤️ **Weather Forecasts**: Include weather reports for multiple locations.
- 🤖 **AI Summarization**: Uses OpenAI (GPT-4o-mini) to generate concise, narrative-style news summaries.
- 📧 **Dual Delivery**: Send digests to both a regular email address and a Kindle e-reader.
- 🌐 **Customizable**: Easily configured with your own sources, topics, and settings.

## 🚀 Quick Start

### Prerequisites

- A Google Account (to run the script).
- An OpenAI API Key (for AI-powered news summaries).

### Installation in 5 Minutes

1.  **Create a New Google Apps Script**
    -   Go to [script.google.com](https://script.google.com) and click **New project**.
    -   Give the project a name, like "Newsprint".

2.  **Copy the Code**
    -   Open the `newsprint.gs` file in this repository.
    -   Copy its entire contents and paste it into the script editor, replacing any default code.

3.  **Securely Store Your API Key**
    -   In the Apps Script editor, go to **Project Settings** (the ⚙️ icon on the left).
    -   Under **Script Properties**, click **Add script property**.
    -   Create a property with the name `OPENAI_API_KEY` and paste your secret OpenAI API key as the value.
    -   Click **Save script properties**. This is the most secure way to handle API keys in Apps Script.

4.  **Configure Your Digest**
    -   Back in the **Editor** (the `<>` icon), all configuration is done in the `CONFIGURATION` block at the top of the `newsprint.gs` file.
    -   Set your `RECIPIENT_EMAIL`, and optionally your `KINDLE_EMAIL`.
    -   Add your preferred `NEWS_SOURCES`, `ALERT_TOPICS`, `LOCATIONS`, and market symbols. See the [Configuration Guide](#-configuration-guide) for more details.

5.  **Set the Daily Trigger**
    -   In the editor, click the **Triggers** icon (the ⏰ icon on the left).
    -   Click **Add Trigger**.
    -   Set it up as follows:
        -   Function to run: `dailyReport`
        -   Deployment: `Head`
        -   Event source: `Time-driven`
        -   Type of time-based trigger: `Day timer`
        -   Time of day: Your desired delivery time (e.g., 6am - 7am).
    -   Click **Save**.

6.  **Authorize and Run**
    -   To ensure everything is working, run the script once manually. In the editor, select the `dailyReport` function from the dropdown at the top and click **▶️ Run**.
    -   A dialog will appear asking for authorization. Grant the script the necessary permissions to send emails and fetch data.
    -   Check your email for your first Newsprint digest!

## ⚙️ Configuration Guide

All configuration is done by editing the variables in the `CONFIGURATION` section at the top of `newsprint.gs`.

### RSS News Sources

Add or modify RSS feeds in the `NEWS_SOURCES` array. A good starting list is already included.

```javascript
const NEWS_SOURCES = [
  { name: "Associated Press", url: "https://apnews.com/apf-topnews" },
  { name: "Reuters", url: "https://www.reuters.com/rssfeed/technologyNews" },
  // Add your sources here
];
```

See `docs/RSS_SOURCES.md` for a large list of international and topic-specific feeds.

### Topic Monitoring

Use `ALERT_TOPICS` to monitor Google News for specific keywords or phrases.

```javascript
const ALERT_TOPICS = [
  "\"Artificial Intelligence\"", // Use quotes for exact phrase matching
  "\"Tech Startups\"",
  "Your Company Name"
];
```

### Market Data

Configure stocks and cryptocurrencies to track.

```javascript
const CRYPTO_SYMBOLS = ["BTC", "ETH"];
const STOCK_SYMBOLS = ["AAPL", "GOOGL", "TSLA"];
```

### Weather Locations

Add locations for your weather report.

```javascript
const LOCATIONS = {
  "New York": { lat: 40.7128, lon: -74.0060 },
  "London": { lat: 51.5074, lon: -0.1278 },
};
```

## 📧 Kindle Delivery Setup

1.  **Find Your Kindle Email**: On Amazon, go to `Manage Your Content and Devices` → `Devices` to find your Kindle's email address (e.g., `yourname@kindle.com`).
2.  **Approve Sender**: In `Settings` → `Personal Document Settings`, add your Google Account's email address to the "Approved Personal Document E-mail List".
3.  **Update Script**: Set the `KINDLE_EMAIL` and `USE_KINDLE` variables in the script's configuration section.

## 🐛 Troubleshooting

-   **No email received?** Check your spam folder. Verify the script ran by going to **Executions** in the Apps Script editor. Ensure your trigger is enabled.
-   **Market data missing?** The script uses public APIs that can occasionally be unavailable. The script includes fallbacks for crypto data.
-   **Kindle delivery failed?** Double-check that your Kindle email is correct and that you have approved your Google email address in your Amazon settings.

See `docs/TROUBLESHOOTING.md` for more details.

## 🤝 Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and open a pull request.

**Ideas for contributions:**
-   Add new data sources (e.g., more market data APIs).
-   Improve summarization prompts.
-   Add alternative delivery methods (e.g., Telegram, Slack).
-   Implement a web UI for configuration.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Support & Contact

Have a question or a feature request? Please [open an issue](https://github.com/the-newsprint-project/newsprint-repo/issues) on the GitHub repository.
