<template>
  <div class="mall-category-container">
    <Header
      title="全部商品"
    />
    <div class="category-container">
      <div class="category-list">
        <swiper :options="swiperOption">
          <swiper-slide class="item" v-for="item in typeList" :key="item.Id">
            <a
              href="javascript:;"
              @click="selectType(item.Id)"
              :class="{'selected': item.Id === categoryId}"
            >
              <img :src="item.img" alt="">
              <p>{{item.title}}</p>
            </a>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- <section class="banner">
      <img src="../../assets/example/3.png" alt="">
    </section> -->
    <section class="goods-list">
      <van-list
        :finished="none"
        v-model="loading"
        finished-text="没有更多了"
        @load="loadMore"
      >
        <router-link
          class="item"
          v-for="item in goodsList"
          :key="item.Id"
          :to="`/mall/detail/${item.Id}`"
        >
          <div class="media">
            <img :src="MEDIA_BASE_URL + item.TitleImage" alt="">
          </div>
          <div class="content">
            <h1>{{item.Title}}</h1>
            <p class="desc">适合新手 | 成色良好 | 极速发货</p>
            <p class="info">
              <span class="money"><b>￥</b>{{item.Price}}</span>
              <span>{{item.Count}}人付款</span>
              <span>{{item.Local}}</span>
            </p>
          </div>
        </router-link>
      </van-list>
    </section>
  </div>
</template>
<script>
import Header from '@/components/Header';
export default {
  components: {
    Header,
  },
  data() {
    return {
      categoryId: '',
      swiperOption: {
        slidesPerView: 4.3,
        spaceBetween: 18,
        freeMode: true,
      },
      loading: false,
      none: false,
      goodsList: [],
      currentPage: 0,
      typeList: []
    }
  },
  methods: {
    selectType(index) {
      console.log(index);
      this.categoryId = index;
      this.goodsList = [];
      this.currentPage = 0;
      this.none = false;
      this.loading = false;
      this.getData();
    },
    getTypeList() {
      return this.$http.product.typeList();
    },
    getData(typeId) {
      typeId = typeId || this.categoryId;
      const { currentPage, goodsList } = this;
      return this.$http.product.type({
        typeId,
        currentPage
      }).then(({ Data }) => {
        this.loading = false;
        const list = Data.List;
        if (list.length < 10) {
          this.none = true;
        } else {
          this.currentPage += 1;
        }
        this.goodsList = goodsList.concat(list);
      })
    },
    loadMore() {
      if (this.none) return;
      this.getData();
    }
  },
  created() {
    this.getTypeList().then(({ Data }) => {
      this.typeList = Data.List.map((item) => {
        return {
          Id: item.Id,
          img: `${this.MEDIA_BASE_URL}${item.Image}`,
          title: item.Name
        }
      })
    })
    this.categoryId = Number(this.$route.params.id);
    console.log(this.categoryId);
    
  }
}
</script>
<style lang="less" scoped>
section{
  padding: 0 60px;
}
.banner{
  margin-bottom: 70px;
  img{
    width: 100%;
    height: 320px;
    border-radius: 25px;
  }
}
.goods-list{
  .item{
    margin-bottom: 72px;
    .media{
      width: 420px;
      height: 420px;
      float: left;
      img{
        width: 100%;
        height: 100%;
        border-radius: 20px;
      }
    }
    .content{
      margin: 0 0 0 480px;
      padding-top: 30px;
      height: 420px;
      h1{
        font-size: 48px;
        line-height: 1.47;
        margin-bottom: 48px;
      }
      .desc{
        color: #666;
        font-size: 40px;
        margin-bottom: 63px;
      }
      .info{
        display: flex;
        align-items: center;
        span{
          margin-right: 36px;
          font-size: 36px;
          color: #999;
        }
        .money{
          color: #FF4646;
          font-size: 60px;
          b{
            font-weight: normal;
            font-size: 42px;
          }
        }
      }
    }
  }
}
.category-container{
  margin-top: 60px;
}
.category-list{
  margin: 0 60px 10px;
  height: 350px;
  .item{
    a{
      display: block;
      text-align: center;
      position: relative;
      padding-top: 15px;
      &::after{
        content: "";
        position: absolute;
        left: 50%;
        top: 15px;
        transform: translateX(-50%);
        width: 175px;
        height: 175px;
        border-radius: 50%;
        background: rgba(0, 0, 0, .3);
      }
      img{
        width:175px;
        height:175px;
        background:rgba(248,248,248,1);
        box-shadow:0px 7px 16px 0px rgba(100,100,100,0.14);
        border-radius:50%;
        margin: 0 0 56px;
      }
      p{
        font-size: 42px;
        color: #999;
      }
      &.selected{
        padding-top: 0;
        img{
          width: 205px;
          height: 205px;
          margin: 0 0 32px;
        }
        p{
          font-size: 48px;
          color: #333;
        }
        &:after{
          display: none;
        }
      }
    }
  }
}
</style>
