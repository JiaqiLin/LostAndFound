// index.js
// const app = getApp()
const { envList } = require('../../envList.js');
const app = getApp()
Page({
  data: {
    hasUserInfo: false,
    canIUseGetUserProfile: false
  },
  getUserProfile(e) {
    // 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '获取您的微信个人信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
        app.globalData.userInfo = res.userInfo
        wx.cloud.callFunction({
          // 云函数名称
          name: 'insertUserInfo',
          // 传给云函数的参数
          data: {
            userInfo: { nickName: app.globalData.userInfo.nickName, contact: '', avatarUrl: app.globalData.userInfo.avatarUrl }
          },
        }).then(res => {
          wx.cloud.callFunction({
            // 云函数名称
            name: 'selectUserInfo',
            data:{
              type:'self',
              otherOpenid:''
            }
          }).then(res => {
            app.globalData.userInfo = res.result.userInfo
          })
        })
        wx.navigateTo({
          url: '../home/home/home'  // 跳转到首页
        })
      }
    })
  },
  onLoad() {
    this.setData({
      canIUseGetUserProfile: true
    })
  },
  // 当我们登录完退出再次进入，为了避免再次点击登录按钮多次获取用户信息的情况，如果后台userInfo信息存在，直接进入登录页面，无需再次登录进行获取
  onShow() {
    //获取用户globalData信息
    var n = app.globalData.userInfo
    //当本地缓存的用户名称不为""或者null时，设置userinfo信息
    if (n !== null && n.nickName != '' && n.nickName != null) {
      wx.navigateTo({
        url: '../home/home/home'  // 跳转到首页
      })
    }
  }
})
