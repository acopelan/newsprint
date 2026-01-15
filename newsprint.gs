/*******************************
 * NEWSPRINT - Daily News Digest
 * Version: 2.0
 * Author: Arieh Copelan
 * Description: Automated news aggregation with topic monitoring, 
 *              market data, and weather delivered to email/Kindle
 *******************************/

/*******************************
 * CONFIGURATION
 *******************************/

// Secrets and Emails - Set these in Project Settings > Script Properties
const SCRIPT_PROPERTIES = PropertiesService.getScriptProperties();
const OPENAI_API_KEY = SCRIPT_PROPERTIES.getProperty('OPENAI_API_KEY');
const RECIPIENT_EMAIL = SCRIPT_PROPERTIES.getProperty('RECIPIENT_EMAIL');
const KINDLE_EMAIL = SCRIPT_PROPERTIES.getProperty('KINDLE_EMAIL');

// General Settings
const USE_KINDLE = true; // Set to true to send to Kindle instead

// Geographic Locations for Weather
const LOCATIONS = {
  "San Francisco": { lat: 37.7749, lon: -122.4194 },
  "New York": { lat: 40.7128, lon: -74.0060 },
  "London": { lat: 51.5074, lon: -0.1278 }
};

// Add your RSS news sources here
const NEWS_SOURCES = [
  { name: "Associated Press", url: "https://apnews.com/apf-topnews" },
  { name: "Reuters", url: "https://www.reuters.com/rssfeed/technologyNews" },
  { name: "Hacker News", url: "https://news.ycombinator.com/rss" },
];

// Google Alert topics
const ALERT_TOPICS = [
  "\"Artificial Intelligence\"",
  "\"Tech Startups\"",
  "\"San Francisco\"",
  "\"Venture Capital\"",
  "\"Stock Market\"",
  "\"SaaS\"",
  "\"Cloud Computing\"",
  "\"Cybersecurity\"",
  "\"Your Name\""
];

// Crypto and Stocks to track
const CRYPTO_SYMBOLS = ["BTC", "ETH", "SOL"];
const STOCK_SYMBOLS = ["AAPL", "GOOGL", "MSFT", "TSLA"];

