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

    <v-card>
      <v-toolbar color="transparent" flat>
        <v-toolbar-title>Participants</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
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
                  <v-list-item-action
                    v-if="
                      currentUser == settlement.owner &&
                      user != settlement.owner
                    "
                  >
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
    addUser() {
      if (this.title == "") return;
      let id = this.$route.query.settlement;

      DB.settlements.addUser(id, this.title);
      this.title = "";
      this.dialog = false;
    },
    deleteParticipant(user) {
      let id = this.$route.query.settlement;

      DB.settlements.deleteUser(id, user);
    },
  },
  computed: {
    settlement() {
      let id = this.$route.query.settlement;
      return this.$store.state.settlements.find((s) => s.id == id);
    },
    currentUser() {
      return auth.user().email;
    },
  },
};
</script>

<style>
</style>