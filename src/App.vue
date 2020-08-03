<template>
  <div id="app">
    <top-header />
    <router-view />
  </div>
</template>

<script>
import TopHeader from "@/views/TopHeader.vue";

export default {
  name: "App",
  components: {
    "top-header": TopHeader,
  },
};
</script>
