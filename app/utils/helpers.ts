const regex = new RegExp('^/([^/?]+)')

export function sameFirstSegment(url1: string, url2: string): boolean {
  return regex.exec(url1)?.[1] === regex.exec(url2)?.[1]
}
