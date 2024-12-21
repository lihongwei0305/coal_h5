import request from "@/request";

export function create(data) {
    return request({
        url: "/warehouseReceiptDetail/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/warehouseReceiptDetail/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/warehouseReceiptDetail/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/warehouseReceiptDetail/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/warehouseReceiptDetail/getById",
        method: "POST",
        data
    })
}

export function roots(data) {
    return request({
        url: "/warehouseReceiptDetail/roots",
        method: "POST",
        data
    })
}
