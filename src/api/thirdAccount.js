import request from "@/request";

export function create(data) {
    return request({
        url: "/thirdAccount/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/thirdAccount/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/thirdAccount/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/thirdAccount/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/thirdAccount/getById",
        method: "POST",
        data
    })
}
