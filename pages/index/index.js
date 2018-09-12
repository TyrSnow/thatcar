// pages/index/index.js
import {
  saveUserInfo,
  getCurrentTrip,
  startTrip,
  verifyPwd,
  endTrip,
  delayTrip,
  sendSOS,
} from '../../utils/method.js';
import {
  isPlateNo,
} from '../../utils/utils.js';

const OTHER_APP_TEXT = '其他';

const TIME_RANG_MINITES = [
  15, 30, 45, 60,
  75, 90, 105, 120,
];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    onTrip: false,
    // time: '00:30',
    app: [0],
    plateNo: '',
    appList: [
      '滴滴出行',
      '优步Uber',
      '神州专车',
      '嘀嗒出行',
      '美团打车',
      '曹操专车',
      '首汽约车',
      '高德打车',
      '快的打车',
      '易到用车',
      '嘀嗒拼车',
      '天天用车',
      '一号专车',
      '至尊用车',
      '出租',
      OTHER_APP_TEXT],
    timeRange: [
      '0:15', '0:30', '0:45', '1:00',
      '1:15', '1:30', '1:45', '2:00',
    ],
    time: [0],
  },

  handleTimeRangeChange(ev) {
    this.setData({
      time: ev.detail.value,
    });
  },

  handleAppChange(ev) {
    this.setData({
      app: ev.detail.value,
    });
  },

  handlePlateNoChange(ev) {
    this.setData({
      plateNo: ev.detail.value,
    });
  },

  jumpSetting() {
    wx.navigateTo({
      url: '../config/config',
    });
  },

  updateRemainTime() {
    const { remainMinutes } = this.data.tripData;
    let absRemainMinutes = Math.abs(remainMinutes);
    const seconds = absRemainMinutes % 60;
    let minites = Math.floor(absRemainMinutes / 60);
    let hours = Math.floor(minites / 60);
    minites = minites % 60;
    this.setData({
      seconds: seconds < 10 ? `0${seconds}` : seconds,
      minites: minites < 10 ? `0${minites}` : minites,
      hours,
      overtime: remainMinutes < 0,
      remainTip: remainMinutes > 0 ? '后自动发送短信预警' : '行程超时，已发送预警短信',
    });

  },

  tick() {
    const { tripData } = this.data;
    tripData.remainMinutes--;
    this.setData({
      tripData,
    });
    this.updateRemainTime();
  },

  startCountDown() {
    this.updateRemainTime();
    if (this.countDownInterval) {
      clearInterval(this.countDownInterval);
    }
    this.countDownInterval = setInterval(this.tick, 1000);
  },

  refreshTripStatus() {
    this.setData({
      loading: true,
    });
    getCurrentTrip().then(resp => {
      let onTrip = !!resp.data.data && resp.data.data.scheduleStatus === 1;
      this.setData({
        loading: false,
        onTrip,
        tripData: resp.data.data || {},
      });
      if (onTrip) {
        this.startCountDown();
      }
    }).catch(err => { });
  },

  startTrip() {
    let { app, time, plateNo, appList } = this.data;
    plateNo = plateNo.toUpperCase();
    if (!isPlateNo(plateNo)) {
      wx.showToast({
        title: '请输入合法的车牌号',
        icon: 'none',
      });
      return;
    }
    let estimateDate = TIME_RANG_MINITES[time[0]];
    // console.log(estimateDate, plateNo, appList[app]);
    startTrip(estimateDate, plateNo, appList[app]).then(resp => {
      console.debug('start trip: ', resp);
      if ([401, 402].indexOf(resp.data.code) !== -1) {
        wx.showToast({
          title: resp.data.msg,
          icon: 'none',
        });
        setTimeout(function () {
          wx.navigateTo({
            url: '../config/config',
          });
        }, 1000);
      } else {
        this.refreshTripStatus();
      }
    }).catch(err => {
      console.debug('start trip error: ', err);
      this.refreshTripStatus();
    });
  },

  endTrip() {
    this.setData({
      isEnd: true,
      passwordVisible: true,
      passwordTitle: '请输入解锁密码',
    });
  },

  delayTrip() {
    this.setData({
      isEnd: false,
      passwordVisible: true,
      passwordTitle: '请输入解锁密码',
    });
  },

  verifyPassword(e) {
    verifyPwd(e.detail.value).then(resp => {
      this.setData({
        passwordVisible: false,
      });
      if (resp.data.code === 200) {
        if (this.data.isEnd) {
          return endTrip(this.data.tripData.id);
        }
        return delayTrip(this.data.tripData.id, 15);
      } else {
        wx.showToast({
          icon: 'none',
          title: '密码不正确',
        });
      }
    }).then(resp => {
      if (resp.data.code === 200) {
        this.refreshTripStatus();
      } else {
        wx.showToast({
          icon: 'none',
          title: resp.data.msg,
        });
      }
    }).catch(err => {
      this.refreshTripStatus();
    });
  },

  cancelPassword() {
    this.setData({
      passwordVisible: false,
    });
  },

  bindGetUserInfo(e) {
    saveUserInfo(e.detail.userInfo).then(
      (resp) => {
        console.debug(resp);
        this.startTrip();
      },
    ).catch(err => {
      console.error(err);
      wx.showToast({
        icon: 'none',
        title: err.message,
      });
    })
  },

  // sendSOS() {
  //   sendSOS().then(resp => {
  //     console.debug(resp);
  //     wx.showToast({
  //       title: resp.data.msg,
  //     });
  //   });
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.refreshTripStatus();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})