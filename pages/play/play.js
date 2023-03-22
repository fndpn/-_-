// pages/play/play.js
var app = getApp()
var isplay = app.globalData.isplay
Page({ 
  //判断按钮的显示
  isshow(){
    if(isplay){//如果isHidden为1，则显示的是暂停按钮。为0是播放
      this.musicPause()
    }else{
      this.musicPlay()
    }
    //取反，用来显示隐藏按钮
    this.setData({
      isplay: !isplay
    })
    isplay = !isplay
  },
  //以下两个都是api
  musicPlay(){
    app.globalData.innerAudioContext.play()
  },
  musicPause(){
    app.globalData.innerAudioContext.pause()
  },
  musicStop(){
    app.globalData.innerAudioContext.stop()
    this.setData({//停止音乐后回到暂停状态，按播放按钮可以播放音乐
      isplay: false
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    musicidx: 0,        //传进来的音乐下标
    musicarray: 0,        //数据数组，数组可以让切歌不需要再次请求
    arrayidx: 0,         //数组下标，目前没用       
    arraylength: 0,      //长度，切歌用来检测是否越界
    isHidden: true, //isHidden为1，则显示的是暂停按钮。为0是播放
    iscollect: false,//为0代表没有收藏，为1代表已经收藏
    end: "0:0",
    currentTime: "0:0"
  },
  //请求数据库音乐
  getNewMusic:function(){
    let that = this
    const _ = wx.cloud.database().command
    
    wx.cloud.database().collection('music')
    .where({
      idx: this.data.musicidx
    }).get()
    .then(res =>{
      this.setData({
        musicarray: res.data,
        arraylength: res.data.length
      })
      app.globalData.innerAudioContext.autoplay = true
      app.globalData.innerAudioContext.loop = true
      app.globalData.innerAudioContext.src = res.data[0].link//因为把音频初始化单独放在另外一个函数里data资源来不及更新，所以我把音频初始化放到这里了
     // app.globalData.innerAudioContext.stop()
      app.globalData.innerAudioContext.play() // 播放
      setInterval(()=>{
        this.setData({ 
         // currentTime: app.globalData.innerAudioContext.currentTime 
        currentTime: parseInt(app.globalData.innerAudioContext.currentTime/60) + ":" + parseInt(app.globalData.innerAudioContext.currentTime%60)
        })
      /*  this.data.currentTime = this.data.currentTime/60 + ":" + this.data.currentTime%60 */
      },500)
    }).catch(err =>{
      console.log(err)
    })
  },
  //检查是否收藏当前歌曲
  checkCollect(){
    const _ = wx.cloud.database().command
    var that = this

    wx.cloud.database().collection('user')
    .where({
      collectid: _.elemMatch(_.eq(that.data.musicidx))
    }).get().then(res=>{
      if(0 < res.data.length){//如果查到数据，则显示已经收藏该歌
        this.setData({
          iscollect: true
        })
      }
    }).catch(err=>{
      console.log("获取收藏信息失败".err)
    })
  },

  //添加收藏
  setcollect:function(e){
    const index = e.currentTarget.dataset.index
    const _ = wx.cloud.database().command
    var that = this

    wx.cloud.database().collection('user')
    .where({
      _openid: app.globalData.openid
    }).update({
      data:{
        collectid: _.push(index[0]),
        collect: _.push(index[1])
      }
    }).then(res=>{
      console.log("添加收藏成功")
      wx.showToast({            // 注册失败时，显示提示框提示用户
        title: '收藏成功',  // 提示框中的文字内容
        icon: 'none'            // 提示框的图标，none表示没有图标
      })
    })
    .catch(err=>{console.log("添加收藏失败")})

    this.setData({//显示取消收藏按钮
      iscollect: !this.data.iscollect
    })
  },
  //取消收藏
  cancelcollect:function(e){
    const index = e.currentTarget.dataset.index
    const _ = wx.cloud.database().command
    var that = this

    wx.cloud.database().collection('user')
    .where({
      _openid: app.globalData.openid
    }).update({
      data:{
        collectid: _.pull(index[0]),
        collect: _.pull(index[1])
      }
    }).then(res=>{
      console.log("取消收藏成功")
      wx.showToast({            // 注册失败时，显示提示框提示用户
        title: '取消收藏',  // 提示框中的文字内容
        icon: 'none'            // 提示框的图标，none表示没有图标
      })
    })
    .catch(err=>{console.log("取消收藏失败")})

    this.setData({//显示收藏按钮
      iscollect: !this.data.iscollect
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel()
    isplay = true //进入页面自动播放
    this.setData({
      isplay: true
    })
    eventChannel.on('acceptDataFromOpenerPage',data=>{
      this.setData({
        musicidx:data.data
      })
      this.getNewMusic()
      this.checkCollect()
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
    app.globalData.global_name = this.data.musicarray[0].name
    app.globalData.isplay = isplay
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