/*******************************
 MAIN DAILY JOB - KINDLE VERSION WITH ATTACHMENT
*******************************/
function dailyReport() {
  const newsWithLinks = fetchNewsTextWithLinks();
  const newsSummary = summarizeNewsWithChatGPT(newsWithLinks.text, newsWithLinks.links);
  
  const alertsWithLinks = fetchAlertsWithLinks();
  let alertsSummary = "";
  if (alertsWithLinks.text && alertsWithLinks.text.length > 0) {
    alertsSummary = summarizeAlertsWithChatGPT(alertsWithLinks.text, alertsWithLinks.links);
  }
  
  const weatherReport = fetchWeatherForLocations();
  const markets = fetchMarketData();
  const marketSummary = summarizeMarkets(markets);

  // Determine morning or evening edition
  const now = new Date();
  const hour = now.getHours();
  const period = hour < 12 ? "Morning" : "Evening";
  const dateStr = Utilities.formatDate(now, "Asia/Jerusalem", "EEEE, MMMM d, yyyy");

  // Build HTML content
  let htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Newsprint - ${period} Edition</title>
  <style>
    body {
      font-family: Georgia, serif;
      font-size: 14pt;
      line-height: 1.6;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      font-size: 20pt;
      margin-bottom: 5px;
      border-bottom: 2px solid #000;
      padding-bottom: 10px;
    }
    h2 {
      font-size: 16pt;
      margin-top: 30px;
      margin-bottom: 10px;
      border-bottom: 1px solid #666;
      padding-bottom: 5px;
    }
    .subtitle {
      font-size: 12pt;
      color: #666;
      margin-bottom: 20px;
    }
    p {
      margin-bottom: 15px;
      text-align: justify;
    }
    a {
      color: #0066cc;
      text-decoration: underline;
    }
    .market-data {
      font-family: 'Courier New', monospace;
      font-size: 11pt;
      line-height: 1.4;
      white-space: pre-wrap;
    }
    .section {
      margin-bottom: 30px;
      page-break-inside: avoid;
    }
    .story-link {
      font-size: 11pt;
      color: #666;
      margin-top: 5px;
      margin-bottom: 15px;
    }
  </style>
</head>
<body>
  <h1>NEWSPRINT</h1>
  <div class="subtitle">${period} Edition - ${dateStr}</div>
  
  <div class="section">
    <h2>POLITICS & TECHNOLOGY</h2>
    ${newsSummary}
  </div>
`;

  if (alertsSummary && alertsSummary.length > 0) {
    htmlContent += `
  <div class="section">
    <h2>PERSONAL ALERTS</h2>
    ${alertsSummary}
  </div>
`;
  }

  htmlContent += `
  <div class="section">
    <h2>MARKETS</h2>
    <div class="market-data">${markets}</div>
    ${marketSummary}
  </div>
  
  <div class="section">
    <h2>WEATHER</h2>
    ${weatherReport.replace(/\n/g, '<br>')}
  </div>
  
</body>
</html>
`;

  // Plain text version for regular email
  let textBody = `NEWSPRINT - ${period} Edition\n${dateStr}\n\n`;
  textBody += "POLITICS & TECHNOLOGY\n-------------------------\n" + newsSummary.replace(/<[^>]*>/g, '') + "\n\n";
  
  if (alertsSummary && alertsSummary.length > 0) {
    textBody += "PERSONAL ALERTS\n-------------------------\n" + alertsSummary.replace(/<[^>]*>/g, '') + "\n\n";
  }
  
  textBody += "MARKETS\n-------------------------\n" + markets + "\n\n" + marketSummary.replace(/<[^>]*>/g, '') + "\n\n";
  textBody += "WEATHER\n-------------------------\n" + weatherReport + "\n\n";

  // Create HTML file as blob for Kindle attachment
  const htmlBlob = Utilities.newBlob(htmlContent, 'text/html', `Newsprint_${period}_${Utilities.formatDate(now, "GMT", "yyyyMMdd")}.html`);

  // Send to Kindle with HTML attachment
  if (USE_KINDLE) {
    GmailApp.sendEmail(
      KINDLE_EMAIL,
      `Newsprint ${period}`,
      "Your Newsprint digest is attached.",
      {
        name: "Newsprint",
        attachments: [htmlBlob]
      }
    );
  }
  
  // Also send to your regular email with HTML body (no attachment needed)
  GmailApp.sendEmail(
    RECIPIENT_EMAIL,
    `Newsprint - ${period} Edition`,
    textBody,
    {
      name: "Newsprint",
      htmlBody: htmlContent
    }
  );
}

/*******************************
 MARKETS DATA (CRYPTO + STOCKS)
*******************************/
function fetchMarketData() {
  let report = "";
  
  // Fetch Crypto
  report += "CRYPTOCURRENCY\n";
  CRYPTO_SYMBOLS.forEach(symbol => {
    try {
      const data = fetchCryptoData(symbol);
      report += formatMarketData(symbol, data);
      Utilities.sleep(2000);
    } catch (e) {
      Logger.log(`Error fetching ${symbol}: ${e}`);
      report += `${symbol}: Data unavailable\n`;
    }
  });
  
  report += "\nEQUITIES\n";
  STOCK_SYMBOLS.forEach(symbol => {
    try {
      const data = fetchStockData(symbol);
      report += formatMarketData(symbol, data);
      Utilities.sleep(500);
    } catch (e) {
      Logger.log(`Error fetching ${symbol}: ${e}`);
      report += `${symbol}: Data unavailable\n`;
    }
  });
  
  return report.trim();
}

function summarizeMarkets(marketsData) {
  const url = "https://api.openai.com/v1/chat/completions";

  const payload = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system", 
        content: "You are a financial news writer for The Economist. Write a brief 2-3 sentence summary of what's happening in the markets based on the price changes. Mention the most significant movers and explain what might be driving the changes. CRITICAL FORMATTING: Wrap your response in <p></p> tags. Write in a narrative style without bullet points." 
      },
      {
        role: "user", 
        content: "Based on these market movements, write a brief summary wrapped in <p></p> tags:\n\n" + marketsData 
      }
    ],
    temperature: 0.3,
    max_tokens: 300
  };

  const options = {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}` },
    payload: JSON.stringify(payload)
  };

  try {
    const res = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(res.getContentText());
    return json.choices[0].message.content.trim();
  } catch (e) {
    Logger.log(e);
    return "";
  }
}

