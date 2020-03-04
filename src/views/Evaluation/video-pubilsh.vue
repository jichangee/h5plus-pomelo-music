<template>
  <div class="evaluation-pubilsh-container">
    <Header title="发布文章">
      <van-button
        class="submit main-btn"
        slot="right"
        type="primary"
        :loading="loading"
        @click="submit"
      >发布</van-button>
    </Header>
    <section class="title-container">
      <input type="text" placeholder="请输入标题（4-30字，必填）" v-model="form.Title">
    </section>
    <section class="content-container">
      <MultLineInput :defaultLineNum="2" v-model="form.Content" placeholder="此时此刻我想说的" />
    </section>
    <section class="media-container">
      <VideoItem
        v-for="(item, index) in videos"
        :data="item"
        :index="index"
        :key="item.src"
        class="media-item video-item"
        @close="onCloseVideo"
      />
      <ImageItem
        v-for="(item, index) in images"
        :data="item"
        :index="index"
        :key="item.src"
        class="media-item image-item"
        @close="onCloseImage"
      />
    </section>
    <div class="footer-plac"></div>
    <footer>
      <a href="javascript:" class="new-modal" @click="isShowSelectModal = true">添加更多元素</a>
      <a href="javascript:;" class="new-tag" @click="isShowSelectType = true">{{musicalInstrument}}</a>
    </footer>
    <van-popup v-model="isShowSelectModal" position="bottom" :lazy-render="false">
      <div class="modal-list">
        <div class="item">
          图片
          <input type="file" accept="image/*" ref="imageFile" class="file">
        </div>
        <div class="item">
          视频
          <input type="file" accept="video/*" ref="videoFile" class="file">
        </div>
        <div class="item" @click="isShowSelectModal = false">取消</div>
      </div>
    </van-popup>
    <van-popup v-model="isShowSelectType" position="bottom">
      <div class="type-list">
        <div class="scrolldiv">
          <van-cell
            v-for="item in typeList"
            :key="item.id"
            :title="item.title"
            @click="selectType(item)"
            is-link
          />
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import lrz from 'lrz';
import Header from "@/components/Header";
import MultLineInput from '@/components/Evaluation/MultLineInput';
import ImageItem from '@/components/Evaluation/ImageItem';
import VideoItem from '@/components/Evaluation/VideoItem';
import { appendScript, createRandomFileName } from "../../utils";
export default {
  components: {
    Header,
    MultLineInput,
    ImageItem,
    VideoItem
  },
  computed: {
    textarea() {
      return this.$refs.textarea;
    }
  },
  data() {
    return {
      form: {
        Title: '',
        Content: '',
        Tag: '',
        Images: '',
        Videos: '',
        MusicalInstrumentsId: ''
      },
      musicalInstrument: '请选择乐器类型',
      loading: false,
      lineNum: 2,
      images: [],
      videos: [],
      isShowSelectModal: false,
      isShowSelectType: false,
      typeList: []
    };
  },
  methods: {
    selectType(item) {
      this.form.MusicalInstrumentsId = item.id;
      this.musicalInstrument = `#${item.title}`;
      this.isShowSelectType = false;
    },
    onCloseImage(index) {
      this.images.splice(index, 1);
    },
    onCloseVideo(index) {
      this.videos.splice(index, 1);
    },
    bindImageUpload() {
      this.$refs.imageFile.addEventListener('change', () => {
        const file = this.$refs.imageFile.files[0];
        lrz(file, {
          width: 1024,
          height: 1024
        }).then((ret) => {
          this.showLoading('上传中...');
          const formData = createRandomFileName(ret.file);
          console.log('formData', formData);
          
          return this.$http.community.upload(formData)
        }).then(({ Data }) => {
          this.hideLoading();
          this.isShowSelectModal = false;
          this.images.push({
            Path: this.MEDIA_BASE_URL + Data[0],
            Description: ''
          })
        })
      })
    },
    bindVideoUpload() {
      this.$refs.videoFile.addEventListener('change', () => {
        this.showLoading('上传中...');
        const file = this.$refs.videoFile.files[0];
        const formData = createRandomFileName(file);
        this.$http.community.upload(formData).then(({ Data }) => {
          this.hideLoading();
          this.isShowSelectModal = false;
          this.videos.push({
            Path: this.MEDIA_BASE_URL + Data[0],
            Description: ''
          })
        })
      })
    },
    getFormData() {
      const { form, images, videos } = this;
      form.Images = JSON.stringify(images);
      form.Videos = JSON.stringify(videos);
      return form;
    },
    submit() {
      const form = this.getFormData();
      if (form.Title === '') {
        this.$toast.fail('请填写标题');
        return;
      } else if (form.Content === '' && form.Videos === '[]' && form.Images === '[]') {
        this.$toast.fail('请填写内容');
        return;
      } else if (!form.MusicalInstrumentsId) {
        this.$toast.fail('请选择乐器类型');
        return;
      }
      this.loading = true;
      this.$http.community.pubilsh({
        ...form
      }).then(() => {
        this.loading = false;
        this.$toast('发布成功');
        this.$router.go(-1);
      }).catch(() => {
        this.loading = false;
        this.$toast('发布失败，请稍后再试');
      })
    },
    getTypeList() {
      this.$http.common.musicalInstruments({
        type: 1,
        pageSize: 100
      }).then(({ Data }) => {
        this.typeList = Data.List.map(item => {
          return {
            id: item.Id,
            img: `${this.MEDIA_BASE_URL}${item.Img}`,
            title: item.Name
          }
        })
        this.typeId = this.typeList[0].id;
      })
    },
  },
  mounted() {
    this.bindImageUpload();
    this.bindVideoUpload();
    this.getTypeList();
  },
  created() {
  },
};
</script>
<style lang="less" scoped>
.evaluation-pubilsh-container {
  .submit {
    margin: 0;
    width: 180px;
    height: 82px;
    line-height: 82px;
    border-radius: 5px;
    font-size: 48px;
    padding: 0;
  }
  section {
    padding: 0 60px;
  }
  .title-container {
    padding: 30px 0;
    margin: 55px 60px 0;
    .border-bottom(#dedede);
    input {
      width: 100%;
      font-size: 48px;
    }
  }
  .content-container{
    padding: 30px 60px;
  }
  .media-item{
    margin-bottom: 30px;
  }
  .footer-plac{
    height: 147px;
  }
  footer{
    .border-top(#dedede);
    background-color: #fff;
    height: 147px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 80px;
    font-size: 42px;
    color: #999;
    .new-modal{
      height: 100%;
      line-height: 147px;
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
}
</style>
<style lang="less">
#contentEditor {
  width: 100%;
  min-height: 300px;
  box-sizing: border-box;
  padding: 10px;
  color: #444;
}
#contentEditor p {
  letter-spacing: 0.25px;
  margin: 20px 0px;
}
#contentEditor h4 {
  font-weight: bold;
  line-height: 1.333em;
  margin: 10px 0 20px;
  padding: 25px 0 0;
}
#contentEditor img {
  width: 100%;
  height: auto;
  box-sizing: border-box;
}
.dempTip {
  border-left: 2px solid #00bcd4;
  padding-left: 5px;
  margin: 10px;
  font-size: 16px;
}
code {
  white-space: pre-wrap;
  background: #2d2d2d;
  display: block;
  margin: 10px;
  border-radius: 5px;
  color: #fff;
}
.viewTit {
  color: #ff5722;
  position: fixed;
  top: 0;
  left: 0;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  text-align: center;
  display: block;
  width: 100%;
  background: #ffeb3b;
  box-shadow: 0 0 5px;
}
.type-list{
  background-color: #fff;
  height: 1000px;
  overflow: auto;
}
</style>
