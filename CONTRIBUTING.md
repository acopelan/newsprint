# 🤝 Contributing to Newsprint

Thank you for considering contributing to Newsprint! This guide will help you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Submitting Changes](#submitting-changes)
- [Adding RSS Sources](#adding-rss-sources)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)

## 📜 Code of Conduct

This project follows a Code of Conduct to ensure a welcoming environment for all contributors:

- **Be Respectful**: Treat all contributors with respect
- **Be Collaborative**: Work together constructively
- **Be Patient**: Remember everyone is learning
- **Be Inclusive**: Welcome all backgrounds and experience levels

## 🎯 How Can I Contribute?

### Types of Contributions

1. **RSS Feed Sources** - Add new reliable news feeds
2. **Bug Fixes** - Fix issues in existing code
3. **Documentation** - Improve guides and examples
4. **Features** - Add new functionality
5. **Examples** - Share your configurations
6. **Testing** - Report issues and test fixes

### Good First Issues

Looking for a place to start? Check issues labeled `good-first-issue`:

- Add new RSS sources to docs
- Fix typos in documentation
- Improve error messages
- Add example configurations
- Test on different platforms

## 🛠️ Development Setup

### Prerequisites

- Google Account
- Text editor (VS Code, Sublime, etc.)
- Basic JavaScript knowledge
- Git installed locally

### Local Development

1. **Fork the Repository**
   ```bash
   # On GitHub, click "Fork" button
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/your-username/newsprint.git
   cd newsprint
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

4. **Make Changes**
   - Edit files locally
   - Test in Google Apps Script
   - Document your changes

5. **Test Your Changes**
   ```javascript
   // In Apps Script
   function testMyChanges() {
     // Test your specific changes
   }
   ```

## 📝 Coding Guidelines

### JavaScript Style

```javascript
// Use const/let, not var
const CONSTANT_VALUE = "value";
let variableValue = "value";

// Use descriptive names
function fetchNewsArticles() { }  // ✅ Good
function getStuff() { }           // ❌ Bad

// Comment complex logic
function complexCalculation() {
  // Explain why, not what
  const result = doSomething();  // ✅
  
  // Don't comment obvious things
  const x = 5;  // Set x to 5  // ❌
}

// Use early returns
function processData(data) {
  if (!data) return null;  // ✅
  
  // ... process data
}

// Handle errors gracefully
try {
  riskyOperation();
} catch (err) {
  Logger.log("Operation failed: " + err);
  return fallbackValue();
}
```

### Code Structure

```javascript
/*******************************
 * SECTION HEADERS
 *******************************/

// Use clear section headers
// Group related functions
// Keep functions focused and small
// Document configuration options

/**
 * Fetches news from RSS feed
 * @param {string} url - RSS feed URL
 * @returns {Array} Array of news items
 */
function fetchRSSFeed(url) {
  // Implementation
}
```

### Best Practices

1. **Keep It Simple**: Prefer clear code over clever code
2. **DRY Principle**: Don't Repeat Yourself
3. **Error Handling**: Always handle potential failures
4. **Logging**: Use Logger.log() for debugging
5. **Performance**: Consider API rate limits
6. **Security**: Never commit API keys

## 🔀 Submitting Changes

### Before Submitting

- [ ] Test your changes thoroughly
- [ ] Update documentation if needed
- [ ] Add comments to complex code
- [ ] Check for typos and errors
- [ ] Verify formatting is consistent
- [ ] Remove any API keys or personal data

### Pull Request Process

1. **Update Your Fork**
   ```bash
   git remote add upstream https://github.com/your-username/newsprint.git
   git fetch upstream
   git merge upstream/main
   ```

2. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add feature: brief description"
   ```
   
   **Good commit messages:**
   ```
   ✅ Add support for BBC RSS feed
   ✅ Fix weather API timeout issue
   ✅ Update documentation for topic monitoring
   ✅ Improve error handling in fetchNews()
   ```
   
   **Bad commit messages:**
   ```
   ❌ Update stuff
   ❌ Fix bug
   ❌ WIP
   ```

3. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Fill out the template
   - Link related issues

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] RSS feed addition

## Testing
How did you test this?

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No API keys included
```

## 📡 Adding RSS Sources

### Research Phase

1. **Verify Feed Exists**
   - Visit the website
   - Look for RSS icon or feed link
   - Test the URL in a feed reader

2. **Check Feed Quality**
   - Updates regularly
   - Well-formatted XML
   - Includes descriptions
   - No broken encoding

3. **Test in Script**
   ```javascript
   function testNewFeed() {
     const url = "https://example.com/rss";
     try {
       const response = UrlFetchApp.fetch(url);
       const xml = XmlService.parse(response.getContentText());
       const items = xml.getRootElement()
         .getChild("channel")
         .getChildren("item");
       
       Logger.log(`Found ${items.length} items`);
       Logger.log("Sample: " + items[0].getChild("title").getText());
     } catch (err) {
       Logger.log("Error: " + err);
     }
   }
   ```

### Documentation Format

Add to `docs/RSS_SOURCES.md`:

```markdown
### Category Name

| Source | RSS Feed URL | Focus |
|--------|-------------|-------|
| Source Name | `https://example.com/rss` | News type |
```

Include:
- Source name
- Working RSS URL
- Content focus/category
- Language if not English

## 🐛 Bug Reports

### Before Reporting

1. Check existing issues
2. Verify it's reproducible
3. Test with latest version
4. Check troubleshooting docs

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the problem

**To Reproduce**
1. Step one
2. Step two
3. Step three

**Expected behavior**
What should happen

**Actual behavior**
What actually happens

**Error message**
Copy from execution log

**Configuration**
- Script version: X.X
- Trigger schedule: Daily at 6 AM
- Number of sources: XX
- Number of topics: XX

**Additional context**
Any other relevant info
```

### Where to Report

- GitHub Issues: https://github.com/your-username/newsprint/issues
- Include execution log excerpts
- Remove personal information
- Remove API keys

## 💡 Feature Requests

### Good Feature Requests Include

1. **Use Case**: Why do you need this?
2. **Description**: What should it do?
3. **Examples**: How would it work?
4. **Alternatives**: What have you tried?

### Example Feature Request

```markdown
**Feature: Multi-timezone Weather**

**Use Case**: 
I have family in different countries and want weather for all of them.

**Proposed Solution**:
Add timezone support to weather forecasts:
```javascript
const LOCATIONS = {
  "New York": { 
    lat: 40.7128, 
    lon: -74.0060,
    timezone: "America/New_York"
  }
};
```

**Alternatives Considered**:
Currently just showing UTC time, but that's confusing.

**Additional Context**:
Would work well with location-based news filtering.
```

## 🎨 Contributing Examples

### Share Your Configuration

If you have an interesting use case:

1. Create file in `examples/`
2. Remove personal information
3. Add comments explaining choices
4. Submit PR with description

### Example Categories

- Industry-specific (maritime, finance, tech)
- Location-based (city monitoring)
- Portfolio tracking configurations
- Multi-channel delivery setups

## 🧪 Testing Guidelines

### Manual Testing Checklist

- [ ] Script executes without errors
- [ ] Email/Kindle receives content
- [ ] All sections present (news, weather, alerts, market)
- [ ] Formatting is correct
- [ ] No sensitive data exposed
- [ ] API calls respect rate limits

### Test Functions

```javascript
// Test individual components
function testNewsOnly() { }
function testWeatherOnly() { }
function testAlertsOnly() { }
function testMarketOnly() { }

// Test full execution
function testFullReport() { 
  dailyReport();
  Logger.log("Check your email!");
}
```

## 📚 Documentation Contributions

### Types of Documentation

1. **Guides** - How-to articles
2. **Examples** - Code samples
3. **API Docs** - Function documentation
4. **Troubleshooting** - Common issues
5. **FAQ** - Frequently asked questions

### Documentation Style

- **Clear Headers**: Use descriptive section titles
- **Code Examples**: Show, don't just tell
- **Step-by-Step**: Break down complex tasks
- **Screenshots**: When helpful
- **Links**: Reference related sections

## 🏆 Recognition

Contributors will be:
- Listed in README.md
- Credited in release notes
- Mentioned in documentation

## 📬 Questions?

- Open a Discussion on GitHub
- Check existing documentation
- Ask in Issues (tag with `question`)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Newsprint!** 🎉

Every contribution, no matter how small, makes this project better for everyone.
