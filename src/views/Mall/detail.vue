<template>
  <div class="mall-detail-container">
    <Header
      title="产品详情"
    />
    <Swiper
      :list="swipeList"
       class="swiper-container"
    />
    <section class="goods-title bcw">
      {{goodsData.Title}}
    </section>
    <section class="goods-size bcw">
      <h1>请选择规格</h1>
      <van-radio-group
        v-model="form.ItemId"
        class="list"
      >
        <van-radio
          :name="item.Id"
          class="item"
          v-for="item in typeList"
          :key="item.Id"
          @click="onClick(item)"
        >{{item.Name}}</van-radio>
      </van-radio-group>
    </section>
    <section class="goods-pay">
      <div class="goods-info">
        <p class="price">￥{{selectItem.Price}}</p>
        <p>库存：{{selectItem.Count}}</p>
      </div>
      <van-button class="btn" :loading="loading" @click="submit">立即购买</van-button>
      <div class="info">
        <p>邮费：包邮</p>
        <p>发货时间：订单付款后1个工作日内</p>
      </div>
    </section>
    <section class="tips">
      <h1>温馨提示</h1>
      <p>收到后请务必当面验收，如有问题请技术联系在线客服或拨打400-8888-8888反馈</p>
    </section>
    <!-- <section class="goods-message">
      <h1>商品信息</h1>
      <van-collapse v-model="activeNames" class="list">
        <van-collapse-item title="常见问题" name="1" icon="question-o">
          常见问题常见问题常见问题常见问题常见问题常见问题
        </van-collapse-item>
        <van-collapse-item title="包装清单" name="2" icon="orders-o">
          包装清单包装清单包装清单包装清单包装清单包装清单包装清单
        </van-collapse-item>
        <van-collapse-item title="产品描述" name="3" icon="notes-o">
          钢琴(意大利语:pianoforte)是西洋古典音乐中的一种键盘乐器，有"乐器之王"的美称。由88个琴键(52个白键，36个黑键)和金属弦音板组成。意大利人巴托罗密欧·克里斯多佛利(Bartolomeo Christofori，1655-1731) 在1709年发明了钢琴。
        </van-collapse-item>
      </van-collapse>
    </section> -->
    <van-action-sheet
      v-model="isShowPayType"
      :actions="actionsPayType"
      @select="onSelectPayType"
    />
  </div>
</template>
<script>
import Swiper from '@/components/Swipe';
import Header from '@/components/Header';
import AddressList from '@/components/Address';
import AddressEdit from '@/views/Address/edit';
import appConfig from '../../config'
import { getPayChannel, checkServices, pay } from '../../utils/pay';
export default {
  components: {
    Swiper,
    Header,
    AddressList,
    AddressEdit
  },
  data() {
    return {
      id: '',
      isShowPayType: false,
      form: {
        Id: '',
        ItemId: '',
        Count: 1,
        Address: '',
        Name: '',
        Phone: '',
      },
      typeList: [],
      goodsData: {},
      loading: false,
      activeNames: [],
      swipeList: [],
      selectItem: {},
      isShowAddressList: false,
      isShowAddressEdit: false,
      addressList: [],
      pays: {},
      orderId: '',
      actionsPayType: [
        {
          name: '支付宝支付',
          type: 'alipay'
        },
        {
          name: '微信支付',
          type: 'wxpay'
        },
      ]
    }
  },
  methods: {
    getData(id) {
      return this.$http.product.detail({
        id
      })
    },
    getSwipeList(images) {
      return images.map(item => ({
        img: this.MEDIA_BASE_URL + item,
        url: ''
      }));
    },
    onClick(item) {
      this.form.ItemId = item.Id;
      this.selectItem = item;
    },
    submit() {
      if (this.selectItem.Count === 0) {
        this.$toast.fail('库存不足');
        return;
      }
      const goodsData = { ...this.goodsData };
      goodsData.Price = this.selectItem.Price;
      this.$store.commit('SET_ORDER_INFO', this.form);
      this.$store.commit('SET_GOODS_INFO', goodsData);
      this.$router.replace('/mall/detail/order/confirm');
      // this.selectAddress();
    },
    selectPayType(item) {
      this.isShowPayType = true;
    },
    onSelectPayType(item) {
      this.buy(item.type);
      this.isShowPayType = false;
    },
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.showLoading();
      this.form.Id = id;
      this.getData(id).then(({ Data }) => {
        this.hideLoading();
        this.swipeList = this.getSwipeList(Data.Images)
        this.typeList = Data.Items;
        this.onClick(Data.Items[0]);
        this.goodsData = Data;
      })
    } else {
      this.back();
    }
  },
}
</script>
<style lang="less" scoped>
.mall-detail-container{
  background-color: #F7F8FA;
}
.swiper-container{
  height: 730px;
}
.goods-title{
  padding: 0;
  height: 152px;
  line-height: 152px;
  text-align: center;
  font-size: 52px;
}
section{
  margin-top: 30px;
  padding: 51px 60px 68px;
  background-color: #ffffff;
  h1{
    font-size: 52px;
    padding-bottom: 60px;
    .border-bottom(#dedede);
  }
}
.goods-size{
  padding-bottom: 8px;
  .list{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px 0;
    .item{
      width: 100%;
      margin: 40px 0;
    }
  }
}
.goods-pay{
  .goods-info{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 60px;
    .price{
      font-size: 52px;
    }
  }
  .btn{
    width:1122px;
    height:126px;
    background:rgba(255,63,115,1);
    border-radius:10px;
    margin: 0 auto;
    display: block;
    border: none;
    color: #fff;
    font-size: 52px;
  }
  .info{
    margin-top: 90px;
    p{
      &:not(:last-child) {
        margin-bottom: 30px;
      }
    }
  }
}
.tips{
  p{
    margin-top: 60px;
    color: #666;
    line-height: 1.47;
  }
}
.goods-message{
  h1{
    &::after{
      display: none;
    }
  }
}
</style>
<style lang="less">
.mall-detail-container{
  .van-swipe__indicator{
    width: .2415rem;
    height: .2415rem;
    margin: 0 .2rem;
    opacity: 1 !important;
    background-color: #fff !important;
  }
  .van-swipe__indicator--active{
    background-color: #ff3f73 !important;
  }
}
</style>
