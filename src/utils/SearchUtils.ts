import { gotScraping } from "got-scraping"

async function request(url: string): Promise<string> {
    const response = await gotScraping.get(url)
    return response.body
}

function searchInPage(pattern: RegExp, html: string): string {
    const results = pattern.exec(html)
    let matcher = results != null && results.length > 1 ? results[1] : ""
    matcher = matcher.replace(/<(.*?)>/g, "")

    return decodeURIComponent(encodeURIComponent(matcher))
}

export {
    request,
    searchInPage
}