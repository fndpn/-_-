// pages/singerDetail/singerDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    singeridx: 0,
    singerMessage: 0
  },
//获得数据库里的指定热门歌手信息
  getHotSinger(){
    const _ = wx.cloud.database().command
    wx.cloud.database().collection('singerMessage')
    .where({
      idx: this.data.singeridx
    }).get()
    .then(res =>{
      console.log(res)
      this.setData({
        singerMessage: res.data
      })
    }).catch(err => {
      console.log("singerMessage获取失败")
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {  
    //传参
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage',data=>{
      console.log(data)
      this.setData({
        singeridx:data.data
      })
      this.getHotSinger()
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