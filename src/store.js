import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, getToken } from './utils/auth';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uploadFile: null,
    mobile: '',
    token: '',
    directUrl: '/',
    youShowInfo: {},
    wxInfo: {},
    isBind: false,
    orderInfo: null,
    goodsInfo: null
  },
  getters: {
    uploadFile: state => state.uploadFile,
    mobile: state => state.mobile,
    token: state => state.token,
    directUrl: state => state.directUrl,
    youShowInfo: state => state.youShowInfo,
    wxInfo: state => state.wxInfo,
    isBind: state => state.isBind,
    orderInfo: state => state.orderInfo,
    goodsInfo: state => state.goodsInfo
  },
  mutations: {
    SET_UPLOAD_FILE: (state, file) => {
      state.uploadFile = file;
    },
    SET_MOBILE: (state, mobile) => {
      state.mobile = mobile;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_DIRECT_URL: (state, directUrl) => {
      state.directUrl = directUrl || '/';
    },
    SET_YOUSHOW_INFO: (state, info) => {
      state.youShowInfo = info;
    },
    SET_WXINFO: (state, info) => {
      state.wxInfo = info;
    },
    SET_ISBIND: (state, isBind) => {
      state.isBind = isBind;
    },
    SET_ORDER_INFO: (state, info) => {
      state.orderInfo = info;
    },
    SET_GOODS_INFO: (state, info) => {
      state.goodsInfo = info;
    }
  },
  actions: {

  }
})
