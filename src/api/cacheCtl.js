import request from "@/request";

export function create(data) {
    return request({
        url: "/cacheCtl/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/cacheCtl/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/cacheCtl/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/cacheCtl/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/cacheCtl/getById",
        method: "POST",
        data
    })
}


export function deleteKey(data) {
    return request({
        url: "/cacheCtl/deleteKey",
        method: "POST",
        data
    })
}

export function keys(data) {
    return request({
        url: "/cacheCtl/keys",
        method: "POST",
        data
    })
}

export function value(data) {
    return request({
        url: "/cacheCtl/value",
        method: "POST",
        data
    })
}
