<template>
  <div class="comment-item">
    <div class="item-header">
      <img src="../../assets/example/2.png" class="head-image" alt="">
      <div class="content">
        <p class="name">{{data.Nick}}</p>
        <p class="desc">{{formatDateTime(data.Date)}}</p>
      </div>
      <div class="rate-container" v-if="type === 0">
        <van-rate v-model="data.Score" disabled disabled-color="#FF4A4A" :size="12" />
      </div>
      <div class="zan-container" v-else-if="type === 1" @click="zan">
        <img src="../../assets/common/dianzan.png" v-if="!data.isZan" alt="">
        <img src="../../assets/common/dianzan2.png" v-else alt="">
        <span>20</span>
      </div>
    </div>
    <div class="item-body">
      <p>{{data.Content}}</p>
      <!-- <div class="reply" v-if="data.reply">
        <p class="title">讲师回复：</p>
        <p class="content">{{data.reply}}</p>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      default: () => ({
        rate: 5,
        reply: false,
        project: '',
        isZan: false
      })
    },
    type: {
      type: Number,
      default: 0
    }
  },
  methods: {
    zan() {
      this.data.isZan = true;
    }
  }
}
</script>
<style lang="less" scoped>
.comment-item{
  padding: 90px 0;
  &:not(:last-child) {
    .border-bottom(#dedede);
  }
  .item-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    img{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-right: 30px;
    }
    .content{
      width: 750px;
      .name{
        font-size: 44px;
        font-weight: bold;
        margin-bottom: 19px;
      }
      .desc{
        font-size: 32px;
        color: #999;
      }
    }
    .rate-container{
      width: 290px;
      text-align: right;
    }
  }
  .item-body{
    margin-top: 50px;
    padding: 0 20px 0 120px;
    line-height: 1.47;
    font-size: 42px;
  }
  .reply{
    background-color: #F4F4F4;
    font-size: 36px;
    padding: 42px;
    border-radius: 15px;
    margin-top: 96px;
    position: relative;
    &:after{
      content: "";
      position: absolute;
      top: -40px;
      left: 60px;
      border-bottom: 40px solid #f4f4f4;
      border-left: 25px solid transparent;
      border-right: 25px solid transparent;
    }
    .title{
      color: #666;
      margin-bottom: 20px;
      padding: 0;
    }
    .content{
      color: #999;
    }
  }
  .zan-container{
    margin-left: 140px;
    img{
      width: 56px;
      height: 56px;
      margin-right: 10px;
      vertical-align: text-bottom;
    }
    span{
      font-size: 36px;
      color: #999;
    }
  }
}
</style>
