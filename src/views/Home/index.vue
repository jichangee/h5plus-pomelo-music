<template>
  <div class="home-index-container">
    <van-pull-refresh
      v-model="loading" @refresh="onRefresh"
    >
    <header>
      <MySwipe :list="swipeList" class="swiper-container" />
      <div class="handle-container">
        <Statusbar />
        <div class="line">
          <p class="title" @click="isShowMusicalList = !isShowMusicalList">{{musical && musical.title}}<img src="../../assets/home/xiala.png" alt=""></p>
          <div class="musical-list" v-show="isShowMusicalList">
            <a
              href="javascript:;"
              class="item"
              :class="{'selected': item.id === musical.id}"
              v-for="item in musicalList"
              :key="item.id"
              @click="selectMusical(item)"
            >{{item.title}}</a>
          </div>
          <router-link to="/search/index" class="inputdiv">
            <p><img src="../../assets/home/sousuo.png" alt="">吉他入门课程</p>
          </router-link>
        </div>
      </div>
    </header>
    <div class="nav-menu">
      <router-link
        class="nav-menu-item"
        to="/home/lesson?type=0"
      >
        <img src="../../assets/home/icon1.png" alt="">
        <p>基础入门</p>
      </router-link>
      <router-link
        class="nav-menu-item"
        to="/home/lesson?type=1"
      >
        <img src="../../assets/home/icon2.png" alt="">
        <p>进阶课程</p>
      </router-link>
      <router-link
        class="nav-menu-item"
        to="/home/lesson?type=2"
      >
        <img src="../../assets/home/icon3.png" alt="">
        <p>名师指导</p>
      </router-link>
      <router-link
        class="nav-menu-item"
        to="/home/lesson"
      >
        <img src="../../assets/home/icon4.png" alt="">
        <p>全部课程</p>
      </router-link>
    </div>
    <!-- <section>
      <div class="title">
        <h1>限时优惠课程</h1>
        <div class="time">
          <b>27</b>
          <p>
            <span>FEB.</span>
            <span>周四</span>
          </p>
        </div>
      </div>
      <div class="lesson-item">
        <router-link to="/home/lesson/detail/1">
          <div class="lesson-image">
            <div class="tags">
              <p class="tag type1">支持试看</p>
              <p class="tag type2">吉他</p>
            </div>
            <img src="../../assets/example/2.png" alt="">
          </div>
          <p class="reason">
            <span>推荐理由：</span>长期为全行业主播提供声乐教学的酷狗直播学院再次升级。除了一线知名歌手外，这次酷狗直播学院更邀长期为全行业主播提供声乐教学的酷狗直播学院再次升级。除了一线知名歌手外，这次酷狗直播学院更邀
          </p>
        </router-link>
        <div class="info">
          <p>已订阅23457人</p>
          <p>倒计时：29分29秒</p>
        </div>
      </div>
    </section> -->
    <section>
      <div class="title">
        <h1>精选</h1>
        <!-- <router-link to="" class="more-link">更多> </router-link> -->
      </div>
      <div class="project-list">
        <!-- <router-link to="/home/article/1" class="item one">
          <img src="../../assets/example/2.png" alt="">
        </router-link> -->
        <router-link :to="`/home/article/${item.Id}`" class="item" v-for="item in newsList" :key="item.Id">
          <img :src="`${MEDIA_BASE_URL}${item.Image}`" alt="">
          <p>{{item.Title}}</p>
        </router-link>
      </div>
    </section>
    <section class="musical">
      <div class="title">
        <h1>相关乐器 <span class="sub">好装备学习更轻松</span></h1>
        <p class="btn" @click="getMusicalTypeList"><img :class="{'img-loading': musicalLoading}" src="../../assets/home/shuaxin.png" alt="">换一批</p>
      </div>
      <div class="musical-list">
        <router-link :to="`/mall/category/${item.Id}`" class="item" v-for="item in musicalTypeList" :key="item.Id">
          <div class="img">
            <img :src="`${MEDIA_BASE_URL}${item.Image}`" alt="">
          </div>
          <div class="text">
            <h1>{{item.Name}}</h1>
            <p>{{item.Presentation}}</p>
          </div>
        </router-link>
      </div>
      <div class="ticket-list">
        <a href="javascript:;" class="item theme1" v-for="item in couponList" :key="item.Id" @click="getCoupon(item.Id)">
          <div class="left"><p class="text">VOUCHER</p></div>
          <div class="right">
            <p class="money"><span>{{item.Value}}元</span>代金券</p>
            <p class="des">{{item.Title}}</p>
          </div>
        </a>
      </div>
    </section>
    <section v-if="courseList.length > 0">
      <div class="title">
        <h1>特色课程</h1>
        <router-link to="/home/lesson" class="more-link">查看全部> </router-link>
      </div>
      <div class="lesson-list">
        <swiper :options="swiperOption" class="lesson-swiper">
          <swiper-slide class="item" v-for="item in courseList" :key="item.Id">
            <router-link :to="`/home/lesson/detail/${item.Id}`">
              <img :src="`${MEDIA_BASE_URL}${item.Image}`" alt="">
              <p>{{item.Title}}</p>
            </router-link>
          </swiper-slide>
        </swiper>
      </div>
    </section>
    <div class="footer-plac"></div>
    </van-pull-refresh>
  </div>
