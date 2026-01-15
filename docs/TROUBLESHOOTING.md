# 🔧 Troubleshooting Guide

Common issues and solutions for Newsprint.

## 📧 Email Issues

### No Email Received

**Check these first:**
1. ✅ Look in spam/junk folder
2. ✅ Verify email address in script is correct
3. ✅ Check Apps Script execution log (View → Executions)
4. ✅ Ensure trigger is properly configured

**Solution steps:**

```javascript
// Test email sending directly
function testEmail() {
  GmailApp.sendEmail(
    RECIPIENT_EMAIL,
    "Test from Newsprint",
    "If you receive this, email is working!"
  );
}
```

**Common causes:**
- Script hasn't been authorized
- Trigger not set up
- Gmail API limits reached (rare)
- Invalid email format

### Kindle Not Receiving

**Amazon Kindle Setup Requirements:**

1. **Find your Kindle email:**
   - Amazon → Manage Your Content and Devices → Devices
   - Look for: `yourname@kindle.com` or `yourname@free.kindle.com`

2. **Approve sender:**
   - Settings → Personal Document Settings
   - Add your Gmail to "Approved Personal Document E-mail List"
   - Must be the EXACT email that sends the script

3. **Check document limits:**
   - Amazon has daily limits (usually 20-50 documents)
   - Personal documents count toward cloud storage

4. **Subject line matters:**
   - Subject must NOT contain: "convert" or similar keywords
   - Keep simple: "Daily Digest" works best

**Test Kindle delivery:**
```javascript
function testKindle() {
  GmailApp.sendEmail(
    KINDLE_EMAIL,
    "Test",
    "This is a test document for Kindle.\n\nIf received, Kindle delivery works!"
  );
}
```

### Email Formatting Issues

**Problem**: Email looks broken or has weird characters

**Solution**:
```javascript
// Enhanced cleanHTML function
function cleanHTML(text) {
  if (!text) return "";
  return text
    .replace(/<[^>]*>/g, "")           // Remove HTML tags
    .replace(/&nbsp;/g, " ")           // Non-breaking spaces
    .replace(/&amp;/g, "&")            // Ampersands
    .replace(/&lt;/g, "<")             // Less than
    .replace(/&gt;/g, ">")             // Greater than
    .replace(/&quot;/g, '"')           // Quotes
    .replace(/&#39;/g, "'")            // Apostrophes
    .replace(/\r\n/g, "\n")            // Line endings
    .replace(/\r/g, "\n")              // Mac line endings
    .replace(/\n{3,}/g, "\n\n")        // Multiple newlines
    .trim();
}
```

## 🤖 OpenAI / ChatGPT Issues

### API Key Not Working

**Symptoms:**
- No summaries in email
- Sees raw news text instead
- Error in execution log

**Check:**
1. API key is correct (starts with `sk-`)
2. Key hasn't expired
3. OpenAI account has credits
4. No spaces or quotes around key

**Test API key:**
```javascript
function testOpenAI() {
  const testPayload = {
    model: "gpt-4",
    messages: [{ role: "user", content: "Say 'API works!'" }],
    max_tokens: 50
  };
  
  const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", {
    method: "post",
    headers: {
      "Authorization": "Bearer " + OPENAI_API_KEY,
      "Content-Type": "application/json"
    },
    payload: JSON.stringify(testPayload)
  });
  
  Logger.log(response.getContentText());
}
```

### Rate Limits

**Error**: `Rate limit exceeded`

**Solutions:**
- OpenAI has usage limits based on your plan
- Free tier: Very limited
- Paid tier: Check your usage dashboard
- Consider switching to cheaper model: `gpt-3.5-turbo` instead of `gpt-4`

```javascript
// Use cheaper model
const payload = {
  model: "gpt-3.5-turbo",  // Instead of gpt-4
  // ... rest of config
};
```

### Cost Management

**Reduce OpenAI costs:**

1. **Limit input length:**
```javascript
function summarizeWithChatGPT(newsText) {
  // Truncate to first 5000 chars
  const truncated = newsText.substring(0, 5000);
  // ... rest of function
}
```

2. **Use cheaper model:**
```javascript
model: "gpt-3.5-turbo"  // Much cheaper than gpt-4
```

3. **Reduce max_tokens:**
```javascript
max_tokens: 500  // Instead of 1000
```

4. **Skip summarization some days:**
```javascript
// Only summarize on weekdays
function dailyReport() {
  const dayOfWeek = new Date().getDay();
  if (dayOfWeek >= 1 && dayOfWeek <= 5) {
    const summary = summarizeWithChatGPT(news);
  } else {
    const summary = news.substring(0, 2000);
  }
  // ... rest
}
```

## 🎯 Topic Alerts Issues

