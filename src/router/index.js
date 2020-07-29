import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/asset/:assetuid',
      name: 'MXAsset',
      props: true,
      component: () => import('@/components/MXAsset')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About.vue')
    }
  ]
})
