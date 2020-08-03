<template>
  <div id="app">
    <top-header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/views/Header.vue";

export default {
  name: "App",
  components: {
    "top-header": Header
  },
};
</script>
