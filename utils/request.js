let rdSessionKey = wx.getStorageSync('rdSessionKey');

/**
 * 向后台发送请求
 */
export function request(option) {
  if (!option.header) {
    option.header = {};
  }
  option.header.rdSessionKey = rdSessionKey;
  option.header['content-type'] || (option.header['content-type'] = 'application/x-www-form-urlencoded');
  let originFail = option.fail;
  let originSuccess = option.success;

  return new Promise((resolve, reject) => {
    option.fail = (err) => {
      wx.showToast({
        title: '网络请求失败！',
      });
      reject(err);
      originFail && originFail(err);
    }
    option.success = (resp) => {
      originSuccess && originSuccess(resp);
      resolve(resp);
    }
    return wx.request(option);
  });
  
}

export function setSessionKey(key) {
  rdSessionKey = key;
  wx.setStorageSync('rdSessionKey', key);
}

export function getSessionKey() {
  return rdSessionKey;
}