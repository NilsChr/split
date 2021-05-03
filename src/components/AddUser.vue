<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn block color="primary" v-on="on"> Participants </v-btn>
    </template>

    <v-card dark>
      <v-toolbar dark color="transparent" flat>
        <v-toolbar-title>Participants</v-toolbar-title>
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
            justify-start
          >
            <v-flex xs2 class="pa-1">
              <v-text-field
                label="Email"
                hide-details
                dense
                outlined
                v-model="title"
              ></v-text-field>
            </v-flex>
            <v-flex xs1>
              <v-btn block depressed color="primary" @click="addUser">
                Add
              </v-btn>
            </v-flex>
            <v-flex xs9>
              <v-list dense v-if="settlement">
                <v-divider></v-divider>

                <v-list-item v-for="(user, i) in settlement.users" :key="i">
                  <v-list-item-title>
                    {{ user }}
                  </v-list-item-title>
                  <v-list-item-action>
                    <v-btn icon x-small @click="deleteParticipant(user)">
                      <v-icon> mdi-delete </v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
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
    addUser() {
      if (this.title == "") return;

      //DB.settlements.create(this.title);
      DB.settlements.addUser(this.$route.params.id, this.title);
      this.title = "";
      this.dialog = false;
    },
    deleteParticipant(user) {
      DB.settlements.deleteUser(this.$route.params.id, user);
    },
  },
  computed: {
    settlement() {
      let id = this.$route.params.id;
      return this.$store.state.settlements.find((s) => s.id == id);
    },
  },
};
</script>

<style>
</style>