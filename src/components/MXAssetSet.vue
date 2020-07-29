<template>
  <div>
    <b-table
      id="list-table"
      :items="loadPage"
      :fields="fields"
      :per-page="perPage"
      :current-page="pagenum"
    >
      <template v-slot:cell(assetnum)="data">
        <router-link v-bind:to="'asset/' + data.item.assetuid">{{ data.item.assetnum }}</router-link>
      </template>
    </b-table>
    <b-pagination
      v-model="pagenum"
      :total-rows="totalCount"
      :per-page="perPage"
      aria-controls="list-table"
    ></b-pagination>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "MXAssetSet",
  props: {
    perPage: { default: 5 },
  },
  mounted() {},
  data() {
    return {
      // TODO: Make this a property that will be passed to the component
      fields: [
        {
          key: "assetnum",
          label: "Asset #",
          sortable: true,
        },
        {
          key: "description",
          sortable: false,
        },
        {
          key: "location",
          sortable: true,
        },
        {
          key: "siteid",
          label: "Site",
          sortable: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      assets: "getAssets",
      totalCount: "getTotalCount",
    }),
    pagenum: {
      get() {
        return this.$store.state.currentPage.pagenum;
      },
      set(value) {
        this.$store.commit("updatePagenum", value);
      },
    },
  },
  methods: {
    ...mapActions(["updateCurrentPage"]),
    loadPage(ctx, callback) {
      axios({
        method: "get",
        url: this.$config.maximo.url + "/maximo/oslc/os/mxasset",
        params: {
          _lid: this.$config.maximo.username,
          _lpwd: this.$config.maximo.password,
          pageno: ctx.currentPage,
          lean: 1,
          "oslc.pageSize": this.perPage,
          "oslc.select":
            "assetuid,assetnum,siteid,description,location,status,parent,itemnum,priority,serialnum,failurecode,vendor,manufacturer,installdate,purchaseprice,isrunning,totdowntime,changeby,changedate",
        },
      })
        .then((response) => {
          this.updateCurrentPage(response.data);
          callback(this.assets);
        })
        .catch((error) => {
          console.log(error);
          callback([]);
        });

      return null;
    },
  },
};
</script>