import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import scroll from "./components/Scroll";
import mixins from "./utils/mixins";

import Vant from "vant";
import "vant/lib/index.css";

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

import FastClick from "fastclick";
FastClick.attach(document.body);

import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);

import defaultHead from "./assets/common/head.jpg";

import http from "./api";

import "./permission";

// import * as customFilter from './utils/filter'
// Object.keys(customFilter).forEach(key => Vue.filter(key, customFilter[key]))

Vue.mixin(mixins);
Vue.use(Vant);
Vue.use(VueAwesomeSwiper);
Vue.component("scroll", scroll);
Vue.config.productionTip = false;

Vue.prototype.$http = http;
Vue.prototype.$defaultHead = defaultHead;

new Vue({
  router,
  store,
  render: h => h(App),
  watch: {
    '$route'(to) {
      this.hideLoading();
    }
  }
}).$mount("#app");

let canBack = false;
document.addEventListener("plusready", function() {
  plus.navigator.setStatusBarStyle('dark')
  var webview = plus.webview.currentWebview();
  plus.key.addEventListener("backbutton", function() {
    webview.canBack(function(e) {
      if (e.canBack) {
        webview.back();
      } else {
        if (canBack) {
          webview.close();
        } else {
          plus.nativeUI.toast('再按一次退出');
          canBack = true;
          setTimeout(() => {
            canBack = false;
          }, 1000);
        }
      }
    });
  });
});

if (process.env.NODE_ENV !== 'production') {
  const hm = document.createElement("script");
  hm.src = "https://cdn.jsdelivr.net/npm/vconsole@3.2.2/dist/vconsole.min.js";
  hm.onload = () => {
    new window.VConsole();
  };
  const s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
}
