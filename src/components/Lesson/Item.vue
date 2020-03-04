<template>
  <div class="__lesson-item">
    <router-link :to="`/home/lesson/detail/${data.Id}`" class="item">
      <div class="media">
        <img :src="`${MEDIA_BASE_URL}${data.Image}`" alt="">
      </div>
      <div class="content">
        <h1>{{data.Title}}</h1>
        <p class="desc">{{data.Description}}</p>
        <p class="bottom">{{data.EvaluateCount}}条评价/已售{{data.OrderCount}}</p>
      </div>
      <div class="info">
        <p class="person">
          <img :src="data.SysUserPhoto || $defaultHead" alt="">
          <span>{{data.SysUser}}</span>
        </p>
        <p class="money">{{data.VideoCount}}节/<b>￥{{data.Price}}</b>一期</p>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style lang="less" scoped>
.__lesson-item{
  padding: 0 0 60px;
  margin-bottom: 60px;
  display: block;
  &:not(:last-child) {
    .border-bottom(#dedede);
  }
  .media{
    width: 432px;
    height: 230px;
    float: left;
    img{
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
  }
  .content{
    margin: 0 0 36px 480px;
    height: 230px;
    h1,
    .desc{
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    h1{
      line-height: 1.47;
      font-size: 44px;
      font-weight: bold;
      margin-bottom: 24px;
    }
    .desc{
      font-size: 36px;
      color: #666;
      margin-bottom: 60px;
    }
    .bottom{
      font-size: 34px;
      color: #999;
    }
  }
  .info{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .person{
      display: flex;
      align-items: center;
      img{
        width: 52px;
        height: 52px;
        border-radius: 50%;
        margin-right: 26px;
      }
      span{
        font-size: 34px;
        color: #999;
      }
    }
    .money{
      font-size: 34px;
      color: #999;
      b{
        font-size: 42px;
        color: #FF4A4A;
      }
    }
  }
}
</style>
