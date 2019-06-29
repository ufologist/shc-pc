import HttpClient from '../src/shc-pc.js';

var httpClient = new HttpClient();

httpClient.send({ // 正常
    url: 'http://localhost:8005/admin/order-view/purchase-promote'
}).then(function([data]) {
    console.log('data', data);
});

httpClient.send({ // A
    url: 'http://localhost:8006/admin/order-view/operate-log'
});
httpClient.send({ // H
    url: 'https://httpbin.org/status/404'
});
httpClient.send({ // B
    url: 'http://localhost:8005/admin/order-view/operate-log'
});
httpClient.send({ // C
    url: 'http://localhost:8005/admin/order-view/operate-log',
    transformResponse: [function(data) {
        console.log(a.b);
        return data;
    }]
});