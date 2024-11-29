import request from "@/request";

export function login(data){
    return request({
        url: "/login",
        method:"POST",
        data,
    })
}

export function genCaptcha(data){
    return request({
        url: "/genCaptcha",
        method:"POST",
        data
    })
}

export function logout(data){
    return request({
        url: "/logout",
        method:"POST",
        data
    })
}
