import request from "@/request";

export function create(data) {
    return request({
        url: "/deviceCategory/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/deviceCategory/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/deviceCategory/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/deviceCategory/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/deviceCategory/getById",
        method: "POST",
        data
    })
}

export function roots(data) {
    return request({
        url: "/deviceCategory/roots",
        method: "POST",
        data
    })
}
