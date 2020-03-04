<template>
  <div class="mall-order-pay-container">
    <Header
      title="选择支付方式"
      :leftFn="goBack"
    />
    <div class="pay-list">
      <van-radio-group v-model="payType">
        <van-cell-group>
          <van-cell icon="alipay" title="支付宝支付" clickable @click="payType = 'alipay'">
            <van-radio checked-color="#FF3F73" name="alipay" />
          </van-cell>
          <van-cell icon="wechat" title="微信支付" clickable @click="payType = 'wxpay'">
            <van-radio checked-color="#FF3F73" name="wxpay" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <a href="javascript:;" class="confirm" @click="pay">提交支付</a>
  </div>
</template>
<script>
import Header from '@/components/Header'
import { getPayChannel, checkServices, pay } from '../../utils/pay';
export default {
  components: {
    Header
  },
  data() {
    return {
      payType: 'alipay',
      pays: {},
      form: {},
      type: ''
    }
  },
  methods: {
    pay() {
      this.buy(this.payType);
    },
    buy(type) {
      this.showLoading();
      const { form } = this;
      const channel = this.pays[type];
      checkServices(channel).then(() => {
        if (this.type === 'product') {
          return this.$http.product[type]({
            ...form,
          })
        } else {
          return this.$http.course[type]({
            ...form,
          })
        }
      }).then(({ Data }) => {
        const { Response, OrderId } = Data;
        this.orderId = OrderId;
        if (this.type === 'product') {
          this.form.id = OrderId;
        }
        if (type === 'alipay') {
          const { Body } = Response;
          
          return pay(channel, Body);
        } else {
          return pay(channel, Response);
        }
      }).then(() => {
        this.$toast.success('订单提交成功!');
        this.$router.replace(`/mall/detail/order/finish/${this.form.id}?type=${this.type}`);
      }).catch((e) => {
        this.hideLoading();
        this.$toast.fail('订单提交失败!');
        console.log('订单提交失败', e);
      })
    },
    goBack() {
      this.$router.replace('/mall/detail/order/confirm?type=' + this.type);
    }
  },
  created() {
    this.form = this.$store.getters.orderInfo;
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
  },
  mounted() {
    getPayChannel().then((pays) => {
      this.pays = pays;
    });
  }
}
</script>
<style lang="less" scoped>
.mall-order-pay-container {
  background-color: #F2F3F4;
  min-height: 100vh;
  .confirm{
    display: block;
    margin: 252px auto 0;
    width:1122px;
    height:126px;
    line-height: 126px;
    text-align: center;
    color: #fff;
    font-size: 52px;
    background:rgba(255,63,115,1);
  }
}
</style>
<style lang="less">
.mall-order-pay-container{
  .van-cell__left-icon{
    font-size: 22px;
  }
  .van-icon-alipay{
    color: #06B4FD;
  }
  .van-icon-wechat{
    color: #6BCC03;
  }
  .van-radio{
    justify-content: flex-end;
  }
}
</style>
