import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth.vue'
import Dashboard from '../views/Dashboard.vue'
import Editor from '../views/Editor.vue'
import StaticPoster from '../views/StaticPoster.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Authentication',
    component: Auth
  },
  {
    path: '/u/:id',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/u/:userID/p/:posterID',
    name: 'Editor',
    component: Editor
  },
  {
    path: '/p/:id',
    name: 'StaticPoster',
    component: StaticPoster
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
