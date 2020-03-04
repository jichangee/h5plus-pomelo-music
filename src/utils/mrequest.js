import axios from 'axios';
import { Toast } from 'vant';
import { getToken, setToken, setLogin, clearAuth } from './auth';
import qs from 'qs';
import BASE_URL from '../config/api';
import router from '../router'

const uploadUrl = [
  'upload'
];

// export default function request(params) {
//   let headers = {}
//   const url = `${BASE_URL}${params.url}`
//   const data = params.data || params.params;
//   let processData = true;
//   if (uploadUrl.filter(url => params.url.includes(url)).length > 0) {
//     processData = false;
//     mui.ajaxSettings.xhr = function(protocol) {  
//       return new window.XMLHttpRequest();  
//     };
//   } else {
//     headers['Content-Type'] = 'application/x-www-form-urlencoded';
//   }
//   const token = getToken();
//   if (token) {
//     headers['authorization'] = token;
//   }
//   return new Promise((resolve, reject) => {
//     mui.ajax({
//       url,
//       data,
//       headers,
//       processData,
//       cache: false,
//       async: true,
//       contentType: false,
//       crossDomain: true,
//       timeout: 61 * 1000,
//       type: params.method,
//       dataType: 'json',
//       beforeSend: function(a, b, c){
//         console.log(a, b, c);
//       },
//       success: (res, statusTest, xhr) => {
//         const token = xhr.getResponseHeader('authorization');
//         if (token) {
//           setToken(token);
//           setLogin();
//         }
//         if (res.Code !== 0) {
//           // 抛异常
//           Toast.clear();
//           if (res.Code === 100) {
//             Toast(res.Message);
//           }
//           reject(res);
//           return;
//         }
//         resolve(res);
//       },
//       error: res => {
//         console.log(res);
//         reject(res);
//       }
//     })
//   })
// }


// 创建axios实例
// const service = axios.create({
//   baseURL: BASE_URL, // api 的 base_url
//   timeout: 61000, // 请求超时时间
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   // withCredentials: true,
//   transformRequest: [function (data) {
//     if (!(data instanceof FormData)) {
//       data = qs.stringify(data)
//     }
//     return data;
//   }],
// });

// // request拦截器
// service.interceptors.request.use(
//   (config) => {
//     if (config.params && typeof config.params.currentPage !== 'undefined' && typeof config.params.pageSize === 'undefined') {
//       config.params.pageSize = 10;
//     }
//     // if (!config.params || typeof config.params.pageNum === 'undefined') {
//     //   Toast.loading({
//     //     duration: 0,
//     //     forbidClick: true,
//     //     message: '加载中'
//     //   });
//     // }
//     const token = getToken();
//     if (token) config.headers['Authorization'] = token;
//     if (uploadUrl.filter(url => config.url.includes(url)).length > 0) {
//       config.headers['Content-Type'] = 'multipart/form-data';
//     }
//     return config;
//   },
//   (error) => {
//     // Do something with request error
//     Promise.reject(error);
//   },
// );

// // response 拦截器
// service.interceptors.response.use(
//   (response) => {
//     /**
//      * code为非000000是抛错
//      */
//     const res = response.data;
//     const token = response.headers['authorization'];
//     if (token) {
//       setToken(token);
//       setLogin();
//     }
//     if (response.status === 401) {
//       Toast.clear();
//       Toast(res.Message);
//     } else if (res.Code !== 0) {
//       // 抛异常
//       Toast.clear();
//       if (res.Code === 100) {
//         Toast(res.Message);
//       }
//       return Promise.reject(res);
//     }
//     return res;
//   },
//   error => {
//     console.log('error', error);
//     if (error.toString().includes('timeout')) {
//       Toast('当前网络状况较差，请稍候再试');
//     } else if (error.toString().includes('status code 401')) {
//       Toast('请先登录');
//       clearAuth();
//       router.push(`/passport/index?directUrl=${window.location.hash.replace('#', '')}`)
//     }
//     return Promise.reject(error);
//   },
// );
// export default service;