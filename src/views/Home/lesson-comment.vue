<template>
  <div class="home-lesson-comment-container">
    <Header title="发表评价" rightText="发布" :rightFn="submit" />
    <section class="comment-container">
      <div class="comment">
        <textarea v-model="form.Content" placeholder="您对课程还满意吗？来说说您的感受吧~"></textarea>
        <div class="input-tags">
          <div class="inputdiv">
            <input type="text" placeholder="请输入标签" v-model="tagText">
          </div>
          <van-button type="primary" class="confirm" @click="appendTag">确定</van-button>
        </div>
        <div class="tags-list">
          <div class="item" v-for="(item, index) in tagList" :key="index">
            <span>{{item}}</span>
            <img @click="deleteTag(index)" src="../../assets/home/lesson/comment/cuowu.png" alt="">
          </div>
        </div>
      </div>
    </section>
    <section class="score-container">
      <h1><img src="../../assets/home/lesson/comment/pingfen.png" alt="">课程评分</h1>
      <div class="line">
        <div class="title">课程内容</div>
        <van-rate class="rate" v-model="form.Score" color="#FF4A4A" void-color="#EAEAEA" />
      </div>
      <div class="line">
        <div class="title">教学态度</div>
        <van-rate class="rate" v-model="form.rate2" color="#FF4A4A" void-color="#EAEAEA" />
      </div>
      <div class="line">
        <div class="title">时间观念</div>
        <van-rate class="rate" v-model="form.rate3" color="#FF4A4A" void-color="#EAEAEA" />
      </div>
    </section>
  </div>
</template>
<script>
import Header from '@/components/Header'
export default {
  components: {
    Header,
  },
  data() {
    return {
      form: {
        rate1: 0,
        rate2: 0,
        rate3: 0,
        Score: 0,
        Content: '',
        CourseId: '',
        Tags: ''
      },
      tagText: '',
      tagList: [],
    }
  },
  methods: {
    submit() {
      this.form.Tags = this.tagList.join(',');
      this.showLoading();
      this.$http.course.evaluate({
        ...this.form
      }).then(() => {
        this.hideLoading();
        this.$toast.success('发表成功');
        this.restartPage()
        this.$router.back();
      }).catch(() => {
        this.hideLoading();
      })
    },
    appendTag() {
      const { tagText } = this;
      if (tagText === '') {
        return;
      }
      this.tagList.push(tagText);
      this.tagText = '';
    },
    deleteTag(index) {
      this.tagList.splice(index, 1);
    }
  },
  created() {
    this.form.CourseId = this.$route.params.id;
  }
}
</script>
<style lang="less" scoped>
section{
  padding: 0 60px;
}
.comment-container{
  margin-top: 65px;
  border-bottom: 30px solid #F2F3F4;
  .comment{
    textarea{
      height: 375px;
      width: 100%;
      border: none;
      font-size: 44px;
      margin-bottom: 70px;
      border-bottom: 1PX solid #dedede;
    }
    .inputdiv{
      width: 852px;
      height: 106px;
      padding: 25px 60px;
      border: 1PX solid #dedede;
      float: left;
      input{
        width: 100%;
        font-size: 44px;
      }
    }
    .confirm{
      margin: 0 0 0 882px;
      width: 240px;
      height: 106px;
      line-height: 106px;
      display: block;
      background-color: @maincolor;
    }
  }
  .tags-list{
    padding: 72px 0;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .item{
      margin: 0 36px 36px 0;
      border: 1PX solid #dedede;
      padding: 23px 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        font-size: 40px;
        color: #999;
        margin-right: 23px;
      }
      img{
        width: 40px;
      }
    }
  }
}
.score-container{
  padding-top: 54px;
  h1{
    display: flex;
    align-items: center;
    font-size: 48px;
    margin-bottom: 80px;
    font-weight: 500;
    img{
      width: 66px;
      margin-right: 26px;
    }
  }
  .line{
    margin-bottom: 60px;
    display: flex;
    align-items: center;
    .title{
      font-size: 44px;
      color: #666;
      margin-right: 50px;
    }
  }
}
</style>
