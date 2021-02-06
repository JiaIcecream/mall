<template>
<div id="home">
 <nav-bar class="home">
    <div slot="center">商城首页</div>
 </nav-bar>
  <home-swiper :banner="banner"></home-swiper>
  <recommend :recommend="recommend"></recommend>
</div>
 
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import {getMany} from 'network/home.js'
import HomeSwiper from './childComps/HomeSwiper'
import Recommend from './childComps/Recommend'

export default {
  name:'Home',
  components: {
    NavBar,
    HomeSwiper,
    Recommend
  },
  data(){
    return{
     banner:[],
     recommend:[]
    }
  },
 created(){
   //请求首页的多个数据
   getMany().then(res => {
     this.recommend = res.data.recommend.list
     this.banner = res.data.banner.list
    //  console.log(this.banner);
     console.log(this.recommend);
   })
 }
}

</script>

<style>
  .home{
    background-color:var(--color-tint);
  }
</style>