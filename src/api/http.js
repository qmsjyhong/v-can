import axios from 'axios';
import qs from 'qs';
import { Indicator, Toast } from 'mint-ui';
import { getLoc } from '../utils';
let Loading = true;
let time = new Date();
var excludeUrl = ['api/setWinParam', 'api/setWinStatus', 'api/getInputSourceList', 'api/setWinZOrder', 'api/setWinInput'];
var isExcludeUrl = function(url) {
  return excludeUrl.some(item => item === url);
};
////添加请求拦截器
axios.interceptors.request.use(
  config => {
    if (!isExcludeUrl(config.url)) {
      if (Loading) {
        Indicator.open({
          text: 'Loading...',
          spinnerType: 'triple-bounce'
        });
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//添加响应拦截
axios.interceptors.response.use(
  response => {
    Loading = false;
    Indicator.close();
    return response;
  },
  error => {
    Loading = false;
    Indicator.close();
    return Promise.resolve(error.response);
  }
);

function checkStatus(response) {
  if (response && response.status === 200) {
    return response.data;
  }
  let locale = getLoc('lang') == null ? 'zh' : getLoc('lang');
  return {
    status: 501,
    msg: locale == 'zh' ? '网络异常' : 'Network exception'
  };
}

function checkCode(res) {
  if (res.status === 501) {
    Toast(res.msg);
  }

  if (res.status === 10000001) {
    let locale = getLoc('lang') == null ? 'zh' : getLoc('lang');
    Toast(locale == 'zh' ? '服务器异常' : 'Server exception');
  }
  return res;
}

export default {
  post(url, data) {
    return axios({
      method: 'post',
      baseURL: process.env.NODE_ENV === 'development' ? '' : 'http://' + IP + ':5000',
      url,
      data: JSON.stringify(data),
      // timeout: 5000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8'
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
      baseURL: process.env.NODE_ENV === 'development' ? '' : 'http://' + IP + ':5000',
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
  },
  all() {
    return axios.all.call(this, arguments);
  }
};
