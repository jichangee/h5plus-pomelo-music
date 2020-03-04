<template>
  <div class="imageitem-component">
    <a v-show="!readonly" href="javascript:;" class="close" @click="close">
      <img src="../../assets/home/lesson/comment/cuowu.png" alt="">
    </a>
    <img :src="data.Path" alt="">
    <div class="text-container" v-show="!readonly || data.Description">
      <MultLineInput
        :readonly="readonly"
        placeholder="添加注释..."
        v-model="data.Description"
        class="text-input"
        :defaultLineNum="defaultLineNum"
      />
    </div>
  </div>
</template>
<script>
import MultLineInput from '@/components/Evaluation/MultLineInput';
export default {
  components: {
    MultLineInput
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
  data() {
    return {
      defaultLineNum: 1
    }
  },
  methods: {
    close() {
      this.$emit('close', this.index);
    }
  },
  created() {
    this.defaultLineNum = this.data.Description.split('\n').length;
  }
}
</script>
<style lang="less" scoped>
.imageitem-component{
  position: relative;
  img{
    max-width: 100%;
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
    img{
      width: 60px;
      height: 60px;
    }
  }
}
</style>
