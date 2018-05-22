//index.js
//获取应用实例
var app = getApp()
var api=require('../../utils/api.js')
Page({
  data: {
    arr: {},
    movies: [
    ],
    category: [{name: 'title1'},{name: 'title2'},{name: 'title3'}],
    party:"http://img02.tooopen.com/images/20141231/sy_78327074576.jpg",
    
    index:"",
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
  onLoad:function(){
        //   console.log('aaaaaaaa',wx.getStorageSync('openId'));
        var that=this
       
        wx.request({
                url: 'https://yly1.ylyedu.com/api/index/index', //仅为示例，并非真实的接口地址
                success: function (res) {
                        console.log(res.data.data)
                        var banner=res.data.data.banner
                        // console.log(banner)
                        banner.forEach(function(item){
                          that.data.movies.push({
                            img:item.img
                          })
                        })
                        that.data.arr = res.data.data
                        delete that.data.arr['banner']
                        
                        that.setData({
                          movies:that.data.movies,
                          arr: that.data.arr,
                        })
                        // console.log(that.data.arr, 'a')
                }
        })
  },
  toReferral:function(e){
    var index = e.currentTarget.dataset.index;
    this.data.index=index
    this.setData({
      index:this.data.index
    })
    console.log(this.data.index)
  }
})
