import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@/shared/lib/guards/auth.guard'

import AuthPage from '@/pages/AuthPage/ui/AuthPage.vue'
import HomeView from '@/pages/HomePage/ui/HomeView.vue'
import AboutView from '@/pages/AboutPage/ui/AboutView.vue'
import ProfileView from '@/pages/ProfilePage/ui/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => AuthPage
    },
    {
      path: '/about',
      name: 'about',
      component: () => AboutView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => ProfileView,
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach(authGuard)

export default router