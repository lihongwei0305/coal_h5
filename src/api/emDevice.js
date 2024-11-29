import request from "@/request";

export function create(data) {
    return request({
        url: "/emDevice/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/emDevice/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/emDevice/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/emDevice/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/emDevice/getById",
        method: "POST",
        data
    })
}
