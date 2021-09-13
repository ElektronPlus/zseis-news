// Construction of this scraper assumes that there are only 4 articles per page. While it's naive, bad HTML structure of the website makes it hard to do it in a better way. It should be validated & tested.

import { JSDOM } from 'jsdom'
import { News, NodeListMap } from './types'

// While every news can be accessed with a link, I didn't find a way to always find link/id to it. Technically it could be brute-forced but it doesn't seem to be most elegant way to do so.
const SELECTORS = {
  title: '.news_title',
  content: '.news_content_text',
  image: '.news_image img',
  dateModified: '.news_modtext'
}

const HOSTNAME = 'https://zseis.zgora.pl/'
const NEWS_PER_PAGE = 4

/** Return elements */
async function getElements (dom: Document): Promise<NodeListMap> {
  const elements: NodeListMap = {}

  for (const selector in SELECTORS) {
    // @ts-expect-error
    elements[selector] = dom.querySelectorAll(SELECTORS[selector])
  }

  return elements
}

async function getElementsData(elements: NodeListMap) {
  let data = [{}, {}, {}, {}]

  for (const [key, value] of Object.entries(elements)) {
    for (const [k, v] of Object.entries(value)) {
      const content = (key == 'image') ? v.src : v.textContent
      const pair = {[key]: content}
      Object.assign(data[k], pair)
    }
  }


  return data
}

/** Return 4 latest news containing title, content, image and last modified date. */
export async function getArticles (): Promise<News[]> {
  const html = await JSDOM.fromURL(HOSTNAME)
  const dom = html.window.document
  const newsList: News[] = []

  const elements = await getElements(dom)
  const elementsData = await getElementsData(elements)

  for (const i of Array(NEWS_PER_PAGE).keys()) {
    // const title = elements.title[i].textContent
    // const content = elements.content[i].textContent
    // // @ts-expect-error
    // const image = elements.image[i].src
    // const dateModified = elements.dateModified[i].textContent

    // newsList.push({
    //   title: title,
    //   content: content,
    //   // @ts-expect-error
    //   image: image,
    //   dateModified: dateModified,
    // })
    newsList.push(elementsData[i])
  }

  return newsList
}
