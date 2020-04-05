//app.js
App({
  urlData:{
    checkman:'https://www.jakechanfzy.online/wxface/checkman.php',
    sign: 'https://www.jakechanfzy.online/wxface/sign.php',
    signface:'https://www.jakechanfzy.online/signface.php',
    searchface:'https://www.jakechanfzy.online/searchface.php',
    kaoqinlist:'https://www.jakechanfzy.online/wxface/kaoqinlist.php',
    findact:'https://www.jakechanfzy.online/wxface/findact.php',
    add_info:'https://www.jakechanfzy.online/wxface/add_info.php',
    showlist:'https://www.jakechanfzy.online/wxface/showlist.php',
    findlocation:'https://www.jakechanfzy.online/wxface/findlocation.php'

  },
  globalData: {
    userInfo: null
  },
  workerData:{
    hasface:'',
  },
  //负责人信息
  fuzeData:{
    locations:'',
    locationAddresses:'',
    hasLocation: false,
  },

  onLaunch: function () {
    // 展示本地存储能力


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //console.log(res.code)
        wx.request({
          url: 'https://www.jakechanfzy.online/wxface/getopenid.php',
          data: {
            code:res.code
          },
          header: {'content-type':'application/json'},
          method: 'GET',
          success: (res)=>{
            var data = res.data
            var obj = JSON.parse(data)
            var openid = obj.openid
            //console.log(openid)
            wx.setStorageSync('openid', openid);
          },
          fail: ()=>{},
          complete: ()=>{}
        });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

})