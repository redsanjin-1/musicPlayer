<template>
    <div>
        <h1 class="title">
            {{msg}}
        </h1>
        <div class="tab">
            <router-link class="tab-item" to="/goods/tabOne">tabOne</router-link>
            <router-link class="tab-item" to="/goods/tabTwo">tabTwo</router-link>
        </div>

        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      msg: "this is goods"
    };
  },
  mounted() {},
  components: {}
};
</script>

<style scoped>
.title {
  font-size: 36px;
  line-height: 2;
  text-align: center;
  color: pink;
}

.tab {
  display: flex;
  width: 100%;
  line-height: 2;
  margin-bottom: 40px;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 10px 20px;
  border: 1px solid #ccc;
  color: #000;
}

.active {
  background-color: lightseagreen;
  color: #fff;
}
</style>