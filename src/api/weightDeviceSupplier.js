import request from "@/request";

export function create(data) {
    return request({
        url: "/weightDeviceSupplier/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/weightDeviceSupplier/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/weightDeviceSupplier/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/weightDeviceSupplier/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/weightDeviceSupplier/getById",
        method: "POST",
        data
    })
}
