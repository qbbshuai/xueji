import router from "@/router";
import NProgress from "nprogress";
import 'nprogress/nprogress.css';

import { getToken } from "./utils/token.js"
NProgress.configure({ showSpinner: false })


router.beforeEach((to, from, next) => {
  if (getToken()){
    if (to.path==='/Login'){
      next('/Home')
      NProgress.start()
    }else {
      NProgress.start()
      next()
    }
  }else {
    if (to.path==='/Login'){
      NProgress.start()
      next()
    }else {
      NProgress.start()
      next('/Login')
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
  document.title = to.meta.title+' - Vue'
})
