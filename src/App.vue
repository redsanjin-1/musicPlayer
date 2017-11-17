<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <div class="tab">
        <router-link class="tab-item" to="/goods" tag="div">商品</router-link>
        <router-link class="tab-item" to="/ratings">评论</router-link>
        <router-link class="tab-item" to="/seller">商家</router-link>
        <router-link class="tab-item" to="/axios">axios</router-link>
    </div> -->
    <!--
        使用 keep-alive 内部组件 缓存 部分页面或者组件
      方法一 ：在 inex.js 中配置 meta 属性 ；
      方法二 ：在 keep-alive 标签中配置 include / exclude 值可以为 正则 或 字符串
      -->
    <keep-alive include="/axios">
      <router-view></router-view>
    </keep-alive>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
export default {
  component: {}
};
</script>

<style scoped>
img {
  display: block;
  margin: 0 auto;
}

.tab {
  display: flex;
  width: 100%;
  line-height: 40px;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 10px 20px;
  border: 1px solid #ccc;
  color: #000;
}

.active {
  background-color: #31c27c;
  color: #fff;
}

p {
  text-align: center;
}
</style>
