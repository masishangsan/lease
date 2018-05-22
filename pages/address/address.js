var app = getApp();
Page({
  data: {
    address:[
    // {
    //   name:"某某某",
    //   telephone:'15425141174',
    //   content:"某某市某某镇某某村A街B店C小区",
    //   srcs:"../../img/yixuan.png",
    //   src:"../../img/weixuan.png",
    //   flag:true
    // },
    //   {
    //     name: "某1某",
    //     telephone: '15425141174',
    //     content: "某某市某某镇某某村A街B店C小区",
    //     srcs: "../../img/yixuan.png",
    //     src: "../../img/weixuan.png",
    //     flag: false
    //   }
      ],
      userId:""
  },
  onLoad: function (options) {

    // console.log(options)
    // var data=options;
    // data.content=data.address+data.datails;
    // data.srcs = "../../img/yixuan.png";
    // data.src = "../../img/weixuan.png";
    // data.flag=false;
    // data.telephone=data.phone
    // this.data.address.push(data);
    // this.setData({ address: this.data.address })
    var self=this
    self.data.userId=wx.getStorageSync("userId")
    self.setData({
      userId:self.data.userId
    })
    wx.request({
        url: 'https://yly1.ylyedu.com/api/address/get', //仅为示例，并非真实的接口地址
        data: {
          userId:self.data.userId
        },
        success: function(res) {
          console.log(res.data)
          var data=res.data.data
          data.forEach(function(item){
            self.data.address.push({
              name:item.name,
              telephone:item.phone,
              content:item.region+item.address,
              id:item.id,
              srcs:"../../img/yixuan.png",
              src:"../../img/weixuan.png",
              flag:item.isDefault,
            })
          })
          // self.data.address[0].flag=1
          console.log(self.data.address,'123')
          self.setData({
            address:self.data.address
          })
        }
    })
  },
  select:function (e){
    var self=this
    // console.log(e.currentTarget.dataset)
    var index = e.currentTarget.dataset.index
    this.data.address.forEach(function(item){
      item.flag=false;
      // console.log(item.flag)
    });
    this.data.address[index].flag=true;
    var id=this.data.address[index].id
    console.log(this.data.address)
    wx.setStorageSync('address', this.data.address[index])
    this.setData({address:this.data.address})

    wx.request({
      url: 'https://yly1.ylyedu.com/api/address/optertionDefault', //仅为示例，并非真实的接口地址
      data: {
         userId:self.data.userId,
         id:id
      },
      success: function(res) {
        console.log(res.data)
      }
    })
    console.log(this.data.address)
    
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
  shift:function(e){
    var self=this
    var index = e.currentTarget.dataset.index
    var adId=self.data.address[index].id
    wx.request({
      url: 'https://yly1.ylyedu.com/api/address/delete', //仅为示例，并非真实的接口地址
      data: {
        userId:self.data.userId,
        id:adId
      },
      success: function(res) {
        console.log(res.data)
      }
    })
    this.data.address.splice(index,1)
    this.setData({ address: this.data.address })
  }
})