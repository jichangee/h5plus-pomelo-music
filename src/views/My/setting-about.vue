<template>
  <div class="my-setting-about-container">
    <Header title="关于我们" />
    <section>
      <div class="logo">
        <img src="../../assets/example/2.png" alt="">
        <p>音乐公园</p>
      </div>
    </section>
  </div>
</template>
<script>
import Header from '@/components/Header'
export default {
  components: {
    Header
  }
}
</script>
<style lang="less" scoped>
.my-setting-about-container{
  .logo{
    width: 334px;
    margin: 97px auto 0;
    img{
      width: 100%;
      height: 334px;
      margin-bottom: 47px;
      border-radius: 28px;
    }
    p{
      font-size: 60px;
      text-align: center;
    }
  }
}
</style>
