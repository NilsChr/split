<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-list-item v-on="on" two-line>
        <v-list-item-content>
          <v-list-item-title>{{ user }}</v-list-item-title>
          <v-list-item-subtitle
            >{{ userExpenses.length }} expenses</v-list-item-subtitle
          >
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item-action>
      </v-list-item>
    </template>

    <v-card>
      <v-toolbar color="transparent" flat>
        <v-toolbar-title v-if="currentUser.email == user"
          >Your expenses</v-toolbar-title
        >
        <v-toolbar-title v-else>Expenses</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container fluid fill-height v-if="currentUser">
          <v-layout
            style="height: 100%; min-height: 500px"
            column
            justify-start
          >
            <v-flex xs1 v-if="currentUser.email == user">
              <add-expense />
            </v-flex>
            <v-flex xs2 class="pt-3">
              <label>Total Payed: {{ totalPayed }} kr </label>
            </v-flex>
            <v-flex xs5>
              <v-subheader>{{ userExpenses.length }} Expenses</v-subheader>
              <v-layout
                v-for="expense in userExpenses"
                :key="expense.id"
                justify-space-between
                style="border-bottom: solid 1px #aaaaaa"
                class="pa-1"
              >
                <v-flex xs7 style="color: #bbbbbb">{{
                  expense.message
                }}</v-flex>
                <v-flex xs4 class="text-right" style="font-size: 0.7rem"
                  >{{ expense.amount }} kr</v-flex
                >
                <v-flex xs1 class="pl-2">
                  <edit-expense
                    :expense="expense"
                    v-if="currentUser.email == user"
                  />
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import auth from "../auth";
import AddExpense from "./AddExpense.vue";
import EditExpense from "./EditExpense.vue";
export default {
  components: { AddExpense, EditExpense },
  props: ["user"],
  data() {
    return {
      dialog: false,
      title: "",
    };
  },
  computed: {
    currentUser() {
      return auth.user();
    },
    userExpenses() {
      let id = this.$route.query.settlement;
      let settlement = this.$store.state.settlements.find((s) => s.id == id);
      if (!settlement) return [];
      return settlement.expenses.filter((e) => e.payedBy == this.user);
    },
    totalPayed() {
      let amount = 0;
      for (let i = 0; i < this.userExpenses.length; i++) {
        amount += parseInt(this.userExpenses[i].amount);
      }
      return amount;
    },
  },
  methods: {
    create() {},
  },
};
</script>

<style scoped>
.list-expense {
  max-height: 10px;
  min-height: 10px !important;
}
</style>