import Vue from 'vue'
import Router from 'vue-router'
import AssetSetView from '@/views/AssetSet.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'AssetSetView',
      component: AssetSetView
    },
    {
      path: '/asset/:assetuid',
      name: 'AssetView',
      props: true,
      component: () => import('@/views/Asset.vue')
    },
    {
      path: '/asset/:assetuid/assetspec',
      name: 'AssetSpecSetView',
      props: true,
      component: () => import('@/views/AssetSpecSet.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About.vue')
    }
  ]
})
