<template>
  <div id="tab-control">
    <div class="tab-item" v-for="(item,index) in titles" :key="index" 
    :class="{isActive:currentIndex === index}"
    @click="getStyle(index)">  
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      currentType:'pop',
      currentIndex:0
    }
  },
  methods:{
    getStyle(index){
      this.currentIndex = index
      //将子组件的事件传递出去
      this.$emit('tabclick',index)
    }
  }
}
</script>

<style>
  .isActive{
    color: var(--color-tint);
  }

  .isActive span{
    border-bottom: 2px solid var(--color-tint);
    padding: 3px 0;
  }
  #tab-control{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
  }
  .tab-item{
    flex: 1;
  }
</style>