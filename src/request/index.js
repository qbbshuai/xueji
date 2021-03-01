import axios from "axios";
import router from "@/router";
import { Message } from 'element-ui'
import { getToken ,removeToken } from '../utils/token.js'
const request = axios.create({
  baseURL:'/admin'
})

//跨域
request.interceptors.request.use(config=>{
  config.headers['token'] = getToken()
  return config
})
//前置拦截器


// 后置拦截器
request.interceptors.response.use(response=>{
  if (response.data.code===500){
    Message.error(response.data.msg+'!')
    removeToken()
    router.push('/Login')
  } 
  else if(response.data.code===200|| response.data.code===0){
    console.log('请求到的数据',response);
    return response.data
    
  }
  else {
    return response
  }
})
export default request
