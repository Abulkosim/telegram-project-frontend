import type { NavigationGuard } from 'vue-router'

export const authGuard: NavigationGuard = (to, from, next) => {
  const token = document.cookie.split('; ').find(row => row.startsWith('token='))

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({
        path: '/auth',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
}