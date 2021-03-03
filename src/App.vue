<template>
  <div id="app">
    <!-- exclude="Detail" -->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>

    <main-tabbar class="main-tabbar"></main-tabbar>
  </div>
</template>

<script>
import MainTabbar from "components/content/mainTabbar/MainTabbar";
export default {
  name: "App",
  components: {
    MainTabbar,
  },
};
</script>

<style>
@import "assets/css/base.css";
/* .main-tabbar{
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
  } */
</style>
