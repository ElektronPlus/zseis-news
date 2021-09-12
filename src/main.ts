import { getArticles } from './scraper'
import fs from 'fs';

const PATHS = {
  news: 'data/news.json',
}

getArticles().then(articles => fs.writeFileSync(PATHS.news, JSON.stringify(articles, null, 2))
