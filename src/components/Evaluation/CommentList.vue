<template>
  <div class="comment-list-component">
    <div class="scrolldiv">
      <van-list
        v-model="commentLoading"
        :finished="none"
        finished-text="没有更多了"
        :error="error"
        @load="onLoad"
        class="list"
      >
        <div class="item" v-for="(item, index) in commentList" :key="item.Id || item.CommunityId">
          <div class="handle">
            <a href="javascript:;" class="btn" @click="like(item, index)">
              <img v-if="!item.IsLike" src="../../assets/show/comment/like.png" alt="">
              <img v-else src="../../assets/show/comment/like2.png" alt="">
              <span>{{item.LikeList.length}}</span>
            </a>
          </div>
          <div class="media">
            <img class="head" :src="`${MEDIA_BASE_URL}${item.AppUser.Photo}`" alt="">
          </div>
          <div class="content">
            <p class="name">{{item.AppUser.Nick}}</p>
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
        <textarea v-model="content" placeholder="写下您的想法..."></textarea>
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
      default: 0
    },
    commentList: {
      type: Array,
      default() {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      none: false,
      commentLoading: false,
      error: false,
      content: ''
    };
  },
  methods: {
    onLoad() {
      this.commentLoading = true;
      this.$emit('load', () => {
        this.commentLoading = false;
        this.none = true;
      });
    },
    send() {
      this.$emit('send', this.content, (status) => {
        if (status === 'success') {
          this.content = ''
        }
      });
    },
    like(item, index) {
      this.$emit('like', item, index);
    },
    close() {
      this.$emit('close')
    }
  },
  created() {
    console.log(this.commentList);
    
  }
}
</script>
<style lang="less" scoped>
.comment-list-component{
  padding: 100px 60px 10px;
  background-color: #f6f6f6;
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
