<template>
  <div class="article-component">
    <section class="info">
      <h1>{{data.Title}}</h1>
      <p class="time">发表时间：{{formatDateTime(data.Date)}}</p>
      <div class="author">
        <img v-if="data.AppUser && data.AppUser.Photo" :src="`${MEDIA_BASE_URL}${data.AppUser.Photo}`" alt="">
        <span>{{data.AppUser && data.AppUser.Nick}}</span>
      </div>
    </section>
    <section>
      <div class="content-container" v-html="data.Content"></div>
    </section>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {
          AppUser: {}
        }
      }
    }
  },
  updated() {
    if (this.data) {
      this.data.Content = this.data.Content.replace(/\n/g, '<br>');
    }
  }
}
</script>
<style lang="less" scoped>
section{
  padding: 0 60px;
}
section.info{
  margin: 74px 0 100px;
  h1{
    font-size: 60px;
    margin-bottom: 67px;
    line-height: 1.47;
  }
  .time{
    font-size: 36px;
    margin-bottom: 73px;
  }
  .author{
    display: flex;
    align-items: center;
    img{
      width: 90px;
      height: 90px;
      border-radius: 50%;
      margin-right: 25px;
    }
    span{
      font-size: 42px;
      font-weight: bold;
    }
  }
}
.content-container{
  padding-bottom: 80px;
  line-height: 1.67;
  img{
    max-width: 100%;
  }
}
</style>
<style lang="less">
.article-component{
  .content-container{
    padding-bottom: 80px;
    line-height: 1.67;
    img{
      max-width: 100%;
    }
  }
}
</style>
