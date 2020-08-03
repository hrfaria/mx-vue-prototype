<template>
  <div>
    <AssetSpecSet :assetuid="assetuid"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AssetSpecSet from '@/components/AssetSpecSet.vue'

export default {
  name: 'AssetSpecSetView',
  props: ["assetuid"],
  components: {
    AssetSpecSet
  }
}
</script>
