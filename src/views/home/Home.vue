<template>
<div id="home">
 <nav-bar class="home-bar">
    <div slot="center">商城首页</div>
 </nav-bar>
  <home-swiper :banner="banner" class="home-swiper"></home-swiper>
  <recommend :recommend="recommend"></recommend>
  
  <feature-view/>
</div>
 
</template>

<script>

// 网络请求相关导入
import {getHomeMultiData,getGoodsData} from 'network/home.js'

//通用组件导入
import NavBar from 'components/common/navbar/NavBar'


//页面子组件导入
import HomeSwiper from './childComps/HomeSwiper'
import Recommend from './childComps/Recommend'
import FeatureView from './childComps/FeatureView'

export default {
  name:'Home',
  components: {
    NavBar,
    HomeSwiper,
    Recommend,
    FeatureView
  },
  data(){
    return{
     banner:[],
     recommend:[],
     goods:{
       'pop':{page:0,list:[]},
       'news':{page:0,list:[]},
       'sell':{page:0,list:[]}
     }
    }
  },
 created(){
   
   //请求首页的多个数据
   getHomeMultiData().then(res => {
     this.recommend = res.data.recommend.list
     this.banner = res.data.banner.list
    //  console.log(this.banner);
    //  console.log(res.data);
   })
   
   //请求商品数据
   getGoodsData('pop',1).then(res => {
     console.log(res);
   })
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