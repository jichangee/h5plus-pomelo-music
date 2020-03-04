<template>
  <div class="evaluation-article-container">
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
    <div class="comment-container">
      <h1>评论 {{data.CommentList.length}}</h1>
      <p class="no-comment" v-show="data.CommentList.length === 0">暂无评论</p>
      <div class="comment-list">
        <div class="comment-item" v-for="item in data.CommentList" :key="item.Id">
          <div class="media">
            <img :src="`${MEDIA_BASE_URL}${item.AppUser.Photo}`" alt="">
          </div>
          <div class="content">
            <p class="name">
              <span>{{item.AppUser.Nick}}</span>
              <span class="dianzan">
                <img src="../../assets/evaluation/dianzan.png" alt="">
                <i>{{item.LikeList.length}}</i>
              </span>
            </p>
            <p class="text">{{item.Content}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Statusbar from '@/components/Statusbar';
import Article from '@/components/Community/Article';
import Header from '@/components/Header'
import ImageItem from '@/components/Evaluation/ImageItem';
import VideoItem from '@/components/Evaluation/VideoItem';
import CommentList from '@/components/Evaluation/CommentList';
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
      },
      images: [],
      videos: [],
      loading: {
        like: false
      }
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
        document.title = `${Data.Title} - 音乐公园`;
        this.hideLoading();
      }).catch(() => {
        this.$toast('网络繁忙，请稍后再试');
        this.hideLoading();
      })
    },
  },
  created() {
    const id = this.$route.params.id;
    this.id = id;
    this.getData(id);
  },
  mounted() {
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
.comment-container{
  .border-top(#dedede);
  .no-comment{
    margin: 60px 0;
    text-align: center;
    color: #7f7f7f;
  }
  h1{
    font-size: 42px;
    line-height: 130px;
    padding: 0 60px;
    .border-bottom(#dedede);
  }
  .comment-list{
    padding: 0 60px;
    .border-bottom(#dedede);
    .comment-item{
      padding: 48px 0;
      display: flex;
      justify-content: space-between;
      .media{
        width: 108px;
        margin-right: 48px;
        img{
          display: block;
          width: 108px;
          height: 108px;
          border-radius: 50%;
        }
      }
      .content{
        width: 100%;
        .name{
          line-height: 96px;
          font-size: 42px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .dianzan{
            display: flex;
            align-items: center;
            img{
              width: 48px;
              margin-right: 10px;
            }
            i{
              font-style: normal;
            }
          }
        }
        .text{
          line-height: 1.67;
          font-size: 48px;
        }
      }
    }
  }
}
</style>
