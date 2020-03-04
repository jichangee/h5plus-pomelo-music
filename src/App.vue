<template>
  <div id="app">
    <keep-alive>
      <!-- notKeepAlive -->
      <router-view v-if="!$route.meta.notKeepAlive" />
    </keep-alive>
    <router-view v-if="$route.meta.notKeepAlive" />
    <Tabbar v-if="isFirst" />
  </div>
</template>
<script>
import './styles/default.less';
import './styles/common.less';
import './styles/vant.less';
import Tabbar from '@/components/Tabbar';
export default {
  components: {
    Tabbar,
  },
  data() {
    return {
      isFirst: false,
    };
  },
  created() {
    this.isFirst = window.location.hash.split('/').length < 3;
  },
  watch: {
    '$route'(to) {
      // 判断是否为二级页面
      this.isFirst = to.path.split('/').length < 3;
    }
  }
}
</script>

<style lang="less">
#app{
  max-width: 1024PX;
  margin: 0 auto;
}
</style>
