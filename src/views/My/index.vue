<template>
  <div class="my-index-container">
    <Statusbar />
    <header>
      <div class="handle-container clearfix">
        <!-- <span class="badge">10</span> -->
        <router-link to="/my/notify" class="left"><img src="../../assets/my/xiaoxi.png" alt=""></router-link>
        <router-link to="/my/setting" class="right"><img src="../../assets/my/shezhi.png" alt=""></router-link>
      </div>
      <div class="info-container">
        <div class="media">
          <img :src="`${MEDIA_BASE_URL}${data.Photo}`" alt="">
        </div>
        <div class="text">
          <h1>{{data.Nick}}</h1>
          <!-- <p class="level"></p> -->
          <p class="motto">{{data.Signature}}</p>
        </div>
        <div class="signin-container" v-if="data.Photo" :class="{'checkin': data.IsChecked}" @click="checkin">
          <img src="../../assets/my/qiandao.png" alt="">
          <span>{{data.IsChecked ? '已签到' : '签到'}}</span>
        </div>
      </div>
      <div class="data-container">
        <router-link :to="`/home/user/like/${data.Id}`" class="item">
          <p class="number">{{data.AttUser}}</p>
          <p class="name">关注</p>
        </router-link>
        <router-link :to="`/home/user/follow/${data.Id}`" class="item">
          <p class="number">{{data.Fans}}</p>
          <p class="name">粉丝</p>
        </router-link>
        <div class="item">
          <p class="number">{{data.Like}}</p>
          <p class="name">喜欢</p>
        </div>
        <div class="item">
          <p class="number">{{data.CollectCount}}</p>
          <p class="name">收藏</p>
        </div>
      </div>
      <div class="pages-container">
        <router-link to="/my/profile" class="item">
          <img src="../../assets/my/grzl.png" alt="">
          <span>个人资料</span>
        </router-link>
        <router-link to="/my/assets" class="item">
          <img src="../../assets/my/wdzh.png" alt="">
          <span>我的资产</span>
        </router-link>
        <router-link to="/mall/order" class="item">
          <img src="../../assets/my/wddd.png" alt="">
          <span>我的订单</span>
        </router-link>
      </div>
      <p class="id-number">柚子ID: {{data.YouziId}}</p>
    </header>
    <section>
      <van-tabs
        v-model="tabIndex"
        @change="onSelect"
      >
        <van-tab :title="`作品 ${data.ShowCount}`">
          <van-list
            @load="getMyShow"
            :finished="none.myShow"
            finished-text="已经到底了"
            v-model="loading.myShow"
            :error.sync="error.myShow"
            error-text="请求失败，点击重新加载"
          >
            <VideoContainer :list="myShowList" :type="1" @click="onClick" />
          </van-list>
        </van-tab>
        <van-tab :title="`课程 ${data.CourseCount}`">
          <van-list
            @load="getMyCourse"
            :finished="none.myCourse"
            finished-text="已经到底了"
            v-model="loading.myCourse"
            :error.sync="error.myCourse"
            error-text="请求失败，点击重新加载"
          >
            <LessonContainer :list="courseList" />
          </van-list>
        </van-tab>
        <van-tab :title="`收藏 ${data.CollectCount}`">
          <van-list
            @load="getMyCollect"
            :finished="none.myCollect"
            finished-text="已经到底了"
            v-model="loading.myCollect"
            :error.sync="error.myCollect"
            error-text="请求失败，点击重新加载"
          >
            <CollectContainer
              :list="collectList"
              @change="onSelectCollect"
              @click="onClick"
            />
          </van-list>
        </van-tab>
      </van-tabs>
    </section>
    <div class="footer-plac"></div>
  </div>
</template>
<script>
import Statusbar from '@/components/Statusbar'
import CollectContainer from '@/components/My/Collect'
import LessonContainer from '@/components/My/Lesson'
import VideoContainer from '@/components/My/VideoContainer'
import { getVideoBase64 } from '../../utils';

