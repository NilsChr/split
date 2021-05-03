<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn fixed bottom right rounded v-on="on" color="primary">
        <v-icon>mdi-plus</v-icon>
        Create
      </v-btn>
    </template>

    <v-card dark>
      <v-toolbar dark color="transparent" flat>
        <v-toolbar-title>Add Settlement</v-toolbar-title>
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
            <v-flex xs2 class="pa-1 mb-5">
              <v-text-field
                label="Name"
                hide-details
                dense
                outlined
                v-model="title"
              ></v-text-field>
            </v-flex>
            <v-flex xs1>
              <v-btn block depressed color="primary" @click="create">
                Create
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import DB from "../services/DB";

export default {
  data() {
    return {
      dialog: false,
      title: "",
    };
  },
  methods: {
    create() {
      if (this.title == "") return;

      DB.settlements.create(this.title);
      this.title = "";
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>