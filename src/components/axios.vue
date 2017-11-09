<template>
  <!-- better-scroll组件 炒鸡坑 ！！！只有第一个子元素可以滚动，且需要定义 父容器的 高度 / 宽度 ，详见下边样式 -->
  <scroll :data="singerList" ref="scroll" class="singerContent">
    <div>
      <!-- 轮播图 -->
      <slider v-if="slider.length" :config="config" :sliderData="slider" ref="slider"></slider>
      <!-- 歌手列表 -->
      <singer @getSingerList="getSingerList"></singer>  
    </div>
    <div class="test">hhh</div>
  </scroll> 
</template>

<script type="text/ecmascript-6">
import slider from "base/slider";
import scroll from "base/scroll";
import singer from "./singer";
export default {
  data() {
    return {
      items: [],
      slider: [],
      config: {
        'loop': true,
        'autoPlay': true,
        'click': true
      },
      singerList: [],
      checkLoaded: false
    };
  },
  components: {
    slider,
    scroll,
    singer
  },
  methods: {
    _initSlider() {
      // 开启 vue-progress
      this.$Progress.start();

      const url = "/getQQImg";
      const data = {
        g_tk: 5381,
        uin: 0,
        notice: 0,
        platform: "h5",
        needNewCode: 1,
        format: "json"
      };

      this.$ajax({
        method: "get",
        url: url,
        data: data
      })
        .then(res => {
          this.$Progress.finish();
          this.slider = res.data.data.slider;
        })
        .catch(e => {
          this.$Progress.fail();
          console.log(e);
        });
    },
    // singer 子组件通过 自定义事件 向 父组件 传值
    getSingerList(data) {
      this.singerList = data;
    }
    // ,
    // 轮播图可能后加载完成于歌手列表，需刷新 scroll 组件
    // loadedImg() {
    //   if (!this.checkLoaded) {
    //     this.$refs.scroll.refresh();
    //     this.checkLoaded = true;
    //   }
    // }
  },
  create() {},
  mounted() {
    this._initSlider();
  }
};
</script>

<style scoped>
/* .singerContent {
  position: fixed;
  top值为 nav 高度，耦合
  top: 62px;
  width: 100%;
  bottom: 0;
  overflow: hidden;
} */
.singerContent {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
}
.test {
  position: fixed;
  top: 150px;
  right: 0;
}
</style>
