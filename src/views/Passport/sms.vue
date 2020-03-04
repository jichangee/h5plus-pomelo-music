<template>
  <div class="passport-sms-container">
    <Statusbar />
    <header>
      <a href="javascript:;" @click="goBack" class="back">
        <van-icon name="arrow-left"></van-icon>
      </a>
    </header>
    <section>
      <h1>输入验证码</h1>
      <p>已发送验证码至 {{mobile}}</p>
      <div class="inputdiv">
        <van-password-input
          :value="value"
          :mask="false"
          :length="4"
          @focus="showKeyboard = true"
        />
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"
        />
      </div>
      <a
        href="javascript:;"
        @click="sendSms"
        class="send-sms"
        :class="{'able': sendText === '重新发送'}"
      >{{sendText}}</a>
    </section>
  </div>
</template>
<script>
import Statusbar from '@/components/Statusbar';
import { setLogin } from '../../utils/auth';
export default {
  components: {
    Statusbar
  },
  data() {
    return {
      showKeyboard: true,
      value: '',
      mobile: '',
      token: '',
      sendText: '重新发送（30s）'
    };
  },
  methods: {
    goBack() {
      this.restartPage();
      this.$router.replace('/passport/mobile')
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 4);
      if (this.value.length === 4) {
        this.submit();
        // this.$router.replace('/');
      }
    },
    submit() {
      const { value, mobile, token } = this;
      const isBind = this.$store.getters.isBind;
      this.showLoading();
      if (isBind) {
        const form = this.$store.getters.wxInfo;
        form.Phone = mobile;
        form.Token = token;
        form.Code = value;
        this.$http.user.wxSignin({
          ...form
        }).then(() => {
          setLogin();
          this.hideLoading();
          const directUrl = this.$store.getters.directUrl;
          this.value = '';
          this.$router.replace(directUrl);
          this.$store.commit('SET_ISBIND', false);
        }).catch((err) => {
          this.hideLoading();
          this.value = '';
        })
      } else {
        this.$http.user.signin({
          Phone: mobile,
          Token: token,
          Code: value
        }).then((res) => {
          setLogin();
          this.hideLoading();
          const directUrl = this.$store.getters.directUrl;
          this.value = '';
          this.$router.replace(directUrl);
          this.$store.commit('SET_ISBIND', false);
        }).catch((err) => {
          this.hideLoading();
          // this.$toast(err.Message);
          this.value = '';
        })
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    sendSms() {
      if (this.sendText === '重新发送') {
        this.$http.sms.get({
          Phone: this.mobile
        }).then(() => {
          this.timeDown();
        })
      }
    },
    timeDown() {
      let s = 30;
      this.sendText = `重新发送（${s}s）`
      const timer = setInterval(() => {
        s -= 1;
        this.sendText = `重新发送（${s}s）`
        if (s === 0) {
          clearInterval(timer);
          this.sendText = '重新发送';
        }
      }, 1000);
    }
  },
  created() {
    const mobile = this.$store.getters.mobile;
    if (!mobile) {
      this.restartPage();
      this.$router.replace('/passport/mobile');
    } else {
      this.mobile = mobile;
      this.token = this.$store.getters.token;
      this.timeDown();
    }
    setTimeout(() => {
      this.value = '0000'
      this.submit();
    }, 500);
  }
}
</script>
<style lang="less" scoped>
.passport-sms-container{
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
      margin-bottom: 79px;
    }
    .send-sms{
      float: right;
      font-size: 42px;
      color: #999;
      &.able{
        color: #333;
      }
    }
  }
}
</style>
