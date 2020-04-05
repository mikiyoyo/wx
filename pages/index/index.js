const app =  getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles:'',
    hiddenmodalput: true,
    hidden1: true,
    hidden2: true,
    isRegister: true,//初始设置为true 若未注册改为false
    sname: "",
    snum:"",
    activity: "", 
  
  },

 /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var openid = wx.getStorageSync('openid');
    if(!openid)
    {console.log("no openid");}
    //wx.setStorageSync('openid', openid);
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.urlData.checkman,
      data: { userid: openid },
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if (res.data == null) {
          app.workerData.hasface = 'false'
          that.setData({
            isRegister: false
          })
        }
        else if(res.data === 'face')
        {
          app.workerData.hasface = 'false'
          wx.showModal({
            title: '',
            content: '未进行人脸采集',
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if(result.confirm){
                wx.navigateTo({
                  url: '../tface/tface',
                });  
              }
            },
            fail: (err)=>{
              console.log(err)
            },
          });

        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })




  },


  //点击按钮弹出指定的hiddenmodalput弹出框
  modalinput1: function (e) {
    //console.log(app.workerData.hasface)
    var that = this;
    if (e.detail.userInfo != undefined) {
      if (that.data.isRegister == false) {
        that.setData({
          titles:'补充信息',
          hiddenmodalput: !that.data.hiddenmodalput,
          hidden1: false,
          hidden2: true,
        })
      }
      else if(app.workerData.hasface==='false')
      {

        wx.navigateTo({
          url: '../tface/tface',
        }); 
      } 
      else {
        wx.navigateTo({ url: '../searchact/searchact' })
      }
    }
  },
  modalinput2: function (e) {
    if (e.detail.userInfo != undefined) {
      this.setData({
        titles:'',
        hiddenmodalput: !this.data.hiddenmodalput,
        hidden1: true,
        hidden2: false,
      })
    }
  },

  //选择位置
  addact: function () {
    wx.navigateTo({
      url: '../add_activity/add_activity',
    })
  },

  //进入考勤页面
  gokaoqin: function () {
    wx.navigateTo({ url: '../kaoqinlist/kaoqinlist' })
  },
  
  //取消按钮
  cancel: function () {
    this.setData({
      hiddenmodalput: true,
    });
  },
  //确认
  confirm: function (e) {
    var that = this;
    this.setData({
      hiddenmodalput: true,
    })
    if ((that.data.sname && that.data.snum) != '') {
      this.addData()
    } 
    else {
      wx.showToast({
        title: '输入姓名、学号',
        icon: 'none'
      })
    }
  },

  //获取input的信息
  setname: function (e) {
    this.setData({ sname: e.detail.value })
  },

  setnum: function (e) {
    this.setData({ snum: e.detail.value })
  },


  //发送数据
  addData: function () {
    var that = this;
    var userid = wx.getStorageSync('openid');
    wx.request({
      url: app.urlData.sign,
      data: {
        userid: userid,//微信账户信息
        //打卡人
        sname: that.data.sname,     
        snum: that.data.snum,

      },
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        //console.log(res.data)
        //打卡人添加信息成功
        if (res.data === "success") {

          //跳转到人脸采集页面
          wx.navigateTo({url:'../tface/tface' })
          that.setData({
            isRegister: true,
          }) 
        }
      },
      fail: function (res) {

      },
      complete: function (res) { },
    })
  },

 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      hiddenmodalput: true
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})