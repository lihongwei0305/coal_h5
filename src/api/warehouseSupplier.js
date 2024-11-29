import request from "@/request";

export function create(data) {
    return request({
        url: "/warehouseSupplier/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/warehouseSupplier/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/warehouseSupplier/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/warehouseSupplier/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/warehouseSupplier/getById",
        method: "POST",
        data
    })
}

export function roots(data) {
    return request({
        url: "/warehouseSupplier/roots",
        method: "POST",
        data
    })
}
