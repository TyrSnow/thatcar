// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time: '00:30',
    app: 0,
    appList: ['出租', '专车'],
    timeRange: [
      '0:15', '0:30', '0:45', '1:00',
      '1:15', '1:30', '1:45', '2:00',
      '2:15', '2:30', '2:45', '3:00',
    ],
    time: [0],
  },

  handleTimeRangeChange(ev) {
    this.setData({
      time: ev.detail.value,
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