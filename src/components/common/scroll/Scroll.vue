<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="scroll-content">
      <slot />
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 开启点击事件,默认是false
      //对于这个属性，必须设置click：true才能监听div的点击，但是button不用设置也可以
      click: true,
      // 0和1不监听滚动事件,2监听但是不监听手指松开后的滑动距离,3全部监听,这样封装的好处是可以让使用者选择监听的模式
      probeType: this.probeType,
      // 是否开启监听滚动到底部事件
      pullUpLoad: this.pullUpLoad,
    });

    // 监听滚动的位置
    this.scroll.on("scroll", (position) => {
      // 将监听的位置传递出去
      this.$emit("scrolls", position);
    });

    // 监听上拉加载更多

    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // 将上拉加载更多传递到home里面
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    // 将返回顶部做一个封装
    //对于time，如果没有传入的话默认是300
    BackTop(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },

    // 对刷新进行封装
    refresh() {
      // 这么写的原因是先判断 this.scroll这个对象存不存在
      this.scroll && this.scroll.refresh();
    },

    // 对finishPullUp进行封装
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    }
  },
};
</script>

<style scoped>
</style>