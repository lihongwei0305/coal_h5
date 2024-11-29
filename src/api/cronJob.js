import request from "@/request";

export function create(data) {
    return request({
        url: "/cronJob/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/cronJob/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/cronJob/delete",
        method: "POST",
        data
    })
}

export function runOnce(data) {
    return request({
        url: "/cronJob/runOnce",
        method: "POST",
        data
    })
}

export function switchStatus(data) {
    return request({
        url: "/cronJob/switchStatus",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/cronJob/getById",
        method: "POST",
        data
    })
}

export function list(data) {
    return request({
        url: "/cronJob/list",
        method: "POST",
        data
    })
}



