import Vue from 'vue'
import Router from 'vue-router'
import AssetSetView from '@/views/AssetSet.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    /* {
      path: '/about',
      component: () => import('@/views/About.vue')
    }, */
    {
      path: '/',
      component: AssetSetView
    },
    {
      path: '/asset/:assetuid',
      component: () => import('@/views/Asset.vue'),
      meta: {
        breadCrumb: 'Asset'
      },
      children: [
        {
          path: '',
          props: true,
          component: () => import('@/components/Asset.vue')
        },
        {
          path: 'assetspec',  
          props: true,
          component: () => import('@/views/AssetSpecSet.vue'),
          meta: {
            breadCrumb: 'Specification'
          }
        }
      ]
    }
    /* {
      path: '/asset/:assetuid',
      name: 'AssetView',
      props: true,
      component: () => import('@/views/Asset.vue'),
      meta: {
        breadCrumb: 'Asset'
      },
    },
    {
      path: '/asset/:assetuid/assetspec',
      name: 'AssetSpecSetView',
      props: true,
      component: () => import('@/views/AssetSpecSet.vue'),
      meta: {
        breadCrumb: 'Specification'
      },
    } */
  ]
})
