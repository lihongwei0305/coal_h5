import request from "@/request";

export function create(data) {
    return request({
        url: "/script/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/script/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/script/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/script/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/script/getById",
        method: "POST",
        data
    })
}


export function exec(data) {
    return request({
        url: "/script/exec",
        method: "POST",
        data
    })
}
