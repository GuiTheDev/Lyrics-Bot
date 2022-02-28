"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomUserAgent = exports.searchDuckduckgo = exports.chunkArray = exports.spacingLyrics = exports.saveDumpFile = exports.getTimestamps = exports.request = void 0;
const got_1 = __importDefault(require("got"));
const fs_1 = __importDefault(require("fs"));
const user_agents_1 = __importDefault(require("user-agents"));
const duck_duck_scrape_1 = require("duck-duck-scrape");
function request(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, got_1.default)(url, {
            headers: {
                'User-Agent': exports.randomUserAgent,
            },
        }).then((response) => response.body);
    });
}
exports.request = request;
function getTimestamps() {
    return new Date().getTime();
}
exports.getTimestamps = getTimestamps;
function saveDumpFile(name, raw) {
    void fs_1.default.writeFileSync(`dump/${name}`, raw);
}
exports.saveDumpFile = saveDumpFile;
function spacingLyrics(lyrics) {
    if (lyrics.includes('\n\n'))
        return lyrics;
    const splitLyrics = lyrics.split('\n');
    const chunkLyrics = chunkArray(splitLyrics, 4);
    return chunkLyrics.map((x) => x.join('\n')).join('\n\n');
}
exports.spacingLyrics = spacingLyrics;
function chunkArray(arr, size) {
    const chunk = [];
    let i = 0;
    while (i < arr.length) {
        chunk.push(arr.slice(i, (i += size)));
    }
    return chunk;
}
exports.chunkArray = chunkArray;
function searchDuckduckgo(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, duck_duck_scrape_1.search)(query, {
            locale: 'id-ID',
            region: 'ID',
            safeSearch: duck_duck_scrape_1.SafeSearchType.OFF,
        }).then((res) => { var _a; return (_a = res.results.shift()) === null || _a === void 0 ? void 0 : _a.url; });
    });
}
exports.searchDuckduckgo = searchDuckduckgo;
exports.randomUserAgent = new user_agents_1.default({
    deviceCategory: 'desktop',
})
    .random()
    .toString();
