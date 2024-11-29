import request from "@/request";

export function create(data) {
    return request({
        url: "/dataCollector/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/dataCollector/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/dataCollector/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/dataCollector/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/dataCollector/getById",
        method: "POST",
        data
    })
}


export function createQueue(data) {
    return request({
        url: "/dataCollector/createQueue",
        method: "POST",
        data
    })
}
