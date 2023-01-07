import { google, SearchConfig } from "../src/index"

const config: SearchConfig = {
    query: "Gato",
    page: 10
}

google.searchPage(config, (results) => console.log(results))