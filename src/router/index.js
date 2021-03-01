import Vue from 'vue';
import VueRouter from "vue-router";
Vue.use(VueRouter)

import Home from "@/views/Home/Home";
import School from "@/views/School/School";
import Login from "@/views/Login/Login";
import Layout from "@/views/Layout/Layout";
import Admin from "@/views/Admin/Admin";
import Bumen from "@/views/Bumen/Bumen";
import Teacher from '@/views/Teacher/Teacher'
import Class from '@/views/Class/Class'
const router = new VueRouter({
  routes: [{
    path: '/Login',
    name: 'Login',
    hidden: true,
    component: Login
  }, {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/Home',
    // meta: { title: '学员管理' },
    children: [{
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: { title: '学员学籍',icon:'el-icon-user' }
    },]
  },
   {
    path: '/School',
    name: 'Layout',
    component: Layout,
    redirect: '/School',
    children: [{
      path: '/School',
      name: 'School',
      component: School,
      meta: { title: '校区管理', icon: 'el-icon-school' }
    }]
  },
  {
    path: '/Class',
    name: 'Layout',
    component: Layout,
    redirect: '/Class',
    children: [{
      path: '/Class',
      name: 'Class',
      component: Class,
      meta: { title: '班级管理', icon: 'el-icon-school' }
    }]
  },
 
  {
    path: '/Teacher',
    name: 'Teacher',
    component: Layout,
    redirect: '/Teacher',
    children: [{
      path: '/Teacher',
      name: 'Teacher',
      component: Teacher,
      meta: { title: '教师管理', icon: 'el-icon-school' }
    }]
  },
   {
    path: '/Admin',
    name: 'Layout',
    component: Layout,
    redirect: '/Admin',
    meta: { title: '人员管理',icon:'el-icon-coordinate' },
    children: [{
      path: '/Admin',
      name: 'Admin', 
      component: Admin,
      meta: { title: '管理员权限',icon:'el-icon-connection' }
    },
    {
      path: '/Bumen',
      name: 'Bumen',
      component: Bumen,
      meta: { title: '部门管理',icon:'el-icon-chat-line-square' }
    }
    ]
  }]

})
export default router
