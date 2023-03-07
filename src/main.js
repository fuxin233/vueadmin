import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import axios from './axios'
//粒子引入
import VueParticles from 'vue-particles'

Vue.prototype.$axios = axios //
Vue.use(Element)
Vue.use(VueParticles)
Vue.config.productionTip = false

//require("./mock")

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
