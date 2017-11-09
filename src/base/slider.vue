<template>
  <div ref="slider" class="slider">
    <div class="slider-group" ref="sliderGroup">
      <div v-for="item in sliderData">
        <a :href="item.linkUrl">
          <img :src="item.picUrl">
        </a>
      </div>
    </div>
    <div class="dots">
      <span v-for="(item,index) in dots" class="dot-item" :class="{active:currentPageIndex===index}"></span>
    </div>
  </div>
</template> 

<script type="text/ecmascript-6">
import BScroll from "better-scroll";
export default {
  props: {
    config: {
      type: Object,
      default: null
    },
    sliderData: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  watch: {
    sliderData() {
      this.slider && this.refresh();
    }
  },
  components: {
    BScroll
  },
  methods: {
    _setSliderWidth(isResize) {
      let width = 0;
      let sliderWidth = window.innerWidth;
      this.children = this.$refs.sliderGroup.children;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        child.style.width = sliderWidth + "px";
      }
      // 无缝滚动 需前后添加两个 dom 节点的拷贝
      if (this.config.loop && !isResize) {
        this.$refs.sliderGroup.style.width =
          (2 + this.children.length) * sliderWidth + "px";
      } else {
        this.$refs.sliderGroup.style.width =
          this.children.length * sliderWidth + "px";
      }
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        // bindToWrapper: true,
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: true,
          threshold: 0.3,
          speed: 400
        },
        click: this.config.click
      });

      this.slider.on("scrollEnd", () => {
        let index = this.slider.getCurrentPage().pageX;
        if (this.config.loop) {
          index -= 1;
        }
        this.currentPageIndex = index;

        if (this.config.autoPlay) {
          clearTimeout(this.timer);
          this.play();
        }
      });
    },
    _initDots() {
      this.dots = new Array(
        this.config.loop ? this.children.length - 2 : this.children.length
      );
    },
    enable() {
      this.data && this.slider.enable();
    },
    disable() {
      this.data && this.slider.disable();
    },
    refresh() {
      this.data && this.slider.refresh();
    },
    play() {
      let index = this.currentPageIndex + 1;
      if (this.config.loop) {
        index += 1;
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(index, 0, 400);
      }, 2000);
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth();
      this._initSlider();
      this._initDots();
      this.play();
    }, 20);
    window.addEventListener("resize", () => {
      if (!this.slider) {
        return;
      }
      this._setSliderWidth(true);
      this.refresh();
    });
  }
};
</script>

<style scoped>
.slider {
  position: relative;
  overflow: hidden;
}
.slider-group > div {
  float: left;
}
.slider-group > div > a {
  display: block;
}
.slider-group > div img {
  width: 100%;
}
.dots {
  position: absolute;
  bottom: 3%;
  left: 50%;
  transform: translateX(-50%);
}
.dot-item {
  display: inline-block;
  margin: 0 3px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ccc;
}
.dots .active {
  background-color: #009a61;
}
</style>
