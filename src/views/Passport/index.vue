<template>
  <div class="passport-index-container">
    <div class="logo-container">
      <img src="../../assets/common/logo.png" class="logo" alt="">
      <p>音乐公园</p>
    </div>
    <div class="login-contianer">
      <a href="javascript:;" class="wechat-btn" @click="wxLogin">
        <img src="../../assets/passport/weixin.png" alt>微信登录
      </a>
      <router-link replace to="/passport/mobile" class="other-btn">更多登录方式</router-link>
    </div>
  </div>
</template>
<script>
import { setLogin } from '../../utils/auth';
export default {
  methods: {
    _getServices: function(fun) {
      plus.oauth.getServices(
        function(services) {
          fun(services);
        },
        function(e) {
          console.log("获取分享服务列表失败：" + e.message + " - " + e.code);
          return null;
        }
      );
    },
    wxLogin() {
      this.showLoading();
      this._getServices((auths) => {
        const index = auths.findIndex(item => item.id === 'weixin');
        if (index === -1) {
          this.$toast.fail('请先安装微信');
          return;
        }
        var s = auths[index];
        if (!s.authResult) {
          s.login(
            (e) => {
              // 获取登录操作结果
              s.getUserInfo(
                (e) => {
                  const info = s.userInfo;
                  const form = {
                    OpenId: info.openid,
                    NickName: info.nickname,
                    Sex: info.sex,
                    HeadImgUrl: info.headimgurl
                  }
                  this.$store.commit('SET_WXINFO', form);
                  this.postWx(form);
                },
                (e) => {
                  this.hideLoading();
                  this.$toast.fail(`"获取用户信息失败：" + e.message + " - " + e.code`)
                }
              );
            },
            (e) => {
              this.hideLoading();
              this.$toast.fail(`用户取消或者认证失败`)
            }
          );
        } else {
          const form = this.$store.getters.wxInfo;
          this.postWx(form);
          console.log("已经登录认证！");
        }
      });
    },
    checkIsBind(openId) {
      return this.$http.user.isBind({
        openId
      })
    },
    postWx(form) {
      console.log(form.OpenId);
      this.checkIsBind(form.OpenId).then(({ Data }) => {
        if (Data) {
          this.$http.user.wxSignin({
            ...form
          }).then(() => {
            setLogin();
            const directUrl = this.$store.getters.directUrl;
            this.$router.replace(directUrl);
          })
        } else {
          this.$store.commit('SET_ISBIND', true);
          this.$router.push('/passport/mobile');
        }
      }).catch(() => {
        this.hideLoading();
      })
    }
  },
  created() {
    const { directUrl } = this.$route.query;
    this.$store.commit("SET_DIRECT_URL", directUrl);
  }
};
</script>
<style lang="less" scoped>
.passport-index-container {
  height: 100vh;
  overflow: hidden;
  background-image: url("../../assets/passport/index-bg.png");
  background-size: cover;
  background-position: center center;
  position: relative;
  .logo-container {
    padding-top: 347px;
    width: 268px;
    margin: 0 auto;
    .logo {
      width: 268px;
      height: 268px;
      margin-bottom: 60px;
      background-color: #fff;
      border-radius: 15px;
    }
    p {
      font-size: 60px;
      color: #fff;
    }
  }
  .login-contianer {
    position: absolute;
    width: 100%;
    bottom: 264px;
    text-align: center;
    a {
      display: block;
      margin: 0 auto;
      &.wechat-btn {
        width: 625px;
        height: 116px;
        line-height: 116px;
        color: #fff;
        background: rgba(0, 200, 0, 1);
        border-radius: 58px;
        font-size: 48px;
        margin-bottom: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 80px;
          margin-right: 25px;
        }
      }
      &.other-btn {
        font-size: 48px;
        color: #fff;
      }
    }
  }
}
</style>
