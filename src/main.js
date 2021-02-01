import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import Axios from 'axios'
import store from './plugins/store'

Vue.prototype.$http = Axios;
Vue.config.productionTip = false;
const base_url = "http://127.0.0.1:8000/api/";
// const base_url = "http://dev.tokohaji.co.id/api/";
Axios.defaults.baseURL = base_url;
if(store.state.status){
  Axios.defaults.headers.common['Authorization'] = store.state.token  
}
new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
