import request from "@/request";

export function create(data) {
    return request({
        url: "/supplier/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/supplier/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/supplier/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/supplier/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/supplier/getById",
        method: "POST",
        data
    })
}
