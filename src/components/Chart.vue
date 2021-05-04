<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-list-item v-on="on" two-line @click="calculate">
        <v-list-item-content>
          <v-list-item-title>View Usage Chart</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item-action>
      </v-list-item>
    </template>

    <v-card dark>
      <v-toolbar dark color="transparent" flat>
        <v-toolbar-title>Usage</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-container fluid fill-height>
          <div style="width: 100%; height: 100%">
            <pie-chart :data="chartData" :options="chartOptions"></pie-chart>
          </div>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import auth from "../auth";
import PieChart from "./charts/PieChart.js";

export default {
  components: {
    PieChart,
  },
  data() {
    return {
      dialog: false,
      chartOptions: {
        hoverBorderWidth: 20,
        responsive: true,
        maintainAspectRatio: false,
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Green", "Red", "Blue"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
            data: [1, 10, 5],
          },
        ],
      },
    };
  },
  methods: {
    calculate() {
      let labels = [];
      let colors = [];

      let noname = "unlabled";

      for (let i = 0; i < this.settlement.expenses.length; i++) {
        let expense = this.settlement.expenses[i];

        let title = "";
        if (!expense.tag) {
          title = noname;
        } else {
          title = expense.tag.title;
        }
        labels.push(title);

        let color = "";
        if (!expense.tag) {
          color = "#b1b1b1";
        } else {
          color = expense.tag.color;
        }
        colors.push(color);
      }
      labels = [...new Set(labels)];
      colors = [...new Set(colors)];

      let values = [];
      for (let i = 0; i < this.settlement.expenses.length; i++) {
        let expense = this.settlement.expenses[i];

        let title = "";
        if (!expense.tag) {
          title = noname;
        } else {
          title = expense.tag.title;
        }
        //console.log("checking", title);
        let index = labels.indexOf(title);
        //console.log("index", index);
        if (!values[index]) {
          values[index] = 0;
        }

        values[index] += parseInt(expense.amount);
      }

      //console.log(labels);
      //console.log(colors);
      //console.log(values);
      let data = {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: labels,
        datasets: [
          {
            label: "Data One",
            backgroundColor: colors,
            data: values,
          },
        ],
      };

      this.chartData = data;
    },
  },
  computed: {
    currentUser() {
      return auth.user();
    },

    settlement() {
      let id = this.$route.query.settlement;
      return this.$store.state.settlements.find((s) => s.id == id);
    },
  },
  mounted() {},
  watch: {
    settlement(val) {
      if (!val) return;
      this.calculate();
    },
  },
};
</script>

<style>
</style>