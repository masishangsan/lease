var api = require('./api.js');
var service = require('./service.js');

function formatLocation(longitude, latitude) {
    if (typeof longitude === 'string' && typeof latitude === 'string') {
        longitude = parseFloat(longitude)
        latitude = parseFloat(latitude)
    }

    longitude = longitude.toFixed(2)
    latitude = latitude.toFixed(2)

    return {
        longitude: longitude.toString().split('.'),
        latitude: latitude.toString().split('.')
    }
}




module.exports = {
    /**
     * 获取当前页面参数
     */
    getParams() {
        return getCurrentPages()[getCurrentPages().length - 1].options;
    },

    /**
     * 获取用户状态
     */
    getUserLoginState() {
        return wx.getStorageSync('FruliUserInfo') || null;
    },

    /**
     * 登录
     */
    login(cb) {
        var self = this;
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userInfo'] === false) {
                    wx.openSetting({
                        success: (res) => {
                            if (res.authSetting['scope.userInfo'] === true) {
                                self.getUserOpenId(function (openid) {
                                    self.getUserInfo(openid, function (resp) {
                                        cb && cb(resp);
                                    })
                                })
                            }
                        }
                    })
                } else {
                    self.getUserOpenId(function (openid) {
                        self.getUserInfo(openid, function (resp) {
                            cb && cb(resp);
                        })
                    })
                }
            }
        })
    },

    /**
     * 获取openID
     */
    getUserOpenId(callback) {
        var self = this;
        var openid = wx.getStorageSync('openid');

        if (openid) {
            callback(openid)
        } else {
            wx.login({
                success: function (data) {
                    wx.request({
                        url: api.url('getOpenId'),
                        data: {
                            code: data.code
                        },
                        success: function (res) {
                            wx.setStorage({
                                key: "openid",
                                data: res.data.data.openid
                            })
                            callback(res.data.data.openid)
                        }
                    })
                }
            })
        }
    },

    /**
     * 获取用户信息
     * @param {*} openId 
     * @param {*} callback 
     */
    getUserInfo(openId, callback) {
        var that = this;

        // 通过openid获取用户信息
        wx.request({
            url: api.url('getUserInfoByOpenId'),
            data: {
                openId: openId
            },
            success: function (res) {
                if (res.data.data) {
                    wx.setStorage({
                        key: "FruliUserInfo",
                        data: res.data.data,
                        success: function () {
                            callback && callback(res.data.data);
                        }
                    })
                }else{
                    wx.getUserInfo({
                        success: function (res) {
                            console.log(res)
                            res.userInfo.openId = openId;
                            
                            wx.request({
                                url: api.url('login'),
                                data: res.userInfo,
                                success: function (res) {
                                    wx.setStorage({
                                        key: "FruliUserInfo",
                                        data: res.data.data,
                                        success: function () {
                                            callback && callback(res.data.data);
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })

        
    },

    /**
     * 获取地理位置
     */
    getLocation() {
        var self = this;

        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userLocation'] === false) {
                    wx.openSetting({
                        success: (res) => {
                            if (res.authSetting['scope.userLocation'] === true) {
                                updateLocation();
                            }
                        }
                    })
                }else{
                    updateLocation();
                }
            }
        })

        function updateLocation(){
            wx.getLocation({
                type: 'wgs84',
                success: function (res) {
                    console.log(res);
                    var userInfo = self.getUserLoginState();
                    userInfo.latitude = res.latitude;
                    userInfo.longitude = res.longitude;
                    service.updateUserInfo(userInfo, (resp) => {
                        wx.setStorage({
                            key: "FruliUserInfo",
                            data: userInfo,
                            success: function () {
                            }
                        })
                    })
                }
            })
        }
        
    },
}
