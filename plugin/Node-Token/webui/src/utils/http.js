import axios from 'axios';
import store from 'store';
import router from 'router';
import { BASEURL } from '../config/config';
import tip from '../utils/tip';

/**
 * @author Nzq
 * @date 2019/2/25
 * @Description: 跳转到登录页面
*/
const toLoginPage = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
};

const http = axios.create({
  baseURL: BASEURL,
  timeout: 1000 * 10,
  withCredentials: false, // 携带凭证
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  responseType: 'json',
  transformRequest: [data => {
    return JSON.stringify(data);
  }]
});

// 添加一个请求拦截器
http.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    let token = store.getters.getToken;
    token && (config.headers.Authorization = 'Bearer ' + token);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加一个响应拦截器
http.interceptors.response.use(
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  // response.data 直接返回服务器的发送回来的值
  response => response.status === 200 ? Promise.resolve(response.data) : Promise.reject(response),
  error => {
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    const { response } = error;
    if (response && response.status) {
      switch (response.status) {
        // 未登录
        case 401: {
          toLoginPage();
          break;
        }

        // 登录过期
        case 403: {
          tip('登录过期，请重新登录');
          // 移除token
          store.commit('setToken', '');
          setTimeout(() => {
            toLoginPage();
          }, 1000);
          break;
        }

        // 404
        case 404: {
          tip('404');
          break;
        }

        // 500
        case 500: {
          tip('500');
          break;
        }

        // 其他
        default: {
          tip(response.data.message);
        }
      }

      return Promise.reject(response);
    } else {
      tip('服务器故障');
    }
  }
);

export default http;
