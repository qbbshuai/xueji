import {Login} from '../../request/api.js'
import { setToken,removeToken} from '../../utils/token.js'

const state={
    userInfo:{}
}
const mutations={
    SET_USERINFO(state,userinfo){
        state.userInfo=userinfo
     }

}
const actions={
    userlogin({commit},userinfo){
        return new Promise((resolve,reject)=>{
                 Login(userinfo).then(res=>{
                     console.log(res);    
                     console.log(res.data.token);
                   
                     commit('SET_USERINFO',res.data)
                         //将token存到本地
                     setToken(res.data.token)    
                     resolve(res)
                 })
                
        })

    },
    //退出登录
    logout(){
        return new Promise((resolve,reject)=>{
            removeToken()
            resolve('退出登录了')
        })
    }
}


export default{
    namespaced:true, //命名空间
    state,
    mutations,
    actions
}