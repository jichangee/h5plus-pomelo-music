<template>
  <div class="my-setting-container">
    <Header title="设置" />
    <!-- <section>
      <van-cell title="账户与安全" is-link to="/my/setting/safety" />
    </section> -->
    <section>
      <van-cell title="关于我们" is-link to="/my/setting/about" />
      <van-cell title="帮助及反馈" is-link to="/my/setting/feedback" />
    </section>
    <section>
      <van-cell title="当前版本" value="1.0.0" />
      <!-- <van-cell title="清除缓存" value="40.5M" is-link /> -->
    </section>
    <a href="javascript:;" class="logout" @click="logout">退出登录</a>
  </div>
</template>
<script>
import Header from '@/components/Header'
import { clearAuth } from '../../utils/auth';
export default {
  components: {
    Header
  },
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
    logout() {
      this.$http.user.signout().then(() => {
        clearAuth();
        this.$router.push('/passport/index')
      })
      try {
        this._getServices((auths) => {
          var s = auths[0];
          console.log(s);
          s.logout((e) => {
            console.log('注销登录成功');
          }, (e) => {
            console.log('注销登录失败');
            console.log(e);
          });
        })
      } catch (error) {
        
      }
    }
  }
}
</script>
<style lang="less" scoped>
.my-setting-container{
  background-color: #f2f3f4;
  min-height: 100vh;
  section{
    margin-top: 60px;
  }
  .logout{
    width: 926px;
    height: 140px;
    line-height: 140px;
    text-align: center;
    background: linear-gradient(90deg,rgba(255,96,79,1) 0%,rgba(255,148,95,1) 0%,rgba(255,63,99,1) 100%);
    border-radius: 70px;
    display: block;
    margin: 240px auto 0;
    font-size: 52px;
    color: #fff;
  }
  .name{
    margin: 100px 0 0;
    text-align: center;
  }
}
</style>
<style lang="less">
.my-setting-container{
  .van-cell{
    line-height: 35px;
    font-size: 0.38647rem;
  }
  .van-cell__left-icon, .van-cell__right-icon{
    line-height: 35px;
    font-size: 0.46647rem;
  }
}
</style>
