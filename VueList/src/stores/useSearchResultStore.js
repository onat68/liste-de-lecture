import { defineStore } from 'pinia'
import { dzr } from '../providers/dzr'
import { gb } from '../providers/gb'
import { tmdb } from '../providers/tmdb'

export const useSearchResults = defineStore('useSearchResults', {
    state: () => ({
        results: [],
        searching: false,
        providers: [dzr, gb, tmdb],
        pickedType: '',
    }),

    getters: {
        getResults: state => { return state.results },
        getAlbums: state => { return state.results.flat().filter(item => item.type == 'Album').items },
        getBooks: state => { return state.results.flat().filter(item => item.type == 'Book').items },
        getMovies: state => { return state.results.flat().filter(item => item.type == 'Movie').items },
        getSearching: state => { return state.searching }
    },

    actions: {
        async search(type, query) {
            this.results = []
            this.searching = true
            this.pickedType = type
            this.providers.forEach(async provider => {

                if (provider.type == type || type == 'All') {
                    this.results.concat(
                        provider.search(query)
                    )
                }
            })
        },
        addResult(item) {
            this.results.push(item)
        },
        stopSearching() {
            setTimeout(this.searching = false)
        }
    }
})
