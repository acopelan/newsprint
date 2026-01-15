# 📡 RSS Feed Sources

Comprehensive list of RSS feeds for news aggregation. These feeds are tested and work with the Newsprint system.

## 🌍 International News Sources

### North America

| Source | RSS Feed URL | Focus |
|--------|-------------|-------|
| New York Times - Homepage | `https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml` | General news |
| Wall Street Journal - World News | `https://feeds.a.dj.com/rss/RSSWorldNews.xml` | Business/World |
| Washington Post | `http://feeds.washingtonpost.com/rss/national` | National news |
| CNN - Top Stories | `http://rss.cnn.com/rss/cnn_topstories.rss` | General news |
| NPR | `https://feeds.npr.org/1001/rss.xml` | General news |
| Associated Press | `https://apnews.com/apf-topnews` | General news |
| Axios | `https://api.axios.com/feed/` | Politics/Tech |

### Europe

| Source | RSS Feed URL | Focus |
|--------|-------------|-------|
| BBC News | `http://feeds.bbci.co.uk/news/rss.xml` | General news |
| The Guardian | `https://www.theguardian.com/world/rss` | General news |
| The Telegraph | `https://www.telegraph.co.uk/rss.xml` | General news |
| Financial Times | `https://www.ft.com/?format=rss` | Business/Finance |
| The Economist | `https://www.economist.com/the-world-this-week/rss.xml` | Analysis |
| Deutsche Welle | `https://rss.dw.com/rdf/rss-en-all` | German & International |
| France 24 | `https://www.france24.com/en/rss` | French & International |

### Asia & Australia

| Source | RSS Feed URL | Focus |
|--------|-------------|-------|
| The Times of India | `https://timesofindia.indiatimes.com/rssfeedstopstories.cms` | Indian news |
| South China Morning Post | `https://www.scmp.com/rss/91/feed` | Hong Kong & China |
| The Straits Times | `https://www.straitstimes.com/news/asia/rss.xml` | Singapore & Asia |
| NHK World-Japan | `https://www3.nhk.or.jp/nhkworld/en/news/rss/news.xml` | Japanese news |
| ABC News (Australia) | `https://www.abc.net.au/news/feed/51120/rss.xml` | Australian news |
| The Sydney Morning Herald | `https://www.smh.com.au/rss/feed.xml` | Australian news |

### International Agencies

| Source | RSS Feed URL | Focus |
|--------|-------------|-------|
| Reuters - Top News | `https://feeds.reuters.com/reuters/topNews` | General news |
| Reuters - World | `https://feeds.reuters.com/Reuters/worldNews` | International |
| Al Jazeera | `https://www.aljazeera.com/xml/rss/all.xml` | General news |
| AFP | `https://www.afp.com/en/news/2334/rss` | General news |

## 💼 Business & Technology

| Source | RSS Feed URL | Focus |
|--------|-------------|-------|
| TechCrunch | `https://techcrunch.com/feed/` | Tech news |
| The Verge | `https://www.theverge.com/rss/index.xml` | Tech/Culture |
| Ars Technica | `http://feeds.arstechnica.com/arstechnica/index` | Tech news |
| Hacker News | `https://news.ycombinator.com/rss` | Tech/Startups |
| Bloomberg | `https://www.bloomberg.com/feed/podcast/bloomberg-surveillance.xml` | Finance |
| CNBC | `https://www.cnbc.com/id/100003114/device/rss/rss.html` | Business |
| VentureBeat | `https://venturebeat.com/feed/` | Tech/AI |
| MIT Technology Review | `https://www.technologyreview.com/feed/` | Tech analysis |

## 🔬 Science & Research

| Source | RSS Feed URL | Focus |
|--------|-------------|-------|
| Nature | `http://feeds.nature.com/nature/rss/current` | Science |
| Science Magazine | `https://www.science.org/rss/news_current.xml` | Science |
| Scientific American | `http://rss.sciam.com/ScientificAmerican-Global` | Science |
| Phys.org | `https://phys.org/rss-feed/` | Science news |

## 📰 Alternative News Sources

