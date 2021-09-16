import { JSDOM } from 'jsdom'
import options from './options'
import { News, NewsContent } from './types'
import fs from 'fs'
import md5 from 'md5'
import { writeObjectToFile } from './utils'

// While every news can be accessed with a link, I didn't find a way to always find link/id to it. Technically it could be brute-forced but it doesn't seem to be most elegant way to do so.

/** Return list of titles, content, image, and date */
async function getElements (dom: Document): Promise<NewsContent> {
  const elements: NewsContent = {}

  for (const selector in options.SELECTORS) {
    // @ts-expect-error
    const selectorElements = dom.querySelectorAll(options.SELECTORS[selector])

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
export default async function getNews (): Promise<News[]> {
  const html = await JSDOM.fromURL(options.HOSTNAME)
  const dom = html.window.document
  const newsList: News[] = []
  const elements = await getElements(dom)

  for (let i = 0; i < options.NEWS_PER_PAGE; i++) {
    const news: {[key: string]: string} = {}
    for (const [key, array] of Object.entries(elements)) {
      news[key] = array[i]
      news.md5 = md5(news.title + news.dateModified)
    }

    // @ts-expect-error
    newsList.push(news)
  }

  writeObjectToFile(options.PATHS.news, newsList)

  return newsList
}
