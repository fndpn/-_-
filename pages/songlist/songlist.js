// pages/songlist/songlist.js
Page({
  //跳转歌手页面
hotlink:function(e){
  //console.log(e.currentTarget.dataset.index)
  const index = e.currentTarget.dataset.index

  wx.navigateTo({
    url: '/pages/singerDetail/singerDetail',
    success:function(res){
      res.eventChannel.emit('acceptDataFromOpenerPage',{data:index})
    }
  })
},
//跳转到播放页面
playLink:function(e){
  const index = e.currentTarget.dataset.index
  wx.navigateTo({
    url: '/pages/play/play',
    success:function(res){
      res.eventChannel.emit('acceptDataFromOpenerPage',{data:index})
    }
  })
},
  /**
   * 页面的初始数据
   */
  data: {
    background:[
    "https://p1.music.126.net/k8ML3lTUDkK-V232rO8Rqg==/109951168114635183.jpg?imageView&quality=89",
    "https://p1.music.126.net/uYF3eLwFyVMMJ1v2h7sV0Q==/109951168114537691.jpg?imageView&quality=89",
    "https://p1.music.126.net/tToxYInyAR6TfOPFFe8Mbw==/109951168114542309.jpg?imageView&quality=89",
    "https://p1.music.126.net/ZunY7Ykhf7X1vvFm7sJjyQ==/109951168114551498.jpg?imageView&quality=89"
    ],
    singermessage: 0,
    newmusic: 0,
    global_name: null,
    global_ishidden: null,
  },
//得到热门歌手信息
  getHotSinger(){
    const _ = wx.cloud.database().command
    var app = getApp()

    wx.cloud.database().collection('singerMessage')
    .where({
      idx: _.lt(app.globalData.hot_singer_count)
    }).get()
    .then(res =>{
      this.setData({
        singermessage: res.data
      })
    }).catch(err => {
      console.log("singerMessage获取失败")
    })
  },
  //得到最新音乐信息
  getMusicBox(){
    const _ = wx.cloud.database().command
    var app = getApp()

    wx.cloud.database().collection('music')
    .where({
      idx: _.lt(app.globalData.new_music_count)
    }).get()
    .then(res =>{
      this.setData({
        newmusic: res.data
      })
    }).catch(err => {
      console.log("newMusic获取失败")
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getHotSinger()
    this.getMusicBox()
   
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
    this.setData()
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