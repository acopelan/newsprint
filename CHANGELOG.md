# Changelog

All notable changes to Newsprint will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-01-12

### Added
- **Topic Monitoring System**: Google Alerts replacement with customizable topic tracking
  - Configurable lookback period (default 12 hours)
  - Rate limiting to avoid API restrictions
  - Supports exact phrase matching with quotes
- **Market Data Integration**: Stock, crypto, and forex tracking
  - Yahoo Finance API for stocks and forex
  - CoinCap API fallback for cryptocurrency
  - Multi-period change tracking (1D, 1W, 1M, 1Y)
- **Multi-Location Weather**: Support for multiple cities
  - Open-Meteo API integration
  - 3-day forecasts
  - Weather emoji indicators
- **Comprehensive Documentation**: 
  - RSS feed sources list
  - Topic monitoring ideas guide
  - Troubleshooting guide
  - Advanced configuration guide
- **Example Configurations**: Minimal and full-featured examples

### Changed
- Improved error handling across all functions
- Enhanced HTML cleaning for better text formatting
- Optimized API calls with caching considerations
- Restructured code with clear section headers

### Fixed
- XML parsing errors for malformed feeds
- Rate limiting issues with multiple topic searches
- Weather API timezone handling

## [1.0.0] - 2025-12-XX

### Added
- Initial release
- Basic RSS feed aggregation
- OpenAI ChatGPT summarization
- Email delivery
- Kindle delivery support
- Google Apps Script automation

### Core Features
- RSS news fetching from multiple sources
- AI-powered summarization
- Daily automated triggers
- Clean text formatting
- Error logging

---

## Roadmap

### Planned Features (v2.1.0)
- [ ] Web UI configuration interface
- [ ] Google Sheets integration for analytics
- [ ] Slack/Discord delivery options
- [ ] Advanced filtering and deduplication
- [ ] Portfolio tracking with cost basis
- [ ] Price alerts via SMS

### Under Consideration
- [ ] Docker containerization
- [ ] Multi-language UI
- [ ] Mobile app companion
- [ ] Collaborative features
- [ ] Machine learning relevance scoring
- [ ] Image/chart generation
- [ ] Podcast digest generation

### Community Requests
- Additional market data providers
- More RSS source categories
- Template library
- Browser extension
- Mobile notifications

---

## Version History Summary

- **2.0.0** (2026-01-12): Topic monitoring, market data, comprehensive docs
- **1.0.0** (2025-12-XX): Initial release with core features

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to Newsprint.

## Support

- 🐛 [Report bugs](https://github.com/your-username/newsprint/issues)
- 💡 [Request features](https://github.com/your-username/newsprint/issues)
- 💬 [Join discussions](https://github.com/your-username/newsprint/discussions)
