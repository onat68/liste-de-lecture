import { tmdbToken } from '../private/encryptBearerTokens.js'

export const tmdb = {
    options: {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${tmdbToken}`
        },
    },
    type: 'Movie',

    async search(query) {
        let arr = []

        await fetch(`tmdb/search/movie?query=${encodeURI(query)}`, this.options)
            .then((res) => res.json())
            .then((data) => {
                data.results.forEach(element => {
                    let item = this.toObj(element)
                    fetch(`tmdb/movie/${element.id}?append_to_response=credits`, this.options)
                        .then((res) => res.json())
                        .then((data1) => {
                            item.authors = data1?.credits?.crew[0]?.original_name
                            item.genre = data1?.genres[0]?.name
                        })
                        .catch((err) => console.error("error:" + err))
                    arr.push(item)
                });

            })
            .catch((err) => console.error("error:" + err))
        return arr
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
