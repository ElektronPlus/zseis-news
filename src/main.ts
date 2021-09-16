import getNewsList from './scraper'
import fs from 'fs'
import sendNewsByWebhook from './discord'
import { options, PATHS } from './options'

async function main () {
  const newsList = await getNewsList()
  // const file = fs.readFileSync(PATHS.news, 'utf8')

  // const json = JSON.stringify(newsList, null, 2)

  sendNewsByWebhook(newsList, options.url)

  // fs.writeFileSync(PATHS.news, json)
}

main()