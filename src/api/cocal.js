import request from "@/request";

export function params(data){
    return request({
        url: "/coal/params",
        method:"POST",
        data
    })
}

export function blend(data){
    return request({
        url: "/coal/blend",
        method:"POST",
        data
    })
}
