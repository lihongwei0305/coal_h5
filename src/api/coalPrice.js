import request from "@/request";

export function create(data) {
    return request({
        url: "/coalPrice/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/coalPrice/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/coalPrice/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/coalPrice/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/coalPrice/getById",
        method: "POST",
        data
    })
}
