<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon absolute top right rounded v-on="on">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-toolbar color="transparent" flat>
        <v-toolbar-title>Account</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-main>
        <v-container fluid style="height: 100%; min-height: 500px">
          <v-layout
            fill-height
            column
            justify-content-space-around
            v-if="currentUser"
          >
            <v-flex xs1>
              <v-layout justify-space-between>
                <v-subheader class="pt-4">Dark mode</v-subheader>
                <v-switch
                  hide-details
                  dense
                  v-model="currentUser.darkmode"
                  @change="toggleDarkMode"
                ></v-switch>
              </v-layout>
              <v-divider></v-divider>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs1>
              <v-btn block depressed color="primary" @click="logout">
                Logout
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
    </v-card>
  </v-dialog>
</template>

<script>
import auth from "../auth";
import DB from "../services/DB";
export default {
  data() {
    return {
      dialog: false,
      title: "",
    };
  },
  methods: {
    logout() {
      auth.logout();
    },
    toggleDarkMode() {
      this.$vuetify.theme.dark = this.currentUser.darkmode;
      DB.user.updateUser(this.currentUser);
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
};
</script>

<style>
</style>