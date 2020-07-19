import Vue from 'vue'
import Router from 'vue-router'
import MXAssetSet from '@/components/MXAssetSet'
import MXAsset from '@/components/MXAsset'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MXAssetSet',
      props: true,
      component: MXAssetSet
    },
    {
      path: '/asset/:assetuid',
      name: 'MXAsset',
      props: true,
      component: MXAsset
    }
  ]
})
