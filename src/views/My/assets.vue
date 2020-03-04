<template>
  <div class="my-assets-container">
    <Header title="我的资产" />
    <section class="header">
      <div class="container">
        <p class="num">{{totalPoint}}</p>
        <p class="title">累计积分</p>
      </div>
    </section>
    <section class="list">
      <h1>积分明细</h1>
      <van-tabs v-model="state" @change="onChange" type="card" class="tabs">
        <van-tab :title="tab" v-for="tab in tabs" :key="tab">
          <van-list
            v-model="loading"
            :finished="none"
            finished-text="已经到底了"
            @load="getRecord"
          >
            <div class="item" v-for="item in list" :key="item.Id">
              <div class="left">
                <p class="title">{{item.Way}}</p>
                <p class="time">{{item.InsertDate | formatDate}}</p>
              </div>
              <div class="right" :class="{'in': item.Point > 0, 'out': item.Point < 0}">{{item.Point}}</div>
            </div>
          </van-list>
        </van-tab>
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
      tabs: ['全部记录', '收入记录', '支出记录'],
      totalPoint: '--',
      list: [],
      state: 0,
      pagin: {
        currentPage: 0,
        pageSize: 10
      },
      none: false,
      loading: false
    }
  },
  filters: {
    formatDate: value => value && value.replace('T', ' ').substring(0, 19),
  },
  methods: {
    onChange() {
      this.none = false;
      this.loading = false;
      this.pagin.currentPage = 0;
      this.list = [];
    },
    getData() {
      return this.$http.user.points();
    },
    getRecord() {
      const { state, pagin } = this;
      this.$http.user.pointRecord({
        state,
        ...pagin
      }).then(({ Data }) => {
        const list = Data.List;
        if (list.length < pagin.pageSize) {
          this.none = true;
        } else {
          this.pagin.currentPage += 1;
        }
        this.list = this.list.concat(list);
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      })
    }
  },
  created() {
    this.getData().then(({ Data }) => {
      this.totalPoint = Data;
    })
  }
}
</script>
<style lang="less" scoped>
.my-assets-container{
  background-color: #f2f3f4;
}
section{
  background-color: #fff;
  padding: 0 46px;
  margin-bottom: 30px;
  &.header{
    padding: 40px 46px 50px;
  }
  &.list{
    padding-top: 70px;
    h1{
      font-size: 48px;
      font-weight: 500;
      margin-bottom: 57px;
    }
  }
  .container{
    height: 330px;
    background-image: url('../../assets/my/assets/bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    text-align: center;
    padding-top: 85px;
    .num{
      font-size: 72px;
      color: #fc5036;
      font-weight: bold;
      margin-bottom: 50px;
    }
    .title{
      font-size: 42px;
      color: #fc5036;
    }
  }
  .tabs{
    padding-top: 168px;
    .item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 47px 0;
      &:not(:last-child) {
        .border-bottom(#dedede);
      }
      .left{
        .title{
          font-size: 48px;
          margin-bottom: 30px;
        }
        .time{
          font-size: 36px;
          color: #999;
        }
      }
      .right{
        font-size: 48px;
        &.in{
          color: #FF4A4A;
        }
        &.out{
          color: #4A97FF;
        }
      }
    }
  }
}
</style>
<style lang="less">
.my-assets-container{
  .tabs{
    height: 0.96618rem;
    padding-top: 0.96618rem;
    .van-tabs__wrap,
    .van-tabs__nav--card{
      height: 0.96618rem;
      margin: 0;
    }
    .van-tabs__nav--card{
      border: 1px solid #FF4A4A;
      border-radius: 0.08051rem;
    }
    .van-tabs__nav--card .van-tab{
      line-height: 0.96618rem;
      font-size: 0.33816rem;
      border: none;
    }
    .van-tabs__nav--card .van-tab.van-tab--active{
      background-color: #F97676;
    }
  }
}
</style>
