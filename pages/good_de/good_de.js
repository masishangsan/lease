var app = getApp()
Page({
  data: {
    movies: [
      { img: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { img: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { img: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { img: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ],
    good:{
        title:'小泰克百变儿童乐园',
        inventory:2,
        price:4.9,
        tagprice1:399,
        size:'大',
        age:'4岁以上'
    }, 
    message:{
      brand:"小小爱因斯坦",
      country:"美国",
      texture:"布",
      weight:"0.8kg",
      size:"142cm*51cm*21cm",
      disinfect: "酒精/季铵盐消毒、紫外线消毒、蒸汽消毒"
    },
    power:[
      {text:'爬行隧道是学爬宝宝的好帮手，长达1.4米的隧道，给宝宝更多的爬行和探索，是宝宝学习爬行的小乐园'},
      {text:'隧道里设计了栩栩如生的动物图案，吸引宝宝的注意力，刺激宝宝视觉神经的发展，锻炼宝宝的观察能力' },
      {text:'抓握小零件促进了宝宝手部肌肉的发育，增进宝宝力量，可翻身的毯子锻炼宝宝的大运动能力' }
      ],
    feature:[
      {text:'隧道上网眼面料可以和宝宝做藏猫猫游戏，为学习爬行的宝宝带来更多乐趣，度过欢乐的玩乐时光'},
      {text:'隧道包括三个悬挂玩具和六个挂环，方便添加任何宝宝喜爱的玩具，妈妈可以在隧道的另一头拿宝宝喜爱的玩具引导宝宝爬行，隧道口的挂件可以吸引宝宝的注意力，锻炼宝宝的上肢肌肉' },
      {text:'隧道轻便，易于携带，便于收纳携带的设计让宝宝随时随地可以玩' }
      ],
    show:[],
    kucun:" ",
    huan:" ",
    userId:'',
    goodId:'',
    col:null
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
onLoad:function(options){
    var self=this
    // console.log(options)
    wx.getStorage({
          key: 'userId',
            success: function(res) {
                console.log(res.data,'sssss')
                self.data.userId=res.data
                self.setData({
                    userId:self.data.userId
                })
            } 
    })
    var self=this
    wx.request({
        url: 'https://yly1.ylyedu.com/api/goods/getInfo', //仅为示例，并非真实的接口地址
        data: {
            id:options.id
        },
        success: function(res) {
            // console.log(res.data.data)
            var data=res.data.data
            var good={}
            good.title=data.name
            good.inventory=data.inventory
            good.price=data.rent
            good.tagprice1=data.tagprice
            good.size=data.goodsSpec
            good.age=data.fitAge
            self.data.good=good
            console.log(good)
            var message={}
            message.brand=data.brand
            message.country=data.their
            message.texture=data.texture
            message.weight=data.weight
            message.size=data.packSpec
            message.disinfect=data.disinfection
            self.data.message=message
            
            self.data.goodId=data.id
            var img=[]
            img=data.img


            if (data.invertory==1){
                self.data.huan="立即预约"
                self.data.col=false
            } else {
                self.data.huan="加入购物车"
                self.data.col=true
            }
            self.setData({
                img:self.data.img,
                kucun: self.data.kucun,
                huan:self.data.huan,
                movies:img,
                good:self.data.good,
                message:self.data.message,
                show:data.img,
                goodId:self.data.goodId,
                col:self.data.col
            })
        },
        
    })
    
    // console.log('img',self.data.movies)
},
  tocart:function(){
    debugger;   
    console.log("6666666666")
    wx.navigateTo({
      url:'../cart/cart'
    })
  },
  appointment:function(){
    var self=this
    wx.request({
            url: 'https://yly1.ylyedu.com/api/goods/appointment', //仅为示例，并非真实的接口地址
            data: {
                userId:self.data.userId,
                goodsId:self.data.goodId
            },
            success: function(res) {
                console.log(res.data)
                if(res.data.msg=='success') {
                    wx.showToast({
                      title: '已添加到预约列表',
                      icon: 'success',
                      duration: 2000
                    })
                }
            }
        })
  },
    toCart:function(){
        var self=this
        wx.request({
            url: 'https://yly1.ylyedu.com/api/cart/addGoods', //仅为示例，并非真实的接口地址
            data: {
                userId:self.data.userId,
                goodsId:self.data.goodId
            },
            success: function(res) {
                console.log(res.data)
                if(res.data.msg=='success') {
                    wx.showToast({
                      title: '已添加到购物车',
                      icon: 'success',
                      duration: 2000
                    })
                }
            }
        })
    }
})






























