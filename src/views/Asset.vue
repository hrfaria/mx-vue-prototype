<template>
  <div>
    <Asset :assetuid="assetuid"/>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Asset from '@/components/Asset.vue'

export default {
  name: 'AssetView',
  props: ["assetuid"],
  components: {
    Asset
  }
}
</script>