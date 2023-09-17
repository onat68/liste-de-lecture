import { defineStore } from 'pinia'
import dzr from '../providers/dzr'
import gb from '../providers/gb'
import tmdb from '../providers/tmdb'

export const useCounterStore = defineStore('useSearchResults', {
    state: () => ({
        results: [],
        books: [],
        movies: [],
        albums: []
    }),

    getters: {
        getResults(state) { return state.results },
        getAlbums(state) { return state.albums },
        getBooks(state) { return state.books },
        getMovies(state) { return state.movies }
    },

    actions: {
        search(providers, query) {
            providers.forEach(async provider => {
                await this.getData(provider, query, 0)
                if (provider == tmdb) {
                    this.movies.forEach(movie => { this.getData(tmdb, movie.id, 1) })
                } else if (provider == dzr) { album => { this.getData(dzr, album.id, 1) } }
            })

        },

        async getData(provider, query, step) {
            provider.query = query
            fetch(provider.urls[step], provider.options)
                .then((res) => res.json())
                .then((data) => { this.parseResponse(data, provider) }
                )
                .catch((err) => console.error("error:" + err))
        },


        parseResponse(step, data, provider) {
            if (provider == tmdb) {
                let subset = data[tmdb.dataSubset]
                if (step == 0) {
                    subset.forEach((movie) => { this.movies.push(tmdb.toObj(movie)) })
                }
                else if (step == 1) { this.movies.forEach((movie) => tmdb.creditsGenreToMovie(movie.id)) }
            } else if (provider == dzr) {
                let subset = data.data
                if (step == 0) {
                    subset.forEach((album) => { this.albums.push(dzr.toObj(album)) })
                } else if (step == 1) { this.albums.forEach((album) => dzr.genreToAlbum(album.id)) }
            } else if (provider == gb) {
                let subset = data.items
                subset.forEach((book) => { this.books.push(gb.toObj(book)) })
            }
        }
    },
})
