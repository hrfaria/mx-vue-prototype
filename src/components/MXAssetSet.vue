<template>
  <div>
    <table>
      <tr>
        <th>Asset #</th>
        <th>Description</th>
        <th>Site</th>
        <th>Location</th>
      </tr>
      <tr v-for="asset in assets" v-bind:key="asset.assetuid">
        <td><router-link v-bind:to="'asset/' + page + '/' + asset.assetuid">{{ asset.assetnum }}</router-link></td>
        <td>{{ asset.description }}</td>
        <td>{{ asset.siteid }}</td>
        <td>{{ asset.location }}</td>
      </tr>
    </table>
    <button
      v-on:click="queryMXREST(previousPageURL)" 
      v-bind:disabled="previousPageURL.length == 0"
    >Previous page</button>
    <button v-on:click="queryMXREST(nextPageURL)" 
      v-bind:disabled="nextPageURL.length == 0"
    >Next page</button>
  </div>
</template>

<script>
export default {
  name: 'MXAssetSet',
  props: [
    'pageno'
  ],
  data() {
    return {
      assets: [],
      previousPageURL: '',
      nextPageURL: '',
      page: this.pageno
    };
  },
  beforeMount() {
    var pageno = this.$props.pageno ? 'pageno=' + this.$props.pageno + '&': '';
    this.queryMXREST('http://192.168.1.74:9080/maximo/oslc/os/mxasset?' + pageno + '_lid=wilson&_lpwd=wilson&lean=1&oslc.pageSize=5&oslc.select=assetuid,assetnum,siteid,description,location');
  },
  methods: {
    queryMXREST: function(url) {
      fetch(url)
        .then(response => response.json())
        .then(json => {
          this.assets = json.member;

          var nextPage = json.responseInfo.nextPage;
          this.nextPageURL = nextPage != null ? nextPage.href : '';

          var previousPage = json.responseInfo.previousPage;
          this.previousPageURL = previousPage != null ? previousPage.href : '';

          this.page = json.responseInfo.pagenum;
        })
        .catch(error => {
          console.log(error);
        });
    }
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