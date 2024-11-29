/***
 库存盘点
 */
import request from "@/request";

export function create(data) {
    return request({
        url: "/inventoryCheck/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/inventoryCheck/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/inventoryCheck/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/inventoryCheck/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/inventoryCheck/getById",
        method: "POST",
        data
    })
}


