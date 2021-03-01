<template>
<div>
  <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="rgb(48, 65, 86)"
      text-color="rgb(191, 203, 217)"
      active-text-color="#409EFF"
      router
      :collapse="open">
        <el-submenu
            v-for="route of $router.options.routes"
            v-if="!route.hidden&&route.children.length>1"
            :index="route.path"
        >
          <template slot="title">
            <i :class="route.meta.icon"></i>
            <span slot="title">{{route.meta.title}}</span>
          </template>


          <el-menu-item-group>
            <el-menu-item v-for="item of route.children" :index="item.path">
               <i :class="item.meta.icon"></i>
              {{item.meta.title}}
            
              </el-menu-item>     
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-else-if="!route.hidden&&route.children.length===1" :index="route.children[0].path">
          <i :class="route.children[0].meta.icon"></i>
          <span slot="title">{{route.children[0].meta.title}}</span>
        </el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  props:['open'],
  name: "AppMenu",
  data(){
    return{

    }
  },
  mounted() {
    console.log(this.$router.options.routes)
  }
}
</script>

<style scoped>
.el-submenu .el-menu-item{
  background-color: #1f2d3d !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
>>>.el-submenu__title:hover{
  background-color: #263445 !important;
}
>>>.el-menu-item:hover{
  background-color: #001528 !important;
}
>>>.el-menu{
  border-right: none;
}
>>>.el-menu-item.is-active{
  background-color: #263445 !important;
}
>>>.el-menu-item-group__title{
  padding: 0;
}
</style>
