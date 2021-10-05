import { NodeHtmlMarkdown} from 'node-html-markdown'
import { News } from './types'

export default async function formatNews(news: News[]): Promise<News[]> {
  // Discord embeds don't support inline img, so they're disabled
  const nhm = new NodeHtmlMarkdown({
    ignore: ['img']
  })

  news.forEach(entry => entry.md = nhm.translate(entry.html))
  
  return news
}