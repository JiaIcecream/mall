<template>
  <div id="goods-list-item" @click="toDetail">
    <!-- item.link -->
    <a href="javascript:;">
      <img :src="item.show.img" @load="isimgLoad"/>
      <div class="goods-info">
        <p>{{ item.title }}</p>
        <span class="price">{{ item.price }}</span>
        <span class="collect">{{ item.cfav }}</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "goodsListItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  created() {
    
  },
  mounted() {
    
  },
  methods:{
    isimgLoad(){
      // 因为goodsListItem和home是非父子组件，所有使用事件总线,但是打印this.$bus发现是不存在的，
      // 所以我们需要使用原型,在main.js文件中通过 Vue.prototype.$bus = new Vue() 创建，那么就可以使用这个vue对象发送事件
      this.$bus.$emit('isimgLoad')
      // console.log('加载完成');
    },
    // 监听对商品的点击跳转到商品详情页
    toDetail() {
      // console.log(this.item);
      this.$router.push('/detail/' + this.item.iid)
    }

  }
};
</script>

<style>
#goods-list-item {
  position: relative;
  width: 48%;
  padding-bottom: 40px;
}

#goods-list-item img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.goods-info{
  position: absolute;
  bottom: 5px;
  right: 0;
  left: 0;
   /* overflow: hidden; */
  font-size: 12px;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.price{
  color: red;
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>