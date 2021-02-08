import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import Axios from 'axios';
import store from './plugins/store';
import * as VueGoogleMaps from 'vue2-google-maps';
import GmapCluster from 'vue2-google-maps/dist/components/cluster';
import moment from './plugins/moments';
import IdleVue from 'idle-vue';

const base_url = process.env.VUE_APP_API;
const eventsHub = new Vue();
Axios.defaults.baseURL = base_url;
const token = sessionStorage.getItem('token');
if(token){
  Axios.defaults.headers.common['Authorization'] = 'Bearer '+token  
}

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  store,
  idleTime: 60000,
  startAtIdle: false
});
Vue.use(VueGoogleMaps,{
  load:{
    key: process.env.VUE_APP_GOOGLE_API,  
    libraries: 'places',
  }
})
Vue.component('GmapCluster',GmapCluster);
Vue.prototype.$http = Axios;
Vue.config.productionTip = false;


new Vue({
  vuetify,
  router,
  store,
  moment,
  render: h => h(App)
}).$mount('#app')
