import { auth } from "./modules/auth";
import { settings } from "./modules/settings";
import {dashboard} from "./modules/dashboard";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: auth,
    settings: settings,
    dashboard:dashboard
  },
});
