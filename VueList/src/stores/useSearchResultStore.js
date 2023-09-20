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
        getSearching: state => { return state.searching }
    },

    actions: {
        async search(type, query) {
            this.results = []
            this.searching = true
            this.pickedType = type
            this.providers.forEach(provider => {
                if (provider.type == type || type == 'All') {
                    provider.search(query)
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
