<template>
  <v-container class="pa-0">
    <v-layout column fill-height>
      <v-flex xs12>
        <v-card dark tile style="height: 100vh;">
          <v-card-title> SETTLEMENTS </v-card-title>
          <account />
          <v-list>
            <v-list-item
              v-for="settlemenet in settlements"
              :key="settlemenet.id"
              @click="goTo(settlemenet.id)"
            >
              <v-list-item-title>{{ settlemenet.title }}</v-list-item-title>
              <v-list-item-action>
                <v-icon> mdi-chevron-right </v-icon>
              </v-list-item-action>
            </v-list-item>
            <v-list-item style="min-height: 200px;"></v-list-item>
          </v-list>
          <add-settlement />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Account from '../components/Account.vue';
import AddSettlement from "../components/AddSettlement.vue";
import { STORE_COMMITS } from '../store';
export default {
  components: { AddSettlement, Account },
  methods: {
    goTo(id) {
      this.$store.commit(STORE_COMMITS.SET_SELECTED_SETTLEMENTS, id);
      this.$router.push("/expenses/" + id);
    },
  },
  computed: {
    settlements() {
      return this.$store.state.settlements;
    },
  },
  mounted() {},
};
</script>

<style>
</style>