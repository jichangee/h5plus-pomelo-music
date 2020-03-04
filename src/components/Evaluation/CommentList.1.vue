<template>
  <div class="comment-scroll">
    <div class="scrolldiv" ref="commentScroll" :style="`transform: translateY(${top}px);`">
      <p class="item">@叫问糖不甜小姐：我想我一个人，在那个人眼里是，我是独一无二的，可是问发现问没有</p>
      <p class="item">@叫问糖不甜小姐：我想我一个人，在那个人眼里是，我是独一无二的，可是问发现问没有</p>
      <p class="item">@叫问糖不甜小姐：我想我一个人，在那个人眼里是，我是独一无二的，可是问发现问没有</p>
      <p class="item">@叫问糖不甜小姐：我想我一个人，在那个人眼里是，我是独一无二的，可是问发现问没有</p>
      <p class="item">@叫问糖不甜小姐：我想我一个人，在那个人眼里是，我是独一无二的，可是问发现问没有</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      top: 0,
    };
  },
  computed: {
    scrollHeight() {
      return this.$refs.commentScroll.offsetHeight;
    }
  },
  mounted() {
    setInterval(() => {
      this.top -= 20;
      if (this.top < -this.scrollHeight) {
        this.top = 0;
      }
    }, 1000);
  }
}
</script>
<style lang="less" scoped>
.comment-scroll{
  padding: 1px 60px 0;
  margin-top: 49px;
  height: 560px;
  overflow: hidden;
  .scrolldiv{
    transition: all 300ms;
  }
  .item{
    line-height: 1.47;
    margin-bottom: 20PX;
    font-size: 14PX;
  }
}
</style>
