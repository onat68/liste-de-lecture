/* eslint-disable eqeqeq */
import { defineStore } from "pinia"
import { types } from "../itemTypes"

export const useItemsStore = defineStore("items", {
    state: () => ({
        srAlbums: [],
        srBooks: [],
        srMovies: [],

        bmAlbums: [],
        bmBooks: [],
        bmMovies: [],

        query: "",
        pickedType: types[0],
        pickerOpened: false,
    }),

    getters: {
        unpickedTypes: (state) => {
            return types.filter((obj) => obj != state.pickedType)
        },

        srAll: (state) => {
            return state.srAlbums.concat(state.srBooks, state.srMovies)
        },

        srFiltered(state) {
            if (state.pickedType.name === "All") {
                return this.srAll
            } else {
                return state[state.pickedType.name.toLowerCase() + "s"]
            }
        },

        bmAll: (state) => {
            return state.bmAlbums.concat(state.bmBooks, state.bmMovies)
        },

        bmFiltered(state) {
            if (state.pickedType.name === "All") {
                return this.bmAll
            } else {
                return state[state.pickedType.name.toLowerCase() + "s"]
            }
        },
    },

    actions: {
        async find() {
            const res = await fetch(`ext/find/${this.pickedType.name}/${this.query}`, {
                method: "get",
                headers: { Accept: "application/json", "Content-Type": "application/json" },
            })

            const data = await res.json()

            this.srAlbums = await data.albums
            this.srMovies = await data.movies
            this.srBooks = await data.books
        },

        async fetchBookmarks() {
            const res = await fetch("api/all")
            if ((await res.status) === 200) {
                try {
                    const data = await res.json()
                    this.bmAlbums = await data.results.filter(async (item) => (await item.type) === "albums")
                    this.bmBooks = await data.results.filter(async (item) => (await item.type) === "books")
                    this.bmMovies = await data.results.filter(async (item) => (await item.type) === "movies")
                } catch (e) {
                    console.info("Data is cached")
                }
            } else {
                console.log(`Error: ${res.status}`)
            }
        },

        async saveItem(data) {
            const target = data.type.toLowerCase() + "s"

            try {
                const res = await fetch(`api/${target}`, {
                    method: "post",
                    headers: { Accept: "application/json", "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                })

                if ((await res.status) === 200) {
                    console.info(JSON.parse(await res.responseText))
                } else {
                    throw new Error(`Request Error: ${await res.status}`)
                }
            } catch (e) {
                console.error(e)
            }
        },

        endSearch() {
            this.albums = []
            this.movies = []
            this.books = []
        },

        setQuery(val) {
            this.query = val
        },

        openPicker() {
            this.pickerOpened = true
        },

        closePicker() {
            this.pickerOpened = false
        },

        setType(type) {
            this.pickedType = type
            this.pickerOpened = false
        },
    },
})
