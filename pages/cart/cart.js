var app = getApp()
Page({
  data: {
    cart: [
      // {
      //   img: "http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg",
      //   name: "小泰克百变儿童乐园",
      //   rent: 4.9,
      //   goodsSpec: "大",
      //   fitAge: "4岁以上",
      //   choose: false,
      //   pledge:399
      // },
      // {
      //   img: "http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg",
      //   name: "小泰克百变儿童乐园",
      //   rent: 4.9,
      //   goodsSpec: "大",
      //   fitAge: "5岁以上",
      //   choose: false,
      //   pledge: 399
      // },
      // {
      //   img: "http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg",
      //   name: "小泰克百变儿童乐园",
      //   rent: 4.9,
      //   goodsSpec: "大",
      //   fitAge: "6岁以上",
      //   choose: false,
      //   pledge: 399
      // }
    ],
     all:false,
     accounts:"",
     num:"",
     userId:""
  },
  //事件处理函数
  //
onShow:function(){
    var self=this
    // wx.getStorage({
    //         key: 'userId',
    //         success: function(res) {
    //             console.log(res.data,'sssss')
    //             self.data.userId=res.data
    //             self.setData({
    //                 userId:self.data.userId
    //             })
    //             console.log(self.data.userId,'77')
    //         } 
    // })
    // debugger;
    self.data.userId = wx.getStorageSync('userId')
    self.setData({
        userId: self.data.userId
    })
    var self=this
    
    self.getData();
    // console.log(self.data.cart,'666666666')
    
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
  choose: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    this.data.cart[index].choose = !this.data.cart[index].choose
    var acc = 0;
    var num=0
    this.data.cart.forEach(function (item) {
      if (item.choose == false) {
        acc += item.rent
        num+=1
      }
    })
    acc = acc.toFixed(1)
    console.log(acc)
    
  
    this.setData({
      cart: this.data.cart,
      accounts: acc,
      num:num
    })
    console.log(this.data.cart[index].choose)
  },
  all:function(){
    var num=0;
    var acc=0;
    var that=this
    this.data.all=!this.data.all
    this.data.cart.forEach(function(item){
      if (that.data.all==true){
        item.choose=true
      }else{
        item.choose=false
      }
      // item.choose= !item.choose
      if(item.choose==false){
        acc += item.rent
        num+=1
      }else{
        acc= 0
        num= 0
      }
    })
    acc = acc.toFixed(1)
    this.setData({
      all:this.data.all,
      cart: this.data.cart,
      num: num,
      accounts: acc,
    })
    // console.log(this.data.vip.choose)
  }, 
  delete: function (e) {
    // console.log(e)
    var index = e.currentTarget.dataset.index;
    var self=this
        var goodsId =self.data.cart[index].id
        wx.request({
        url: 'https://yly1.ylyedu.com/api/cart/delete', //仅为示例，并非真实的接口地址
        data: {
            userId:self.data.userId,
            goodsId:goodsId
        },
        success: function(res) {
            console.log(res.data)
        }
    })
    
    self.data.cart.splice(index, 1)
        var acc = 0;
        var num = 0;
        self.data.cart.forEach(function (item) {
          if (item.choose == false) {
            acc += item.rent
            num += 1
          }
        })
        acc = acc.toFixed(1)
        // console.log(acc)
        self.setData({
          accounts: acc,
          num: num,
          cart: self.data.cart
        })
  },
  
  
  toaccounts:function(){
    var that=this
    var arr=[]
    if(this.data.num!=0){
      that.data.cart.forEach(function(item){
        if(item.choose==false){
          arr.push(item)
        }
      })
      // console.log(arr)
      wx.setStorage({
        key: "toAccounts",
        data: arr
      })
      wx.navigateTo({
        url: '../accounts/accounts',
      })
    }else{
      wx.showToast({
        title: '请选择结算的商品',
      })
    }
  },
    getData:function(){
        var self=this
         wx.request({
          url: 'https://yly1.ylyedu.com/api/cart/getList', //仅为示例，并非真实的接口地址
          data: {
             userId: self.data.userId
          },
          success: function(res) {
            // console.log(res.data)
            self.data.cart=res.data.data
            // console.log(id)
            self.data.cart.forEach(function(item){
                item.choose=false,
                item.select=false
            })
            self.setData({
                cart:self.data.cart
            })

            self.onup();
            console.log(self.data.cart,'798789798')
          }
        })
    },
    onup:function(){
        var self=this
        var acc=0;
        var num=0;
        // console.log(self.data.cart,'demo')
        self.data.cart.forEach(function(item){
            // debugger;
            item.rent=Number(item.rent)
            if(item.choose==false){
                acc += item.rent
                num+=1
            }
        })
        // console.log(acc)

        acc=acc.toFixed(1)
        // console.log(acc)
        this.setData({
            accounts:acc,
            num:num
        })
    },
})
