<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn block depressed color="primary" v-on="on"> Add expense </v-btn>
    </template>

    <v-card dark>
      <v-toolbar dark color="transparent" flat>
        <v-toolbar-title>Add Expense</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-container fluid fill-height>
          <v-layout style="height: 100%" column justify-center>
            <v-flex xs2>
              <v-card class="pa-5" color="primary">
                <v-text-field
                  class="trans value centered-input transparent"
                  v-model="value"
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
                  v-model="title"
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
                :outlined="addedTag != tag"
                @click="setTag(tag)"
              >
                {{ tag.title }}
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          block
          :disabled="parseInt(value) == 0 || !value"
          color="primary"
          @click="addExpense"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import auth from "../auth";
import DB from "../services/DB";
//import DB from "../services/DB";

export default {
  data() {
    return {
      dialog: false,
      title: "",
      value: 0,
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
    onValueInput(e) {
      this.value = parseInt(e);
    },
    toggleTag(tag) {
      if (this.addedTags.includes(tag)) {
        // REMOVE TAG
        let index = this.addedTags.indexOf(tag);
        this.addedTags.splice(index, 1);
      } else {
        this.addedTags.push(tag);
      }
    },
    setTag(tag) {
      if (tag == this.addedTag) this.addedTag = null;
      else this.addedTag = tag;
    },
    addExpense() {
      const expense = {
        id: new Date().getTime(),
        payedBy: auth.user().email,
        amount: this.value,
        message: this.title,
        tag: this.addedTag,
      };

      DB.settlements.addExpense(this.$route.params.id, expense);

      this.value = 0;
      this.message = "";
      this.addedTag = null;

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