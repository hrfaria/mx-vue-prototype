<template>
  <div>
    {{this.$route.path}}
    <ul>
      <li
        v-for="assetattr in asset.assetspec"
        :key="assetattr.assetspecid"
      >{{assetattr.assetattrid}} : {{assetattr.alnvalue}}{{assetattr.numvalue}}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "AssetSpecSet",
  props: ["assetuid"],
  mounted() {
    this.load();
  },
  computed: {
    ...mapGetters({
      asset: "getCurrentAsset",
    }),
  },
  methods: {
    ...mapActions(["updateCurrentAsset"]),
    load() {},
  },
};
</script>