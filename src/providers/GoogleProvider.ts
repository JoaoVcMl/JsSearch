import { Page, SearchConfig, SearchPageCallback, SearchProvider } from "../SearchTypes"
import { request, searchInPage } from "../utils/SearchUtils"

export default class GoogleProvider implements SearchProvider {
    async searchPage(config: SearchConfig, callback: SearchPageCallback): Promise<void> {
        const start = config.page == undefined ? 0 : config.page * 10
        const url = `https://www.google.com/search?q=${config.query}&start=${start}`
        const html = await request(url)

        callback(getPages(html))
    }
}

function getPages(html: string): Page[] {
    const pattern = /<div class="kvH3mc BToiNc UK95Uc"(.*?)<div class="VwiC3b yXK7lf MUxGbd yDYNvb lyLwlc lEBKkf" style="-webkit-line-clamp:2">.*?<\/div>/g
    const htmlPages = html.match(pattern) || []
    const pages = []

    for (let htmlPage of htmlPages)
        pages.push(getPage(htmlPage))

    return pages
}

function getPage(htmlPage: string): Page {
    const url = searchInPage(/<a href="(.*?)"/g, htmlPage)
    const title = searchInPage(/<h3 class="LC20lb MBeuO DKV0Md">(.*?)<\/h3>/g, htmlPage)
    const description = searchInPage(/<div class="VwiC3b yXK7lf MUxGbd yDYNvb lyLwlc lEBKkf" style="-webkit-line-clamp:2">(.*?)<\/div>/g, htmlPage)

    return { url, title, description }
}