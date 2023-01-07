import { GoogleProvider } from "./providers"
import { SearchConfig, SearchPageCallback, SearchProvider } from "./SearchTypes"

const google = new GoogleProvider()

export {
    SearchConfig, SearchPageCallback, SearchProvider,
    google
}