import scrapeNews from './scraper'
import formatNews from './formatter'
import sendNewsByWebhook from './discord'
import dotenv from 'dotenv'

dotenv.config()

if (process.env.WEBHOOK_URL) {
  const webhookURL = process.env.WEBHOOK_URL

  scrapeNews()
    .then(news => formatNews(news))
    .then(formattedNews => sendNewsByWebhook(formattedNews, webhookURL))
} else {
  throw('Environment variable WEBHOOK_URL not found. Please create .env file.')
}