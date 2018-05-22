var app = getApp()
Page({
  data: {
    array: ['9', '10', '11', '12',  '13', '14', '15',  '16', '17', '18',  '19', '20', '21',  '22',  '23', '24', '25', '26',],
    good:[{
      name:"小泰克百变儿童乐园",
      src:"http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg",
      price:"4.9",
      pledge:"300"
    },
      {
        name: "小泰克百变儿童乐园",
        src: "http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg",
        price: "4.9",
        pledge: "300"
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
  bindPickerChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onLoad:function(){
    wx.onUserCaptureScreen(function (res) {
      wx:wx.showToast({
        title: '截图 了',
        icon: '',
        image: '',
        duration: 0,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    })
  }
  
})