function fetchCryptoData(symbol) {
  try {
    return fetchCryptoDataYahoo(symbol);
  } catch (e1) {
    Logger.log(`Yahoo failed for ${symbol}: ${e1}`);
    try {
      return fetchCryptoDataCoinCap(symbol);
    } catch (e2) {
      Logger.log(`CoinCap also failed for ${symbol}: ${e2}`);
      throw new Error("All crypto APIs failed");
    }
  }
}

function fetchCryptoDataYahoo(symbol) {
  const yahooSymbols = {
    "BTC": "BTC-USD",
    "ETH": "ETH-USD",
    "SOL": "SOL-USD",
    "XRP": "XRP-USD",
    "ADA": "ADA-USD"
  };
  
  const yahooSymbol = yahooSymbols[symbol];
  if (!yahooSymbol) throw new Error("Unknown crypto symbol");
  
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?range=1y&interval=1d`;
  
  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  
  if (response.getResponseCode() !== 200) {
    throw new Error(`API returned ${response.getResponseCode()}`);
  }
  
  const json = JSON.parse(response.getContentText());
  
  if (!json.chart || !json.chart.result || json.chart.result.length === 0) {
    throw new Error("Invalid response structure");
  }
  
  const result = json.chart.result[0];
  const meta = result.meta;
  const timestamps = result.timestamp;
  const closes = result.indicators.quote[0].close;
  
  const currentPrice = meta.regularMarketPrice;
  
  const now = Math.floor(Date.now() / 1000);
  const day1 = now - (24 * 60 * 60);
  const day7 = now - (7 * 24 * 60 * 60);
  const day30 = now - (30 * 24 * 60 * 60);
  const day365 = now - (365 * 24 * 60 * 60);
  
  const price1d = findClosestPrice(timestamps, closes, day1);
  const price7d = findClosestPrice(timestamps, closes, day7);
  const price30d = findClosestPrice(timestamps, closes, day30);
  const price1y = findClosestPrice(timestamps, closes, day365);
  
  return {
    price: currentPrice,
    change_24h: calculateChange(price1d, currentPrice),
    change_7d: calculateChange(price7d, currentPrice),
    change_30d: calculateChange(price30d, currentPrice),
    change_1y: calculateChange(price1y, currentPrice)
  };
}

function fetchCryptoDataCoinCap(symbol) {
  const coinIds = {
    "BTC": "bitcoin",
    "ETH": "ethereum",
    "SOL": "solana",
    "XRP": "xrp",
    "ADA": "cardano"
  };
  
  const coinId = coinIds[symbol];
  if (!coinId) throw new Error("Unknown crypto symbol");
  
  const currentUrl = `https://api.coincap.io/v2/assets/${coinId}`;
  const currentResponse = UrlFetchApp.fetch(currentUrl, { 
    muteHttpExceptions: true,
    headers: {
      'Accept': 'application/json'
    }
  });
  
  if (currentResponse.getResponseCode() !== 200) {
    throw new Error(`API returned ${currentResponse.getResponseCode()}`);
  }
  
  const currentJson = JSON.parse(currentResponse.getContentText());
  const currentPrice = parseFloat(currentJson.data.priceUsd);
  const change24h = parseFloat(currentJson.data.changePercent24Hr);
  
  const now = Date.now();
  const day7 = now - (7 * 24 * 60 * 60 * 1000);
  const day30 = now - (30 * 24 * 60 * 60 * 1000);
  const day365 = now - (365 * 24 * 60 * 60 * 1000);
  
  const historyUrl = `https://api.coincap.io/v2/assets/${coinId}/history?interval=d1`;
  const historyResponse = UrlFetchApp.fetch(historyUrl, { muteHttpExceptions: true });
  
  if (historyResponse.getResponseCode() !== 200) {
    return {
      price: currentPrice,
      change_24h: change24h,
      change_7d: null,
      change_30d: null,
      change_1y: null
    };
  }
  
  const history = JSON.parse(historyResponse.getContentText()).data;
  
  const price7d = findClosestPriceByTime(history, day7);
  const price30d = findClosestPriceByTime(history, day30);
  const price1y = findClosestPriceByTime(history, day365);
  
  return {
    price: currentPrice,
    change_24h: change24h,
    change_7d: calculateChange(price7d, currentPrice),
    change_30d: calculateChange(price30d, currentPrice),
    change_1y: calculateChange(price1y, currentPrice)
  };
}

