import Vue from 'vue'
import VueRouter from 'vue-router'
import Sign from '../views/Sign'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Sign',
    component: Sign,
    children:[
      {
        path: 'signin',
        name: 'SignIn',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../components/Sign/SignIn.vue')
      },
      {
        path: 'signon',
        name: 'SignOn',
        component: () => import('../components/Sign/SignOn.vue'),
      },
    ],redirect:'signin'
  },
  {
    path: '/reset',
    name: 'Reset',
    component: () => import('../components/Sign/Reset.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children:[
      {
        path: 'personal',
        name: 'Personal',
        component: () => import('../components/Home/Personal.vue')
      },
      {
        path: 'friends',
        name: 'Friends',
        component: () => import('../components/Home/Friends.vue')
      },
      {
        path: 'socialupdates',
        name: 'SocialUpdates',
        component: () => import('../components/Home/SocialUpdates.vue')
      },
      {
        path: 'album',
        name: 'Album',
        component: () => import('../components/Home/Album.vue')
      },
      {
        path: 'article',
        name: 'Article',
        component: () => import('../components/Home/Article.vue')
      },
      {
        path: 'event',
        name: 'Event',
        component: () => import('../components/Home/Event.vue')
      },
      {
        path: 'game',
        name: 'Game',
        component: () => import('../components/Home/Game.vue')
      },
      {
        path: 'addfriend',
        name: 'Addfriend',
        component: () => import('../components/Home/Addfriend.vue')
      }
    ]
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/Test.vue')
  }
]

const router = new VueRouter({
  // mode : 'history',
  routes
})

export default router
