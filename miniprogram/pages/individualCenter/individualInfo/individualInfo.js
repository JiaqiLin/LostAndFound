// pages/individualInfo/individualInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
    }

  },
  _save() {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'updateUserInfo',
      // 传给云函数的参数
      data: {
        userInfo: this.data.userInfo
      },
    })
      .then(res => {
        if (res.result.success) {
          wx.showToast({
            title: '修改成功',
          })
          app.globalData.userInfo = this.data.userInfo
        }
        else{
          wx.showToast({
            title: '修改失败',
            icon: 'error'
          })
        }
      })
  },
  changeNickName(e) {
    this.setData({
      'userInfo.nickName': e.detail.value
    })
    this._save()
  },
  changeContact(e) {
    this.setData({
      'userInfo.contact': e.detail.value
    })
    this._save()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})