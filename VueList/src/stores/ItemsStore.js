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
                return state["sr" + state.pickedType.name + "s"]
            }
        },

        bmAll: (state) => {
            return state.bmAlbums.concat(state.bmBooks, state.bmMovies)
        },

        bmFiltered(state) {
            if (state.pickedType.name === "All") {
                return this.bmAll
            } else {
                return state["bm" + state.pickedType.name + "s"]
            }
        },
    },

    actions: {
        async find() {
            const res = await fetch(
                `http://90.3.112.97:3000/ext/find/${encodeURI(this.pickedType.name)}/${encodeURI(this.query)}`,
                {
                    method: "GET",
                    headers: { "Accept": "application/json", "Content-Type": "application/json" },
                }
            )
            try {
                const data = await res.json()

                this.srAlbums = await data.albums
                this.srMovies = await data.movies
                this.srBooks = await data.books
            } catch (e) {
                console.info("Data is cached")
            }
        },

        async fetchBookmarks() {
            const res = await fetch("http://90.3.112.97:3000/api/all")
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
            const target = encodeURI(data.type.toLowerCase() + "s")
            const url = encodeURI(`http://90.3.112.97:3000/api/${target}`)
            console.log(url)

            try {
                const res = await fetch(url, {
                    method: "POST",
                    headers: { Accept: "application/json", "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                    referrerPolicy: "no-referrer",
                })

                if ((await res.status) === 201) {
                    const parsed = await res.json()
                    console.info(await parsed)
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
