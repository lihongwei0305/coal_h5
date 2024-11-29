import request from "@/request";

export function create(data) {
    return request({
        url: "/warehouseShelve/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/warehouseShelve/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/warehouseShelve/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/warehouseShelve/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/warehouseShelve/getById",
        method: "POST",
        data
    })
}

export function roots(data) {
    return request({
        url: "/warehouseShelve/roots",
        method: "POST",
        data
    })
}
