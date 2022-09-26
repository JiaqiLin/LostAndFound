// pages/individualCenter/uploadExcel.js
let that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileName: '暂未选择',  //上传的文件名
    fileID:''    //上传到云存储后的fileID
  },
  /**
   * 上传excel
   */
  uploadExcel() {
    //选择文件
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: res => {
        let path = res.tempFiles[0].path;
        that.setData({
          fileName: res.tempFiles[0].name
        })
        wx.showLoading({
          title: '上传中',
          mask: true
        })
        //上传到云存储
        wx.cloud.uploadFile({
          cloudPath: 'test' + new Date().getTime() + '.xls',
          filePath: path,
          success: res => {
            wx.hideLoading()
            wx.showToast({
              title: '上传成功'
            })
            //设置fileID
            that.setData({
              fileID: res.fileID
            })
          },
          fail: err => {
            wx.hideLoading()
            console.error(err)
            // app.errorHandle.showModal(err.errMsg)
          }
        })
      }
    })
  },
  /**
   * 读取excel
   */
  readExcel() {
    wx.cloud.callFunction({
      name: 'excel',
      data: {
        fileID: that.data.fileID
      },
      success: res => {
        wx.hideLoading()
        if (res.result.success) {
          // 读取成功
          wx.showToast({
            title: '读取成功'
          })
        }
        else {
          // 读取失败
          // app.errorHandle.showModal(res.result.errMsg)
          wx.showToast({
            title: res.result.errMsg
          })
        }
      },
      fail: err => {
        wx.hideLoading()
        console.error(err)
        // app.errorHandle.showModal(err.errMsg)
      }
    })
  },
  // uploadExcel(path){
  //   wx.showLoading({
  //     title: '提交中',
  //     mask: true
  //   })
  //   wx.cloud.uploadFile({
  //     cloudPath:'test'+new Date().getTime()+'.xls',
  //     filePath:path,
  //     success:res=>{
  //       wx.cloud.callFunction({
  //         name:'excel',
  //         data:{
  //           fileID:res.fileID
  //         },
  //         success:res=>{
  //           wx.hideLoading()
  //           if(res.result.success){
  //           // 上传成功
  //           wx.showToast({
  //             title: '上传成功'
  //           })
  //           }
  //           else{
  //             // app.errorHandle.showModal(res.result.errMsg)
  //           // 上传成功
  //           wx.showToast({
  //             title: res.result.errMsg
  //           })
  //           }
  //         },
  //         fail: err => {
  //           wx.hideLoading()
  //           console.error(err)
  //           // app.errorHandle.showModal(err.errMsg)
  //         }
  //       })
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    that = this
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