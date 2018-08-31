let rdSessionKey = wx.getStorageSync('rdSessionKey');

/**
 * 向后台发送请求
 */
export function request(option) {
  if (!option.header) {
    option.header = {};
  }
  option.header.rdSessionKey = rdSessionKey;
  let originFail = option.fail;
  option.fail = (err) => {
    wx.showToast({
      title: '网络请求失败！',
    });
    originFail && originFail(err)
  }
  return wx.request(option);
}

export function setSessionKey(key) {
  rdSessionKey = key;
  wx.setStorageSync('rdSessionKey', key);
}

export function getSessionKey() {
  return rdSessionKey;
}