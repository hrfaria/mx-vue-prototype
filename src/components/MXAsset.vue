<template>
  <div>
    <ul>
      <li>
        <b>Asset #:</b>
        {{asset.assetnum}}
      </li>
      <li>
        <b>Description:</b>
        {{asset.description}}
      </li>
      <li>
        <b>Status:</b>
        {{asset.status}}
      </li>
      <li>
        <b>Site:</b>
        {{asset.siteid}}
      </li>
      <li>
        <b>Parent:</b>
        {{asset.parent}}
      </li>
      <li>
        <b>Location:</b>
        {{asset.location}}
      </li>
      <li>
        <b>Rotating Item:</b>
        {{asset.itemnum}}
      </li>
      <li>
        <b>Priority:</b>
        {{asset.priority}}
      </li>
      <li>
        <b>Serial #:</b>
        {{asset.serialnum}}
      </li>
      <li>
        <b>Failure Class:</b>
        {{asset.failurecode}}
      </li>
      <li>
        <b>Vendor:</b>
        {{asset.vendor}}
      </li>
      <li>
        <b>Manufacturer:</b>
        {{asset.manufacturer}}
      </li>
      <li>
        <b>Installation Date:</b>
        {{asset.installdate}}
      </li>
      <li>
        <b>Purchase Price:</b>
        {{asset.purchaseprice}}
      </li>
      <li>
        <b>Asset Up?:</b>
        {{asset.isrunning}}
      </li>
      <li>
        <b>Total Downtime:</b>
        {{asset.totdowntime}}
      </li>
      <li>
        <b>Changed By:</b>
        {{asset.changeby}}
      </li>
      <li>
        <b>Changed Date:</b>
        {{asset.changedate}}
      </li>
    </ul>
    <router-link to="/">List Page</router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "MXAsset",
  props: ["assetuid"],
  mounted() {
    this.loadPage();
  },
  computed: {
    ...mapGetters({
      asset: "getCurrentAsset"
    })
  },
  methods: {
    ...mapActions(["queryMXAsset"]),
    loadPage() {
      var url =
        this.$config.maximo.url +
        "/maximo/oslc/os/mxasset/" +
        this.$props.assetuid +
        "?_lid=" +
        this.$config.maximo.username +
        "&_lpwd=" +
        this.$config.maximo.password +
        "&lean=1";

      this.queryMXAsset(url);
    }
  }
};
</script>

<style scoped>
ul,
li {
  text-align: left;
}
</style>