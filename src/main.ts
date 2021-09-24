import scrapeNews from './scraper'
import sendNewsByWebhook from './discord'
import dotenv from 'dotenv'

dotenv.config()
if (process.env.WEBHOOK_URL) {
  const webhookURL = process.env.WEBHOOK_URL

  scrapeNews()
    .then(async news => await sendNewsByWebhook(news, webhookURL))
}
