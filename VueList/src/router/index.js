import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchResultInnerScreen from '../views/SearchResultInnerScreen.vue'
import TimeLineInnerScreen from '../views/TimeLineInnerScreen.vue'
import CancelButton from '../components/search/buttons/CancelButton.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/timeline',
      component: HomeView,
      children: [{
        path: '/timeline',
        name: 'timeline',
        component: TimeLineInnerScreen,
      },
      {
        path: '/search',
        name: 'search',
        components: {default: SearchResultInnerScreen, cancelbutton: CancelButton },
      }]
    },

  ]
})

export default router
