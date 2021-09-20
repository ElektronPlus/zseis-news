import NewsScraper from './scraper'
import sendNewsByWebhook from './discord'
require('dotenv').config()


if (process.env.WEBHOOK_URL) {
  const webhook_url = process.env.WEBHOOK_URL
  const scraper = new NewsScraper()
  scraper.news.then(async news => await sendNewsByWebhook(news, webhook_url))
}