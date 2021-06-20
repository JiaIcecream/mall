<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">商城首页</div>
    </nav-bar>
      <tab-control
        :titles="['流行', '新品', '热卖']"
        @tabclick="tabclick"
        ref="homeTabControl1"
        :class="{tabcontrol:true}"
        v-show="istabcontrol"
      ></tab-control>
    <!-- 通过this.$refs.scroll可以获取这个对象，并且可以使用里面的方法和元素 
        父组件传参给子组件，子组件名字为probeType 父组件使用probe-type
    -->
    <scroll
      class="home-scroller"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scrolls="contentScroll"
      @pullingUp="HomepullingUp"
    >
      <home-swiper :banner="banner" class="home-swiper" @isimgLoad="swiperimgLoad"></home-swiper>
      <recommend :recommend="recommend"></recommend>
      <feature-view />
      <tab-control
        :titles="['流行', '新品', '热卖']"
        @tabclick="tabclick"
        ref="homeTabControl2"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <!-- @click.native 用来监听组件的原生事件 -->
    <back-top @click.native="backTop" v-show="isBackShow"></back-top>
  </div>
</template>

<script>
// 网络请求相关导入
import { getHomeMultiData, getGoodsData } from "network/home.js";

//通用组件导入
import NavBar from "components/common/navbar/NavBar";
import Scroll from "../../components/common/scroll/Scroll.vue";

//业务通用组件
import TabControl from "../../components/content/tabControl/TabControl.vue";
import BackTop from "components/content/backTop/BackTop.vue";

//页面子组件导入
import HomeSwiper from "./childComps/HomeSwiper";
import Recommend from "./childComps/Recommend";
import FeatureView from "./childComps/FeatureView";
import GoodsList from "../../components/content/goods/goodsList.vue";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    Recommend,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      //默认传递的商品列表是流行
      currentType: "pop",
      scroll: null,
      isBackShow: false, // 用来控制backtop按钮是否显示
      tabConoffset: 0, //tabControl 到顶部的距离
      istabcontrol:false,//为tabcontrol设置class
      currentPosition:0, //保存当前的位置
      destroyposition:0, //保存离开时的位置
    };
  },
  mounted() {
    // 在这个函数中接收goodsListItem发出的isimgLoad事件
    // 在这个生命钩子函数实现这个事件响应是因为这个阶段el已经生成，组件挂载也完成了，
    // 不会出现scroll.refresh()报错的情况，而在created函数中，挂载还未完成，scroll.refresh会报错
    // 同时当我们切换下面的导航栏再返回home页面时，还是会报错，这是因为切换的时候已经将当前的home销毁了，而scroll还没加载好就收到了图片加载事件导致报错
    // 同过调用 this.$bus.$on("事件名称",回调函数(参数))来执行相应的操作
    // 我们需要对scroll区域进行刷新,为了封装的思想，在scroll内对刷新操作进行了封装
    // 但是我们又面临新的问题：这个函数执行的太频繁了，我们需要用防抖动函数来处理

    const refresh = this.debounce(this.torefresh, 500);
    this.$bus.$on("isimgLoad", () => {
      refresh();
    });

    // 这个拿到的高度是不正确的，因为上面轮播图的图片还没加载完成，该值比实际的数值要小

  },
  activated() {

    // 返回到离开时的位置，并且对页面进行再一次刷新
    this.$refs.scroll.BackTop(0,this.destroyposition,0)
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.destroyposition = this.currentPosition;
    console.log(this.destroyposition);
  },
  destroyed() {
  },
  created() {
    //请求首页的多个数据
    this.getHomeMultiData();

    //请求商品数据
    this.getGoodsData("pop");
    this.getGoodsData("new");
    this.getGoodsData("sell");

    
  },
  methods: {
    /**
     * 事件监听相关
     */

    // 监听轮播图图片加载
    swiperimgLoad() {
      // console.log(this.$refs.homeTabControl.$el.offsetTop);
      this.tabConoffset = this.$refs.homeTabControl2.$el.offsetTop
    },
    // 上拉加载更多
    HomepullingUp() {
      this.getGoodsData(this.currentType);
    },
    // 将刷新封装
    torefresh() {
      // 添加这个代码可以再this.scroll加载完成后，在发送refresh()请求
      this.$refs.scroll && this.$refs.scroll.refresh();
    },

    // 防抖函数
    debounce(func, delay) {
      let timer = null;
      return function (...argus) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, argus);
        }, delay);
      };
    },

    //监听滚动位置,来控制返回顶部按钮是否显示
    contentScroll(position) {
      // 判断返回顶部按钮是否显示
      this.isBackShow = -position.y > 1000;

      // 判断对tabcontrol是否添加isfixed这个class
      this.istabcontrol = -position.y >= this.tabConoffset;

      // 保存当前的位置
      this.currentPosition = position.y;
    },
    // 点击按钮返回顶部
    backTop() {
      this.$refs.scroll.BackTop(0, 0, 500);
    },
    tabclick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      
      // 将两个tabcontrol的index同步
      this.$refs.homeTabControl1.currentIndex = index; 
      this.$refs.homeTabControl2.currentIndex = index; 
    },

    /**
     * 网络请求相关
     */
    getHomeMultiData() {
      getHomeMultiData().then((res) => {
        this.recommend = res.data.recommend.list;
        this.banner = res.data.banner.list;
      }).catch(error =>{
        console.log('获取失败');
      });
    },
    getGoodsData(type) {
      const page = this.goods[type].page + 1;
      getGoodsData(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 再次可以上拉加载更多
        this.$refs.scroll.finishPullUp();
      }).catch(err =>{
        console.log('获取失败');
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-bar {
  width: 100%;
  background-color: var(--color-tint);
}

.home-scroller {
  /*height:300px;*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}

.tabcontrol{
  position: relative;
  z-index: 9;
  background-color:white;
}

</style>