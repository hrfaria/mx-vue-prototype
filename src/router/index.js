import Vue from 'vue'
import Router from 'vue-router'
import AssetSetView from '@/views/AssetSet.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/test',
      component: () => import('@/components/Test.vue')
    },
    {
      path: '/',
      component: AssetSetView
    },
    {
      path: '/asset/:assetuid',
      component: {
        render (c) {
          return c('router-view')
        }
      },
      meta: {
        breadCrumb: 'Asset'
      },
      children: [
        {
          path: '',
          props: true,
          component: () => import('@/views/Asset.vue')
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
  ]
})
