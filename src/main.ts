import { getArticles } from './scraper'

getArticles().then((articles => console.log(articles)))
