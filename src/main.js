import '@babel/polyfill'
import 'mutationobserver-shim'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App'
import router from './router'
import store from './store';
import development from '@/config/development.json';
import production from '@/config/production.json';

Vue.config.productionTip = false

// Initialize config file
if (process.env.NODE_ENV === 'production') {
  Vue.prototype.$config = Object.freeze(production);
} else {
  Vue.prototype.$config = Object.freeze(development);
}

// Current version of Vue
Vue.prototype.$version = Vue.version;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
