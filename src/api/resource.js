import request from "@/request";

export function apiTree(data) {
    return request({
        url: "/resource/apiTree",
        method: "POST",
        data
    })
}

export function menuTree(data) {
    return request({
        url: "/resource/menuTree",
        method: "POST",
        data
    })
}

export function create(data) {
    return request({
        url: "/resource/create",
        method: "POST",
        data
    })
}


export function update(data) {
    return request({
        url: "/resource/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/resource/delete",
        method: "POST",
        data
    })
}

export function list(data) {
    return request({
        url: "/resource/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/resource/getById",
        method: "POST",
        data
    })
}

export function initUrlResource(data) {
    return request({
        url: "/resource/initUrlResource",
        method: "POST",
        data
    })
}
