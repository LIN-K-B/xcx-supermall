// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },
  getUserInfo(){
    wx.getUserProfile({
      desc: 'desc',
      success:(res =>{
       let user = res.userInfo
       this.setData({
         userInfo:user
        })
        // wx.setStorageSync('user', this.data.userInfo)
      }),
      fail:(err => {
        wx.showToast({
          title: '登录失败',
          icon:"error"
        })
      })
    })
  },
  logout(){
    wx.showModal({
      title:"是否退出登录",
      cancelColor: 'cancelColor',
      success:(res =>{
        if (res.confirm) {
          this.setData({
            userInfo:{}
          })
          // wx.setStorageSync('user', this.data.userInfo)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      })
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
    // let {userInfo} = this.data
    // userInfo = wx.getStorageSync('user') || {}
    // this.setData({
    //   userInfo
    // })
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