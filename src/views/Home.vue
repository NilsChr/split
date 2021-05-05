<template>
  <v-container fluid fill-height class="pa-0 ma-0">
    <v-layout column id="landing">
      <v-flex xs6> </v-flex>

      <v-flex
        xs6
        style="background-color: rgb(244, 244, 244); position: relative"
      >
        <div id="skew_border"></div>

        <v-layout fill-height column>
          <v-flex xs3> </v-flex>
          <v-flex xs3>
            <v-layout fill-height justify-center>
              <v-flex xs4 class="text-center">
                <v-btn
                  rounded
                  @click="toSignUp"
                  text
                  :loading="signUpInProgress"
                  v-if="loaded"
                  light
                >
                  Sign up
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6> </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import auth from "@/auth";

export default {
  name: "auth",
  components: {
  },
  data() {
    return {
      signUpInProgress: false,
      loaded: false,
    };
  },
  methods: {
    toSignUp() {
      this.$emit("toSignup");
    },
  },
  computed: {
    currentUser() {
      return auth.user();
    },
  },
  mounted() {
    this.loaded = false;
    setTimeout(() => {
      let el = document.getElementsByClassName("firebaseui-busy-indicator");
      if (el.length > 0) this.signUpInProgress = true;
      this.loaded = true;
    }, 100);
  },
};
</script>
<style >
#landing {
  background-color: #1e1e1e !important;
  overflow: hidden;
  max-height: 100%;
  width: 100%;
}

#by-bog {
  position: absolute;
  text-align: right;
  color: rgb(182, 182, 182);
  font-size: 0.7em;
  bottom: 5px;
  right: 5px;
}

#skew {
  position: absolute;
  top: 65%;
  left: 50%;
  height: 500%;
  width: 400%;
  transform: translate(-50%, 0) rotate(-6deg);
  background-color: rgb(244, 244, 244);
}

#skew_border {
  background-color: rgb(244, 244, 244);
  position: absolute;
  top: -34px;
  height: 35px;
  width: 100%;
  clip-path: polygon(0 0, 100% 100%, 100% 0);
  transform: scale(1, -1);
}
</style>