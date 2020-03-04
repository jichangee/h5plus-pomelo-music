<template>
  <div class="mall-order-detail-container">
    <Header
      title="订单详情"
    />
    <section class="address-container">
      <div class="address">
        <div class="icon">
          <img src="../../assets/mall/detail/icon1.png" alt="">
        </div>
        <div class="content">
          <p class="name">{{data.Name}} <span class="tel">{{data.Phone}}</span></p>
          <p class="address-text">{{data.Address}}</p>
          <div class="btns">
            <!-- <a href="javascript:;" class="btn1">修改地址</a> -->
          </div>
        </div>
      </div>
      <div class="address-log">
        <div class="icon">
          <img src="../../assets/mall/detail/icon2.png" alt="">
        </div>
        <div class="content">
          <p class="desc">{{convertOrderState(data.OrderState)}}</p>
          <div class="right">
            <a v-if="data.ExpressNo" href="javascript:;" class="btn1" @click="isShowExpress">查看物流</a>
            <a v-else-if="data.OrderState === 0" href="javascript:;" class="btn1" @click="isShowPayType = true">立即付款</a>
          </div>
        </div>
      </div>
    </section>
    <section class="goods-container">
      <div class="list">
        <div class="item">
          <div class="media">
            <img :src="`${MEDIA_BASE_URL}${data.TitleImg}`" alt="">
          </div>
          <div class="content">
            <div class="title">
              <p class="name">{{data.Title}}</p>
              <p class="money">￥{{data.PerPrice | fixPrice}}</p>
            </div>
            <div class="desc">
              <p class="size">{{data.ProductName}}</p>
              <p class="num">x{{data.Count}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="info">
        <div class="line">
          <p>商品总价</p>
          <p>￥{{(data.PerPrice * data.Count) | fixPrice}}</p>
        </div>
        <!-- <div class="line">
          <p>运费</p>
          <p>￥0.00</p>
        </div> -->
        <div class="line">
          <p>积分抵扣</p>
          <p>-￥{{data.Points | fixPrice}}</p>
        </div>
        <div class="line">
          <p>优惠券抵扣</p>
          <p>-￥{{data.Coupon | fixPrice}}</p>
        </div>
        <div class="line total">
          <p>订单总价</p>
          <p>￥{{data.Price | fixPrice}}</p>
        </div>
      </div>
      <div class="finish-money">
        <p>实付款</p>
        <p class="money">￥<span>{{data.Price | fixPrice}}</span></p>
      </div>
    </section>
    <section class="order-info">
      <h1>订单信息</h1>
      <div class="line">
        <p>订单编号：{{data.OrderNo}}</p>
        <a href="javascript:;" class="copy" @click="copy">复制</a>
      </div>
      <div class="line">
        <p>下单时间：{{data.OrderDate | formatDate}}</p>
      </div>
      <div class="line" v-if="data.PayDate">
        <p>付款时间：{{data.PayDate | formatDate}}</p>
      </div>
      <div class="line" v-if="data.DeliverDate">
        <p>发货时间：{{data.DeliverDate | formatDate}}</p>
      </div>
      <div class="line memo">
        <p>
          <span class="title">买家留言：</span>
          <span class="content">{{data.UserNote || '无'}}</span>
        </p>
      </div>
    </section>
    <div class="footer-plac"></div>
    <div class="footer" v-if="data.OrderState !== 5">
      <!-- <a href="javascript:;" class="btn">联系客服</a> -->
      <a href="javascript:;" class="btn" @click="service">申请售后</a>
    </div>
    <van-popup v-model="isShowExpress">
      <div class="express-container">
        <p>快递公司：<span>{{data.Express}}</span></p>
        <p>快递单号：<span>{{data.ExpressNo}}</span></p>
      </div>
    </van-popup>
    <van-dialog
      v-model="isShowService"
      title="请输入备注"
      show-cancel-button
      @confirm="onServiceConfirm"
    >
      <div class="service-container">
        <input type="text" v-model="serviceForm.AfterSaleDeclare">
      </div>
    </van-dialog>
    <van-action-sheet
      v-model="isShowServiceAction"
      :actions="actions"
      @select="onSelect"
    />
    <van-action-sheet
      v-model="isShowPayType"
      :actions="actionsPayType"
      @select="onSelectPayType"
    />
  </div>
</template>
<script>
import Header from '@/components/Header';
import { convertOrderState } from '../../utils/type';
import { getPayChannel, checkServices, pay } from '../../utils/pay';

export default {
  components: {
    Header
  },
  data() {
    return {
      pays: {},
      data: {},
      actionsPayType: [
        {
          name: '支付宝支付',
          type: 'alipay'
        },
        {
          name: '微信支付',
          type: 'wxpay'
        },
      ],
      isShowPayType: false,
      isShowExpress: false,
      isShowService: false,
      isShowServiceAction: false,
      serviceForm: {
        AfterSaleDeclare: '',
        AfterSaleType: '',
        id: ''
      },
      actions: [
        {name: '申请退款', type: '1'},
        {name: '申请退货', type: '2'},
      ]
    }
  },
  filters: {
    formatDate: value => value && value.replace('T', ' ').substring(0, 19),
    fixPrice: value => value && value.toFixed(2)
  },
  methods: {
    convertOrderState,
    getData(id) {
      this.showLoading();
      this.$http.user.productDetail({
        id
      }).then(({ Data }) => {
        this.hideLoading();
        this.data = Data;
      }).catch(() => {
        this.hideLoading();
      })
    },
    onSelect(item) {
      const { type } = item;
      this.serviceForm.AfterSaleType = type;
      this.isShowService = true;
      this.isShowServiceAction = false;
    },
    onServiceConfirm() {
      const { serviceForm } = this;
      this.showLoading();
      this.$http.user.service({
        ...serviceForm
      }).then(() => {
        this.hideLoading();
        this.$toast('申请成功');
        this.isShowService = false;
        this.getData(this.serviceForm.id);
      }).catch(() => {
        this.hideLoading();
        this.$toast('申请失败');
      })
    },
    onSelectPayType(item) {
      this.buy(item.type);
      this.isShowPayType = false;
    },
    buy(type) {
      this.showLoading();
      const channel = this.pays[type];
      console.log(channel, type);
      checkServices(channel).then(() => {
        return this.$http.product[type]({
          Id: this.data.ProductId,
          OrderId: this.data.Id,
        })
      }).then(({ Data }) => {
        const { Response, OrderId } = Data;
        const { Body } = Response;
        this.orderId = OrderId;
        return pay(channel, Body);
      }).then(() => {
        this.$toast.success('订单提交成功!');
        setTimeout(() => {
          this.getData(this.serviceForm.id);
        }, 10);
      }).catch((e) => {
        this.hideLoading();
        this.$toast.fail('订单提交失败!');
      })
    },
    service() {
      this.isShowServiceAction = true;
    },
    copy() {
      this.$copyText(this.data.OrderNo).then( e => {
        this.$toast.success('已复制')
      }, e => {
        this.$toast.fail('复制失败')
      })
    }
  },
  created() {
    const id = this.$route.params.id;
    this.serviceForm.id = id;
    console.log('id', id);
    this.getData(id);
  },
  mounted() {
    getPayChannel().then((pays) => {
      console.log(pays);
      this.pays = pays;
    });
  }
}
</script>
<style lang="less" scoped>
.mall-order-detail-container{
  min-height: 100vh;
  background-color: #f2f3f4;
}
.footer-plac{
  height: 146px;
  background-color: #fff;
}
.footer{
  .border-top(#dedede);
  position: fixed;
  height: 146px;
  background-color: #fff;
  left: 0;
  width: 100%;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a{
    height: 146px;
    line-height: 146px;
    width: 100%;
    text-align: center;
    font-size: 48px;
    &:active{
      background-color: #f1f1f1;
    }
    &:not(:last-child) {
      .border-right(#dedede);
    }
  }
}
section{
  padding: 0 60px;
  background-color: #fff;
  margin-bottom: 30px;
}
.btn1{
  display: inline-block;
  width:241px;
  height:91px;
  line-height: 89px;
  text-align: center;
  border:1PX solid #999;
  border-radius:45px;
  color: #999;
  font-size: 40px;
}
.address-container{
  padding-top: 70px;
  .address,
  .address-log{
    padding-bottom: 45px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .border-bottom(#dedede);
    .icon{
      width: 108px;
      margin-right: 30px;
      img{
        width: 108px;
        height: 108px;
      }
    }
    .content{
      .name{
        font-size: 44px;
        display: flex;
        align-items: center;
        margin-bottom: 35px;
        span{
          display: inline-block;
          margin-left: 46px;
          font-size: 40px;
          color: #999;
        }
      }
      .address-text{
        line-height: 1.47;
        font-size: 44px;
      }
      .btns{
        text-align: right;
      }
    }
  }
  .address-log{
    padding: 70px 0;
    &:after{
      display: none;
    }
    .content{
      height: 138px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .desc{
        font-size: 44px;
      }
      .time{
        font-size: 40px;
        color: #999;
      }
    }
  }
}
.goods-container{
  padding-top: 56px;
  .list{
    .item{
      margin-bottom: 56px;
      .media{
        width: 260px;
        height: 260px;
        float: left;
        background-color: #f1f1f1;
        img{
          width: 100%;
          height: 100%;
          border-radius: 25px;
        }
      }
      .content{
        margin: 0 0 56px 288px;
        padding-top: 40px;
        height: 260px;
        .title,
        .desc{
          font-size: 41px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 59px;
          .name,
          .size{
            width: 500px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .desc{
          font-size: 37px;
          color: #999;
          margin-bottom: 50px;
        }
        .moneyback{
          font-size: 40px;
          text-align: right;
          color: #FF8745;
        }
      }
      .btns{
        text-align: right;
        .btn{
          display: inline-block;
        }
      }
    }
  }
  .info{
    margin-top: 16px;
    padding-bottom: 10px;
    .border-bottom(#dedede);
    .line{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      font-size: 40px;
      color: #999;
      &.total{
        margin-top: 40px;
        font-size: 44px;
        color: #333;
      }
    }
  }
  .finish-money{
    padding: 40px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 48px;
    .money{
      font-size: 40px;
      color: #FF4646;
      span{
        font-size: 48px;
      }
    }
  }
}
.order-info{
  padding: 60px;
  margin-bottom: 0;
  h1{
    font-size: 48px;
    margin-bottom: 85px;
    font-weight: 500;
  }
  .line{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
    font-size: 44px;
    color: #666;
    .copy{
      color: #ff4646;
      font-size: 44px;
    }
    &.memo{
      p{
        .title{
          width: 220px;
          float: left;
          line-height: 1.47;
        }
        .content{
          display: block;
          margin: 0 0 0 220px;
          line-height: 1.47;
        }
      }
    }
  }
}
.service-container{
  margin: 80px 20px;
  .border-bottom(#dedede);
  input{
    display: block;
    width: 100%;
    text-align: center;
    padding: 15px 0;
  }
}
</style>
