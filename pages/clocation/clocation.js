
const util = require('../../utils/util.js')
const formatLocation = util.formatLocation
const app = getApp()
var hasLocation = getApp().fuzeData.hasLocation
var locations = getApp().fuzeData.locations
var locationAddresses = getApp().fuzeData.locationAddresses

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  onLoad()
  {
    this.setData({
      hl: hasLocation,
      location: locations,
      locationAddress: locationAddresses
    })
  },
  chooseLocation() {
    const that = this
    wx.chooseLocation({
      success(res) {
        console.log(res)
        hasLocation=true,
        locations=formatLocation(res.longitude, res.latitude),
        //console.log(locations)
        locationAddresses=res.address

        that.setData({
          hl:hasLocation,
          location: locations,
          locationAddress: locationAddresses
        })
      }
    })
  },

//确定提交
  submit(){
    if(hasLocation)
    {var that = this;
/*     var userid = wx.getStorageSync('openid');
    var activity = wx.getStorageSync('activity'); */
    try{
      var userid = wx.getStorageSync('openid');
      var activity = wx.getStorageSync('activity');
      if(userid)
      {console.log(activity+"   "+userid)} 
    }catch(e)
    {
      console.log(e)
    }
      wx.request({
      url: app.urlData.sign,
      data: {
        userid:userid,
        location:locationAddresses,
        longitude:locations.longitude,//经度
        latitude:locations.latitude,//纬度
        activity:activity
      },
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
      success: (res)=>{
        //负责人添加信息成功
        console.log(res)
        if(res.data !== 'fail')
        {
          wx.showModal({
            title: '活动id',
            content: '\''+res.data+'\'',
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
          wx.showToast({
          title: '创建成功！',
          icon: 'none'
        })
        wx.navigateTo({ url: '../kaoqinlist/kaoqinlist' })}
      },
      fail: (err)=>{
        console.log(err)
      },
      complete: ()=>{}
    });
  }
  else
  {
    wx.showToast({
      title: '请选择位置',
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
  clear() {
      hasLocation=false
      this.setData({
        hl:hasLocation
      })

  },


})