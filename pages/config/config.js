// pages/config/config.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    passwordVisible: false,
    passwordTitle: '请输入新密码',
    phone: '',
    contacts: [
      {
        id: '0',
        phone: '15812345678',
        authed: true,
      }, {
        id: '1',
        phone: '15812345679',
        authed: false,
      }
    ],
  },
  showPassword() {
    this.setData({
      passwordVisible: true,
      passwordTitle: '请输入新密码',
      lastPassword: '',
    });
  },
  handlePassword(password) {
    if (this.data.lastPassword === '') {
      this.setData({
        passwordTitle: '请再次输入新密码',
        lastPassword: password.detail.value,
      });
    } else {
      if (this.data.lastPassword !== password.detail.value) {
        wx.showToast({
          icon: 'none',
          title: '两次输入的密码不一致',
        });
      } else {
        wx.showLoading();
        setTimeout(function () {
          wx.hideLoading();
          wx.showToast({
            title: '密码修改成功！',
          });
        }, 2000);
      }
      this.setData({
        passwordVisible: false,
      });
    }
    console.debug('typed password is: ', password);
  },
  cancelPassword() {
    this.setData({
      passwordVisible: false,
    });
  },
  handleRemoveContact(e) {
    let { id } = e.currentTarget.dataset;
    wx.showToast({
      title: `Will remove contact ${id}`,
      icon: 'none',
    });
  },
  handlePhoneChange(e) {
    this.setData({
      phone: e.detail.value,
    });
  },
  handlePhoneBlur() {
    this.setData({
      phone: '',
    });
  },
  addContact() {
    wx.showToast({
      title: `Will send an message to ${this.data.phone}`,
      icon: 'none',
    });
    const { contacts } = this.data;
    contacts.push({
      id: new Date().valueOf(),
      phone: this.data.phone,
      authed: false,
    });
  
    this.setData({
      phone: '',
      contacts,
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