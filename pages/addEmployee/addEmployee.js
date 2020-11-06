// pages/addEmployee/addEmployee.js
import Dialog from "../../miniprogram_npm/vant-weapp/dialog/dialog";
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    sex:'',
    phone:'',
  },

  getName: function (e) {
    this.setData({
      name: e.detail
    })
  },

  getSex: function(e){
    this.setData({
      sex: e.detail
    })
  },

  getPhone: function(e){
    this.setData({
      phone: e.detail
    })
  },

  submit: function(){
    let that = this
    if(that.data.name != 0 && that.data.sex != 0 && that.data.phone != 0)
    {
      wx.request({
        url:'https://www.kxxy.org.cn/salary/addWorker',
        data:{
          name: that.data.name,
          sex:that.data.sex,
          phone:that.data.phone
        },
        method:"POST",
        header:{
          "content-type":"application/x-www-form-urlencoded"
        },
        timeout: 2000,
        success(res)
        {
          //console.log(res)
          if (res.data.status == 200) {
            Dialog.alert({
              message: '添加成功',
            }).then(() => {
            })
          }
          else {
            Dialog.alert({
              message: "fail",
            }).then(() => {
            })
          }
        },
        fail(res)
        {
          Dialog.alert({
            message: "error\n请联系维护人员"
          }).then(() => {
          })
        }
      })
    }
    else
    {
      Dialog.alert({
        message: "内容不能为空"
      }).then(()=>{})
    }
  },
})