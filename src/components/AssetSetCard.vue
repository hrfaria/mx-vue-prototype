<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b-pagination
            v-model="pagenum"
            pills
            size="lg"
            total-rows="100"
            per-page="5"
            hide-goto-end-buttons
            class="justify-content-center"
          ></b-pagination>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-for="asset in assets" :key="asset.assetuid" cols="12" md="6" lg="4">
          <b-card :title="asset.assetnum" class="mb-2">
            <b-card-text v-b-tooltip.hover :title="asset.description">
              <v-clamp autoresize :max-lines="1">{{asset.description}}</v-clamp>
              <b>Status:</b>
              {{asset.status}}
              <br />
              <b>Location:</b>
              {{asset.location}}
              <br />
            </b-card-text>
            <router-link
              v-bind:to="'asset/' + asset.assetuid"
              tag="button"
              class="btn btn-primary"
            >Detail</router-link>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-pagination
            v-model="pagenum"
            pills
            size="lg"
            total-rows="100"
            per-page="5"
            hide-goto-end-buttons
            class="justify-content-center"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import axios from "axios";
import VClamp from "vue-clamp";

export default {
  name: "AssetSetCard",
  components: {
    VClamp,
  },
  props: {
    perPage: { default: 6 },
  },
  mounted() {
    this.load(this.pagenum);
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
  watch: {
    pagenum: function () {
      this.load(this.pagenum);
    },
  },
  filters: {
    truncate: function (text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    },
  },
  methods: {
    ...mapActions(["updateCurrentPage"]),
    load(pagenum) {
      axios({
        method: "get",
        url: this.$config.maximo.url + "/maximo/oslc/os/mxasset",
        params: {
          _lid: this.$config.maximo.username,
          _lpwd: this.$config.maximo.password,
          pageno: pagenum,
          lean: 1,
          "oslc.pageSize": this.perPage,
          "oslc.select":
            "assetuid,assetnum,siteid,description,location,status,parent,itemnum,priority,serialnum,failurecode,vendor,manufacturer,installdate,purchaseprice,isrunning,totdowntime,changeby,changedate",
        },
      })
        .then((response) => {
          this.updateCurrentPage(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /* load(pagenum) {
      return [
        { assetuid: 1, assetnum: '1001', description: 'Asset 1001', page: 1},
        { assetuid: 2, assetnum: '1002', description: 'Asset 1002', page: 1},
        { assetuid: 3, assetnum: '1003', description: 'Asset 1003', page: 1},
        { assetuid: 4, assetnum: '1004', description: 'Asset 1004', page: 2},
        { assetuid: 5, assetnum: '1005', description: 'Asset 1005', page: 2},
        { assetuid: 6, assetnum: '1006', description: 'Asset 1006', page: 2},
        { assetuid: 7, assetnum: '1007', description: 'Asset 1007', page: 3},
        { assetuid: 8, assetnum: '1008', description: 'Asset 1008', page: 3},
        { assetuid: 9, assetnum: '1009', description: 'Asset 1009', page: 3}
      ].filter(asset => asset.page == pagenum)
    } */
  },
};
</script>