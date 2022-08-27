// pages/releaseItem/releaseItem.js
const app = getApp();
var util = require('../../utils/getDateTime.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    itemName: '',
    address: '',
    index: null,
    time: '',
    date: '',
    imgList: [],
    description: '',
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      imgList: this.data.imgList
    })
  },
  releaseItem: async function (e) {
    if (this.data.imgList.length === 0) {
      wx.showToast({
        title: '请上传物品图片',
        icon: "none"
      })
      return;
    }
    const item = {
      itemName: e.detail.value.itemName,
      address: e.detail.value.address,
      date: e.detail.value.date,
      time: e.detail.value.time,
      description: e.detail.value.description,
      images: []
    }
    wx.showLoading({
      title: '发布中',
    })
    let tasks = []
    for (const filePath of this.data.imgList) {
      tasks.push(
        wx.cloud.uploadFile({
          cloudPath: this.calculateCloudPath(filePath),
          filePath: filePath
        }))
    }
    let fileIDs = await Promise.all(tasks)
    for (const { fileID } of fileIDs) {
      item.images.push(fileID)
    }
    let res = await wx.cloud.callFunction({
      name: "insertItem",
      data: { item: item }
    })
    wx.hideLoading()
    if (res.result.success === true) {
      this.setData({
        itemName: '',
        address: '',
        index: null,
        time: '',
        date: '',
        imgList: [],
        description: ''
      })
      wx.redirectTo({
        url: '/pages/home/home/home',
      })
    }
    else {
      wx.showToast({
        title: '发布失败',
        icon: 'error'
      })
      wx.cloud.deleteFile({
        fileList: item.images
      })
    }
  },
  calculateCloudPath(filePath) {
    return `items/${app.globalData.userInfo._openid}/${Date.now()}-${(Math.random() * 1000).toFixed(0)}${filePath.match(/\.[^.]+?$/)[0]}`
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      time: util.formatTime(new Date(Date.now())),
      date: util.formatDate(new Date(Date.now())),
    })
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