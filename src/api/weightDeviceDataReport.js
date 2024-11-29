import request from "@/request";

export function create(data) {
    return request({
        url: "/weightDeviceDataReport/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/weightDeviceDataReport/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/weightDeviceDataReport/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/weightDeviceDataReport/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/weightDeviceDataReport/getById",
        method: "POST",
        data
    })
}
