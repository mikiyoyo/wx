
var QQMapWX = require('../../qqmap-wx-jssdk/qqmap-wx-jssdk.js');
// 实例化API核心类
const wxMap = new QQMapWX({
  key: 'PIRBZ-NUQCX-STX4Y-7QUEG-QMFUO-7ZFZA'
});
var qqmapsdk = new QQMapWX({
  key: 'PIRBZ-NUQCX-STX4Y-7QUEG-QMFUO-7ZFZA' // 必填
});

const app =  getApp();

const util = require('../../utils/util.js')
const formatLocation = util.formatLocation
Page({
  
  onLoad:function(options){
    var that=this
    that.reverseGeocoder
  },

  /**
   * 页面的初始数据
   */
  data: {
    haslocation:false,
    address:'',
    arr : [],
    pass:false
  },
  
  location:function()
  {
    var actid = wx.getStorageSync('actid');
    wx.request({
      url: app.urlData.findlocation,
      data: {
        actid:actid
      },
      header: {'content-type':'application/x-www-form-urlencoded'},
      method: 'POST',
      success: (res)=>{
        //console.log(res)
        var str = res.data.replace(',','.')
        var str = str.replace(',','.')
        this.setData({
        
          arr:str.split('|')
        })

/*         console.log(parseFloat(that.data.arr[1])+'             '+parseFloat(that.data.arr[0]))
        console.log(this.data.arr) */
      },
      fail: ()=>{},
      complete: ()=>{}
    });
    
    /* qqmapsdk.calculateDistance({
      mode: 'walking',
      from: '',
      to: '34.1968961084,117.1878490000',
      success: function (res) {
        console.log(res);
      },
      fail: function (error) {
        console.error(error);
      },
    }) */
    const that = this
    wx.getLocation({
      type:'gcj02',
      success: function(res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        wx.showLoading({
          title: '加载中',
        })

        wxMap.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success:function(res){
            //console.log(res.result)
            that.setData({
              address: res.result.address
            })
            wx.hideLoading()

          }
        })
        var dist = that.distance(res.latitude, res.longitude, parseFloat(that.data.arr[1]),parseFloat(that.data.arr[0]));
        if(dist<0.08)
        {
          that.setData({
            pass:true
          })
        }

        that.setData({
          haslocation:true,
          location:formatLocation(res.longitude,res.latitude),
          //locationAddress:res.address
        })
      },
    })
  },
  distance: function (la1, lo1, la2, lo2) {    //计算距离  km

    var La1 = la1 * Math.PI / 180.0;

    var La2 = la2 * Math.PI / 180.0;

    var La3 = La1 - La2;

    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;

    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));

    s = s * 6378.137;//地球半径

    s = Math.round(s * 10000) / 10000;
    console.log("计算结果:" + s + "km");
    return s

     

  },
  /*distance: function (lat1, lng1, lat2, lng2) {
     lat1 = lat1 || 0;
      lng1 = lng1 || 0; 
      lat2 = lat2 || 0;
       lng2 = lng2 || 0; 
       var rad1 = lat1 * Math.PI / 180.0; 
       var rad2 = lat2 * Math.PI / 180.0; 
       var a = rad1 - rad2;
        var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0; 
        var r = 6378137;
        var s;
         s=(r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))).toFixed(0)
    console.log("计算结果:" + s + "m");
          },*/




  daka:function(){
    const that = this
    if(that.data.haslocation)
 {
   if(that.data.pass)  
   {
      wx.navigateTo({
      url: '../cface/cface',
    })
  }
  else{
    wx.showModal({
      title: '定位不通过',
      content: '',
      showCancel: false,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if(result.confirm){
          
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
  }
  else{
    wx.showToast({
      title: '请先定位',
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