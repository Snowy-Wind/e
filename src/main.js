import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementUI from 'element-ui'
import './css_js/ribbon'
import {setObj} from './css_js/refresh'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'element-ui/lib/theme-chalk/base.css'
import '../public/images/homeNav/icon/iconfont.css'
import '../public/images/homeNav/icon/iconfont'


Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.addEventListener("beforeunload",() => {
  setObj('store',store.state)
})
