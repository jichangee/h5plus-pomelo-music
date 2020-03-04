<template>
  <div class="my-setting-auth-iden-container">
    <Header title="资料认证" />
    <section class="banner"></section>
    <section class="tip">
      <p class="title">写在前面</p>
      <p class="text">为了更快地给您通过审核，请如实填写以下信息，并上传证明资料。列如：钢琴考级证书，网红认证等。</p>
    </section>
    <section class="form">
      <div class="form-item">
        <p class="title"><span class="red">*</span> 您的姓名：</p>
        <div class="inputdiv"><input type="text" placeholder="请输入您的真实姓名" v-model="form.name"></div>
      </div>
      <div class="form-item">
        <p class="title"><span class="red">*</span> 您的身份证号码：</p>
        <div class="inputdiv">
        <input
          maxlength="18"
          readonly
          type="text"
          placeholder="请输入您的身份证号码"
          v-model="form.idcard"
          @click="isShowKeyboard = true"
        ></div>
      </div>
    </section>
    <section class="list">
      <p class="title"><span>*</span> 上传证明</p>
      <div class="img-list">
        <div class="item" v-for="(img, index) in imgs" :key="img">
          <a href="javascript:;" class="close" @click="deleteFile(index)">
            <img src="../../assets/my/auth/guanbi.png" alt="">
          </a>
          <img :src="img" alt="">
        </div>
        <div class="item noimg">
          <input type="file" id="file1" ref="uploader" accept="image/*">
        </div>
      </div>
    </section>
    <van-button class="confirm main-btn" :loading="loading" @click="submit">提交</van-button>
    <van-number-keyboard
      :show="isShowKeyboard"
      theme="custom"
      extra-key="X"
      close-button-text="完成"
      @blur="isShowKeyboard = false"
      @input="onInput"
      @delete="onDelete"
    />
  </div>
</template>
<script>
import Header from '@/components/Header'
import { createRandomFileName } from '../../utils';
import lrz from 'lrz';
export default {
  components: {
    Header
  },
  data() {
    return {
      files: [],
      imgs: [],
      uploadFile: [],
      form: {
        userId: '',
        name: '',
        idcard: ''
      },
      loading: false,
      isShowKeyboard: false
    }
  },
  methods: {
    onInput(value) {
      if (this.form.idcard.length >= 18) {
        return;
      }
      this.form.idcard += value;
    },
    onDelete() {
      const { idcard } = this.form;
      if (idcard === '') {
        return;
      }
      this.form.idcard = idcard.substring(0, idcard.length - 1);
    },
    deleteFile(index) {
      this.imgs.splice(index, 1);
      this.files.splice(index, 1);
    },
    submit() {
      this.loading = true;
      const idCardImg = this.uploadFile.join(',');
      this.$http.user.approve({
        idCardImg,
        ...this.form
      }).then(() => {
        this.$toast.success('提交成功');
        this.$router.back();
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      })
    }
  },
  created() {
    this.form.userId = this.$route.query.id;
  },
  mounted() {
    this.$refs.uploader.addEventListener('change', () => {
      const file = this.$refs.uploader.files[0];
      lrz(file, {
        width: 1024,
        height: 1024
      }).then((ret) => {
        const formData = createRandomFileName(ret.file);
        this.showLoading('上传中...');
        this.$http.user.upload(formData).then(({ Data }) => {
          this.hideLoading();
          this.files.push(ret.file);
          this.imgs.push(ret.base64);
          this.uploadFile.push(`${this.MEDIA_BASE_URL}${Data}`);
        }).catch(() => {
          this.$toast.fail('图片上传失败');
          this.hideLoading();
        })
      })
    })
  }
}
</script>
<style lang="less" scoped>
.my-setting-auth-iden-container{
  padding-bottom: 50px;
}
.banner{
  height: 460px;
  background: url('../../assets/my/auth/banner.png');
  background-size: cover;
  border-bottom: 30px solid #f2f3f4;
}
.tip{
  padding: 70px 60px;
  .border-bottom(#DEDEDE);
  .title{
    font-size: 48px;
    margin-bottom: 52px;
  }
  .text{
    font-size: 42px;
    color: #666;
    line-height: 1.67;
  }
}
.form{
  padding: 90px 60px 10px;
  .form-item{
    margin-bottom: 124px;
    .title{
      margin-bottom: 52px;
      font-size: 48px;
      span{
        color: #FF3F63;
      }
    }
    .inputdiv{
      border: 1PX solid #DEDEDE;
      border-radius: 10px;
      input{
        width: 100%;
        padding: 40px 36px;
      }
    }
  }
}
.list{
  padding: 0 35px;
  .title{
    font-size: 48px;
    margin-bottom: 52px;
    padding-left: 25px;
    span{
      color: #FF3F63;
    }
  }
  .img-list{
    display: flex;
    flex-wrap: wrap;
  }
  .item{
    width: 340px;
    height: 340px;
    margin: 0 25px 72px;
    position: relative;
    .close{
      position: absolute;
      top: 7px;
      right: 7px;
      width: 69px;
      height: 69px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    img{
      width: 100%;
      height: 100%;
    }
    &.noimg{
      border: 1PX solid #dedede;
      position: relative;
      input{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        bottom: 0;
        opacity: 0.01;
        z-index: 1;
      }
      &:after{
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        width: 86px;
        height: 86px;
        background-image: url('../../assets/my/auth/jia.png');
        background-size: cover;
      }
    }
  }
}
.confirm{
  margin-top: 20px;
}
</style>
