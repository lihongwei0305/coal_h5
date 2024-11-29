import request from "@/request";

export function create(data) {
    return request({
        url: "/emDeviceData/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/emDeviceData/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/emDeviceData/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/emDeviceData/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/emDeviceData/getById",
        method: "POST",
        data
    })
}
