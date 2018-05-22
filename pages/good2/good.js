var app = getApp()

Page({
    data: {
        arr: [
        
        ],
        bottom1:true,
        screen_k:true,
        filter:[],
        typeId:'',
        id:""
    },
    onLoad: function (options) {
        // console.log('options',options)
        this.data.title=options.title
        this.data.typeId=options.typeId
        var typeId=options.typeId
        var self=this
        wx.request({
            url: 'https://yly1.ylyedu.com/api/goods/get', //仅为示例，并非真实的接口地址
            data: {},
            success: function(res) {
                console.log('resaaaaa',res.data)
                var data=res.data.data
                data.forEach(function(item){
                    self.data.arr.push({
                        goodname:item.name,
                        src:item.img,
                        price:item.rent,
                        tagprice:item.tagprice,
                        size:item.goodsSpec,
                        age:item.fitAge,
                        id:item.id
                    })
                })
                // console.log(self.data.arr)
                self.setData({
                    title:self.data.title,
                    arr:self.data.arr,
                    typeId:self.data.typeId
                })
            }
        }),
        wx.request({
            url:'https://yly1.ylyedu.com/admin/goods/getParam',
            success:function(res){
                // console.log(res)
                self.data.filter.push({
                    arr:res.data.data.brand,
                    display:"玩具品牌",
                    jian:false
                })
                res.data.data.fitAge.forEach((item)=>{
                    item.name = item.fitage
                })
                self.data.filter.push({
                    arr:res.data.data.fitAge,
                    display:"全部年龄",
                    jian:false
                })
                res.data.data.spec.forEach((item)=>{
                    item.name = item.spec
                })
                self.data.filter.push({
                    arr:res.data.data.spec,
                    display:"尺寸大小",
                    jian:false
                })
                res.data.data.classify.forEach((item)=>{
                    item.name = item.type
                })
                self.data.filter.push({
                    arr:res.data.data.classify, 
                    display:"玩具类型",
                    jian:false
                })
                res.data.data.ability.forEach((item)=>{
                    item.name = item.ability
                })
                self.data.filter.push({
                    arr:res.data.data.ability,
                    display:"锻炼能力",
                    jian:false
                })


                
               

                self.setData({
                    filter: self.data.filter
                })
                self.data.filter.forEach((item)=>{
                    item.arr.forEach((item)=>{
                        item.checked=false
                    })
                })
                self.setData({
                    filter: self.data.filter
                })
                // console.log(self.data.filter)
            }
        })
    },
    screen_col:function(){
        this.data.screen_k=false
        this.setData({
            screen_k:this.data.screen_k 
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
    down:function(e){
        var index=e.currentTarget.dataset.index;
        // console.log(index)
        this.data.filter[index].jian = !this.data.filter[index].jian
        this.setData({
          filter:this.data.filter
        })
    } ,
    select:function(e){
        var index1 = e.currentTarget.dataset.index;
        var index2 = e.currentTarget.dataset.indexs;
        this.data.filter[index1].arr[index2].checked = !this.data.filter[index1].arr[index2].checked
        this.setData({
          filter: this.data.filter
        })
    },
    closescreen:function(){
        this.data.screen_k=true
        this.setData({
            screen_k:this.data.screen_k
        })
    },


    ensure:function(){
    var self=this
    var form={
        
        brandIds:[],
        fitages:[],
        specs:[],
        classifyIds:[],
        abilityIds:[],
    }
    this.data.filter.forEach(function(item){
        if(item.display=="玩具品牌"){
            item.arr.forEach(function(item2){
                if (item2.checked) {
                    form.brandIds.push(
                        item2.id
                    )
                }
            })
        }
        if (item.display=="全部年龄") {
            item.arr.forEach(function(item2){
                if (item2.checked) {
                    form.fitages.push(
                        item2.id
                    )
                }
            })
        }
        if (item.display=="尺寸大小") {
            item.arr.forEach(function(item2){
                if (item2.checked) {
                    form.specs.push(
                        item2.id
                    )
                }
            })
        }
        if (item.display=="玩具类型") {
            item.arr.forEach(function(item2){
                if (item2.checked) {
                    form.classifyIds.push(
                        item2.id
                    )
                }
            })
        }
        if (item.display=="锻炼能力") {
            item.arr.forEach(function(item2){
                if (item2.checked) {
                    form.abilityIds.push(
                        item2.id
                    )
                }
            })
        }
        // console.log(form)
    });
    

    var len=true
    for (var i in form) {
        if(i.length>0){
            len=false
        }
    }
    form.typeId=self.data.typeId
    if (len){
        wx.showToast({
            title: '请选择筛选条件',
        })
    }else{
        // console.log(form)
        this.data.screen_k = true;
        wx.request({
            url: 'https://yly1.ylyedu.com/api/goods/filter', //仅为示例，并非真实的接口地址
            data: form,
            success: function(res) {
                // console.log(res.data)
            }
        })

        this.data.filter.forEach(function (item) {
            item.arr.forEach(function (item2) {
                item2.checked = false
            })
        })
        this.setData({
            filter: this.data.filter
        })
        this.setData({
            screen_k: this.data.screen_k
        })
    }
  },
  reset:function(){
    this.data.filter.forEach(function(item){
      item.arr.forEach(function(item2){
        item2.checked=false  
      })
    })
      this.setData({
        filter: this.data.filter
      })
  },
})