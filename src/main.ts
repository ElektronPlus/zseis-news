import NewsScraper from './scraper'
import sendNewsByWebhook from './discord'
import options from './options'

const scraper = new NewsScraper()
scraper.news.then(async news => await sendNewsByWebhook(news, options.user.url))
