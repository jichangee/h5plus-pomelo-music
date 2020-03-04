<template>
  <div class="user-follow-container">
    <Header
      title="Ta的粉丝"
    />
    <div class="list-container">
       <van-list
        @load="getList"
        v-model="loading"
        :finished="finished"
        finished-text="已经到底了"
        :error.sync="error"
      >
        <UserItem :hasInfo="false" v-for="item in list" :key="item.Id" :data="item" />
      </van-list>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header';
import UserItem from '@/components/Search/UserItem';
export default {
  components: {
    Header,
    UserItem
  },
  data() {
    return {
      list: [],
      id: '',
      pagin: {
        currentPage: 0,
        pageSize: 10
      },
      loading: false,
      finished: false,
      error: false
    }
  },
  methods: {
    getList() {
      const { id } = this;
      const { pagin } = this;
      this.$http.user.fans({
        id,
        ...pagin
      }).then(({ Data }) => {
        const list = Data.List;
        if (list.length < pagin.pageSize) {
          this.finished = true;
        } else {
          this.pagin.currentPage += 1;
        }
        this.list = this.list.concat(list);
        this.loading = false;
      }).catch(() => {
        this.error = true;
        this.loading = false;
      })
    }
  },
  created() {
    const id = this.$route.params.id;
    this.id = id;
  }
}
</script>
<style lang="less" scoped>
.list-container{
  padding: 0 60px;
}
</style>
