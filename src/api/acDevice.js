import request from "@/request";

export function create(data) {
    return request({
        url: "/acDevice/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/acDevice/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/acDevice/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/acDevice/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/acDevice/getById",
        method: "POST",
        data
    })
}