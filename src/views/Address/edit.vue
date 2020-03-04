<template>
  <div class="address-edit-container">
    <Header
      title="收货地址"
    />
    <section>
      <van-address-edit
        :area-list="areaList"
        :address-info="addressInfo"
        :show-delete="!!id"
        @save="onSave"
        @delete="onDelete"
      />
    </section>
  </div>
</template>
<script>
import Header from '@/components/Header'
import areaList from '../../utils/area'
export default {
  components: {
    Header
  },
  data() {
    return {
      areaList,
      id: '',
      addressInfo: {
        id: '',
        name: '',
        tel: '',
        province: '',
        city: '',
        county: '',
        addressDetail: ''
      }
    }
  },
  methods: {
    onSave(content) {
      console.log(content);
      const form = {
        Name: content.name,
        Phone: content.tel,
        Province: content.province,
        City: content.city,
        County: content.county,
        Street: "",
        Address: content.addressDetail
      }
      this.showLoading();
      if (this.id) {
        form.id = this.id;
        this.update(form);
      } else {
        this.add(form);
      }
    },
    update(form) {
      this.$http.address.updateAddress({
        ...form
      }).then(() => {
        this.hideLoading();
        this.$toast('编辑成功');
        this.$router.go(-1);
      }).catch((err) => {
        this.hideLoading();
        this.$toast(err.Message);
      })
    },
    add(form) {
      this.$http.address.add({
        ...form
      }).then(() => {
        this.hideLoading();
        this.$toast('保存成功');
        this.$router.go(-1);
      }).catch((err) => {
        this.hideLoading();
        this.$toast(err.Message);
      })
    },
    onDelete() {
      this.showLoading();
      this.$http.address.deleteAddress({
        id: this.id
      }).then(() => {
        this.$toast('删除成功');
        this.$router.go(-1);
        this.hideLoading();
      }).catch((err) => {
        this.hideLoading();
        this.$toast(err.Message);
      })
    },
  },
  created() {
    this.id = this.$route.query.id || "";
    if (this.id) {
      this.$http.address.getAddress({
        id: this.id
      }).then(({ Data }) => {
        console.log(Data);
        this.addressInfo = {
          id: Data.Id,
          name: Data.Name,
          tel: Data.Phone,
          province: Data.Province,
          city: Data.City,
          county: Data.County,
          addressDetail: Data.Address,
          areaCode: '220102'
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.address-edit-container{
  height: 100vh;
  background-color: #f1f1f1;
}
section{

}
</style>
<style lang="less">
</style>
