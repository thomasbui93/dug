const cheerio = require('cheerio')
const fetch = require('node-fetch')
const { setCache, getCache } = require('../cache')
const format = require('./format')

const scrapLink = (html) => {
  const regexSearch = RegExp(/href="(.*?)"/g)
  const matches = regexSearch.exec(html)
  return matches.length === 2 ? `${process.env.BASE_POEM_URL}/${matches[1]}` : false
}

const getPageElement = async (url, ...rest) => {
  const request = await fetch(url)
  const pageContent = await request.text()
  const $ = cheerio.load(pageContent) 
  return rest.length === 1 ? $(rest[0]) : rest.map(selector => $(selector))
}

const getMainPage = async (searchTerm) => {
  try {
    const cached = getCache(searchTerm)
    if (cached) return cached

    const searchUrl = `https://www.thivien.net/qsearch.xml.php?Core=author&Field=Name&Value=${encodeURI(searchTerm)}&Page=0`
    const request = await fetch(searchUrl)
    const body = await request.text()
    const result = scrapLink(body)

    const link = setCache(searchTerm, result, 1000 * 60 * 60)
    return link
  } catch (err) {
    return false
  }
}

const getAllPoemLinks = async (mainPage) => {
  if (!mainPage) throw Error('Missing URL for fetching all poem')
  const cached = getCache(mainPage)
  if (cached) return cached

  const linkDOMs = await getPageElement(mainPage, '.poem-group-list li a')
  const links = linkDOMs.map((index, link) => link.attribs.href)
  return setCache(mainPage, links, 1000 * 60 * 60)
}

const getRandomPoem = (poems) => {
  const randomLink = Math.floor((Math.random() * poems.length))
  return `${process.env.BASE_POEM_URL}/${poems[randomLink]}`
}

const getPoemContent = async (poemUrl) => {
  try {
    if (!poemUrl) throw Error('Missing the url for fetching a poem')
    const cached = getCache(poemUrl)
    if (cached) return cached
    const poem = await getPageElement(poemUrl, '.poem-view-separated')
    return setCache(poemUrl, poem.html(), 1000 * 60 * 60)
  } catch (err) {
    return false
  }
}

module.exports = async (searchKey) => {
  try {
    const searchTerm = searchKey ? searchKey : process.env.AUTHOR
    const mainPage = await getMainPage(searchTerm)
    const poems = await getAllPoemLinks(mainPage)
    const randomLink = getRandomPoem(poems)
    const poem = await getPoemContent(randomLink)

    return {
      poem: format(poem),
      link: randomLink
    }
  } catch (err) {
    return false
  }
}
