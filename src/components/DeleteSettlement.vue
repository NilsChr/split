<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn fab fixed bottom right rounded v-on="on" color="error" small v-if="isOwner">
        <v-icon size="20">mdi-delete</v-icon>
      </v-btn>
    </template>

    <v-card dark>
      <v-toolbar dark color="transparent" flat>
        <v-toolbar-title>Confirm Delete?</v-toolbar-title>
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
              <v-layout justify-space-around>
                <v-btn depressed color="primary" @click="dialog = false">
                  Cancel
                </v-btn>
                <v-btn depressed color="warning" @click="deleteSettlement"> Yes </v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import auth from '../auth';
import DB from "../services/DB";

export default {
  data() {
    return {
      dialog: false,
      title: "",
    };
  },
  methods: {
    async deleteSettlement() {
      let id = this.$route.params.id;

      await DB.settlements.delete(id);
      this.$router.push("/settlements");
    },
  },
  computed: {
      isOwner() {
      let id = this.$route.params.id;
      let settlement = this.$store.state.settlements.find((s) => s.id == id);
        return settlement?.owner == auth.user().email;
      }
  }
};
</script>

<style>
</style>