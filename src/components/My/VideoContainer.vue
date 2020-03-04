<template>
  <div class="video-list">
    <div class="item" v-for="(item, index) in list" :key="item.YouShowId" @click="goYouShow(index)">
      <img :src="`${MEDIA_BASE_URL}${item.VideoUrl}${MEDIA_SNAPSHOT_URL}`" class="img" alt="">
      <span class="like"><img src="../../assets/my/aixin.png" alt=""> {{item.LikeCount}}</span>
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
    },
    type: {
      type: Number,
      default() {
        return 1
      }
    }
  },
  methods: {
    goYouShow(index) {
      this.$emit('click', index, this.type);
    }
  }
}
</script>
<style lang="less" scoped>
.video-list{
  display: flex;
  flex-wrap: wrap;
  .item{
    width: 410px;
    height: 551px;
    position: relative;
    margin-bottom: 6px;
    &:not(:nth-child(3n)) {
      margin-right: 6px;
    }
    .img{
      width: 100%;
      height: 100%;
    }
    span{
      position: absolute;
      left: 30px;
      bottom: 32px;
      color: #fff;
      font-size: 36px;
      display: flex;
      align-items: center;
      img{
        width: 48px;
        height: 48px;
        float: left;
        margin-right: 10px;
      }
    }
  }
}
</style>
