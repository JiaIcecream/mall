<template>
  <div class="goodslist">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :item="item"
    ></goods-list-item>
  </div>
</template>

<script>
//引入小的商品信息
import goodsListItem from "./goodsListItem";
export default {
  name: "goodsList",
  components: {
    goodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  created() {},
};
</script>

<style>
.goodslist {
  display: flex;
  /* 设定元素是否换行 wrap：换行 nowrap：不换行 */
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>