var app = getApp()
Page({
  data: {
    pledge :3600,
    consume:[{
      type: "平台消费", date:"2018-10-12",money:"-2600"
    },
      {
        type: "平台充值", date: "2018-10-18", money: "+2100"
      },
      {
        type: "平台奖励", date: "2018-10-12", money: "+100"
      }]
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
    chongzhi:function(){
        wx.navigateTo({
          url: '../pledge_c/pledge_c?type='+2,
        })
    },
    onShow:function(){
        var self=this
        self.data.userId=wx.getStorageSync("userId")
        self.setData({
            userId:self.data.userId
        })
        self.getUserInfo();
    },
    pay:function(){
        var self=this
        wx.request({
            url: 'https://yly1.ylyedu.com/api/order/charge', //仅为示例，并非真实的接口地址
            data: {
                total:0.01,
                userId:self.data.userId,
                body:"押金充值",
                type:2//押金充值
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
                    },
                    'fail':function(res){
                    }
                })
            }
        })
    },
    getUserInfo:function(){
        var self=this
        wx.request({
            url:"https://yly1.ylyedu.com/api/user/getInfo",
            data:{
                userId:self.data.userId
            },
            success:function(res){
                console.log(res)
                self.data.pledge=res.data.data.deposit
                self.setData({
                    pledge:self.data.pledge
                })
            }
        })
    },
    tixian:function(){
        
    }
})