<template>
  <div class="lesson-list-component">
    <div class="list">
      <router-link :to="`/home/lesson/detail/${item.Id}`" class="item" v-for="item in list" :key="item.Id">
        <div class="media">
          <img :src="`${MEDIA_BASE_URL}${item.Image}`" alt="">
        </div>
        <div class="content">
          <h1>{{item.Title}}</h1>
          <p>{{item.Description}}</p>
        </div>
        <!-- <div class="line">
          <span>学习进度</span>
          <div class="progress-container">
            <p class="progress" :style="`width: 40%;`"></p>
          </div>
          <span>20/60</span>
        </div> -->
      </router-link>
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
  },
  data() {
    return {
    }
  },
}
</script>
<style lang="less" scoped>
.lesson-list-component{
  .list{
    margin-top: 7px;
    padding: 0 60px;
    .item{
      display: block;
      padding: 50px 0;
      &:not(:last-child) {
        .border-bottom(#dedede);
      }
      .media{
        width: 220px;
        height: 220px;
        float: left;
        img{
          width: 100%;
          height: 100%;
          border-radius: 20px;
        }
      }
      .content{
        height: 220px;
        margin: 0 0 30px 260px;
        padding-top: 20px;
        h1{
          line-height: 1.2;
          font-size: 44px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 30px;
        }
        p{
          font-size: 36px;
          color: #666;
          line-height: 1.5;
          overflow : hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .line{
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
          font-size: 36px;
        }
        .progress-container{
          width: 794px;
          border-radius: 9px;
          height: 17px;
          margin: 0 42px 0 39px;
          background-color: #e5e5e5;
          position: relative;
          .progress{
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            border-radius: 9px;
            width: 0;
            background:linear-gradient(90deg,rgba(255,58,116,1) 0%,rgba(255,148,91,1) 100%);
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.lesson-list-component{
  .van-tabs__nav.van-tabs__nav--line{
    background-color: #f2f3f4;
  }
  .van-tabs__line{
    display: none;
  }
  .van-tab.van-tab--active{
    color: #FF6767;
  }
  .van-ellipsis{
    font-size: 0.38647rem;
  }
}
</style>
