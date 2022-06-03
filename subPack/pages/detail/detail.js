// subPack/pages/detail/detail.js
const httpUtils = require('../../../request/index')
import {Gooods,Shop} from '../../../request/detailpack'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    topImages:[],
    topImagesLength:0,
    topImagescurrent:1,
    goods:{},
    shop:{},
    detailInfo:{},
    itemParams:{},
    commeninfo:{},
    commeninfocRate:0,
    recommends:[],
    theneTopYs:[],
    skuInfo:{},
    skusList:[],
    BackTop:0,
    navbarTop:0,
    show:false,
    skusShow:false,
    iSsizeKey:"S",
    iSstyleKey:''
  },
  bindchange(e){
    this.setData({
      topImagescurrent:e.detail.current + 1
    })
  },
  // 返回
  goBack(){
    wx.navigateBack({
      delta: 1,
    })
  },
  // 加入购物车点击事件
  buttonClick(e){
    // 获取购物车需要展示的信息
    let product = {}
    product.imges = this.data.topImages[0]
    product.id = this.data.id
    product.title = this.data.goods.title
    product.price = this.data.goods.realPrice
    product.desc = this.data.goods.desc
    product.checked = false
    product.shopName = this.data.shop.name

    // 获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart") || []
    // 判断商品是否存在购物车中
    let index = cart.findIndex(v => v.id === product.id)
    if(index === -1){
      // 不存在数量为 1
      product.count = 1
      cart.push(product)
    }else{
      // 存在数量加 1
      cart[index].count ++
    }
    console.log(cart);
    // 将购物车数组重新缓存
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入购物车等待',
      icon:'success',
      mask:true
    })
  },
  // 参数模块点击事件
  dialogClick(){
    this.setData({
      show:true
    })
  },
  // 选择模块点击事件
  skusClick(){
    this.setData({
      skusShow:true
    })
  },
  // diaolog 完成按钮点击事件
  dialogButton(){
    this.setData({
      show:false,
      skusShow:false
    })
  },
  // 选择参数的数据去重
  skusque(){
    let arr = this.data.skuInfo.skus
    let newobj = {}
    arr = arr.reduce((preVal,curVal) => {
      newobj[curVal.styleId] ? '' :newobj[curVal.styleId] = preVal.push(curVal)
      return preVal
    }, [])
    this.setData({
      skusList:arr
    })
  },
  // 参数
  sizeKeyClick(e){
    this.setData({
      iSsizeKey:e.target.dataset.name
    })
  },
  // 选择
  styleKeyClick(e){
    this.setData({
      iSstyleKey:e.target.dataset.name
    })
  },
  scrollToTop(e){
    // console.log(e.detail.scrollTop);
    this.setData({
      BackTop:e.detail.scrollTop,
      navbarTop:e.detail.scrollTop
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id:options.id
    })
    let obj = {
      url:"/detail",
      data:{
        iid:options.id
      }
    }
    httpUtils.request(obj).then(res => {
      console.log(res);
      let data = res.result
      this.setData({
        // 轮播图
        topImages:data.itemInfo.topImages,
        topImagesLength:data.itemInfo.topImages.length,
        // 商品信息
        goods:new Gooods(data.itemInfo,data.columns,data.shopInfo.services),
        // 店铺信息
        shop:new Shop(data.shopInfo),
        // 商品图片信息
        detailInfo:data.detailInfo,
        // 商品参数信息
        itemParams:data.itemParams,
        // 尺码、颜色、分类
        skuInfo:data.skuInfo
      })
      this.skusque()
      if (data.rate.cRate){
        this.setData({
          // 评论信息
          commeninfo:data.rate.list[0],
          commeninfocRate:data.rate.cRate
        })
      }
    })

    // 获取推荐数据
    let recommend = {
      url:"/recommend"
    }
    httpUtils.request(recommend).then(res => {
      // console.log(res);
      this.setData({
        recommends:res.data.list
      })
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

  },
  // 监听滚动位置
  onPageScroll(){
  }
})