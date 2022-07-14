import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.use(MintUI);
Vue.use(ElementUI);
var axiosInstance = axios.create({
  baseURL:'http://localhost:8443',
  timeout:5000,
  withCredentials: true,
  headers: {'X-Requested-With': 'XMLHttpRequest'}
})
Vue.prototype.$axios = axiosInstance

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
