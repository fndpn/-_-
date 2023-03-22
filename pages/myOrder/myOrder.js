// pages/myOrder/myOrder.js
var app = getApp()
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
    collect: null,
    collectid: null
  },
  getCollect(){
    var that = this
    wx.cloud.database().collection('user')
    .where({
      _openid: app.globalData.openid
    }).get().then(res=>{
      this.setData({
        collect: res.data[0].collect,
        collectid: res.data[0].collectid
      })
      console.log("获取收藏成功",res)
    }).catch(err=>{
      console.log("获取收藏失败",err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCollect()
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