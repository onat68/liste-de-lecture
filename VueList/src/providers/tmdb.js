import { tmdbToken } from './private/encryptBearerTokens.js'

export const tmdb = {
    query: '',


    subset: 'results',

    urls: [
        { url: `tmdb/search/movie?query=${encodeURI(this.query)}` },
        { creditsGenreUrl: `tmdb/movie/${this.query}?append_to_response=credits` }
    ],

    options: {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${tmdbToken}`
        },
    },

    toObj(movie) {
        let thisMovie = {}

        thisMovie.externalId = movie.id
        thisMovie.title = movie.original_title;
        thisMovie.releaseDate = movie.release_date;
        thisMovie.note = movie.overview;
        thisMovie.genre = ''
        thisMovie.authors = ''
        thisMovie.type = 'Movie'

        if (movie.poster_path != null) {
            thisMovie.img = `https://image.tmdb.org/t/p/w92/${movie["poster_path"]}`
        } else { thisMovie.img = 'none' }

        return (thisMovie)
    },

    toObj1(movie, data) {
        movie.authors = data.credits.crew[0].original_name
        movie.genre = data.genres[0].name
    }
}
