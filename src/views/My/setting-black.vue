<template>
  <div class="my-setting-black-container">
    <Header title="黑名单" />
    <section class="list">
      <div class="item">
        <p>
          <img src="../../assets/example/2.png" alt="">
          <span>温州林青霞</span>
        </p>
        <a href="javascript:;" class="btn">解除</a>
      </div>
      <div class="item">
        <p>
          <img src="../../assets/example/2.png" alt="">
          <span>温州林青霞</span>
        </p>
        <a href="javascript:;" class="btn">解除</a>
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
section{
  padding: 0 60px;
  .item{
    padding: 48px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:not(:last-child) {
      .border-bottom(#dedede);
    }
    p{
      display: flex;
      align-items: center;
      font-size: 48px;
      img{
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin-right: 21px;
      }
    }
    .btn{
      width:180px;
      height:74px;
      line-height: 74px;
      background:rgba(36,37,44,1);
      border-radius:10px;
      color: #fff;
      text-align: center;
      font-size: 40px;
    }
  }
}
</style>
