import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api';
import tip from './utils/tip';

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$tip = tip;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
