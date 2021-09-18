import NewsScraper from './scraper'
import sendNewsByWebhook from './discord'
import options from './options'

const scraper = new NewsScraper()
scraper.news.then(news => sendNewsByWebhook(news, options.user.url))