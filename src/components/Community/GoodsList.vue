<template>
  <div class="goods-list-component">
    <div class="item" v-for="item in list" :key="item.Id">
      <div class="media">
        <img :src="`${MEDIA_BASE_URL}${item.Image}`" alt="">
      </div>
      <div class="content">
        <h1>{{item.Title}}</h1>
        <p class="desc">{{item.Description}}</p>
        <p class="money">￥{{item.Price}}元</p>
      </div>
      <router-link :to="`/home/lesson/detail/${item.Id}`" class="btn lesson">去看看</router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style lang="less" scoped>
.goods-list-component{
  padding: 80px 0;
  .border-bottom(#dedede);
  .item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:not(:last-child) {
      margin-bottom: 68px;
    }
    .media{
      width: 400px;
      height: 217px;
      img{
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .content{
      width: 390px;
      h1{
        font-size: 48px;
        margin-bottom: 23px;
        font-weight: 500;
      }
      .desc{
        font-size: 36px;
        color: #999;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-bottom: 56px;
      }
      .money{
        font-size: 42px;
        color: #ff4a4a;
      }
    }
    .btn{
      width: 240px;
      height: 87px;
      line-height: 87px;
      text-align: center;
      border-radius: 10px;
      font-size: 40px;
      &.goods{
        color: #fff;
        background-color: #24252c;
      }
      &.lesson{
        border: 1PX solid #333;
        color: #666;
      }
    }
  }
}
</style>
