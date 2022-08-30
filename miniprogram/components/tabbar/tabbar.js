// components/tabbar/tabber.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    PageCur: String  //传递的导航页名称
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 切换导航页
     * @param {*} e 
     */
    NavChange(e) {
      let newUrl='' //跳转页的url
      switch (e.currentTarget.dataset.cur) {   
        case 'home':
          newUrl = '/pages/home/home/home'
          break;
        case 'releaseItem':
          newUrl = '/pages/releaseItem/releaseItem'
          break;
        case 'individualCenter':
          newUrl = '/pages/individualCenter/home/home'
          break;
      }
      //跳转
      wx.redirectTo({
        url: newUrl
      })
    },
  }
})
