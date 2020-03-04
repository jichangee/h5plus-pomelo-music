<template>
  <div class="home-lesson-container">
    <Header title="全部课程" bc="#24252c">
      <router-link to="/Search/index?tab=2" slot="right">
        <img class="right-icon" src="../../assets/home/lesson/sousuo.png" alt="">
      </router-link>
    </Header>
    <MySwipe :list="swipeList" class="swiper-container" />
    <section class="tabs-list">
      <div class="line clearfix">
        <div class="scrolldiv">
          <div
            class="item"
            :class="{'selected': tab1 === index}"
            v-for="(item, index) in tab1List"
            :key="index"
            @click="selectTab1(index, item.id)"
          >{{item.title}}</div>
        </div>
      </div>
      <div class="line clearfix">
        <div class="scrolldiv">
          <div
            class="item"
            :class="{'selected': tab2 === index}"
            v-for="(item, index) in tab2List"
            :key="index"
            @click="selectTab2(index, item.id)"
          >{{item.title}}</div>
        </div>
      </div>
      <div class="line clearfix">
        <div class="scrolldiv">
          <div
            class="item"
            :class="{'selected': tab3 === index}"
            v-for="(item, index) in tab3List"
            :key="index"
            @click="selectTab3(index, item.id)"
          >{{item.title}}</div>
        </div>
      </div>
    </section>
    <section class="lesson-list">
      <h1>推荐课程</h1>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="加载失败，点击重试"
        @load="getList"
        class="lesson"
      >
        <LessonItem v-for="item in list" :key="item.Id" :data="item" />
      </van-list>
    </section>
  </div>
</template>
<script>
import Header from '@/components/Header';
import MySwipe from '@/components/Swipe';
import LessonItem from '@/components/Lesson/Item';
import { initPullToRefresh } from '../../utils/h5plus';
export default {
  components: {
    Header,
    MySwipe,
    LessonItem
  },
  data() {
    return {
      tab1: 0,
      tab2: 0,
      tab3: 0,
      loading: false,
      finished: false,
      error: false,
      tab1List: [{
        title: '全部',
        id: ''
      }],
      tab2List: [{
        title: '全部',
        id: ''
      }, {
        title: '基础入门',
        id: 0
      }, {
        title: '进阶课程',
        id: 1
      }, {
        title: '名师指导',
        id: 2
      }],
      tab3List: [{
        title: '全部',
        id: ''
      }, {
        title: '新课首发',
        id: 0
      }, {
        title: '好评如潮',
        id: 1
      }, {
        title: '销量',
        id: 2
      }],
      filter: {
        type: '',
        musical: '',
        sort: ''
      },
      list: [],
      pagin: {
        currentPage: 0,
        pageSize: 10
      },
      swipeList: [],
    }
  },
  methods: {
    selectTab1(index, id) {
      this.tab1 = index;
      this.filter.musical = id;
      this.init();
    },
    selectTab2(index, id) {
      this.tab2 = index;
      this.filter.type = id;
      this.init();
    },
    selectTab3(index, id) {
      this.tab3 = index;
      this.filter.sort = id;
      this.init();
    },
    init() {
      this.pagin.currentPage = 0;
      this.finished = false;
      this.loading = false;
      this.list = [];
    },
    getMusicalList() {
      this.$http.common.musicalInstruments({
        type: 0,
        pageSize: 10
      }).then(({ Data }) => {
        const list = Data.List;
        const tabList = list.map((item) => {
          return {
            title: item.Name,
            id: item.Id
          }
        });
        this.tab1List = this.tab1List.concat(tabList);
      })
    },
    getList() {
      if (this.finished) {
        return;
      }
      const { pagin, filter } = this;
      this.$http.course.list({
        ...pagin,
        ...filter
      }).then(({ Data }) => {
        const list = Data.List;
        if (list.length < pagin.pageSize) {
          this.finished = true;
        } else {
          pagin.currentPage += 1;
        }
        this.loading = false;
        this.list = this.list.concat(list);
      }).catch(() => {
        this.error = true;
        this.loading = false;
      })
    },
    getBanner() {
      return this.$http.common.banner({
        position: 2
      })
    },
  },
  created() {
    this.getBanner().then(({ Data }) => {
      this.swipeList = Data.map(item => {
        return {
          url: item.Url,
          img: `${this.MEDIA_BASE_URL}${item.Image}`,
          type: item.Type,
          typeId: item.TypeId
        }
      })
      return this.getMusicalList();
    })
    let type = this.$route.query.type;
    if (type) {
      type = Number(type);
      this.selectTab2(type + 1, type);
    }
  },
}
</script>
<style lang="less" scoped>
.home-lesson-container{
  .right-icon{
    width: 66px;
    vertical-align: middle;
  }
  .tabs-list{
    background-color: #24252C;
    padding: 48px 60px;
    .line{
      overflow-x: auto;
      &:not(:last-child) {
        margin-bottom: 68px;
      }
      .scrolldiv{
        width: 1000%;
      }
      .item{
        float: left;
        padding: 10px 32px;
        line-height: 56px;
        color: #999;
        border-radius: 5px;
        margin-right: 23px;
        &.selected{
          background-color: #FF4A4A;
          color: #fff;
        }
      }
    }
  }
  .lesson-list{
    padding: 52px 60px;
    & > h1{
      font-size: 40px;
      font-weight: normal;
      margin-bottom: 14px;
    }
    .lesson{
      padding-top: 60px;
    }
  }
}
</style>
<style lang="less">
.home-lesson-container{
  .van-nav-bar{
    background-color: #24252c;
    .van-nav-bar__left{
      .van-icon-arrow-left{
        color: #fff !important;
      }
    }
    .van-nav-bar__title{
      color: #fff !important;
    }
  }
  .swiper-container{
    height: 412px;
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
