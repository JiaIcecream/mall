<template>
<!--  -->
  <swiper class="details-swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default(){
        return []
      }
    },
  },
};
</script>

<style>

.details-swiper{
  height: 300px;
  overflow: hidden;
}
</style>