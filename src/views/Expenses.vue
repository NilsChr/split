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
    </v-card-text>
    <delete-settlement />
  </v-card>
</template>

<script>
import AddUser from "../components/AddUser.vue";
import Chart from "../components/Chart.vue";
import DeleteSettlement from '../components/DeleteSettlement.vue';
import UserExpenses from "../components/UserExpenses.vue";
import ViewCalculation from "../components/ViewCalculation.vue";

//import { firestore } from "firebase";
export default {
  components: { UserExpenses, AddUser, ViewCalculation, Chart, DeleteSettlement },
  data() {
    return {
      id: null,
      ref: null,
    };
  },
  methods: {
    close() {
      // Close ref
      //this.ref();
    },
  },
  computed: {
    settlement() {
      return this.$store.state.settlements.find((s) => s.id == this.id);
    },
  },
  activated() {
    this.id = this.$route.params.id;
    //const collectionName = "splitabill-settlements";
    /*
    this.ref = firestore()
      .collection(collectionName)
      .doc(this.id)
      .onSnapshot((data) => {
        console.log(data.data());
      });
      */
  },
};
</script>

<style>
</style>