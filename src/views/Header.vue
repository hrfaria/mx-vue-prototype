<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="mb-2">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>
      
      <b-navbar-nav>
        <b-breadcrumb :items="crumbs" />
      </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Documentation</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  computed: {
    crumbs: function () {
      let params = this.$route.params;
      let breadcrumbs = [
        {
          to: "/",
          text: "Home",
        },
      ];

      this.$route.matched.forEach(function (route, routeIdx) {
        if (route.meta.breadCrumb) {
          let path = route.path;

          Object.entries(params).forEach(function ([key, value]) {
            path = path.replace(":" + key, value);
          });

          breadcrumbs.push({
            to: path,
            text: route.meta.breadCrumb,
          });
        }
      });

      return breadcrumbs;
    },
  },
};
</script>