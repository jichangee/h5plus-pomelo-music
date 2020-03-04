<template>
  <div class="user-index-container">
    <van-pull-refresh
      v-model="loading.index" @refresh="onRefresh"
    >
    <Statusbar />
    <header>
      <div class="handle-container clearfix">
        <a href="javascript:;" class="left back" @click="back">
          <van-icon name="arrow-left"></van-icon>
        </a>
        <!-- <a href="javascript:;" class="right"><img src="../../assets/user/jubao.png" alt=""></a>
        <a href="javascript:;" class="right"><img src="../../assets/user/fenxiang.png" alt=""></a> -->
      </div>
      <div class="info-container">
        <div class="media">
          <img :src="`${MEDIA_BASE_URL}${userData.Photo}`" alt="">
        </div>
        <div class="text">
          
          <h1>
            {{userData.Nick}}
            <van-button
              v-if="!userData.IsMe"
              @click="toggleLike(userData.Id)" 
              class="follow"
              type="default"
              :loading="loading.like"
            >{{userData.IsLike ? '已关注' : '关注'}}</van-button></h1>
          <!-- <p class="level">LV: 柚芽</p> -->
          <p class="motto">{{userData.Signature}}</p>
        </div>
      </div>
      <div class="data-container">
        <router-link :to="`/home/user/like/${id}`" class="item">
          <p class="number">{{userData.AttUser}}</p>
          <p class="name">关注</p>
        </router-link>
        <router-link :to="`/home/user/follow/${id}`" class="item">
          <p class="number">{{userData.Fans}}</p>
          <p class="name">粉丝</p>
        </router-link>
        <div class="item">
          <p class="number">{{userData.Like}}</p>
          <p class="name">喜欢</p>
        </div>
        <div class="item">
          <p class="number">{{userData.Collect}}</p>
          <p class="name">收藏</p>
        </div>
      </div>
      <p class="id-number">柚子ID: {{userData.YouziId}}</p>
    </header>
    <section>
      <van-tabs 
        v-model="tabIndex"
        :sticky="true"
        :swipeable="true"
        @change="onChange"
      >
        <van-tab :title="`作品 ${userData.ShowCount}`">
          <van-list
            @load="loadMoreShow"
            :finished="none.show"
            finished-text="已经到底了"
            v-model="loading.show"
            :error.sync="error.show"
            error-text="请求失败，点击重新加载"
          >
            <VideoContainer :type="1" :list="showList" @click="onClick" />
          </van-list>
        </van-tab>
        <van-tab :title="`喜欢 ${userData.Like}`">
          <van-list
            @load="loadMoreCollect"
            :finished="none.collect"
            finished-text="已经到底了"
            v-model="loading.collect"
            :error.sync="error.collect"
            error-text="请求失败，点击重新加载"
          >
            <VideoContainer :type="2" :list="collectList" @click="onClick" />
          </van-list>
        </van-tab>
      </van-tabs>
    </section>
    <div class="footer-plac"></div>
    </van-pull-refresh>
  </div>
</template>
<script>
import Statusbar from '@/components/Statusbar'
import VideoContainer from '@/components/My/VideoContainer'
import { formatNumber } from '../../utils/filter';
import { initPullToRefresh } from '../../utils/h5plus';

