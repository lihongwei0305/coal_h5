/***
 库存盘点明细
 */
import request from "@/request";

export function create(data) {
    return request({
        url: "/inventoryCheckDetail/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/inventoryCheckDetail/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/inventoryCheckDetail/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/inventoryCheckDetail/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/inventoryCheckDetail/getById",
        method: "POST",
        data
    })
}


