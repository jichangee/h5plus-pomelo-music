<template>
  <div class="home-article-container">
    <Header title="专题文章">
      <!-- <img slot="right" class="header-icon" src="../../assets/article/fenxiang.png" alt=""> -->
    </Header>
    <Article :data="data" />
    <section v-if="data.Courses && data.Courses.length > 0">
      <GoodsList :list="data.Courses" />
    </section>
    <div class="footer-plac" v-if="data.IsActivity"></div>
    <footer v-if="data.IsActivity">
      <div class="footer-container">
        <van-button
          type="primary"
          class="main-btn"
          @click="showSignupBox"
          :disabled="data.IsApplied"
        >{{data.IsApplied ? '已报名' : '活动报名'}}</van-button>
      </div>
    </footer>
    <van-popup v-model="isShowCommentBox" class="comment-box">
      <textarea placeholder="在这里写下你的评论吧~（100字以内）"></textarea>
      <van-button class="btn" type="primary">发送</van-button>
    </van-popup>
    <van-popup v-model="isShowSignupBox" class="signup-box">
      <h1>填写信息</h1>
      <div class="inputdiv">
        <img src="../../assets/article/xingming.png" alt="">
        <input type="text" placeholder="请输入您的姓名" v-model="form.Name">
      </div>
      <div class="inputdiv">
        <img src="../../assets/article/xingming.png" alt="">
        <input type="tel" placeholder="请输入您的手机号码" maxlength="11" v-model="form.Phone">
      </div>
      <div class="selectdiv">
        <img src="../../assets/article/xingming.png" alt="">
        <div>
          <p @click="isShowSelectMusical = true" :class="{'notext': !form.MusicalInstruments}">{{form.MusicalInstruments || '请选择乐器'}}</p>
        </div>
        <img src="../../assets/article/xiala.png" alt="">
      </div>
      <van-button class="btn" type="primary" :loading="loading" @click="submit">立即报名</van-button>
    </van-popup>
    <van-popup v-model="isShowSelectMusical" position="bottom">
      <van-picker
        show-toolbar
        title="选择乐器"
        value-key="Name"
        :columns="musicalInstrumentsColumns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>
<script>
import Header from '@/components/Header'
import CommentItem from '@/components/CommentItem'
import Article from '@/components/Community/Article'
import GoodsList from '@/components/Community/GoodsList'
export default {
  components: {
    Header,
    CommentItem,
    Article,
    GoodsList
  },
  data() {
    return {
      isCollect: false,
      isZan: false,
      isShowCommentBox: false,
      isShowSignupBox: false,
      musicalInstrumentsColumns: [],
      isShowSelectMusical: false,
      form: {
        MusicalInstruments: '',
        Phone: '',
        Name: ''
      },
      loading: false,
      id: '',
      data: {}
    }
  },
  methods: {
    toggleCollect() {
      this.isCollect = !this.isCollect;
    },
    toggleZan() {
      this.isZan = !this.isZan;
    },
    showCommentBox() {
      this.isShowCommentBox = true;
    },
    showSignupBox() {
      this.isShowSignupBox = true;
      this.$http.common.musicalInstruments().then(({ Data }) => {
        this.musicalInstrumentsColumns = Data;
      })
    },
    onConfirm(value) {
      this.form.MusicalInstruments = value.Name;
      this.isShowSelectMusical = false;
    },
    onCancel() {
      this.isShowSelectMusical = false;
    },
    getData(id) {
      return this.$http.news.detail({
        id
      })
    },
    submit() {
      const { form } = this;
      const { id } = this;
      if (!form.Name) {
        this.$toast('请输入姓名')
      } else if (!form.Phone) {
        this.$toast('请输入手机号码')
      } else if (!form.MusicalInstruments) {
        this.$toast('请选择乐器')
      } else {
        this.loading = true;
        this.$http.news.apply({
          ...form,
          id
        }).then(() => {
          this.loading = false;
          this.$toast('报名成功！');
          this.data.IsApplied = true;
        }).catch((err) => {
          this.$toast(err.Message);
          this.loading = false;
        })
      }
    }
  },
  created() {
    const id = this.$route.params.id;
    this.id = id;
    this.showLoading();
    this.getData(id).then(({ Data }) => {
      this.hideLoading();
      this.data = Data;
    })
  }
}
</script>
<style lang="less" scoped>
.header-icon{
  width: 66px;
  vertical-align: middle;
}
section{
  padding: 0 60px;
}
.comment-container{
  padding: 77px 0;
}
.comment-fixed{
  position: fixed;
  right: 74px;
  bottom: 360px;
  width: 144px;
  height: 144px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 38px 0px rgba(132,132,132,0.18);
  border-radius:50%;
  padding: 32px;
  img{
    width: 80px;
  }
}
.footer-plac{
  height: 168px;
}
footer{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 168px;
  z-index: 19;
  .footer-container{
    .border-top(#dedede);
    padding: 0 60px;
    display: flex;
    height: 168px;
    background-color: #fff;
    align-items: center;
    justify-content: space-between;
    .item{
      text-align: center;
      width: 120px;
      img{
        width: 75px;
        height: 75px;
        margin: 0 auto 14px;
        display: block;
      }
      p{
        font-size: 36px;
        color: #999;
      }
    }
    .main-btn{
      height: 124px;
      line-height: 124px;
      border-radius: 20px;
      font-size: 48px;
      margin: 0;
      width: 100%;
    }
  }
}
.comment-box{
  padding: 60px;
  border-radius: 25px;
  textarea{
    width: 1003px;
    height: 700px;
    padding: 42px;
    background-color: #f2f3f4;
    font-size: 42px;
    border-radius: 10px;
  }
  .btn{
    width: 585px;
    height: 148px;
    line-height: 148px;
    background-color: #24252c;
    color: #fff;
    font-size: 52px;
    border-radius: 15px;
    margin: 78px auto 0;
    display: block;
  }
}
.signup-box{
  border-radius: 25px;
  padding: 116px 116px 195px;
  h1{
    font-size: 60px;
    margin-bottom: 160px;
    text-align: center;
  }
  .inputdiv,
  .selectdiv{
    padding: 0 43px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #F2F3F4;
    line-height: 132px;
    height: 132px;
    width: 887px;
    border-radius: 15px;
    img{
      width: 66px;
      margin-right: 59px;
    }
    input{
      width: 700px;
      background-color: transparent;
    }
  }
  .inputdiv{
    margin-bottom: 94px;
  }
  .selectdiv{
    &>div{
      position: relative;
      height: 100%;
      select{
        position: absolute;
        width: 110%;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 2;
        opacity: 0.01;
      }
      p{
        width: 560px;
        &.notext{
          color: #999;
        }
      }
    }
    & > img{
      position: relative;
      z-index: 3;
    }
  }
  .btn{
    width: 585px;
    height: 148px;
    line-height: 148px;
    background-color: #24252c;
    color: #fff;
    font-size: 52px;
    border-radius: 15px;
    margin: 169px auto 0;
    display: block;
  }
}
</style>
