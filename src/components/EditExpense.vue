<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon x-small depressed color="primary" v-on="on" @click="setData">
        <v-icon>mdi-pen</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-toolbar color="transparent" flat>
        <v-toolbar-title>Edit Expense</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container fluid fill-height>
          <v-layout style="height: 100%" column justify-center>
            <v-flex xs2>
              <v-card class="pa-5" color="calculationCard">
                <v-text-field
                  class="trans value centered-input transparent"
                  v-model="amount"
                  type="number"
                  @input="onValueInput"
                  suffix="kr"
                  hide-details
                  flat
                  solo
                >
                </v-text-field>

                <v-text-field
                  class="trans centered-input"
                  v-model="message"
                  placeholder="Message..."
                  hide-details
                  flat
                  solo
                >
                </v-text-field>
              </v-card>
            </v-flex>
            <v-flex xs12 class="pt-5">
              <v-btn
                class="ma-1"
                v-for="(tag, i) in tags"
                :key="i"
                :color="tag.color"
                small
                :outlined="addedTag && addedTag.title != tag.title"
                @click="setTag(tag)"
              >
                {{ tag.title }}
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12 class="mt-5 pt-5">
              <v-btn
                block
                :disabled="
                  parseInt(amount) == 0 ||
                  !amount ||
                  (amount == expense.amount &&
                    message == expense.message &&
                    addedTag &&
                    expense.tag &&
                    addedTag.title == expense.tag.title)
                "
                color="primary"
                @click="updateExpense"
              >
                Update
              </v-btn>
            </v-flex>
            <v-flex xs12 class="pt-2">
              <v-btn block color="warning" @click="deleteExpense">
                Delete
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions> </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DB from "../services/DB";

export default {
  props: ["expense"],
  data() {
    return {
      dialog: false,
      message: "",
      amount: 0,
      valueText: "0",
      addedTag: null,
      tags: [
        { title: "mat", color: "#59CD90" },
        { title: "regning", color: "#FAC05E" },
        { title: "kos", color: "#F79D84" },
        { title: "div", color: "#3FA7D6" },
      ],
    };
  },
  methods: {
    setData() {
      this.message = this.expense.message;
      this.amount = this.expense.amount;
      this.addedTag = this.expense.tag;
    },
    onValueInput(e) {
      this.expense.value = parseInt(e);
    },
    setTag(tag) {
      if (tag == this.addedTag) this.addedTag = null;
      else this.addedTag = tag;
    },
    updateExpense() {
      this.expense.message = this.message;
      this.expense.tag = this.addedTag;
      this.expense.amount = this.amount;
      let id = this.$route.query.settlement;

      DB.settlements.updateExpense(id, this.expense);
      this.dialog = false;
    },
    deleteExpense() {
      let id = this.$route.query.settlement;

      DB.settlements.deleteExpense(id, this.expense);
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.centered-input >>> input {
  text-align: center;
}

.trans >>> .v-input__slot {
  background-color: transparent !important;
}

.value {
  font-size: 2rem;
  font-weight: bold;
}
</style>