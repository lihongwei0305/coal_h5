import axios from "axios";

import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import router from "@/router";
import {showFailToast, showToast} from "vant";
import {useUserStore} from "@/store/user.js";

console.log(import.meta.env)

let request = axios.create({
    baseURL: import.meta.env.MODE === 'electronProduction' ? import.meta.env.VITE_APP_API : '/api',
    timeout: 1000000,
})


request.defaults.transformRequest.push((data, headers) => {
    headers["X-TS"] = new Date().getTime();


    let method = headers["X-Client-Sign-METHOD"] || "";
    let url = headers["X-Client-Sign-URL"] || "";
    let qs = headers["X-Client-Sign-QS"] || "";


    let token = headers["X-Token"] || "anonymous";

    let ts = headers["X-TS"] || "";


    let random = headers["X-Client-Random"] || "";


    let sha256Hex;
    if (data instanceof FormData) {
        sha256Hex = sha256('').toString().toUpperCase();

    } else if (typeof data === 'string' || data instanceof String) {

        sha256Hex = sha256(data || '').toString().toUpperCase();
    } else if (data == null || data == undefined) {

        sha256Hex = sha256("").toString().toUpperCase();
    } else {
        throw new Error("不支持的类型")
    }


    let sb = "";
    sb += method.toUpperCase() + "\n";
    sb += url + "\n";
    sb += qs + "\n";
    sb += token + "\n";
    sb += ts + "\n";
    sb += random + "\n";
    sb += sha256Hex + "\n";

    let clientSign = hmacSHA256(sb, token).toString().toUpperCase();


    headers["X-Client-Sign"] = clientSign;
    headers["X-Client-Url"] = url;
    // delete headers["X-Client-Sign-METHOD"];
    // delete headers["X-Client-Sign-URL"];
    // delete headers["X-Client-Sign-QS"];


    return data;

});


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

request.interceptors.request.use((req) => {
    if (req.url === '/login' || req.url === '/genCaptcha') {
        delete req.headers["X-Token"]
    } else {
        req.headers["X-Token"] = JSON.parse(sessionStorage.getItem('user'))?.userInfo?.sessionId || ''
    }


    req.headers["X-Client-Sign-METHOD"] = req.method.toUpperCase();
    req.headers["X-Client-Sign-URL"] = req.baseURL.startsWith("http") || req.baseURL.startsWith("//") ? new URL(req.baseURL + req.url).pathname : req.baseURL + req.url;
    req.headers["X-Client-Sign-QS"] = "";
    req.headers["X-Client-Random"] = getRandomInt(100000, 999999);


    return req;
})


request.interceptors.response.use(async (resp) => {
    if (resp.status === 200 && resp.data.code === 'ok') {
        return Promise.resolve(resp.data)
    } else if (['loginRequired', 'invalidToken'].includes(resp.data.code)) {
        sessionStorage.removeItem('user');
        useUserStore().$reset();
        showFailToast(resp.data.msg)
        // router.replace('/login?redirect=' + location.pathname)
        console.log('resp.data.msg',resp.data.msg)
        setTimeout(() => {
            router.replace('/login');
        },300)
        return Promise.reject(resp.data.msg);
    } else {
        showFailToast(resp.data.msg)
        return Promise.reject(resp.data.msg);
    }

}, (err) => {
    // ElMessage.error(err.message)
    showFailToast(err.message)
    return Promise.reject(err);
})

export default request
