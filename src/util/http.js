'use strict';

// import _vue from '../main';
import axios from 'axios';
// import qs from 'qs';

axios.interceptors.request.use(
  config => {
    // loading
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.resolve(error.response);
  }
);

function checkStatus(response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (
    response &&
    (response.status === 200 ||
      response.status === 304 ||
      response.status === 400 ||
      response.status === 401)
  ) {
    return response;
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  };
}

function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    // console.log(res.data.msg);
  }
  if (res.data && !res.data.obj) {
    // console.log(res.data.msg);
  }
  if (res.data.code === 402 || res.status === 401) {
    // if (window.location.hash.indexOf('wechat') !== -1) {
    //   _vue.$cookies.set('landroverAccessToken', '');
    //   _vue.$cookies.set('landroverUserId', '');
    //   _vue.$cookies.set('user', '');
    //   window.location.hash = '#/wechat/login';
    // }
  }
  return res;
}

export default {
  post(url, data) {
    return axios({
      method: 'post',
      baseURL: process.env.BASE_URL,
      url,
      data: JSON.stringify(data),
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return checkStatus(response);
      })
      .then(res => {
        return checkCode(res);
      });
  },
  get(url, params) {
    return axios({
      method: 'get',
      baseURL: process.env.BASE_URL,
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        return checkStatus(response);
      })
      .then(res => {
        return checkCode(res);
      });
  }
};
