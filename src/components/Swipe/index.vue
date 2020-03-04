<template>
  <van-swipe :autoplay="5000" indicator-color="white" class="__swiper-container">
    <van-swipe-item v-for="(item, index) in list" :key="index">
      <a href="javascript:;" @click="goPage(item.type, item.typeId)">
        <img :src="item.img" alt="">
      </a>
    </van-swipe-item>
  </van-swipe>
</template>
<script>
export default {
  props: ['list'],
  methods: {
    goPage(type, typeId) {
      console.log(type, typeId);
      
      if (type === '0') { // 课程
        this.$router.push(`/home/lesson/detail/${typeId}`)
      } else if (type === '1') { // 社区
        this.$router.push(`/evaluation/article/${typeId}`)
      } else if (type === '2') {
        this.$router.push(`/mall/detail/${typeId}`)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.__swiper-container{
  a{
    display: block;
    height: 100%;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
