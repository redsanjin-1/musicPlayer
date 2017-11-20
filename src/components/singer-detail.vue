<template>
  <transition name="slide"> 
    <div class="singer-detail">
      <div class="btn-back" @click="back">back</div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
import { createSong } from "common/js/song";
// import * as ck from "common/js/cookie";
export default {
  data() {
    return {
      songs: []
    };
  },
  computed: {
    ...mapGetters(["singer"])
  },
  // keep-alive 组件激活时的钩子函数 使用 activated
  activated() {
    if (this.singer.id) {
      this._getSingerDetail();
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    // 获取歌手详情
    _getSingerDetail() {
      // 开启 vue-progress
      this.$Progress.start();

      const url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg";
      const data = {
        g_tk: 5381,
        jsonpCallback: "MusicJsonCallbacksinger_track",
        loginUin: 0,
        hostUin: 0,
        format: "jsonp",
        inCharset: "utf8",
        outCharset: "utf-8",
        notice: 0,
        platform: "yqq",
        needNewCode: 0,
        singermid: this.singer.mid,
        order: "listen",
        begin: 0,
        songstatus: 1
      };

      this.$jsonp(url, data);
    },
    // _setCookies() {
    //   ck.setCookie("RK", "JRGWRnX+H6", 1);
    //   ck.setCookie("pgv_pvi", "7641246720", 1);
    //   ck.setCookie(
    //     "ptcz",
    //     "436e5f7c2096786c64fff4afd6eca34dd6e1b59e595af57fa290510d7fc09102",
    //     1
    //   );
    //   ck.setCookie("pt2gguin", "o0330411592", 1);
    //   ck.setCookie("pac_uid", "0_d9c3aed04266b", 1);
    //   ck.setCookie("pgv_si", "s2253668352", 1);
    //   ck.setCookie("ts_refer", "ADTAGnewyqq.singer", 1);
    //   ck.setCookie("pgv_pvid", "7220229760", 1);
    //   ck.setCookie("ts_uid", "4205915360", 1);
    //   ck.setCookie("o_cookie", "0330411592", 1);
    //   ck.setCookie("ts_last", "y.qq.com/w/singer.html", 1);
    // }
    _normalizeSong(list) {
      let ret = [];
      list.forEach(item => {
        let { musicData } = item;
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  },
  mounted() {
    // 定义获取歌手详情的回掉函数
    window.MusicJsonCallbacksinger_track = res => {
      this.$Progress.finish();
      this.songs = this._normalizeSong(res.data.list);
      console.log(this.songs);
    };
  }
};
</script>

<style scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #dedede;
}
.btn-back {
  position: absolute;
  top: 30px;
  right: 20px;
  padding: 20px;
  color: #fff;
  background-color: blue;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
