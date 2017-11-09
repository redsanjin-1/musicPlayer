<template>
    <div ref="wrapper">
      <slot></slot>
    </div>
</template>
 
<script type="text/ecmascript-6">
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    }
  },
  watch: {
    // watch data的变化，刷新 betterscroll
    data() {
      setTimeout(() => {
        this.refresh();
      }, 20);
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: false,
        scrollY: true
      });
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  }
};
</script>

<style scoped>

</style>