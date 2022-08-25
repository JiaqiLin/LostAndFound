// pages/individualInfo/individualInfo.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      nickName: '',
      contact: ''
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
        wx.showToast({
          title: '成功',
        })
      })
      .catch(error => {
        wx.showToast({
          title: '失败',
          icon: 'error'
        })
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
      'userInfo.changeContact': e.detail.value
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
    wx.cloud.callFunction({
      name: 'selectUserInfo'
    }).then(res => {
      console.log(res)
    }).catch(error => {
      console.log(error)
      wx.showToast({
        title: '失败',
      })
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