<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 最好不要在插槽内部来定义class或者别的，因为在运行的时候插槽会被替换
          样式就可能不会被替换
          解决办法是用一个div将插槽包裹进去，需要设置的样式就赋给div就行

     -->
    <div v-if="!isActive"><slot name = "item1-icon"></slot></div>
    <div v-else><slot name = "item2-icon"></slot></div>
    <div :style=isActiveColor><slot name = "item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  computed:{
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    isActiveColor() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      //如果没有被激活就跳转路由，如果已经激活了就不要跳转路由否则报错
      if(!this.isActive) this.$router.replace(this.path);
    }
  }
}
</script>

<style>
 .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 50px;
    font-size: 14px;
  }

  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }

</style>