function findClosestPriceByTime(history, targetTime) {
  if (!history || history.length === 0) return null;
  
  let closest = history[0];
  let minDiff = Math.abs(history[0].time - targetTime);
  
  for (let i = 1; i < history.length; i++) {
    const diff = Math.abs(history[i].time - targetTime);
    if (diff < minDiff) {
      minDiff = diff;
      closest = history[i];
    }
  }
  
  return parseFloat(closest.priceUsd);
}

function fetchStockData(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1y&interval=1d`;
  
  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  
  if (response.getResponseCode() !== 200) {
    throw new Error(`API returned ${response.getResponseCode()}`);
  }
  
  const json = JSON.parse(response.getContentText());
  
  if (!json.chart || !json.chart.result || json.chart.result.length === 0) {
    throw new Error("Invalid response structure");
  }
  
  const result = json.chart.result[0];
  const meta = result.meta;
  const timestamps = result.timestamp;
  const closes = result.indicators.quote[0].close;
  
  const currentPrice = meta.regularMarketPrice;
  
  const now = Math.floor(Date.now() / 1000);
  const day1 = now - (24 * 60 * 60);
  const day7 = now - (7 * 24 * 60 * 60);
  const day30 = now - (30 * 24 * 60 * 60);
  const day365 = now - (365 * 24 * 60 * 60);
  
  const price1d = findClosestPrice(timestamps, closes, day1);
  const price7d = findClosestPrice(timestamps, closes, day7);
  const price30d = findClosestPrice(timestamps, closes, day30);
  const price1y = findClosestPrice(timestamps, closes, day365);
  
  return {
    price: currentPrice,
    change_24h: calculateChange(price1d, currentPrice),
    change_7d: calculateChange(price7d, currentPrice),
    change_30d: calculateChange(price30d, currentPrice),
    change_1y: calculateChange(price1y, currentPrice)
  };
}

function findClosestPrice(timestamps, closes, targetTime) {
  if (!timestamps || timestamps.length === 0) return null;
  
  let closestIndex = 0;
  let minDiff = Math.abs(timestamps[0] - targetTime);
  
  for (let i = 1; i < timestamps.length; i++) {
    const diff = Math.abs(timestamps[i] - targetTime);
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = i;
    }
  }
  
  return closes[closestIndex];
}

function calculateChange(oldPrice, newPrice) {
  if (!oldPrice || oldPrice === 0 || !newPrice) return null;
  return ((newPrice - oldPrice) / oldPrice) * 100;
}

function formatMarketData(symbol, data) {
  const formatChange = (change) => {
    if (change === null || change === undefined) return "N/A";
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(2)}%`;
  };
  
  const formatPrice = (price) => {
    if (price >= 1000) return `$${price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  };
  
  return `${symbol}: ${formatPrice(data.price)} (1D: ${formatChange(data.change_24h)}, 1W: ${formatChange(data.change_7d)}, 1M: ${formatChange(data.change_30d)}, 1Y: ${formatChange(data.change_1y)})\n`;
}

/*******************************
 GOOGLE ALERTS WITH LINKS
*******************************/
function fetchAlertsWithLinks() {
  let allAlerts = [];
  let linkMap = {};
  const thirteenHoursAgo = new Date();
  thirteenHoursAgo.setHours(thirteenHoursAgo.getHours() - 13);

  ALERT_TOPICS.forEach(topic => {
    try {
      const newsItems = searchGoogleNewsWithLinks(topic, thirteenHoursAgo);
      
      if (newsItems.length > 0) {
        newsItems.forEach(item => {
          const linkKey = `ALERT_${Object.keys(linkMap).length}`;
          linkMap[linkKey] = item.url;
          allAlerts.push(`[${linkKey}] ${item.title} (${item.source}, ${topic})`);
        });
      }
    } catch (err) {
      Logger.log(`Alert search failed for "${topic}": ${err}`);
    }
    
    Utilities.sleep(800);
  });

  if (allAlerts.length === 0) {
    return { text: "", links: {} };
  }

  return {
    text: allAlerts.join("\n"),
    links: linkMap
  };
}

function searchGoogleNewsWithLinks(query, sinceDate) {
  const encodedQuery = encodeURIComponent(query);
  
  const urls = [
    `https://news.google.com/rss/search?q=${encodedQuery}&hl=en-US&gl=US&ceid=US:en`,
    `https://news.google.com/rss/search?q=${encodedQuery}&hl=he&gl=IL&ceid=IL:he`
  ];
  
  let allResults = [];
  
  for (const url of urls) {
    try {
      const response = UrlFetchApp.fetch(url, { 
        muteHttpExceptions: true,
        followRedirects: true,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      if (response.getResponseCode() !== 200) {
        continue;
      }
      
      const xml = XmlService.parse(response.getContentText());
      const channel = xml.getRootElement().getChild("channel");
      
      if (!channel) continue;
      
      const items = channel.getChildren("item");
      
      for (let i = 0; i < Math.min(5, items.length); i++) {
        const item = items[i];
        const pubDateElement = item.getChild("pubDate");
        
        if (!pubDateElement) continue;
        
        const pubDate = new Date(pubDateElement.getText());
        
        if (pubDate >= sinceDate) {
          const titleElement = item.getChild("title");
          const linkElement = item.getChild("link");
          const sourceElement = item.getChild("source");
          
          if (titleElement && linkElement) {
            const title = titleElement.getText();
            const link = linkElement.getText();
            const source = sourceElement ? sourceElement.getText() : "Google News";
            
            if (!allResults.some(r => r.title === title)) {
              allResults.push({
                title: title,
                url: link,
                source: source,
                date: formatDate(pubDate)
              });
            }
          }
        }
      }
    } catch (e) {
      Logger.log(`Error with URL ${url}: ${e}`);
      continue;
    }
  }
  
  return allResults.slice(0, 3);
}

function formatDate(date) {
  const now = new Date();
  const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString();
}

/*******************************
 MULTI-SOURCE NEWS WITH LINKS
*******************************/
function fetchNewsTextWithLinks() {
  let allHeadlines = [];
  let linkMap = {};
  const thirteenHoursAgo = new Date();
  thirteenHoursAgo.setHours(thirteenHoursAgo.getHours() - 13);

  NEWS_SOURCES.forEach(source => {
    try {
      const response = UrlFetchApp.fetch(source.url, { 
        muteHttpExceptions: true,
        followRedirects: true 
      });
      
      if (response.getResponseCode() !== 200) {
        Logger.log(`${source.name} returned ${response.getResponseCode()}`);
        return;
      }
      
      const xml = response.getContentText("UTF-8");
      const document = XmlService.parse(xml);
      const root = document.getRootElement();
      
      let channel = root.getChild("channel");
      if (!channel) {
        channel = root;
      }
      
      const items = channel.getChildren("item");
      if (!items || items.length === 0) {
        const entries = channel.getChildren("entry");
        if (entries && entries.length > 0) {
          let count = 0;
          for (let i = 0; i < entries.length && count < 10; i++) {
            const entry = entries[i];
            const titleElement = entry.getChild("title");
            const linkElement = entry.getChild("link");
            const publishedElement = entry.getChild("published") || entry.getChild("updated");
            
            if (titleElement && publishedElement) {
              const pubDate = new Date(publishedElement.getText());
              if (pubDate >= thirteenHoursAgo) {
                const title = titleElement.getText();
                let link = "";
                if (linkElement) {
                  link = linkElement.getAttribute("href") ? linkElement.getAttribute("href").getValue() : linkElement.getText();
                }
                
                const linkKey = `LINK_${Object.keys(linkMap).length}`;
                linkMap[linkKey] = link;
                allHeadlines.push(`[${linkKey}] [${source.name}] ${title}`);
                count++;
              }
            }
          }
          return;
        }
      }

      let count = 0;
      for (let i = 0; i < items.length && count < 10; i++) {
        const item = items[i];
        const titleElement = item.getChild("title");
        const linkElement = item.getChild("link");
        const pubDateElement = item.getChild("pubDate");
        
        if (titleElement && pubDateElement) {
          const pubDate = new Date(pubDateElement.getText());
          if (pubDate >= thirteenHoursAgo) {
            const title = titleElement.getText();
            const link = linkElement ? linkElement.getText() : "";
            
            const linkKey = `LINK_${Object.keys(linkMap).length}`;
            linkMap[linkKey] = link;
            allHeadlines.push(`[${linkKey}] [${source.name}] ${title}`);
            count++;
          }
        }
      }
    } catch (err) {
      Logger.log(`Failed to fetch ${source.name}: ${err}`);
    }
  });

  if (allHeadlines.length === 0) {
    return { text: "No news headlines from the past 13 hours.", links: {} };
  }

  return {
    text: allHeadlines.join("\n"),
    links: linkMap
  };
}

/*******************************
 GPT SUMMARIZERS
*******************************/
function summarizeNewsWithChatGPT(text, linkMap) {
  const url = "https://api.openai.com/v1/chat/completions";

  const payload = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system", 
        content: "You are a writer for The Economist. Write news stories in The Economist's style: narrative prose paragraphs. CRITICAL FORMATTING: Wrap each story in <p></p> tags. After EACH story paragraph, include a source link on a new line in small gray text like: <div class='story-link'><a href='LINK_X'>Read more</a></div>. Each story should be 3-5 sentences covering who, what, where, when, and why. When you reference a headline that has a [LINK_X] tag, include that link in the story-link div. Group related headlines into single coherent stories. Write in a sophisticated, analytical tone. CRITICAL: Only include information that is explicitly stated in the headlines. Do NOT invent details, quotes, or specifics that are not in the source material." 
      },
      {
        role: "user", 
        content: "Write 5-8 news stories from these headlines. IMPORTANT: Format each story as: <p>Story text here...</p><div class='story-link'><a href='LINK_X'>Read more</a></div>. When referencing a specific headline with [LINK_X], use that link in the story-link div. Prioritize the most important stories. DO NOT add fabricated details - only use information explicitly stated in the headlines:\n\n" + text 
      }
    ],
    temperature: 0.2,
    max_tokens: 2500
  };

  const options = {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}` },
    payload: JSON.stringify(payload)
  };

  try {
    const res = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(res.getContentText());
    let summary = json.choices[0].message.content.trim();
    
    // Replace link placeholders
    for (const [key, url] of Object.entries(linkMap)) {
      const regex = new RegExp(key, 'g');
      summary = summary.replace(regex, url);
    }
    
    return summary;
  } catch (e) {
    Logger.log(e);
    return "News summarization failed.";
  }
}

function summarizeAlertsWithChatGPT(text, linkMap) {
  const url = "https://api.openai.com/v1/chat/completions";

  const payload = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system", 
        content: "You are a writer for The Economist. Write brief news items in The Economist's style. CRITICAL FORMATTING: Wrap each item in <p></p> tags. Each item should be 2-3 sentences. When you reference an alert that has a [ALERT_X] tag, hyperlink the relevant text using: <a href='ALERT_X'>descriptive text</a>. Write in a sophisticated tone. CRITICAL: Only include information explicitly stated in the alerts. Do NOT fabricate details." 
      },
      {
        role: "user", 
        content: "Write brief news items for these personal alerts. IMPORTANT: Wrap each individual item in <p></p> tags. Each should be 2-3 sentences. Hyperlink relevant phrases using <a href='ALERT_X'>text</a> format. Only use information provided in the alerts:\n\n" + text 
      }
    ],
    temperature: 0.2,
    max_tokens: 1500
  };

  const options = {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}` },
    payload: JSON.stringify(payload)
  };

  try {
    const res = UrlFetchApp.fetch(url, options);
    const json = JSON.parse(res.getContentText());
    let summary = json.choices[0].message.content.trim();
    
    // Replace link placeholders
    for (const [key, url] of Object.entries(linkMap)) {
      const regex = new RegExp(key, 'g');
      summary = summary.replace(regex, url);
    }
    
    return summary;
  } catch (e) {
    Logger.log(e);
    return "";
  }
}

