<template>
<div class="layout">
  <div class="layout-left" :style="open?openLeft[1]:openLeft[0]">
    <AppMenu :open="open" />
  </div>
  <div class="layout-right" :style="open?Classopen[1]:Classopen[0]">
    <LayoutHead @openBtn="openBtn" />
    <AppMain />
  </div>
</div>
</template>

<script>
import AppMenu from "@/views/Layout/components/AppMenu";
import LayoutHead from "@/views/Layout/components/LayoutHead";
import AppMain from "@/views/Layout/components/AppMain";
export default {
  name: "index",
  components:{AppMenu,LayoutHead,AppMain},
  data(){
    return{
      open:false,
      openLeft:[{
        'width':'200px'
      },{
        'width':'64px'
      }],
      Classopen:[{
        'width':'calc(100% - 200px)'
      },{
        'width':'calc(100% - 64px)'
      }]
    }
  },
  methods:{
    openBtn(){
      this.open = !this.open
    }
  }
}
</script>

<style scoped>
.layout-left{
  transition: all 0.3s;
  background-color: rgb(48, 65, 86);
  overflow: hidden;
}
.layout-right{

  overflow-y: scroll;
  overflow: hidden;
  background: white;
  transition: all 0.3s;
  
}
.layout{
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
