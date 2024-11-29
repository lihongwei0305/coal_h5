/***
 产品管理
 */
import request from "@/request";

export function create(data) {
    return request({
        url: "/product/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/product/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/product/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/product/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/product/getById",
        method: "POST",
        data
    })
}


