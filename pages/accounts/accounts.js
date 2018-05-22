var app = getApp()
Page({
  data: {
    good:[{
      name:"小泰克百变儿童乐园",
      src:"http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg",
      rent:4.9,
      pledge:"399"
    },
      {
        name: "小泰克百变儿童乐园",
        src: "http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg",
        rent: 4.9,
        pledge: "399"
      }],
      vip:{type:"年卡",endDate:"2018-10-23"},
      array:[0,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
      dates:"2017-10-23",
      index:1,
      total:0,
      post:20,
      chaange:"",
      checked:false,
      disabled:false,
      date:false,
      address:{},
      userId:"",
      vipGoods:[],
      goods:[],
      select:false,
      catch:true,
      isvip:"",//发送请求时的参数
      yazong:"",//押金总和
      zuzong:"",//租金总和
      rentTime:0,//租用天数
      demo:[],
      demo2:[],
      yajin:0,
      addressid:"",
      orderId:"",
      balance:"",
      ischoose:false,
  },
  //事件处理函数
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
  switch1Change: function (e) {
    // debugger;
    var self=this
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    this.data.isVip=!this.data.isVip
    this.setData({
      isVip:this.data.isVip
    })
    
    var vipGoods=[]
    var goods=[]
    if (this.data.isVip==1) {
      this.data.good.forEach(function(item){
        vipGoods.push(item)
      })
      self.setData({
        vipGoods:self.data.vipGoods
      })
      console.log(this.data.vipGoods)
    }else if (this.data.isVip==0) {
      this.data.good.forEach(function(item){
        goods.push(item)
      })
      self.setData({
        goods:self.data.goods
      })
      console.log(this.data.goods)
    }
  },
  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    var that=this
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var total = 0;
    var yajin=0
    console.log(total)
    this.setData({
      index: e.detail.value
    })
    var day=that.data.array[that.data.index]
    var isVip=wx.getStorageSync("isVip")
    if (isVip==1) {
      that.data.goods.forEach(function (item) {
        total+=(parseFloat(item.rent)*that.data.array[that.data.index])+parseFloat(item.foregift)
        yajin+=parseFloat(item.foregift)
      })
      console.log(total)
    } else if (isVip==2) {
      that.data.goods.forEach(function (item) {
        total+=(parseFloat(item.rent)*that.data.array[that.data.index])+parseFloat(item.foregift)
        yajin+=parseFloat(item.foregift)
      })
    }
    var rentTime=that.data.array[that.data.index]
    that.data.rentTime=rentTime
    
    this.setData({
      total: total,
      yajin:yajin,
      rentTime:that.data.rentTime
    })
  },
  onShow:function(){
    var that=this
    var myDate = new Date();
    console.log(myDate.toLocaleDateString(),'date')
    that.data.dates=myDate.toLocaleDateString()
    that.setData({
      dates:that.data.dates
    })
    this.getVip();
    wx.getStorage({
      key: 'toAccounts',
      success: function (res) {
        that.data.good=res.data
        that.setData({
          good: that.data.good
        })
        console.log(res.data)
      }      
    })
    // wx.removeStorage({
    //   key: 'toAccounts',
    // })
    this.getuserInfo();
    var address = wx.getStorageSync('address')
    // wx.removeStorageSync('address')
    that.data.address=address
    that.data.addressid=address.id
    that.setData({
      address:that.data.address
    })

    // console.log(that.data.address)
  },
  toPay:function(){
    var self = this
    var arr=[]
    self.data.goods.forEach(function(item){
        arr.push(item)
    })
    // debugger;
    // if (self.data.rentTime=="") {
    //   wx.showToast({
    //     title: '请选择租用天数',
    //     icon: 'loading',
    //     duration: 2000
    //   })
    // }
    // debugger;
    if (self.data.addressid==undefined) {
        wx.showModal({
            title: '提示',
            content: '请选择收货地址'
        })
    }else if (self.data.dates== new Date().toLocaleDateString()) {
         wx.showModal({
            title: '提示',
            content: '最快发货在一天后'
        })
    }else{
        if (self.data.goods.length==0||self.data.vipGoods.length>1) {
      wx.request({
      url: 'https://yly1.ylyedu.com/api/order/submitOrder', //仅为示例，并非真实的接口地址
      data: {
        goodsInfo:JSON.stringify({isVip:self.data.isvip,vipGoods:self.data.demo,goods:self.data.demo2}),
        type:3,
        body:"VIP租赁玩具",
        userId:self.data.userId,
        address:self.data.addressid,
      },
      success: function(res) {
        var goodsId=[]
        self.data.good.forEach(function(item){
          goodsId.push(item.id)
        })
        wx.request({
            url:'https://yly1.ylyedu.com/api/cart/delete',
            data:{
                userId:self.data.userId,
                goodsId:goodsId
            },
            success:function(res){
            console.log(res)
                if (res.data.msg=='success') {
                    wx.showModal({
                        title: '提示',
                        content: "订单提交成功",
                        success: function(res) {
                            if (res.confirm) {
                                wx.reLaunch({
                                    url: '../index/index'
                                })
                            } else if (res.cancel) {
                                wx.reLaunch({
                                    url: '../index/index'
                                })
                            }
                        }
                    })
                }
            }
        })
        console.log(res.data)
      }
    })
    }else if (self.data.rentTime=="") {
      wx.showModal({
            title: '提示',
            content: '请选择租赁时间'
        })
    }else{
        wx.request({
      url: 'https://yly1.ylyedu.com/api/order/submitOrder', //仅为示例，并非真实的接口地址
      data: {
        goodsInfo:JSON.stringify({isVip:self.data.isvip,vipGoods:self.data.demo,goods:self.data.demo2}),
        type:2,
        body:"租凭订单提交",
        userId:self.data.userId,
        deposit:self.data.yazong,
        rent:self.data.zuzong,
        rentTime:self.data.rentTime,
        address:self.data.addressid,
        total:self.data.total,
        deliverTime:self.data.dates
      },
      success: function(res) {
        console.log(res.data)
        var orderId=res.data.data.orderId
        self.data.orderId=orderId
        self.setData({
          orderId:self.data.orderId
        })
        var goodsId=[]
        self.data.good.forEach(function(item){
          goodsId.push(item.id)
        })
        console.log(goodsId,"goodsId")
        wx.request({
          url:'https://yly1.ylyedu.com/api/cart/delete',
          data:{
            userId:self.data.userId,
            goodsId:goodsId
          },
          success:function(res){
            console.log(res)
          }
        })
        console.log(self.data.orderId,'self.data.user')
        wx.navigateTo({
          url: '../pay/pay?total='+self.data.total+'&rentTime='+self.data.rentTime+'&orderId='+self.data.orderId+'&balance='+self.data.balance,
        })
      }
    })
    }
    }
    
    

    wx.setStorage({
      key: "toAccounts",
      data: arr
    })
    console.log(arr,'arr')
    
  },
  toAddress:function(){
    wx.navigateTo({
       url: '../address/address',
    })
  },
  getVip:function(){
    var self=this
    self.data.userId=wx.getStorageSync("userId")
    self.setData({
      userId:self.data.userId
    })
    // wx.request({
    //   url: 'https://yly1.ylyedu.com/api/vip/get', //仅为示例，并非真实的接口地址
    //   data: {
    //     userId:self.data.userId
    //   },
    //   success: function(res) {
    //     console.log(res.data)
    //   }
    // })
  },
  getuserInfo:function(){
      
      var self=this
      var total = 0
      var yajin=0
      wx.request({
        url: 'https://yly1.ylyedu.com/api/user/getInfo', //仅为示例，并非真实的接口地址
        data: {
           userId:self.data.userId
        },
        success: function(res) {
          console.log(res)
          self.data.balance=res.data.data.balance
          self.setData({
            balance: self.data.balance
          })
          var isVip=wx.setStorageSync('isVip',res.data.data.isVip)
          // debugger;

          if (res.data.data.isVip==2&&self.data.ischoose==false) {
            self.data.isvip=2
            self.data.catch=false
          }else if (res.data.data.isVip==1){

            self.data.isvip=1
            wx.getStorage({
              key: 'toAccounts',
              success: function(resp) {
                  var demo2=[]
                  var deposit=0
                  var rent=0
                  console.log(resp,'465456')
                  self.data.goods=resp.data
                  self.setData({
                    goods:self.data.goods
                  })
                  // debugger;
                  self.data.goods.forEach(function (item) {
                    self.data.total+=(parseFloat(item.rent)*self.data.rentTime)+parseFloat(item.foregift)
                    self.data.yajin+=parseFloat(item.foregift)
                  })
                  self.setData({
                    total:self.data.total,
                    yajin:self.data.yajin,
                  })
                  console.log(self.data.total)
                  console.log(self.data.yajin)
                  resp.data.forEach(function(item){
                  var toy = {
                      id:item.id,
                      deposit:item.foregift,
                      status:0
                  }
                  console.log(toy,'11111111111111111111111111111111111111111111111111111111111111111111')
                    demo2.push(toy)
                    deposit+=parseFloat(item.foregift)
                    rent+=parseFloat(item.rent)
                  })
                  self.data.yazong=deposit
                  self.data.zuzong=rent
                  self.data.demo2=demo2
                  self.setData({
                    demo2:self.data.demo2,
                    zuzong:self.data.zuzong,
                    yazong:self.data.yazong,
                  })
                  
              } 
            })
            
          }
          self.setData({
            catch:self.data.catch,
            isvip:self.data.isvip
          })
        }
    })
  },
  select:function(e){
    var index=e.currentTarget.dataset.index
    var self=this
    self.data.good[index].select=!self.data.good[index].select
    self.setData({
      good:self.data.good
    })
  },
  sure:function(){
    var self=this
    var demo=[]
    var demo2=[]
      this.data.good.forEach(function(item){
      if (item.select==true) {
        self.data.vipGoods.push(item)
        var toy = {
          id:item.id,
          status:0
        }
        demo.push(toy)
        self.data.demo=demo
        self.setData({
          demo:self.data.demo
        })
      }
    })
    if (demo.length>5) {
      wx.showToast({
        title: '最多可选5件',
        icon: 'loading',
        duration: 2000
      })
    }else if(demo.length==0){
       self.data.good.forEach(function(item){
          self.data.goods.push(item)
          self.data.catch=true
          var toy = {
            id:item.id,
            deposit:item.foregift,
            status:0
          }
          demo2.push(toy)
          self.data.demo2=demo2
          self.setData({
            demo2:self.data.demo2
          })
       })
       var deposit =0;
        var rent=0
        var total=0
        self.data.goods.forEach(function(item){
          deposit+=Number(item.foregift),
          rent+=item.rent
        })
        // debugger;
        total+=deposit+rent
        self.data.total=total
        self.data.yazong=deposit
        self.data.zuzong=rent
        self.setData({
          yazong:self.data.yazong,
          zuzong:self.data.zuzong,
          total:self.data.yazong
        })
      // self.data.goods=demo2
      // self.data.vipGoods=demo
      self.data.catch=true
      self.data.ischoose=true
    }else{
      this.data.good.forEach(function(item){
        if (item.select==false) {
          self.data.goods.push(item)
          var toy = {
            id:item.id,
            deposit:item.foregift,
            status:0
          }
          demo2.push(toy)
          self.data.demo2=demo2
          self.setData({
            demo2:self.data.demo2
          })
        }
        var deposit =0;
        var rent=0
        var total=0
        self.data.goods.forEach(function(item){
          deposit+=Number(item.foregift),
          rent+=item.rent
        })
        // debugger;
        total+=deposit+rent
        self.data.total=total
        self.data.yazong=deposit
        self.data.zuzong=rent
        self.setData({
          yazong:self.data.yazong,
          zuzong:self.data.zuzong,
          total:self.data.yazong
        })
      })
      // self.data.goods=demo2
      // self.data.vipGoods=demo
      self.data.catch=true
      self.data.ischoose=true
    }
    self.setData({
      vipGoods:self.data.vipGoods,
      catch:self.data.catch,
      goods:self.data.goods,
      ischoose:self.data.ischoose
    })
  } 
})