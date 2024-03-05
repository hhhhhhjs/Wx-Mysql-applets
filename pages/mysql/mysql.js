// pages/mysql/mysql.js
Page({
  onLoad() {
    const configStr = wx.getStorageSync('mysqlinfo')
    const config = JSON.parse(configStr)
    this.setData({
      'formData.dbname': config.dbname,
      'formData.dbip': config.dbip,
      'formData.dbport': config.dbport,
      'formData.username': config.username,
      'formData.password': config.password
    })
  },
  data: {
    formData: {
      dbname: '',
      dbip: '',
      dbport: '',
      username: '',
      password: ''
    },
    agree: false,
  },
  formInputChange(event) {
    const inputType = event.currentTarget.dataset.key
    this.setData({
      [`formData.${inputType}`]: event.detail.value
    })
  },
  bindAgreeChange(e) {
    const agree = e.detail.value.length > 0
    this.setData({
      agree: agree
    })
  },
  requestMysql() {
    // TODO1: 校验agree 
    if (!this.data.agree) {
      wx.showToast({
        title: '请先同意声明',
        icon: 'error'
      })
      return;
    }
    // TODO2: 请求后端接口，完成账号申请
    wx.request({
      url: 'http://10.3.9.27:3000/mysql/info',
      success: (data) => {
        console.log(data.data.data)
        const result = data.data.data
        wx.setStorageSync('mysqlinfo', JSON.stringify(data.data.data))
        this.setData({
          'formData.dbname': result.dbname,
          'formData.dbip': result.dbip,
          'formData.dbport': result.dbport,
          'formData.username': result.username,
          'formData.password': result.password
        })
      }
    })
  },
  copyConfig() {
    wx.setClipboardData({
      data: JSON.stringify(this.data.formData),
    })
  }
})