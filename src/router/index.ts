import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import console from "../components/console/console.vue";
import Controller from "../views/Controller";

const routes = [
  {
    name: "console",
    path: "/console",
    component: console
  },
  {
    name: "controller",
    path: "/controller",
    component: Controller
  },
  { path: "*", redirect: "" }
];

export default new Router({ routes });
