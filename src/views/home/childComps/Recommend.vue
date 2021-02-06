<template>
  <div id="recommend">
    <div v-for="(item,index) in recommend" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image"/>
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'Recommend',
  props:{
    recommend:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
  #recommend{
    display: flex;
    font-size: 14px;
    text-align: center;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee ;
  }

  .recommend-item{
    flex: 1;
  }

  .recommend-item img{
    width: 67px;
    height: 67px;
    margin-bottom: 10px;
  }
</style>