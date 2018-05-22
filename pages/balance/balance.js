var app = getApp()
Page({
  data: {
    pledge: 3600,
    consume: [{
      type: "平台消费", date: "2018-10-12", money: "-2600"
    },
    {
      type: "平台充值", date: "2018-10-18", money: "+2100"
    },
    {
      type: "平台奖励", date: "2018-10-12", money: "+100"
    }],
    userId:""
  },
  //事件处理函数
  //
  chongzhi: function () {
    wx.navigateTo({
      url: '../pledge_c/pledge_c?type='+1,
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
    getUserInfo:function(){
        var self=this
        wx.request({
            url:"https://yly1.ylyedu.com/api/user/getInfo",
            data:{
                userId:self.data.userId
            },
            success:function(res){
                console.log(res)
                self.data.pledge=res.data.data.balance
                self.setData({
                    pledge:self.data.pledge
                })
            }
        })
    }    
})