export default {
  components: {
    Statusbar,
    CollectContainer,
    LessonContainer,
    VideoContainer,
  },
  data() {
    return {
      tabIndex: 0,
      data: {
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
      myShowList: [],
      courseList: [],
      collectList: [],
      collectIndex: 0,
      error: {
        myShow: false,
        myCourse: false,
        myCollect: false,
      },
      none: {
        myShow: false,
        myCourse: false,
        myCollect: false,
      },
      loading: {
        myShow: false,
        myCourse: false,
        myCollect: false,
      },
      pagin: {
        myShow: {
          currentPage: 0,
          pageSize: 10
        },
        myCourse: {
          currentPage: 0,
          pageSize: 10
        },
        myCollect: {
          currentPage: 0,
          pageSize: 10
        }
      }
    };
  },
  methods: {
    onSelect(index) {
      // if (index === 1) {
      //   this.getMyCourse();
      // }
    },
    onSelectCollect(index) {
      this.collectIndex = index;
      this.collectList = [];
      this.loading.myCollect = false;
      this.error.myCollect = false;
      this.none.myCollect = false;
      // this.getMyCollect(index);
    },
    getMyInfo() {
      return this.$http.user.index();
    },
    getMyShow() {
      if (this.none.myShow) return;
      const { pageSize, currentPage } = this.pagin.myShow;
      this.$http.show.list({
        currentPage,
        type: 1
      }).then(({ Data }) => {
        this.loading.myShow = false;
        const list = Data.List;
        if (list.length < pageSize) {
          this.none.myShow = true;
        } else {
          this.pagin.myShow.currentPage += 1;
        }
        this.myShowList = this.myShowList.concat(list);
      }).catch(() => {
        this.error.myShow = true;
        this.loading.myShow = false;
      })
    },
    getMyCourse() {
      if (this.none.myCourse) return;
      const { pageSize, currentPage } = this.pagin.myCourse;
      this.$http.user.course({
        currentPage
      }).then(({ Data }) => {
        this.loading.myCourse = false;
        const list = Data;
        if (list.length < pageSize) {
          this.none.myCourse = true;
        } else {
          this.pagin.myCourse.currentPage += 1;
        }
        this.courseList = this.courseList.concat(list);
      }).catch(() => {
        this.error.myCourse = true;
        this.loading.myCourse = false;
      })
    },
    getMyCollect() {
      if (this.none.myCollect) return;
      const { pageSize, currentPage } = this.pagin.myCollect;
      if (this.collectIndex === 0) {
        this.$http.user.collectCourse({
          currentPage
        }).then(({ Data }) => {
          this.loading.myCollect = false;
          const list = Data.List;
          if (list.length < pageSize) {
            this.none.myCollect = true;
          } else {
            this.pagin.myCollect.currentPage += 1;
          }
          this.collectList = this.collectList.concat(list);
        }).catch(() => {
          this.error.myCollect = true;
          this.loading.myCollect = false;
        })
      } else {
        this.$http.show.list({
          currentPage,
          type: 2
        }).then(({ Data }) => {
          this.loading.myCollect = false;
          const list = Data.List;
          if (list.length < pageSize) {
            this.none.myCollect = true;
          } else {
            this.pagin.myCollect.currentPage += 1;
          }
          this.collectList = this.collectList.concat(list);
        }).catch(() => {
          this.error.myCollect = true;
          this.loading.myCollect = false;
        })
      }
    },
    checkin() {
      if (this.data.IsChecked) {
        return;
      }
      this.showLoading();
      this.$http.user.checkin().then(() => {
        this.hideLoading();
        this.data.IsChecked = true;
        this.$toast('签到成功');
      }).catch(() => {
        this.hideLoading();
        this.$toast('签到失败，请稍后再试');
      })
    },
    onClick(index, type) {
      const list = type === 1 ? this.myShowList : this.collectList;
      const { currentPage } = type === 1 ? this.pagin.myShow : this.pagin.myCollect;
      const userId = '';
      const info = {
        type,
        list,
        index,
        userId,
        currentPage,
      }
      this.$store.commit('SET_YOUSHOW_INFO', info);
      this.$router.push('/show/index?action=info');
    }
  },
  created() {
    this.showLoading();
    this.getMyInfo().then(({ Data }) => {
      this.data = JSON.parse(JSON.stringify(Data));
      this.hideLoading();
    });
  }
}
</script>
<style lang="less" scoped>
.my-index-container{
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
      .left{
        position: relative;
        float: left;
        .badge{
          height: 30px;
          line-height: 30px;
          font-size: 24px;
          color: #fff;
          background-color: #DD1111;
          position: absolute;
          padding: 0 15px;
          border-radius: 15px;
          top: 0;
          right: -20px;
        }
      }
      .right{
        float: right;
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
      .signin-container{
        position: absolute;
        top: 122px;
        right: 0;
        width:246px;
        height:98px;
        background:linear-gradient(90deg,rgba(255,65,99,1) 0%,rgba(255,146,95,1) 100%);
        border-radius:49px 0px 0px 49px;
        padding-left: 45px;
        font-size: 40px;
        color: #fff;
        display: flex;
        align-items: center;
        &.checkin{
          background: #7f7f7f;
          pointer-events: none;
        }
        img{
          width: 48px;
          margin-right: 18px;
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
