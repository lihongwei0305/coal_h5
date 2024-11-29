import request from "@/request";

export function create(data) {
    return request({
        url: "/warehouseGoodsBrand/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/warehouseGoodsBrand/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/warehouseGoodsBrand/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/warehouseGoodsBrand/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/warehouseGoodsBrand/getById",
        method: "POST",
        data
    })
}

export function roots(data) {
    return request({
        url: "/warehouseGoodsBrand/roots",
        method: "POST",
        data
    })
}
