import { createRouter, createWebHistory } from 'vue-router'
import ItemDetailView from '@/views/ItemDetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    /*{
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },*/
    {
      path: '/item-detail',
      name: 'item-detail',
      component: ItemDetailView,
      props: true
    }
  ]
})

export default router
