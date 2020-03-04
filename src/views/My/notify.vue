<template>
  <div class="my-notify-container">
    <Header title="通知中心" />
    <section class="list">
      <van-list
        v-model="loading"
        :finished="none"
        finished-text="已经到底了"
        :error.sync="error"
        error-text="加载时便，点击重新加载"
        @load="getList"
      >
        <div class="item" v-for="item in list" :key="item.Id">
          <p class="tag">{{item.Type}}</p>
          <p class="content">{{item.Message}}</p>
          <p class="time">{{item.InsertDate}}</p>
        </div>
      </van-list>
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
      state: 0,
      list: [],
      loading: false,
      none: false,
      error: false,
      pagin: {
        currentPage: 0,
        pageSize: 10
      }
    }
  },
  methods: {
    getList() {
      const { state, pagin } = this;
      this.$http.user.notify({
        state,
        ...pagin
      }).then(({ Data }) => {
        const list = Data.List.map((item) => {
          item.InsertDate = this.formatDateTime(item.InsertDate, 'MM-DD');
          return item;
        });
        if (list.length < pagin.pageSize) {
          this.none = true;
        } else {
          this.pagin.currentPage += 1;
        }
        this.list = this.list.concat(list);
        this.loading = false;
      }).catch(() => {
        this.loading = false;
        this.error = true;
      })
    }
  }
}
</script>
<style lang="less" scoped>
.my-notify-container{
  .list{
    padding: 0 60px;
    .item{
      padding: 70px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:not(:last-child){
        .border-bottom(#dedede);
      }
      .tag{
        width: 202px;
        height: 72px;
        line-height: 72px;
        text-align: center;
        background-color: #e34d5b;
        border-radius: 10px;
        color: #fff;
        font-size: 40px;
        margin-right: 44px;
        &.tag1{
          background-color: #e34d5b;
        }
        &.tag2{
          background-color: #FF9773;
        }
      }
      .content{
        width: 810px;
        font-size: 48px;
      }
      .time{
        width: 100px;
        color: #999;
        font-size: 36px;
      }
    }
  }
}
</style>
