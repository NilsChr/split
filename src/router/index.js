import Vue from "vue";
import VueRouter from "vue-router";
import Landing from "../views/Landing";
import Settlements from "../views/Settlements";
import Expenses from "../views/Expenses";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing
  },
  {
    path: "/settlements",
    name: "Settlements",
    component: Settlements
  },
  {
    path: "/expenses",
    name: "Expenses",
    component: Expenses
  },
  {
    path: "*/**",
    name: "Landing",
    component: Landing
  },
];

const router = new VueRouter({
  base: "/split",
  mode: "history",
  routes,
});

export default router;
