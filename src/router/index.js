import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import MXAsset from '@/components/MXAsset'

Vue.use(Router)

export default new Router({
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
      component: MXAsset
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About.vue')
    }
  ]
})
