<template>
  <swiper>
   <swiper-item v-for="(item,index) in banner" :key="index">
     <a :href="item.link">
       <img :src="item.image"/>
     </a>
   </swiper-item>
 </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'
export default {
  name:'HomeSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props:{
    banner:{
      type:Array,
      // 这里还能这样写，默认返回一个数组
      default(){
        return []
      }
    }
  }
}
</script>

<style>

</style>