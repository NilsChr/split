<template>
  <v-container fluid fill-height id="landing">
    <div id="skew2"></div>

    <v-layout column>
      <v-flex xs9> </v-flex>
      <v-flex xs3 id="fb-cont">
        <div id="firebaseui-auth-container" @click="signupClicked"></div>
      </v-flex>
      <v-flex xs1>
        <v-layout justify-center>
          <v-btn rounded @click="toSignUp" text small light>
            Take me back
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import auth from "@/auth";

export default {
  name: "auth",
  components: {},
  methods: {
    toSignUp() {
      this.$emit("toLanding");
    },
    signupClicked() {
      localStorage.setItem("splitabill-signup-inprogress", true);
    },
  },
  mounted() {
    auth.authForm("#firebaseui-auth-container");

    setTimeout(() => {
      let el = document.getElementsByClassName("firebaseui-idp-button");
      console.log(el);
      localStorage.setItem(
        "g-bar",
        JSON.stringify(document.getElementById("fb-cont").children)
      );
      el[0].addEventListener("click", () => {
        this.signupClicked();
      });
    }, 500);
  },
};
</script>
<style scoped>
@import "../../node_modules/firebaseui/dist/firebaseui.css";

#by-bog {
  position: absolute;
  text-align: right;
  color: rgb(182, 182, 182);
  font-size: 0.7em;
  bottom: 5px;
  right: 5px;
}

#skew2 {
  position: absolute;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    183deg,
    rgba(244, 244, 244, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
}
</style>