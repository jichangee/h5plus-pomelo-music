<template>
  <div class="lesson-index-container">
    <header>
      <Statusbar />
      <div class="line">
        <a href="javascript:;" class="back" @click="back">
          <van-icon name="arrow-left"></van-icon>
        </a>
        <div class="tabs">
          <a
            href="javascript:;"
            class="tab"
            :class="{'selected': tabIndex === 0}"
            @click="selectTab(0)"
          >课程</a>
          <a
            href="javascript:;"
            class="tab"
            :class="{'selected': tabIndex === 1}"
            @click="selectTab(1)"
          >评价</a>
        </div>
      </div>
    </header>
    <HeaderPlac />
    <div class="tab-container tab1" v-show="tabIndex === 0">
      <div class="video-container">
        <VideoPlayer
          v-if="(data.VideoUrl && data.Videos[0].IsFree) || data.IsPay || data.Price === 0"
          :src="`${MEDIA_BASE_URL}${data.VideoUrl}`"
          controls
        />
        <div v-else class="cover" :style="`background-image:url(${MEDIA_BASE_URL}${data.Image})`"></div>
      </div>
      <div class="video-info">
        <h1>{{data.Title}}</h1>
        <div class="info-a">
          <h2>￥{{data.Price}}<span>/首节课/一期（共{{data.VideoCount}}课时）</span></h2>
          <span>已订阅{{data.CollectCount}}课时</span>
        </div>
        <p class="origin-money">原价￥{{data.OriginalPrice}}</p>
        <div class="tags">
          <span class="tag" v-for="tag in data.Tags" :key="tag">{{tag}}</span>
        </div>
        <div class="tips">
          <span><img src="../../assets/home/lesson/huifang.png" alt="">不限次数观看回放</span>
          <span><img src="../../assets/home/lesson/mingshi.png" alt="">名师指导</span>
        </div> 
      </div>
      <!-- <section>
        <div class="ticket">
          <span class="tag">优惠券</span>
          <p class="content">领取50元商城乐器优惠券</p>
          <van-icon name="arrow"></van-icon>
        </div>
      </section> -->
      <section>
        <div class="service">
          <p class="title">服务</p>
          <div class="list">
            <span class="item">不限次数观看回放</span>
            <span class="item">名师指导</span>
          </div>
        </div>
      </section>
      <section class="comment-container">
        <div class="comment">
          <div class="title">
            <h1>课程评价({{data.Evaluate ? data.Evaluate.length : 0}}条)</h1>
            <a href="javascript:;" @click="tabIndex = 1">查看全部> </a>
          </div>
          <!-- <div class="tags">
            <span class="tag selected">好评 ({{data.Evaluate.length}})</span>
            <span class="tag">民谣吉他</span>
            <span class="tag">零基础</span>
            <span class="tag">通俗易懂</span>
            <span class="tag">民谣吉他</span>
            <span class="tag">零基础</span>
            <span class="tag">民谣吉他</span>
          </div> -->
          <div class="list">
            <div class="item" v-for="item in data.EvaluateHome" :key="item.Id">
              <div class="item-header">
                <img :src="`${MEDIA_BASE_URL}${item.Photo}`" class="head-image" alt="">
                <div class="content">
                  <p class="name">{{item.Nick}}</p>
                  <p class="desc">{{formatDateTime(item.Date)}}</p>
                </div>
                <div class="rate-container">
                  <van-rate v-model="item.Score" disabled disabled-color="#FF4A4A" :size="12" />
                </div>
              </div>
              <div class="item-body">
                <p>{{item.Content}}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="intro-container">
        <div class="intro">
          <h1>讲师介绍</h1>
          <router-link :to="`/home/teacher/detail/${data.Teacher.Id}`">
            <div class="intro-header">
              <img :src="`${MEDIA_BASE_URL}${data.Teacher.Photo}`" alt="">
              <div class="content">
                <p class="name">{{data.Teacher.Name}}</p>
                <div class="tags">
                  <span class="tag" v-for="tag in data.Teacher.Tags" :key="tag">{{tag}}</span>
                </div>
              </div>
              <van-icon name="arrow"></van-icon>
            </div>
            <div class="intro-body">
              <!-- <p class="time">
                <span>课时：<b>68</b>分钟</span>
                <span>授课总时长：<b>15765</b>分钟</span>
              </p> -->
              <div class="score-container">
                <p>
                  教学态度 5.0 <span>高</span>
                </p>
                <p>
                  描述相符 5.0 <span>高</span>
                </p>
                <p>
                  时间观念 5.0 <span>高</span>
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </section>
      <section class="new-video-container">
        <div class="video">
          <h1>最新视频</h1>
          <div class="swiper-container">
            <div class="scrolldiv">
              <div class="item" v-for="item in data.Videos" :key="item.Id" @click="onClickLesson(item)">
                <div class="media">
                    <img :src="`${MEDIA_BASE_URL}${item.VideoUrl}${MEDIA_SNAPSHOT_URL}`" alt="">
                </div>
                <p>{{item.Title}}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="footer-plac"></div>
      <footer>
        <div class="footer-container">
          <router-link to="/home/lesson" replace class="item">
            <img src="../../assets/home/lesson/gengduo.png" alt="">
            <p>更多课程</p>
          </router-link>
          <div class="item" @click="toggleCollect">
            <img src="../../assets/home/lesson/shoucang.png" alt="" v-if="!data.IsCollect">
            <img src="../../assets/home/lesson/shoucang2.png" alt="" v-else>
            <p>{{data.IsCollect ? '已收藏' : '收藏'}}</p>
          </div>
          <van-button
            type="primary"
            class="main-btn"
            :class="{'on': data.IsPay}"
            @click="signup"
            :loading="loading"
          >{{data.IsPay ? '已报名' : '立即报名'}}</van-button>
        </div>
      </footer>
    </div>
    <div class="tab-container tab2" v-show="tabIndex === 1">
      <LessonComment :commentList="data.Evaluate" />
      <div class="footer-tip">
        <div class="footer-tip-plac"></div>
        <div class="footer-tip-container" v-show="!data.IsPay">
          <img src="../../assets/home/lesson/cuowu.png" alt="">
          <span>您还未购买课程，无法发表评论</span>
        </div>
      </div>
      <footer>
        <div class="footer-plac"></div>
        <a href="javascript:;" class="footer-container" :class="{'disabled': !data.IsPay}" @click="goCommentPage">发表评论</a>
      </footer>
    </div>
  </div>
