<template>
  <van-button type="primary" class="follow-btn-component" :class="{'on': isFollow}">
    {{isFollow ? '已关注' : '关注'}}
  </van-button>
</template>
<script>
export default {
  props: {
    isFollow: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="less" scoped>
.follow-btn-component{
  width: 180px;
  height: 74px;
  line-height: 74px;
  padding: 0;
  background: linear-gradient(45deg,rgba(255,63,99,1) 0%,rgba(255,148,95,1) 100%);
  border-radius: 10px;
  color: #fff;
  font-size: 44px;
  &.on{
    border: 3px solid #dedede !important;
    background: transparent;
    color: #666;
  }
}
</style>
