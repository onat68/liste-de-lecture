/* eslint-disable eqeqeq */
import { defineStore } from "pinia"

export const useDB = defineStore("useDB", {
    state: () => ({
        responseData: {},
    }),

    getters: {
        getData: (state) => {
            return state.responseData
        },
    },

    actions: {
        fetchData() {
            this.responseData = {}

            const xhr = new XMLHttpRequest()

            xhr.open("GET", "api/all")
            xhr.send()
            xhr.responseType = "json"

            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    this.responseData = xhr.response.results
                } else {
                    console.log(`Error: ${xhr.status}`)
                }
            }
        },

        sendData(data) {
            const xhr = new XMLHttpRequest()

            const target = data.type.toLowerCase() + "s"

            xhr.open("POST", `api/${target}`)
            xhr.setRequestHeader("Content-Type", "application/json")

            const body = JSON.stringify(data)

            xhr.onload = () => {
                if (xhr.readyState == 4 && xhr.status == 201) {
                    console.log(JSON.parse(xhr.responseText))
                } else {
                    console.log(`Error: ${xhr.status}`)
                }
            }

            xhr.send(body)
        },
    },
})
