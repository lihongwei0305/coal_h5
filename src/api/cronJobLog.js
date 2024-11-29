import request from "@/request";

export function create(data) {
    return request({
        url: "/cronJobLog/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/cronJobLog/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/cronJobLog/delete",
        method: "POST",
        data
    })
}


export function getById(data) {
    return request({
        url: "/cronJobLog/getById",
        method: "POST",
        data
    })
}

export function list(data) {
    return request({
        url: "/cronJobLog/list",
        method: "POST",
        data
    })
}



