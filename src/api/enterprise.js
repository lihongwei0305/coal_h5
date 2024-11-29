import request from "@/request";

export function create(data) {
    return request({
        url: "/enterprise/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/enterprise/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/enterprise/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/enterprise/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/enterprise/getById",
        method: "POST",
        data
    })
}
