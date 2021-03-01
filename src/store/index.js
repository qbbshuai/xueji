import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {Login} from '../request/api.js'
import { setToken } from "../utils/token.js";
import user from "./modules/user.js";

const store=new Vuex.Store({
    modules:{
        user,
    },
    state:{       
    },
    mutations:{},
    actions:{},
    getters:{}
})

export default store
