import request from "@/request";

export function create(data) {
    return request({
        url: "/warehouseGoodsAttr/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/warehouseGoodsAttr/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/warehouseGoodsAttr/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/warehouseGoodsAttr/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/warehouseGoodsAttr/getById",
        method: "POST",
        data
    })
}

export function roots(data) {
    return request({
        url: "/warehouseGoodsAttr/roots",
        method: "POST",
        data
    })
}
