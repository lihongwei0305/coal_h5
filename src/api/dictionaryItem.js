import request from "@/request";

export function create(data) {
    return request({
        url: "/dictionaryItem/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/dictionaryItem/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/dictionaryItem/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/dictionaryItem/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/dictionaryItem/getById",
        method: "POST",
        data
    })
}
