<template>
  <div class="qa-component">
    <div class="qa-list">
      <QAItem class="item" />
      <QAItem class="item" />
      <QAItem class="item" />
    </div>
  </div>
</template>
<script>
import QAItem from '@/components/Community/QAItem';
export default {
  components: {
    QAItem
  }
}
</script>
<style lang="less" scoped>
.qa-component{
  .qa-list{
    .item{
      &:not(:last-child) {
        .border-bottom(#dedede);
      }
    }
  }
}
</style>
