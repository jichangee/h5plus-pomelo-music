<template>
  <div class="mall-index-container">
    <header>
      <Statusbar/>
      <div class="line">
        <a href="javascript:;" class="back" @click="back">
          <van-icon name="arrow-left"></van-icon>
        </a>
        <a
          href="javascript:;"
          :class="{
            'tab-item': true,
            'text-shadow': true,
            'selected': selectIndex === 0
          }"
          @click="select(0)"
        >推荐</a>
        <a
          href="javascript:;"
          :class="{
            'tab-item': true,
            'text-shadow': true,
            'selected': selectIndex === 1
          }"
          @click="select(1)"
        >关注</a>
        <!-- <router-link to="/search/index?tab=2" class="search">
          <van-icon name="search"></van-icon>
        </router-link> -->
      </div>
    </header>
    <div class="handle-container">
      <router-link :to="`/home/user/${showDetail.UserId}`" class="head">
        <img :src="`${MEDIA_BASE_URL}${showDetail.UserPhoto}`" alt>
      </router-link>
      <a href="javascript:;" class="btn like" @click="toggleLike">
        <img v-if="!showDetail.IsLiked" src="../../assets/show/dianzan.png" alt>
        <img v-else class="is-like-icon" src="../../assets/show/dianzan1.png" alt>
        <p class="text-shadow">{{showDetail.LikeCount}}</p>
      </a>
      <a href="javascript:;" class="btn" @click="showCommentPopup">
        <img src="../../assets/show/pinglun.png" alt>
        <p class="text-shadow">{{showDetail.CommentCount}}</p>
      </a>
      <!-- <a href="javascript:;" class="btn">
        <img src="../../assets/show/zhuanfa.png" alt>
        <p class="text-shadow">{{showDetail.ShareCount}}</p>
      </a> -->
      <a href="javascript:;" class="btn" @click="isShowSelectModal = true">
        <img class="upload" src="../../assets/show/shangchuan.png" alt>
        <p class="text-shadow">上传发布</p>
      </a>
    </div>
    <div class="desc-container">
      <p class="category text-shadow">{{showDetail.Tag ? `#${showDetail.Tag}` : ' '}}</p>
      <p class="name text-shadow">@{{showDetail.User}}</p>
      <p class="desc text-shadow">{{showDetail.Title}}</p>
    </div>
    <div class="progress-container">
      <p class="progress" :style="`width: ${videoInfo.progress}%`"></p>
    </div>
    <div class="video-container">
      <van-swipe
        vertical
        class="swiper-container"
        :loop="false"
        :show-indicators="false"
        @change="swipeChange"
        ref="swiper"
        :duration="swiperDuration"
        :initial-swipe="initialSwipe"
      >
        <van-swipe-item v-for="item in videoList" :key="item.Id">
          <VideoPlayer
            :cb="playerCallback"
            :src="`${MEDIA_BASE_URL}${item.VideoUrl}`"
            :played="playedIndex === item.Id"
            @vDblclick="onVideoDblclick"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-popup v-model="isShowComment" position="bottom" @closed="commentClosed" v-if="hackRestart">
      <ShowCommentList
        :id="showDetail.ShowId"
        :close="closeCommentPopup"
        :totalCount="commentData.TotalCount"
        :commentList="commentData.List"
        :loading="commentLoading"
        @load="loadCommentList"
      />
    </van-popup>
    <van-popup v-model="isShowSelectModal" position="bottom" :lazy-render="false">
      <div class="modal-list">
        <div class="item" @click="videoCapture" v-if="!isIOS">
          拍摄
        </div>
        <div class="item">
          上传视频
          <input type="file" class="file" id="uploader" accept="video/*" capture="camcorder" ref="uploader">
        </div>
        <div class="item" @click="isShowSelectModal = false">取消</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Statusbar from "@/components/Statusbar";
