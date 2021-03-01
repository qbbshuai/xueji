<template>
  <div class="box">
    <!-- 用户名：<input v-model="user" type="text" />
    <br />
    密码： &nbsp;<input v-model="ps" @keyup.enter="deng" type="password" />
    <button @click="deng" >登录</button> -->
 <div v-bobo></div>
    <el-card class="login-form-layout">
      <el-form autoComplete="on"
               :model="loginForm"
              
               ref="loginForm"
               label-position="left">
        <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main" style="padding:15px 0px">学员学籍后台管理系统</h2>
        <el-form-item prop="username">
          <el-input name="username"
                    type="text"
                     prefix-icon="el-icon-user"
                    v-model="loginForm.username"
                    autoComplete="on"
                    placeholder="请输入用户名">
          <span slot="prefix">
            <svg-icon icon-class="user" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password"
                    :type="pwdType"
                   prefix-icon="el-icon-lock"
                    v-model="loginForm.password"
                    autoComplete="on"
                    placeholder="请输入密码">
          <span slot="prefix">
            <svg-icon icon-class="password" class="color-main"></svg-icon>
          </span>
            <span slot="suffix" >
            <svg-icon icon-class="eye" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px;text-align: center">
          <el-button style="width: 45%" type="primary" :loading="loading" @click="deng">
            登录
          </el-button>
         
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Login } from "@/request/api";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
          username: '',
          password: '',
        },
    };
  },
  methods: {
    deng() {
     console.log(this.$store);
  
      // Login({
      //   username: 'qbb',
      //   password:'123456'
      // }).then((res) => {
      //   localStorage.token = res.data.token;
      //   this.$router.push("/About");
      // });

      this.$store.dispatch('user/userlogin',{
        username:this.loginForm.username,
        password:this.loginForm.password
      }).then(()=>{

         this.$message({
          message: '恭喜你，登录成功！',
          type: 'success'
        });

          setTimeout(()=>{
        this.$router.push("/School");
          },1000)
      })
    },
  },
};
</script>

<style  scoped>
 .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409EFF;
  }

  .login-title {
    text-align: center;
  }

  .login-center-layout {
    background: #409EFF;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }
</style>
