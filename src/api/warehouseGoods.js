import request from "@/request";

export function create(data) {
    return request({
        url: "/warehouseGoods/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/warehouseGoods/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/warehouseGoods/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/warehouseGoods/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/warehouseGoods/getById",
        method: "POST",
        data
    })
}

export function roots(data) {
    return request({
        url: "/warehouseGoods/roots",
        method: "POST",
        data
    })
}

export function goodsCount(data) {
    return request({
        url: "/warehouseGoods/goodsCount",
        method: "POST",
        data
    })
}
