<template>
  <div class="content">
    <ul>
      <li>1</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>14</li>
      <li>12</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>14</li>
      <li>12</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Category',
  data() {
    return {
      scroll: null
    }
  },
  mounted(){
    this.scroll =  new BScroll(document.querySelector('.content'),{
      pullUpLoad:true,
      click:true
    })

    this.scroll.on('pullingUp',() => {
      // 发送网络请求，请求更多页的数据

      // 等数据请求完成，并将新的数据展示出来后

      // 延迟开始下一次的下拉加载更多
      setTimeout(() => {
        this.scroll.finishPullUp();
      },2000)
      
    })
  }
}
</script>

// scoped 的意思是作用域,当设置这个时，
// 样式只会对本组件的class起效果
<style scoped>
  .content{
    height: 200px;
    background-color: red;
    overflow: hidden;
  }
</style>