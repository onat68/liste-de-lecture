import { defineStore } from 'pinia'
import { dzr } from '../providers/dzr'
import { gb } from '../providers/gb'
import { tmdb } from '../providers/tmdb'

export const useSearchResults = defineStore('useSearchResults', {
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
        defineProviders(type) {
            if (type == 'movie') {
                return tmdb
            } else if (type == 'album') { return dzr } else if (type == 'book') {
                return gb
            } else { return [dzr, gb, tmdb] }
        },

        search(type, query) {
            this.searching = true;
            this.results = [];
            let providers = this.defineProviders(type)

            providers.forEach(async (provider) => {
                let data0 = await this.getData(provider, query, 0)
                this.parseResponse(data0, provider)

                if (provider.steps) {
                    this.results.forEach(async (item) => {
                        let data1 = await this.getData(provider, item.id, 1)
                        this.parseResponse(data1, provider)
                    })
                }
            })
            this.results.concat(this.albums, this.books, this.movies)
        },

        async getData(provider, query, step) {
            let url = provider.setUrl(query, step)
            fetch(url, provider.options)
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
