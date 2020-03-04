<template>
  <div class="__search-user-item">
    <img class="head" @click="goUserDetailPage(data.UserId)" :src="`${MEDIA_BASE_URL}${data.Photo}`" alt="">
    <div class="content" @click="goUserDetailPage(data.UserId)">
      <p class="name">{{data.Nick}}</p>
      <p class="info" v-if="hasInfo">
        <span>粉丝：{{data.FansCount}}</span>
        <span>喜欢：{{data.LikeCount}}</span>
        <span>作品：{{data.YouShowCount}}</span>
      </p>
    </div>
    <van-button type="primary" class="btn" :class="{'on': data.IsLike}" @click="toggleLike(data)" :loading="loading.like">{{data.IsLike ? '已关注' : '关注'}}</van-button>
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
    },
    hasInfo: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: {
        like: false
      }
    }
  },
  methods: {
    toggleLike(item) {
      this.loading.like = true;
      this.$http.user.like({
        userId: item.UserId
      }).then(() => {
        item.IsLike = !item.IsLike;
        this.loading.like = false;
      }).catch(() => {
        this.loading.like = false;
      })
    },
    goUserDetailPage(id) {
      this.$router.push(`/home/user/${id}`)
    }
  }
}
</script>
<style lang="less" scoped>
.__search-user-item{
  padding: 60px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:not(:last-child) {
    .border-bottom(#dedede);
  }
  .head{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 38px;
  }
  .content{
    width: 822px;
    .name{
      font-size: 48px;
    }
    .info{
      margin-top: 24px;
      font-size: 36px;
      color: #999;
      span{
        display: inline-block;
        margin-right: 50px;
      }
    }
  }
  .btn{
    width: 180px;
    height: 74px;
    line-height: 74px;
    background: linear-gradient(45deg,rgba(255,63,99,1) 0%,rgba(255,148,95,1) 100%);
    border-radius: 10px;
    font-size: 40px;
    padding: 0;
    &.on{
      border: 1PX solid #999 !important;
      line-height: 71px;
      color: #999;
      background: transparent;
    }
  }
}
</style>
