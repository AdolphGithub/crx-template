import { createRouter, createMemoryHistory } from 'vue-router'
import Home from '../views/inject/Home'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
