// pages/individualCenter/checkItem/checkItem.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,  //导航编号
    scrollLeft: 0,  //点击效果参数
    TabName: ['未被认领', '已被认领', '已认领成功'], //导航栏内容
  },
  /**
   * 改变导航
   * @param {*} e 
   */
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    //重新加载
    this.loadItems()
  },
  /**
   * 点击物品，跳转详情页
   * @param {*} e 
   */
  checkItemDetail: function (e) {
    wx.navigateTo({
      url: `/pages/home/itemDetail/itemDetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 点击删除
   * @param {*} e 
   */
  deleteItem(e) {
    let that=this
    wx.showModal({
      title: '提示',
      content: '确定要删除该物品？',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'deleteItem',
            data: {
              _id: e.currentTarget.dataset.id
            }
          }).then(res => {
            if (res.result.success) {
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              })
              //重新加载
              that.loadItems()
            }
            else {
              wx.showToast({
                title: '删除失败',
                icon: 'error'
              })
            }
          })
        }
      }
    })

  },
  successRealizedItem(e) {
    let that=this
    wx.showModal({
      title: '提示',
      content: '确认设置为成功认领？',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'changeItemState',
            data: {
              _id: e.currentTarget.dataset.id
            }
          }).then(res => {
            if (res.result.success) {
              wx.showToast({
                title: '已修改成功认领',
                icon: 'success'
              })
              //重新加载
              that.loadItems()
            }
            else {
              wx.showToast({
                title: '修改失败',
                icon: 'error'
              })
            }
          })
        }
      }
    })

  },
  unsuccessRealizedItem(e) {
    let that=this
    wx.showModal({
      title: '提示',
      content: '确认设置为未成功认领？',
      success(res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'changeItemState',
            data: {
              _id: e.currentTarget.dataset.id
            }
          }).then(res => {
            if (res.result.success) {
              wx.showToast({
                title: '已修改未成功认领',
                icon: 'success'
              })
              //重新加载
              that.loadItems()
            }
            else {
              wx.showToast({
                title: '修改失败',
                icon: 'error'
              })
            }
          })
        }
      }
    })

  },
  /**
   * 查询用户发布的物品
   */
  loadItems() {
    wx.showLoading({
      title: '获取物品中',
    })
    wx.cloud.callFunction({
      name: 'selectItem',
      data: {
        state: this.data.TabCur,
        type: 'selectItemByOpenid'
      }
    }).then(res => {
      if (res.result.success) {
        switch (this.data.TabCur) {
          case 0:
            this.setData({ unrealizedItems: res.result.items })
            break;
          case 1:
            this.setData({ realizedItems: res.result.items })
            break;
          case 2:
            this.setData({ successRealizedItems: res.result.items })
            break;
        }
        wx.hideLoading()
      }
      else {
        wx.showToast({
          title: '获取失败',
          icon: 'error'
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.loadItems()
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