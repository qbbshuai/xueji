<template>
<div class="layout-header">
  <div @click="isopen" class="el-icon-s-fold"></div>

  <!-- 面包屑 -->
  <div>
    <el-breadcrumb separator="/">
   <transition-group name="fade1">
        <el-breadcrumb-item v-for="(item,index) of list" :key="item.meta.title">
            <router-link v-if="index<list.length-1" :to="item.path"><span>{{item.meta.title}}</span></router-link>
            <span v-else>{{item.meta.title}}</span>
        </el-breadcrumb-item>
      </transition-group>
</el-breadcrumb>
  </div>
  <!-- 退出登录 -->
  <div class="boxtuichu">
     <el-button type="info" @click='tuichu()'>退出登录</el-button>
  </div>
</div>
</template>

<script>
import { removeToken} from '../../../utils/token.js'
 export default {
  name: "LayoutHead",
  data(){
    return {
      list:[]
    }
  },
  methods:{
    isopen(){
      this.$emit('openBtn')
    },
    mianbao(){
      let arr=[]
      if(this.firstHome(this.$route)){
        arr=[]
      }else{
        // arr= [{meta:{title:'学员学籍'},path:'/Home'}]
      }
      this.list=arr.concat(this.$route.matched.filter(item=>item.meta.title))

    },
    firstHome(route){
      if(route.path==='/Home' || route.path==='/'){
        return true
      }else{
        return false
      }
  },
  //退出登录
  tuichu(){
    this.$store.dispatch('user/logout').then(res=>{
          this.$router.push('/Login')
    })
     
  }
  },
  watch:{
    $route(){
      this.mianbao()
    }
  },
  created(){
    this.mianbao()

  }
}
</script>

<style scoped>
.layout-header div:nth-of-type(1){
  padding-left: 10px;
  font-size: 26px;
}
.layout-header{
  position: relative;
  display:flex;
  align-items:center;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
}

.fade1-enter{
  transform: translateX(-2px);
  opacity: 0;
}
.fade1-enter-active{
  transition: all .6s;
}
.fade1-enter-to{
  transform: translateX(0px);
  opacity: 1;
}

.boxtuichu{
  position: absolute;
  top: 0;
  right: 30px;



}


</style>
