<template>
  <textarea
    v-model="content"
    :placeholder="placeholder"
    ref="textarea"
    class="text"
    :readonly="readonly"
    :style="`height: ${lineNum * 20}px;`"
  ></textarea>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    defaultLineNum: {
      type: Number,
      default: 1
    }
  },
  model: {
    prop: 'input',
    event: 'change'
  },
  computed: {
    textarea() {
      return this.$refs.textarea;
    }
  },
  data() {
    return {
      content: '',
      lineNum: 1
    }
  },
  created() {
    this.lineNum = this.defaultLineNum;
  },
  mounted() {
    this.content = this.textarea.getAttribute('input');
  },
  watch: {
    'content'() {
      console.log(this.textarea.scrollHeight);
      this.lineNum = this.textarea.scrollHeight / 20;
      this.$emit('change', this.content);
    }
  }
}
</script>
<style lang="less" scoped>
.text{
  width: 100%;
  resize: none;
  line-height: 20PX;
  font-size: 14PX;
}
</style>
