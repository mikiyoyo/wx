
var app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: [],
    hiddenmodalput: true,
    hiddendelete: true,
    actid: "",
    aname: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var userid = wx.getStorageSync('openid'); //用户id
    wx.request({
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      url: app.urlData.kaoqinlist,
      data: {
        userid: userid
      },
      success: function(res) {
        console.log(res);
        that.setData({
          activity: res.data
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '获取信息失败',
          icon: 'none'
        })
      },
       complete: function(res) {
        wx.showLoading({
          title: '加载中',
        })
        setTimeout(function() {
          wx.hideLoading()
        }, 1000)
        if (res.data == '') {
          wx.showToast({
            title: '请先创建活动',
            icon: 'none'
          })
        }
      } 
    })
  },
  chooseact: function(e) {
    this.setData({
      actid: e.currentTarget.dataset.id,
      aname: e.currentTarget.dataset.aname
    })
    this.setData({
      hiddenmodalput: false
    })
  },
  //取消按钮
  cancel: function() {
    this.setData({
      hiddenmodalput: true,
    });
  },
  /** 查看历史考勤*/
  confirm: function() {
    //console.log(this.data.actid)
    wx.setStorageSync('actid', this.data.actid);
     wx.navigateTo({
      url: '../kaoqinteam/kaoqinteam'
    }) 
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      hiddenmodalput: true,
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})