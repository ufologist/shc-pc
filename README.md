# shc-pc

[![NPM version][npm-image]][npm-url] [![Build Status][ci-status-image]][ci-status-url] [![Coverage Status][coverage-status-image]][coverage-status-url] [![Known Vulnerabilities][vulnerabilities-status-image]][vulnerabilities-status-url] [![changelog][changelog-image]][changelog-url] [![license][license-image]][license-url]

[vulnerabilities-status-image]: https://snyk.io/test/npm/shc-pc/badge.svg
[vulnerabilities-status-url]: https://snyk.io/test/npm/shc-pc
[ci-status-image]: https://travis-ci.org/ufologist/shc-pc.svg?branch=master
[ci-status-url]: https://travis-ci.org/ufologist/shc-pc
[coverage-status-image]: https://coveralls.io/repos/github/ufologist/shc-pc/badge.svg?branch=master
[coverage-status-url]: https://coveralls.io/github/ufologist/shc-pc
[npm-image]: https://img.shields.io/npm/v/shc-pc.svg?style=flat-square
[npm-url]: https://npmjs.org/package/shc-pc
[license-image]: https://img.shields.io/github/license/ufologist/shc-pc.svg
[license-url]: https://github.com/ufologist/shc-pc/blob/master/LICENSE
[changelog-image]: https://img.shields.io/badge/CHANGE-LOG-blue.svg?style=flat-square
[changelog-url]: https://github.com/ufologist/shc-pc/blob/master/CHANGELOG.md

[![npm-image](https://nodei.co/npm/shc-pc.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.com/package/shc-pc)

符合接口规范的 HTTP 客户端 - PC

## 功能

扩展 [StandardHttpClient](https://github.com/ufologist/standard-http-client)
* 发送请求前开启 loading(通过 `nprogress` 实现)
* 请求结束后关闭 loading
* 请求出错时给予用户错误提示(通过 `element-ui` 的 `Message` 实现)

![http-api-error-tip](https://user-images.githubusercontent.com/167221/60412703-bf03a480-9c04-11e9-8aa6-1b4272b39a94.png)

## 示例

```javascript
import HttpClient from 'shc-pc';

var httpClient = new HttpClient();

httpClient.send({
    url: 'https://httpbin.org/json'
}).then(function([data, response]) {
    console.log('data', data);
});
```

更多使用方法详见 [StandardHttpClient](https://github.com/ufologist/standard-http-client)

## 扩展

* 如果需要自定义错误提示, 可以继承之后重写 `handleError` 方法

  ```javascript
  import SHC from 'shc-pc';
  
  class HttpClient extends SHC {
      constructor() {
          super({ // 可以在这里传入默认参数
              withCredentials: true,
              timeout: 10 * 1000
          });
      }
  
      handleError(error) {
          super.handleError(error);
  
          if (error._errorCode === 'B1') {
              alert('特殊处理业务错误 B1');
          } else if (error._errorCode === 'B2') {
              alert('特殊处理业务错误 B2');
          }
      }
  }
  
  export default new HttpClient();
  ```