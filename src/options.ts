import { Command } from 'commander'

const program = new Command()
program.option('-u, --url <type>', 'Discord Webhook URL')
program.parse(process.argv)

const options = {
  PATHS: {
    news: 'data/news.json',
    sentToDiscord: 'data/sentToDiscord.json'
  },
  NEWS_PER_PAGE: 4,
  SELECTORS: {
    title: '.news_title',
    content: '.news_content_text',
    image: '.news_image img',
    dateModified: '.news_modtext'
  },
  HOSTNAME: 'https://zseis.zgora.pl/',
  user: program.opts()
}

export default options
