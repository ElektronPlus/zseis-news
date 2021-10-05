const options = {
  paths: {
    news: 'data/news.json',
    sentNews: 'data/sentNews.json'
  },
  newsPerPage: 4,
  selectors: {
    title: {
      css: '.news_title',
      attribute: 'textContent'
    },
    content: {
      css: '.news_content_text',
      attribute: 'textContent'
    },
    html: {
      css: '.news_content_text',
      attribute: 'innerHTML'
    },
    image: {
      css: '.news_image img',
      attribute: 'src'
    },
    dateModified: {
      css: '.news_modtext',
      attribute: 'textContent'
    }
  },
  defaultURL: 'https://zseis.zgora.pl/',
  defaultImage: 'https://zseis.zgora.pl/gfx/logo_zseis.gif'
}

export default options
