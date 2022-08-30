// index.js
// const app = getApp()
const { envList } = require('../../envList.js');
const app = getApp()
Page({
  data: {
    hasUserInfo: false,  //是否保存用户信息
    canIUseGetUserProfile: false  //能否使用获取信息框
  },
  /**
   * 点击获取头像昵称
   * @param {*} e 
   */
  getUserProfile(e) {
    //获取头像昵称
    wx.getUserProfile({
      desc: '获取您的微信个人信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
        //保存头像昵称到缓存中
        wx.setStorageSync('userInfo', res.userInfo)
        // app.globalData.userInfo = res.userInfo
        //将头像昵称存入到数据库（由于在小程序端无法直接获取openid，这里采用先插入，后读取)
        wx.cloud.callFunction({
          // 云函数名称
          name: 'insertUserInfo',
          // 传给云函数的参数
          data: {
            userInfo: { nickName: wx.getStorageSync('userInfo').nickName, contact: '', avatarUrl: wx.getStorageSync('userInfo').avatarUrl }
          },
        }).then(res => {
          //插入后，在读取
          wx.cloud.callFunction({
            // 云函数名称
            name: 'selectUserInfo',
            data:{
              type:'self',
              otherOpenid:''
            }
          }).then(res => {
            console.log(res)
            //将含有openid的用户信息保存至缓存中
            wx.setStorageSync('userInfo', res.result.userInfo)
          })
        })
        // 跳转到首页
        wx.navigateTo({
          url: '../home/home/home'  
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
    //获取缓存中的用户信息
    let n = wx.getStorageSync('userInfo')===''?null:wx.getStorageSync('userInfo')
    //当本地缓存的用户名称不为""或者null时，跳转首页
    if (n !== null && n.nickName != '' && n.nickName != null) {
      // 跳转到首页
      wx.navigateTo({
        url: '../home/home/home'  
      })
    }
  }
})
