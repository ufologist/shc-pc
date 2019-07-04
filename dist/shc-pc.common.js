'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var StandardHttpClient = _interopDefault(require('standard-http-client'));
var NProgress = _interopDefault(require('nprogress'));
require('nprogress/nprogress.css');
var elementUi = require('element-ui');
require('element-ui/lib/theme-chalk/message.css');
require('element-ui/lib/theme-chalk/icon.css');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

/**
 * 显示错误提示
 * 
 * @param {string} message 
 * @param {string} errorCode 
 * @param {string} tip 
 */

function showErrorTip(message, errorCode, tip) {
  elementUi.Message({
    dangerouslyUseHTMLString: true,
    message: "".concat(message, "<span title=\"").concat(tip, "\" style=\"cursor:help;font-size:12px;color:#aaa;\">(\u9519\u8BEF\u7801:").concat(errorCode, ")</span>"),
    type: 'error',
    showClose: true,
    duration: 5 * 1000
  });
}
/**
 * 扩展 StandardHttpClient
 * 
 * - 发送请求时开启 loading
 * - 请求结束后关闭 loading
 * - 请求出错时给予用户错误提示
 */


var HttpClient =
/*#__PURE__*/
function (_StandardHttpClient) {
  _inherits(HttpClient, _StandardHttpClient);

  function HttpClient(config) {
    _classCallCheck(this, HttpClient);

    return _possibleConstructorReturn(this, _getPrototypeOf(HttpClient).call(this, config));
  }

  _createClass(HttpClient, [{
    key: "beforeSend",
    value: function beforeSend(config) {
      NProgress.start();
    }
  }, {
    key: "afterSend",
    value: function afterSend(responseOrError) {
      NProgress.done();
    }
  }, {
    key: "handleError",
    value: function handleError(error) {
      if (error._errorType === 'A') {
        showErrorTip(error._desc, error._errorCode, error.message + ' ' + error.config.url);
      } else if (error._errorType === 'H') {
        showErrorTip(error._desc, error._errorCode, error.config.url);
      } else if (error._errorType === 'B') {
        showErrorTip(error.message, error._errorCode, error.config.url);
      } else if (error._errorType === 'C') {
        showErrorTip(error._desc, error._errorCode, error.message);
      } else {
        showErrorTip(error._desc, error._errorCode, error.message);
      }
    }
  }]);

  return HttpClient;
}(StandardHttpClient);

module.exports = HttpClient;
