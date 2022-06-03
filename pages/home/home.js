// pages/home.js
const httpUtils = require('../../request/index')
const goods = {
  pop:{
    page:1,
    list:[]
  },
  new:{
    page:0,
    list:[]
  },
  sell:{
    page:0,
    list:[]
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:true,
    bannerList:[],
    recommend:[],
    titles:['流行','新款','经典'],
    navIndex:0,
    currentType:'pop',
    showGoods:[],
    isloading:false,
    tabTop:0,
    tabControlTop:1000,
    scrollTop:0,
    isScrollY:false
  },
  itemClick(e){
    console.log(e.currentTarget.dataset.index);
    let i = e.currentTarget.dataset.index
    this.setData({
      navIndex:i,
      scrollTop:this.data.scrollTop === 0? 600:600
    })
    this.tabClick()

  },
  tabClick(){
    switch(this.data.navIndex){
      case 0:
        this.setData({
          currentType: 'pop'
        })
      break
      case 1:
        this.setData({
          currentType:'new'
        })
      break
      case 2:
        this.setData({
          currentType:'sell'
        })
      break
    }
    this.setData({
      showGoods:goods[this.data.currentType].list
    })
  },
  getHomeGoods(type){
    this.setData({
      isloading:true
    })
    const page = goods[this.data.currentType].page +=1
    let obj2 = {
      url:'/home/data',
      data:{
        type:type,
        page:page,
      }
    }
    httpUtils.request(obj2).then(res =>{
      goods[type].list.push(...res.data.list)
      this.setData({
        showGoods:goods['pop'].list
      })
      this.setData({
        isloading:false
      })
    })
  },
  homeScrollTop(e){
  },
  // 上拉触底事件
  homeScrollBottom(){
    wx.showLoading({
      title: '加载中',
    })
    if(!this.data.isloading){
      this.getHomeGoods(this.data.currentType)
    }
    wx.hideLoading()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let obj = {
      url:'/home/multidata'
    }
    httpUtils.request(obj).then(res => {
      // console.log(res);
      this.setData({
        bannerList:res.data.banner.list,
        recommend:res.data.recommend.list,
        loading:false
      })
    })

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

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
    // console.log('onReachBottom');
    // this.getHomeGoods(this.data.currentType)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onPageScroll(){
    var that = this
    wx.createSelectorQuery().select('.tab-control').boundingClientRect(function(rect){
      console.log(rect.top);
      that.setData({
        tabControlTop:rect.top
      })
      if(that.data.tabControlTop === 0){
        that.setData({
          isScrollY:true
        })
      }
    }).exec()
  }
})