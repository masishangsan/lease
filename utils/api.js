module.exports = {
  url: function(u){
    let t = this;
    return t.baseURL.trim() + t[u.trim()];
  },
  baseURL: "https://yly1.ylyedu.com",

  /**
   * 商城
   */
  getGoods: "/api/goods/get",
  getGoodsById: "/api/goods/getInfo",
  getBanner: "/api/banner/get",

  //订单
  getorder: "/api/order/get",


  // 获取手机验证码
  getCode: "/api/user/getCode",
  getUserInfoByPhone: "/api/user/getUserInfoByPhone",

  // login
  login: "/api/user/create",
  // 获取用户信息
  getUserInfoByOpenId: "/api/user/getUserInfoByOpenId",
  getUserInfoById: "/api/user/getInfo",
  // 更新用户信息
  updateUserInfo: "/api/user/update",
  // 获取男女列表
  getClondBarList: "/api/user/get",
  // 喜欢
  like: "/api/Collection/create",
  // 购买微信号
  purchase: "api/purchase/create",
  // 反馈微信号有误
  feedbackWx: "/api/feedback/create",
  // 获取我喜欢的／喜欢我的  type 1: 我喜欢的 2: 喜欢我的 userId pn
  getLikeList: "/api/Collection/get",
  // 获取我购买的微信／购买我微信的  type 1: 我购买的微信 2: 购买我微信的 userId pn
  getPurchaseList: "/api/purchase/get",

  visitor: "/api/visitor/create",
  getVisitorList: "/api/visitor/get",


  // 添加收获地址
  addAddress: "/api/address/create",
  // 获取收获地址列表
  getAddress: "/api/address/get",
  // 获取单个收获地址
  getAddressInfo: "/api/address/getInfo",
  // 更新收获地址
  updateAddress: "/api/address/update",
  // 删除地址
  delAddress: "/api/address/delete",
  // 设置默认地址
  optertionDefault: "/api/address/optertionDefault",

  // 添加收获地址标签
  addAddressTag: "/api/address_tag/create",

  /**
   * Tools
   */
  // openid
  getOpenId: "/api/tools/getOpenId",
  // qiniu
  qiniu: "/api/tools/getToken",
  // getAccessToken
  getAccessToken: "/api/tools/getAccessToken",  
  // 发送模版消息
  wxSendMsg: "/api/tools/wxSendMsg",




//获取首页信息
 getIndex:"/api/index/index",



    loadData: function (url, para, func) {
        wx.request({
            url: this.baseURL + url, //仅为示例，并非真实的接口地址
            data: para,
            success: function(res) {
                func && func(res)
            }
    } )

  }
}