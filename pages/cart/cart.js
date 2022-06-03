// pages/cart/cart.js
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    CartList:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0,
    iSoperation:false,
    longPressId:null
  },
  // 商品勾选功能
  handleChange(e){
    // 获取当前点击商品
    const goods_id = e.currentTarget.dataset.id
    // 获取购物车数组
    let {CartList} = this.data
    // 查找点击的商品
    let index = CartList.findIndex(item => item.id === goods_id)
    // 修改状态
    CartList[index].checked = !CartList[index].checked
    this.setData({
       CartList
    })
    wx.setStorageSync('cart', CartList)
    this.setCart()
    this.isFullCheck()
  },
  // 商品全选功能
  handleAllChange(e){
    // 获取购物车数组
    let {CartList,allChecked} = this.data
    allChecked = !allChecked
    CartList.forEach(item => item.checked = allChecked)
    this.setData({
      CartList,
      allChecked
   })
   wx.setStorageSync('cart', CartList)
   this.setCart()
  },
  // 全选状态
  isFullCheck(){
    let {CartList,allChecked} = this.data
    if(CartList.length === 0) return false
    let iSallChecked = CartList.find(item => !item.checked)
    // iSallChecked===true?allChecked=allChecked:allChecked=!allChecked
    if(iSallChecked){
      allChecked=false
    }else{
      allChecked=true
    }
    this.setData({
      allChecked
    })
  },
  // 合计，数量功能
  setCart(){
    let totalPrice = 0
    let totalNum = 0
    let {CartList} = this.data
    CartList.forEach(item => {
      if(item.checked){
        totalPrice += item.count * item.price
        totalNum += item.count
      }
    })
    this.setData({
      CartList,
      totalPrice: totalPrice.toFixed(2) ,
      totalNum
    })
  },
  // 数量减少功能
  reduceClick(e){
    console.log(e.currentTarget.dataset.id);
    const goods_id = e.currentTarget.dataset.id
    let {CartList} = this.data
    const findResult = CartList.find(item => item.id === goods_id)
    if(findResult){
      findResult.count !== 1 ? findResult.count-- : findResult.count = 1
    }
    this.setData({
      CartList
    })
    wx.setStorageSync('cart', CartList)
    this.setCart()
  },
  // 数量增加功能
  addClick(e){
    console.log(e.currentTarget.dataset.id);
    const goods_id = e.currentTarget.dataset.id
    let {CartList} = this.data
    const findResult = CartList.find(item => item.id === goods_id)
    if(findResult){
      findResult.count !== 100 ? findResult.count++ : findResult.count = 100
    }
    this.setData({
      CartList
    })
    wx.setStorageSync('cart', CartList)
    this.setCart()
  },
  // 功能显示
  longPressCart(e){
    this.setData({
      iSoperation:true,
      longPressId:e.currentTarget.dataset.id
    })
  },
  // 删除购物车商品功能
  deleteClick(){
    let {CartList,longPressId} = this.data
    const index = CartList.findIndex(item => item.id === longPressId)
    CartList.splice(index,1)
    this.setData({
      CartList,
      iSoperation:false
    })
    wx.setStorageSync('cart', CartList)
    this.setCart()
    this.isFullCheck()
  },
  // 删除功能隐藏
  showOperation(){
    this.setData({
      iSoperation:false
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
    const cart = wx.getStorageSync('cart') || []
    console.log(cart);
    this.setData({
      CartList:cart
    })
    this.setCart()
    this.isFullCheck()
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