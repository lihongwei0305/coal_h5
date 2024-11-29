import request from "@/request";

export function create(data) {
    return request({
        url: "/warehouseGoodsCategory/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/warehouseGoodsCategory/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/warehouseGoodsCategory/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/warehouseGoodsCategory/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/warehouseGoodsCategory/getById",
        method: "POST",
        data
    })
}

export function roots(data) {
    return request({
        url: "/warehouseGoodsCategory/roots",
        method: "POST",
        data
    })
}
