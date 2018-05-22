//index.js
//获取应用实例
var tcity = require("../../utils/citys.js");

var app = getApp()
Page({
  data: {
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
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
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }


  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  onLoad: function () {
    console.log("onLoad");
    var that = this;

    tcity.init(that);

    var cityData = that.data.cityData;

    that.data.userId=wx.getStorageSync('userId')
    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name,
      userId:that.data.userId
    })
    console.log('初始化完成');


  },
  addaddress:function(e){
    var self=this
    console.log(e.detail.value)
    var data=e.detail.value;
    var warn = ""; 
    var flag = false; 
    if(data.name==""){
      warn ="请填写您的姓名！"
    }else if(data.phone==""){
      console.log("666")
      warn ="请填写您的手机号！"
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(data.phone))){
      warn ="手机号格式不正确"
    } else if(data.adddress==""){
      warn ="请选择您的所在区域"
    } else if (data.datails == "") {
      warn = "请输入您的具体地址"
    } else {
      flag=true;
      wx.request({
        url: 'https://yly1.ylyedu.com/api/address/add', //仅为示例，并非真实的接口地址
        data: {
          userId:self.data.userId,
          name:data.name,
          phone:data.phone,
          region:data.address,//地区
          address:data.datails//详细地址
        },
        success: function(res) {
          console.log(res.data)
          wx.navigateBack({
            delta: 1
          })
        }
      })
      // wx.redirectTo({
      //   url: '../address/address?name=' + data.name + "&phone=" + data.phone + "&address=" + data.address + "&datails=" + data.datails
      // })
    }

    if (flag == false) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }  

  }

})








