// pages/mine/mine.js
Page({
  data: {
    avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
  },
  getUserAva(userInfo) {
    console.log(userInfo.detail.avatarUrl)
    this.setData({
      avatarUrl: userInfo.detail.avatarUrl
    })
  },
  getAuth() {
    const query = wx.createSelectorQuery()
    const btn = query.select('.button')
    // TODO: 触发用户验证
    // btn.click()
    // console.log(btn)
  }
})