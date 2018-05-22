var api = require('../../utils/api.js');
var app = getApp()
Page({
  data: {
    tab:[
      { name: "待支付", checked: false ,open:false}, { name: "在借", checked: true ,open:false}, { name: "已完成", checked: false,open:false },
    ],
    flag:false,
    loan:[{
      residue:'9'
    }],
    dates:"",
    achieve:[],
    time:"",
    cart_good:[],
    indent:[],
    change: true,
    change2: true,
    overOrder:{
        achieve:[]
    },
    order:{
      viph:true,
      ordh:true,
      vip:[],
      ordinary:[],
    },
    residue:"",
      payOrder:[
      ]
      ,
    userId:"",
    Saddrss:false,
    status:"",
    isVip:"",
    conment:"",
    balance:0
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
    onLoad:function(){

        this.data.userId=wx.getStorageSync("userId")
        this.getuserInfo()
        this.setData({
            userId:this.data.userId
        })
        this.getOrderData(1);
        var that=this
        var myDate = new Date();
        console.log(myDate.toLocaleDateString(),'date')
        that.data.dates=myDate.toLocaleDateString()
        that.setData({
            dates:that.data.dates
        })
    },
  //事件处理函数
  change:function(e){
    // console.log(e)
    var self=this
    var index=e.currentTarget.dataset.index;
    this.data.tab.forEach(function(item){
      item.checked=false;
    })
    this.data.open=true
    this.data.tab[index].checked=true
    this.data.tab[index].open=true
    // debugger;
    if (index == 0) {
        if (this.data.payOrder.length==0) {
            this.getOrderData(0);
        }else{

        }
    }
    else if(index == 1 ){
        if (this.data.order.vip.length==0 && this.data.order.ordinary.length==0) {
          this.getOrderData(1);
        }else{

        }
      }else if(index == 2 ){
        if (this.data.overOrder.achieve.length==0) {
          this.getOrderData(6)
      }else{

        }
      }
    this.setData({
      tab:this.data.tab
    })
      
  },
  getuserInfo:function(){
    var self=this
    wx.request({
        url:"https://yly1.ylyedu.com/api/user/getInfo",
        data:{userId:self.data.userId},
        success:function(res){
            console.log(res,'用户信息')
            self.data.isVip=res.data.data.isVip
            self.data.balance=res.data.data.balance
            self.setData({
                isVip:self.data.isVip,
                balance:self.data.balance
            })
        }
    })
  },
  choose:function(e){
    // console.log(e)
    // debugger;
    var index=e.currentTarget.dataset.index
    this.data.order.vip[index].choose = !this.data.order.vip[index].choose 
    
    this.setData({
      order:this.data.order
    })
    console.log(this.data.order.vip[index].orderId)
  },
  choose2: function (e) {

    console.log(e)
    var index = e.currentTarget.dataset.index
    var orderId =this.data.order.ordinary[index].orderId
    console.log(orderId)
    this.data.order.ordinary[index].choose = !this.data.order.ordinary[index].choose
    this.setData({
      order: this.data.order
    })
  },
  // relet:function(){
  //   if (this.data.ordinary.length==0 && this.data.vip.length==0) {
  //       wx.showModal({
  //           title: '提示',
  //           content: '您暂时没有租赁任何玩具'
  //       })
  //   }else{
  //       wx.navigateTo({
  //           url: '../relet/relet'
  //       })
  //   }
  // },
  choose3: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    this.data.cart_good[index].choose = !this.data.cart_good[index].choose
    this.setData({
      cart_good: this.data.cart_good
    })
  },
  closeExchange:function(){
    this.data.change=true
    this.setData({
      change:this.data.change
    })
  },
  toChange:function(){
    var self=this
    if (self.data.isVip!=2) {
        wx.showModal({
            title: '提示',
            content: '抱歉，您无权体验此功能'
        })
    }else if (this.data.order.ordinary.length==0 && this.data.order.vip.length==0) {
        wx.showModal({
            title: '提示',
            content: '您暂时没有租赁任何玩具'
        })
    }else{
        wx.request({
            url:"https://yly1.ylyedu.com/api/cart/getList",
            data:{
                userId:self.data.userId
            },
            success:function(res){
                console.log(res)
                if (res.data.data.length==0) {
                     wx.showModal({
                        title: '提示',
                        content: '请将您需要调换的商品添加至购物车'
                    })
                }else{
                    self.data.change=false;
                    res.data.data.forEach(function(item){
                        // self.data.cart_good.push({
                        //     src:item.img,
                        //     name:item.name,
                        //     size:item.goodsSpec,
                        //     price:item.rent,
                        //     pledge:item.foregift,
                        //     choose:false,
                        //     id:item.id
                        // })
                        item.choose=false
                        self.data.cart_good=res.data.data
                    })
                    self.setData({
                        change:self.data.change,
                        cart_good:self.data.cart_good
                    })
                }
            }
        })
        
    }
  },
  Exchange:function(){
    var self=this
    var userId=self.data.userId
    var orderId=""
    var goodsId=[]
    var goodsInfo=[]
    var replaceId=[]
    self.data.order.vip.forEach(function(item){
            if (item.choose==false) {
                orderId=item.orderId
                goodsId.push(item.id)
            }
        })
    goodsInfo.push({
            orderId:orderId,
            goodsId:goodsId,
        })
    self.data.cart_good.forEach(function(item){
        if (item.choose==false) {
            replaceId.push(item.id)
        }
        console.log(replaceId)
    })
    // debugger;
    // 
    if (replaceId.length!=goodsId.length) {
        wx.showModal({
            title: '提示',
            content: '请选择正确数量的替换玩具（普通租赁的玩具不能调换）'
        })
    }else if (replaceId.length==0||goodsId.length==0) {
        wx.showModal({
            title: '提示',
            content: '请选择正确数量的替换玩具'
        })
    }
    else if (self.data.Saddrss==false) {
        wx.showModal({
            title: '提示',
            content: '请选择收货地址'
        })
        // debugger;
    }else if (self.data.dates== new Date().toLocaleDateString()) {
        wx.showModal({
            title: '提示',
            content: '最快换货在一天后'
        })
    }else{
        var address=wx.getStorageSync("address")
        wx.request({
            url:"https://yly1.ylyedu.com/api/order/replace",
            data:{
                userId:userId,
                replaceId:replaceId,
                goodsInfo:goodsInfo,
                addressId:address.id,
                time:self.data.dates
            },
            success:function(res){
                console.log(res)
                if (res.data.msg=='success') {
                    self.data.change=true
                    self.setData({
                        change:self.data.change
                    })
                    wx.showModal({
                        title: '提示',
                        content: '申请调换成功！，请耐心等待'
                    })
                    self.data.change=true
                        self.data.order.ordinary.forEach(function(item){
                           item.choose=true
                        })
                        self.data.order.vip.forEach(function(item){
                           item.choose=true
                        })
                        self.setData({
                            change:self.data.change2,
                            order:self.data.order
                        })
                }
            }
        })
    }
  },
  bindDateChanges: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.time=e.detail.value
    this.setData({
      date: e.detail.value,
      time:this.data.time
    })
  },
  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  toReturn:function(){
    var self=this
    
    if (this.data.order.ordinary.length==0 && this.data.order.vip.length==0) {
        wx.showModal({
            title: '提示',
            content: '您暂时没有租赁任何玩具'
        })
    }else{
        this.data.change2=false;
        this.setData({
          change2:this.data.change2
        })
    }
  },
  closeReturn:function(){
    this.data.change2 = true;
    this.setData({
      change2: this.data.change2
    })
  },
  todetail:function(e){
    var self=this
    var index=e.currentTarget.dataset.index
    var orderId =self.data.payOrder[index].orderId
    wx.navigateTo({
      url: '../indent_de/indent_de?orderId='+orderId,
    })
  },

  overOrderData:function(res){
    var self=this
    // console.log(res)
    res.data.data.forEach(function(item){
        item.goods.forEach(function(item2){
            self.data.overOrder.achieve.push(item2)
        })
        item.vipGoods.forEach(function(item3){
            self.data.overOrder.achieve.push(item3)
        })
        self.setData({
            overOrder:self.data.overOrder
        })
    })
  },

  orderData:function(res){
    var self=this
    console.log(res,'所有在借订单')
                    res.data.data.forEach(function(item){
                        if (item.goods.length > 0 || item.vipGoods.length > 0) {
                            self.data.order.ordh =false
                            item.goods.forEach(function(item2){
                                self.data.order.ordinary.push({
                                    goodsrc:item2.img,
                                    name:item2.name,
                                    price:item2.rent,
                                    size:item2.goodsSpec,
                                    age:item2.fitAge,
                                    choose:true,
                                    id:item2.id,
                                    orderId:item.orderId,
                                    status:item.status,
                                    deadline:item2.deadline
                                })
                            })
                            self.data.order.viph =false
                            self.data.residue=item.vipTimes
                            item.vipGoods.forEach(function(item3){
                                self.data.order.vip.push({
                                    goodsrc:item3.img,
                                    name:item3.name,
                                    price:item3.rent,
                                    size:item3.goodsSpec,
                                    age:item3.fitAge,
                                    choose:true,
                                    id:item3.id,
                                    orderId:item.orderId,
                                    status:item.status
                                })
                            })
                            // console.log(self.data.order.ordinary,'普通订单')
                            self.data.order.ordinary.forEach(function(item){
                                if (item.status==1) {
                                    item.conment="已支付"
                                }else if (item.status==2) {
                                    item.conment="等待配送"
                                }else if (item.status==3) {
                                    item.conment="配送中"
                                }else if (item.status==4) {
                                    item.conment="到期时间为"+item.deadline
                                }else if (item.status==5) {
                                    item.conment="申请归还"
                                }
                            })
                            // console.log(self.data.order.vip,'会员订单')
                            self.data.order.vip.forEach(function(item){
                                if (item.status==1) {
                                    item.conment="已支付"
                                }else if (item.status==2) {
                                    item.conment="等待配送"
                                }else if (item.status==3) {
                                    item.conment="配送中"
                                }else if (item.status==4) {
                                    item.conment="使用中"
                                }else if (item.status==5) {
                                    item.conment="申请归还"
                                }
                            })
                        }else if (item.vipGoods.length > 0) {
                            self.data.order.viph =false
                            self.data.residue=item.vipTimes
                            item.vipGoods.forEach(function(item3){
                                self.data.order.vip.push({
                                    goodsrc:item3.img,
                                    name:item3.name,
                                    price:item3.rent,
                                    size:item3.goodsSpec,
                                    age:item3.fitAge,
                                    choose:true,
                                    id:item3.id,
                                    orderId:item.orderId,
                                    status:item.status
                                })
                            })
                            // console.log(self.data.order.vip,'会员订单')
                            self.data.order.vip.forEach(function(item){
                                if (item.status==1) {
                                    item.conment="已支付"
                                }else if (item.status==2) {
                                    item.conment="等待配送"
                                }else if (item.status==3) {
                                    item.conment="配送中"
                                }else if (item.status==4) {
                                    item.conment="使用中"
                                }else if (item.status==5) {
                                    item.conment="申请归还"
                                }
                            })
                        }
                  })
                  self.setData({
                        order:self.data.order,
                        residue:self.data.residue
                  })
  },

  payOrderData:function(res){
    var self=this
    // console.log(res)
    res.data.data.forEach(function(item){
        self.data.payOrder.push(item)
        self.setData({
            payOrder:self.data.payOrder
        })
    })
  },
  getOrderData:function (status) {
      var self = this;
      api.loadData(api.getorder, {status:status, userId:self.data.userId}, function (res) {
                  // console.log(res)
                if (status == 0) {
                    self.payOrderData(res)
                }else if(status == 1){
                    self.orderData(res)
                }else if(status == 6){
                    self.overOrderData(res)   
                }

      })
      // wx.request({
      //     url: 'https://yly1.ylyedu.com/api/order/get', //仅为示例，并非真实的接口地址
      //     data: {
      //         status:1,
      //         userId:self.data.userId
      //     },
      //     success: function(res) {
      //         console.log(res)
      //         res.data.data.forEach(function(item){
      //             if (item.goods.length > 0) {
      //                 self.data.order.ordh =false
      //                 item.goods.forEach(function(item2){
      //                     self.data.order.ordinary.push({
      //                         goodsrc:item2.img,
      //                         name:item2.name,
      //                         price:item2.rent,
      //                         size:item2.goodsSpec,
      //                         age:item2.fitAge,
      //                         choose:false,
      //                         id:item2.id,
      //                         orderId:item.orderId
      //                     })
      //                 })
      //             }else if (item.vipGoods.length > 0) {
      //                 self.data.order.viph =false
      //                 item.vipGoods.forEach(function(item3){
      //                     self.data.order.ordinary.push({
      //                         goodsrc:item3.img,
      //                         name:item3.name,
      //                         price:item3.rent,
      //                         size:item3.goodsSpec,
      //                         age:item3.fitAge,
      //                         choose:false,
      //                         id:item3.id,
      //                         orderId:item.orderId
      //                     })
      //                 })
      //             }
      //         })
      //         if (status == 1){
      //             self.setData({
      //                 order:self.data.order
      //             })
      //         }else if (status == 0){
      //             self.setData({
      //                 payOrder:self.data.payOrder
      //             })
      //         }else if (status == 6){
      //             self.setData({
      //                 overOrder:self.data.overOrder
      //             })
      //         }
      //     }
      // })
  }  ,
    delete:function(e){
        console.log(e)
        var self=this
        var index=e.currentTarget.dataset.index
        var orderId =self.data.payOrder[index].orderId
        wx.request({
            url:"https://yly1.ylyedu.com/api/order/delete",
            data:{
                id:orderId,
                userId:self.data.userId
            },
            success:function(res){
                self.data.payOrder.splice(index, 1)
                self.setData({
                    payOrder:self.data.payOrder
                })
            }
        })
    },
    Saddrss:function(){
        var self=this
        self.data.Saddrss=true
        self.setData({
            Saddrss:self.data.Saddrss
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
    return:function(){
        var self=this
        var orderId=""
        var goodsId=[]
        var goodsInfo=[]
        self.data.order.ordinary.forEach(function(item){
            if (item.choose==false) {
                orderId=item.orderId
                goodsId.push(item.id)
            }
        })
        self.data.order.vip.forEach(function(item){
            if (item.choose==false) {
                orderId=item.orderId
                goodsId.push(item.id)
            }
        })
        goodsInfo.push({
            orderId:orderId,
            goodsId:goodsId,
        })
        if (orderId=="") {
            wx.showModal({
                title: '提示',
                content: '请选择要归还的玩具'
            })
        }else if (self.data.time=="") {
            wx.showModal({
                title: '提示',
                content: '请选择取货时间'
            })
        }else if (self.data.Saddrss==false) {
            wx.showModal({
                title: '提示',
                content: '请选择取货地址'
            })
        }else{
            var address=wx.getStorageSync("address")
            console.log(address)
            wx.request({
                url: 'https://yly1.ylyedu.com/api/order/giveBack', //仅为示例，并非真实的接口地址
                data: {
                    addressId:address.id,
                    userId:self.data.userId,
                    time:self.data.time,
                    goodsInfo:goodsInfo
                },
                success: function(res) {
                    console.log(res.data)
                    if (res.data.msg=='success') {
                        wx.showModal({
                            title: '提示',
                            content: '申请退还成功，请耐心等待'
                        })
                        self.data.change2=true
                        self.data.order.ordinary.forEach(function(item){
                           item.choose=true
                        })
                        self.data.order.vip.forEach(function(item){
                           item.choose=true
                        })
                        self.setData({
                            change2:self.data.change2,
                            order:self.data.order
                        })
                    }
                }
            })
        }
        console.log(orderId,"orderId")
    },
    pay:function(e){
        var self=this
        console.log(self.data.payOrder)
        var index=e.currentTarget.dataset.index
        var orderId =self.data.payOrder[index].orderId
        var rentTime=parseInt(self.data.payOrder[index].rentTime)
        var rentHe=0
        var foregift=0
        self.data.payOrder.forEach(function(item){
            item.goods.forEach((item1)=>{
                rentHe+=item1.rent
                foregift+=item1.foregift
            })
            item.total=rentHe*rentTime+foregift
            console.log(item.total)
        })
        var total=self.data.payOrder[index].total
        wx.request({
            url:"https://yly1.ylyedu.com/api/order/pay",
            data:{
                orderId:orderId,
                body:"订单支付"
            },
            success:function(res){
                console.log(res)
                var Info={}
                Info=res.data.data
                console.log(Info)
                wx.navigateTo({
                    url:"../pay/pay?orderId="+orderId+"&rentTime="+rentTime+'&total='+total+'&balance='+self.data.balance+"&Info="+JSON.stringify(Info)
                })
            } 
        })
    }
})