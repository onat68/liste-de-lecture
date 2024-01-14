import { defineStore } from 'pinia'
import { dzr } from '../providers/dzr'
import { gb } from '../providers/gb'
import { tmdb } from '../providers/tmdb'

export const useSearchResults = defineStore('useSearchResults', {
    state: () => ({
        results: [],
        searching: false,
        providers: [dzr, gb, tmdb],
        query: '',
        pickedType: '',
    }),

    getters: {
        getResults: state => {
            return state.results
        },
        getSearching: state => { return state.searching }
    },

    actions: {
        async search(type) {
            this.results = []
            this.pickedType = type
            this.providers.forEach(async provider => {
                if (provider.type == type || type == 'All') {
                    const res = await fetch(`api/${type}/${this.query}`)
                    if(res.ok()) {
                        const data = res.json()
                        this.results.push(data)
                    }
                }
            })
            this.router.replace({ name: 'search' })
        },
        addResult(item) {
            this.results.push(item)
        },
        stopSearching() {
            setTimeout(() => this.router.replace('/timeline'))
        }
    }
})