import VideoPlayer from "@/components/VideoPlayer";
import ShowCommentList from "@/components/Show/CommentList";
import BASE_URL from "../../config/api";
import { isIOS } from '../../utils/check';
export default {
  components: {
    Statusbar,
    VideoPlayer,
    ShowCommentList
  },
  computed: {
    swiper() {
      return this.$refs.swiper;
    }
  },
  data() {
    return {
      isShowSelectModal: false,
      videoList: [],
      isShowComment: false,
      commentListNone: false,
      selectIndex: 0,
      playedIndex: 0,
      initialSwipe: 0,
      swiperOption: {
        direction: "vertical",
        loop: true
      },
      videoInfo: {},
      player: null,
      pagin: {
        currentPage: 0,
        pageSize: 10
      },
      commentData: {
        List: []
      },
      commentLoading: false,
      commentPagin: {
        currentPage: 0,
        pageSize: 10
      },
      showDetail: {
        Title: "",
        CommentCount: 0,
        IsLiked: false,
        LikeCount: 0,
        ShareCount: 0,
        ShowId: 4
      },
      none: false,
      likeLoading: false,
      swiperDuration: 300,
      hackRestart: true,
      showParams: {
        type: 0
      },
      postName: "show",
      isIOS: false,
    };
  },
  methods: {
    select(index) {
      this.selectIndex = index;
      this.postName = index === 0 ? "show" : "collectShow";
      this.pagin.currentPage = 0;
      this.videoList = [];
      this.none = false;
      this.initialSwipe = 0;
      this.initGetList();
    },
    toggleLike() {
      this.onVideoDblclick();
    },
    playerCallback(videoInfo, player) {
      this.player = player;
      this.videoInfo = videoInfo;
    },
    swipeChange(index) {
      const id = this.videoList[index].Id;
      this.getShowDetail(id);
      this.playedIndex = id;
      if (this.videoList.length <= index + 2 && !this.commentListNone) {
        this.getShowList(() => {
          this.initialSwipe = index;
        });
      }
    },
    closeCommentPopup() {
      this.isShowComment = false;
    },
    commentClosed() {
      this.commentData = {
        List: [],
        TotalCount: 0
      };
      this.commentPagin = {
        currentPage: 0,
        pageSize: 10
      };
      this.commentLoading = false;
      this.commentListNone = false;
      this.hackRestart = false;
      setTimeout(() => {
        this.hackRestart = true;
      }, 0);
    },
    showCommentPopup() {
      this.isShowComment = true;
      this.player && this.player.pause();
    },
    getVideoTotalTime(videoFile) {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        console.log(video.duration);
      };
      video.src = window.URL.createObjectURL(videoFile);
    },
    getShowDetail(id) {
      this.$http.show
        .detail({
          id
        })
        .then(({ Data }) => {
          this.showDetail = Data;
        });
    },
    loadCommentList() {
      if (this.commentListNone) {
        return;
      }
      this.getCommentList();
    },
    getCommentList() {
      const { commentPagin, commentData, showDetail } = this;
      this.commentLoading = true;
      this.$http.show
        .commentList({
          ...commentPagin,
          id: showDetail.ShowId
        })
        .then(({ Data }) => {
          const list = Data.List;
          if (list.length >= commentPagin.pageSize) {
            this.commentPagin.currentPage += 1;
          } else {
            this.commentListNone = true;
          }
          this.commentLoading = false;
          this.commentData.TotalCount = Data.TotalCount;
          this.commentData.List = commentData.List.concat(list);
        });
    },
    getShowList(cb) {
      const { pagin, videoList, showParams, postName } = this;
      console.log("showParams", showParams);

      if (this.none) {
        return;
      }
      const http =
        postName === "show"
          ? this.$http.show.list
          : this.$http.user.collectShow;
      http({
        ...pagin,
        ...showParams
      }).then(({ Data }) => {
        const list = Data.List;
        if (list.length < pagin.pageSize) {
          this.none = true;
        } else {
          this.pagin.currentPage += 1;
        }
        this.videoList = videoList.concat(list);
        cb && cb();
      });
    },
    onVideoDblclick() {
      if (this.likeLoading) return;
      const { showDetail } = this;
      this.likeLoading = true;
      const changeCount = this.showDetail.IsLiked ? -1 : 1;
      this.showDetail.IsLiked = !this.showDetail.IsLiked;
      this.showDetail.LikeCount += changeCount;
      this.$http.show
        .like({
          id: showDetail.ShowId
        })
        .then(() => {
          this.likeLoading = false;
        })
        .catch(() => {
          this.likeLoading = false;
          // 点赞失败，返回上一个状态
          this.showDetail.LikeCount -= changeCount;
          this.showDetail.IsLiked = !this.showDetail.IsLiked;
        });
    },
    initGetList() {
      this.getShowList(() => {
        const id = this.videoList[0].Id;
        this.getShowDetail(id);
        this.playedIndex = id;
      });
    },
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
      u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type:mime});
    },
    videoCapture() {
      var cmr = plus.camera.getCamera();
      var res = cmr.supportedVideoResolutions[0];
      var fmt = cmr.supportedVideoFormats[0];
      console.log('res', res);
      
      cmr.startVideoCapture(
        (path) => {
          plus.io.resolveLocalFileSystemURL(
            path,
            entry => {
              entry.file(file => {
                const reader = new plus.io.FileReader();
                reader.onloadend = (e) => {
                  const blob = this.dataURLtoBlob(e.target.result);
                  const newfile = new File([blob], file.name);
                  this.getVideoTotalTime(newfile);
                  this.$store.commit('SET_UPLOAD_FILE', newfile);
                  this.$router.push('/show/index/pubilsh')
                };
                reader.readAsDataURL(file);
              });
            },
            () => {
              this.$toast.fail('读取文件失败');
            },
          );
        },
        (error) => {
          console.log("Capture video failed: " + error.message);
        },
        { resolution: res, format: fmt }
      );
    }
  },
  created() {
    this.isIOS = isIOS();
    const action = this.$route.query.action;
    if (action && action === "info") {
      const info = this.$store.getters.youShowInfo;
      this.showParams.type = info.type;
      this.showParams.userId = info.userId;
      this.pagin.currentPage = info.currentPage + 1;
      this.videoList = info.list;
      this.initialSwipe = info.index;
      const id = this.videoList[info.index].Id;
      this.getShowDetail(id);
      this.playedIndex = id;
      this.swipeChange(info.index);
    } else {
      this.initGetList();
    }
  },
  mounted() {
    this.$refs.uploader.addEventListener('change', () => {
      const file = this.$refs.uploader.files[0];
      this.getVideoTotalTime(file);
      this.$store.commit('SET_UPLOAD_FILE', file);
      this.$router.push('/show/index/pubilsh')
    })
  }
};
</script>
<style lang="less" scoped>
.mall-index-container {
  height: 100vh;
  overflow: hidden;
  header {
    padding: 20px 60px 0;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
    .line {
      .back {
        font-size: 75px;
        margin-right: 126px;
        color: #f3f3f3;
        float: left;
        margin-top: 5px;
      }
      .tab-item {
        font-size: 52px;
        color: #eae9e9;
        margin-right: 100px;
        position: relative;
        &.selected {
          font-size: 86px;
          color: #fff;
          &:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: -5px;
            width: 116px;
            height: 14px;
            background: linear-gradient(
              90deg,
              rgba(255, 49, 119, 1) 0%,
              rgba(255, 149, 91, 1) 100%
            );
            border-radius: 7px;
          }
        }
        &:nth-child(3) {
          &:after {
            right: 0;
            left: initial;
          }
        }
      }
      .search {
        float: right;
        color: #fff;
        font-size: 75px;
        margin-top: 5px;
      }
    }
  }
  .handle-container {
    position: fixed;
    right: 0;
    bottom: 0;
    padding: 0 60px 140px;
    color: #fff;
    z-index: 9;
    .head {
      display: block;
      margin-bottom: 120px;
      img {
        border: 2px solid #fff;
        width: 148px;
        height: 148px;
        border-radius: 50%;
      }
    }
    .is-like-icon {
      animation: showLikeIcon ease-in-out 500ms;
    }
    .btn {
      text-align: center;
      display: block;
      color: #fff;
      font-size: 44px;
      color: #eae9e9;
      margin-bottom: 90px;
      position: relative;
      img {
        width: 126px;
        color: #fff;
        display: block;
        margin: 0 auto 30px;
      }
      .upload {
        width: 149px;
        height: 149px;
        margin-bottom: 27px;
      }
      p {
        font-size: 36px;
      }
      #uploader {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        opacity: 0.01;
      }
    }
  }
  .desc-container {
    pointer-events: none;
    position: fixed;
    left: 60px;
    bottom: 140px;
    color: #fff;
    font-size: 48px;
    z-index: 9;
    .text-shadow {
      text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.41);
    }
    .category {
      margin-bottom: 63px;
    }
    .name {
      font-weight: bold;
      margin-bottom: 48px;
    }
    .desc {
      line-height: 72px;
      width: 670px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .progress-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 9px;
    z-index: 9;
    .progress {
      height: 100%;
      width: 0%;
      background: linear-gradient(
        90deg,
        rgba(255, 147, 92, 1) 0%,
        rgba(255, 51, 119, 1) 100%
      );
      border-radius: 0px 5px 5px 0px;
      transition: all 350ms linear;
    }
  }
  .swiper-container {
    height: 100%;
  }
  .video-container {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.modal-list{
  background-color: #f1f1f1;
  .item{
    padding: 50px 0;
    font-size: 48px;
    text-align: center;
    position: relative;
    &:not(:last-child) {
      .border-bottom(#dedede);
    }
    &:active{
      background-color: #dedede;
    }
    .file{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      bottom: 0;
      opacity: 0.01;
    }
  }
}
@keyframes showLikeIcon {
  0% {
    transform: scale(1);
  }
  33% {
    transform: scale(1.2);
  }
  66% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>
