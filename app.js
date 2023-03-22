// app.js
const innerAudioContext = wx.createInnerAudioContext({
  useWebAudioImplement: false // 是否使用 WebAudio 作为底层音频驱动，默认关闭。对于短音频、播放频繁的音频建议开启此选项，开启后将获得更优的性能表现。由于开启此选项后也会带来一定的内存增长，因此对于长音频建议关闭此选项
})

App({
  globalData:{
    userInfo: {},
    openid: null,
    id: null,
    hot_singer_count: 5,//热门歌手，在页面展示歌手库前五个
    new_music_count: 15,//最新音乐，在页面展示音乐库里前15个，从0开始递增
    album_count: 6,//推荐专辑展示数量，从零开始展示六个
    hot_music_begin: 100,//热门音乐起始栈
    hot_music_count: 6,//热门音乐栈展示数量，从一百开始递增
    musicid: 0, //数据库音乐主键
    innerAudioContext: innerAudioContext,//api接口
    isplay: false,//是否正在播放，true
    global_name: "パンデモニックプラネット -Jazz Funk-"//用于初始化组件
  },

  onLaunch(){
    wx.cloud.init({
      env:'cloud1-4g4s2gfn468ae874',
      traceUser: true
    })
    //初始化第一首歌
    innerAudioContext.src = "cloud://cloud1-4g4s2gfn468ae874.636c-cloud1-4g4s2gfn468ae874-1314924132/chun/彩音 _xi-on_ - パンデモニックプラネット -Jazz Funk-.mp3"
    
    var that = this
    //查看用户是否有注册，如果有就自动登录
    wx.cloud.callFunction({
      name:'getOpenid',
      success(res){
        that.globalData.openid = res.result.openid
        //查找数据库里是否有该用户openid
        wx.cloud.database().collection('user')
        .where({
          _openid: that.globalData.openid
        }).get({
          success(result){
            that.globalData.userInfo = result.data[0]
            that.globalData.id = result.data[0]._id
          }
        })
      }
    })
  }
})
