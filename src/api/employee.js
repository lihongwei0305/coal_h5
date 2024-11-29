import request from "@/request";

export function create(data) {
    return request({
        url: "/employee/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/employee/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/employee/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/employee/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/employee/getById",
        method: "POST",
        data
    })
}

export function importTemplate(data) {
    return request({
        url: "/employee/importTemplate",
        method: "POST",
        data
    })
}

export function importExcel(data) {
    return request({
        url: "/employee/import",
        method: "POST",
        data
    })
}

