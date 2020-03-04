<template>
  <div class="evaluation-video-container">
    <Statusbar />
    <div class="top-container">
      <a href="javascript:;" class="close" @click="back">
        <van-icon name="cross"></van-icon>
      </a>
    </div>
    <header>
      <h1>林小可入驻音乐公园，欢迎大家关注！</h1>
      <p class="user">@林小可</p>
    </header>
    <div class="video-container">
      <VideoPlayer src="http://app.jikesh.com/video/1.mp4" />
    </div>
    <ScrollCommentList />
    <footer>
      <div class="footer-head">
        <img class="head" src="../../assets/example/2.png" alt="">
        <span class="name">温州吴彦祖</span>
        <FollowButton class="follow-btn" :isFollow="true" />
      </div>
      <div class="footer-handle">
        <p>
          <img src="../../assets/evaluation/video/dianzan.png" alt="">
          <span>3.1w</span>
        </p>
        <p>
          <img src="../../assets/evaluation/video/zhuanfa.png" alt="">
        </p>
        <van-button type="primary" class="comment-btn main-btn" @click="showCommentContainer">
          <p>&nbsp;</p>
          <p class="img-btn">
            <img src="../../assets/evaluation/video/pinglun.png" alt="">
          </p>
          <p>4.9k</p>
        </van-button>
      </div>
      <div class="footer-bottom">
        <div class="play-btn">
          <a href="javascript:;">
            <img src="../../assets/evaluation/video/bofang.png" alt="">
          </a>
        </div>
        <div class="progress-container">
          <span class="time">00:23</span>
          <div class="progress-con">
            <i class="progress-circle" :style="`left: ${progress}%;`"></i>
            <div class="progress" :style="`width: ${progress}%;`"></div>
          </div>
          <span class="time">00:23</span>
        </div>
        <div class="fullscreen-btn">
          <a href="javascript:;">
            <img src="../../assets/evaluation/video/quanping.png" alt="">
          </a>
        </div>
      </div>
    </footer>
    <van-popup v-model="isShowComment" position="bottom">
      <CommentList :close="closeCommentPopup" />
    </van-popup>
  </div>
</template>
<script>
import Statusbar from '@/components/Statusbar'
import VideoPlayer from '@/components/VideoPlayer'
import FollowButton from '@/components/FollowButton'
import CommentList from '@/components/Show/CommentList'
import ScrollCommentList from '@/components/Evaluation/CommentList'
export default {
  components: {
    Statusbar,
    VideoPlayer,
    FollowButton,
    CommentList,
    ScrollCommentList
  },
  data() {
    return {
      progress: 30,
      isShowComment: false
    }
  },
  methods: {
    closeCommentPopup() {
      this.isShowComment = false;
    },
    showCommentContainer() {
      this.isShowComment = true;
    }
  }
}
</script>
<style lang="less" scoped>
.evaluation-video-container{
  .top-container{
    padding: 0 72px;
    margin-bottom: 110px;
    .close{
      font-size: 72px;
    }
  }
  header{
    padding: 0 60px;
    margin-bottom: 220px;
    h1{
      font-size: 60px;
      margin-bottom: 60px;
    }
    .user{
      font-size: 48px;
      color: #666;
    }
  }
  .video-container{
    margin: 0 auto;
    width: 1123px;
    height: 604px;
  }
  footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 435px;
    padding: 30px 60px 40px;
    background-color: #fff;
    .footer-head{
      display: flex;
      align-items: center;
      margin-bottom: 60px;
      .head{
        width: 90px;
        height: 90px;
        border-radius: 50%;
        margin-right: 25px;
      }
      .name{
        font-size: 42px;
        font-weight: bold;
        margin-right: 48px;
      }
      .follow-btn{
        width: 219px;
        height: 75px;
        line-height: 75px;
        border-radius: 36px;
      }
    }
    .footer-handle{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 52px;
      & > p{
        display: flex;
        align-items: center;
        font-size: 42px;
        font-weight: bold;
        img{
          margin-right: 20px;
        }
      }
      img{
        width: 75px;
      }
      .comment-btn{
        margin: 0;
        width: 630px;
        height: 100px;
        line-height: 100px;
        padding: 0;
        .btn-img,
        p{
          width: 33%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .van-button__text{
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: center;
        }
      }
    }
    .footer-bottom{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .play-btn{
        img{
          width: 56px;
        }
      }
      .fullscreen-btn{
        img{
          width: 66px;
        }
      }
      .progress-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 42px;
        font-weight: bold;
        .progress-con{
          width: 610px;
          margin: 0 38px;
          height: 6px;
          background-color: #f2f3f4;
          position: relative;
          .progress{
            width: 50%;
            height: 100%;
            background-color: #F04C4C;
          }
          .progress-circle{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 8px solid #F04C4C;
            background-color: #fff;
          }
        }
      }
    }
  }
}
</style>
