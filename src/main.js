import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index.js'

//引入水波纹
import './direction/bobo/bobo.css'
import './direction/bobo/bobo.js'

import router from "@/router";
import "@/permission"

console.log(ElementUI)
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
  

