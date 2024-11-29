import request from "@/request";

export function create(data) {
    return request({
        url: "/sysConfig/create",
        method: "POST",
        data
    })
}

export function update(data) {
    return request({
        url: "/sysConfig/update",
        method: "POST",
        data
    })
}

export function remove(data) {
    return request({
        url: "/sysConfig/delete",
        method: "POST",
        data
    })
}


export function list(data) {
    return request({
        url: "/sysConfig/list",
        method: "POST",
        data
    })
}

export function getById(data) {
    return request({
        url: "/sysConfig/getById",
        method: "POST",
        data
    })
}

export function saveAllConfig(data) {
    return request({
        url: "/sysConfig/saveAllConfig",
        method: "POST",
        data
    })
}