### No Alerts Found

**Symptoms:**
- Email says "No news alerts found"
- Alerts section always empty

**Causes & Solutions:**

1. **Topics are too specific:**
```javascript
// Too specific - might get no results
"\"exact ten word phrase that rarely appears\""

// Better - more likely to match
"key phrase"
```

2. **Search timeframe too short:**
```javascript
// Current: 12 hours
const twelveHoursAgo = new Date();
twelveHoursAgo.setHours(twelveHoursAgo.getHours() - 12);

// Try: 24 hours
const twentyFourHoursAgo = new Date();
twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
```

3. **Rate limiting:**
```javascript
// Increase delay between searches
Utilities.sleep(1200);  // 1.2 seconds instead of 800ms
```

### Too Many Alerts

**Problem**: Overwhelmed with alert results

**Solutions:**

1. **Make topics more specific:**
```javascript
// Too broad
"AI"

// More specific
"\"AI in cloud computing\" OR \"AI in enterprise\""
```

2. **Reduce lookback period:**
```javascript
// Look back only 6 hours
const sixHoursAgo = new Date();
sixHoursAgo.setHours(sixHoursAgo.getHours() - 6);
```

3. **Limit results per topic:**
```javascript
items.slice(0, 3).forEach(item => {  // Only first 3 results
  // ... processing
});
```

### Rate Limiting Errors

**Error**: `429 Too Many Requests` or silent failures

**Solution**: Increase delays
```javascript
ALERT_TOPICS.forEach((topic, index) => {
  // ... search code
  
  // Increase from 800ms to 1500ms
  if (index < ALERT_TOPICS.length - 1) {
    Utilities.sleep(1500);
  }
});
```

## 📊 Market Data Issues

### Stock Prices Missing

**Symptoms:**
- "STOCK:" section empty
- Errors in execution log

**Solutions:**

1. **Check ticker symbols:**
```javascript
// Wrong
const STOCKS = ["Apple", "Google"];

// Correct
const STOCKS = ["AAPL", "GOOGL"];
```

2. **Yahoo Finance may be down:**
```javascript
// Add error handling
function fetchStockData(symbol) {
  try {
    // ... fetch code
  } catch (err) {
    Logger.log(`Stock fetch failed for ${symbol}: ${err}`);
    return null;  // Skip this stock
  }
}
```

3. **API rate limits:**
```javascript
// Add delay between stock fetches
STOCKS.forEach((symbol, index) => {
  const data = fetchStockData(symbol);
  if (index < STOCKS.length - 1) {
    Utilities.sleep(500);
  }
});
```

### Crypto Data Issues

**Problem**: Crypto prices not loading

**Solution**: CoinCap fallback
```javascript
// Current fallback already in script
// Verify crypto IDs are correct:
const cryptoIds = { 
  BTC: "bitcoin",
  ETH: "ethereum", 
  SOL: "solana",
  ADA: "cardano"
};
```

### Forex Not Loading

**Check currency pair format:**
```javascript
// Correct format
const FOREX = ["USD/EUR", "GBP/USD"];

// Not
const FOREX = ["USDEUR", "USD-EUR"];
```

## 🌤️ Weather Issues

### Weather Not Loading

**Symptoms:**
- "Weather unavailable" message
- All locations show errors

**Solutions:**

1. **Check coordinates:**
```javascript
// Verify coordinates are correct
const LOCATIONS = {
  "New York": { lat: 40.7128, lon: -74.0060 },  // Correct format
  // Not: "New York": [40.7128, -74.0060]
};
```

2. **Open-Meteo API down:**
```javascript
// Test API directly
function testWeather() {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.00&daily=temperature_2m_max&forecast_days=1";
  const response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}
```

