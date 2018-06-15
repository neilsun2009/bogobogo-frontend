import { Injectable } from '@angular/core';
import { HttpService, IResponse } from '../http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WXService {

  private getTokenUrl = '/api/wx_token';
  domainUrl = 'http://olxpdoc6c.bkt.clouddn.com/';

  constructor(
    private http: HttpService
  ) { }

  getToken(url, callback, err) {
    this.http.get<IResponse<any>>(`${this.getTokenUrl}?url=${url}`, callback, err);
  }

  setConfig(wx, url, title, desc, imgUrl) {
    this.getToken(url, (data) => {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
      });
      wx.ready(() => {
        wx.onMenuShareTimeline({
          title,
          link: url,
          imgUrl
        });
        wx.onMenuShareAppMessage({
          title,
          desc,
          link: url,
          imgUrl
        });
      });
    }, (err) => {
      console.log(err);
    });
  }



}
