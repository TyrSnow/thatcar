// pages/index/index.js
import {
  getCurrentTrip,
  startTrip,
} from '../../utils/method.js';

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
    appList: ['出租', '滴滴打车', '其他'],
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

  refreshTripStatus() {
    this.setData({
      loading: true,
    });
    getCurrentTrip().then(resp => {
      this.setData({
        loading: false,
        onTrip: !!resp.data.data,
        tripData: resp.data.data,
      });
    }).catch(err => { });
  },

  startTrip() {
    const { app, time, plateNo, appList } = this.data;
    let estimateDate = TIME_RANG_MINITES[time[0]];
    // console.log(estimateDate, plateNo, appList[app]);
    startTrip(estimateDate, plateNo, appList[app]).then(resp => {
      console.debug('start trip: ', resp);
      this.refreshTripStatus();
    }).catch(err => {
      console.debug('start trip error: ', err);
      this.refreshTripStatus();
    });
  },

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