let loadingToast;
import dayjs from 'dayjs';
export default {
  data() {
    return {
      MEDIA_BASE_URL: 'https://youziyinyue.oss-cn-hangzhou.aliyuncs.com/root',
      MEDIA_SNAPSHOT_URL: '?x-oss-process=video/snapshot,t_10000,m_fast',
      globalStatusbarHeight: 20
    }
  },
  methods: {
    back() {
      this.restartPage();
      this.$router.go(-1);
    },
    restartPage() {
      const _this = this;
      this.$route.meta.notKeepAlive = true;
      setTimeout(() => {
        _this.$route.meta.notKeepAlive = false;
      }, 50);
    },
    showLoading(message = '加载中...') {
      this.$toast.allowMultiple();
      loadingToast = this.$toast.loading({
        message,
        duration: 10000,
        forbidClick: true
      })
    },
    hideLoading() {
      loadingToast && loadingToast.clear()
    },
    formatDateTime(date, fmt = 'YYYY-MM-DD') {
      if (!date) {
        return ''
      }
      return dayjs(date).format(fmt);
    }
  }
}