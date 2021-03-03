<template>
  <swiper>
   <swiper-item v-for="(item,index) in banner" :key="index">
     <a :href="item.link">
       <img :src="item.image" @load="isimgLoad"/>
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
  data(){
    return {
      isload:false
    }
  },
  props:{
    banner:{
      type:Array,
      // 这里还能这样写，默认返回一个数组
      default(){
        return []
      }
    }
  },
  methods:{
    isimgLoad() {
      // 这里是一个很好的小技巧，避免多次发送事件
      if(!this.isload)
      this.$emit("isimgLoad")
      this.isload = true
    }
  }
}
</script>

<style>

</style>