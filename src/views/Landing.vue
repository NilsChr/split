<template>
  <v-container fluid id="l">
    <v-flex
      xs12
      style="position: absolute; z-index: 2; height: 45%; width: 100%"
    >
      <v-layout
        row
        align-center
        justify-center
        fill-height
        style="width: 100%; height: 100%"
      >
        <logo :logoColor="logoColor" />
      </v-layout>
    </v-flex>

    <home
      v-on:toSignup="toSignup"
      id="landing_base"
      v-bind:class="{ landing_baseUp: view == 'signup' }"
    />

    <signup
      v-on:toLanding="toLanding"
      id="signup_base"
      v-bind:class="{ signup_baseUp: view == 'signup' }"
    />

    <v-flex xs12 id="by-bog"> © BogSynth.com </v-flex>
  </v-container>
</template>

<script>
import Logo from "../components/Logo";
import Home from "./Home.vue";
import Signup from "./Signup.vue";

export default {
  components: {
    Signup,
    Home,
    Logo,
  },
  data() {
    return {
      view: "landing",
      logoColor: "white",
    };
  },
  methods: {
    toSignup() {
      this.view = "signup";
      this.logoColor = "rgba(0, 0, 0, 0.87)";
    },
    toLanding() {
      this.view = "landing";
      this.logoColor = "white";
    },
  },
  created() {
    console.log(this.$route.query);
  },
};
</script>

<style>
.v-application--wrap {
  height: 1vw;
  width: 1vw;
  overflow: hidden;
}

#landing_base {
  position: absolute;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease-in;
  transform: translate(0%, 0%);
}
.landing_baseUp {
  transform: translate(0%, -100%) !important;
}

#signup_base {
  position: absolute;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease-in;
  transform: translate(0%, 100%);
}
.signup_baseUp {
  transform: translate(0%, 0%) !important;
}
#by-bog {
  position: absolute;
  text-align: right;
  color: rgb(182, 182, 182);
  font-size: 0.7em;
  bottom: 5px;
  right: 5px;
}
</style>