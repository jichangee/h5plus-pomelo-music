<template>
  <div class="mall-order-confirm-container">
    <Header
      title="确认订单"
      :leftFn="goBack"
    />
    <div class="address-container" v-if="type === 'product'">
      <div class="address" @click="selectAddress">
        <div class="icon">
          <img src="../../assets/mall/detail/icon1.png" alt="">
        </div>
        <div class="content has" v-if="address">
          <div class="info">
            <p class="name">{{address.Name}} <span class="tel">{{address.Phone}}</span></p>
            <p class="address-text">{{address.Address}}</p>
          </div>
          <div class="btns">
            <van-icon name="arrow"></van-icon>
          </div>
        </div>
        <div class="content no" v-else>
          <p>请选择收货地址</p>
          <div class="btns">
            <van-icon name="arrow"></van-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="goods-list">
      <div class="item">
        <div class="media">
          <img :src="`${MEDIA_BASE_URL}${goodsData.TitleImage}`" alt="">
        </div>
        <div class="content">
          <div class="title">
            <p class="name">{{goodsData.Title}}</p>
            <p class="money">￥{{goodsData.Price}}</p>
          </div>
          <div class="desc">
            <p class="size">{{goodsData.desc}}</p>
            <p class="num">x1</p>
          </div>
        </div>
      </div>
      <div class="order-info">
        <div class="line">
          <p class="title">订单总价</p>
          <p class="value">￥{{goodsData.Price}}</p>
        </div>
        <div class="line">
          <p class="title">商城优惠券</p>
          <p class="value">
            <span v-if="couponList.length === 0">暂无可用<van-icon name="arrow"></van-icon></span>
            <span @click="isShowCoupon = true" class="red" v-else-if="!coupon">{{couponList.length}}张可用<van-icon name="arrow"></van-icon></span>
            <span @click="isShowCoupon = true" v-else class="red">-￥{{coupon.Value}}</span>
          </p>
        </div>
      </div>
      <div class="price-info">
        <div class="line">
          <p class="title">实付款</p>
          <p class="value"><i>￥</i>{{price}}</p>
        </div>
      </div>
    </div>
    <a href="javascript:;" class="pay-btn" @click="pay">立即支付</a>
    <van-popup v-model="isShowAddressList" position="bottom">
      <AddressList
        class="address-list-container"
        :style="`height: calc(100vh - 46px - ${globalStatusbarHeight}px);`"
        :list="addressList"
        @add="onAddAddress"
        @edit="onEditAddress"
        @select="onSelectAddress"
      />
    </van-popup>
    <van-popup position="bottom" v-model="isShowAddressEdit">
      <AddressEdit
        :style="`height: 100vh;`"
      />
    </van-popup>
    <van-popup position="bottom" v-model="isShowCoupon">
      <div class="coupon-container">
        <h1>商城优惠券</h1>
        <div class="scrolldiv">
          <div class="list">
            <van-radio-group v-model="couponId">
              <van-cell-group>
                <van-cell :title="`${item.Title} ￥${item.Value}`" @click="selectCoupon(item)" v-for="item in couponList" :key="item.Id">
                  <van-radio :disabled="type === 'product' ? !item.InProduct : !item.InCourse" checked-color="#FF3F73" :name="item.UcId" />
                </van-cell>
                <van-cell title="不使用优惠券" clickable @click="couponId = 0" :key="0">
                  <van-radio checked-color="#FF3F73" :name="0" />
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </div>
        </div>
        <a href="javascript:;" class="confirm" @click="confirmCoupon">完成</a>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Header from '@/components/Header'
import AddressList from '@/components/Address';
import AddressEdit from '@/views/Address/edit';

