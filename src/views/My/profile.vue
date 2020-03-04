<template>
  <div class="my-profile-container">
    <Header title="编辑资料" rightText="保存" :rightFn="save"/>
    <header>
      <div class="head">
        <img :src="`${this.MEDIA_BASE_URL}${headImage}`" alt>
        <p>更换头像</p>
        <input type="file" id="file1" ref="uploadImageFiler" accept="image/*">
      </div>
    </header>
    <section>
      <h1>昵称</h1>
      <div class="inputdiv">
        <input type="text" placeholder="请输入昵称" v-model="form.Nick">
      </div>
    </section>
    <section>
      <h1>性别</h1>
      <div class="selectdiv">
        <div class="item" :class="{'selected': form.Gender === 0}" @click="selectGender(0)">男</div>
        <div class="item" :class="{'selected': form.Gender === 1}" @click="selectGender(1)">女</div>
      </div>
    </section>
    <section>
      <h1>生日</h1>
      <div class="pickdiv" @click="pickDate">
        <p>{{form.Birthday || '请选择出生日期'}}</p>
        <van-icon name="arrow" class="right-arrow"></van-icon>
      </div>
    </section>
    <section>
      <h1>认证</h1>
      <div class="pickdiv" @click="goAuthPage">
        <p>点击认证</p>
        <van-icon name="arrow" class="right-arrow"></van-icon>
      </div>
    </section>
    <section>
      <h1>个性签名</h1>
      <div class="textareadiv">
        <textarea placeholder="在这里写下您的个性签名呦~" v-model="form.Signature"></textarea>
      </div>
    </section>
    <van-popup v-model="isShowDatePicker" position="bottom" :overlay="true">
      <van-datetime-picker
        v-model="Birthday"
        :min-date="minDate"
        :max-date="maxDate"
        type="date"
        @confirm="pickDateConfirm"
        @cancel="pickDateCancel"
      />
    </van-popup>
  </div>
</template>
<script>
import Header from "@/components/Header";
import { object2formData } from '../../utils';
import dayjs from 'dayjs';
import lrz from "lrz";
export default {
  components: {
    Header
  },
  data() {
    return {
      isShowDatePicker: false,
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
      headImage: '',
      Birthday: '',
      form: {
        Gender: 0,
        Birthday: new Date(1995, 0, 1),
        Nick: '',
        Signature: ''
      },
      data: {},
      userId: ''
    };
  },
  methods: {
    goAuthPage() {
      this.$router.push(`/my/setting/auth?id=${this.userId}`)
    },
    save() {
      this.showLoading();
      const { form } = this;
      this.$http.user.infoUpdate({
        ...form
      }).then(() => {
        this.hideLoading();
        this.$toast('保存成功！');
      }).catch(() => {
        this.$toast('网络繁忙，请稍后再试');
        this.hideLoading();
      })
    },
    compressImage(src) {
      return lrz(src, {
        width: 300
      });
    },
    changeHeadImage(ret) {
      console.log(ret);
    },
    selectGender(index) {
      this.form.Gender = index;
    },
    pickDate() {
      this.isShowDatePicker = true;
    },
    pickDateConfirm(value) {
      this.Birthday = value;
      this.form.Birthday = dayjs(value).format('YYYY-MM-DD');
      this.isShowDatePicker = false;
    },
    pickDateCancel() {
      this.isShowDatePicker = false;
    },
    getData() {
      this.$http.user.myinfo().then(({ Data }) => {
        this.form.Gender = Data.Gender;
        this.form.Nick = Data.Nick;
        this.form.Birthday = dayjs(Data.Birthday).format('YYYY-MM-DD');
        this.Birthday = new Date(this.form.Birthday);
        this.headImage = Data.Photo;
        this.form.Signature = Data.Signature;
        this.userId = Data.Id;
      })
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    this.$refs.uploadImageFiler.addEventListener('change', () => {
      const file = this.$refs.uploadImageFiler.files[0]
      this.compressImage(file).then((ret) => {
        console.log(ret);
        const formData = new FormData();
        const extenName = ret.file.type === 'image/jpeg' ? 'jpg' : 'png';
        const fileNmae = new Date().getTime();
        formData.append('file', ret.file, `${fileNmae}.${extenName}`)
        this.headImage = ret.base64;
        return this.$http.user.photo(formData)
      })
    })
  }
};
</script>
<style lang="less" scoped>
.my-profile-container {
  header{
    margin-bottom: 130px;
    .head {
      padding-top: 50px;
      text-align: center;
      width: 210px;
      margin: 0 auto;
      position: relative;
      img {
        width: 100%;
        display: block;
        height: 210px;
        border-radius: 50%;
        margin-bottom: 24px;
      }
      p {
        font-size: 48px;
      }
      #file1{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        opacity: 0.01;
      }
    }
  }
  section{
    padding: 0 60px;
    margin-bottom: 120px;
    h1{
      font-size: 48px;
      margin-bottom: 60px;
      font-weight: 500;
    }
    .inputdiv{
      width: 100%;
      background-color: #f2f3f4;
      padding: 35px 60px;
      input{
        width: 100%;
        background-color: #f2f3f4;
      }
    }
    .selectdiv{
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f2f3f4;
      .item{
        height: 112px;
        line-height: 112px;
        width: 50%;
        text-align: center;
        background-color: #f2f3f4;
        color: #999;
        border-radius: 10px;
        &.selected{
          background-color: #24252C;
          color: #fff;
        }
      }
    }
    .pickdiv{
      height: 112px;
      background-color: #f2f3f4;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 114px 0 62px;
      color: #999;
      font-size: 44px;
      p.has{
        color: #333;
      }
      .right-arrow{
        font-size: 60px;
      }
    }
    .textareadiv{
      width: 100%;
      height: 318px;
      textarea{
        width: 100%;
        height: 100%;
        background-color: #f2f3f4;
        padding: 36px 62px;
      }
    }
  }
}
</style>
