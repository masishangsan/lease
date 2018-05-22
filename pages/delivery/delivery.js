var app = getApp()
Page({
	data:{

	},
	onLoad:function(){
		this.alert();
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
	alert:function(){
		var warn="目前只支持北京六环内"
		 wx.showModal({
	        title: '提示',
	        content: warn,
	        success: function(res) {
			    if (res.confirm) {
			      	wx.navigateBack({
  						delta: 1
					})
			    } else if (res.cancel) {
			    	wx.navigateBack({
  						delta: 1
					})
			    }
  			}
      	})
	}
})