//index.js
//获取应用实例
import Dialog from "../../miniprogram_npm/vant-weapp/dialog/dialog";
import Toast from "../../miniprogram_npm/vant-weapp/toast/toast";
const app = getApp()

Page({
  data: {
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
    sex: '男',
    month:'',
    reqId:'',
    money:0,
    show: false,
  },

  onChange(event) {
    this.setData({
      sex: event.detail,
    });
  },
  showPopup(){
    this.setData({
      show: true
    });
  },

  onClose(){
    this.setData({
      show: false
    });
  },

  onShow: function() {
    this.setData({
      month:1,
      money: 0
    });
  },

  selectMonth: function(res){
    this.setData({
      month: res.detail["index"] + 1
    })
  },
  getPerMoney: function (res) {
    this.setData({
      money: res.detail
    })
  },
  getWorker: function (res) {
    this.setData({
      reqId: res.detail //此处是姓名
    })
  },
  search: function(res)
  {
    let that = this
    if(that.data.reqId != 0)
    {
      wx.request({
        url:'https://www.kxxy.org.cn/salary/getWorkTime',
        data:{
          workerName:that.data.reqId,
          sex: that.data.sex,
          month:that.data.month
        },
        timeout:2000,
        method:"GET",
        header:
        {
          "content-type":'application/json'
        },
        success(res)
        {
          //console.log(res.data.rdata)
          var perm = that.data.money
          if(res.data.status == 200)
          {
            var num = perm * res.data.rdata
            Dialog.alert({
              message: '工资为：'+ num.toFixed(2)
            }).then(()=>{})
          }
          else
          {
            Dialog.alert({
              message: res.data.msg
            }).then(()=>{})
          }
        },
        fail(res)
        {
          console.log(res)
          Dialog.alert({
            message:"error\n请联系维护人员",
          }).then(()=>{})
        }
      })
    }
    else
    {
      Dialog.alert({
        message:"姓名不能为空"
      }).then(()=>{})
    }
  }
})
