import request from "@/request";

export function create(data) {
    return request({
        url: "/permission/create",
        method: "POST",
        data
    })
}


export function update(data) {
    return request({
        url: "/permission/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/permission/delete",
        method: "POST",
        data
    })
}

export function list(data) {
    return request({
        url: "/permission/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/permission/getById",
        method: "POST",
        data
    })
}

export function exportAll(data) {
    return request({
        url: "/permission/exportAll",
        method: "POST",
        data
    })
}

export function importAll(data) {
    return request({
        url: "/permission/importAll",
        method: "POST",
        data
    })
}

