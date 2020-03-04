<template>
  <div class="mall-index-container">
    <Statusbar class="bcw" />
    <header class="bcw">
      <router-link to="/mall/order" class="right">我的订单</router-link>
      <h1>柚子商城</h1>
    </header>
    <van-pull-refresh
      v-model="loading" @refresh="onRefresh"
    >
    <section class="search-container bcw">
      <router-link to="/search/index?tab=3" class="search">
        <img src="../../assets/home/sousuo.png" alt="">
        <span>请输入您要的商品</span>
      </router-link>
    </section>
    <MySwiper :list="swipeList" class="swiper-container" />
    <section class="category-list" v-for="category in mallData" :key="category.TypeId">
      <div class="title">
        <h1>{{category.Type}}</h1>
      </div>
      <div class="list">
        <GoodsItem
          v-for="item in category.Products"
          :key="item.ProductId"
          :data="item"
        />
        <router-link :to="`/mall/category/${category.TypeId}`" class="more-link">更多{{category.Type}} > </router-link>
      </div>
    </section>
    <div class="footer-plac"></div>
    </van-pull-refresh>
  </div>
</template>
<script>
import Statusbar from '@/components/Statusbar'
import MySwiper from '@/components/Swipe'
import GoodsItem from '@/components/GoodsItem'
export default {
  components: {
    Statusbar,
    MySwiper,
    GoodsItem,
  },
  data() {
    return {
      mallData: [],
      swipeList: [],
      loading: false
    }
  },
  methods: {
    getData() {
      return this.$http.product.index()
    },
    getBanner() {
      return this.$http.common.banner({
        position: 1
      })
    },
    onRefresh() {
      this.swipeList = []
      this.init();
    },
    init() {
      this.showLoading();
      this.getBanner().then(({ Data }) => {
        this.swipeList = Data.map(item => {
          return {
            url: item.Url,
            img: `${this.MEDIA_BASE_URL}${item.Image}`,
            type: item.Type,
            typeId: item.TypeId
          }
        })
        return this.getData();
      }).then(({ Data }) => {
        this.hideLoading();
        this.loading = false;
        this.mallData = Data;
      })
    }
  },
  created() {
    this.init()
  }
}
</script>
<style lang="less" scoped>
.mall-index-container{
  background-color: #F7F8FA;
  header{
    height: 136px;
    line-height: 112px;
    padding-bottom: 24px;
    .right{
      float: right;
      margin-right: 62px;
      font-size: 44px;
      color: #666;
    }
    h1{
      display: block;
      text-align: center;
      margin: 0 300px;
      font-size: 68px;
    }
  }
  .search-container{
    padding: 24px 60px;
    .search{
      border-radius: 50px;
      background-color: #f7f8fa;
      height: 100px;
      line-height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      color: #999;
      img{
        width: 48px;
        margin-right: 31px;
      }
    }
  }
  
  .category-list{
    margin: 55px 0 70px;
    .banner{
      height: 340px;
      margin-bottom: 40px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .title{
      padding: 50px 0;
      h1{
        margin-left: 62px;
        font-size: 68px;
      }
    }
    .list{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item{
        width: 600px;
        height: 740px;
        margin-bottom: 40px;
        background-color: #fff;
        .media{
          height: 467px;
          margin-bottom: 40px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .info{
          text-align: center;
          padding: 0 60px;
          h2{
            font-size: 48px;
            margin-bottom: 30px;
            line-height: 1.4;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
      .more-link{
        width: 100%;
        display: block;
        height: 144px;
        line-height: 144px;
        text-align: center;
        background-color: #fff;
        font-size: 40px;
      }
    }
  }
}
</style>
<style lang="less">
.mall-index-container{
  .swiper-container{
    height: 730px;
    .van-swipe__indicator {
      background-color: #fff;
      opacity: 1;
      border-radius: 0.08052rem;
      transition: all 300ms;
      height: 0.16103rem;
      width: 0.16103rem;
      &.van-swipe__indicator--active {
        background-color: #FF3F73 !important;
      }
    }
  }
}
</style>
