import jsCookie from 'js-cookie'
const key ='flg'
//设置token
export function setToken(token){
     jsCookie.set(key,token)
}

export function getToken(){
    return  jsCookie.get(key)
}

//移除token
export function removeToken(){
    jsCookie.remove(key)

}