<template>
  <div class="my-setting-safety">
    <Header title="账户与安全" />
    <section>
      <div class="item">
        <p><img src="../../assets/my/safety/shouji.png" alt=""><span>手机号</span></p>
        <router-link to="/my/setting/safety/mobile" class="btn">更换</router-link>
      </div>
      <div class="item">
        <p><img src="../../assets/my/safety/weixin.png" alt=""><span>微信</span></p>
        <a href="javascript:;" class="btn undo">解绑</a>
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 45px 8px;
    &:not(:last-child) {
      .border-bottom(#dedede);
    }
    p{
      display: flex;
      align-items: center;
      font-size: 48px;
    }
    img{
      width: 66px;
      height: 66px;
      margin-right: 20px;
    }
    .btn{
      width: 180px;
      height: 74px;
      line-height: 74px;
      text-align: center;
      color: #fff;
      background: linear-gradient(90deg,rgba(255,148,95,1) 0%,rgba(255,63,99,1) 100%);
      border-radius: 10px;
      font-size: 40px;
      &.undo{
        background: transparent;
        border: 1PX solid #dedede;
        color: #999;
        line-height: 72px;
      }
    }
  }
}
</style>
