<template>
  <div :class="{
    'footer': true,
    'isIpx': isIpx
  }">
    <div
      class="tabbar-component"
    >
      <router-link class="tabbar-item" to="/evaluation" exact replace>
        <i class="icon icon1"></i>
        <p>社区</p>
      </router-link>
      <router-link class="tabbar-item" to="/home" replace>
        <i class="icon icon2"></i>
        <p>课程</p>
      </router-link>
      <router-link class="tabbar-item center" to="/show/index">
        <img src="../../assets/tabbar/footer-center.png" alt="">
        <p>PK</p>
      </router-link>
      <router-link class="tabbar-item" to="/mall" replace>
        <i class="icon icon3"></i>
        <p>商城</p>
      </router-link>
      <router-link class="tabbar-item" to="/my" replace>
        <i class="icon icon4"></i>
        <p>我的</p>
      </router-link>
    </div>
    <!-- <div class="footer-plac"></div> -->
  </div>
</template>
<script>
import { isIpx } from '../../utils/check';
export default {
  computed: {
    isIpx
  },
  methods: {
  },
  created() {
  }
}
</script>
<style lang="less" scoped>
.footer{
  .tabbar-component{
    background-color: #fff;
    z-index: 19;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 146px;
    display: flex;
    justify-content: space-between;
    padding: 14px 20px;
    text-align: center;
    box-shadow: 0 -3px 24px rgba(0, 0, 0, .1);
    // border-top: 1PX solid #dedede;
    max-width: 1024PX;
    .tabbar-item{
      width: 20%;
      i{
        width: 75px;
        height: 75px;
        display: block;
        margin: 0 auto 10px;
        background-size: cover;
        &.icon1{
          background-image: url('../../assets/tabbar/footer-1-1.png');
        }
        &.icon2{
          background-image: url('../../assets/tabbar/footer-2-1.png');
        }
        &.icon3{
          background-image: url('../../assets/tabbar/footer-3-1.png');
        }
        &.icon4{
          background-image: url('../../assets/tabbar/footer-4-1.png');
        }
      }
      &.router-link-active{
        .icon1{
          background-image: url('../../assets/tabbar/footer-1-2.png');
        }
        .icon2{
          background-image: url('../../assets/tabbar/footer-2-2.png');
        }
        .icon3{
          background-image: url('../../assets/tabbar/footer-3-2.png');
        }
        .icon4{
          background-image: url('../../assets/tabbar/footer-4-2.png');
        }
      }
      p{
        font-size: 36px;
      }
      &.center{
        position: relative;
        z-index: 2;
        img{
          box-shadow: 0 -3px 24px rgba(0, 0, 0, .1);
          border-radius: 50%;
          background-color: #fff;
          width: 139px;
          margin-top: -75px;
          margin-bottom: 20px;
          padding: 8px;
        }
      }
    }
  }
  &:before{
    // content: '';
    z-index: 1;
    position: fixed;
    height: 70px;
    border-radius: 140px 140px 0 0;
    border: solid #dedede;
    border-width: 1PX 1PX 0 1PX;
    background-color: #fff;
    width: 140px;
    bottom: 135px;
    left: 548.5px;
    // left: 50%;
    // transform: translateX(-50%);
  }
  &.isIpx{
    .tabbar-component{
      height: 206px;
      padding: 14px 20px 74px;
    }
    &:before{
      bottom: 193px;
    }
  }
}
</style>
