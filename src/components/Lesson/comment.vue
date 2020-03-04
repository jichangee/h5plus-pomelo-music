<template>
  <section class="comment-container">
    <div class="comment">
      <!-- <div class="tags" :class="{'more': isShowMoreTags}">
        <span class="tag selected">好评 (3784)</span>
        <span class="tag">民谣吉他</span>
        <span class="tag">零基础</span>
        <span class="tag">通俗易懂</span>
        <span class="tag">民谣吉他</span>
        <span class="tag">零基础</span>
        <span class="tag">民谣吉他</span>
        <span class="tag">民谣吉他</span>
        <span class="tag">零基础</span>
        <span class="tag">通俗易懂</span>
        <span class="tag">民谣吉他</span>
        <span class="tag">零基础</span>
        <span class="tag">民谣吉他</span>
      </div> -->
      <!-- <a href="javascript:;" class="show-more" @click="toggleMoreTags">
        <van-icon name="arrow-down" v-if="!isShowMoreTags"></van-icon>
        <van-icon name="arrow-up" v-else></van-icon>
      </a> -->
      <div class="list">
        <CommentItem v-for="item in commentList" :key="item.Id" :data="item" :type="0" />
      </div>
    </div>
  </section>
</template>
<script>
import CommentItem from '@/components/CommentItem';
export default {
  props: {
    commentList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    CommentItem,
  },
  data() {
    return {
      commentData: {
        rate: 4,
        reply: '要继续加油~感谢购买！要继续加油~感谢购买！要继续加油~感谢购买！要继续加油~感谢购买！'
      },
      isShowMoreTags: false
    }
  },
  methods: {
    toggleMoreTags() {
      this.isShowMoreTags = !this.isShowMoreTags;
    }
  }
}
</script>
<style lang="less" scoped>
.comment-container{
  padding: 0 40px;
  .show-more{
    text-align: center;
    width: 80px;
    height: 80px;
    line-height: 80px;
    margin: 0 auto;
    display: block;
    font-size: 60px;
  }
}
.comment{
  padding: 70px 0;
  .title{
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 70px;
    h1{
      font-size: 52px;
    }
    a{
      font-size: 40px;
      color: #FF4A4A;
    }
  }
  .tags{
    display: flex;
    flex-wrap: wrap;
    max-height: 240px;
    overflow: hidden;
    &.more{
      max-height: 10000px;
    }
    .tag{
      margin: 0 20px 40px;
      height:84px;
      padding: 0 38px;
      line-height: 84px;
      text-align: center;
      background:rgba(255,255,255,1);
      border:2px solid rgba(222,222,222,1);
      border-radius:42px;
      font-size: 40px;
      color: #666;
      &.selected{
        color: #FF4A4A;
        background-color: #FFF1F1;
        border-color: #FF9C9C;
      }
    }
  }
  .list{
    padding: 0 20px;
    .item{
      padding: 90px 0;
      &:not(:last-child) {
        .border-bottom(#dedede);
      }
      .item-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        img{
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin-right: 30px;
        }
        .content{
          width: 750px;
          .name{
            font-size: 44px;
            font-weight: bold;
            margin-bottom: 19px;
          }
          .desc{
            font-size: 32px;
            color: #999;
          }
        }
      }
      .item-body{
        margin-top: 50px;
        padding: 0 20px 0 120px;
        line-height: 1.47;
        font-size: 42px;
      }
      .reply{
        background-color: #F4F4F4;
        font-size: 36px;
        padding: 42px;
        border-radius: 15px;
        margin-top: 96px;
        position: relative;
        &:after{
          content: "";
          position: absolute;
          top: -40px;
          left: 60px;
          border-bottom: 40px solid #f4f4f4;
          border-left: 25px solid transparent;
          border-right: 25px solid transparent;
        }
        .title{
          color: #666;
          margin-bottom: 20px;
          padding: 0;
        }
        .content{
          color: #999;
        }
      }
    }
  }
}
</style>
