<template>
  <v-app dark>
    <keep-alive>
      <router-view id="app"></router-view>
    </keep-alive>
  </v-app>
</template>

<script>

export default {
  name: "App",

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
<style>
#app {
  height: 100%;
}
</style>

