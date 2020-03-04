<template>
  <div class="show-comment-compoent">
    <h1>评论 {{totalCount}}</h1>
    <div class="scrolldiv">
      <van-list
        v-model="commentLoading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="list"
      >
        <div class="item" v-for="item in commentList" :key="item.Id">
          <div class="handle">
            <a href="javascript:;" class="btn" @click="like(item)">
              <img v-if="!item.IsLike" src="../../assets/show/comment/like.png" alt="">
              <img v-else src="../../assets/show/comment/like2.png" alt="">
              <span>{{item.LikeCount}}</span>
            </a>
          </div>
          <div class="media">
            <img class="head" :src="`${MEDIA_BASE_URL}${item.UserPhoto}`" alt="">
          </div>
          <div class="content">
            <p class="name">{{item.User}}</p>
            <p class="text">{{item.Content}}</p>
          </div>
        </div>
      </van-list>
    </div>
    <div class="input-container">
      <a
        href="javascript:;"
        class="send"
        @click="send">
          <img src="../../assets/show/comment/fasong.png" alt="">
      </a>
      <div class="inputdiv">
        <textarea v-model="content" placeholder="喜欢大声说出来..."></textarea>
      </div>
    </div>
    <a href="javascript:;" class="close" @click="close"><img src="../../assets/show/comment/guanbi.png" alt=""></a>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: Number,
      default: ''
    },
    close: {
      type: Function,
      default() {
        return {}
      }
    },
    commentList: {
      type: Array,
      default() {
        return []
      }
    },
    totalCount: {
      type: Number,
      default: 0
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      commentLoading: false,
      finished: false,
      content: '',
      likeLoading: false,
    }
  },
  methods: {
    onLoad() {
      this.commentLoading = true;
      this.$emit('load');
    },
    like(item) {
      if (this.likeLoading) {
        return;
      }
      this.likeLoading = true;
      const { id } = this;
      const commentId = item.Id;
      const isLike = item.IsLike;
      const changeCount = isLike ? -1 : 1;
      item.IsLike = !item.IsLike;
      item.LikeCount += changeCount;
      this.$http.show.commentLike({
        id,
        commentId
      }).then(() => {
        this.likeLoading = false;
      }).catch(() => {
        item.LikeCount -= changeCount;
        item.IsLike = !item.IsLike;
        this.likeLoading = false;
      })
    },
    send() {
      const { id, content } = this;
      if (id && content) {
        this.showLoading();
        this.$http.show.comment({
          id,
          Content: content
        }).then(({ Data }) => {
          const Id = Data;
          this.hideLoading();
          this.$toast('评论发布成功');
          const comment = {
            Id,
            Content: content,
            User: '我',
            LikeCount: 0,
            UserPhoto: 'https://youziyinyue.oss-cn-hangzhou.aliyuncs.com/root/appuser/default/photo1.jpg'
          }
          this.content = '';
          this.commentList.unshift(comment);
        })
      }
    }
  },
  deactivated() {
    console.log('deactivated');
  },
  watch: {
    'loading'() {
      this.commentLoading = this.loading;
      this.finished = !this.loading && this.totalCount <= this.commentList.length;
    }
  }
}
</script>
<style lang="less" scoped>
.show-comment-compoent{
  padding: 100px 60px 10px;
  background-color: #f6f6f6;
  h1{
    font-size: 60px;
    margin-bottom: 100px;
  }
  .scrolldiv{
    height: 860px;
    overflow: auto;
    margin-bottom: 120px;
  }
  .list{
    .item{
      margin-bottom: 120px;
      .media{
        width: 110px;
        height: 110px;
        float: left;
        img{
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .handle{
        float: right;
        img{
          width: 52px;
          margin-right: 10px;
          vertical-align: bottom;
        }
        span{
          font-size: 36px;
          color: #999;
        }
      }
      .content{
        margin: 0 157px 0 128px;
        .name{
          font-size: 40px;
          color: #666;
          margin-bottom: 22px;
        }
        .text{
          font-size: 48px;
          line-height: 1.47;
          word-break: break-all;
        }
      }
    }
  }
  .input-container{
    height: 110px;
    background-color: #fff;
    .send{
      float: right;
      width: 110px;
      height: 110px;
      img{
        width: 72px;
        height: 72px;
        display: block;
        margin: 19px auto;
      }
    }
    .inputdiv{
      margin: 0 110px 0 0;
      height: 100%;
      textarea{
        width: 100%;
        height: 100%;
        border-radius: 10px;
        padding: 34px 42px;
        font-size: 44px;
      }
    }
  }
  
  .close{
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    display: block;
    margin: 65px auto 0;
    img{
      width: 56px;
    }
  }
}
</style>
