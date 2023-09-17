import { tmdbToken } from './private/encryptBearerTokens.js'

export const tmdb = {
    query: '',
    url: `tmdb/search/movie?query=${encodeURI(
        this.query
    )}`,
    creditsGenreUrl: `tmdb/movie/${this.query}?append_to_response=credits`,
    options: {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${tmdbToken}`
        },
    },
}
