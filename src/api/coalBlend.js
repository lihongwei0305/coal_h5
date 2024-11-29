import request from "@/request";

export function blend(data) {
    return request({
        url: "/coalBlend/blend",
        method: "POST",
        data
    })
}

export function create(data) {
    return request({
        url: "/coalBlend/create",
        method: "POST",
        data
    })
}

export function list(data) {
    return request({
        url: "/coalBlend/list",
        method: "POST",
        data
    })
}
export function getById(data) {
    return request({
        url: "/coalBlend/getById",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/coalBlend/delete",
        method: "POST",
        data
    })
}



