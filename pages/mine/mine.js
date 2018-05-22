var app = getApp()
Page({
  data: {
    userhead:"../../img/lp.jpg",
    username:"大熊",
    userphone:"15336161009",
    recsum:3600,
    plesum:3000,
    userId:""
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
  toC:function(){
    wx.navigateTo({
      url: '../balance/balance',
      
    })
  },
  toY:function(){
    wx.navigateTo({
      url: '../pledge/pledge',

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
    getUserInfo:function(){
        var self=this
        wx.request({
            url:"https://yly1.ylyedu.com/api/user/getInfo",
            data:{
                userId:self.data.userId
            },
            success:function(res){
                console.log(res)
                self.data.recsum=res.data.data.balance
                self.data.plesum=res.data.data.deposit
                self.data.username=res.data.data.nickName
                self.data.userhead=res.data.data.avatarUrl
                self.setData({
                    recsum:self.data.recsum,
                    plesum:self.data.plesum,
                    username:self.data.username,
                    userhead:self.data.userhead
                })
            }
        })
    },
   
        onShareAppMessage:function(res){
            if (res.from ==='share') {
                console.log(res.target)
            }
            return{
                title:'玩具超人分享标题',
                path:'/pages/index/index',
                success:function(res){
                    console.log('成功')
                },
                fail:function(){
                    console.log('失败')
                }
            }
        }
    
})