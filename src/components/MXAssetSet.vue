<template>
  <div>
    <table>
      <tr>
        <th>Asset #</th>
        <th>Description</th>
        <th>Location</th>
        <th>Site</th>
      </tr>
      <tr v-for="asset in assets" v-bind:key="asset.assetuid">
        <td>
          <router-link v-bind:to="'asset/' + asset.assetuid">{{ asset.assetnum }}</router-link>
        </td>
        <td>{{ asset.description }}</td>
        <td>{{ asset.location }}</td>
        <td>{{ asset.siteid }}</td>
      </tr>
    </table>
    <button
      v-on:click="queryMXAssetSet(previousPageURL)"
      v-bind:disabled="this.$store.state.currentPage.previousPageURL.length == 0"
    >Previous page</button>
    <button
      v-on:click="queryMXAssetSet(nextPageURL)"
      v-bind:disabled="this.$store.state.currentPage.nextPageURL.length == 0"
    >Next page</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "MXAssetSet",
  mounted() {
    var pageno = this.pagenum > 0 ? "pageno=" + this.pagenum + "&" : "";
    var url =
      "http://192.168.1.74:9080/maximo/oslc/os/mxasset?" +
      pageno +
      "_lid=wilson&_lpwd=wilson&lean=1&oslc.pageSize=5&oslc.select=assetuid,assetnum,siteid,description,location,status,parent,itemnum,priority,serialnum,failurecode,vendor,manufacturer,installdate,purchaseprice,isrunning,totdowntime,changeby,changedate";
    this.queryMXAssetSet(url);
  },
  computed: {
    ...mapGetters({
      assets: "getAssets",
      previousPageURL: "getPreviousPageURL",
      nextPageURL: "getNextPageURL",
      pagenum: "getPagenum"
    })
  },
  methods: {
    ...mapActions(["queryMXAssetSet"])
  }
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>