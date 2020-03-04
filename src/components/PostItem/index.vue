<template>
  <div class="post-item">
    <div class="item-header">
      <div class="info">
        <img src="../../assets/example/1.png" alt="">
        <div class="text">
          <p class="name">杭州郭富城</p>
          <p class="des">
            <span>5分钟以前</span>
            <span>发表在：钢琴</span>
          </p>
        </div>
      </div>
      <div class="btns">
        <van-button type="primary" class="btn">关注</van-button>
      </div>
    </div>
    <div class="item-body">
      <img src="../../assets/example/3.png" alt="">
      <p class="overview">自从学习了钢琴以后，我的手已经不是我的手了自从学习了钢琴以后，我的手已经不是我的手了</p>
    </div>
    <div class="item-bottom">
      <div class="tags">
        <span class="tag">#弹指吉他</span>
        <span class="tag">#秘籍</span>
      </div>
      <div class="btns">
        <a href="javascript:;" class="btn done">
          <img src="../../assets/evaluation/dianzan.png" alt="">
          <span>1.1万</span>
        </a>
        <a href="javascript:;" class="btn">
          <img src="../../assets/evaluation/pinglun.png" alt="">
          <span>7898</span>
        </a>
        <a href="javascript:;" class="btn">
          <img src="../../assets/evaluation/zhuanfa.png" alt="">
          <span>2.3万</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
.post-item{
  .item-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 42px;
    .info{
      img{
        width: 110px;
        height: 110px;
        border-radius: 50%;
        float: left;
      }
      .text{
        margin: 0 0 0 140px;
        .name{
          font-size: 44px;
          font-weight: bold;
          margin-bottom: 22px;
        }
        .des{
          span{
            color: #999;
            font-size: 36px;
            display: inline-block;
            margin-right: 20px;
          }
        }
      }
    }
    .btns{
      .btn{
        width:180px;
        height:68px;
        line-height: 68px;
        background:linear-gradient(90deg,rgba(255,52,119,1) 0%,rgba(255,145,93,1) 100%);
        border-radius:34px;
        color: #fff;
        display: inline-block;
        text-align: center;
        font-size: 42px;
        padding: 0;
        &.done{
          background: transparent;
          border:1PX solid rgba(153,153,153,1);
          color: #999;
        }
      }
    }
  }
  .item-body{
    img{
      width: 100%;
      height: 462px;
      border-radius: 15px;
      margin-bottom: 30px;
    }
    .overview{
      margin-bottom: 50px;
      font-size: 40px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .item-bottom{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tags{
      .tag{
        font-size: 36px;
        color: #FF7E96;
        display: inline-block;
        &:not(:last-child) {
          margin-right: 45px;
        }
      }
    }
    .btns{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      a{
        display: flex;
        align-items: center;
        margin-left: 50px;
        color: #666;
        font-size: 32px;
        img{
          width: 48px;
          height: 48px;
          margin: 0 11px 0 0;
        }
      }
    }
  }
}
</style>
