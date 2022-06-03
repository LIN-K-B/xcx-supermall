// components/categoryLeft/categoryLeft.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories:{
      type:Array
    },
    categoryDetailRight:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftKey:0,
    categorieIndex:0,
    miniWallkey:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabClick(e){
      // console.log(e.target.dataset.miniwallkey);
      this.setData({
        leftKey:e.target.dataset.key,
        categorieIndex:e.target.dataset.index,
        miniWallkey:e.target.dataset.miniwallkey
      })
      this.triggerEvent("updataSelect",
      {
        maitKey:this.data.leftKey,
        categorieIndex:this.data.categorieIndex,
        miniWallkey:this.data.miniWallkey
      })
    }
  }
})
