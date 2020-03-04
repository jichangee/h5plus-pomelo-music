<template>
  <div class="collect-list-component">
    <van-tabs
      v-model="collectTabIndex"
      @change="onChange"
    >
      <van-tab title="课程">
        <div class="collect-tab-container collect-tab1">
          <div class="list">
            <router-link :to="`/home/lesson/detail/${item.CourseId}`" class="item" v-for="item in list" :key="item.Id">
              <div class="media">
                <img :src="`${MEDIA_BASE_URL}${item.Image}`" alt="">
              </div>
              <div class="content">
                <h1>{{item.Title}}</h1>
                <p class="desc">{{item.Description}}</p>
                <p class="info">
                  <span><img :src="`${MEDIA_BASE_URL}${item.UserPhoto}`" alt="">{{item.UserName}}</span>
                  <span>{{formatDateTime(item.Date)}}</span>
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </van-tab>
      <van-tab title="柚秀">
        <div class="collect-tab-container collect-tab4">
          <VideoContainer :list="list" :type="2" @click="onClick" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import VideoPlayer from '@/components/VideoPlayer';
import VideoContainer from '@/components/My/VideoContainer'
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    VideoPlayer,
    VideoContainer,
  },
  data() {
    return {
      collectTabIndex: 0
    }
  },
  methods: {
    onChange(index) {
      this.$emit('change', index);
    },
    onClick(index, type) {
      this.$emit('click', index, type);
    }
  },
  mounted() {
  }
}
</script>
<style lang="less" scoped>
.collect-list-component{
  .collect-tab-container{
    padding: 87px 60px;
    &.collect-tab1{
      .list{
        .item{
          display: block;
          height: 270px;
          .media{
            float: left;
            width: 432px;
            height: 270px;
            img{
              width: 100%;
              height: 100%;
              border-radius: 20px;
            }
          }
          .content{
            margin: 0 0 0 480px;
            h1, .desc{
              line-height: 1.47;
              font-size: 44px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-bottom: 24px;
            }
            .desc{
              font-size: 36px;
              color: #666;
              margin-bottom: 65px;
            }
            .info{
              display: flex;
              align-items: center;
              justify-content: space-between;
              span{
                display: flex;
                align-items: center;
                img{
                  width: 52px;
                  height: 52px;
                  border-radius: 50%;
                  margin-right: 26px;
                }
              }
            }
          }
        }
      }
    }
    &.collect-tab3{
      padding-top: 27px;
      .list{
        .item{
          &:not(:last-child) {
            .border-bottom(#dedede);
          }
          .item-header{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 60px;
            margin-bottom: 60px;
            p{
              display: flex;
              align-items: center;
              font-size: 48px;
              img{
                width: 123px;
                height: 123px;
                border-radius: 50%;
                margin-right: 26px;
              }
            }
            .follow-btn{
              width:180px;
              height:74px;
              line-height: 74px;
              background:linear-gradient(45deg,rgba(255,63,99,1) 0%,rgba(255,148,95,1) 100%);
              border-radius:10px;
              color: #fff;
              font-size: 40px;
              &.actived{
                background: transparent;
                border: 1PX solid #dedede !important;
                color: #999;
                padding: 0;
              }
            }
          }
          .item-body{
            height: 525px;
            border-radius: 15px;
            overflow: hidden;
          }
          .item-bottom{
            padding: 60px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .tags{
              span{
                display: inline-block;
                font-size: 40px;
                color: #ff6c88;
                margin-right: 47px;
              }
            }
            .btns{
              display: flex;
              align-items: center;
              justify-content: flex-end;
              span{
                display: flex;
                align-items: center;
                margin-left: 54px;
                font-size: 32px;
                color: #666;
              }
              img{
                width: 48px;
                height: 48px;
                margin-right: 11px;
              }
            }
          }
        }
      }
    }
    &.collect-tab4{
      padding: 0;
    }
  }
}
</style>
<style lang="less">
.collect-list-component{
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
