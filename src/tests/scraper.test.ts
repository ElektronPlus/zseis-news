import NewsScraper from '../scraper'

const MOCK = 'https://konhi.me/zseis/zseis.html'
const expectedNews = [
  {
    title: 'Konkurs Sudoku',
    content:
      ' \nKonkurs Sudoku dla klas pierwszych technikum odbędzie się 28.09.2021 (wtorek) na czwartej godzinie lekcyjnej (godz. 10:30 - 11:15) w sali 52.\n' +
      'Serdecznie zapraszamy zgłoszone osoby.',
    image: 'https://konhi.me/zseis/img/Konkurs%20Sudoku.jpg',
    dateModified: 'Ostatnio zmodyfikowany: 2021-09-16 08:56:13'
  },
  {
    title: 'Odznaczenia dla naszych nauczycieli',
    content: '14 września 2021, na uroczystej Gali PCK, opiekunki szkolnego koła" Elektronik" - Pani Grażyna Strzelecka i Pani Beata Gądek zostały uhonorowane przez Wojewodę Lubuskiego W. Dajczaka odznaczeniami  II i III stopnia Kapituły Honorowej PCK za prace na rzecz Honorowego  Krwiodawstwa, działalność wolontariacką oraz szerzenie idei Polskiego  Czerwonego Krzyża w naszej szkole.\n' +
      'Kochani, bez Was by się to nie udało!Dziękujemy wszystkim uczniom, którzy włączają się do naszych działań. Zawsze można na Was liczyć.',
    image: 'https://konhi.me/zseis/img/Odznaczenia%20%20PCK.jpg',
    dateModified: 'Ostatnio zmodyfikowany: 2021-09-14 19:41:16'
  },
  {
    title: 'Konkurs ',
    content: '\n' +
      'Zapraszam do udziału w konkursie pn. "Moja szkoła-mój zawód" w ramach projektu "Modernizacja kształcenia zawodowego w mieście Zielona Góra".\n' +
      'Na uczniów, którzy są chętni do przygotowania prezentacji multimedialnej nt. CKZiU nr 2 Elektronik oraz swojego kierunku nauczania czekam w sali nr 39a do 28.09.2021 r.\n' +
      'Doradca zawodowy',
    image: 'https://konhi.me/zseis/gfx/logo_zseis.gif',
    dateModified: 'Ostatnio zmodyfikowany: 2021-09-10 07:18:23'
  },
  {
    title: 'KIERMASZ PODRĘCZNIKÓW',
    content: 'KIERMASZ PODRĘCZNIKÓW odbędzie się w świetlicy od 6-10 września przed lekcjami od godziny 7:00 - 8:00. Do końca tygodnia kiermasz będzie się odbywał również na długiej przerwie: 11:15 - 11:30.\n' +
      'Uczniowie drugich i starszych klas proszeni są o przygotowanie książek do sprzedaży.',
    image: 'https://konhi.me/zseis/gfx/logo_zseis.gif',
    dateModified: 'Ostatnio zmodyfikowany: 2021-09-07 10:02:47'
  }
]

const expectedNewsMD5 = [
  {
    title: 'Konkurs Sudoku',
    content: ' \n' +
      'Konkurs Sudoku dla klas pierwszych technikum odbędzie się 28.09.2021 (wtorek) na czwartej godzinie lekcyjnej (godz. 10:30 - 11:15) w sali 52.\n' +
      'Serdecznie zapraszamy zgłoszone osoby.',
    image: 'https://konhi.me/zseis/img/Konkurs%20Sudoku.jpg',
    dateModified: 'Ostatnio zmodyfikowany: 2021-09-16 08:56:13',
    md5: 'c89540ae488acb1fcba8884cdabd808f'
  },
  {
    title: 'Odznaczenia dla naszych nauczycieli',
    content: '14 września 2021, na uroczystej Gali PCK, opiekunki szkolnego koła" Elektronik" - Pani Grażyna Strzelecka i Pani Beata Gądek zostały uhonorowane przez Wojewodę Lubuskiego W. Dajczaka odznaczeniami  II i III stopnia Kapituły Honorowej PCK za prace na rzecz Honorowego  Krwiodawstwa, działalność wolontariacką oraz szerzenie idei Polskiego  Czerwonego Krzyża w naszej szkole.\n' +
      'Kochani, bez Was by się to nie udało!Dziękujemy wszystkim uczniom, którzy włączają się do naszych działań. Zawsze można na Was liczyć.',
    image: 'https://konhi.me/zseis/img/Odznaczenia%20%20PCK.jpg',
    dateModified: 'Ostatnio zmodyfikowany: 2021-09-14 19:41:16',
    md5: '071ce2f85807afd9a6fee36278a4fc06'
  },
  {
    title: 'Konkurs ',
    content: '\n' +
      'Zapraszam do udziału w konkursie pn. "Moja szkoła-mój zawód" w ramach projektu "Modernizacja kształcenia zawodowego w mieście Zielona Góra".\n' +
      'Na uczniów, którzy są chętni do przygotowania prezentacji multimedialnej nt. CKZiU nr 2 Elektronik oraz swojego kierunku nauczania czekam w sali nr 39a do 28.09.2021 r.\n' +
      'Doradca zawodowy',
    image: 'https://konhi.me/zseis/gfx/logo_zseis.gif',
    dateModified: 'Ostatnio zmodyfikowany: 2021-09-10 07:18:23',
    md5: '804a994f93a864ded7232417051ce3ff'
  },
  {
    title: 'KIERMASZ PODRĘCZNIKÓW',
    content: 'KIERMASZ PODRĘCZNIKÓW odbędzie się w świetlicy od 6-10 września przed lekcjami od godziny 7:00 - 8:00. Do końca tygodnia kiermasz będzie się odbywał również na długiej przerwie: 11:15 - 11:30.\n' +
      'Uczniowie drugich i starszych klas proszeni są o przygotowanie książek do sprzedaży.',
    image: 'https://konhi.me/zseis/gfx/logo_zseis.gif',
    dateModified: 'Ostatnio zmodyfikowany: 2021-09-07 10:02:47',
    md5: 'ab8d95ea7bb52c736d3547363ed5b2ce'
  }
]

test('Scrape news from mocked site', async () => {
  const scraper = new NewsScraper(MOCK)
  const news = await scraper.scrapeNews()
  expect(news).toBe(expectedNews)
})

test('Scrape news from mocked site and add md5', async () => {
  const scraper = new NewsScraper(MOCK)
  const news = await scraper.getNewsWithMD5()
  expect(news).toBe(expectedNewsMD5)
})
