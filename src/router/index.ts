import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Console from "../views/Console.vue";
import Controller from "../views/Controller.vue";

const routes = [
  {
    name: "console",
    path: "/console",
    component: Console
  },
  {
    name: "controller",
    path: "/controller",
    component: Controller
  },
  { path: "*", redirect: "" }
];

export default new Router({ routes });
