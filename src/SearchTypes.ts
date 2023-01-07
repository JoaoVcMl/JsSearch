type SearchConfig = {
    query: string,
    page?: number,
}

type Page = {
    url: string,
    title: string,
    description: string
}

type SearchPageCallback = (results: Page[]) => void

interface SearchProvider {
    searchPage(config: SearchConfig, callback: SearchPageCallback): Promise<void>
}

export {
    SearchConfig,
    SearchPageCallback,
    SearchProvider,
    Page
}