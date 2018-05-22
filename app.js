// const openIdUrl = require('./config').openIdUrl
var api = require('./utils/api.js');

App({
    onLaunch: function () {
        console.log('App Launch')

        var self = this;
        self.getUserOpenId(function(err, openId){
          self.getUserInfo(openId);
        });
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    },
    globalData: {
        hasLogin: false,
        openid: null,
        hasUserInfo: false,
        userInfo: null
    },
    getUserId: function (callback) {
        var self = this;
        self.getUserOpenId(function (err, openId) {
            self.getUserInfo(openId, callback);
        });
    },
    
    // lazy loading openid
    getUserOpenId: function (callback) {
        var self = this

        var openid = wx.getStorageSync('openid');

        if (openid) {
            self.globalData.openid = openid;
            callback(null, openid)
        } else {
            wx.login({

                success: function (data) {
                    wx.request({
                        url: api.url('getOpenId'),
                        data: {
                            code: data.code
                        },
                        success: function (res) {
                            console.log('拉取openid成功', res)
                            self.globalData.openid = res.data.data.openid

                            console.log('openid', res.data.data.openid)

                            wx.setStorage({
                                key: "openid",
                                data: self.globalData.openid
                            })
                            callback(null, self.globalData.openid)
                        }
                    })
                }
            })
        }
    },
    getUserInfo: function (openId, callback) {
        var that = this

        if (that.globalData.hasLogin === false) {
            wx.login({
                success: _getUserInfo
            })
        } else {
            _getUserInfo()
        }
        
        function _getUserInfo() {
            wx.getUserInfo({
                success: function (res) {
                    console.log(res);
                    that.globalData.hasUserInfo = true;
                    that.globalData.userInfo = res.userInfo;

                    that.globalData.userInfo['openId'] = openId;

                    wx.setStorage({
                        key: 'userInfo',
                        data: res.userInfo
                    })

                    wx.request({
                        url: api.url('login'),
                        data: that.globalData.userInfo,
                        success: function (res) {
                            // debugger;
                            wx.setStorage({
                                key: "userId",
                                data: res.data.data,
                                success: function () {
                                    callback && callback(res.data.data);
                                    wx.switchTab({
                                        url: '../index/index',
                                    });
                                }
                            })

                        }
                    })
                },
                fail: function () {
                    // that.getUserOpenId(function (err, openId) {
                    //   that.getUserInfo(openId);
                    // });
                }
            })
        }
    }
})
