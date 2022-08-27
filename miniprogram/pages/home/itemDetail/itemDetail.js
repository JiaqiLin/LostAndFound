Page({
  data: {
    ifShowSponsorInfo: false,
    item: {},
    sponsorInfo:{}

  },
  onLoad(options) {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'selectItemByID',
      data: {
        _id: options.id
      }
    }).then(res => {
      console.log(res)
      wx.hideLoading()
      if (res.result.success) {
        this.setData({
          item: res.result.item
        })
        console.log(res.result.item)
      }
      else {
        wx.showToast({
          title: '加载失败',
          icon: 'error'
        })
      }
    })
    // 初始化towerSwiper 传已有的数组名即可
  },
  showSponsorInfo: function (e) {
    let _openid = e.currentTarget.dataset.openid
    wx.cloud.callFunction({
      name: 'selectUserInfo',
      data: {
        type: 'other',
        otherOpenid: _openid
      }
    }).then(res => {
      if (res.result.success) {
        this.setData({
          sponsorInfo:res.result.userInfo,
          ifShowSponsorInfo: true
        })
        console.log(res)
      }
      else{
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