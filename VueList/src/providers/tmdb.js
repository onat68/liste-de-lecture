import { tmdbToken } from '../private/encryptBearerTokens.js'

export const tmdb = {
    options: {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${tmdbToken}`
        },
    },

    search(query) {
        let arr = []

        fetch(`tmdb/search/movie?query=${encodeURI(query)}`, this.options)
            .then((res) => res.json())
            .then((data) => {
                arr = data.results.map(element => {
                    this.toObj(element)

                    fetch(`tmdb/movie/${element.id}?append_to_response=credits`, this.options)
                        .then((res) => res.json())
                        .then((data) => {
                            element.authors = data.credits.crew[0].original_name
                            element.genre = data.genres[0].name
                        })
                        .catch((err) => console.error("error:" + err))
                });
                return arr
            })
            .catch((err) => console.error("error:" + err))
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
}
