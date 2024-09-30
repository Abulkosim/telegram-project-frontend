import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/HomePage/ui/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
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
      component: () => import('@/pages/AboutPage/ui/AboutView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/pages/AuthPage/ui/AuthPage.vue')
    }
  ]
})

export default router
