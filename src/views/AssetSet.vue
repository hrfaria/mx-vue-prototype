<template>
  <div>
    <AssetSetCard/>
  </div>
</template>

<script>
// @ is an alias to /src
import AssetSet from '@/components/AssetSet.vue'
import AssetSetCard from '@/components/AssetSetCard.vue'

export default {
  name: 'AssetSetView',
  components: {
    AssetSetCard
  }
}
</script>
