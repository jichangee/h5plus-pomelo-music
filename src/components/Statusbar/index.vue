<template>
  <div
    class="statusbar"
    :style="{
      height: `${statusbarHeight}px`,
      'background-color': bc || ''
    }"
  ></div>
</template>
<script>
import { getStatusbarHeight } from '../../utils/h5plus';
export default {
  props: ['bc'],
  computed: {
    statusbarHeight: getStatusbarHeight
  },
  mounted() {
    this.globalStatusbarHeight = getStatusbarHeight();
  }
}
</script>
