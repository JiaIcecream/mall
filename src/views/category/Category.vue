<template>
  <div class="wrapper">
    <ul class="content">
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
    this.scroll =  new BScroll(document.querySelector('.wrapper'),{

    })
  }
}
</script>

<style>

  .content{
    height: 200px;
    background-color: red;
    /* overscroll-behavior-y: scroll; */
  }
</style>