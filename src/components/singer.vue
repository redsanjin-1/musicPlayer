<template>
<div>
  <ul class="singer">
    <li v-for="group in singerList">
      <h2 class="singerListTitle">{{group.title}}</h2>
      <div class="singerListItem" v-for="item in group.items" @click="selectSinger(item)">
        <a :href="item.singerLink" class="singerPic">
          <img v-lazy="item.touxiang">
        </a>
        <div class="singerDetails">
          <p>歌手 —— {{item.name}}</p>
          <p v-if="item.nickName">昵称 —— {{item.nickName}}</p>
          <p v-else>昵称 —— 暂无</p>      
        </div>
      </div>
    </li>
  </ul>
  <div class="list-shortcut">
    <ul>
      <li v-for="item in shortcutList" class="listItem">
        {{item}}
      </li>
    </ul>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import Singer from "common/js/singer";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      singerList: []
    };
  },
  computed: {
    shortcutList() {
      return this.singerList.map(group => {
        return group.title.substr(0, 1);
      });
    }
  },
  methods: {
    // 使用 jsonp 获取歌手列表数据
    _getSingerList() {
      const url = "/getSingerList",
        data = {
          channel: "singer",
          page: "list",
          key: "all_all_all",
          // pagesize: 2,
          pagenum: 1,
          jsonpCallback: "getSingerListCallback",
          g_tk: 5381,
          loginUin: 0,
          format: "jsonp",
          hostUin: 0,
          platform: "yqq",
          needNewCode: 0
        };
      this.$jsonp(url, data);
    },
    // 初始化歌手列表数据格式
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: "热门",
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < 10) {
          map.hot.items.push(
            new Singer({
              id: item.Fsinger_id,
              mid: item.Fsinger_mid,
              name: item.Fsinger_name,
              nickName: item.Fother_name
            })
          );
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            id: item.Fsinger_id,
            mid: item.Fsinger_mid,
            name: item.Fsinger_name,
            nickName: item.Fother_name
          })
        );
      });
      let hot = [],
        ret = [];
      for (let key in map) {
        const val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title == "热门") {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });

      return hot.concat(ret);
    },
    selectSinger(singer) {
      //  使用 vuex 的语法糖
      this.setSinger(singer);
      this.$router.push({
        path: `/singer/${singer.id}`
      });
    },
    ...mapMutations({
      setSinger: "SET_SINGER" // 添加映射
    })
  },
  mounted() {
    // 定义获取歌手列表回调函数
    window.getSingerListCallback = data => {
      this.singerList = this._normalizeSinger(data.data.list);
      // console.log(this.singerList);
      // 子组件自定义事件，向 父组件 派发事件 传值
      this.$emit("getSingerList", this.singerList);
    };
    this._getSingerList();
  }
};
</script>

<style scoped>
.singer {
  background-color: #f4f4f4;
}
.singerListTitle {
  line-height: 2.5;
  background-color: #ccc;
  text-indent: 2em;
  margin-bottom: 20px;
}
.singerListItem {
  padding: 0 5%;
  margin-bottom: 20px;
  display: flex;
}
.singerListItem > .singerDetails {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 5% 8%;
}
.singerListItem > .singerDetails > p {
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.list-shortcut {
  position: absolute;
  top: 200px;
  right: 0;
  z-index: 30;
}
</style>