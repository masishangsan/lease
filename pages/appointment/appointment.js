var app = getApp()
Page({
  data: {
    appointment:[
      
    ],
    userId:""
  },
  //事件处理函数
  onLoad:function(){
    var self=this
    self.data.userId=wx.getStorageSync("userId")
    self.setData({
      userId:self.data.userId
    })
    wx.request({
      url: 'https://yly1.ylyedu.com/api/goods/getAppointment', //仅为示例，并非真实的接口地址
      data: {
         userId:self.data.userId
      },
      success: function(res) {
        console.log(res.data)
        var data=res.data.data
        data.forEach(function(item){
          self.data.appointment.push({
            src:item.img,
            goodname:item.name,
            price:item.rent,
            tagprice:item.tagprice,
            id:item.id
          })
        })
        self.setData({
          appointment:self.data.appointment
        })
      }
    })
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
  delete:function(e){
    var index=e.currentTarget.dataset.index
    console.log(this.data.appointment[index])
    // console.log(e)
    var self=this
    var goodsId =self.data.appointment[index].id
        wx.request({
          url:"https://yly1.ylyedu.com/api/goods/delAppointment",
          data:{
            userId:self.data.userId,
            goodsId:goodsId
          },
          success: function(res) {
            console.log(res.data)
            self.data.appointment.splice(index, 1)
            self.setData({
                appointment:self.data.appointment
            })
          }
        })

  }
})