<template>
  <div class="passport-mobile-container">
    <Statusbar />
    <header>
      <a href="javascript:;" @click="goBack" class="back">
        <van-icon name="arrow-left"></van-icon>
      </a>
    </header>
    <section>
      <h1>免密码登录</h1>
      <p>未注册手机验证后自动注册</p>
      <div class="inputdiv">
        <img src="../../assets/passport/shouji.png" class="icon" alt="">
        <input type="tel" maxlength="11" placeholder="请输入手机号码" v-model="mobile">
      </div>
      <van-button
        @click="confirm"
        class="confirm"
        type="primary"
        :class="{'actived': mobile.length === 11}"
        :loading="loading"
      >
        <img src="../../assets/passport/jiantou.png" alt="">
      </van-button>
    </section>
  </div>
</template>
<script>
import Statusbar from '@/components/Statusbar';
export default {
  components: {
    Statusbar
  },
  data() {
    return {
      mobile: '',
      loading: false,
    };
  },
  methods: {
    goBack() {
      this.$store.commit('SET_ISBIND', false);
      this.restartPage();
      this.$router.replace('/passport/index')
    },
    confirm() {
      const { mobile } = this;
      console.log(mobile);
      if (mobile.length === 11) {
        this.loading = true;
        this.$http.sms.get({
          Phone: mobile
        }).then((res) => {
          this.$store.commit('SET_MOBILE', mobile);
          this.$store.commit('SET_TOKEN', res.Data.Token);
          this.loading = false;
          this.$toast.success('验证码已发送');
          this.$router.replace('/passport/sms');
          console.log(res);
        }).catch(() => {
          this.loading = false;
        })
      } else {
        this.$toast.fail('手机号格式不正确1');
      }
    }
  },
  created() {
    if (this.$store.getters.isBind) {
      this.$toast('该微信尚未绑定手机号，请先绑定手机号码');
    }
  },
  watch: {
    'mobile'() {

    }
  }
}
</script>
<style lang="less" scoped>
.passport-mobile-container{
  height: 100vh;
  overflow: hidden;
  background-image: url('../../assets/passport/bg.png');
  background-size: cover;
  header{
    padding: 26px 80px 0;
    margin-bottom: 190px;
    .back{
      font-size: 80px;
      color: #333;
    }
  }
  section{
    padding: 0 60px;
    h1{
      font-size: 78px;
      margin-bottom: 55px;
    }
    p{
      font-size: 40px;
      color: #999;
      margin-bottom: 160px;
    }
    .inputdiv{
      border-radius: 63px;
      border: 1PX solid #d8d8d8;
      height: 133px;
      padding: 0 85px;
      display: flex;
      align-items: center;
      .icon{
        width: 74px;
        // height: 65px;
        margin-right: 12px;
      }
      input{
        background: transparent;
        width: 100%;
      }
    }
    .confirm{
      width: 202px;
      height: 202px;
      display: block;
      margin: 165px auto 0;
      background: #dedede;
      border-radius: 50%;
      transition: all 300ms;
      position: relative;
      &.actived{
        background:linear-gradient(45deg,rgba(255,63,99,1) 0%,rgba(255,148,95,1) 100%);
      }
      img{
        width: 98px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
      }
    }
  }
}
</style>
