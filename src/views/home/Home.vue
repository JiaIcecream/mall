<template>
<div id="home">
 <nav-bar class="home-bar">
    <div slot="center">商城首页</div>
 </nav-bar>
  <home-swiper :banner="banner" class="home-swiper"></home-swiper>
  <recommend :recommend="recommend"></recommend>
  
  <feature-view/>
  <tab-control :titles="['流行','新品','热卖']" @tabclick="tabclick"></tab-control>
  <goods-list :goods="goods[currentType].list"></goods-list>
</div>
 
</template>

<script>

// 网络请求相关导入
import {getHomeMultiData,getGoodsData} from 'network/home.js'

//通用组件导入
import NavBar from 'components/common/navbar/NavBar'


//业务通用组件
import TabControl from '../../components/content/tabControl/TabControl.vue'


//页面子组件导入
import HomeSwiper from './childComps/HomeSwiper'
import Recommend from './childComps/Recommend'
import FeatureView from './childComps/FeatureView'
import GoodsList from '../../components/content/goods/goodsList.vue'


export default {
  name:'Home',
  components: {
    NavBar,
    HomeSwiper,
    Recommend,
    FeatureView,
    TabControl,
    GoodsList,
  },
  data(){
    return{
     banner:[],
     recommend:[],
     goods:{
       'pop':{page:0,list:[]},
       'new':{page:0,list:[]},
       'sell':{page:0,list:[]}
     },
     //默认传递的商品列表是流行
     currentType:'pop'
    }
  },
 created(){
   
   //请求首页的多个数据
   this.getHomeMultiData();
   
   //请求商品数据
   this.getGoodsData('pop');
   this.getGoodsData('new');
   this.getGoodsData('sell');
  
 },
 methods:{
   /**
    * 事件监听相关
    */
   tabclick(index) {
     switch(index){
       case 0:
         this.currentType = 'pop'
         break
       case 1:
         this.currentType = 'new'
         break
       case 2:
         this.currentType = 'sell'
         break
     }
     console.log(this.currentType);
   },

   /**
    * 网络请求相关
    */
   getHomeMultiData(){
      getHomeMultiData().then(res => {
     this.recommend = res.data.recommend.list
     this.banner = res.data.banner.list
   })
   },
   getGoodsData(type){
     const page = this.goods[type].page + 1;
     getGoodsData(type,page).then(res => {
    //  console.log(res.data.list);
     this.goods[type].list.push(...res.data.list)
     this.goods[type].page += 1
   })
   }
 }
}

</script>

<style>

  #home{
    height: 2000px;
  }
  .home-bar{
    background-color:var(--color-tint);
    position: fixed;
    z-index: 9;
    width: 100%;
    top: 0;
  }
  .home-swiper{
    margin-top: 44px;
  }

</style>