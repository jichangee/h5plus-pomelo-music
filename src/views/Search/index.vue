<template>
  <div class="search-index-container">
    <header>
      <Statusbar />
      <div class="header-container">
        <van-icon name="arrow-left" class="icon" @click="back"></van-icon>
        <div class="search-box">
          <van-search placeholder="请输入搜索关键词" v-model="keyword" @search="onSearch" />
        </div>
      </div>
    </header>
    <section>
      <van-tabs v-model="tabIndex" @change="onChange">
        <van-tab title="用户">
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="list.length === 0 ? '暂无内容' : '没有更多了'"
            @load="loadMore"
            class="list-container user-list"
          >
            <UserItem v-for="item in list" :key="item.Id" :data="item" />
          </van-list>
        </van-tab>
        <van-tab title="社区">
          <div class="evaluation-container">
            <van-list
              :finished="finished"
              :finished-text="list.length === 0 ? '暂无内容' : '已经到底了'"
              v-model="loading"
              @load="loadMore"
            >
              <div class="__video-list" v-if="tabIndex === 1">
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
                      <img class="head" :src="`${MEDIA_BASE_URL}${item.AppUser && item.AppUser.Photo}`" alt="">
                      <span>{{item.AppUser && item.AppUser.Nick}}</span>
                    </p>
                    <!-- <p class="info">
                      <img src="../../assets/common/bofanghui.png" alt="">
                      <span>1.8w</span>
                    </p> -->
                  </div>
                </router-link>
              </div>
            </van-list>
          </div>
        </van-tab>
        <!-- <van-tab title="社区">
          <div class="list-container">
            <PostItem class="post-item" />
            <PostItem class="post-item" />
            <PostItem class="post-item" />
            <PostItem class="post-item" />
          </div>
        </van-tab> -->
        <van-tab title="课程">
          <div class="list-container">
            <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="list.length === 0 ? '暂无内容' : '已经到底了'"
              :error.sync="error"
              error-text="加载失败，点击重试"
              @load="loadMore"
              class="lesson"
            >
              <LessonItem v-for="item in list" :key="item.Id" :data="item" />
            </van-list>
          </div>
        </van-tab>
        <van-tab title="商城">
          <div class="goods-list list-container" :class="{'none': list.length === 0}">
            <van-list
              :finished="finished"
              v-model="loading"
              :finished-text="list.length === 0 ? '暂无内容' : '已经到底了'"
              @load="loadMore"
            >
              <GoodsItem
                v-for="item in list"
                :key="item.ProductId"
                :data="item"
              />
            </van-list>
          </div>
        </van-tab>
      </van-tabs>
    </section>
  </div>
</template>
<script>
import Statusbar from '@/components/Statusbar'
import UserItem from '@/components/Search/UserItem'
import EvaluationList from '@/components/Evaluation/List'
import PostItem from '@/components/PostItem'
import LessonItem from '@/components/Lesson/Item';
import GoodsItem from '@/components/GoodsItem';
export default {
  components: {
    Statusbar,
    UserItem,
    EvaluationList,
    PostItem,
    LessonItem,
    GoodsItem
  },
  data() {
    return {
      tabIndex: 0,
      loading: false,
      finished: false,
      error: false,
      list: [],
      keyword: '',
      pagin: {
        currentPage: 0,
        pageSize: 10
      }
    }
  },
  methods: {
    onLoad() {
      console.log(1);
    },
    onSearch() {
      this.onChange();
    },
    onChange() {
      this.finished = false;
      this.loading = false;
      this.pagin.currentPage = 0;
      this.list = [];
    },
    loadMore() {
      this.getData();
    },
    getData() {
      const { tabIndex } = this;
      const { pagin, keyword, finished } = this;
      if (finished) {
        return;
      }
      if (keyword === '') {
        this.loading = false;
        this.finished = true;
        return;
      }
      console.log(tabIndex);
      if (tabIndex === 0) {
        this.$http.user.list({
          ...pagin,
          keyword
        }).then(({ Data }) => {
          const list = Data.List;
          this.loading = false;
          if (list.length < pagin.pageSize) {
            this.finished = true;
          } else {
            this.pagin.currentPage += 1;
          }
          this.list = this.list.concat(list);
        }).catch(() => {
          this.error = true;
          this.loading = false;
        })
      } else if (tabIndex === 1) {
        this.$http.community.list({
          typeId: '',
          keyword,
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
            this.finished = true;
          } else {
            this.pagin.currentPage += 1;
          }
          this.list = this.list.concat(list);
        }).catch(() => {
          this.error = true;
          this.loading = false;
        })
      } else if (tabIndex === 2) {
        this.$http.course.list({
          ...pagin,
          keyword
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
      } else if (tabIndex === 3) {
        this.$http.product.type({
          ...pagin,
          keyword
        }).then(({ Data }) => {
          this.loading = false;
          const list = Data.List;
          if (list.length < pagin.pageSize) {
            this.finished = true;
          } else {
            this.currentPage += 1;
          }
          this.list = this.list.concat(list);
        }).catch(() => {
          this.error = true;
          this.loading = false;
        })
      }
    }
  },
  created() {
    this.tabIndex = Number(this.$route.query.tab) || 0
  }
}
</script>
<style lang="less" scoped>
.search-index-container{
  height: 100vh;
  overflow: hidden;
}
header{
  .header-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 60px;
    height: 160px;
    .icon{
      font-size: 70px;
    }
    .search-box{
      width: 1010px;
    }
  }
}
.list-container,
.evaluation-container{
  margin-top: 12px;
  height: 1846px;
  overflow: auto;
  background-color: #fff;
}
.list-container{
  padding: 0 60px;
  .post-item{
    padding: 65px 0;
    &:not(:last-child) {
      .border-bottom(#dedede);
    }
  }
}
.__video-list{
  min-height: 800px;
  padding: 0 60px;
  column-count: 2;
  column-width: 240px;
  column-gap: 20px;
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
.goods-list{
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #f2f3f4;
  &.none{
    display: block;
  }
}
</style>
<style lang="less">
.search-index-container{
  .van-search{
    padding-left: 0;
    padding-right: 0;
  }
  .van-tabs__wrap{
    &:after{
      display: none;
    }
  }
  .van-tab{
    color: #999;
    &.van-tab--active{
      color: #333;
    }
  }
  .van-ellipsis{
    font-size: 0.37037rem;
  }
  .van-search__content{
    height: 0.80515rem;
    border-radius: 0.40257rem;
  }
  .van-list__loading{
    margin-top: 20px;
  }
}
</style>
