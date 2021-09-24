import { JSDOM } from 'jsdom'
import options from './options'
import { News } from './types'

/**
 * @param {Document} dom like `window.document` in browser, you can get it from `JSDOM`
 * @example JSDOM.fromURL(url)
    .then(html => html.window.document)
    .then(dom => extractNews(dom))
*/
async function extractNews (dom: Document): Promise<News[]> {
  // Assumes that there will be only 4 news per page. While it's naive, bad HTML structure of the website makes it hard to do it in a better way. If there will be more elements, this function will throw an error.
  const news = [{}, {}, {}, {}]

  for (const [selector, value] of Object.entries(options.selectors)) {
    // Assign extracted attribute content to specific news. This may look unintuitive as website's structure isn't really well structured and tree-like (e.g. title is in different container than content)
    dom.querySelectorAll(value).forEach((element, i) => {
      const desiredAttribute = (element.tagName === 'IMG') ? 'src' : 'textContent'
      // @ts-expect-error
      Object.assign(news[i], { [selector]: element[desiredAttribute] })
    })
  }

  return news as News[]
}

/**
 * @param {url = options.defaultURL} scraping source.
 * @returns 4 latest news {News}, example:  `[{
    title: 'Konkurs Sudoku',
    content: ' \n' +
      'Konkurs Sudoku dla klas pierwszych technikum odbędzie się 28.09.2021 (wtorek) na czwartej godzinie lekcyjnej (godz. 10:30 - 11:15) w sali 52.\n' +
      'Serdecznie zapraszamy zgłoszone osoby.',
    image: 'https://zseis.zgora.pl/img/Konkurs%20Sudoku.jpg',
    dateModified: 'Ostatnio zmodyfikowany: 2021-09-16 08:56:13'
  }... (3 news remaining)`
 */
export default async function scrapeNews (url = options.defaultURL): Promise<News[]> {
  return await JSDOM.fromURL(url)
    .then(html => html.window.document)
    .then(async dom => await extractNews(dom))
}
