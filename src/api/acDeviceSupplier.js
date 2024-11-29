import request from "@/request";

export function create(data) {
    return request({
        url: "/acDeviceSupplier/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/acDeviceSupplier/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/acDeviceSupplier/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/acDeviceSupplier/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/acDeviceSupplier/getById",
        method: "POST",
        data
    })
}
