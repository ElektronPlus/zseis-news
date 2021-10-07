
<div align="center">
<img src="https://user-images.githubusercontent.com/61631665/133680785-7651f9b2-d674-4d72-992c-4fc3dffe6513.png">
<h2>News scraper and publisher for zseis.zgora.pl</h2>
<a href="https://github.com/konhi/zseis-news/actions/workflows/main.yml">
  <img src="https://github.com/konhi/zseis-news/actions/workflows/main.yml/badge.svg">
</a>
<a href="https://codecov.io/gh/ElektronPlus/zseis-newsl">
  <img src="https://codecov.io/gh/ElektronPlus/zseis-news/branch/main/graph/badge.svg?token=NPTXGNKXY2">
</a>
</div>

---

- scrape news from [🌐 school site (https://zseis.zgora.pl/)](https://zseis.zgora.pl/)
- send them trought [🐱‍💻 Discord Webhooks](https://discord.com/developers/docs/resources/webhook)
- doesn't require hosting as it uses [:octocat: GitHub Actions](https://github.com/konhi/zseis-news/actions)

# 📐 Technical info
- You can't get id of entry in easy way (to my knowledge other than brute-forcing), so script generates a checksum (`md5(title + dateModified)`) to check what news were already sent to Discord
- Script has hard-coded that there are 4 news per page and will throw error if will find more, this is due to not well structured HTML of website. This also leads to news extracter seem to be a bit unintuitive.
- It uses Discord Webhooks and requires function in other bot to crosspost on announcement channel.

# 🔨 Developing
```
git clone https://github.com/konhi/zseis-news.git
cd zseis-news
echo WEBHOOK_URL="<https://discord.com/api/webhooks/xxxxxxxxx/xxxxxxxxxxxxxxxxxxxxxxxxx" > .env
npm install
```

- `npm run start`: builds and runs the script
- `npm run test`: code testing using jest
- `npm run lint`: automatically fix problems and show style errors
- `npm run dev`: TypeScript compiler watch for changes
- `node dist/main.js`: run main program (without compiling)