| Source | RSS Feed URL | Focus |
|--------|-------------|-------|
| The Intercept | `https://theintercept.com/feed/?rss` | Investigative |
| ProPublica | `https://www.propublica.org/feeds/propublica/main` | Investigative |
| Vox | `https://www.vox.com/rss/index.xml` | Explainers |
| Medium - Top Stories | `https://medium.com/feed/top-stories` | Various |

## 🎯 Specialized Topics

### Climate & Environment

| Source | RSS Feed URL |
|--------|-------------|
| Climate Central | `https://www.climatecentral.org/feed` |
| Grist | `https://grist.org/feed/` |
| Inside Climate News | `https://insideclimatenews.org/feed/` |

### Defense & Security

| Source | RSS Feed URL |
|--------|-------------|
| Defense News | `https://www.defensenews.com/arc/outboundfeeds/rss/` |
| Breaking Defense | `https://breakingdefense.com/feed/` |
| War on the Rocks | `https://warontherocks.com/feed/` |

### Maritime

| Source | RSS Feed URL |
|--------|-------------|
| Maritime Executive | `https://www.maritime-executive.com/rss.xml` |
| gCaptain | `https://gcaptain.com/feed/` |
| Splash 247 | `https://splash247.com/feed/` |
| TradeWinds | `https://www.tradewindsnews.com/rss` |

## 🛠️ RSS Feed Tools & Resources

### RSS Aggregators
- **RSS.app** - Convert any website to RSS
- **FetchRSS** - Create RSS feeds from websites without feeds
- **RSS Box** - Social media to RSS converter
- **Feed43** - Convert any web page to RSS

### Finding RSS Feeds
1. Add `/rss`, `/feed`, or `/atom` to website URLs
2. View page source and search for "rss" or "atom"
3. Use browser extensions: "RSS Feed Reader" (Chrome), "Feedbro" (Firefox)
4. Check website footer for RSS icon 🔶

### Testing RSS Feeds
- **RSS Feed Validator** - https://validator.w3.org/feed/
- **RSS Feed Reader** - https://rss.app/
- Test in script: Use `fetchNewsText()` function

## 📝 RSS Best Practices

### For Configuration

```javascript
// Basic configuration
const NEWS_SOURCES = [
  { name: "Source Name", url: "https://example.com/feed" },
];

// With error handling
const NEWS_SOURCES = [
  { 
    name: "Source Name", 
    url: "https://example.com/feed",
    enabled: true,  // Can disable without removing
    priority: 1      // Higher priority sources first
  },
];
```

### Feed Quality Tips

1. **Test feeds before adding** - Some feeds are unreliable
2. **Mix languages** - If desired, you can include sources from multiple languages
3. **Diversify sources** - Don't rely on single provider
4. **Check update frequency** - Some feeds update hourly, others daily
5. **Monitor feed health** - Check Apps Script logs for errors

### Common Issues

| Problem | Solution |
|---------|----------|
| Feed returns 404 | Feed URL changed - check source website |
| Feed is empty | Website may have removed RSS support |
| Encoding issues | Add `.replace()` cleanups in `cleanHTML()` |
| Slow fetching | Reduce number of sources or add caching |
| Rate limiting | Add delays between fetches with `Utilities.sleep()` |

## 🔄 Dynamic Feed Discovery

```javascript
// Add to script for automatic feed discovery
function discoverFeed(websiteUrl) {
  try {
    const response = UrlFetchApp.fetch(websiteUrl);
    const html = response.getContentText();
    
    // Look for RSS/Atom links in HTML
    const rssMatch = html.match(/<link[^>]*type=["']application\/rss\+xml["'][^>]*href=["']([^"']+)["']/i);
    const atomMatch = html.match(/<link[^>]*type=["']application\/atom\+xml["'][^>]*href=["']([^"']+)["']/i);
    
    return rssMatch ? rssMatch[1] : (atomMatch ? atomMatch[1] : null);
  } catch (err) {
    return null;
  }
}
```

## 📧 Contributing

Found a great RSS feed? Submit a PR or open an issue with:
- Source name
- RSS URL
- Category
- Language
- Brief description

## ⚠️ Important Notes

- RSS feeds can change or disappear without notice
- Always test feeds before relying on them
- Some websites block automated access
- Respect rate limits and robots.txt
- Consider website terms of service

---

**Last Updated:** January 15, 2026
**Maintained by:** Arieh Copelan
