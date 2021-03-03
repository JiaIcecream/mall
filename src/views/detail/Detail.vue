<template>
  <div id="goodsDetail">
    <detail-bar></detail-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
  </div>
</template>

<script>
// 网络相关
import { getGoodsDetail } from "network/detail.js";
import DetailBar from "./childComps/DetailBar";
import DetailSwiper from "./childComps/DetailSwiper.vue";

// 子组件

export default {
  name: "Detail",
  components: {
    DetailBar,
    DetailSwiper,
  },
  data() {
    return {
      iid: null,
      topImages: [] //轮播图片
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    this.getGoodsDetail(this.iid);
  },
  methods: {
    /*
      网络请求相关
    */

    getGoodsDetail(iid) {
      getGoodsDetail(iid).then((res) => {
        console.log(res.result);
        this.topImages = res.result.itemInfo.topImages;
      });
    },
  },
};
</script>

<style>
</style>