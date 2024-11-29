import request from "@/request";

export function create(data) {
    return request({
        url: "/emDeviceSupplier/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/emDeviceSupplier/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/emDeviceSupplier/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/emDeviceSupplier/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/emDeviceSupplier/getById",
        method: "POST",
        data
    })
}
