import { createRouter, createWebHistory } from 'vue-router'
import FirstView from '@/views/FirstView.vue'
import SecondView from '@/views/SecondView.vue'

const router = (basePath = '/test') =>
  createRouter({
    history: createWebHistory(basePath),
    routes: [
      {
        path: '/',
        redirect: '/first',
      },
      {
        path: '/first',
        name: 'first',
        component: FirstView,
      },
      {
        path: '/second',
        name: 'second',
        component: SecondView,
      },
    ],
  })

export default router
