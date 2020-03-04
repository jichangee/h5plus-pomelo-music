<template>
  <div class="videoitem-component">
    <a v-show="!readonly" href="javascript:;" class="close" @click="close">
      <img src="../../assets/home/lesson/comment/cuowu.png" alt="">
    </a>
    <div class="video-container">
      <VideoPlayer :src="data.Path" controls />
    </div>
    <div class="text-container" v-show="data.Description">
      <MultLineInput
        :readonly="readonly"
        placeholder="添加注释..."
        v-model="data.Description"
        class="text-input"
      />
    </div>
  </div>
</template>
<script>
import VideoPlayer from '@/components/VideoPlayer'
import MultLineInput from '@/components/Evaluation/MultLineInput';
export default {
  components: {
    MultLineInput,
    VideoPlayer
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default: -1
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close', this.index);
    }
  }
}
</script>
<style lang="less" scoped>
.videoitem-component{
  position: relative;
  .video-container{
    width: 100%;
    height: 600px;
    display: inherit;
  }
  .text-container{
    background-color: #333;
    padding: 30px 0;
  }
  .text-input{
    background-color: #333;
    color: #fff;
    width: 100%;
    padding: 0 8PX;
  }
  .close{
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 2;
    img{
      width: 60px;
      height: 60px;
    }
  }
}
</style>
