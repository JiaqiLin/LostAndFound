
// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar, //头顶导航的宽度
    items: [],  //物品列表
    searchKey: '',  //查询关键字
    date: ''  //拾取日期
  },
  /**
   * 选择拾取日期
   * @param {*} e 
   */
  TimeChange: function (e) {
    this.setData({
      date: e.detail.value,
      searchKey: ''
    })
    wx.showLoading({
      title: '获取失物信息中',
    })
    //通过日期检索失物
    wx.cloud.callFunction({
      name: 'selectItem',
      data: {
        type: 'selectItemByDate',
        date: this.data.date
      }
    }).then(res => {
      if (res.result.success) {
        this.setData({
          items: res.result.items
        })
        wx.hideLoading()
        //没检索到
        if (res.result.items.length === 0) {
          wx.showToast({
            title: '暂无结果',
            icon: 'none'
          })
        }
      }
      else {
        wx.showToast({
          title: '获取失败',
          icon: 'error'
        })
      }
    }).catch(error => { console.log(error) })
  },
  /**
   * 点击物品跳转
   * @param {*} e 
   */
  checkItemDetail: function (e) {
    wx.navigateTo({
      url: `/pages/home/itemDetail/itemDetail?id=${e.currentTarget.dataset.id}`,
    })
  },
  /**
   * 关键字查询物品
   * @param {*} e 
   */
  searchItem(e) {
    this.setData({
      searchKey: e.detail.value.searchKey,
      date: ''
    })
    this.loadItems()
  },
  /**
   * 加载物品
   */
  loadItems() {
    wx.showLoading({
      title: '获取失物信息中',
    })
    wx.cloud.callFunction({
      name: 'selectItem',
      data: {
        type: 'selectItemBySearchKey',
        searchKey: this.data.searchKey
      }
    }).then(res => {
      if (res.result.success) {
        this.setData({
          items: res.result.items
        })
        wx.hideLoading()
        //未查询到
        if (res.result.items.length === 0) {
          wx.showToast({
            title: '暂无结果',
            icon: 'none'
          })
        }
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
    this.loadItems()
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