const mockArticle = {
  title: 'mock',
  keyword: 'mock',
  image: 'https://source.unsplash.com/bundle-of-newspaper-on-table-Mwuod2cm8g4',
  date: Date.now(),
  text: 'article text goes here',
  source: 'mock data',
  link: 'https://google.com',
  created_at: Date.now(),
  updated_at: Date.now(),
  _id: Math.random().toString(36).substring(2),
}

export type article = typeof mockArticle

/**
 * Fetches articles or simulates a fetch error.
 * @param {boolean} [willReturnError=false] - If true, simulates an error response.
 * @returns {Object} - On success, returns an object with success flag and articles array.
 *                     On error, returns an object with success flag and error response.
 */
export function getArticles(
  amount: number = 5,
  willReturnError = false,
):
  | { success: true; response: (typeof mockArticle)[] }
  | { success: false; response: Response } {
  if (willReturnError) {
    return {
      success: false,
      response: new Response('failed to fetch articles', { status: 500 }),
    }
  }
  const articles = []
  for (let i = 0; i < amount; i++) {
    articles.push(mockArticle)
  }
  return { success: true, response: articles }
  // return { success: false, response: new Response('no article') }
}