export default {
  components: {
    Header,
    AddressList,
    AddressEdit
  },
  data() {
    return {
      address: null,
      isShowAddressList: false,
      isShowAddressEdit: false,
      isShowCoupon: false,
      addressList: [],
      form: {},
      goodsData: {},
      couponList: [],
      coupon: null,
      price: 0,
      couponId: '',
      type: 'product'
    }
  },
  methods: {
    selectCoupon(item) {
      this.couponId = item.UcId;
    },
    confirmCoupon() {
      const couponArray = this.couponList.filter((coupon) => coupon.UcId === this.couponId);
      if (couponArray.length === 0) {
        this.coupon = null;
      } else {
        this.coupon = couponArray[0];
      }
      this.price = this.calTotalPrice();
      this.isShowCoupon = false;
    },
    onAddAddress(id = '') {
      if (id === 'add') {
        this.$router.push('/address/edit');
      } else {
        this.$router.push(`/address/edit?id=${id}`);
      }
    },
    selectAddress() {
      this.showLoading();
      this.$http.address.list().then(({ Data }) => {
        this.addressList = Data.map((item, index) => ({
          id: item.Id,
          name: item.Name,
          tel: item.Phone,
          address: `${item.Province}${item.City}${item.County}${item.Address}`
        }))
        this.hideLoading();
      });
      this.isShowAddressList = true;
    },
    onEditAddress({ item, index }) {
      this.onAddAddress(item.id);
    },
    onSelectAddress({ item, index }) {
      this.address = {
        Address: item.address,
        Name: item.name,
        Phone: item.tel
      }
      this.isShowAddressList = false;
    },
    pay() {
      let address = this.address;
      const coupon = this.coupon;
      const couponId = coupon ? coupon.UcId : '';
      const orderInfo = this.$store.getters.orderInfo;
      const form = { ...orderInfo, ...address, couponId, OrderId: '' };
      if (!address && this.type === 'product') {
        this.$toast.fail('请选择收货地址');
        return;
      }
      this.$store.commit('SET_ORDER_INFO', form);
      this.$router.replace(`/mall/detail/order/pay?type=${this.type}`);
    },
    calTotalPrice() {
      let price = this.goodsData.Price;
      if (this.coupon) {
        price -= this.coupon.Value;
      }
      return price <= 0 ? 0.01 : price;
    },
    getCouponList() {
      this.$http.user.coupon().then(({ Data }) => {
        if (this.type === 'product') {
          this.couponList = Data.filter(item => item.InProduct && this.goodsData.Price >= item.Threshold);
        } else {
          this.couponList = Data.filter(item => item.InCourse && this.goodsData.Price >= item.Threshold);
        }
      })
    },
    goBack() {
      if (this.type === 'product') {
        this.$router.replace(`/mall/detail/${this.goodsData.Id}`)
      } else {
        this.$router.replace(`/home/lesson/detail/${this.goodsData.Id}`)
      }
    }
  },
  created() {
    this.goodsData = this.$store.getters.goodsInfo;
    const orderInfo = this.$store.getters.orderInfo;
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
    if (this.type === 'product') {
      this.goodsData.desc = this.goodsData.Items.filter(item => orderInfo.ItemId === item.Id)[0].Name;
    }
    this.price = this.goodsData.Price;
    this.getCouponList();
  }
}
</script>
<style lang="less" scoped>
.address-container{
  padding: 70px 60px;
  .border-bottom(#dedede);
  .address{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .icon{
      width: 108px;
      margin-right: 30px;
      img{
        width: 108px;
        height: 108px;
      }
    }
    .content{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
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
}
.goods-list{
  border-top: 30px solid #F2F3F4;
  padding: 72px 60px;
  .item{
    padding-bottom: 72px;
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
      margin: 0 0 0 288px;
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
  }
  .order-info{
    border: solid #DEDEDE;
    border-width: 1px 0;
    padding: 50px 0;
    .line{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 44px;
      span{
        display: flex;
        align-items: center;
        &.red{
          color: #FF4646;
        }
      }
      &:not(:last-child) {
        margin-bottom: 52px;
      }
    }
  }
  .price-info{
    padding: 50px 0;
    .line{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title{
        font-size: 48px;
      }
      .value{
        font-size: 48px;
        color: #FF4646;
        i{
          font-size: 40px;
          font-style: normal;
        }
      }
    }
  }
}
.pay-btn{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 147px;
  line-height: 147px;
  text-align: center;
  background-color: #FF3F73;
  color: #fff;
  font-size: 52px;
}
.coupon-container{
  padding: 72px 62px 42px;
  h1{
    font-size: 48px;
    text-align: center;
    margin-bottom: 136px;
  }
  .scrolldiv{
    height: 1000px;
    overflow: auto;
    margin-bottom: 40px;
  }
  .confirm{
    width: 1122px;
    height: 126px;
    line-height: 126px;
    color: #fff;
    text-align: center;
    border-radius: 10px;
    font-size: 52px;
    background-color: #FF3F73;
    display: block;
    margin: 0 auto;
  }
}
</style>
<style lang="less">
.mall-order-confirm-container {
  .coupon-container{
    .van-cell-group{
      &:after{
        display: none;
      }
    }
    .van-cell{
      padding: 10px 0;
      &:after{
        display: none;
      }
    }
    .van-radio{
      justify-content: flex-end;
    }
  }
}
</style>
