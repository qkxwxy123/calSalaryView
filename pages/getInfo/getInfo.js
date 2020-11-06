// pages/getInfo/getInfo.js
import Dialog from "../../miniprogram_npm/vant-weapp/dialog/dialog";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wName: '',
    show: false,
    month:1,
    option1: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月'],
  },
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  selectMonth: function (res) {
    this.setData({
      month: res.detail["index"] + 1
    })
  },
  getInfo: function (e){
    this.setData({
        wName: e.detail
      }
    )
  },

  search: function (res){
    let that = this
    if(that.data.wName != 0)
    {
      wx.request({
        url: 'https://www.kxxy.org.cn/salary/getWorker',
        data: {
          name: that.data.wName,
          month: that.data.month
        },
        timeout:2000,
        method:"GET",
        header:
        {
          "content-type":"application/json"
        },
        success(res)
        {
          //console.log(res)
          if(res.data.status == 200)
          {
            var num = res.data.rdata["time"]
            Dialog.alert({
              message:"姓名：" + res.data.rdata["name"] + "\n性别：" + res.data.rdata["sex"] + "\n联系电话：" + res.data.rdata["phone"] + "\n本月工作时长：" + num.toFixed(1)
            }).then(()=>{})
          }
          else
          {
            Dialog.alert({
              message: res.data.msg
            }).then(() => { })
          }
        },
        fail(res){
          Dialog.alert({
            message:"error\n请联系维护人员"
          })
        }
      })
    }
    else
    {
      Dialog.alert({
        message:"姓名不能为空",
      }).then(()=>{})
    }
  },
})