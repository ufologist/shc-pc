import StandardHttpClient, {
    RequestError
} from 'standard-http-client';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import Message from 'element-ui/lib/message.js';
import 'element-ui/lib/theme-chalk/message.css';
import 'element-ui/lib/theme-chalk/icon.css';

import {
    AxiosRequestConfig,
    AxiosResponse
} from 'axios';

/**
 * 显示错误提示
 * 
 * @param message 
 * @param errorCode 
 * @param tip 
 */
function showErrorTip(message: string = '', errorCode: string = '', tip: string = '') {
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
    constructor(config: AxiosRequestConfig = {}) {
        super(config);
    }

    beforeSend(config: AxiosRequestConfig) {
        NProgress.start();
    }

    afterSend(responseOrError: AxiosResponse | RequestError) {
        NProgress.done();
    }

    handleError(error: RequestError) {
        if (error._errorType === 'A') {
            showErrorTip(error._desc, error._errorCode, error.message + ' ' + error.config?.url);
        } else if (error._errorType === 'H') {
            showErrorTip(error._desc, error._errorCode, error.config?.url);
        } else if (error._errorType === 'B') {
            showErrorTip(error.message, error._errorCode, error.config?.url);
        } else if (error._errorType === 'C') {
            showErrorTip(error._desc, error._errorCode, error.message);
        } else {
            showErrorTip(error._desc, error._errorCode, error.message);
        }
    }
}

export default HttpClient;