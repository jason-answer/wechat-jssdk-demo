<template>
  <div>定位:{{data}}</div>
</template>

<script>
import http from '../util/http';
export default {
  name:'WeChat',
  data() {
    return {
      data: null,
      
    }
  },
  mounted(){
  
  },
  created(){
      console.log('ssssssss')
    this.getJSApiTicket()
  },

  methods:{
    getJSApiTicket() {
      // const url ='http://landrover.app.jaguarlandrover.cn/#/activity/autumn-activity?channel=wechat'
      let param = {
        url: window.location.href.split('#')[0],
        // url: url.split('#')[0],
        appType: 'APP02'
      };
      let self= this
      http.post('open/weChat/getJSApiTicket', param).then(res => {
        if (res.data && (res.data.code === 1 || res.data.code === '1')) {
          let data = res.data.obj;
          this.wxParam = {
            debug: true,
            appId: 'wxaf146d9e4479b429',
            // appId: window.location.host.indexOf('jaguar') === 0 ? 'wxb567d49a009a1838' : 'wxaf146d9e4479b429',
            timestamp: data.timestamp,
            nonceStr: data.noncestr,
            signature: data.ticket,
            jsApiList: [
              'onMenuShareTimeline', // 分享到朋友圈接口
              'onMenuShareAppMessage', //  分享到朋友接口
              'updateAppMessageShareData',
              'updateTimelineShareData',
              'getLocation'
            ]
          };
          // let that = this;
          // eslint-disable-next-line
          wx.config(this.wxParam);
          // eslint-disable-next-line
          wx.ready(function() {
            console.log('wx 接口执行')
            // eslint-disable-next-line
             wx.getLocation({
              type: 'wgs84',
              success (res) {
               console.log(res)
               self.data = res
               self.location.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
               self.location.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
               self.location.speed = res.speed; // 速度，以米/每秒计
               self.location.accuracy = res.accuracy; //
              }
              })
            // eslint-disable-next-line
            // wx.onMenuShareTimeline(that.shareData);
            // // eslint-disable-next-line
            // wx.onMenuShareAppMessage(that.shareData);
            // // eslint-disable-next-line
            // wx.updateAppMessageShareData(that.shareData);
            // // eslint-disable-next-line
            // wx.updateTimelineShareData(that.shareData);
          });
          // eslint-disable-next-line
          wx.error(function(res) {
            console.log(`wx-error:${res}`);
          });
        }
      });
    }
  }
}
</script>

<style>

</style>