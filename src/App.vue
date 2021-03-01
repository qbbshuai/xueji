<template>
  <div id="app">
    <router-view></router-view>
    <div style="width:100px;height:100px;border:1px red solid"></div>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
/*<!--全局修改表格样式-->*/
.el-table th>.cell,.el-table .cell{
  text-align: center;
}
.el-table th>.cell{
  color: #2c3e50;
}
/*<!--全局修改表格样式-->*/
*{
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  
   
}
</style>
