<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-list-item v-on="on" two-line>
        <v-list-item-content @click="calculate">
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
        <v-container fluid fill-height v-if="currentUser && calc">
          <v-layout
            style="height: 100%; min-height: 500px"
            column
            justify-start
          >
            <v-flex xs2 class="pb-2">
            </v-flex>
            <v-flex xs2 class="pb-2">
              Combined Total: {{ totalPayed }} kr
            </v-flex>
            <v-flex xs2 class="pb-5">
              Evenly split: {{ calc.targetSum.toFixed(0) }} kr
            </v-flex>
            <v-flex
              xs5
              v-for="(user, i) in settlement.users"
              :key="`user-${i}`"
              
              class="pb-3"
            >
              <v-card dark class="pa-3 mb-3" color="#1a1a1a">
                <v-layout justify-space-between>
                  <v-flex xs8> {{ user }}</v-flex>
                  <v-flex xs6 class="text-right">
                    expenses: {{ calc.totalUserExpenses[user] }}
                  </v-flex>
                </v-layout>

                <v-list dense color="transparent">
                  <v-layout
                    class="list-expense pl-2"
                    v-for="expense in userExpenses(user)"
                    :key="`expense-${expense.id}`"

                    justify-space-between
                  >
                    <v-flex xs8 style="color:#bbbbbb;">{{ expense.message }}</v-flex>
                    <v-flex xs4 class="text-right" style="font-size: 0.7rem;">{{ expense.amount }} kr</v-flex>
                  </v-layout>
                  <v-list-item class="text-right pb-3">
                    <v-list-item-title>
                      Total payed: {{ calc.totalUserPayment[user] }} kr
                    </v-list-item-title>
                  </v-list-item>

                  <v-subheader
                    v-if="getOws(user).length > 0"
                    class="pay-subheader"
                    >Ows</v-subheader
                  >
                  <v-list-item
                    class="text-left pay-list"
                    v-for="(owe, i) in getOws(user)"
                    :key="`ows-${i}`"
                  >
                    <v-list-item-title>
                      {{ owe.value }} kr to {{ owe.user }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-subheader
                    v-if="getRecieves(user).length > 0"
                    class="pay-subheader"
                    >Gets</v-subheader
                  >
                  <v-list-item
                    class="text-left pay-list"
                    v-for="(owe, i) in getRecieves(user)"
                    :key="`gets-${i}`"
                  >
                    <v-list-item-title>
                      {{ owe.value }} kr from {{ owe.user }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import auth from "../auth";
import SplitCalculator from "../services/splitCalculator/splitCalculator";

export default {
  props: ["user"],
  data() {
    return {
      dialog: false,
      title: "",
      calc: null,
    };
  },
  methods: {
    calculate() {
      let calc = new SplitCalculator(this.settlement);
      calc.settle();
      console.log(calc);
      this.calc = calc;
    },
    getOws(user) {
      let out = this.calc.payedByUser.filter((o) => o.name == user)[0];
      if (!out) return [];
      return out.ows;
    },
    getRecieves(user) {
      let out = this.calc.payedByUser.filter((o) => o.name == user)[0];
      if (!out) return [];
      return out.gets;
    },
    userExpenses(user) {
      let id = this.$route.query.settlement;

      let settlement = this.$store.state.settlements.find((s) => s.id == id);
      if (!settlement) return [];
      return settlement.expenses.filter((e) => e.payedBy == user);
    },
  },
  computed: {
    currentUser() {
      return auth.user();
    },
    totalExpenses() {
      return this.settlement.expenses;
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
  border-bottom: 1px solid #333333;
}
.pay-list {
  max-height: 20px;
  min-height: 20px !important;
}
.pay-subheader {
  max-height: 20px;
  min-height: 20px !important;
}
</style>