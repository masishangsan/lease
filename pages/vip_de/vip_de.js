var app = getApp()
Page({
  data: {
    vip:[],
    txtOrderCode: '',
    vipId:"",
    userId:"",
    type:""
  },
  onShareAppMessage: function (res) {
        if (res.from === 'menu') {
          // 来自页面内转发按钮
          console.log(res.target)
        }
        return {
            title: '玩具超人分享标题',
            path: '/pages/index/index',
            success: function(res) {
                // 转发成功
                console.log(res,'转发成功')
            },
            fail: function(res) {
                // 转发失败
                 console.log(res,'转发失败')
            }
        }
    },
  //事件处理函数
  onLoad:function(options){
    // console.log(options)
    this.data.vip=options
    this.data.vipId=options.id
    this.data.type=options.type
    var userId=wx.getStorageSync('userId')
    this.data.userId=userId

    this.setData({
      vip:this.data.vip,
      vipId:this.data.vipId,
      userId:this.data.userId,
      type:this.data.type
    })
    console.log(this.data.vip)
    // this.wxpay()
  },
  wxpay:function(){
    var self=this
    var ordercode = this.data.txtOrderCode;
       
            wx.request({
                url: 'https://yly1.ylyedu.com/api/order/submitOrder',
                data: {
                  userId:self.data.userId,
                  vipId:self.data.vipId,
                  type:1,
                  total:1,
                  body:self.data.type
                },
                success: function (res) {
                  console.log(res.data)
                  // debugger;
                  if (res.data.msg=="用户已经是会员") {
                    wx.showModal({
                      title: '提示',
                      content:"您已是会员"
                    })
                  }else{
                    wx.requestPayment({
                      timeStamp: res.data.data.timeStamp,
                      nonceStr: res.data.data.nonceStr,
                      package: res.data.data.package,
                      signType: 'MD5',
                      paySign: res.data.data.paySign,
                      success: function (res) {
                        // success
                        console.log(res);
                      },
                      fail: function (res) {
                        // fail
                        console.log(res);
                      },
                      complete: function (res) {
                        // complete
                        console.log(res);
                      }
                    })
                  }
                  
                }
            })
  }
})