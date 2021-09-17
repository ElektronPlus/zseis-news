import getNewsList from './scraper'
import sendNewsByWebhook from './discord'
import options from './options'

getNewsList()
  .then(async newsList => await sendNewsByWebhook(newsList, options.user.url))
