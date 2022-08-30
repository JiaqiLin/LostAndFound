// pages/individualCenter/individualCenter.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '' //用户信息
  },

  exit() {
    wx.showModal({
      title: '提示',
      content: '是否登出？',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync('userInfo')
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }

      }
    })
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
    //获取缓存中的用户信息
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
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