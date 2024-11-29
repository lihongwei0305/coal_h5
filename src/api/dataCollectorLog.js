import request from "@/request";

export function create(data) {
    return request({
        url: "/dataCollectorLog/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/dataCollectorLog/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/dataCollectorLog/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/dataCollectorLog/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/dataCollectorLog/getById",
        method: "POST",
        data
    })
}
