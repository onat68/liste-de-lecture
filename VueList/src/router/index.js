import { createRouter, createWebHistory } from "vue-router"
import BaseLayout from "../views/BaseLayout.vue"
import CardsView from "../views/CardsView.vue"
import SearchBar from "../components/search/SearchBar.vue"

import { useItemsStore } from "../stores/ItemsStore"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "layout",
            redirect: "/home",
            component: BaseLayout,
            children: [
                {
                    path: "/home",
                    name: "home",
                    components: {
                        cardsview: CardsView,
                        searchbar: SearchBar,
                    },
                    beforeEnter: async () => {
                        const itemsStore = useItemsStore()
                        await itemsStore.endSearch()
                        await itemsStore.fetchBookmarks()
                    },
                },
                {
                    path: "/search/:query",
                    name: "search",
                    components: {
                        cardsview: CardsView,
                        searchbar: SearchBar,
                    },
                    beforeEnter: [
                        async () => {
                            const itemsStore = useItemsStore()
                            await itemsStore.endSearch()
                            await itemsStore.find()
                        },
                    ],
                },
            ],
        },
    ],
})

router.beforeEach

export default router
