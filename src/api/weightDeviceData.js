import request from "@/request";

export function create(data) {
    return request({
        url: "/weightDeviceData/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/weightDeviceData/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/weightDeviceData/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/weightDeviceData/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/weightDeviceData/getById",
        method: "POST",
        data
    })
}
export function report(data) {
    return request({
        url: "/weightDeviceData/report",
        method: "POST",
        data
    })
}
