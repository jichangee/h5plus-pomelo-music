<template>
  <div class="show-pubilsh-container">
    <Header title="发布" bc="#24252C" class="header"/>
    <section>
      <div class="title-container">
        <input type="text" v-model="form.Title" placeholder="加个标题，内容会被更多人看到哦~">
      </div>
    </section>
    <section>
      <div class="tags-container">
        <a href="javascript:;" class="add-tag" @click="showSelectTag">{{tag ? `#${tag}` : '#添加标签'}}</a>
      </div>
    </section>
    <section>
      <div class="video-container">
        <div class="cp" ref="domCp">
          <div class="half-bg half-bg-l">
            <div class="half half-l"></div>
          </div>
          <div class="half-bg half-bg-r">
            <div class="half half-r"></div>
          </div>
        </div>
        <VideoPlayer :src="fileUrl" class="video-con" />
      </div>
    </section>
    <van-button type="primary" class="main-btn" :loading="uploading" @click="submit">确认发布</van-button>
    <van-popup v-model="isShowPercent" class="percent-popup">
      <p class="percent-text">{{percent}}%</p>
      <p class="percent-tip">正在发布视频，请勿退出页面</p>
    </van-popup>
    <van-popup v-model="isShowSelectTag" position="bottom" :overlay="false">
      <div class="select-tag-container">
        <section class="select-tag-header">
          <Statusbar />
          <van-search
            v-model="searchValue"
            placeholder="输入话题"
            show-action
            @search="onSearch"
            @cancel="onCancel"
          />
        </section>
        <section class="tag-list">
          <div v-show="searchValue !== ''" class="item me" @click="selectTag(searchValue)">
            <p class="tag"><b>#</b> {{searchValue}}</p>
            <p class="person-num"></p>
          </div>
          <h1>热门话题推荐</h1>
          <div class="item" @click="selectTag('钢琴曲谱')">
            <p class="tag"><b>#</b> 钢琴曲谱</p>
            <p class="person-num">18人参与</p>
          </div>
          <div class="item" @click="selectTag('熬夜大赛')">
            <p class="tag"><b>#</b> 熬夜大赛</p>
            <p class="person-num">18人参与</p>
          </div>
          <div class="item" @click="selectTag('情侣头像')">
            <p class="tag"><b>#</b> 情侣头像</p>
            <p class="person-num">18人参与</p>
          </div>
          <div class="item" @click="selectTag('电影插曲')">
            <p class="tag"><b>#</b> 电影插曲</p>
            <p class="person-num">18人参与</p>
          </div>
        </section>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Statusbar from '@/components/Statusbar';
