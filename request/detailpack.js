// 商品信息
export class Gooods{
  constructor(itemInfo,colums,serveices){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.discountDesc = itemInfo.discountDesc
    this.realPrice = itemInfo.lowNowPrice
    this.oldPrice = itemInfo.oldPrice
    this.colums = colums
    this.serveices = serveices
  }
}

// 店铺信息
export class Shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.goodsCount = shopInfo.cGoods
    this.score = shopInfo.score
  }
}
