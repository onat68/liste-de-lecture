import { defineStore } from 'pinia'
import { dzr } from '../providers/dzr'
import { gb } from '../providers/gb'
import { tmdb } from '../providers/tmdb'

export const useSearchResults = defineStore('useSearchResults', {
    state: () => ({
        results: [],
        searching: false,
        providers: [dzr, gb, tmdb]
    }),

    getters: {
        getResults: state => { return state.results },
        getAlbums: state => { return state.albums },
        getBooks: state => { return state.books },
        getMovies: state => { return state.movies },
        getSearching: state => { return state.searching }
    },

    actions: {
        async search(type, query) {
            this.results = []
            this.searching = true
            if (type == 'movie') {
                this.results = await tmdb.search(query)
            } else if (type == 'album') { this.results = await dzr.search(query) } else if (type == 'book') { this.results = await gb.search(query) } else {
                this.providers.forEach(async provider => {
                    let response = await provider.search(query)
                    this.results.push(response)
                    this.results = this.results.flat(1)
                })
            }
            
        },
        stopSearching() {
            setTimeout(this.searching = false, 500)
        }
    }
})
