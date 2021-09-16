# 🏫 zseis-news
Scrape news from [school site (https://zseis.zgora.pl/)](https://zseis.zgora.pl/) and send them trough Discord!

This doesn't require own hosting as it uses [:octocat: GitHub Actions](https://github.com/konhi/zseis-news/actions).

*Thought...*
## :octocat: Hosting with GitHub Actions
Just fork the repo!

## 💾 Hosting on your server
```
git clone https://github.com/konhi/zseis-news.git
cd zseis-news
npm install
npm build
```

Then schedule executing the script `node dist/main.js --url <DISCORD_WEBHOOK_URL>`), this GitHub implementation does that every `⏰ 5 minutes.`

# 📃 Roadmap

1. [x] Scraper
2. [x] Discord Webhook
3. [ ] Tests
4. [ ] Security
5. [ ] Style, refactoring
6. [ ] Logging, CLI
