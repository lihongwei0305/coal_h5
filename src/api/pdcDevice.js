import request from "@/request";

export function create(data) {
    return request({
        url: "/pdcDevice/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/pdcDevice/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/pdcDevice/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/pdcDevice/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/pdcDevice/getById",
        method: "POST",
        data
    })
}
