<template>
  <v-app>
    <keep-alive>
      <router-view id="app"></router-view>
    </keep-alive>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
  created() {
    this.$vuetify.theme.dark = false;
  },
};
</script>
<style>
#app {
  height: 100%;
  width: 100%;
}
</style>

