// app.js
App({
  onLaunch() {
  // 用于开发我的页面的测试逻辑
  // 每次应用刷新自动跳转我的
  wx.reLaunch({
    url: 'pages/mime/mime',
  })
  },
  globalData: {
    
  }
})
