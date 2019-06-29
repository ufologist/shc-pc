import StandardHttpClient from 'standard-http-client';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/message.css';

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

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

/**
 * 显示错误提示
 * 
 * @param {string} message 
 * @param {string} errorCode 
 * @param {string} tip 
 */

function _showErrorTip(message, errorCode, tip) {
  Message({
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
    key: "useInterceptors",
    value: function useInterceptors() {
      var _this = this;

      _get(_getPrototypeOf(HttpClient.prototype), "useInterceptors", this).call(this);

      this.agent.interceptors.request.use(function (config) {
        NProgress.start();
        return config;
      });
      this.agent.interceptors.response.use(function (response) {
        NProgress.done();
        return response;
      }, function (error) {
        NProgress.done();

        _this.showErrorTip(error);

        return Promise.reject(error);
      });
    }
    /**
     * 显示错误提示
     * 
     * @param {AxiosError} error
     */

  }, {
    key: "showErrorTip",
    value: function showErrorTip(error) {
      var errorCode = "".concat(error._errorType).concat(error._errorCode);

      if (error._errorType === 'A') {
        _showErrorTip(error._desc, errorCode, error.message + ' ' + error.config.url);
      } else if (error._errorType === 'H') {
        _showErrorTip(error._desc, errorCode, error.config.url);
      } else if (error._errorType === 'B') {
        var result = error.response.data;
        var message = error._desc;

        if (result && result.statusInfo && result.statusInfo.message) {
          message = result.statusInfo.message;
        }

        _showErrorTip(message, errorCode, error.config.url);
      } else if (error._errorType === 'C') {
        _showErrorTip(error._desc, errorCode, error.message);
      } else {
        _showErrorTip(error._desc, errorCode, error.message);
      }
    }
  }]);

  return HttpClient;
}(StandardHttpClient);

export default HttpClient;
