/**
 * 采购单送货记录
 * **/
import request from "@/request";

export function create(data) {
    return request({
        url: "/deliveryInformation/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/deliveryInformation/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/deliveryInformation/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/deliveryInformation/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/deliveryInformation/getById",
        method: "POST",
        data
    })
}

