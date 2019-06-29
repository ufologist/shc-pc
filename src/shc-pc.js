import StandardHttpClient from 'standard-http-client';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import {
    Message
} from 'element-ui';
import 'element-ui/lib/theme-chalk/message.css';

/**
 * 显示错误提示
 * 
 * @param {string} message 
 * @param {string} errorCode 
 * @param {string} tip 
 */
function showErrorTip(message, errorCode, tip) {
    Message({
        dangerouslyUseHTMLString: true,
        message: `${message}<span title="${tip}" style="cursor:help;font-size:12px;color:#aaa;">(错误码:${errorCode})</span>`,
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
class HttpClient extends StandardHttpClient {
    constructor(config) {
        super(config);
    }
    useInterceptors() {
        super.useInterceptors();

        this.agent.interceptors.request.use(function(config) {
            NProgress.start();
            return config;
        });

        this.agent.interceptors.response.use(function(response) {
            NProgress.done();
            return response;
        }, (error) => {
            NProgress.done();
            this.showErrorTip(error);
            return Promise.reject(error);
        });
    }

    /**
     * 显示错误提示
     * 
     * @param {AxiosError} error
     */
    showErrorTip(error) {
        var errorCode = `${error._errorType}${error._errorCode}`;
        if (error._errorType === 'A') {
            showErrorTip(error._desc, errorCode, error.message + ' ' + error.config.url);
        } else if (error._errorType === 'H') {
            showErrorTip(error._desc, errorCode, error.config.url);
        } else if (error._errorType === 'B') {
            var result = error.response.data;
            var message = error._desc;
            if (result && result.statusInfo && result.statusInfo.message) {
                message = result.statusInfo.message;
            }
            showErrorTip(message, errorCode, error.config.url);
        } else if (error._errorType === 'C') {
            showErrorTip(error._desc, errorCode, error.message);
        } else {
            showErrorTip(error._desc, errorCode, error.message);
        }
    }
}

export default HttpClient;