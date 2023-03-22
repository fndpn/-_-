// pages/album/album.js
Page({
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
    albumidx: null,
    img: null,
    array: null,
    arrayid: null,
    name: null,
    author: null,
    data: null
  },

  getAlbum(){
    var that = this
    wx.cloud.database().collection('album')
    .where({
      idx: that.data.albumidx
    }).get().then(res=>{
      that.setData({
        img: res.data[0].image,
        array: res.data[0].musiclist,
        arrayid: res.data[0].musiclist_id,
        name: res.data[0].name,
        author: res.data[0].author,
        data: res.data[0].data
      })
    }).catch(err=>{
      console.log("获取专辑失败",err)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel()
    
    eventChannel.on('acceptDataFromOpenerPage',data=>{
      this.setData({
        albumidx: data.data
      })
      this.getAlbum()
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