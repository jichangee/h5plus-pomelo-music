<template>
  <div class="mall-order-finish-container">
    <Header
      title="支付完成"
      rightText="完成"
      :rightFn="finish"
    />
    <div class="con">
      <img class="img" src="../../assets/mall/detail/dui.png" alt="">
      <p>已完成支付！</p>
      <router-link v-if="type === 'product'" replace :to="`/mall/order/${id}`">查看订单</router-link>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header'
export default {
  components: {
    Header,
  },
  data() {
    return {
      id: '',
      type: ''
    }
  },
  methods: {
    finish() {
      if (this.type === 'product') {
        this.$router.replace('/mall')
      } else {
        this.$router.replace(`/home/lesson/detail/${this.id}`)
      }
    }
  },
  created() {
    this.id = this.$route.params.id;
    console.log(this.id);
    this.type = this.$route.query.type;
  }
}
</script>
<style lang="less" scoped>
.con{
  padding-top: 245px;
  .img{
    width: 178px;
    height: 178px;
    margin: 0 auto 97px;
    display: block;
  }
  p{
    font-size: 52px;
    margin-bottom: 93px;
    text-align: center;
  }
  a{
    display: block;
    margin: 0 auto;
    width:300px;
    height:104px;
    line-height: 102px;
    text-align: center;
    font-size: 40px;
    color: #999;
    border:1px solid rgba(222,222,222,1);
    border-radius:52px;
  }
}
</style>
