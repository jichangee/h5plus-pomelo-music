<template>
  <div class="evaluation-index-container">
    <header>
      <Statusbar />
      <div class="line">
        <div class="nav-bar">
          <a
            href="javascript:;"
            class="item"
          >社区</a>
        </div>
        <div class="btns">
          <router-link to="/evaluation/video/pubilsh" class="btn">
            <img src="../../assets/evaluation/tianjia.png" alt="">
          </router-link>
          <router-link to="/Search/index?tab=1" class="btn">
            <img src="../../assets/evaluation/sousuo.png" alt="">
          </router-link>
        </div>
      </div>
    </header>
    <div class="tab-container">
      <div class="musical-list">
        <swiper :options="swiperOption">
          <swiper-slide
            class="item"
            v-for="item in typeList"
            :key="item.id"
          >
            <a href="javascript:;" @click="onSelectType(item.id)" :class="{'selected': item.id === typeId}">
              <img :src="item.img" alt="">
              <p>{{item.title}}</p>
              <!-- <span class="badge">99+</span> -->
            </a>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="banner">
      <img src="../../assets/example/2.png" alt="">
    </div>
    <van-pull-refresh
      v-model="loading" @refresh="onRefresh"
    >
      <van-list
        :finished="none"
        finished-text="已经到底了"
        v-model="loading"
        @load="loadMore"
      >
        <div class="__video-list">
          <router-link
            v-for="item in list"
            :key="item.Id"
            :to="`/evaluation/article/${item.Id}`"
            class="item hasdes"
          >
            <img :src="item.cover" alt="">
            <p class="text">{{item.Title}}</p>
            <div class="base">
              <p class="des">
                <img class="head" :src="`${MEDIA_BASE_URL}${item.AppUser.Photo}`" alt="">
                <span>{{item.AppUser.Nick}}</span>
              </p>
              <!-- <p class="info">
                <img src="../../assets/common/bofanghui.png" alt="">
                <span>1.8w</span>
              </p> -->
            </div>
          </router-link>
        </div>
      </van-list>
    </van-pull-refresh>
    <div class="footer-plac"></div>
  </div>
</template>

<script>
import Statusbar from '@/components/Statusbar'
import PostItem from '@/components/PostItem'
import request from '../../utils/mrequest'
import { initPullToRefresh } from '../../utils/h5plus';
export default {
  components: {
    PostItem,
    Statusbar,
  },
  data() {
    return {
      typeId: 0,
      tabIndex: 0,
      swiperOption: {
        slidesPerView: 4.3,
        spaceBetween: 18,
        freeMode: true,
      },
      pagin: {
        currentPage: 0,
        pageSize: 10
      },
      typeList: [],
      list: [],
      none: false,
      loading: false,
    };
  },
  methods: {
    onSelectType(typeId) {
      this.typeId = typeId;
      this.list = [];
      this.none = this.loading = false;
      this.pagin.currentPage = 0;
    },
    selectTab(index) {
      this.tabIndex = index;
    },
    loadMore() {
      this.getData();
    },
    getTypeList() {
      return this.$http.common.musicalInstruments({
        type: 1,
        pageSize: 10
      });
    },
    getData() {
      const typeId = this.typeId;
      if (!typeId) {
        return;
      }
      const { pagin } = this;
      this.$http.community.list({
        typeId,
        ...pagin
      }).then(({ Data }) => {
        const list = Data.List.map(item => {
          item.Images = item.Images ? JSON.parse(item.Images) : [];
            item.Videos = item.Videos ? JSON.parse(item.Videos) : [];
            if (item.Images.length > 0) {
              if (item.Images[0]) {
                item.cover = item.Images[0].Path || item.Images[0].src || item.Images[0].url;
              }
            } else {
              item.cover = item.Videos[0] && item.Videos[0].Path + this.MEDIA_SNAPSHOT_URL;
            }
          return item;
        });
        this.loading = false;
        if (list.length < pagin.pageSize) {
          this.none = true;
        } else {
          this.pagin.currentPage += 1;
        }
        this.list = this.list.concat(list);
      })
    },
    init() {
      this.pagin.currentPage = 0;
      this.list = [];
      this.none = false;
      this.loading = false;
    },
    onRefresh() {
      this.init();
    }
  },
  created() {
    this.showLoading();
    this.getTypeList().then(({ Data }) => {
      this.typeList = Data.List.map(item => {
        return {
          id: item.Id,
          img: `${this.MEDIA_BASE_URL}${item.Img}`,
          title: item.Name
        }
      })
      this.typeId = this.typeList[0].id;
      this.hideLoading();
      this.getData();
    })
  },
};
</script>

