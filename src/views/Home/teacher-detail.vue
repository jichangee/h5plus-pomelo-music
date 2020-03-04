<template>
  <div class="home-teacher-detail-container">
    <Header :fixed="false">
      <img src="../../assets/home/teacher/jubao.png" class="right-icon" slot="right" alt="">
    </Header>
    <header>
      <div class="media">
        <img class="head" :src="`${MEDIA_BASE_URL}${data.Photo}`" alt="">
        <img class="level" src="../../assets/home/teacher/dengji.png" alt="">
      </div>
      <div class="content">
        <h1>
          <span>{{data.Name}}</span>
          <img v-if="data.Gender === 1" src="../../assets/home/teacher/nansheng.png" alt="">
          <img v-else src="../../assets/home/teacher/nvsheng.png" alt="">
        </h1>
        <div class="tags">
          <div class="tag" v-for="tag in data.Tags" :key="tag">{{tag}}</div>
        </div>
      </div>
      <div class="score-container">
        <div class="score">
          <div class="line">
            <p>教学态度 5.0 <span>高</span></p>
          </div>
          <div class="line">
            <p>描述相符 5.0 <span>高</span></p>
          </div>
          <div class="line">
            <p>时间观念 5.0 <span>高</span></p>
          </div>
        </div>
        <!-- <div class="btns">
          <van-button type="primary" class="btn focus" :loading="loading" @click="toggleLike(data.Id)">关注</van-button>
        </div> -->
      </div>
    </header>
    <section class="list">
      <van-tabs v-model="tabIndex" :sticky="true" animated>
        <van-tab title="在售课程">
          <div class="items">
            <router-link :to="`/home/lesson/detail/${item.Id}`" class="item" v-for="item in data.Courses" :key="item.Id">
              <img :src="`${MEDIA_BASE_URL}${item.Image}`" alt="">
              <h1>{{item.Title}}...</h1>
              <div class="info">
                <p class="money">￥<span>{{item.Price}}/节</span></p>
                <p class="num">已售{{item.OrderCount}}</p>
              </div>
            </router-link>
          </div>
        </van-tab>
        <!-- <van-tab title="乐器测评">
          <div class="items">
            <div class="item">
              <img src="../../assets/example/2.png" alt="">
              <h1>【吉他必学一】吉他入门，非常适合新手，一学就会...</h1>
              <div class="info">
                <p class="head"><img src="../../assets/example/2.png" alt=""><span>温州王力宏</span></p>
                <p class="num"><img src="../../assets/home/teacher/bofang.png" alt="">1.8w</p>
              </div>
            </div>
          </div>
        </van-tab> -->
      </van-tabs>
    </section>
  </div>
</template>
<script>
import Header from '@/components/Header'
export default {
  components: {
    Header
  },
  data() {
    return {
      tabIndex: 0,
      id: '',
      data: {}
    }
  },
  methods: {
    getData(id) {
      this.$http.common.teacher({
        id
      }).then(({ Data }) => {
        Data.Tags = Data.Tag ? Data.Tag.split(',') : [];
        this.data = Data;
      })
    },
    toggleLike(userId) {
      this.loading.like = true;
      this.$http.user.like({
        userId
      }).then(() => {
        this.userData.IsLike = !this.userData.IsLike;
        this.loading.like = false;
      }).catch(() => {
        this.loading.like = false;
      })
    }
  },
  created() {
    const id = this.$route.params.id;
    this.getData(id);
    this.id = id;
  }
}
</script>
<style lang="less" scoped>
.home-teacher-detail-container{
  .right-icon{
    width: 66px;
    vertical-align: middle;
  }
  header{
    margin: 25px 0 10px;
    padding: 0 60px;
    .media{
      float: left;
      width: 214px;
      height: 214px;
      position: relative;
      .head{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .level{
        width: 56px;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
    .content{
      margin: 0 0 0 262px;
      padding-top: 50px;
      height: 288px;
      margin-bottom: 60px;
      h1{
        font-size: 60px;
        margin-bottom: 36px;
        img{
          width: 52px;
          margin-left: 21px;
        }
      }
      .tags{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .tag{
          margin: 0 30px 20px 0;
          border-radius: 27px;
          background-color: #f2f2f2;
          padding: 11px 34px;
          color: #999;
          font-size: 32px;
        }
      }
    }
    .score-container{
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      padding-bottom: 35px;
      .border-bottom(#dedede);
      .score{
        .line{
          &:not(:last-child) {
            margin-bottom: 40px;
          }
          p{
            font-size: 36px;
            color: #666;
            span{
              display: inline-block;
              margin-left: 23px;
              width: 50px;
              height: 50px;
              line-height: 50px;
              text-align: center;
              background-color: #ffe4e4;
              color: #ff4a4a;
              font-size: 36px;
            }
          }
        }
      }
      .btn.focus{
        width: 181px;
        height: 69px;
        line-height: 69px;
        background: linear-gradient(45deg,rgba(255,52,119,1) 0%,rgba(255,149,91,1) 100%);
        border-radius: 10px;
      }
    }
  }
}
section{
  padding: 0 60px;
  .items{
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item{
      width: 534px;
      margin-bottom: 115px;
      & > img{
        width: 100%;
        height: 400px;
        border-radius: 25px;
        margin-bottom: 40px;
      }
      h1{
        font-size: 40px;
        font-weight: 500;
        line-height: 1.47;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 45px;
      }
      .info{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .money{
          font-size: 42px;
          color: #ff4a4a;
          span{
            font-size: 52px;
          }
        }
        .num{
          font-size: 36px;
          color: #999;
          display: flex;
          align-items: center;
          img{
            width: 48px;
            height: 48px;
            margin-right: 8px;
          }
        }
        .head{
          display: flex;
          align-items: center;
          img{
            width: 68px;
            height: 68px;
            border-radius: 50%;
            margin-right: 14px;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.home-teacher-detail-container{
  .van-nav-bar{
    &:after{
      display: none;
    }
  }
  .van-tabs__wrap{
    width: 75px;
    &:after{
      display: none;
    }
    .van-ellipsis{
      font-size: 0.41868rem;
    }
  }
}

</style>
