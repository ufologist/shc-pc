import { __extends } from "tslib";
import StandardHttpClient from 'standard-http-client';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Message from 'element-ui/lib/message.js';
import 'element-ui/lib/theme-chalk/message.css';
import 'element-ui/lib/theme-chalk/icon.css';
/**
 * 显示错误提示
 *
 * @param message
 * @param errorCode
 * @param tip
 */
function showErrorTip(message, errorCode, tip) {
    if (message === void 0) { message = ''; }
    if (errorCode === void 0) { errorCode = ''; }
    if (tip === void 0) { tip = ''; }
    Message({
        dangerouslyUseHTMLString: true,
        message: message + "<span title=\"" + tip + "\" style=\"cursor:help;font-size:12px;color:#aaa;\">(\u9519\u8BEF\u7801:" + errorCode + ")</span>",
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
var HttpClient = /** @class */ (function (_super) {
    __extends(HttpClient, _super);
    function HttpClient(config) {
        if (config === void 0) { config = {}; }
        return _super.call(this, config) || this;
    }
    HttpClient.prototype.beforeSend = function (config) {
        NProgress.start();
    };
    HttpClient.prototype.afterSend = function (responseOrError) {
        NProgress.done();
    };
    HttpClient.prototype.handleError = function (error) {
        var _a, _b, _c;
        if (error._errorType === 'A') {
            showErrorTip(error._desc, error._errorCode, error.message + ' ' + ((_a = error.config) === null || _a === void 0 ? void 0 : _a.url));
        }
        else if (error._errorType === 'H') {
            showErrorTip(error._desc, error._errorCode, (_b = error.config) === null || _b === void 0 ? void 0 : _b.url);
        }
        else if (error._errorType === 'B') {
            showErrorTip(error.message, error._errorCode, (_c = error.config) === null || _c === void 0 ? void 0 : _c.url);
        }
        else if (error._errorType === 'C') {
            showErrorTip(error._desc, error._errorCode, error.message);
        }
        else {
            showErrorTip(error._desc, error._errorCode, error.message);
        }
    };
    return HttpClient;
}(StandardHttpClient));
export default HttpClient;
