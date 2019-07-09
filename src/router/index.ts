import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import console from "../components/console/console.vue";
import controller from "../components/controller/controller.vue";

const routes = [
  {
    name: "console",
    path: "/console",
    component: console
  },
  {
    name: "controller",
    path: "/controller",
    component: controller
  },
  { path: "*", redirect: "" }
];

export default new Router({ routes });
