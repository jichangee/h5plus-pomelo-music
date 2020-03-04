<template>
  <div class="my-setting-feedback-container">
    <Header title="反馈与帮助" />
    <section class="list">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="音乐公园客服热线与其他？" name="1">
          <p>客服热线：0571-88888888</p>
          <p>客服微信：youziyinyue</p>
          <p>客服邮箱：servic@youziyinyue.com</p>
          <p>服务时间：周一至周六   早上9:00 - 晚上21:00</p>
        </van-collapse-item>
        <van-collapse-item title="如何更改手机号？" name="2">
          进入“我的-设置-账户与安全”，点击更改手机号，即可更改。
        </van-collapse-item>
        <van-collapse-item title="如何更改手机号？" name="3">
          进入“我的-设置-账户与安全”，点击更改手机号，即可更改。
        </van-collapse-item>
      </van-collapse>
    </section>
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
      activeNames: []
    }
  }
}
</script>
<style lang="less" scoped>
section{
  border-top: 30px solid #f2f3f4;
}
</style>
