
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_name:'',

  },

  bindKeyinput(e){
    this.setData({
      activity_name:e.detail.value
    })
  },
  search:function(){
    const that = this
    wx.request({
      url: app.urlData.findact,
      data: {
        activity_name:that.data.activity_name
      },
      header: {'content-type':'application/x-www-form-urlencoded'},
      method: 'POST',
      success: (res)=>{
        //console.log(res.data)
        console.log(that.data.activity_name)
        if(res.data.search('fail')==0)
        {
          wx.showModal({
            title: '请输入正确活动id',
            content: '',
            showCancel: false,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
          });
        }
        else if(res.data.search('wrong')==0)
        {

          wx.showModal({
            title: '服务器故障',
            content: '',
            showCancel: false,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
          });
        }
        else
        {
          
          wx.setStorageSync('actid', that.data.activity_name);
/*           wx.getStorageInfo({
            success(res) {
              console.log(res.keys)
              console.log(res.currentSize)
              console.log(res.limitSize)
            }
          }) */
          wx.navigateTo({
            url: '../daka/daka',
          })
          

        }
      },

      fail: (err)=>{
        console.log(err)
        wx.showModal({
          title: '检索失败',
          content: '',
          showCancel: false,
          cancelText: '取消',
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#3CC51F',
        });
      },
      complete: ()=>{}
    });

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