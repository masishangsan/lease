var api = require('./api.js');

module.exports = {
    // 通过二维码当前登录用户添加金币
    addGoldByQRcode(userInfo, qrParams, cb){
        // wx.request({
        //     url: api.url(''),
        //     data: userInfo,
        //     success: function (resp) {
        //         cb && cb(resp);
        //     }
        // })
    },
    // 更新用户信息
    updateUserInfo(data, cb){
        wx.request({
            url: api.url('updateUserInfo'),
            data: data,
            success: function (resp) {
                if (resp.data.ret) {
                    cb && cb(resp.data);
                    wx.setStorage({
                        key: "FruliUserInfo",
                        data: resp.data.data,
                        success: function () {
                        }
                    })
                }else{
                    wx.showToast({
                        title: resp.data.msg,
                        image: '../image/icon-cuo.png'
                    })
                }
                
            }
        })
    },
    // 通过用户id获取用户信息
    getUserInfoById(data, cb){
        wx.request({
            url: api.url('getUserInfoById'),
            data: data,
            success: function (resp) {
                if (resp.data.ret) {
                    cb && cb(resp.data);
                    wx.setStorage({
                        key: "FruliUserInfo",
                        data: resp.data.data,
                        success: function () {
                        }
                    })
                }else{
                    wx.showToast({
                        title: resp.data.msg,
                        image: '../image/icon-cuo.png'
                    })
                }
            }
        })
    },
    // 喜欢
    like(data, cb){
        wx.request({
            url: api.url('like'),
            data: data,
            success: function (resp) {
                if (resp.data.ret) {
                    cb && cb(resp.data);
                }else{
                    wx.showToast({
                        title: resp.data.msg,
                        image: '../image/icon-cuo.png'
                    })
                }
                
            }
        })
    },
    // 购买微信号
    purchase(data, cb){
        wx.request({
            url: api.url('purchase'),
            data: data,
            success: function (resp) {
                if (resp.data.ret) {
                    cb && cb(resp.data);
                }else{
                    wx.showToast({
                        title: resp.data.msg,
                        image: '../image/icon-cuo.png'
                    })
                }
                
            }
        })
    },
    // 反馈微信号有误
    feedbackWx(data, cb){
        wx.request({
            url: api.url('feedbackWx'),
            data: data,
            success: function (resp) {
                if (resp.data.ret) {
                    cb && cb(resp.data);
                }else{
                    wx.showToast({
                        title: resp.data.msg,
                        image: '../image/icon-cuo.png'
                    })
                }
                
            }
        })
    }
}