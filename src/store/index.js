import Vue from "vue";
import Vuex from "vuex";

export const STORE_COMMITS = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_SETTLEMENTS: "SET_SETTLEMENTS",
  SET_SELECTED_SETTLEMENTS: "SET_SELECTED_SETTLEMENTS",
  CRATE_SETTLEMENT: "CRATE_SETTLEMENT",
  SET_CHART_DATA: "SET_CHART_DATA",
  CALCULATE_CHART: "CALCULATE_CHART",
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    settlements: [],
    selectedSettlement: null
  },
  mutations: {
    SET_CURRENT_USER(state, currentUser) {
      state.currentUser = currentUser;
    },
    SET_SETTLEMENTS: (state, settlements) => {
      state.settlements = settlements;
    },
    SET_SELECTED_SETTLEMENTS: (state, selectedSettlement) => {
      state.selectedSettlement = selectedSettlement;
    },
    CRATE_SETTLEMENT: (state, payload) => {
      state.settlements = [...state.settlements, payload];
    },
    SET_CHART_DATA: (state, chartData) => {
      state.chartData = chartData;
    },
  },
  actions: {

  },
  modules: {},
});
