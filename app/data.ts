const mockArticle = {
  title: 'mock',
  keyword: 'mock',
  image:
    'https://static1.srcdn.com/wordpress/wp-content/uploads/2023/09/frieren-from-frieren-beyond-journey-s-end.jpg?q=50&fit=contain&w=943&h=&dpr=1.5',
  date: Date.now(),
  text: 'article text goes here',
  source: 'mock data',
  link: 'https://google.com',
  created_at: Date.now(),
  updated_at: Date.now(),
  _id: 0,
}

export type Article = typeof mockArticle

/**
 * Fetches articles or simulates a fetch error.
 * @param {boolean} [willReturnError=false] - If true, simulates an error response.
 * @returns {Object} - On success, returns an object with success flag and articles array.
 *                     On error, returns an object with success flag and error response.
 */
export function getArticles(
  term: string,
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
    const newArticle = {
      ...mockArticle,
      keyword: term.split(' ')[0],
      title: term,
      _id: Math.random(),
    }

    articles.push(newArticle)
  }
  return { success: true, response: articles }
  // return { success: false, response: new Response('no article') }
}
