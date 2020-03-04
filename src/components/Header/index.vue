<template>
  <div class="__header">
    <div class="__header-container" :class="{'fixed': fixed}" :style="`z-index: ${zIndex};`">
      <Statusbar :bc="bc" />
      <van-nav-bar
        left-arrow
        :title="title"
        :rightText="rightText || ''"
        @click-left="goBack"
        @click-right="rightFn"
      >
        <slot name="right" slot="right"></slot>
      </van-nav-bar>
    </div>
    <div class="header-plac" :style="`height: ${placHeight}px`" v-show="fixed"></div>
  </div>
</template>
<script>
import Statusbar from '@/components/Statusbar';
import { getStatusbarHeight } from '../../utils/h5plus';
export default {
  props: {
    fixed: {
      default: true,
      type: Boolean
    },
    title: {
      type: String
    },
    zIndex: {
      default: 100,
      type: Number,
    },
    rightText: {
      default: '',
      type: String
    },
    rightFn: {
      default: () => {},
      type: Function
    },
    leftFn: {
      default: null
    },
    bc: {
      default: '#fff',
      type: String
    }
  },
  components: {
    Statusbar
  },
  data() {
    return {
      placHeight: 66
    }
  },
  methods: {
    getHeaderPlacHeight() {
      return document.querySelector('.__header-container').offsetHeight;
    },
    goBack() {
      if (this.leftFn) {
        this.leftFn();
      } else {
        this.back();
      }
    }
  },
  mounted() {
    this.placHeight = this.getHeaderPlacHeight();
  }
}
</script>
<style lang="less" scoped>
.__header-container{
  top: 0;
  left: 0;
  width: 100%;
  &.fixed{
    position: fixed;
  }
}
.header-plac{
  height: 46PX;
}
</style>
