import { createRouter, createWebHistory } from 'vue-router/auto'
import { useUserStore } from '../stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL)
})

router.beforeEach((to, from) => {
  const store = useUserStore()
  if (to.meta.requiresAuth && !store.id) {
    return {
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    }
  }
})

export default router
