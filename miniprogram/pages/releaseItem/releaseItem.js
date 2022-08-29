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
  releaseItem: function (e) {
    //获取用户输入信息
    const item = {
      itemName: e.detail.value.itemName,
      address: e.detail.value.address,
      date: e.detail.value.date,
      time: e.detail.value.time,
      description: e.detail.value.description,
      images: []
    }
    //检查用户填写信息完整性
    if (item.itemName === '' || item.address === '') {
      wx.showToast({
        title: '请填写完整信息',
        icon: "none"
      })
      return;
    }
    //检查用户是否上传至少一张图片
    if (this.data.imgList.length === 0) {
      wx.showToast({
        title: '请上传物品图片',
        icon: "none"
      })
      return;
    }
    //检查用户是否填写个人信息
    if (app.globalData.userInfo.contact === '') {
      wx.showModal({
        title: '提示',
        content: '请前往个人中心->个人信息，填写联系方式',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/individualCenter/individualInfo/individualInfo',
            })
          } 
        }

      })
      return
    }
    //加载动画
    wx.showLoading({
      title: '发布中',
    })
    //用于存放每张图片上传返回的Promise
    let tasks = []
    for (const filePath of this.data.imgList) {
      tasks.push(
        wx.cloud.uploadFile({
          cloudPath: this.calculateCloudPath(filePath),
          filePath: filePath
        }))
    }
    //所有图片上传完成，这里有两层嵌套，只有两层就没改成链式
    Promise.all(tasks)
      .then(fileIDs => {
        //保存图片的fileID
        for (const { fileID } of fileIDs) {
          item.images.push(fileID)
        }
        //向数据库插入物品信息
        wx.cloud.callFunction({
          name: "insertItem",
          data: { item: item }
        })
          .then(res => {
            wx.hideLoading()
            //插入成功
            if (res.result.success === true) {
              //输入框清空
              this.setData({
                itemName: '',
                address: '',
                index: null,
                time: '',
                date: '',
                imgList: [],
                description: ''
              })
              //跳转到首页
              wx.redirectTo({
                url: '/pages/home/home/home',
              })
            }
            //插入失败
            else {
              //提示插入失败
              wx.showToast({
                title: '发布失败',
                icon: 'error'
              })
              //删除上传的图片
              wx.cloud.deleteFile({
                fileList: item.images
              })
            }
          })
          .catch(error => {
            console.log(error)
            wx.showToast({
              title: '发布失败',
            })
          })
      })
      .catch(error => {
        console.log(error)
        wx.showToast({
          title: '发布失败',
        })
      })



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