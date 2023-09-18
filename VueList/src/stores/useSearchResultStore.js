import { defineStore } from 'pinia'
import dzr from '../providers/dzr'
import gb from '../providers/gb'
import tmdb from '../providers/tmdb'

export const useCounterStore = defineStore('useSearchResults', {
    state: () => ({
        results: [],
        books: [],
        movies: [],
        albums: [],
        searching: false
    }),

    getters: {
        getResults(state) { return state.results },
        getAlbums(state) { return state.albums },
        getBooks(state) { return state.books },
        getMovies(state) { return state.movies },
        getSearching(state) { return state.searching }
    },

    actions: {
        search(providers, query) {
            this.searching = true;
            this.results = [],
                providers.forEach(async (provider) => {
                    let data0 = await this.getData(provider, query, 0)
                    this.parseResponse(data0, provider)

                    if (provider.steps) {
                        this.results.forEach(async (movie) => {
                            let data1 = await this.getData(provider, movie.id, 1)
                            this.parseResponse(data1, provider)
                        })
                    }
                })
            this.results.concat(this.albums, this.books, this.movies)
        },

        async getData(provider, query, step) {
            provider.query = query
            fetch(provider.urls[step], provider.options)
                .then((res) => res.json())
                .then((data) => { return data }
                )
                .catch((err) => console.error("error:" + err))
        },


        parseResponse(step, data, provider) {
            if (step == 0) { data[provider.subset].forEach((item) => { return provider.toObj(item) }) }
            else if (step == 1) { return provider.toObj1(data.id) }
        },

        stopSearching() {
            setTimeout(this.searching = false, 500)
        }
    }
})
