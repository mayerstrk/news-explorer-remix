const regex = new RegExp('^/([^/?]+)')

export function sameFirstSegment(url1: string, url2: string): boolean {
  console.log(regex.exec(url1)?.[1])
  console.log(regex.exec(url2)?.[1])
  return regex.exec(url1)?.[1] === regex.exec(url2)?.[1]
}
