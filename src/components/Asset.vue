<template>
  <div>
    {{this.$store.state.currentAsset.description}}
    <b-container class="ml-0 mt-3">
      <b-row>
        <b-col sm="8">
          <b-form-group id="assetnum-group" label="Asset #" label-for="assetnum">
            <b-form-input id="assetnum" v-model="asset.assetnum" type="text"></b-form-input>
          </b-form-group>
          <b-form-group id="description-group" label="Description" label-for="description">
            <b-form-input id="description" v-model="asset.description" type="text"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-link :to="'/asset/' + assetuid + '/assetspec'">Specification</b-link>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button v-on:click="save()">Save</b-button>
        </b-col>
      </b-row>
    </b-container>
    <!-- <ul>
      <li>
        <b>Asset #:</b>
        {{asset.assetnum}}
      </li>
      <li>
        <b>Description:</b>
        <input v-model="asset.description" />
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
    <button v-on:click="save()">Save</button>-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "Asset",
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
    load() {
      axios({
        method: "get",
        url:
          this.$config.maximo.url +
          "/maximo/oslc/os/mxasset/" +
          this.$props.assetuid,
        params: {
          _lid: this.$config.maximo.username,
          _lpwd: this.$config.maximo.password,
          lean: 1,
        },
      })
        .then((response) => {
          this.updateCurrentAsset(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    save() {
      axios({
        method: "post",
        url:
          this.$config.maximo.url +
          "/maximo/oslc/os/mxasset/" +
          this.$props.assetuid,
        headers: {
          "x-method-override": "PATCH",
          properties: "*",
        },
        params: {
          _lid: this.$config.maximo.username,
          _lpwd: this.$config.maximo.password,
          lean: 1,
        },
        data: this.asset,
      })
        .then((response) => {
          if (response.status == "200") {
            this.updateCurrentAsset(response.data);
            alert("Updated successfully!");
          } else {
            alert("Oops... something went wrong!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>