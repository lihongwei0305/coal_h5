import request from "@/request";

export function create(data) {
    return request({
        url: "/pdcDeviceSupplier/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/pdcDeviceSupplier/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/pdcDeviceSupplier/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/pdcDeviceSupplier/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/pdcDeviceSupplier/getById",
        method: "POST",
        data
    })
}
