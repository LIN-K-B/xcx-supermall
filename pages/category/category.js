// pages/category/category.js
const httpUtils = require('../../request/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    categoriesNav:['店铺精选','更多分类'],
    categories:[],
    categoryData:{},
    CategoryList:[],
    categorieIndex:0,
    navkey:'店铺精选',
    maitKey:0,
    scrollTop:0,
    miniWallkey:0
  },
  // 导航栏点击事件
  navClick(e){
    this.setData({
      navkey:e.target.dataset.navkey
    })
  },
 // 左侧栏点击事件
 tabClick(e){
    // console.log(e);
    this.setData({
      maitKey: e.detail.maitKey,
      categorieIndex:e.detail.categorieIndex,
      miniWallkey:e.detail.miniWallkey
    })
    if (this.data.navkey === '店铺精选') {
      this.getCategoryDetail()
    }
    if (this.data.navkey === '更多分类') {
      this.getSubcategory()
    }
    this.setData({
      scrollTop:this.data.scrollTop === 0 ? 1 : 0
    })
  },
  // 获取每个分类栏的数据
  getSubcategory(){
    let subcategoryObj = {
      url:"/subcategory",
      data:{
        maitKey:this.data.maitKey
      }
    }
    httpUtils.request(subcategoryObj).then(res=>{
      // console.log(res);
      let data = res.data
      this.setData({
        categoryData:data
      })
    })
  },
  // 获取店铺精选数据
  getCategoryDetail(){
    let obj = {
      url: '/subcategory/detail',
      data:{
        miniWallkey:this.data.miniWallkey
      }
    }
    httpUtils.request(obj).then(res=>{
      // console.log(res);
      this.setData({
        CategoryList:res
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let cateObj = {
      url:"/category"
    }
    httpUtils.request(cateObj).then(res=>{
      // console.log(res);
      let data = res.data
      this.setData({
        categories:data.category.list,
        maitKey:data.category.list[0].maitKey,
        miniWallkey:data.category.list[0].miniWallkey
      })
        this.getCategoryDetail()
        this.getSubcategory()
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