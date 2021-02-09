<template>
  <div id="goods-list-item">
    <a :href="item.link">
      <img :src="item.show.img" />
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
    // console.log(this.item);
  },
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