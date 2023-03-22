// pages/find/find.js
Page({
  //跳转页面
  playLink:function(e){
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/play/play',
      success:function(res){
        res.eventChannel.emit('acceptDataFromOpenerPage',{data:index})
      }
    })
  },
  albumLink:function(e){
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/album/album',
      success:function(res){
        res.eventChannel.emit('acceptDataFromOpenerPage',{data:index})
      }
    })
  },

  //获取输入框值
  musicNameInput:function(e){
    this.setData({
      musicname: e.detail.value
    })
  },
  searchMusic(){
    wx.cloud.database().collection('music')
    .where({
      name:{
        $regex: '.*' + this.data.musicname + '.*'
      }
    }).get().then(res=>{
      if(0 == res.data.length){
        wx.showToast({         
          title: '查无歌曲', 
          icon: 'none'          
        })
        return
      }
      if(0 == this.data.musicname.length){
        wx.showToast({         
          title: '搜索栏不能为空', 
          icon: 'none'          
        })
        return
      }
      wx.navigateTo({
        url: '/pages/searchResult/searchResult',
        success:function(result){
          result.eventChannel.emit('acceptDataFromOpenerPage',{data:res.data})
        }
      })
      console.log(res)
    }).catch(err=>{
      console.log("搜索歌曲失败",err)
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    hotmusic: [],
    album: [],
    global_name: null,
    global_ishidden: null,
    musicname: ""
  },
  //获得热门歌曲
  getHotList(){
    var that = this
    var app = getApp()
    const _ = wx.cloud.database().command

    wx.cloud.database().collection('music')
    .where({
      idx: _.gte(app.globalData.hot_music_begin).and(_.lt(app.globalData.hot_music_begin + app.globalData.hot_music_count))
    }).get().then(res=>{
      that.setData({
        hotmusic: res.data
      })
    }).catch(err =>{
      console.log("获取热门歌曲失败")
    })
  },
  //获得推荐专辑
  getAlbum(){
    var that = this
    var app = getApp()
    const _ = wx.cloud.database().command

    wx.cloud.database().collection('album')
    .where({
      idx: _.lt(app.globalData.album_count)
    }).get().then(res=>{
      that.setData({
        album: res.data
      })
      console.log(that.data.album)
    }).catch(err =>{
      console.log("获取热门歌曲失败")
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getHotList()
    this.getAlbum()
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
    this.setData({
      global_name: getApp().globalData.global_name,
      global_ishidden: getApp().globalData.isplay
    })
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