</template>
<script>
import MySwipe from '@/components/Swipe';
import Statusbar from '@/components/Statusbar';
export default {
  components: {
    MySwipe,
    Statusbar,
  },
  data() {
    return {
      statusbarHeight: 20,
      swipeList: [],
      newsList: [],
      courseList: [],
      musicalList: [],
      musicalTypeList: [],
      couponList: [],
      couponPagin: {
        currentPage: 0,
        pageSize: 3
      },
      musicalPagin: {
        currentPage: 0,
        pageSize: 4
      },
      musicalLoading: false,
      swiperOption: {
        slidesPerView: 1.5,
        spaceBetween: 10,
        freeMode: true,
      },
      isShowMusicalList: false,
      musical: null
    };
  },
  methods: {
    selectMusical(item) {
      this.musical = item;
      this.isShowMusicalList = false;
      this.getCourseList().then(({ Data }) => {
        const list = Data.List;
        this.courseList = list;
      })
    },
    getNewsData() {
      return this.$http.news.list();
    },
    getBanner(position) {
      return this.$http.common.banner({
        position
      })
    },
    getCourseList() {
      return this.$http.course.list({
        currentPage: 0,
        pageSize: 3,
        musical: this.musical.id
      })
    },
    getMusicalList() {
      return new Promise((resolve, reject) => {
        this.$http.common.musicalInstruments({
          type: 0,
          pageSize: 10
        }).then(({ Data }) => {
          const list = Data.List;
          const musicalList = list.map((item) => {
            return {
              title: item.Name,
              id: item.Id
            }
          });
          console.log('musicalList', musicalList);
          if (!this.musical) {
            this.musical = musicalList[0];
          }
          this.musicalList = this.musicalList.concat(musicalList);
          resolve();
        })
      })
    },
    getMusicalTypeList() {
      const { musicalPagin } = this;
      this.musicalLoading = true;
      return new Promise((resolve) => {
        this.$http.product.typeList({
          ...musicalPagin,
        }).then(({ Data }) => {
          const list = Data.List;
          if ((Data.CurrentPage + 1) * Data.PageSize >= Data.TotalCount) {
            this.musicalPagin.currentPage = 0;
          } else {
            this.musicalPagin.currentPage += 1;
          }
          
          this.musicalTypeList = list;
          this.musicalLoading = false;
          resolve();
        }).catch(() => {
          reject();
          this.musicalLoading = false;
        })
      })
    },
    getCoupon(id) {
      this.showLoading();
      this.$http.common.getCoupon({
        id
      }).then(() => {
        this.hideLoading();
        this.$toast.success('领取成功');
      }).catch(() => {
        this.hideLoading();
      })
    },
    getCouponList() {
      const { couponPagin } = this;
      this.$http.common.coupon({
        ...couponPagin
      }).then(({ Data }) => {
        const list = Data.List;
        this.couponList = list;
      })
    },
    init() {
      this.couponPagin.currentPage = 0;
      this.musicalPagin.currentPage = 0;
      this.couponList = [];
      this.swipeList = [];
      this.newsList = [];
      this.musicalList = [];
      this.musicalLoading = false;
      this.showLoading();
      this.loading = true;
      this.getBanner(0).then(({ Data }) => {
        this.swipeList = Data.map(item => {
          return {
            url: item.Url,
            img: `${this.MEDIA_BASE_URL}${item.Image}`,
            type: item.Type,
            typeId: item.TypeId
          }
        });
        return this.getNewsData();
      }).then(({ Data }) => {
        this.newsList = Data;
        return this.getMusicalList();
      }).then(() => {
        return this.getMusicalTypeList();
      }).then(() => {
        if (!this.musical) {
          this.getCouponList()
          this.hideLoading();
          return;
        }
        return this.getCourseList();
      }).then(({ Data }) => {
        if (Data) {
          const list = Data.List;
          this.courseList = list;
          this.getCouponList();
          this.hideLoading();
          this.loading = false;
        }
      })
    },
    onRefresh() {
      this.init();
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less">
.home-index-container{
  header{
    position: relative;
    .swiper-container{
      height: 640px;
      .van-swipe__indicator {
        background-color: #fff;
        opacity: 1;
        border-radius: 0.08052rem;
        transition: all 300ms;
        height: 0.16103rem;
        width: 0.16103rem;
        &.van-swipe__indicator--active {
          width: 0.57971rem;
        }
      }
    }
    .handle-container{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 2;
      .line{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 40px 62px;
        position: relative;
        .title{
          font-size: 64px;
          color: #f3f2f2;
          font-weight: bold;
          width: 312px;
          margin-right: 30px;
          img{
            width: 45px;
            margin-left: 5px;
            vertical-align: middle;
          }
        }
        .inputdiv{
          width: 770px;
          height: 80px;
          line-height: 80px;
          p{
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
            border-radius: 40px;
            background-color: rgba(255, 255, 255, .3);
            font-size: 40px;
            color: #C6C6C6;
            padding-left: 55px;
            img{
              width: 45px;
              height: 45px;
              margin-right: 32px;
            }
          }
        }
        .musical-list{
          position: absolute;
          background-color: #1B191C;
          color: #fff;
          font-size: 42px;
          padding: 0 30px;
          width: 318px;
          top: 126px;
          left: 45px;
          a{
            color: #888;
            line-height: 105px;
            display: block;
            text-align: center;
            &:not(:last-child) {
              .border-bottom(#262626);
            }
            &.selected{
              color: @maincolor;
            }
          }
        }
      }
    }
  }
  .nav-menu{
    display: flex;
    justify-content: space-between;
    text-align: center;
    padding: 100px 102px;
    margin: 11px 0 44px;
    .nav-menu-item{
      img{
        box-shadow:0px 3px 25px 0px rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        width: 144px;
        height: 144px;
        padding: 17px;
        margin-bottom: 44px;
      }
    }
  }
  section{
    padding: 0 60px;
    margin-bottom: 140px;
    &.musical{
      padding: 0 45px;
      .title{
        padding: 0 15px;
      }
    }
    .title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 92px;
      h1{
        font-size: 64px;
        padding-left: 23px;
        border-left: 15px solid #333;
        .sub{
          font-size: 40px;
          color: #666;
          font-weight: normal;
        }
      }
      .time{
        display: flex;
        justify-content: space-between;
        b{
          font-size: 90px;
          margin-right: 11px;
        }
        p{
          padding-top: 10px;
          span{
            display: block;
            font-size: 34px;
            line-height: 36px;
          }
        }
      }
      .more-link{
        font-size: 40px;
        color: #666;
      }
      .btn{
        font-size: 40px;
        color: #FF3177;
        display: flex;
        align-items: center;
        img{
          width: 48px;
          margin-right: 15px;
        }
      }
    }
    .lesson-item{
      .lesson-image{
        width: 1122px;
        height: 320px;
        border-radius: 25px;
        box-shadow:0px 3px 25px 0px rgba(0, 0, 0, 0.1);
        margin-bottom: 60px;
        overflow: hidden;
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .tags{
        position: absolute;
        right: 0;
        top: 0;
        .tag{
          width: 190px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          border-radius:30px 0px 0px 30px;
          color: #fff;
          font-size: 36px;
          margin-bottom: 24px;
          &.type1{
            background:linear-gradient(126deg,rgba(255,49,119,1) 0%,rgba(255,149,91,1) 100%);
          }
          &.type2{
            background-color: #000;
          }
        }
      }
      .reason{
        font-size: 42px;
        color: #666;
        line-height: 1.47;
        margin-bottom: 50px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 123px;
        span{
          font-size: 48px;
          color: #333;
        }
      }
      .info{
        display: flex;
        justify-content: space-between;
        font-size: 40px;
        color: #FF3177;
      }
    }
    .project-list{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 36px;
      .item{
        height: 281px;
        border-radius: 20px;
        width: 543px;
        margin-bottom: 36px;
        img{
          width: 100%;
          height: 281px;
          margin-bottom: 31px;
        }
        p{
          font-size: 38px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &.one{
          width: 1122px;
          img{
            margin-bottom: 0;
          }
        }
      }
    }
    .musical-list{
      display: flex;
      justify-content: flex-start;
      margin-bottom: 65px;
      .item{
        box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.08);
        border-radius: 10px;
        width: 262px;
        &:not(:last-child) {
          margin-right: 32px;
        }
        img{
          width: 262px;
          height: 271px;
        }
        .text{
          padding: 20px;
          h1{
            font-size: 40px;
            font-weight: normal;
            margin-bottom: 19px;
          }
          p{
            font-size: 28px;
            line-height: 1.47;
            color: #666;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
    .ticket-list{
      display: flex;
      justify-content: space-between;
      .item{
        width: 373px;
        height: 185px;
        background-image: url('../../assets/home/quan1.png');
        background-size: cover;
        background-repeat: no-repeat;
        display: flex;
        justify-content: space-between;
        padding: 20px;
        .left{
          font-size: 27px;
          width: 70px;
          color: #fff;
          text-align: center;
          position: relative;
          .text{
            position: absolute;
            transform: rotate(270deg);
            right: -35px;
            bottom: 60px;
          }
        }
        .right{
          width: 280px;
          text-align: center;
          padding-top: 25px;
          .money{
            color: #F88475;
            font-size: 25px;
            margin-bottom: 5px;
            span{
              font-size: 47px;
            }
          }
          .des{
            width: 224px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            background-color: #FAD4CF;
            font-size: 24px;
            display: inline-block;
          }
        }
        &.theme1{
          .right{
            .money{
              color: #F88475;
            }
            .des{
              background-color: #FAD4CF;
            }
          }
        }
        &.theme2{
          .right{
            .money{
              color: #A2C29E;
            }
            .des{
              background-color: #E2F0E0;
            }
          }
        }
        &.theme3{
          .right{
            .money{
              color: #957569;
            }
            .des{
              background-color: #ECDDD8;
            }
          }
        }
      }
    }
    .lesson-list{
      .lesson-swiper{
        height: 380px;
      }
      .item{
        width: 795px;
        height: 374px;
        position: relative;
        float: left;
        border-radius: 25px;
        overflow: hidden;
        box-shadow:0px 3px 25px 0px rgba(0, 0, 0, 0.1);
        img{
          width: 100%;
          height: 100%;
        }
        p{
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 98px;
          line-height: 98px;
          color: #fff;
          background: rgba(0, 0, 0, .42);
          font-size: 40px;
          padding: 0 30px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .eval-list{
      .item{
        display: flex;
        justify-content: space-between;
        padding: 68px 0;
        &:not(:last-child) {
          .border-bottom(#dedede);
        }
        .media{
          width: 447px;
          padding-left: 15px;
          margin-right: 72px;
          img{
            border-radius: 20px;
            width: 432px;
            height: 230px;
          }
        }
        .content{
          width: 610px;
          padding-top: 26px;
          h1{
            font-size: 44px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 34px;
            line-height: 1.3;
          }
          .des{
            font-size: 36px;
            color: #666;
            line-height: 1.4;
            overflow : hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
    .more-link-container{
      text-align: center;
      margin-top: 47px;
      a{
        padding: 20px 40px;
        display: inline-block;
        font-size: 40px;
        color: #666;
      }
    }
  }
}
.img-loading{
  animation: arrowLoading infinite linear 1.5s;
}
@keyframes arrowLoading {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