import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";
import { object2formData, createRandomFileName } from '../../utils';
export default {
  components: {
    Header,
    VideoPlayer,
    Statusbar
  },
  data() {
    return {
      fileUrl: "",
      isShowPercent: false,
      percent: 0,
      uploading: false,
      isShowSelectTag: false,
      searchValue: '',
      tag: '',
      file: null,
      form: {
        Title: '',
        Video: '',
      }
    };
  },
  methods: {
    onSearch() {

    },
    onCancel() {
      this.isShowSelectTag = false;
    },
    showSelectTag() {
      this.isShowSelectTag = true;
    },
    selectTag(tag) {
      this.tag = tag;
      this.isShowSelectTag = false;
    },
    updateRect(percent = 0) {
      const domCp = this.$refs.domCp;
      if (percent < 50) {
        domCp.querySelector(".half-r").style.transform =
          "rotate(" + (percent / 50) * 180 + "deg)";
        domCp.querySelector(".half-l").style.transform = "rotate(0deg)";
      } else {
        domCp.querySelector(".half-r").style.transform = "rotate(180deg)";
        domCp.querySelector(".half-l").style.transform =
          "rotate(" + ((percent - 50) / 50) * 180 + "deg)";
      }
      this.percent = percent;
    },
    submit() {
      if (!this.form.Title) {
        this.$toast('请输入视频标题');
        return;
      }
      this.uploading = true;
      // let percent = 0;
      const { file } = this;
      const formData = createRandomFileName(file);
      let Toast;
      this.$http.show.upload(formData).then(({ Data }) => {
        this.uploading = false;
        Toast = this.$toast.loading({
          message: '视频上传成功，正在发布',
          duration: 0,
          forbidClick: true
        })
        this.form.Video = Data[0];
        if (this.tag) {
          this.form.Tag = this.tag;
        }
        return this.$http.show.publish({
          ...this.form
        });
      }).then(() => {
        Toast.clear();
        this.$toast('发布成功');
        this.$router.go(-1);
      }).catch(() => {
        this.uploading = false;
      })
      // let timer = setInterval(() => {
      //   percent += 10;
      //   this.updateRect(percent)
      //   if (percent === 100) {
      //     clearInterval(timer);
      //     this.isShowPercent = this.uploading = false;
      //   }
      // }, 1000);
    }
  },
  created() {
    const file = this.$store.getters.uploadFile;
    if (file) {
      const url = window.URL.createObjectURL(file);
      this.fileUrl = url;
      this.file = file;
    }
  },
  mounted() {
    
  }
};
</script>
<style lang="less" scoped>
.show-pubilsh-container {
  background-color: #24252c;
  height: 100vh;
  section {
    padding: 0 60px;
  }
  .title-container {
    margin-top: 12px;
    padding: 30px 0;
    .border-bottom(#dedede);
    input {
      color: #fff;
      font-size: 48px;
      width: 100%;
      background: transparent;
    }
  }
  .tags-container {
    padding-top: 60px;
    margin-bottom: 70px;
    .add-tag {
      font-size: 40px;
      color: #ff5858;
    }
  }
  .video-container {
    width: 709px;
    height: 1262px;
    margin: 0 auto 192px;
    position: relative;
    .video-con{
      position: relative;
      z-index: 2;
    }
    .cp {
      z-index: 1;
      position: absolute;
      top: -30px;
      left: -30px;
      width: 769px;
      height: 1322px;
      overflow: hidden;
      background: linear-gradient(90deg,rgba(255,96,79,1) 0%,rgba(255,63,99,1) 0%,rgba(255,148,95,1) 100%);
    }
    .cp .half-bg {
      position: absolute;
      width: 50%;
      height: 100%;
      box-sizing: border-box;
      overflow: hidden;
    }
    .cp .half-bg-l {
      left: 0;
    }
    .cp .half-bg-r {
      left: 50%;
    }
    .cp .half-bg .half {
      width: 200%;
      height: 200%;
      margin-top: -100%;
      background-color: #24252c;
    }
    .cp .half-bg .half-l {
      margin-left: -100%;
      transform-origin: right center;
      transform: rotate(0deg);
      margin-top: -200%;
    }
    .cp .half-bg .half-r {
      transform-origin: left center;
      transform: rotate(0deg);
    }
  }
  .main-btn {
    margin: 0 auto;
    width: 460px;
    height: 132px;
    line-height: 132px;
  }
  .percent-popup{
    background-color: transparent;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    transform: none;
    p{
      color: #fff;
      text-align: center;
      position: absolute;
      width: 100%;
      font-size: 48px;
    }
    .percent-text{
      top: 1250px;
    }
    .percent-tip{
      bottom: 330px;
    }
  }
  .select-tag-container{
    height: 100vh;
    .tag-list{
      margin-top: 50px;
      h1{
        font-size: 48px;
        margin-bottom: 55px;
      }
      .item{
        padding: 55px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:not(:last-child) {
          .border-bottom(#dedede);
        }
        &.me{
          padding-top: 0;
          margin-bottom: 50px;
          &:after{
            display: none;
          }
        }
        .tag{
          font-size: 48px;
          b{
            font-size: 64px;
          }
        }
        .person-num{
          font-size: 36px;
          color: #999;
        }
      }
    }
  }
}
</style>
<style lang="less">
.show-pubilsh-container {
  .van-nav-bar {
    background-color: #24252c;
    .van-icon-arrow-left,
    .van-nav-bar__title {
      color: #fff !important;
    }
  }
  .van-search{
    padding-left: 0;
  }
  .van-search__content{
    padding-left: 0;
    background-color: transparent;
    .border-bottom(#dedede);
  }
}
</style>
