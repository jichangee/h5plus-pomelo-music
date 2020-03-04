<template>
  <div class="my-setting-safety-mobile-container">
    <Header :title="type === 0 ? '绑定手机' : '更换手机'" />
    <p class="tip" v-if="type === 0">根据《网络安全法》规定，需要备注您的手机信息</p>
    <p class="tip2" v-else>请验证您的新手机号</p>
    <section>
      <div class="inputdiv">
        <input type="tel" placeholder="请输入手机号" v-model="mobile" maxlength="11">
      </div>
      <div class="inputdiv hasbtn">
        <input type="tel" placeholder="请输入验证码">
        <a href="javascript:;" class="btn" @click="sendSms">{{sendSmsText}}</a>
      </div>
    </section>
    <van-button class="confirm" :class="{'actived': mobile.length === 11}">绑定</van-button>
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
      mobile: '',
      sendSmsText: '获取验证码',
      type: 0, // 0 -- 绑定手机  1 -- 更换手机
    }
  },
  methods: {
    sendSms() {
      if (this.sendSmsText !== '获取验证码' && this.sendSmsText !== '重新发送') {
        return;
      }
      let s = 60;
      this.sendSmsText = `${s}s重发`;
      const timer = setInterval(() => {
        s -= 1;
        if (s === 0) {
          clearInterval(timer);
          this.sendSmsText = '重新发送';
          return;
        }
        this.sendSmsText = `${s}s重发`;
      }, 1000);
    }
  }
}
</script>
<style lang="less" scoped>
.my-setting-safety-mobile-container{
  .tip,
  .tip2{
    margin-top: 113px;
    font-size: 40px;
    color: #666;
    text-align: center;
  }
  .tip2{
    text-align: left;
    padding: 0 147px;
  }
  section{
    margin-top: 150px;
    padding: 0 148px;
    .inputdiv{
      padding: 30px 0;
      margin-bottom: 117px;
      .border-bottom(#FFAAB9);
      input{
        width: 100%;
      }
      &.hasbtn{
        display: flex;
        align-items: center;
        justify-content: space-between;
        input{
          width: 645px;
        }
        .btn{
          width: 298px;
          text-align: center;
          font-size: 48px;
          color: #FF4163;
          .border-left(#FFAAB9);
        }
      }
    }
  }
  .confirm{
    display: block;
    margin: 177px auto 0;
    width:926px;
    height:140px;
    line-height: 140px;
    text-align: center;
    background:linear-gradient(90deg,rgba(255,184,151,1) 0%,rgba(255,131,153,1) 100%);
    border-radius:70px;
    font-size: 52px;
    color: #fff;
    transition: all 300ms;
    pointer-events: none;
    &.actived{
      background:linear-gradient(90deg,rgba(255,96,79,1) 0%,rgba(255,148,95,1) 0%,rgba(255,63,99,1) 100%);
    }
  }
}
</style>
