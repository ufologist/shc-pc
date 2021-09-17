import StandardHttpClient, { RequestError } from 'standard-http-client';
import 'nprogress/nprogress.css';
import 'element-ui/lib/theme-chalk/message.css';
import 'element-ui/lib/theme-chalk/icon.css';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
/**
 * 扩展 StandardHttpClient
 *
 * - 发送请求时开启 loading
 * - 请求结束后关闭 loading
 * - 请求出错时给予用户错误提示
 */
declare class HttpClient extends StandardHttpClient {
    constructor(config?: AxiosRequestConfig);
    beforeSend(config: AxiosRequestConfig): void;
    afterSend(responseOrError: AxiosResponse | RequestError): void;
    handleError(error: RequestError): void;
}
export default HttpClient;