</template>
<script>
import Statusbar from '@/components/Statusbar';
import HeaderPlac from '@/components/HeaderPlac';
import VideoPlayer from '@/components/VideoPlayer';
import LessonComment from '@/components/Lesson/comment';
import VideoImage from '@/components/VideoPlayer/image';
import { getPayChannel, checkServices, pay } from '../../utils/pay';

export default {
  components: {
    Statusbar,
    VideoPlayer,
    HeaderPlac,
    LessonComment,
    VideoImage
  },
  data() {
    return {
      id: '',
      rateValue: 4,
      tabIndex: 0,
      isShowAction: false,
      pays: {},
      actions: [
        { name: '支付宝支付', type: 'alipay' },
        { name: '微信支付', type: 'wxpay' },
      ],
      swiperOption: {
        slidesPerView: 2.6,
        spaceBetween: 10,
        freeMode: true,
      },
      isCollect: false,
      collectLoading: false,
      data: {
        Videos: [],
        Teacher: {}
      },
      form: {
        id: '',
        Points: 0,
        Coupon: 0
      },
      loading: false
    }
  },
  methods: {
    toggleCollect() {
      if (this.collectLoading) {
        return;
      }
      const { id } = this;
      this.data.IsCollect = !this.data.IsCollect;
      this.collectLoading = true;
      this.$http.course.collect({
        id
      }).then(() => {
        this.collectLoading = false;
      }).catch(() => {
        this.data.IsCollect = !this.data.IsCollect;
        this.collectLoading = false;
      })
    },
    goCommentPage() {
      if (!this.data.IsPay) {
        return;
      }
      this.$router.push(`/home/lesson/comment/${this.id}`);
    },
    selectTab(index) {
      this.tabIndex = index;
    },
    getData(id) {
      this.showLoading()
      this.$http.course.detail({
        id
      }).then(({ Data }) => {
        Data.Tags = Data.Tag && Data.Tag.split(',');
        Data.Teacher = Data.TeacherList.length > 0 ? Data.TeacherList[0] : '';
        if (Data.Teacher && Data.Teacher.Tag) {
          Data.Teacher.Tags = Data.Teacher.Tag.split(',');
        }
        if (Data.Evaluate.length > 3) {
          Data.EvaluateHome = Data.Evaluate.slice(0, 3);
        } else {
          Data.EvaluateHome = Data.Evaluate;
        }
        this.data = Data;
        this.hideLoading();
      }).catch(() => {
        this.hideLoading();
      })
    },
    signup() {
      const { data, form, id } = this;
      if (data.Price === 0) {
        this.loading = true;
        this.$http.course.order({
          id,
          OrderId: null,
          Points: 0,
          Coupon: 0,
          CouponId: null
        }).then(() => {
          this.$toast.success('报名成功');
          this.getData(id);
          this.loading = false;
        }).catch(() => {
          this.loading = false;
        })
        return;
      }
      const goodsInfo = {
        TitleImage: data.Image,
        Title: data.Title,
        Price: data.Price,
        desc: '',
        Count: 1,
        Id: id
      };
      this.$store.commit('SET_ORDER_INFO', form);
      this.$store.commit('SET_GOODS_INFO', goodsInfo);
      this.$router.replace('/mall/detail/order/confirm?type=course');
      // this.isShowAction = true;
    },
    onClickLesson(item) {
      if (this.data.Price !== 0 && !this.data.IsPay && !item.IsFree) {
        this.$toast('该课程为付费课程，请报名后观看');
        return;
      }
      this.data.VideoUrl = '';
      setTimeout(() => {
        this.data.VideoUrl = item.VideoUrl;
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      }, 0);
    }
  },
  created() {
    const id = this.$route.params.id;
    this.getData(id);
    this.form.id = id;
    this.id = id;
  },
  mounted() {
    // getPayChannel().then((pays) => {
    //   console.log(pays);
    //   this.pays = pays;
    // });
  }
}
</script>
<style lang="less" scoped>
.lesson-index-container{
  header{
    top: 0;
    left: 0;
    width: 100%;
    position: fixed;
    background-color: #24252C;
    z-index: 19;
    .line{
      height: 132px;
      line-height: 132px;
      overflow: hidden;
      color: #fff;
      padding: 0 60px;
      .back{
        line-height: 142px;
        color: #fff;
        font-size: 72px;
        float: left;
      }
      .tabs{
        margin: 0 200px;
        text-align: center;
        .tab{
          margin: 0 123px;
          display: inline-block;
          font-size: 52px;
          color: #777;
          &.selected{
            color: #fff;
          }
        }
      }
    }
  }
  .video-container{
    height: 667px;
    .cover{
      height: 100%;
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
  .video-info{
    background-color: #24252C;
    color: #fff;
    padding: 45px 60px 0;
    h1{
      font-size: 48px;
      font-weight: 500;
      line-height: 1.47;
      margin-bottom: 89px;
    }
    .info-a{
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 32px;
      h2{
        font-size: 70px;
        color: #ff4a4a;
        font-weight: 500;
        span{
          font-size: 40px;
          color: #fff;
          font-weight: normal;
        }
      }
      & > span{
        font-size: 36px;
        color: #999;
      }
    }
    .origin-money{
      font-size: 40px;
      color: #999;
      margin-bottom: 68px;
    }
    .tags{
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .tag{
        margin: 0 30px 30px 0;
        border-radius: 38px;
        height: 76px;
        line-height: 76px;
        padding: 0 30px;
        background-color: #34363F;
        font-size: 36px;
        color: #999;
      }
    }
    .tips{
      display: flex;
      flex-wrap: wrap;
      padding: 40px 0 0;
      .border-top(#6C6D6C);
      span{
        display: flex;
        align-items: center;
        font-size: 36px;
        color: #999;
        width: 50%;
        margin-bottom: 40px;
        img{
          width: 48px;
          margin-right: 10px;
        }
      }
    }
  }
  section{
    padding: 0 60px;
  }
  .ticket{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 65px 0;
    .border-bottom(#dedede);
    .tag{
      width: 202px;
      height: 89px;
      line-height: 86px;
      border: 3px solid rgba(255,74,74,1);
      border-radius: 10px;
      text-align: center;
      font-size: 48px;
      color: #FF4A4A;
      margin-right: 56px;
    }
    .content{
      width: 700px;
    }
    
  }
  .service{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px 0;
    .border-bottom(#dedede);
    .title{
      font-size: 52px;
    }
    .list{
      padding-top: 30px;
      width: 900px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item{
        width: 50%;
        font-size: 40px;
        margin-bottom: 40px;
        position: relative;
        &:after{
          content: "";
          position: absolute;
          left: -33px;
          width: 20px;
          height: 20px;
          top: 50%;
          transform: translateY(-50%);
          background:rgba(255,74,74,1);
          border-radius: 50%;
        }
      }
    }
  }
  .comment-container{
    padding: 0 40px;
    .show-more{
      text-align: center;
      width: 80px;
      height: 80px;
      line-height: 80px;
      margin: 0 auto;
      display: block;
      font-size: 60px;
    }
  }
  .comment{
    padding: 70px 0;
    .border-bottom(#dedede);
    .title{
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 70px;
      h1{
        font-size: 52px;
      }
      a{
        font-size: 40px;
        color: #FF4A4A;
      }
    }
    .tags{
      display: flex;
      flex-wrap: wrap;
      .tag{
        margin: 0 20px 40px;
        height:84px;
        padding: 0 38px;
        line-height: 84px;
        text-align: center;
        background:rgba(255,255,255,1);
        border:2px solid rgba(222,222,222,1);
        border-radius:42px;
        font-size: 40px;
        color: #666;
        &.selected{
          color: #FF4A4A;
          background-color: #FFF1F1;
          border-color: #FF9C9C;
        }
      }
    }
    .list{
      margin-top: 95px;
      padding: 0 20px;
      .item{
        &:not(:last-child) {
          margin-bottom: 125px;
        }
        .item-header{
          display: flex;
          align-items: center;
          justify-content: space-between;
          img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-right: 30px;
          }
          .rate-container{
            width: 400px;
          }
          .content{
            width: 700px;
            .name{
              font-size: 44px;
              font-weight: bold;
              margin-bottom: 19px;
            }
            .desc{
              font-size: 32px;
              color: #999;
            }
          }
          
        }
        .item-body{
          margin-top: 50px;
          padding: 0 20px 0 120px;
          line-height: 1.47;
          font-size: 42px;
        }
      }
    }
  }
  .intro-container{
    .intro{
      .border-bottom(#dedede);
      padding: 70px 0;
      h1{
        font-size: 52px;
        margin-bottom: 70px;
      }
      .intro-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 70px;
        img{
          width: 210px;
          height: 210px;
          border-radius: 50%;
          margin-right: 38px;
        }
        .content{
          width: 780px;
          .name{
            font-size: 48px;
            margin-bottom: 30px;
          }
          .tags{
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            .tag{
              border-radius: 27px;
              background-color: #F2F2F2;
              padding: 11px 34px;
              font-size: 32px;
              color: #999;
              margin: 0 30px 20px 0;
            }
          }
        }
      }
      .intro-body{
        .time{
          margin-bottom: 50px;
          span{
            display: inline-block;
            margin-right: 85px;
            font-size: 44px;
            color: #999;
            b{
              font-size: 48px;
              color: #333;
            }
          }
        }
        .score-container{
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 36px;
          color: #666;
          span{
            display: inline-block;
            vertical-align: middle;
            width: 48px;
            height: 48px;
            line-height: 48px;
            background-color: #FFE4E4;
            border-radius: 3px;
            text-align: center;
            color: #FF4A4A;
            font-size: 36px;
          }
        }
      }
    }
  }
  .new-video-container{
    .video{
      padding: 70px 0;
      h1{
        font-size: 52px;
        margin-bottom: 70px;
      }
      .swiper-container{
        height: 380px;
        overflow: auto;
        .scrolldiv{
          width: 100000%;
        }
        .item{
          float: left;
          
          text-align: left;
          & > div {
            width: 418px;
            height: 286px;
            padding: 0 10px;
            margin-bottom: 10px;
          }
          & > div > img{
            width: 100%;
            height: 100%;
            margin-bottom: 40px;
            border-radius: 10px;
          }
          p{
            width: 100%;
            font-size: 36px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          img{
            max-width: 100%;
            max-height: 100%;
            display: block;
            margin: 0 auto;
          }
        }
      }
    }
  }
  .tab1{
    .footer-plac{
      height: 168px;
    }
    footer{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 168px;
      z-index: 19;
      .footer-container{
        .border-top(#dedede);
        padding: 0 60px;
        display: flex;
        height: 168px;
        background-color: #fff;
        align-items: center;
        justify-content: space-between;
        &.disabled{
          background-color: #7f7f7f;
          pointer-events: none;
        }
        .item{
          text-align: center;
          img{
            width: 75px;
            height: 75px;
            margin: 0 auto 14px;
            display: block;
          }
          p{
            font-size: 36px;
            color: #999;
          }
        }
        .main-btn{
          width: 698px;
          height: 124px;
          line-height: 124px;
          border-radius: 20px;
          font-size: 48px;
          margin: 0;
          &.on{
            background: #7f7f7f;
            color: #fff;
            pointer-events: none;
          }
        }
      }
    }
  }
  .tab2{
    .footer-tip{
      .footer-tip-plac{
        height: 92px;
      }
      .footer-tip-container{
        position: fixed;
        bottom: 147px;
        left: 0;
        width: 100%;
        height: 92px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #FFE8E8;
        font-size: 40px;
        color: #FF6969;
        img{
          width: 46px;
          margin-right: 23px;
        }
      }
    }
    footer{
      .footer-plac{
        height: 147px;
      }
      .footer-container{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 147px;
        line-height: 147px;
        text-align: center;
        color: #fff;
        font-weight: 500;
        font-size: 52px;
        background: linear-gradient(90deg,rgba(255,54,117,1) 0%,rgba(255,149,91,1) 100%);
        &.disabled{
          background: #7f7f7f;
          pointer-events: none;
        }
      }
    }
  }
}
</style>
