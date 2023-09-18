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
        getResults(state) { return state.results },
        getAlbums(state) { return state.albums },
        getBooks(state) { return state.books },
        getMovies(state) { return state.movies },
        getSearching(state) { return state.searching }
    },

    actions: {
        search(type, query) {
            this.searching = true
            if (type == 'movie') {
                this.results = tmdb.search(query)
            } else if (type == 'album') { this.results = dzr.search(query) } else if (type == 'book') { this.results = gb.search(query) } else { this.providers.forEach(provider => this.results.concat(provider.search(query))) }
        },
        stopSearching() {
            setTimeout(this.searching = false, 500)
        }
    }
})
