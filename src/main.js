// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'

// import VuePreview from 'vue-preview'
// Vue.use(VuePreview)

import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(Vuex)
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
