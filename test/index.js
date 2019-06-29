import HttpClient from '../src/shc-pc.js';

var httpClient = new HttpClient();

httpClient.send({ // 正常
    url: 'http://localhost:8005/hello'
}).then(function([data]) {
    console.log('data', data);
});

httpClient.send({ // A
    url: 'http://localhost:8006/can-not-get'
});
httpClient.send({ // H
    url: 'https://httpbin.org/status/404'
});
httpClient.send({ // B
    url: 'http://localhost:8005/status1'
});
httpClient.send({ // C
    url: 'http://localhost:8005/status2',
    transformResponse: [function(data) {
        console.log(a.b);
        return data;
    }]
});