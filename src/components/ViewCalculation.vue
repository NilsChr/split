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
          <v-list-item-title>View Calculation</v-list-item-title>
          <v-list-item-subtitle
            >{{ totalExpenses.length }} expenses</v-list-item-subtitle
          >
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item-action>
      </v-list-item>
    </template>

    <v-card dark>
      <v-toolbar dark color="transparent" flat>
        <v-toolbar-title>Calculation</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text v-if="settlement">
        <v-container fluid fill-height v-if="currentUser">
          <v-layout
            style="height: 100%; min-height: 500px"
            column
            justify-start
          >
            <v-flex xs2 class="pb-2">
              <v-btn
                class="ma-1"
                v-for="(tag, i) in tags"
                :key="i"
                :color="tag.color"
                small
                :outlined="selectedTag != tag"
                @click="setTag(tag)"
              >
                {{ tag.title }}
              </v-btn>
            </v-flex>
            <v-flex xs2 class="pb-5">
              Combined Total: {{ totalPayed }} kr
            </v-flex>
            <v-flex
              xs5
              v-for="(user, i) in settlement.users"
              :key="i"
              class="pb-3"
            >
              <v-layout justify-space-between>
                <v-flex xs8> {{ user }}</v-flex>
                <v-flex xs6 class="text-right"
                  >{{ userExpenses(user).length }} Expenses</v-flex
                >
              </v-layout>

              <v-list dense>
                <v-list-item
                  class="list-expense"
                  v-for="expense in userExpenses(user)"
                  :key="expense.id"
                >
                  <v-list-item-title>{{ expense.amount }}</v-list-item-title>
                  <v-list-item-action-text>{{
                    expense.message
                  }}</v-list-item-action-text>
                </v-list-item>

                <v-list-item class="text-right">
                  <v-list-item-title>
                    Total: {{ userExpensesSum(user) }} kr
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="text-right">
                  <v-list-item-title>
                    Owes: {{ userOwesSum(user) }} kr
                  </v-list-item-title>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import auth from "../auth";
export default {
  props: ["user"],
  data() {
    return {
      dialog: false,
      title: "",
      selectedTag: null,
      tags: [
        { title: "mat", color: "#59CD90" },
        { title: "regning", color: "#FAC05E" },
        { title: "kos", color: "#F79D84" },
        { title: "div", color: "#3FA7D6" },
      ],
    };
  },
  methods: {
    setTag(tag) {
      if (tag == this.selectedTag) this.selectedTag = null;
      else this.selectedTag = tag;
    },
    userExpenses(user) {
      let id = this.$route.params.id;
      let settlement = this.$store.state.settlements.find((s) => s.id == id);
      if (!settlement) return [];

      if (this.selectedTag) {
        return settlement.expenses.filter(
          (e) =>
            e.payedBy == user && e.tag && e.tag.title == this.selectedTag.title
        );
      }

      return settlement.expenses.filter((e) => e.payedBy == user);
    },
    userExpensesSum(user) {
      let id = this.$route.params.id;
      let settlement = this.$store.state.settlements.find((s) => s.id == id);
      if (!settlement) return [];

      let sum = 0;

      if (this.selectedTag) {
        settlement.expenses
          .filter(
            (e) =>
              e.payedBy == user &&
              e.tag &&
              e.tag.title == this.selectedTag.title
          )
          .forEach((e) => {
            sum += parseInt(e.amount);
          });
        return sum;
      }

      settlement.expenses
        .filter((e) => e.payedBy == user)
        .forEach((e) => {
          sum += parseInt(e.amount);
        });
      return sum;
    },
    userOwesSum(user) {
      let id = this.$route.params.id;
      let settlement = this.$store.state.settlements.find((s) => s.id == id);
      if (!settlement) return [];

      let sum = 0;

      if (this.selectedTag) {
        settlement.expenses
          .filter(
            (e) =>
              e.payedBy == user &&
              e.tag &&
              e.tag.title == this.selectedTag.title
          )
          .forEach((e) => {
            sum += parseInt(e.amount);
          });
        return sum;
      }

      settlement.expenses
        .filter((e) => e.payedBy != user)
        .forEach((e) => {
          sum += parseInt(e.amount);
        });

      let userSum = this.userExpensesSum(user);

      let owes = (sum - userSum) / settlement.users.length;
      if (owes < 0) owes = 0;
      return owes;
    },
  },
  computed: {
    currentUser() {
      return auth.user();
    },
    totalExpenses() {
      let id = this.$route.params.id;
      let settlement = this.$store.state.settlements.find((s) => s.id == id);
      if (!settlement) return [];
      //let email = this.currentUser.email;

      if (this.selectedTag != null) {
        return settlement.expenses.filter(
          (e) => e.tag && e.tag.title == this.selectedTag.title
        );
      }

      return settlement.expenses;
    },

    totalPayed() {
      let amount = 0;
      for (let i = 0; i < this.totalExpenses.length; i++) {
        amount += parseInt(this.totalExpenses[i].amount);
      }
      return amount;
    },
    settlement() {
      let id = this.$route.query.settlement;
      return this.$store.state.settlements.find((s) => s.id == id);
    },
  },
};
</script>

<style>
.list-expense {
  max-height: 20px;
  min-height: 20px !important;
}
</style>