// pages/individualInfo/individualInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}

  },
  /**
   * 保存用户信息
   */
  _save() {
    wx.cloud.callFunction({
      name: 'updateUserInfo',
      data: {
        userInfo: this.data.userInfo
      },
    })
      .then(res => {
        if (res.result.success) {
          wx.showToast({
            title: '修改成功',
          })
          //修改缓存中的用户信息
          wx.setStorageSync('userInfo',this.data.userInfo)
        }
        else {
          wx.showToast({
            title: '修改失败',
            icon: 'error'
          })
        }
      })
  },
  /**
   * 修改昵称
   * @param {*} e 
   */
  changeNickName(e) {
    this.setData({
      'userInfo.nickName': e.detail.value
    })
    //保存
    this._save()
  },
  /**
   * 修改联系方式
   * @param {*} e 
   */
  changeContact(e) {
    this.setData({
      'userInfo.contact': e.detail.value
    })
    //保存
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
    //载入缓存中的用户信息
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