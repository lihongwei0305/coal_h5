import request from "@/request";

export function create(data) {
    return request({
        url: "/jobPost/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/jobPost/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/jobPost/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/jobPost/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/jobPost/getById",
        method: "POST",
        data
    })
}