export default {
  components: {
    Statusbar,
    VideoContainer,
  },
  filters: {
    formatNumber
  },
  data() {
    return {
      tabIndex: 0,
      id: '',
      showList: [],
      collectList: [],
      userData: {
        IsLike: false,
        AttUser: '--',
        Collect: '--',
        CollectCount: '--',
        CourseCount: '--',
        Fans: '--',
        Like: '--',
        Nick: '--',
        ShowCount: '--',
        Signature: '--',
        YouziId: '--'
      },
      pagin: {
        show: {
          currentPage: 0,
          pageSize: 10
        },
        collect: {
          currentPage: 0,
          pageSize: 10
        }
      },
      none: {
        show: false,
        collect: false
      },
      loading: {
        like: false,
        collect: false,
        show: false,
        index: false,
      },
      error: {
        collect: false,
        show: false
      }
    };
  },
  methods: {
    toggleLike(userId) {
      this.loading.like = true;
      this.$http.user.like({
        userId
      }).then(() => {
        this.userData.IsLike = !this.userData.IsLike;
        this.loading.like = false;
      }).catch(() => {
        this.loading.like = false;
      })
    },
    loadMoreShow() {
      const userId = this.userData.Id;
      if (!userId) {
        return;
      }
      this.getShow(userId)
    },
    loadMoreCollect() {
      const userId = this.userData.Id;
      if (!userId) {
        return;
      }
      this.getCollect(userId)
    },
    getData(id) {
      this.showLoading();
      return this.$http.user.info({
        id
      }).then(({ Data }) => {
        this.userData = Data;
        this.hideLoading();
        return new Promise((resolve) => {
          resolve(Data)
        })
      })
    },
    getShow(userId) {
      if (this.none.show) return;
      const { pageSize, currentPage } = this.pagin.show;
      this.$http.show.list({
        type: 1,
        userId,
        currentPage,
      }).then(({ Data }) => {
        this.userData.ShowCount = Data.TotalCount;
        this.loading.show = false;
        const list = Data.List;
        if (list.length < pageSize) {
          this.none.show = true;
        } else {
          this.pagin.show.currentPage += 1;
        }
        this.showList = this.showList.concat(list);
      }).catch(() => {
        this.error.show = true;
        this.loading.show = false;
      })
    },
    getCollect(userId) {
      if (this.none.collect) return;
      const { Id } = this.userData;
      const { pageSize, currentPage } = this.pagin.collect;
      this.$http.show.list({
        type: 2,
        userId,
        currentPage
      }).then(({ Data }) => {
        this.userData.Like = Data.TotalCount;
        this.loading.collect = false;
        const list = Data.List;
        if (list.length < pageSize) {
          this.none.collect = true;
        } else {
          this.pagin.collect.currentPage += 1;
        }
        this.collectList = this.collectList.concat(list);
      }).catch(() => {
        this.error.collect = true;
        this.loading.collect = false;
      })
    },
    onChange(index) {
      if (index === 1 && this.collectList.length === 0) {
        this.getCollect(this.userData.Id);
      }
    },
    onClick(index, type) {
      const list = type === 1 ? this.showList : this.collectList;
      const { currentPage } = type === 1 ? this.pagin.show : this.pagin.collect;
      const userId = this.userData.Id;
      const info = {
        type,
        list,
        index,
        userId,
        currentPage,
      }
      this.$store.commit('SET_YOUSHOW_INFO', info);
      this.$router.push('/show/index?action=info');
    },
    init() {
      this.pagin.collect.currentPage = 0;
      this.pagin.show.currentPage = 0;
      this.none.show = false;
      this.none.collect = false;
      this.loading.show = false;
      this.loading.collect = false;
      this.showList = [];
      this.collectList = [];
    },
    onRefresh() {
      this.init();
      this.getData(this.id).then((data) => {
        this.getShow(data.Id);
        this.getCollect(data.Id);
      });
    }
  },
  created() {
    const id = this.$route.params.id;
    this.getData(id).then((data) => {
      this.getShow(data.Id);
      this.getCollect(data.Id);
    });
    this.id = id;
  },
}
</script>
<style lang="less" scoped>
.user-index-container{
  header{
    padding-bottom: 42px;
    .id-number{
      margin-top: 66px;
      padding: 0 60px;
      font-size: 42px;
      color: #999;
    }
    .handle-container{
      padding: 13px 60px;
      margin-bottom: 43px;
      .back{
        font-size: 70px;
      }
      .left{
        position: relative;
        float: left;
      }
      .right{
        float: right;
        margin-left: 76px;
      }
      a{
        width: 75px;
        height: 75px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .info-container{
      padding: 0 60px;
      margin-bottom: 110px;
      position: relative;
      .media{
        margin: 0 auto 37px;
        width: 214px;
        height: 214px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .text{
        text-align: center;
        h1{
          font-size: 60px;
          margin-bottom: 47px;
          display: inline-block;
          position: relative;
          .follow{
            position: absolute;
            width:171px;
            padding: 0;
            height:67px;
            line-height: 64px;
            border:3px solid rgba(51,51,51,1) !important;
            border-radius:32px;
            font-size: 40px;
            text-align: center;
            transform: translateX(100%);
            right: -46px;
            top: -3px;
          }
        }
        .level{
          margin-bottom: 24px;
          font-size: 40px;
          color: #333;
        }
        .motto{
          font-size: 42px;
          color: #999;
        }
      }
    }
    .data-container{
      display: flex;
      justify-content: space-between;
      padding: 0 50px;
      text-align: center;
      margin-bottom: 110px;
      .item{
        width: 25%;
        .number{
          margin-bottom: 34px;
          font-size: 48px;
          font-weight: bold;
        }
        .name{
          font-size: 40px;
          color: #666;
        }
      }
    }
    .pages-container{
      display: flex;
      justify-content: space-between;
      padding: 0 57px;
      .item{
        width: 286px;
        height: 89px;
        border: 1PX solid #999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        border-radius: 44px;
        img{
          width: 48px;
          height: 48px;
          margin-right: 9px;
        }
      }
    }
  }
  section{
    .tab-container{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 55px 126px 45px;
      .border-top(#dedede);
      .item{
        font-size: 48px;
        color: #666;
        position: relative;
        &.selected{
          color: #333;
          font-weight: bold;
          &:after{
            content: "";
            position: absolute;
            height: 12px;
            width: 100%;
            left: 50%;
            transform: translateX(-50%);
            bottom: -24px;
            background:linear-gradient(90deg,rgba(255,63,99,1) 0%,rgba(255,148,95,1) 100%);
          }
        }
      }
    }
  }
  .load-more{
    color: #999;
    font-size: 40px;
    text-align: center;
    margin: 160px 0 300px;
  }
}
</style>
