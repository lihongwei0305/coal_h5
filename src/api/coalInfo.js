import request from "@/request";

export function create(data) {
    return request({
        url: "/coalInfo/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/coalInfo/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/coalInfo/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/coalInfo/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/coalInfo/getById",
        method: "POST",
        data
    })
}
