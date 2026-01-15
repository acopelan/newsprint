# 🚀 Quick Start Installation

Get Newsprint running in under 5 minutes!

## ⚡ TL;DR

1. Copy code to Google Apps Script
2. Update configuration (API key, email)
3. Set up daily trigger
4. Done! ✅

## 📝 Step-by-Step Installation

### Step 1: Open Google Apps Script (30 seconds)

1. Go to [script.google.com](https://script.google.com)
2. Click **New Project**
3. Name your project: "Newsprint" or "Daily News Digest"

### Step 2: Copy the Code (1 minute)

1. Open `newsprint.gs` from this repository
2. **Select all** (Ctrl+A / Cmd+A)
3. **Copy** (Ctrl+C / Cmd+C)
4. **Paste** into the Apps Script editor (Ctrl/Cmd+V)
5. Click **Save** 💾

### Step 3: Configure Your Settings (2 minutes)

Find this section at the top of the code:

```javascript
/*******************************
 * CONFIGURATION
 *******************************/

// API Keys
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE";  // ← Replace this

// Email Settings
const RECIPIENT_EMAIL = "your@email.com";           // ← Replace this
```

#### Get Your OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up / Log in
3. Navigate to **API Keys**
4. Click **Create new secret key**
5. Copy the key (starts with `sk-`)
6. Paste it in your script

**Note**: OpenAI has free tier limits. Consider:
- Free tier: ~$5 credit (enough for testing)
- Paid tier: Very affordable (~$0.01-0.05 per day)
- Alternative: Remove summarization (script will work without it)

#### Update Your Email

Replace `"your@email.com"` with your actual email address.

### Step 4: Customize Your Sources (Optional, 1 minute)

Scroll to find these sections and customize:

```javascript
// Add/remove news sources
const NEWS_SOURCES = [
  { name: "Reuters", url: "https://feeds.reuters.com/reuters/topNews" },
  // Add your preferred sources
];

// Add/remove monitoring topics
const ALERT_TOPICS = [
  "Your Company Name",
  "\"Your Name\"",        // Use quotes for exact match
  "your-city",
  // Add topics you care about
];

// Add/remove locations
const LOCATIONS = {
  "New York": { lat: 40.7128, lon: -74.0060 },
  "London": { lat: 51.5074, lon: -0.1278 }
};
```

**Pro Tip**: Start minimal, add more later!

### Step 5: Test It! (30 seconds)

1. In the Apps Script editor, select `testReport` from the function dropdown
2. Click **Run** ▶️
3. **First time only**: Click "Review Permissions"
   - Click "Advanced"
   - Click "Go to Newsprint (unsafe)" - this is YOUR script, it's safe
   - Click "Allow"
4. Check your email! 📧

### Step 6: Set Up Daily Trigger (1 minute)

1. In Apps Script, click the **Clock icon** ⏰ (Triggers) in the left sidebar
2. Click **Add Trigger** (bottom right)
3. Configure:
   - **Function**: `dailyReport`
   - **Event source**: `Time-driven`
   - **Type**: `Day timer`
   - **Time**: Select your preferred time (e.g., `6am-7am`)
4. Click **Save**

### Step 7: You're Done! 🎉

Your first digest will arrive at the scheduled time tomorrow!

---

## 🎯 What Happens Next?

### Your First Email

Tomorrow morning (or whenever you set the trigger), you'll receive:

- 📰 **News Summary**: AI-summarized top stories
- 📈 **Market Update**: Stock/crypto/forex prices
- 🌤️ **Weather Forecast**: 3-day outlook for your locations
- 🎯 **Topic Alerts**: News mentioning your monitored topics

### Fine-Tuning

After receiving your first digest:

1. **Too many/few sources?** → Adjust `NEWS_SOURCES`
2. **Different topics?** → Update `ALERT_TOPICS`
3. **Wrong locations?** → Modify `LOCATIONS`
4. **Delivery time wrong?** → Update trigger
5. **Want it on Kindle?** → See [Kindle Setup](#kindle-setup)

---

## 📱 Kindle Setup (Optional)

To receive on your Kindle e-reader:

### 1. Find Your Kindle Email

1. Go to [Amazon.com](https://amazon.com)
2. Navigate to: **Accounts & Lists → Content & Devices → Devices**
3. Select your Kindle
4. Look for the email (e.g., `yourname@kindle.com`)

### 2. Approve Your Gmail

1. In Amazon: **Settings → Personal Document Settings**
2. Under "Approved Personal Document E-mail List"
3. Click **Add a new approved e-mail address**
4. Enter your Gmail address (the one sending the script)
5. Click **Add Address**

### 3. Update Script

```javascript
const KINDLE_EMAIL = "yourname@kindle.com";  // Your Kindle email
const USE_KINDLE = true;                      // Enable Kindle delivery
```

### 4. Done!

Your daily digest will now appear on your Kindle!

---

## 🔧 Troubleshooting

### Problem: No Email Received

**Check:**
1. ✅ Spam/junk folder
2. ✅ Script execution log (View → Executions in Apps Script)
3. ✅ Email address is correct
4. ✅ Trigger is set up

**Solution:**
```javascript
// Run this to test email:
function testEmail() {
  GmailApp.sendEmail(
    RECIPIENT_EMAIL,
    "Test from Newsprint",
    "If you receive this, email works!"
  );
}
```

### Problem: Script Authorization Failed

**Solution:**
1. Open Apps Script
2. Run any function
3. Click "Review Permissions"
4. Follow authorization flow
5. Try again

### Problem: API Errors

**Common causes:**
- OpenAI API key incorrect
- OpenAI account has no credits
- Feed URL changed/broken

**Check logs:**
1. Apps Script → View → Executions
2. Click recent execution
3. Look for error messages

### Problem: Rate Limiting

If you see "Too many requests" errors:

```javascript
// Increase delays
Utilities.sleep(1200);  // Instead of 800
```

### More Help

- See full [Troubleshooting Guide](docs/TROUBLESHOOTING.md)
- Check [FAQ section](#faq)
- [Open an issue](https://github.com/your-username/newsprint/issues)

---

## ❓ FAQ

### Do I need programming experience?

No! Just copy-paste and update the configuration. The script is ready to run.

### How much does it cost?

- **Google Apps Script**: Free
- **OpenAI API**: ~$0.01-0.05 per day (or free tier)
- **Everything else**: Free (RSS feeds, weather API, etc.)

**Total**: Practically free or a few dollars per month

### Can I customize the format?

Yes! The email format is defined in `buildEmailBody()`. Edit as desired.

### Can I run it multiple times per day?

Yes! Create multiple triggers for `dailyReport()` at different times.

### What if I don't want AI summaries?

Remove or comment out OpenAI API key. Script will work without summarization.

### Is my data private?

- Runs in YOUR Google account
- Only you have access
- News sources are public
- OpenAI sees only public news (for summarization)

### Can I stop it anytime?

Yes! Just delete the trigger in Apps Script (⏰ Triggers → Delete).

### What languages are supported?

- Full support: English
- Partial support: Any language with RSS feeds
- UI: English (code comments)

---

## 🎓 Next Steps

Now that you're set up:

1. **Read the Docs**: Check out [docs/](docs/) for advanced features
2. **Customize**: Make it yours with personal topics and sources
3. **Share**: Star the repo if you find it useful!
4. **Contribute**: Found a good RSS source? Submit a PR!

---

## 📚 Quick Links

- 📖 [Full Documentation](README.md)
- 📡 [RSS Sources List](docs/RSS_SOURCES.md)
- 🎯 [Topic Ideas](docs/TOPIC_IDEAS.md)
- 🔧 [Troubleshooting](docs/TROUBLESHOOTING.md)
- 🚀 [Advanced Guide](docs/ADVANCED.md)
- 🤝 [Contributing](CONTRIBUTING.md)

---

**Questions?** Open an issue or discussion on GitHub!

**Enjoying Newsprint?** ⭐ Star the repo and share with friends!
