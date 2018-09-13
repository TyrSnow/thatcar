import { request, setSessionKey, getSessionKey } from './request.js';
import {
  getOpenIdUrl,
  saveUserInfoUrl,
  getUserInfoUrl,
  updateUserInfoUrl,
  changeUnlockUrl,
  saveContactUrl,
  loadContactsUrl,
  deleteContactUrl,
  changeUnlockPwdUrl,
  changeRiskPwdUrl,
  verifyPwdUrl,
  saveTripUrl,
  getCurrentTripUrl,
  endTripUrl,
  delayTripUrl,
  sendSOSUrl,
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

export function saveUserInfo(info) {
  return request({
    url: saveUserInfoUrl,
    data: info,
  });
}

export function getUserInfo() {
  return request({
    url: getUserInfoUrl,
  });
}

export function updateUserInfo(user) {
  return request({
    url: updateUserInfoUrl,
    data: user,
  });
}

export function changeUnlockPassword(unlockPwd) {
  return request({
    url: changeUnlockUrl,
    data: {
      unlockPwd,
    },
  });
}

export function saveContact(phone) {
  return request({
    url: saveContactUrl,
    method: 'post',
    data: {
      data: JSON.stringify([{
        phone,
      }]),
    }
  });
}

export function loadContacts() {
  return request({
    url: loadContactsUrl,
    method: 'get',
  });
}

export function deleteContact(id) {
  return request({
    url: deleteContactUrl,
    method: 'post',
    data: {
      id,
    },
  });
}

export function modifyRiskPassword(riskPwd) {
  return request({
    url: changeRiskPwdUrl,
    method: 'post',
    data: {
      riskPwd,
    },
  });
}

export function modifyUnlockPassword(unlockPwd) {
  return request({
    url: changeUnlockPwdUrl,
    method: 'post',
    data: {
      unlockPwd,
    },
  });
}

export function verifyPwd(pwd) {
  return request({
    url: verifyPwdUrl,
    method: 'post',
    data: {
      pwd,
    },
  });
}

export function startTrip(estimateDate, plateNo, taxiApp, gps = {}) {
  return request({
    url: saveTripUrl,
    method: 'post',
    data: {
      estimateDate,
      plateNo,
      taxiApp,
      gps: JSON.stringify(gps),
    },
  });
}

export function getCurrentTrip() {
  return request({
    url: getCurrentTripUrl,
    method: 'get',
  });
}

export function endTrip(id, gps = {}) {
  return request({
    url: endTripUrl,
    method: 'post',
    data: {
      id,
      scheduleStatus: 2,
      gps: JSON.stringify(gps),
    },
  });
}

export function delayTrip(id, estimateDate, gps = {}) {
  return request({
    url: delayTripUrl,
    method: 'post',
    data: {
      id,
      estimateDate,
      gps: JSON.stringify(gps)
    },
  });
}

export function sendSOS() {
  return request({
    url: sendSOSUrl,
    method: 'post',
  });
}
