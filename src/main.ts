import { getArticles } from './scraper'
import fs from 'fs'
import { sendWebhookMessage } from './discord'

const PATHS = {
  news: 'data/news.json'
}

async function main () {
  const articles = await getArticles()
  const json = JSON.stringify(articles, null, 2)
  const file = fs.readFileSync(PATHS.news, 'utf8')

  if (json !== file) {
    fs.writeFileSync(PATHS.news, json)
  }
}

main()
