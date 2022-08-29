const app = getApp()
Page({
  data: {
    ifShowSponsorInfo: false,
    item: {},
    sponsorInfo: {}

  },
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'selectItem',
      data: {
        _id: options.id,
        type:'selectItemByID'
      }
    }).then(res => {
      console.log(res)
      if (res.result.success) {
        this.setData({
          item: res.result.item
        })
        wx.hideLoading()
        console.log(res.result.item)
      }
      else {
        wx.showToast({
          title: '加载失败',
          icon: 'error'
        })
      }
    })
  },
  showSponsorInfo: function (e) {
    let _openid = e.currentTarget.dataset.openid
    if (_openid === app.globalData.userInfo._openid) {
      wx.showToast({
        title: '该物品由你发布',
        icon:'none'
      })
      return
    }
    wx.cloud.callFunction({
      name: 'addRealizeTimes',
      data: {
        _id: this.data.item._id
      }
    }).then(res => {
      if (res.result.success) {
        this.setData({
          'item.realizeTimes': res.result.realizeTimes
        })
      }
      else {
        wx.showToast({
          title: '物品不存在',
        })
      }

    })
    wx.cloud.callFunction({
      name: 'selectUserInfo',
      data: {
        type: 'other',
        otherOpenid: _openid
      }
    }).then(res => {
      if (res.result.success) {
        this.setData({
          sponsorInfo: res.result.userInfo,
          ifShowSponsorInfo: true
        })
        console.log(res)
      }
      else {
        wx.showToast({
          title: '认领失败',
        })
      }

    })
  },
  hideModal: function (e) {
    this.setData({
      ifShowSponsorInfo: false
    })
  },
})