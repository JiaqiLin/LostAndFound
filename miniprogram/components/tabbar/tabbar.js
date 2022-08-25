// components/tabbar/tabber.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    PageCur: String
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
    NavChange(e) {
      let newUrl=''
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
      wx.redirectTo({
        url: newUrl
      })
    },
  }
})
