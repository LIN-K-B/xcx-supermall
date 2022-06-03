const baseUrl = 'http://152.136.185.210:7878/api/hy66'
function request(obj){
  return new Promise((resolve,reject) =>{
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: baseUrl+obj.url,
      data:obj.data,
      success(res){
        resolve(res.data)
      }
    })
    wx.hideLoading()
  })
}

module.exports = {
  request
}