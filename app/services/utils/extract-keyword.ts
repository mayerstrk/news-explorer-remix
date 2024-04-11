import nlp from 'compromise'

export function extractKeywords(title: string | null) {
  if (!title) return null

  const doc = nlp(title)

  const nouns = doc.nouns().out('array')

  return nouns.length > 0 ? nouns[0].split(' ')[0] : null
}
