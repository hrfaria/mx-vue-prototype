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
import VClamp from "vue-clamp";
import maximoRESTAPI from "../mixins/maximoRESTAPI";

export default {
  name: "AssetSetCard",
  components: {
    VClamp,
  },
  data: function () {
    return {
      select:
        "assetuid,assetnum,siteid,description,location,status,parent,itemnum,priority,serialnum,failurecode,vendor,manufacturer,installdate,purchaseprice,isrunning,totdowntime,changeby,changedate",
    };
  },
  props: {
    perPage: { default: 6 },
  },
  mounted() {
    this.loadSet("mxasset", this.pagenum, this.perPage, this.select);
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
      this.loadSet("mxasset", this.pagenum, this.perPage, this.select);
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
    ...mapActions(["updateCurrentPage"])
  },
  mixins: [maximoRESTAPI],
};
</script>