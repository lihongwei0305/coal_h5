import request from "@/request";

export function create(data) {
    return request({
        url: "/sysLog/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/sysLog/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/sysLog/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/sysLog/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/sysLog/getById",
        method: "POST",
        data
    })
}