/*******************************
 WEATHER FETCHER (Open-Meteo)
*******************************/
function fetchWeatherForLocations() {
  let report = "";

  for (const [name, coords] of Object.entries(LOCATIONS)) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true&timezone=auto`;

    try {
      const json = JSON.parse(UrlFetchApp.fetch(url).getContentText());
      const w = json.current_weather;
      const clothing =
        w.temperature >= 26 ? "T-shirt and light clothing" :
        w.temperature >= 20 ? "Light layer recommended" :
        w.temperature >= 14 ? "Long sleeves or light jacket" :
        "Coat or warm layers";

      report += `${name}: ${w.temperature}°C, wind ${w.windspeed} km/h. ${clothing}.\n`;
    } catch (e) {
      Logger.log(e);
      report += `${name}: Weather unavailable.\n`;
    }
  }

  return report.trim();
}

/*******************************
 * TROUBLESHOOTING & TEST FUNCTIONS
 *******************************/

/**
 * Tests the OpenAI API connection and summarization.
 * Select this function and click "Run" to test.
 * Check the logs for the output.
 */
function testOpenAISummary() {
  if (!OPENAI_API_KEY || OPENAI_API_KEY === "") {
    Logger.log("OpenAI API key is not set. Please set it in Script Properties.");
    return;
  }
  Logger.log("Testing OpenAI summarization...");
  const sampleText = "[LINK_0] [Hacker News] Major Tech Company Announces New AI Chip";
  const sampleLinks = { "LINK_0": "https://example.com" };
  const summary = summarizeNewsWithChatGPT(sampleText, sampleLinks);
  
  if (summary && summary !== "News summarization failed.") {
    Logger.log("✅ OpenAI test successful!");
    Logger.log("Sample Summary:");
    Logger.log(summary);
  } else {
    Logger.log("❌ OpenAI test failed. Check your API key and OpenAI service status.");
  }
}

/**
 * Tests fetching data from news RSS feeds.
 * Select this function and click "Run" to test.
 */
function testNewsFetch() {
  Logger.log("Testing RSS feed fetching...");
  const news = fetchNewsTextWithLinks();
  if (news.text && news.text !== "No news headlines from the past 13 hours.") {
    Logger.log("✅ News fetching test successful!");
    Logger.log("Fetched Headlines:");
    Logger.log(news.text);
  } else {
    Logger.log("❌ News fetching test failed. Check the URLs in NEWS_SOURCES and their RSS feed status.");
  }
}

/**
 * Tests fetching data from market data APIs.
 * Select this function and click "Run" to test.
 */
function testMarketData() {
  Logger.log("Testing Market Data fetching...");
  const marketData = fetchMarketData();
  if (marketData && !marketData.includes("Data unavailable")) {
    Logger.log("✅ Market data test successful!");
    Logger.log("Fetched Data:");
    Logger.log(marketData);
  } else {
    Logger.log("❌ Market data test failed. Check the API status for Yahoo Finance and CoinCap.");
    Logger.log("Full Log:");
    Logger.log(marketData);
  }
}

/**
 * Tests fetching data from the weather API.
 * Select this function and click "Run" to test.
 */
function testWeather() {
  Logger.log("Testing Weather fetching...");
  const weather = fetchWeatherForLocations();
  if (weather && !weather.includes("Weather unavailable")) {
    Logger.log("✅ Weather test successful!");
    Logger.log("Fetched Weather:");
    Logger.log(weather);
  } else {
    Logger.log("❌ Weather test failed. Check the Open-Meteo API status.");
  }
}