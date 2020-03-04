<template>
  <div class="my-setting-auth-container">
    <Header title="认证" />
    <router-link replace :to="`/my/setting/auth/iden?id=${id}`" class="main-btn">我要认证</router-link>
  </div>
</template>
<script>
import Header from '@/components/Header'
export default {
  components: {
    Header
  },
  data() {
    return {
      id: ''
    }
  },
  created() {
    this.id = this.$route.query.id;
  }
}
</script>
<style lang="less" scoped>
.my-setting-auth-container {
  position: relative;
  min-height: 100vh;
  .main-btn{
    position: absolute;
    bottom: 346px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
