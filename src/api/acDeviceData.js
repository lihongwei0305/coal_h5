import request from "@/request";

export function create(data) {
    return request({
        url: "/acDeviceData/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/acDeviceData/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/acDeviceData/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/acDeviceData/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/acDeviceData/getById",
        method: "POST",
        data
    })
}
export function report(data) {
    return request({
        url: "/acDeviceData/report",
        method: "POST",
        data
    })
}
