import request from "@/request";

export function create(data) {
    return request({
        url: "/weightDevice/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/weightDevice/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/weightDevice/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/weightDevice/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/weightDevice/getById",
        method: "POST",
        data
    })
}
