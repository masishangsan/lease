var app = getApp()
function getRandomColor () {
  let rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({
  data: {
    vip:[{
      validity:"3个月",
      times:"3",
      original:"899",
      current:"799",
      bcolor:"#EE7942",
    },
      {
        validity: "半年",
        times: "6",
        original: "1599",
        current: "1499",
        bcolor: "#6495ED",
      },
      {
        validity: "1年",
        times: "12",
        original: "2999",
        current: "2799",
        bcolor: "#7CFC00",
      },
      {
        validity: "2年",
        times: "24",
        original: "4999",
        current: "4999",
        bcolor: "#EEEE00",
      },
      {
        validity: "2年",
        times: "36",
        original: "5499",
        current: "5499",
        bcolor: "#EEEE00",
      }
      ],
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
    tovip_de:function(e){
    var index=e.currentTarget.dataset.index
    var vipm=this.data.vip[index]
        wx.navigateTo({
          url: '../vip_de/vip_de?validity=' + vipm.validity + '&times=' + vipm.times + '&original=' + vipm.original + '&current=' + vipm.current + '&bcolor='+vipm.bcolor+'&id='+vipm.id+'&type='+vipm.type,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
    },
    onLoad:function(){
        var self=this
        wx.getStorage({
            key: 'userId',
            success: function(res) {
                console.log(res.data)
                self.data.userId=res.data
            } 
        })
        wx.request({
            url: 'https://yly1.ylyedu.com/api/vip/get', //仅为示例，并非真实的接口地址
            data: {
                userId:self.data.userId
            },
            success: function(res) {
                console.log(res.data)
                var data=res.data.data
                data.forEach(function(item){
                    item.bcolor='#EE7942'
                })
                self.data.vip=data

                self.setData({
                    vip:self.data.vip
                })
            }
        })
    },
    to:function(){
        wx.navigateTo({
            url:"../delivery/delivery"
        })
    }
})