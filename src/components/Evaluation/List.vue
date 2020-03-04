<template>
  <div class="__video-list">
    <van-list
      :finished="none"
      v-model="loading"
    >
      <router-link to="/evaluation/article/1" class="item hasdes">
        <img src="../../assets/example/2.png" alt="">
        <p class="text">【吉他必学一】吉他入门，非常适合新手，一学就会吉他入门，非常适合新手，一学就会</p>
        <div class="base">
          <p class="des">
            <img class="head" src="../../assets/example/2.png" alt="">
            <span>杭州吴彦祖</span>
          </p>
          <p class="info">
            <img src="../../assets/common/bofanghui.png" alt="">
            <span>1.8w</span>
          </p>
        </div>
      </router-link>
    </van-list>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
.__video-list{
  padding: 0 60px;
  column-count: 2;
  column-width: 240px;
  column-gap: 20px;
  .item{
    break-inside: avoid;
    display: block;
    width: 534px;
    border-radius: 25px;
    margin-bottom: 98px;
    overflow: hidden;
    position: relative;
    img{
      width: 100%;
      float: left;
    }
    .base{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 95px;
      background:linear-gradient(180deg,rgba(0, 0, 0, 0) 0%,rgba(0, 0, 0, 0.5) 100%);
      padding: 0 10px 0 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .des{
        display: flex;
        align-items: center;
        .head{
          width: 68px;
          height: 68px;
          border-radius: 50%;
        }
        span{
          color: #fff;
          font-size: 36px;
          margin-left: 14px;
        }
      }
      .info{
        img{
          width: 48px;
          height: 48px;
          margin-right: 10px;
        }
        span{
          color: #fff;
          font-size: 36px;
        }
      }
    }
    &.hasdes{
      & > img{
        border-radius: 25px;
        margin-bottom: 38px;
      }
      .text{
        line-height: 1.47;
        font-size: 40px;
        width: 100%;
        margin-bottom: 48px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .base{
        background: transparent;
        position: static;
        height: auto;
        .des{
          display: flex;
          align-items: center;
          span{
            color: #333;
          }
        }
        .info{
          span{
            color: #999;
            font-size: 36px;
          }
        }
      }
    }
  }
}
</style>
