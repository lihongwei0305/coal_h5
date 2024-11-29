import request from "@/request";

export function create(data) {
    return request({
        url: "/role/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/role/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/role/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/role/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/role/getById",
        method: "POST",
        data
    })
}
