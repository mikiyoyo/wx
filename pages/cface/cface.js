
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasface:false,
    src: '',
    position: 'front',
  },
  onLoad() {
    this.ctx = wx.createCameraContext()
  },
  takePhoto() {
    try
    {
      var actid = wx.getStorageSync('actid');
/*       if(actid)
      console.log(actid) */
    }
  catch(e)
  {
    console.log(e)
  }
    var userid = wx.getStorageSync('openid');
    //console.log(userid)
    const that = this
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.showLoading({
          title: '正在识别中',
        })
        this.setData({
          src: res.tempImagePath
        })
        wx.uploadFile({
          url: getApp().urlData.searchface+'?name='+userid,
          filePath: res.tempImagePath,
          name: 'file',
          success:(res)=>{
            //console.log(res.data)
            //与openid进行对比通过才可
            if(res.data.search(userid)!=-1)
            {
              //console.log(res.data.search(userid))
              wx.hideLoading()
              //上传考勤信息
              wx.request({
                url: app.urlData.add_info,
                data: {
                  actid:actid,
                  userid:userid,

                },
                header: {'Content-Type':'application/x-www-form-urlencoded'},
                method: 'POST',
                success: (res)=>{
                  //console.log(res)
                  if(res.data === 'ok')
                  {
                    wx.showToast({
                      title: '识别成功',
                      icon: 'success',
                      duration: 2000 
                    })
                    that.setData({
                      hasface:true
                    })
                    wx.navigateTo({
                      url: '../kaoqinteam/kaoqinteam',
                      success: (result)=>{
                        
                      },
                      fail: ()=>{},
                      complete: ()=>{}
                    });
                  }
                },
                fail: ()=>{},
                complete: ()=>{}
              });
            }
            else{
              wx.hideLoading()
              wx.showModal({
                title: '识别失败',
                
                showCancel:false,
                confirmText:"确定",
                success(res) {
                }
              })
            }
          },
          fail:(err)=>{
            console.log(err)
          }
        })
      }
    })
  },
  togglePosition() {
    this.setData({
      position: this.data.position === 'front'
        ? 'back' : 'front'
    })
  },
  error(e) {
    console.log(e.detail)
  },

})