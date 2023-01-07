"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SearchUtils_1 = require("../utils/SearchUtils");
class GoogleProvider {
    async searchPage(config, callback) {
        const start = config.page == undefined ? 0 : config.page * 10;
        const url = `https://www.google.com/search?q=${config.query}&start=${start}`;
        const html = await (0, SearchUtils_1.request)(url);
        callback(getPages(html));
    }
}
exports.default = GoogleProvider;
function getPages(html) {
    const pattern = /<div class="kvH3mc BToiNc UK95Uc"(.*?)<div class="VwiC3b yXK7lf MUxGbd yDYNvb lyLwlc lEBKkf" style="-webkit-line-clamp:2">.*?<\/div>/g;
    const htmlPages = html.match(pattern) || [];
    const pages = [];
    for (let htmlPage of htmlPages)
        pages.push(getPage(htmlPage));
    return pages;
}
function getPage(htmlPage) {
    const url = (0, SearchUtils_1.searchInPage)(/<a href="(.*?)"/g, htmlPage);
    const title = (0, SearchUtils_1.searchInPage)(/<h3 class="LC20lb MBeuO DKV0Md">(.*?)<\/h3>/g, htmlPage);
    const description = (0, SearchUtils_1.searchInPage)(/<div class="VwiC3b yXK7lf MUxGbd yDYNvb lyLwlc lEBKkf" style="-webkit-line-clamp:2">(.*?)<\/div>/g, htmlPage);
    return { url, title, description };
}
