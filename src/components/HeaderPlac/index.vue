<template>
  <div class="header-plac">
    <Statusbar />
    <div class="line"></div>
  </div>
</template>
<script>
import Statusbar from '@/components/Statusbar'
import { getStatusbarHeight } from '../../utils/h5plus';
export default {
  components: {
    Statusbar,
  },
}
</script>
<style lang="less" scoped>
.header-plac{
  .line{
    height: 132px;
  }
}
</style>
