<template>
  <div>
    <b-container class="ml-0 mt-3">
      <b-row>
        <b-col sm="8">
          <b-form-group id="assetnum-group" label="Asset #" label-for="assetnum">
            <b-form-input id="assetnum" v-model="asset.assetnum" type="text" disabled></b-form-input>
          </b-form-group>
          <!-- Create a multi-text component -->
          <b-form-group id="description-group" label="Description" label-for="description">
            <b-input-group>
              <b-form-input id="description" v-model="asset.description" type="text"></b-form-input>
              <b-input-group-append>
                <b-button v-b-modal.description-longdescription-modal variant="outline-primary">...</b-button>
              </b-input-group-append>
              <b-modal id="description-longdescription-modal" :title="asset.description">
                <b-form-group
                  id="description-longdescription-group"
                  label="Long Description"
                  label-for="description-longdescription-textarea"
                >
                  <b-form-textarea
                    id="description-longdescription-textarea"
                    v-model="asset.description_longdescription"
                    rows="10"
                    max-rows="10"
                  ></b-form-textarea>
                </b-form-group>
              </b-modal>
            </b-input-group>
          </b-form-group>
          <b-form-group id="installdate-group" label="Installation Date" label-for="installdate">
            <b-form-input
              is="MXDateTime"
              id="installdate"
              v-model="asset.installdate"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="*">
          <b-nav>
            <b-nav-item :to="'/asset/' + assetuid + '/assetspec'" class="bg-info">Specification</b-nav-item>
          </b-nav>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button v-on:click="save('mxasset', assetuid)">Save</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import maximoRESTAPI from "../mixins/maximoRESTAPI";
import MXDateTime from "@/components/MXDateTime.vue";

export default {
  name: "Asset",
  props: ["assetuid"],
  components: {
    MXDateTime,
  },
  mounted() {
    this.load("mxasset", this.$props.assetuid);
  },
  computed: {
    ...mapGetters({
      asset: "getCurrentAsset",
    }),
  },
  methods: {
    ...mapActions(["updateCurrentAsset"]),
  },
  mixins: [maximoRESTAPI]
};
</script>