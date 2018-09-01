import { request, setSessionKey, getSessionKey } from './request.js';
import {
  getOpenIdUrl,
  changeUnlockUrl,
  loadContactsUrl,
} from './config.js';

export function checkSession(callback) {
  if (!getSessionKey()) { // 本地没有rdSessionKey的时候也要重新去拿
    return getLogin(callback);
  }
  wx.checkSession({
    success: function () {
      callback && callback();
    },
    fail: function () {
      //code获取成功，保存为当前页面的全局变量code
      getLogin(callback);
    }
  })
}

export function getLogin(callback) {
  //code获取成功，保存为当前页面的全局变量code
  wx.login({
    success: res => {
      if (res.code) {
        request({
          url: getOpenIdUrl,
          data: { code: res.code },
          success: function (res) {
            setSessionKey(res.data.rdSessionKey);
            callback && callback();
          }
        });
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  })
}

export function changeUnlockPassword(unlockPwd) {
  return request({
    url: changeUnlockUrl,
    data: {
      unlockPwd,
    },
  });
}

export function loadContacts() {
  return request({
    url: loadContactsUrl,
    method: 'get',
  });
}