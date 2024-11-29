import request from "@/request";

export function create(data) {
    return request({
        url: "/dictionary/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/dictionary/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/dictionary/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/dictionary/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/dictionary/getById",
        method: "POST",
        data
    })
}

export function getByIdDetailed(data) {
    return request({
        url: "/dictionary/getByIdDetailed",
        method: "POST",
        data
    })
}

export function tree(data) {
    return request({
        url: "/dictionary/tree",
        method: "POST",
        data
    })
}

