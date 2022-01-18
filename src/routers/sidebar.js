import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/sidebar/Home'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
