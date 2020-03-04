<template>
  <div class="mall-order-container">
    <Header
      title="我的订单"
    />
    <van-tabs v-model="active" class="tabs" @change="onChange">
      <van-tab :title="tab" class="tab" v-for="(tab, index) in tabs" :key="index">
        <van-list
          :finished="none"
          v-model="loading"
          finished-text="已经到底了"
          @load="getData"
        >
          <div class="box" v-for="item in list" :key="item.Id">
            <div class="box-header">
              <p class="status">{{convertOrderState(item.OrderState)}}</p>
            </div>
            <div class="list">
              <router-link :to="`/mall/order/${item.Id}`">
                <div class="item">
                  <div class="media">
                      <img :src="`${MEDIA_BASE_URL}${item.TitleImg}`" alt="">
                    </div>
                    <div class="content">
                      <div class="title">
                        <p class="name">{{item.Title}}</p>
                        <p class="money">￥{{item.Price}}</p>
                      </div>
                      <div class="desc">
                        <p class="size">{{item.Name}}</p>
                        <p class="num">x{{item.Count}}</p>
                      </div>
                      <!-- <div class="moneyback">退款成功</div> -->
                    </div>
                </div>
              </router-link>
            </div>
            <!-- <div class="box-bottom">
              <p class="info">共计2件商品 合计：￥<span>598.00</span></p>
            </div> -->
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import Header from '@/components/Header';
import { convertOrderState } from '../../utils/type';
export default {
  components: {
    Header
  },
  data() {
    return {
      tabs: ['全部订单', '待付款', '待收货', '退款订单'],
      active: 0,
      pagin: {
        currentPage: 0,
        pageSize: 10
      },
      list: [],
      loading: false,
      none: false,
    }
  },
  methods: {
    convertOrderState,
    onChange() {
      this.none = false;
      this.pagin.currentPage = 0;
      this.loading = false;
      this.list = [];
      this.getData();
    },
    getData() {
      const { pagin, active } = this;
      this.$http.user.products({
        state: active,
        ...pagin
      }).then(({ Data }) => {
        this.loading = false;
        const list = Data.List;
        if (list.length < pagin.pageSize) {
          this.none = true;
        } else {
          this.pagin.currentPage += 1;
        }
        this.list = this.list.concat(list);
      }).catch(() => {
        this.loading = false;
      })
    }
  }
}
</script>
<style lang="less" scoped>
.mall-order-container{
  background-color: #F2F3F4;
  min-height: 100vh;
}
.tabs{
  .tab{
    padding: 30px 60px 1px;
    .box{
      padding: 40px;
      margin-bottom: 30px;
      border-radius: 10px;
      background-color: #fff;
      .box-header{
        .status{
          text-align: right;
          color: #FF4646;
          font-size: 40px;
        }
      }
      .list{
        padding: 60px 0 0;
        margin-bottom: 10px;
        .item{
          margin-bottom: 72px;
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
      }
      .box-bottom{
        text-align: right;
        font-size: 40px;
        span{
          font-size: 48px;
        }
      }
    }
  }
}
</style>
<style lang="less">
.mall-order-container{
  .van-tabs--line{
    padding-top: 0;
  }
  .tabs{
    .van-tabs__wrap{
      position: sticky;
      top: 66PX;
    }
  }
}
</style>
