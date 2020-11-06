// pages/addWorkTime/addWorkTime.js
import Dialog from "../../miniprogram_npm/vant-weapp/dialog/dialog";
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    month: 1,
    time: 0.0,
    sex: '',
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
    stTime:'00:00',
    edTime:'00:00',
    show1:false,
    show2:false,
    show:false,
  },

  onInput1(e){
    this.setData({
      stTime: e.detail,
      show1: false,
    })
  },
  onInput2(e) {
    this.setData({
      edTime: e.detail,
      show2: false,
    })
  },

  showPopup() {
    this.setData({
      show: true
    });
  },
  showPopup1() {
    this.setData({
      show1: true
    });
  },
  showPopup2() {
    this.setData({
      show2: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  onClose1() {
    this.setData({
      show1: false
    });
  },
  onClose2() {
    this.setData({
      show2: false
    });
  },

  selectMonth: function (res) {
    this.setData({
      month: res.detail["index"] + 1
    })
  },
  getSex: function(e)
  {
    this.setData({
      sex: e.detail
    })
  },
  getName: function(e)
  {
    this.setData({
      name: e.detail
    })
  },

  submit:function(e)
  {
    
    let that = this
    if(that.data.stTime > that.data.edTime)
    {
      Dialog.alert({
        message: '开始时间不能早于结束时间',
      }).then(() => {
      })
      return ;
    }
    if(that.data.name != 0 && that.data.sex != 0)
    {
      //console.log(that.data.stTime)
      //console.log(that.data.edTime)
      var hour1 = parseInt(that.data.stTime[0])
      var hour2 = parseInt(that.data.stTime[1])
      var minn1 = parseInt(that.data.stTime[3])
      var minn2 = parseInt(that.data.stTime[4])
      var sthours = hour1 * 10 + hour2
      var stminns = minn1 * 10 + minn2
      
      hour1 = parseInt(that.data.edTime[0])
      hour2 = parseInt(that.data.edTime[1])
      minn1 = parseInt(that.data.edTime[3])
      minn2 = parseInt(that.data.edTime[4])
      var edhours = hour1 * 10 + hour2
      var edminns = minn1 * 10 + minn2
      //console.log(edhours - sthours)
      //console.log(sthours)
      if(edminns >= stminns)
      {
        var delt = (edminns - stminns) / 60.0
        that.data.time = edhours - sthours
        //console.log(that.data.time)
        that.data.time = parseFloat(that.data.time) + parseFloat(delt.toFixed(2))
      }
      else
      {
        var delt = (60 + edminns - stminns) / 60.0
        that.data.time = parseFloat(edhours - sthours - 1) + parseFloat(delt.toFixed(2))
      }
      //console.log(that.data.time)
      wx.request({
        url:'https://www.kxxy.org.cn/salary/addWorkTime',
        header:{
          "content-type": "application/x-www-form-urlencoded"
        },
        data:{
          name: that.data.name,
          sex: that.data.sex,
          month: that.data.month,
          time: that.data.time,
        },
        method:"POST",
        timeout:2000,
        success(res)
        {
          if(res.data.status == 200)
          {
            Dialog.alert({
              message: '添加成功',
            }).then(() => {
            })
          }
          else {
            Dialog.alert({
              message: "添加失败",
            }).then(() => {
            })
          }
        },
        fail(res) {
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
  }
})