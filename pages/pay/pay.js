var app = getApp()
Page({
  data: {
    good:[
    // {
    //   name:"小泰克百变儿童乐园",
    //   pledge:"300",
    //   rent:"5",
    //   term:"30",
    //   total:450
    // },
    //   {
    //     name: "小泰克百变儿童乐园",
    //     pledge: "300",
    //     rent: "5",
    //     term: "30",
    //     total: 450
    //   } 
      ],
      post:0,
      flag1:true,
      flag2:true,
      userId:"",
      orderId:"",
      total:0,
      balance:0,
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
    console.log(options,"options")
    this.data.orderId=options.orderId
    this.data.balance=options.balance
    var self=this
    var arr=wx.getStorageSync("toAccounts")
    console.log(arr,"payarr")
    arr.forEach(function(item){
      self.data.good.push({
        name:item.name,
        pledge:item.foregift,
        rent:item.rent,
        term:options.rentTime,
        total:options.total
      })
    })
    var userId=wx.getStorageSync("userId")
    self.data.userId=userId
    self.data.total=options.total
    self.setData({
      good:self.data.good,
      userId:self.data.userId,
      orderId:self.data.orderId,
      total:self.data.total,
      balance:self.data.balance
    })
    var pay = 0;
    this.data.good.forEach(function (item) {
      pay += parseInt(item.total)
    })
    this.setData({
      pay: pay 
    })
  },
  pay1:function(){
    this.data.flag1=!this.data.flag1;
    this.data.flag2=true;
    this.setData({
      flag1:this.data.flag1,
      flag2:this.data.flag2
    })
  },
  pay2: function () {
    this.data.flag2 = !this.data.flag2;
    this.data.flag1 = true;
    this.setData({
      flag2: this.data.flag2,
      flag1: this.data.flag1
    })
  },
  pay:function(){
    var self=this
    if (self.data.flag1==false) {//余额支付
      wx.request({
        url: 'https://yly1.ylyedu.com/api/order/balancePay', //仅为示例，并非真实的接口地址
        data: {
           userId:self.data.userId,
           orderId:self.data.orderId,
           total:self.data.total
        },
        success: function(res) {
          console.log(res)

          if (res.data.msg=='success') {
            wx.showModal({
                title: '提示',
                content: '支付成功！，请耐心等待发货'
            })
            wx.switchTab({
              url: '../index/index'
            })
          }else if (res.data.msg=="账户余额不足") {
            wx.showModal({
                title: '提示',
                content: '账户余额不足，请充值'
            })
          }
        }
      })
    }else if (self.data.flag2==false) {
        wx.request({
            url:"https://yly1.ylyedu.com/api/order/pay",
            data:{
                orderId:self.data.orderId,
                userId:self.data.userId
            },
            success:function(){
                wx.requestPayment({
                    'timeStamp': res.data.data.timeStamp,
                    'nonceStr':res.data.data.nonceStr,
                    'package':res.data.data.package,
                    'signType': 'MD5',
                    'paySign':res.data.data.paySign,
                    'success':function(res){
                        if (res.data.data.msg=='success') {
                             wx.showModal({
                                title: '提示',
                                content: '支付成功！，请耐心等待发货'
                            })
                        }
                    },
                    'fail':function(res){
                    }
                })
            }
        })
    }
  },
})