3. **Timezone issues:**
```javascript
// Add timezone to API call
const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=America/New_York&daily=...`;
```

## 📰 RSS Feed Issues

### Feed Not Loading

**Check feed URL:**
```javascript
// Test individual feed
function testRSSFeed() {
  const url = "https://feeds.reuters.com/reuters/topNews";
  try {
    const response = UrlFetchApp.fetch(url);
    Logger.log("Status: " + response.getResponseCode());
    Logger.log(response.getContentText().substring(0, 500));
  } catch (err) {
    Logger.log("Error: " + err);
  }
}
```

**Common issues:**
- Feed URL changed
- Website blocking automated access
- SSL/Certificate issues
- Feed temporarily down

**Solutions:**
1. Visit feed URL in browser to verify it works
2. Check if website requires User-Agent header
3. Find alternative RSS feed from same source
4. Remove problematic feed from NEWS_SOURCES

### XML Parsing Errors

**Error**: `XMLService parse error`

**Cause**: Malformed XML in feed

**Solution:**
```javascript
function fetchNewsText() {
  NEWS_SOURCES.forEach(source => {
    try {
      const response = UrlFetchApp.fetch(source.url, { 
        muteHttpExceptions: true 
      });
      
      if (response.getResponseCode() !== 200) {
        Logger.log(`Skipping ${source.name}: HTTP ${response.getResponseCode()}`);
        return;  // Skip this source
      }
      
      // Add XML validation
      const content = response.getContentText();
      if (!content.includes('<rss') && !content.includes('<feed')) {
        Logger.log(`Invalid XML from ${source.name}`);
        return;
      }
      
      const xml = XmlService.parse(content);
      // ... continue processing
      
    } catch (err) {
      Logger.log(`Error with ${source.name}: ${err}`);
      // Continue to next source
    }
  });
}
```

## ⏰ Trigger Issues

### Script Not Running Automatically

**Check trigger setup:**
1. Open Apps Script editor
2. Click ⏰ (Triggers) in left sidebar
3. Verify trigger exists and is enabled

**Proper trigger settings:**
- Function: `dailyReport`
- Event source: Time-driven
- Type: Day timer
- Time: Your preferred time (e.g., 6:00 AM - 7:00 AM)

**Create trigger programmatically:**
```javascript
function createDailyTrigger() {
  // Delete existing triggers first
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Create new trigger for 6 AM daily
  ScriptApp.newTrigger('dailyReport')
    .timeBased()
    .atHour(6)
    .everyDays(1)
    .create();
    
  Logger.log("Trigger created!");
}
```

### Trigger Running at Wrong Time

**Issue**: Script runs at unexpected times

**Solution**: Delete and recreate trigger
```javascript
function resetTriggers() {
  // Delete all triggers
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  
  // Create new one
  ScriptApp.newTrigger('dailyReport')
    .timeBased()
    .atHour(7)  // 7 AM
    .everyDays(1)
    .create();
}
```

### Multiple Emails Received

**Cause**: Multiple triggers active

**Solution**:
```javascript
function cleanupTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  Logger.log(`Found ${triggers.length} triggers`);
  
  // Delete all
  triggers.forEach(trigger => {
    Logger.log(`Deleting: ${trigger.getHandlerFunction()}`);
    ScriptApp.deleteTrigger(trigger);
  });
}
```

## 🔐 Authorization Issues

### Script Needs Reauthorization

**Symptoms:**
- "Authorization required" errors
- Script stops working suddenly

**Solution:**
1. Open Apps Script editor
2. Run any function (like `testReport`)
3. Click "Review permissions"
4. Allow requested permissions
5. Run again

**Permissions needed:**
- Send email (Gmail)
- Access external web services
- Run on a time-based trigger

## 📝 Execution Logs

### How to Check Logs

1. Apps Script editor → View → Executions
2. See all past runs, errors, and logs
3. Click any execution to see details

### Understanding Log Messages

```
✅ "Fetching from Source..." - Normal, RSS fetch starting
✅ "Searching for: topic" - Normal, alert search
✅ "Daily report sent!" - Success

⚠️ "Warning: Source returned 404" - Feed URL issue, non-critical
⚠️ "Stock fetch failed" - API issue, continues with other stocks

❌ "Error in daily report" - Critical failure
❌ "Authorization error" - Needs reauth
```

## 🆘 Getting Help

### Before Asking for Help

1. Check execution logs
2. Test individual functions
3. Verify all configuration
4. Read relevant docs section

### Providing Information

When reporting issues, include:
- Error message from execution log
- Which function failed
- Your configuration (remove API keys!)
- What you've already tried

### Debug Mode

```javascript
// Add at top of script
const DEBUG = true;

// Use throughout
if (DEBUG) Logger.log("Debug info: " + variable);
```

## 🔄 Common Fixes

### "Try It Yourself" Checklist

- [ ] Check spam folder
- [ ] Verify trigger is set up
- [ ] Check execution logs
- [ ] Test with `testReport()` function
- [ ] Verify API keys are correct
- [ ] Check that all arrays have correct syntax
- [ ] Remove problematic feeds one by one
- [ ] Increase delays if rate limited
- [ ] Clear and reauthorize permissions

### Nuclear Option: Start Fresh

```javascript
// 1. Save your configuration
// 2. Delete all triggers
function deleteAllTriggers() {
  ScriptApp.getProjectTriggers().forEach(t => 
    ScriptApp.deleteTrigger(t)
  );
}

// 3. Create new project, paste code
// 4. Reauthorize
// 5. Create new trigger
```

---

**Still stuck?** Open an issue on GitHub with:
- Full error message
- Relevant code snippet
- What you've tried
- Expected vs actual behavior
