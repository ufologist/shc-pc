import HttpClient from '../dist/esm/shc-pc.js';

var httpClient = new HttpClient();

httpClient.send({ // 正常
    url: 'https://httpbin.org/json'
}).then(function([data]) {
    console.log('data', data);
});

httpClient.send({ // A
    url: 'https://baidu.com'
});
httpClient.send({ // H
    url: 'https://httpbin.org/status/404'
});
httpClient.send({ // B
    url: 'http://yapi.smart-xwork.cn/mock/82892/example/shc-status-1'
});
httpClient.send({ // C
    url: 'https://httpbin.org/status/200',
    transformResponse: [function(data) {
        console.log(a.b);
        return data;
    }]
});