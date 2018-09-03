// pages/config/config.js
import {
  loadContacts,
  saveContact,
  deleteContact,
  modifyRiskPassword,
  modifyUnlockPassword,
} from '../../utils/method.js';

const MODIFY_RISK_PASSWORD = 0;
const MODIFY_UNLOCK_PASSWORD = 1;

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
  modifyRiskPassword() {
    this.setData({
      type: MODIFY_RISK_PASSWORD,
      passwordVisible: true,
      passwordTitle: '请输入新风险密码',
      lastPassword: '',
    });
  },
  modifyUnlockPassword() {
    this.setData({
      type: MODIFY_UNLOCK_PASSWORD,
      passwordVisible: true,
      passwordTitle: '请输入新解锁密码',
      lastPassword: '',
    });
  },
  handlePassword(password) {
    if (this.data.lastPassword === '') {
      this.setData({
        passwordTitle: this.data.type === MODIFY_RISK_PASSWORD ? '请再次输入新风险密码' : '请再次输入新解锁密码',
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
        if (this.data.type === MODIFY_RISK_PASSWORD) {
          modifyRiskPassword(this.data.lastPassword).then(resp => {
            wx.hideLoading();
            wx.showToast({
              title: '修改成功',
            });
          }).catch(err => {
          });
        } else {
          modifyUnlockPassword(this.data.lastPassword).then(resp => {
            wx.hideLoading();
            wx.showToast({
              title: '修改成功',
            });
          }).catch(err => {
          });
        }
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
    deleteContact(id).then(resp => {
      wx.showToast({
        title: '紧急联系人已删除',
      });
      this.refreshContacts();
    }).catch(err => {});
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
    let existPhone = this.data.contacts.filter(contact => contact.phone === this.data.phone);
    if (existPhone.length > 0) {
      wx.showToast({
        icon: 'none',
        title: '紧急联系人已经存在',
      });
    } else {
      saveContact(this.data.phone).then(resp => {
        wx.showToast({
          title: '紧急联系人已添加',
        });
        this.refreshContacts();
      });
    }
  
    this.setData({
      phone: '',
    });
  },
  refreshContacts() {
    loadContacts().then((resp) => {
      this.setData({
        contacts: resp.data.data,
      });
    }).catch((err) => {});
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
    this.refreshContacts();
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