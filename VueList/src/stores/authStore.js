import { defineStore } from "pinia"
const headers = { Accept: "application/json", "Content-Type": "application/json" }

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: JSON.parse(localStorage.getItem("user")),
    }),

    getters: {
        token: (state) => {
            if (state.user?.token) {
                return state.user.token
            } else {
                return ""
            }
        },
    },

    actions: {
        async signup(email, pwd) {
            try {
                const res = await fetch(`http://90.3.112.97:3000/auth/signup/`, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({ email: email, password: pwd }),
                })

                if (res.status === 201) {
                    const data = await res.json()
                    localStorage.setItem("user", JSON.stringify(await data))
                    this.user = await data
                } else {
                    throw new Error(`Error: ${await res.json()}`)
                }
            } catch (e) {
                console.error(e)
            }
        },

        async login(email, pwd) {
            try {
                const res = await fetch(`http://90.3.112.97:3000/auth/login/`, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify({ email: email, password: pwd }),
                })

                if (res.status === 200) {
                    const data = await res.json()
                    localStorage.setItem("user", JSON.stringify(await data))
                    this.user = await data
                } else {
                    throw new Error(`Error: ${await res.json()}`)
                }
            } catch (e) {
                console.error(e)
                return e
            }
        },

        async logout() {
            this.user = null
            localStorage.removeItem("user")
        },
    },
})
