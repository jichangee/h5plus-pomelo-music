<template>
  <div class="qa-item-component">
    <div class="item-q">
      <div class="tag-container">
        <span class="tag tag-q">问</span>
      </div>
      <div class="content">
        <p class="title">请问这个吉他音质怎么样？弹起来手感如何，适合新手吗？</p>
      </div>
    </div>
    <div class="item-a">
      <div class="tag-container">
        <span class="tag tag-a">答</span>
      </div>
      <div class="content">
        <p class="text" :class="{'show': isShow}">吉他音质不错，值得购买！吉他音质不错，值得购买！吉他音质不错，值得购买！吉他音质不错，值得购买！吉他音吉他音质不错，值得购买！吉他音质不错，值得购买！吉他音质不错，值得购买！吉他音质不错，值得购买！吉他音...</p>
        <a
          href="javascript:;"
          class="btn"
          @click="toggle"
        >{{isShow ? '收起' : '显示全部'}}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow;
    }
  }
};
</script>
<style lang="less" scoped>
.qa-item-component {
  padding: 50px 0 100px;
  .tag-container {
    padding-top: 8px;
    float: left;
  }
  .tag {
    display: block;
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: #fff;
    font-size: 36px;
    border-radius: 4px;
    &.tag-q {
      background: linear-gradient(
        45deg,
        rgba(255, 55, 117, 1) 0%,
        rgba(255, 148, 91, 1) 100%
      );
    }
    &.tag-a {
      background: linear-gradient(
        45deg,
        rgba(106, 233, 178, 1) 0%,
        rgba(56, 187, 62, 1) 100%
      );
    }
  }
  .content {
    margin: 50px 0 0 70px;
    min-height: 48px;
    line-height: 1.47;
    .title {
      font-size: 44px;
    }
    .text {
      font-size: 40px;
      color: #666;
      max-height: 115px;
      overflow: hidden;
      &.show{
        max-height: 1000px;
      }
    }
    .btn{
      display: inline-block;
      margin-top: 35px;
      font-size: 40px;
      color: #FF3F72;
    }
  }
}
</style>
