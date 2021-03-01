
 
import Vue from 'vue'
Vue.directive(
    'bobo',{
      inserted:(el, binding, vnode, oldVnode)=>{
        el.addEventListener("click", function (event) {
          el.style.position = 'relative'
          el.style.overflow = 'hidden'
          const rect = el.getBoundingClientRect()
          console.log(rect)
          let boEle = el.getElementsByClassName('bobo')[0]
          if (boEle){
            // console.log(boEle)
            boEle.className = 'bobo'
          }else {
            boEle = document.createElement('div')
            boEle.style.width = boEle.style.height = Math.max(rect.width,rect.height) + 'px'
            boEle.className = 'bobo'
            el.appendChild(boEle)
          }
          console.log('X',event.pageX)
          console.log('Y',event.pageY)
          console.log('left',event.clientX-rect.left)
          console.log('top',event.clientY-rect.top)
          // setTimeout(()=>{
            boEle.style.left = (event.pageX - rect.left) - (boEle.offsetWidth/2) + 'px'
            boEle.style.top = (event.pageY - rect.top) - (boEle.offsetWidth/2) + 'px'
            boEle.className = 'bobo active'
          // },0)
        })
      }
    }
)