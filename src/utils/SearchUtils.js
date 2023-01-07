"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchInPage = exports.request = void 0;
const got_scraping_1 = require("got-scraping");
async function request(url) {
    const response = await got_scraping_1.gotScraping.get(url);
    return response.body;
}
exports.request = request;
function searchInPage(pattern, html) {
    const results = pattern.exec(html);
    let matcher = results != null && results.length > 1 ? results[1] : "";
    matcher = matcher.replace(/<(.*?)>/g, "");
    return decodeURIComponent(encodeURIComponent(matcher));
}
exports.searchInPage = searchInPage;
