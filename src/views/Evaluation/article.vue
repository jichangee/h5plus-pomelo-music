<template>
  <div class="evaluation-article-container">
    <Header
      :title="data.Title"
    >
      <a slot="right" href="javascript:;" class="share-icon" @click="shareWeb">
        <img src="../../assets/article/fenxiang.png" alt="">
      </a>
    </Header>
    <Article :data="data" />
    <div class="media-list">
      <VideoItem
        v-for="(video, index) in videos"
        :key="index + 100000"
        :data="video"
        :readonly="true"
      />
      <ImageItem
        v-for="(image, index) in images"
        :key="index"
        :data="image"
        :readonly="true"
      />
    </div>
    <div class="footer-plac"></div>
    <footer>
      <a href="javascript:;" class="btn" @click="isShowCommentBox = true">写评论...</a>
      <a href="javascript:;" class="comment" @click="isShowCommentBox = true">
        <img src="../../assets/evaluation/pinglun1.png" alt="">
        <span>{{data.CommentList.length}}</span>
      </a>
    </footer>
    <van-popup v-model="isShowCommentBox" position="bottom" class="box">
      <CommentList
        @close="onCloseCommentBox"
        @load="onLoadCommentList"
        @send="onSendComment"
        @like="communityLike"
        :commentList="data.CommentList"
      />
    </van-popup>
  </div>
</template>
<script>
import Statusbar from '@/components/Statusbar';
import Article from '@/components/Community/Article';
import Header from '@/components/Header'
import ImageItem from '@/components/Evaluation/ImageItem';
import VideoItem from '@/components/Evaluation/VideoItem';
import CommentList from '@/components/Evaluation/CommentList';
import { getShareService, shareWeb } from '../../utils/share';
export default {
  components: {
    Statusbar,
    Article,
    Header,
    ImageItem,
    VideoItem,
    CommentList
  },
  data() {
    return {
      isShowCommentBox: false,
      id: '',
      data: {
        CommentList: [],
        IsLike: false
      },
      images: [],
      videos: [],
      loading: {
        like: false
      },
      shareParams: null
    }
  },
  methods: {
    getData(id) {
      this.showLoading();
      this.$http.community.detail({
        id
      }).then(({ Data }) => {
        this.data = Data;
        this.images = Data.Images ? JSON.parse(Data.Images) : [];
        this.videos = Data.Videos ? JSON.parse(Data.Videos) : [];
        this.hideLoading();
      }).catch(() => {
        this.$toast('网络繁忙，请稍后再试');
        this.hideLoading();
      })
    },
    communityLike(commentData, index) {
      const { id } = this;
      if (this.loading.like) return;
      const commentItem = this.data.CommentList[index];
      commentItem.IsLike = !commentItem.IsLike;
      commentItem.LikeList.push('');
      this.loading.like = true;
      this.$http.community.like({
        id,
        commentId: commentData.Id
      }).then(() => {
        this.loading.like = false;
      }).catch(() => {
        this.loading.like = false;
        commentItem.IsLike = !commentItem.IsLike;
        commentItem.LikeList.slice(0, commentItem.LikeList.length - 1);
      })
    },
    onCloseCommentBox() {
      this.isShowCommentBox = false;
    },
    onLoadCommentList(cb) {
      cb && cb('success')
    },
    onSendComment(content, cb) {
      this.$http.community.comment({
        id: this.id,
        Content: content
      }).then(() => {
        this.$toast('评论发表成功');
        this.getData(this.id);
        cb && cb('success')
      }).catch(() => {
        cb && cb('fail')
      })
    },
    shareWeb() {
      shareWeb({
        title: this.data.Title,
        url: `https://www.yinyuegongyuan.com/src/#/evaluation/share/article/${this.id}`,
        desc: `${this.data.Content.substring(0, 30)}...`,
        shareParams: this.shareParams
      })
    }
  },
  created() {
    const id = this.$route.params.id;
    this.id = id;
    this.getData(id);
  },
  mounted() {
    getShareService('weixin').then((shareParams) => {
      console.log(shareParams);
      this.shareParams = shareParams;
    })
  }
}
</script>
<style lang="less" scoped>
.evaluation-article-container{
  .share-icon{
    img{
      width: 66px;
      vertical-align: middle;
    }
  }
  .tags{
    padding: 120px 60px 70px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .tag{
      margin: 0 50px 50px 0;
      font-size: 40px;
      color: #999;
    }
  }
  section{
    padding: 0 60px;
    .title{
      padding: 70px 0 0;
      margin-bottom: 14px;
      h1{
        font-size: 52px;
      }
    }
  }
  .footer-plac{
    height: 168px;
  }
  footer{
    .border-top(#dedede);
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    height: 168px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 60px;
    background-color: #fff;
    p{
      color: #666;
    }
    .btn{
      width:573px;
      height:105px;
      line-height: 105px;
      text-align: center;
      background:linear-gradient(45deg,rgba(255,148,91,1) 0%,rgba(255,55,117,1) 100%);
      border-radius:15px;
      font-size: 42px;
      color: #fff;
    }
    .comment,
    .like{
      display: flex;
      align-items: center;
      img{
        width: 75px;
        margin: 0 10px;
      }
    }
  }
  .media-list{
    & > div{
      margin-bottom: 40px;
    }
  }
}
</style>
