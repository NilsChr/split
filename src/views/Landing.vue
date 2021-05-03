<template>
  <v-container fluid fill-height id="landing">
    <v-layout column >
      <!--
      <v-flex xs12> SPLIT A BILL </v-flex>
      -->
      <v-flex xs8>
        <v-layout align-center justify-center fill-height>
          <logo />
        </v-layout>
      </v-flex>
      <v-flex xs5>
        <div id="firebaseui-auth-container"></div>
      </v-flex>
       <v-flex xs1 id="by-bog">
        © BogSynth.com
      </v-flex>

      <!--
      <v-row>
        <v-col class="mb-4 pt-5">
          <div id="firebaseui-auth-container"></div>
        </v-col>
      </v-row>
      -->
    </v-layout>
  </v-container>
</template>

<script>
import auth from "@/auth";
import Logo from "../components/Logo.vue";

export default {
  name: "auth",
  components: {
    Logo,
  },
  mounted() {
    auth.authForm("#firebaseui-auth-container");
  },
};
</script>
<style>
@import "../../node_modules/firebaseui/dist/firebaseui.css";

body {
    background-color: #1e1e1e;
}

#app {
    background-color: #1e1e1e;
}

#landing {
    background-color: #1e1e1e;
}

#by-bog {
    position:absolute;
    text-align: right;
    color:rgb(182, 182, 182);
    font-size: 0.7em;
    bottom: 5px; 
    right: 5px;
}
</style>