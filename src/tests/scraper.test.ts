import scrapeNews from '../scraper'
import fs from 'fs'

const mockURL = 'https://konhi.me/zseis/zseis.html'

const expectedData = {
  mock: fs.readFileSync('src/tests/expected/news.json', 'utf-8')
}

test('Data from mock as expected', async () => {
  const mockedNews = JSON.stringify(await scrapeNews(mockURL))
  expect(mockedNews).toBe(expectedData.mock)
})

test('Has 4 news', async () => {
  const news = await scrapeNews()
  expect(news.length).toBe(4)
})

test('Has only title, content, image and dateModified', async () => {
  // https://www.30secondsofcode.org/articles/s/javascript-array-comparison
  const arrayEquals = (a: string[], b: string[]) => a.length === b.length && a.every((v, i) => v === b[i]);

  const news = await scrapeNews()
  for (const entry of news) {
    expect(arrayEquals(Object.keys(entry), [ 'title', 'content', 'image', 'dateModified' ])).toBeTruthy()
  }
})

test('No empty values', async () => {
  const news = await scrapeNews()
  for (const entry of news) {
    Object.values(entry).forEach(value => expect(value.length).toBeGreaterThan(0))
  }
})