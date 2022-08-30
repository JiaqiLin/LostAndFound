const app = getApp()
Page({
  data: {
    ifShowSponsorInfo: false,  //是否显示联系方式框
    item: {},   //物品信息
    sponsorInfo: {}  //发布者信息

  },
  onLoad(options) {
    //进入详情页加载物品信息
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
      if (res.result.success) {
        this.setData({
          item: res.result.item
        })
        wx.hideLoading()
      }
      else {
        wx.showToast({
          title: '加载失败',
          icon: 'error'
        })
      }
    }).catch(error=>{
      console.log(error)
    })
  },
    /**
   * 查看大图
   * @param {*} e 
   */
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.item.images,
      current: e.currentTarget.dataset.url
    });
  },
  /**
   * 点击认领
   * @param {*} e 
   */
  showSponsorInfo: function (e) {
    let _openid = e.currentTarget.dataset.openid
    //判断是否由本人发布
    if (_openid === wx.getStorageSync('userInfo')._openid) {
      wx.showToast({
        title: '该物品由你发布',
        icon:'none'
      })
      return
    }
    //不由本人发布
    wx.showLoading({
      title: '获取中',
    })
    //增加认领次数
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
    //获取发布者联系方式
    wx.cloud.callFunction({
      name: 'selectUserInfo',
      data: {
        type: 'other',
        otherOpenid: _openid
      }
    }).then(res => {
      if (res.result.success) {
        wx.hideLoading()
        this.setData({
          sponsorInfo: res.result.userInfo,
          ifShowSponsorInfo: true
        })
      }
      else {
        wx.showToast({
          title: '认领失败',
        })
      }

    })
  },
  /**
   * 关闭发布者联系方式模态框
   * @param {} e 
   */
  hideModal: function (e) {
    this.setData({
      ifShowSponsorInfo: false
    })
  },
})