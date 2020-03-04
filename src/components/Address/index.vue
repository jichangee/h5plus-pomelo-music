<template>
  <div class="address-list-component">
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      chosenAddressId: '',
      addressList: []
    }
  },
  methods: {
    onAdd() {
      console.log('onAdd');
      this.$emit('add', 'add');
    },
    onEdit(item, index) {
      this.$emit('edit', { item, index });
    },
    onSelect(item, index) {
      this.$emit('select', { item, index });
    }
  },
  mounted() {
    this.addressList = this.list;
  },
  updated() {
    this.addressList = this.list;
  },
  watch: {
    'list'() {
      this.addressList = this.list;
    }
  }
}
</script>
<style lang="less" scoped>

</style>
