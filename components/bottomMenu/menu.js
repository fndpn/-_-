
// components/bottomMenu/menu.js
var isplay = getApp().globalData.isplay
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name:{
      type: String,
      value: "パンデモニックプラネット -Jazz Funk-"
    },
    ishidden:{
      type: Boolean,
      value: getApp().globalData.isplay
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
   // ishidden: getApp().globalData.isplay
  },

  /**
   * 组件的方法列表
   */
  pageLifetimes:{
    hide:function(){
      //用变量isplay来接收 getApp().globalData.isplay 的结果在组件中无法赋值，我花了整整一天的时间才排查出这玩意。小学到高中所教授的语文教育总是想让我学会从已经发生的事中找出一些什么，在我全面客观的观察了解这坨特性后我从里面找出启示是这些东西有个屁用。这个项目不仅能让我跌到js的特色特性里，更能让我肆意踩踏便宜vue组件的喀斯特地貌，显然把基建打在溶洞上面容易有安全隐患，所以暂缓开发播放列表和滑动切歌
      getApp().globalData.isplay = this.properties.ishidden
      this.setData({})
    }
  },

  methods: {
    isshow(){
      const app = getApp()
      if(!this.properties.ishidden){
        app.globalData.innerAudioContext.play()
      }else{
        app.globalData.innerAudioContext.pause()
      }
      this.setData({
        ishidden: !this.properties.ishidden
      })
      isplay = this.properties.ishidden
    //  isplay=!isplay//给我整无语了
    }
  },
  
  observers:{
   /* 'ishidden': function(ishidden){
      isplay = this.properties.ishidden
      this.setData({})
    }*/
  }
})
