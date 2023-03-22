// pages/register/register.js
const app = getApp()
Page({
  data: {
    userInfo: {
      avatarUrl: '',
      nickName: ''
    },

  },
  onChooseAvatar(e) {
    this.setData({
      ["userInfo.avatarUrl"]: e.detail.avatarUrl
    })
  },
  getNickName(e) {
    this.setData({
      ["userInfo.nickName"]: e.detail.value
    })
  },
  register() {
    const userInfo = this.data.userInfo
    var that  =this
    if (!userInfo.avatarUrl) {
      return wx.showToast({  // 调用提示框API显示提示内容
        title: '请选择头像',   // 提示框中的文字内容
        icon: 'none'  // 提示框的图标，none表示没有图标
      })
    }
    if (!userInfo.nickName) {
      return wx.showToast({  // 调用提示框API显示提示内容
        title: '请输入昵称',   // 提示框中的文字内容
        icon: 'none'  // 提示框的图标，none表示没有图标
      })
    }
    wx.cloud.database().collection('user')
    .where({
       _openid: app.globalData.openid
    }).get()
    .then(res=>{
      if(res.data.length == 0){
        that.addUser()
      }else{
        that.changeMessage()
      }
      
      /*wx.switchTab({
        url: '/pages/my/my',
        success: function (res) {
          var page = getCurrentPages().pop();
          if (page == undefined || page == null) return;
          console.log(page)
          page.onShow();
          page.onLoad();
        },
      })*/
     

    }).catch(err=>{
      console.log("操作失败")
    })
  },
  //注册页面
  addUser(){
    const userInfo = this.data.userInfo
    wx.cloud.database().collection('user')
    .add({
      data: {
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName,
        collect: []
      }
    })
    .then(res => {
      wx.showToast({  // 调用提示框API显示提示内容
        title: '注册成功',   // 提示框中的文字内容
        icon: 'none'  // 提示框的图标，none表示没有图标
      })
      app.globalData.userInfo = userInfo

      var pages = getCurrentPages();
      var prePage = pages[pages.length - 2];
      prePage.onLoad();
      wx.navigateBack({
        delta: 1
      })
    })
    .catch(err => {
      console.error(err)
      wx.showToast({            // 注册失败时，显示提示框提示用户
        title: '注册失败',  // 提示框中的文字内容
        icon: 'none'            // 提示框的图标，none表示没有图标
      })
    })
  },
  //修改用户信息
  changeMessage(){
    const userInfo = this.data.userInfo
    var that = this
    wx.cloud.database().collection('user')
    //.doc(app.globalData.id)
    .where({
      _openid : app.globalData.openid
    })
    .update({
      data:{
        avatarUrl: userInfo.avatarUrl,
        nickName: userInfo.nickName
      }
    }).then(res =>{
      console.log("修改头像id成功")
      app.globalData.userInfo = userInfo

      var pages = getCurrentPages();
      var prePage = pages[pages.length - 2];
      prePage.onLoad();
      wx.navigateBack({
        delta: 1
      })
    }).catch(err =>{
      console.log("修改头像id失败")
    })
  },
  /*加载时尝试登录*/ 
  //废弃的第一个登录代码
  /*register2(){
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
          wx.redirectTo({
            url: '/pages/my/my',
          })
        })
      }
    })
  },*/
  onLoad(options){
  }
})