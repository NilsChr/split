import "./services/platformCheck/platformCheck";

import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import auth from '@/auth'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  beforeCreate () {
    auth.init(this);
  },
  render: h => h(App)
}).$mount('#app')
