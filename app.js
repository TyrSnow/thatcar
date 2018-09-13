import { checkSession } from './utils/method.js';
import * as store from './service/store.js';

App({
  acquireAuth() {
    wx.authorize({
      scope: 'scope.userLocation',
      success() {
        store.set('gps', true);
      },
      fail() {
        wx.showToast({
          icon: 'none',
          title: '没有获得地理位置权限，我们将无法向您的紧急联系人发送您的地理位置信息',
        });
      }
    })
  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          //用户已经授权过
          console.log("用户授权过:", res.authSetting);
          // method.getLogin();
          store.set('gps', true);
        } else {
          store.set('gps', false);
          // method.getLogin();
          this.acquireAuth();
        }
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    checkSession();
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
