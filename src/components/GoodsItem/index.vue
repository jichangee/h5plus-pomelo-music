<template>
  <div class="__mall-goods-item">
    <router-link :to="`/mall/detail/${data.ProductId || data.Id}`">
      <div class="media">
        <img :src="`${MEDIA_BASE_URL}${data.TitleImage || data.TitleImg}`" alt="">
      </div>
      <div class="info">
        <h2 class="name">{{data.Title}}</h2>
        <p class="money">￥{{data.Price}}</p>
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
.__mall-goods-item{
  width: 600px;
  height: 740px;
  margin-bottom: 40px;
  background-color: #fff;
  .media{
    height: 467px;
    margin-bottom: 40px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .info{
    text-align: center;
    padding: 0 60px;
    h2{
      font-size: 48px;
      margin-bottom: 30px;
      line-height: 1.4;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
