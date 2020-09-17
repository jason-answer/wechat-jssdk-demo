<template>
  <div>{{location}}
    <button @click="openScan">扫一扫</button>
  </div>

</template>

<script>
import http from '../util/http'
export default {
  name: 'WeChat',
  data() {
    return {
      location: {
        latitude: undefined,
        longitude: undefined,
      },
    }
  },
  mounted() {
    this.getJSApiTicket()
  },
  methods: {
    getJSApiTicket() {
      const url =
        'http://landrover.app.jaguarlandrover.cn/#/activity/autumn-activity?channel=wechat'
      let param = {
        url: url.split('#')[0],
        // url: url.split('#')[0],
        appType: 'APP02',
      }
      http
        .post(
          'https://app.jaguarlandrover.cn/open/weChat/getJSApiTicket',
          param
        )
        .then((res) => {
          if (res.data && (res.data.code === 1 || res.data.code === '1')) {
            let data = res.data.obj
            this.wxParam = {
              debug: false,
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
                'getLocation',
                'scanQRCode',
              ],
            }
            let self = this
            // eslint-disable-next-line
            wx.config(this.wxParam)
            // eslint-disable-next-line
            wx.ready(function () {
              // eslint-disable-next-line
              wx.getLocation({
                type: 'wgs84',
                success(res) {
                  console.log('ssssssssssss')
                  self.location.latitude = res.latitude
                  self.location.longitude = res.longitude
                },
              })
              // eslint-disable-next-line
              // wx.onMenuShareTimeline(that.shareData);
              // // eslint-disable-next-line
              // wx.onMenuShareAppMessage(that.shareData);
              // // eslint-disable-next-line
              // wx.updateAppMessageShareData(that.shareData);
              // // eslint-disable-next-line
              // wx.updateTimelineShareData(that.shareData);
            })
            // eslint-disable-next-line
            wx.error(function (res) {
              console.log(`wx-error:${res}`)
            })
          }
        })
    },
    openScan() {
       // eslint-disable-next-line
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          //自行处理
          console.log(res)
        },
      })
    },
  },
}
</script>

<style>
</style>