<style lang="less" scoped>
.evaluation-index-container{
  background: #f4f4f4;
  min-height: 100vh;
  header {
    background: #fff;
  }
  .line{
    padding: 40px 60px 40px 65px;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    .nav-bar{
      .item{
        // font-size: 52px;
        // color: #666;
        font-size: 86px;
        color: #333;
        &:not(:last-child) {
          margin-right: 136px;
        }
        &.selected{
          font-size: 86px;
          color: #333;
          position: relative;
          &:before{
            content: "";
            position: absolute;
            bottom: 0;
            left: -5px;
            width:116px;
            height:14px;
            background:linear-gradient(90deg,rgba(255,52,119,1) 0%,rgba(255,145,93,1) 100%);
            border-radius:7px;
          }
        }
      }
    }
    .btns{
      .btn{
        display: inline-block;
        margin-left: 48px;
        img{
          width: 75px;
          height: 75px;
        }
      }
    }
  }
  .musical-list{
    padding: 0 0 50px;
    margin: 0 60px;
    height: 350px;
    .border-bottom(#dedede);
    .item{
      a{
        display: block;
        text-align: center;
        position: relative;
        padding: 15px;
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
        img{
          width:175px;
          height:175px;
          background:rgba(248,248,248,1);
          box-shadow:0px 7px 16px 0px rgba(100,100,100,0.14);
          border-radius:50%;
          margin: 0 0 37px;
        }
        p{
          font-size: 42px;
          color: #999;
          white-space: nowrap;
        }
      }
    }
  }
  .tags-container{
    padding: 45px 43px 0;
    display: flex;
    flex-wrap: wrap;
    .tag{
      display: block;
      width: 196px;
      height: 62px;
      line-height: 62px;
      text-align: center;
      color: #999;
      background-color: #f1f1f1;
      font-size: 40px;
      border-radius: 29px;
      margin: 0 17px 48px;
      &.selected{
        color: #fff;
        background-color: #FF4E4E;
      }
    }
  }
  .banner{
    padding: 45px 60px 72px;
    background-color: #F4F4F4;
    img{
      width: 100%;
      height: 280px;
      box-shadow:0px 3px 25px 0px rgba(0, 0, 0, 0.16);
      border-radius: 25px;
    }
  }
  section{
    padding: 0 60px;
    h1{
      font-size: 64px;
      padding-left: 33px;
      border-left: 15px solid #333;
      margin-bottom: 97px;
    }
  }
  .theme-list{
    margin-bottom: 120px;
    padding: 0 43px;
    .list{
      display: flex;
      flex-wrap: wrap;
      .item{
        padding: 17px 31px;
        border-radius: 15px;
        font-size: 40px;
        margin: 0 17px 40px;
        &.type1{
          background-color: #eef7eb;
          color: #9FC393;
        }
        &.type2{
          background-color: #FFECEC;
          color: #FF5858;
        }
        &.type3{
          background-color: #EFF5FF;
          color: #8FAAD8;
        }
        &.type4{
          background-color: #F6F6F6;
          color: #999;
        }
      }
    }
  }
  .post-list{
    .item{
      margin-bottom: 130px;
    }
  }
  .load-more{
    font-size: 40px;
    color: #999;
    text-align: center;
    margin-bottom: 20px;
  }
}
.__video-list{
  min-height: 800px;
  padding: 0 60px;
  column-count: 2;
  column-width: 240px;
  column-gap: 20px;
  background: #f4f4f4;
  .item{
    background-color: #fff;
    break-inside: avoid;
    display: block;
    width: 534px;
    border-radius: 25px;
    margin-bottom: 98px;
    overflow: hidden;
    position: relative;
    padding-bottom: 20px;
    img{
      width: 100%;
      float: left;
    }
    .base{
      position: absolute;
      left: 0;
      bottom: 20px;
      width: 100%;
      height: 95px;
      background:linear-gradient(180deg,rgba(0, 0, 0, 0) 0%,rgba(0, 0, 0, 0.5) 100%);
      padding: 0 10px 0 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .des{
        display: flex;
        align-items: center;
        .head{
          width: 68px;
          height: 68px;
          border-radius: 50%;
        }
        span{
          color: #fff;
          font-size: 36px;
          margin-left: 14px;
        }
      }
      .info{
        img{
          width: 48px;
          height: 48px;
          margin-right: 10px;
        }
        span{
          color: #fff;
          font-size: 36px;
        }
      }
    }
    &.hasdes{
      & > img{
        border-radius: 25px;
        margin-bottom: 38px;
      }
      .text{
        line-height: 1.47;
        font-size: 40px;
        padding: 0 20px;
        width: 100%;
        margin-bottom: 48px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .base{
        background: transparent;
        position: static;
        height: auto;
        padding: 0 20px;
        .des{
          display: flex;
          align-items: center;
          span{
            color: #333;
          }
        }
        .info{
          span{
            color: #999;
            font-size: 36px;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.evaluation-index-container {
  .van-list__finished-text,
  .footer-plac{
    background-color: #f4f4f4;
  }
}
</style>
