import { JSDOM } from 'jsdom'
import { News, NewsContent } from './types'

// While every news can be accessed with a link, I didn't find a way to always find link/id to it. Technically it could be brute-forced but it doesn't seem to be most elegant way to do so.
const SELECTORS = {
  title: '.news_title',
  content: '.news_content_text',
  image: '.news_image img',
  dateModified: '.news_modtext'
}

const HOSTNAME = 'https://zseis.zgora.pl/'
const NEWS_PER_PAGE = 4

/** Return list of titles, content, image, and date */
async function getElements (dom: Document): Promise<NewsContent> {
  const elements: NewsContent = {}

  for (const selector in SELECTORS) {
    const selectorElements = dom.querySelectorAll(SELECTORS[selector])

    const list: string[] = []
    for (const element of selectorElements) {
      const content = (selector === 'image') ? element.src : element.textContent
      list.push(content)
    }

    elements[selector] = list
  }

  return elements
}

/** Return latest news containing title, content, image and last modified date. Construction of this scraper assumes that there are only 4 articles per page. While it's naive, bad HTML structure of the website makes it hard to do it in a better way. It should be validated & tested. */
export async function getArticles (): Promise<News[]> {
  const html = await JSDOM.fromURL(HOSTNAME)
  const dom = html.window.document
  const newsList: News[] = []

  const elements = await getElements(dom)

  for (let i = 0; i < NEWS_PER_PAGE; i++) {
    const news: {[key: string} = {}
    for (const [key, array] of Object.entries(elements)) {
      news[key] = array[i]
    }

    newsList.push(news)
  }

  return newsList
}
