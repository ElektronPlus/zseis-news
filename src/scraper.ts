import { JSDOM } from 'jsdom'
import options from './options'
import md5 from 'md5'
import { getDesiredElementContent } from './utils'
import { News } from './types'

/**
 * News scraper for `zseis.zgora.pl`
 * @param {string} hostname - Custom hostname, useful for tests. You can use public mock at `https://konhi.me/zseis/zseis.html`
 */
export default class NewsScraper {
  hostname: string
  news: Promise<News[]>

  constructor (hostname: string = options.HOSTNAME) {
    this.hostname = hostname
    this.news = this.getNewsWithMD5()
  }

  /**
   * Construction of this scraper assumes that there are only 4 articles per page. While it's naive, bad HTML structure of the website makes it hard to do it in a better way. It should be validated & tested.
   * @return Array of 4 json objects including `[title, content, image, dateModified]`
   * @example
   * [
      {
        title: 'Pożegnanie Śp Heleny Szajkowskiej',
        content: 'Z ogromnym smutkiem przyjęliśmy informację o śmierci naszej wieloletniej nauczycielki, Pani Heleny Szajkowskiej. W naszej pamięci pozostanie jej uśmiech i ciepło jakie dawała każdemu z nas.\n' +
          'Uroczystości pogrzebowe odbędą się w najbliższy wtorek o 12.40 na starym cmentarzu przy ulicy Wrocławskiej w Zielonej Górze.\n' +
          ' ',
        image: 'https://zseis.zgora.pl/gfx/logo_zseis.gif',
        dateModified: 'Ostatnio zmodyfikowany: 2021-09-17 18:20:11'
      }... (3 news remaining),
   */
  async scrapeNews (): Promise<News[]> {
    const dom = await this.dom
    const news = [] as News[]

    for (let i = 0; i < options.NEWS_PER_PAGE; i++) {
      news[i] = {} as News
      for (const [selectorName, selectorValue] of Object.entries(options.SELECTORS)) {
        const element = dom.querySelectorAll(selectorValue)[i]
        const content = await getDesiredElementContent(element)
        Object.assign(news[i], { [selectorName]: content })
      }
    }

    return news
  }

  /** Every news has ID, but I didn't find a way to get it. This function makes pseudo identificator to compensate it. It uses article title and dateModified.
   * @return news like in scrapeNews() but with calculated md5
   * @example
   * [
      {
        title: 'Pożegnanie Śp Heleny Szajkowskiej',
        content: 'Z ogromnym smutkiem przyjęliśmy informację o śmierci naszej wieloletniej nauczycielki, Pani Heleny Szajkowskiej. W naszej pamięci pozostanie jej uśmiech i ciepło jakie dawała każdemu z nas.\n' +
          'Uroczystości pogrzebowe odbędą się w najbliższy wtorek o 12.40 na starym cmentarzu przy ulicy Wrocławskiej w Zielonej Górze.\n' +
          ' ',
        image: 'https://zseis.zgora.pl/gfx/logo_zseis.gif',
        dateModified: 'Ostatnio zmodyfikowany: 2021-09-17 18:20:11',
        md5: '36854c4fca2b047e8a47d384f7249625'
      },
   */
  async getNewsWithMD5 (): Promise<News[]> {
    const news = await this.scrapeNews()

    for (const [i, article] of news.entries()) {
      news[i].md5 = md5(article.title + article.dateModified)
    }

    return news
  }

  /** @return {Promise<Document>} browser-like window.document */
  get dom (): Promise<Document> {
    return JSDOM.fromURL(this.hostname).then(html => html.window.document)
  }
}
