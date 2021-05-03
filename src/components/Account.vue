<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon absolute top right rounded v-on="on" color="white">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </template>

    <v-card dark>
      <v-toolbar dark color="transparent" flat>
        <v-toolbar-title>Account</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container fluid fill-height>
          <v-layout
            style="height: 100%; min-height: 500px"
            column
            justify-center
          >
            <v-flex xs1>
              <v-btn block depressed color="primary" @click="logout">
                Logout
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import auth from '../auth';
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
  },
};
</script>

<style>
</style>