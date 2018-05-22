var app = getApp()
Page({
  data: {
    placeholder:[{content:"百变儿童乐园"}],
    classify: [{ name: "电动车" }, { name: "滑梯" }, { name: "面包超人" }, { name: "平衡车" }, { name: "乐高" }, { name: "厨房" }, { name: "小泰克" }],
    hot:""




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
  back:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  replace:function(){
    
  }
})