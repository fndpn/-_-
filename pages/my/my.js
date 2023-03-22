// pages/my/my.js
var app = getApp()
Page({
  //跳转到收藏页
  goToMyOrder(){
    wx.navigateTo({
      url: '/pages/myOrder/myOrder',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    global_name: null,
    global_ishidden: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

   /*第一次设计的登录代码，后来发现接口不能用了
    wx.getUserProfile({
      desc: '登陆后可以使用收藏功能',
      success(res){
        that.setData({
          userInfo: res.userInfo
        })
        app.globalData.userInfo = res.userInfo
        console.log("userInfo",that.data.userInfo)
        wx.cloud.database().collection('user').add({
          data: {
            avatarUrl: res.userInfo.avatarUrl,
            nickName: res.userInfo.nickName
          },
          success(res){
            console.log(res)
          }
        })
      }
    })*/
  logout(){
    this.setData({
      userInfo: null
    })
    app.globalData.userInfo = null
  },
  login(){
    var that = this
    wx.cloud.callFunction({
      name:'getOpenid',
      success(res){
        app.globalData.openid = res.result.openid
        //查找数据库里是否有该用户openid
        wx.cloud.database().collection('user')
        .where({
          _openid: app.globalData.openid
        }).get()//跳转页面
        .then(res =>{
          console.log("res",res)
          app.globalData.userInfo = res.data[0]
          if(res.data.length == 0){
            wx.navigateTo({
              url: '/pages/register/register',
            })
          }
          that.onLoad()
        }).catch(err =>{
          console.log("登录失败")
        })
      }
    })
  },
  changeMessage(){
    wx.navigateTo({
      url: '/pages/register/register',
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
    this.setData({
      userInfo: app.globalData.userInfo,
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