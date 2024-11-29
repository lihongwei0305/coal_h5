import request from "@/request";

export function create(data) {
    return request({
        url: "/device/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/device/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/device/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/device/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/device/getById",
        method: "POST",
        data
    })
}
