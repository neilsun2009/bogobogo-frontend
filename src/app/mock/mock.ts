import * as Mock from 'mockjs';
const ROOT_URL = 'http://localhost:4201/api';

export class MyMock {
  start() {
    // console.log(Mock);
    Mock.mock(`${ROOT_URL}/general`, {
      result: true,
      data: {
        cats: {
          index: {
            primaryColor: '#00B8DE',
            secondaryColor: '#F8F7F2',
            layerBg: ''
          },
          more: {
            primaryColor: '#ff0000',
            secondaryColor: '#ff00ff',
            layerBg: ''
          }
        }
      }
    });
  }
}
