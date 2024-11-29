import request from "@/request";

export function create(data) {
    return request({
        url: "/warehouseGoodsSummary/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/warehouseGoodsSummary/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/warehouseGoodsSummary/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/warehouseGoodsSummary/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/warehouseGoodsSummary/getById",
        method: "POST",
        data
    })
}

export function roots(data) {
    return request({
        url: "/warehouseGoodsSummary/roots",
        method: "POST",
        data
    })
}
