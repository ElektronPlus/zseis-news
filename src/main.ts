import getNewsList from './scraper'
import sendNewsByWebhook from './discord'
import options from './options'

getNewsList()
  .then(newsList => sendNewsByWebhook(newsList, options.user.url))