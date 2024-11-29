import request from "@/request";

export function create(data) {
    return request({
        url: "/department/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/department/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/department/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/department/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/department/getById",
        method: "POST",
        data
    })
}


export function roots(data) {
    return request({
        url: "/department/roots",
        method: "POST",
        data
    })
}

