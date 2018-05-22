var app = getApp()
Page({
  data: {
    indent:[{
        status:"已取消",
        order:"45678415968",
        ordertime:"2017-10-18 15:34",
        name:"张宇航",
        phone:"18700777673",
        address:"北京市朝阳区领地1506",
        takeT:"2017/10/20",
        sendweek:"五",
        limit:"20",
        zong:"570",
        yun:'0',
        hui:"30",
        he:"540",
    }],
    address:{},
    toys:{},
    orderId:"",
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
    onLoad:function(options){
        console.log(options)
        var self=this
        self.data.orderId=options.orderId
        self.data.userId=wx.getStorageSync("userId")
        self.setData({
            orderId:self.data.orderId,
            userId:self.data.userId
        }),
        self.getorderInfo();
    },
    getorderInfo:function(){
        var self=this
        wx.request({
            url:"https://yly1.ylyedu.com/api/order/getInfo",
            data:{
                id:self.data.orderId,
                userId:self.data.userId
            },
            success:function(res){
                console.log(res)
                res.data.data.address.create=self.getTime(res.data.data.address.create*1000)
                self.data.address=res.data.data.address
                self.data.toys=res.data.data.toys
                self.setData({
                    address:self.data.address,
                    toys:self.data.toys
                })
            }
        })
    },
    getTime:function(time) {   
                var now = new Date(time);  
                var year = now.getFullYear();       //年  
                var month = now.getMonth() + 1;     //月  
                var day = now.getDate();            //日  
                  
                var hh = now.getHours();            //时  
                var mm = now.getMinutes();          //分  
                var ss = now.getSeconds();           //秒  
                  
                var clock = year + "-";  
                  
                if(month < 10)  
                    clock += "0";  
                  
                clock += month + "-";  
                  
                if(day < 10)  
                    clock += "0";  
                      
                clock += day + " ";  
                  
                if(hh < 10)  
                    clock += "0";  
                      
                clock += hh + ":";  
                if (mm < 10) clock += '0';   
                clock += mm + ":";   
                   
                if (ss < 10) clock += '0';   
                clock += ss;   
                return(clock);   
            },  
    back:function(){
        wx.switchTab({
            url: '../index/index'
        })
    }
})