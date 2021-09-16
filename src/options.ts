import { Command } from 'commander'

export const PATHS = {
  news: 'data/news.json',
  sentToDiscord: 'data/sentToDiscord.json'
}

export const NEWS_PER_PAGE = 4

export const SELECTORS = {
  title: '.news_title',
  content: '.news_content_text',
  image: '.news_image img',
  dateModified: '.news_modtext'
}

export const HOSTNAME = 'https://zseis.zgora.pl/'

const program = new Command()

program.requiredOption('-u, --url <type>', 'Discord Webhook URL')
program.parse(process.argv)

export const options = program.opts()