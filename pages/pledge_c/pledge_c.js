var app = getApp()
Page({
  data: {
    money: [{ mn: 50, sec: false }, { mn: 100, sec: false }, { mn: 200, sec: false },
     { mn: 500, sec: false }, { mn: 1000, sec: false }, { mn: 2000, sec: false },
     { mn: 4000, sec: false }, { mn: 5000, sec: false }],
     value:"",
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
  select:function(e){
    console.log(e)
    var index=e.currentTarget.dataset.index
    this.data.money.forEach(function(item){
      item.sec=false
    })
    this.data.money[index].sec=true;
    this.data.value=this.data.money[index].mn
    this.setData({
      money:this.data.money,
      value:this.data.value
    })
  },
  onLoad:function(options){
    console.log(options)
    var self=this
    self.data.type=options.type
    self.data.userId=wx.getStorageSync("userId")
    self.setData({
      userId:self.data.userId,
      type:self.data.type
    })
  },
  pay:function(){
    var self=this
    wx.request({
        url: 'https://yly1.ylyedu.com/api/order/charge', //仅为示例，并非真实的接口地址
        data: {
          total:self.data.value,
          userId:self.data.userId,
          body:"余额充值",
          type:self.data.type
        },
        success: function(res) {
            console.log(res.data)
            wx.requestPayment({
                'timeStamp': res.data.data.timeStamp,
                'nonceStr': res.data.data.nonceStr,
                'package': res.data.data.package,
                'signType': 'MD5',
                'paySign': res.data.data.paySign,
                'success':function(res){
                    console.log(res)
                    if (res.data.data.msg=='success') {
                        wx.showToast({
                            title: '充值成功！',
                            icon: 'loading',
                            duration: 2000
                        })
                    }
                },
                'fail':function(res){
                }
            })
        }
    })
  }

})