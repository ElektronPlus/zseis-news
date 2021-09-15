# 🏫 zseis-news
Scrape news from [school site (https://zseis.zgora.pl/)](https://zseis.zgora.pl/) and send them trough Discord!

This doesn't require own hosting as it uses :octocat: [GitHub Actions](https://github.com/konhi/zseis-news/actions), but you can do so with:
```
git clone https://github.com/konhi/zseis-news.git
cd zseis-news
npm install
npm build
```

Then schedule executing the script `node dist/main.js --url <DISCORD_WEBHOOK_URL>`), this GitHub implementation does that every `⏰ 5 minutes.`

# 📃 To do

- [x] Scraper
- [ ] Discord Webhook
- [ ] Tests
- [ ] Security
