<template>
  <div id="detailBar">
    <nav-bar>
      <slot slot="left">
        <div class="left" @click="goback">
          <img src="~assets/img/common/back.svg" />
        </div>
      </slot>
      <slot slot="center">
        <!-- 不要直接给插槽设置样式，会不起效果，可以为插槽里的内容包裹一个div，为该div设置样式 -->
        <div class="detailbar">
          <div
            v-for="(item, index) in title"
            :key="index"
            class="title-item"
            @click="getTitleIndex(index)"
            :class="{isActive:currentIndex === index}"
          >
            {{ item }}
          </div>
        </div>
      </slot>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailBar",
  components: {
    NavBar,
  },
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0, // 当前选中的title
    };
  },
  methods: {
    goback() {
      this.$router.back();
    },
    getTitleIndex(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style>
.detailbar {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 13px;
}
.left {
  width: 100%;
  text-align: center;
}
.left img {
  margin-top: 10px;
}

.isActive{
    color: var(--color-tint);
  }
</style>