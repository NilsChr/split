<template>
  <v-card tile dark>
    <v-toolbar dark color="transparent" flat>
      <v-toolbar-title v-if="settlement">{{
        settlement.title
      }}</v-toolbar-title>
      <v-toolbar-title v-else>Expenses</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon dark to="/settlements" @click="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text v-if="settlement">
      <add-user />

      <v-list two-line>
        <user-expenses
          v-for="(user, i) in settlement.users"
          :key="i"
          :user="user"
        />
      </v-list>
      <v-divider></v-divider>
      <view-calculation />
      <chart />
      <delete-settlement />
    </v-card-text>
  </v-card>
</template>

<script>
import AddUser from "../components/AddUser.vue";
import Chart from "../components/Chart.vue";
import DeleteSettlement from "../components/DeleteSettlement.vue";
import UserExpenses from "../components/UserExpenses.vue";
import ViewCalculation from "../components/ViewCalculation.vue";

export default {
  components: {
    UserExpenses,
    AddUser,
    ViewCalculation,
    Chart,
    DeleteSettlement,
  },
  data() {
    return {
      id: null,
      ref: null,
    };
  },
  methods: {
    close() {},
  },
  computed: {
    settlement() {
      let id = this.$route.query.settlement;
      return this.$store.state.settlements.find((s) => s.id == id);
    },
  },
};
</script>

<style>
</style>