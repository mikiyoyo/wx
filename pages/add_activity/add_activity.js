// pages/add_activity/add_activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity:"",
    personname:""
  },

  formbtu:function(e){

      this.setData({
        activity:e.detail.value.activity,
        personname:e.detail.value.personname
      })
      
      if(this.data.personname&&this.data.activity!="")
    {
      wx.setStorageSync('activity', this.data.activity)
      wx.setStorageSync('personname', this.data.personname)
/*       wx.getStorageInfo({
        success(res) {
          console.log(res.keys)
          console.log(res.currentSize)
          console.log(res.limitSize)
        }
      }) */
      wx.navigateTo({
      url: '../clocation/clocation',
    })
  }
  else
  {
    wx.showToast({
      title: '输入完整信息',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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