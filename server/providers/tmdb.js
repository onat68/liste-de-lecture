const tmdbToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2ViMWFhM2EzNDZkNTg5MWFkZDFjMWQ4MzM2ZGQ2NyIsInN1YiI6IjY0YzkwNDhiODlmNzQ5MDBhZTBiZmI5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WY3acLejoDB0otuZHhtAFelDy8ONHz9zJs_3pr1DHSk'

const tmdb = {
    options: {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${tmdbToken}`
        }
    },
    type: 'Movie',

    movieUrl (query) {
        return `https://api.themoviedb.org/3/search/movie?query=${encodeURI(query)}`
    },

    detailsUrl (movieId) {
        return `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`
    },

    toObj (movie, details) {
        return {
            externalId: movie.id,
            title: movie.original_title,
            releaseDate: movie.release_date,
            note: movie.overview,
            type: 'Movie',
            authors: details?.credits?.crew[0]?.original_name,
            genre: details?.genres[0]?.name,
            img: `https://image.tmdb.org/t/p/w92/${details?.poster_path}`
        }
    }
}

module.exports = tmdb
