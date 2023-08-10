import Axios from 'axios';

const http = Axios.create({
    // baseURL: 'http://localhost:8080', // server interface baseUrl
    baseURL: "https://epicurean-eats-server.onrender.com",
    timeout: 30000
});

// Add request interceptor
http.interceptors.request.use(function (config) {


    if (config.method.toLocaleLowerCase() === 'post' || config.method.toLocaleLowerCase() === 'put') {
        // Parameters are processed uniformly, and requests use data to pass parameters
        config.data = config.data.data;
    } else if (config.method.toLocaleLowerCase() === 'get' || config.method.toLocaleLowerCase() === 'delete') {
        // Unified processing of parameters
        config.params = config.data;
    } else {
        alert('Request method not allowed：' + config.method);
    }
    if (window.localStorage.userInfo && JSON.parse(window.localStorage.userInfo).state.userInfo) {
        config.headers.Authorization = 'Bearer ' + JSON.parse(window.localStorage.userInfo).state.userInfo.token
    }
    if (config.description) {
        config.headers["X-Description"] = encodeURIComponent(config.description);
    }
    delete config.description;

    return config;
}, function (error) {
    // What to do with request errors
    return Promise.reject(error);
});

// Add response interceptor
http.interceptors.response.use(function (response) {
    // Interface data processing
    if (response.status === 200 || response.status === 304 || response.status === 201) {
        // Custom contract interface returns{code: xxx, data: xxx, msg:'err message'}
        // code:200 data normal； ！200 Data acquisition exception
        return response.data;
    }
}, function (error) {
});
export default http;
