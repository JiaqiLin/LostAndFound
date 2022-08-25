// index.js
// const app = getApp()
const { envList } = require('../../envList.js');
const app = getApp()
Page({
  data: {
    PageCur: '',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
    switch (PageCur) {
      case home:
        url = '/pages/home/home/home'
    }
  },
  onShareAppMessage() {
    return {
      title: 'ColorUI-高颜值的小程序UI组件库',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          PageCur: 'individualCenter',
        })
        app.globalData.userInfo = this.data.userInfo
        wx.cloud.callFunction({
          // 云函数名称
          name: 'insertUserInfo',
          // 传给云函数的参数
          data: {
            userInfo: { nickName: this.data.userInfo.nickName, contact: '' }
          },
        })
          .then(res => {
            console.log(res)
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
        wx.navigateTo({
          url: '/pages/home/home/home',
        })
      }
    })
  }
})
