import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import * as VueGoogleMaps from "vue2-google-maps";
import GmapCluster from "vue2-google-maps/dist/components/cluster";
import moment from "./plugins/moments";
import IdleVue from "idle-vue";
import { Services, ApiServices } from "./services";

const eventsHub = new Vue();

ApiServices.init(process.env.VUE_APP_API);
if (Services.getToken()) {
  ApiServices.setHeader();
}

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  store,
  idleTime: 120000,
  startAtIdle: false,
});

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_API,
    libraries: "places",
  },
});
Vue.component("GmapCluster", GmapCluster);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  moment,
  render: (h) => h(App),
}).$mount("#app");
