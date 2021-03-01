<template>
<div class="appmain">
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</div>
</template>

<script>
export default {
  name: "AppMain"
  
}
</script>

<style scoped>
.fade-enter{
  transform: translateX(-10px);
  opacity: 0;
  
}
.fade-enter-active,.fade-leave-active{
  transition: all 0.4s;
}
.fade-enter-to,.fade-leave{
  transform: translateX(0px);
  opacity: 1;
}
.fade-leave-to{
  opacity: 0;
  transform: translateX(10px);
}
.appmain{
  /* height: calc(100vh- 60px);
   overflow: hidden;
  overflow-y: scroll; */
  padding: 10px;
  background-color: #f8f8f8;
}
</style>
